import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Simple component test
function HelloVault({ name }) {
  return <div>Welcome to SecureVault, {name}!</div>
}

test('renders welcome message', () => {
  render(<HelloVault name="admin" />)
  expect(screen.getByText(/Welcome to SecureVault, admin/i)).toBeInTheDocument()
})

test('renders with different name', () => {
  render(<HelloVault name="testuser" />)
  expect(screen.getByText(/testuser/i)).toBeInTheDocument()
})
