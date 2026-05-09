variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "securevault"
}

variable "db_user" {
  description = "PostgreSQL user"
  type        = string
  default     = "securevault"
}

variable "db_password" {
  description = "PostgreSQL password"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "JWT signing secret key"
  type        = string
  sensitive   = true
}

variable "fernet_key" {
  description = "Fernet encryption key for secrets"
  type        = string
  sensitive   = true
}

variable "docker_registry" {
  description = "Docker Hub username/org"
  type        = string
}

variable "image_tag" {
  description = "Docker image version tag"
  type        = string
  default     = "latest"
}
