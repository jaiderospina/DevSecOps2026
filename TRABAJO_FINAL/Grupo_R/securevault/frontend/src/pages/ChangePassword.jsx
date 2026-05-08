import React, { useState } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function ChangePassword() {
  const { user } = useAuth()
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (form.new_password !== form.confirm_password) {
      setError('Las contraseñas nuevas no coinciden'); return
    }
    if (form.new_password.length < 8) {
      setError('La contraseña nueva debe tener al menos 8 caracteres'); return
    }
    setLoading(true)
    try {
      await api.post('/api/v1/auth/change-password', {
        current_password: form.current_password,
        new_password: form.new_password,
      })
      setSuccess('¡Contraseña actualizada correctamente!')
      setForm({ current_password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cambiar la contraseña')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto space-y-5 fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Cambiar Contraseña</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Usuario: <span className="font-mono" style={{ color: 'var(--accent)' }}>{user?.username}</span>
          {' · '}
          <span className="uppercase font-mono">{user?.role}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl p-5 border space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div>
          <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Contraseña Actual
          </label>
          <input
            type="password"
            value={form.current_password}
            onChange={e => setForm(f => ({ ...f, current_password: e.target.value }))}
            required
            className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Nueva Contraseña
          </label>
          <input
            type="password"
            value={form.new_password}
            onChange={e => setForm(f => ({ ...f, new_password: e.target.value }))}
            required
            className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-mono mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            value={form.confirm_password}
            onChange={e => setForm(f => ({ ...f, confirm_password: e.target.value }))}
            required
            className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
          />
        </div>

        {error && (
          <p className="text-xs px-3 py-2 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>{error}</p>
        )}
        {success && (
          <p className="text-xs px-3 py-2 rounded" style={{ background: 'rgba(0,212,170,0.1)', color: 'var(--accent)' }}>{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-mono text-sm font-semibold disabled:opacity-50"
          style={{ background: 'var(--accent)', color: '#0a0e17' }}
        >
          {loading ? 'ACTUALIZANDO...' : 'CAMBIAR CONTRASEÑA'}
        </button>
      </form>
    </div>
  )
}
