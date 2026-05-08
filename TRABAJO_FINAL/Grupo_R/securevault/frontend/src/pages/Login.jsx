import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 pulse-accent" style={{ color: 'var(--accent)' }}>⬡</div>
          <h1 className="font-mono font-bold text-2xl tracking-widest" style={{ color: 'var(--accent)' }}>SECUREVAULT</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Credential Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div>
            <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none border transition-colors focus:border-teal-400"
              style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none border transition-colors focus:border-teal-400"
              style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
              required
            />
          </div>

          {error && (
            <p className="text-xs px-3 py-2 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-mono font-semibold text-sm tracking-wider transition-opacity disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#0a0e17' }}
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>

          <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
            No account?{' '}
            <Link to="/register" className="underline" style={{ color: 'var(--accent2)' }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
