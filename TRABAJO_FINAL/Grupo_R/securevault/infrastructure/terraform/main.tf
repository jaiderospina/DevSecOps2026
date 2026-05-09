# infrastructure/terraform/main.tf
# Simulates production-like deployment using Docker provider

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Network
resource "docker_network" "sv_network" {
  name = "sv_prod_network"
}

# PostgreSQL
resource "docker_container" "postgres" {
  name  = "sv_prod_postgres"
  image = "postgres:16-alpine"

  env = [
    "POSTGRES_DB=${var.db_name}",
    "POSTGRES_USER=${var.db_user}",
    "POSTGRES_PASSWORD=${var.db_password}",
  ]

  volumes {
    volume_name    = docker_volume.postgres_data.name
    container_path = "/var/lib/postgresql/data"
  }

  networks_advanced {
    name = docker_network.sv_network.name
  }

  healthcheck {
    test     = ["CMD-SHELL", "pg_isready -U ${var.db_user}"]
    interval = "10s"
    timeout  = "5s"
    retries  = 5
  }
}

resource "docker_volume" "postgres_data" {
  name = "sv_prod_postgres_data"
}

# RabbitMQ
resource "docker_container" "rabbitmq" {
  name  = "sv_prod_rabbitmq"
  image = "rabbitmq:3.13-management-alpine"

  networks_advanced {
    name = docker_network.sv_network.name
  }
}

# API Gateway
resource "docker_container" "api_gateway" {
  name  = "sv_prod_api"
  image = "${var.docker_registry}/securevault-api-gateway:${var.image_tag}"

  env = [
    "DATABASE_URL=postgresql://${var.db_user}:${var.db_password}@sv_prod_postgres:5432/${var.db_name}",
    "RABBITMQ_URL=amqp://guest:guest@sv_prod_rabbitmq:5672/",
    "SECRET_KEY=${var.secret_key}",
    "FERNET_KEY=${var.fernet_key}",
    "DEBUG=false",
  ]

  ports {
    internal = 8000
    external = 8000
  }

  networks_advanced {
    name = docker_network.sv_network.name
  }

  depends_on = [docker_container.postgres, docker_container.rabbitmq]
}

# Worker
resource "docker_container" "worker" {
  name  = "sv_prod_worker"
  image = "${var.docker_registry}/securevault-worker-audit:${var.image_tag}"

  env = [
    "DATABASE_URL=postgresql://${var.db_user}:${var.db_password}@sv_prod_postgres:5432/${var.db_name}",
    "RABBITMQ_URL=amqp://guest:guest@sv_prod_rabbitmq:5672/",
    "SECRET_ROTATION_DAYS=90",
  ]

  networks_advanced {
    name = docker_network.sv_network.name
  }

  depends_on = [docker_container.postgres, docker_container.rabbitmq]
}

# Frontend
resource "docker_container" "frontend" {
  name  = "sv_prod_frontend"
  image = "${var.docker_registry}/securevault-frontend:${var.image_tag}"

  ports {
    internal = 3000
    external = 3000
  }

  networks_advanced {
    name = docker_network.sv_network.name
  }

  depends_on = [docker_container.api_gateway]
}
