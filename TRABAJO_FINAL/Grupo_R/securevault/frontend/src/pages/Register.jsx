import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'editor' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/api/v1/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm fade-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3" style={{ color: 'var(--accent)' }}>⬡</div>
          <h1 className="font-mono font-bold text-2xl tracking-widest" style={{ color: 'var(--accent)' }}>SECUREVAULT</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {['username','email','password'].map(field => (
            <div key={field}>
              <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{field}</label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none border focus:border-teal-400 transition-colors"
                style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Role</label>
            <select
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none border"
              style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
              Admin users are seeded by the backend and cannot self-register from the UI.
            </p>
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
            {loading ? 'CREATING...' : 'REGISTER'}
          </button>

          <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="underline" style={{ color: 'var(--accent2)' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
