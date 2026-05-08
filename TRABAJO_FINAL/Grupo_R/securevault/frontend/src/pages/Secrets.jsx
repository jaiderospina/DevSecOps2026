import React, { useEffect, useState, useCallback } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['api_key', 'password', 'token', 'certificate', 'other']

function Badge({ status }) {
  const colors = {
    active: { bg: 'rgba(0,212,170,0.12)', color: 'var(--accent)' },
    expired: { bg: 'rgba(239,68,68,0.12)', color: 'var(--danger)' },
    rotated: { bg: 'rgba(14,165,233,0.12)', color: 'var(--accent2)' },
  }
  const s = colors[status] || colors.active
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded uppercase tracking-wider" style={s}>{status}</span>
  )
}

function SharedBadge() {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded uppercase tracking-wider ml-1"
      style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>shared</span>
  )
}

// Modal para gestionar accesos a un secreto
function AccessModal({ secret, currentUser, onClose }) {
  const [accesses, setAccesses] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const [accessRes, usersRes] = await Promise.all([
        api.get(`/api/v1/secrets/${secret.id}/access`),
        api.get('/api/v1/auth/users'),
      ])
      setAccesses(accessRes.data)
      const alreadyGrantedIds = new Set(accessRes.data.map(a => a.granted_to_user_id))
      // Filtrar usuarios que ya tienen acceso y el propio usuario
      setUsers(usersRes.data.filter(u => !alreadyGrantedIds.has(u.id) && u.id !== currentUser?.id))
    } catch (e) {
      setError('Error al cargar datos')
    }
  }, [secret.id, currentUser])

  useEffect(() => { fetchData() }, [fetchData])

  const grantAccess = async () => {
    if (!selectedUsers.length) return
    setLoading(true); setError('')
    try {
      await api.post(`/api/v1/secrets/${secret.id}/access`, { user_ids: selectedUsers })
      setSelectedUsers([])
      fetchData()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al otorgar acceso')
    } finally { setLoading(false) }
  }

  const revokeAccess = async (userId) => {
    try {
      await api.delete(`/api/v1/secrets/${secret.id}/access/${userId}`)
      fetchData()
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al revocar acceso')
    }
  }

  const toggleUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="rounded-xl border p-6 w-full max-w-lg fade-in" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
            Gestionar Accesos — {secret.name}
          </h2>
          <button onClick={onClose} className="text-xs font-mono" style={{ color: 'var(--muted)' }}>✕ cerrar</button>
        </div>

        {error && <p className="text-xs px-3 py-2 rounded mb-3" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>{error}</p>}

        {/* Accesos actuales */}
        <div className="mb-4">
          <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Accesos Activos</p>
          {accesses.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Sin accesos asignados.</p>
          ) : (
            <div className="space-y-2">
              {accesses.map(a => (
                <div key={a.id} className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: 'var(--bg)', borderColor: 'var(--border)', border: '1px solid var(--border)' }}>
                  <div>
                    <span className="font-mono text-sm font-semibold">{a.granted_to_username}</span>
                    <span className="text-xs ml-2 font-mono uppercase px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(14,165,233,0.1)', color: 'var(--accent2)' }}>{a.granted_to_role}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>por {a.granted_by_username}</span>
                  </div>
                  <button onClick={() => revokeAccess(a.granted_to_user_id)}
                    className="text-xs font-mono px-2 py-1 rounded hover:bg-gray-700"
                    style={{ color: 'var(--danger)' }}>revocar</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Otorgar nuevo acceso */}
        {users.length > 0 && (
          <div>
            <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>
              {currentUser?.role === 'editor' ? 'Asignar a Viewer' : 'Asignar a Usuario'}
            </p>
            <div className="space-y-1 max-h-36 overflow-y-auto mb-3">
              {users.map(u => (
                <label key={u.id} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800"
                  style={{ background: selectedUsers.includes(u.id) ? 'rgba(0,212,170,0.07)' : 'var(--bg)' }}>
                  <input type="checkbox" checked={selectedUsers.includes(u.id)} onChange={() => toggleUser(u.id)}
                    className="accent-teal-400" />
                  <span className="font-mono text-sm">{u.username}</span>
                  <span className="text-xs font-mono uppercase px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(14,165,233,0.1)', color: 'var(--accent2)' }}>{u.role}</span>
                </label>
              ))}
            </div>
            <button onClick={grantAccess} disabled={loading || !selectedUsers.length}
              className="px-4 py-2 rounded-lg font-mono text-xs font-semibold disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#0a0e17' }}>
              {loading ? 'ASIGNANDO...' : `ASIGNAR (${selectedUsers.length})`}
            </button>
          </div>
        )}
        {users.length === 0 && accesses.length > 0 && (
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Todos los usuarios disponibles ya tienen acceso.</p>
        )}
        {users.length === 0 && accesses.length === 0 && (
          <p className="text-xs" style={{ color: 'var(--muted)' }}>No hay usuarios disponibles para asignar.</p>
        )}
      </div>
    </div>
  )
}

export default function Secrets() {
  const { user } = useAuth()
  const [secrets, setSecrets] = useState([])
  const [revealed, setRevealed] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [rotateId, setRotateId] = useState(null)
  const [editId, setEditId] = useState(null)
  const [accessModalSecret, setAccessModalSecret] = useState(null)
  const [form, setForm] = useState({ name: '', description: '', value: '', category: 'other' })
  const [editForm, setEditForm] = useState({ name: '', description: '', category: 'other' })
  const [rotateVal, setRotateVal] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // Para admin: lista de usuarios al crear
  const [allUsers, setAllUsers] = useState([])
  const [assignUsers, setAssignUsers] = useState([])

  const fetchSecrets = () => api.get('/api/v1/secrets/').then(r => setSecrets(r.data)).catch(() => {})

  useEffect(() => {
    fetchSecrets()
    if (user?.role === 'admin' || user?.role === 'editor') {
      api.get('/api/v1/auth/users').then(r => setAllUsers(r.data)).catch(() => {})
    }
  }, [user])

  const createSecret = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = { ...form }
      if (user?.role === 'admin') payload.assign_to_user_ids = assignUsers
      await api.post('/api/v1/secrets/', payload)
      setForm({ name: '', description: '', value: '', category: 'other' })
      setAssignUsers([])
      setShowForm(false)
      fetchSecrets()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error creating secret')
    } finally { setLoading(false) }
  }

  const revealSecret = async (id) => {
    if (revealed[id]) { setRevealed(r => ({ ...r, [id]: null })); return }
    try {
      const r = await api.get(`/api/v1/secrets/${id}/reveal`)
      setRevealed(rv => ({ ...rv, [id]: r.data.value }))
    } catch (err) {
      alert(err.response?.data?.detail || 'Cannot reveal')
    }
  }

  const rotateSecret = async (id) => {
    if (!rotateVal.trim()) return
    try {
      await api.put(`/api/v1/secrets/${id}/rotate`, { value: rotateVal })
      setRotateId(null); setRotateVal('')
      fetchSecrets()
    } catch (err) { alert(err.response?.data?.detail || 'Error rotating') }
  }

  const saveEdit = async (id) => {
    try {
      await api.put(`/api/v1/secrets/${id}`, editForm)
      setEditId(null)
      fetchSecrets()
    } catch (err) { alert(err.response?.data?.detail || 'Error editing') }
  }

  const deleteSecret = async (id) => {
    if (!confirm('¿Eliminar este secreto? Esta acción no se puede deshacer.')) return
    try { await api.delete(`/api/v1/secrets/${id}`); fetchSecrets() }
    catch (err) { alert(err.response?.data?.detail || 'Error deleting') }
  }

  const canCreate = user?.role !== 'viewer'
  const canManage = (secret) => {
    // Admin siempre puede; editor solo si es dueño; viewer nunca
    if (user?.role === 'admin') return true
    if (user?.role === 'editor' && !secret.is_shared) return true
    return false
  }
  const canAssign = (secret) => {
    if (user?.role === 'admin') return true
    if (user?.role === 'editor' && !secret.is_shared) return true
    return false
  }

  return (
    <div className="space-y-5 fade-in">
      {accessModalSecret && (
        <AccessModal
          secret={accessModalSecret}
          currentUser={user}
          onClose={() => { setAccessModalSecret(null); fetchSecrets() }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Secrets</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{secrets.length} credential(s) stored</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowForm(s => !s)}
            className="px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-opacity"
            style={{ background: 'var(--accent)', color: '#0a0e17' }}
          >
            {showForm ? '✕ Cancel' : '+ New Secret'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={createSecret} className="rounded-xl p-5 border space-y-3 fade-in" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>New Secret</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>NAME</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
                style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>CATEGORY</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none"
                style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>SECRET VALUE</label>
            <input type="password" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} required
              className="w-full px-3 py-2 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
              style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>DESCRIPTION (optional)</label>
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-teal-400"
              style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
          </div>

          {/* Admin: asignar al crear */}
          {user?.role === 'admin' && allUsers.length > 0 && (
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>ASIGNAR A (opcional)</label>
              <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto p-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                {allUsers.map(u => (
                  <label key={u.id} className="flex items-center gap-2 text-xs font-mono cursor-pointer py-1">
                    <input type="checkbox"
                      checked={assignUsers.includes(u.id)}
                      onChange={() => setAssignUsers(prev => prev.includes(u.id) ? prev.filter(x => x !== u.id) : [...prev, u.id])}
                      className="accent-teal-400" />
                    <span>{u.username}</span>
                    <span className="uppercase px-1 rounded" style={{ background: 'rgba(14,165,233,0.1)', color: 'var(--accent2)' }}>{u.role}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-xs px-3 py-2 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>{error}</p>}
          <button type="submit" disabled={loading}
            className="px-5 py-2 rounded-lg font-mono text-sm font-semibold disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#0a0e17' }}>
            {loading ? 'SAVING...' : 'STORE SECRET'}
          </button>
        </form>
      )}

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {secrets.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>No secrets stored yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs font-mono uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Rotated</th>
                <th className="px-4 py-3 text-left">Value</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {secrets.map(s => (
                <React.Fragment key={s.id}>
                  <tr className="hover:bg-gray-900 transition-colors">
                    <td className="px-5 py-3 font-mono font-semibold" style={{ color: 'var(--text)' }}>
                      {s.name}
                      {s.is_shared && <SharedBadge />}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(14,165,233,0.1)', color: 'var(--accent2)' }}>{s.category}</span>
                    </td>
                    <td className="px-4 py-3"><Badge status={s.status} /></td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                      {new Date(s.last_rotated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs max-w-xs">
                      {revealed[s.id]
                        ? <span style={{ color: 'var(--warn)' }}>{revealed[s.id]}</span>
                        : <span style={{ color: 'var(--muted)' }}>••••••••••••</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => revealSecret(s.id)}
                          className="text-xs px-2 py-1 rounded font-mono transition-colors hover:bg-gray-700"
                          style={{ color: 'var(--accent2)' }}>
                          {revealed[s.id] ? 'hide' : 'reveal'}
                        </button>

                        {canManage(s) && (
                          <>
                            <button onClick={() => {
                              setEditId(editId === s.id ? null : s.id)
                              setEditForm({ name: s.name, description: s.description || '', category: s.category })
                            }}
                              className="text-xs px-2 py-1 rounded font-mono transition-colors hover:bg-gray-700"
                              style={{ color: 'var(--accent)' }}>edit</button>
                            <button onClick={() => { setRotateId(rotateId === s.id ? null : s.id); setRotateVal('') }}
                              className="text-xs px-2 py-1 rounded font-mono transition-colors hover:bg-gray-700"
                              style={{ color: 'var(--accent)' }}>rotate</button>
                            <button onClick={() => deleteSecret(s.id)}
                              className="text-xs px-2 py-1 rounded font-mono transition-colors hover:bg-gray-700"
                              style={{ color: 'var(--danger)' }}>delete</button>
                          </>
                        )}

                        {canAssign(s) && (
                          <button onClick={() => setAccessModalSecret(s)}
                            className="text-xs px-2 py-1 rounded font-mono transition-colors hover:bg-gray-700"
                            style={{ color: '#fbbf24' }}>accesos</button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Fila de edición */}
                  {editId === s.id && (
                    <tr style={{ background: 'rgba(0,212,170,0.04)' }}>
                      <td colSpan={6} className="px-5 py-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <input placeholder="Nombre" value={editForm.name}
                            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                            className="px-3 py-1.5 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
                            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
                          <input placeholder="Descripción" value={editForm.description}
                            onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                            className="flex-1 px-3 py-1.5 rounded-lg text-sm border outline-none focus:border-teal-400"
                            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
                          <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                            className="px-3 py-1.5 rounded-lg text-sm font-mono border outline-none"
                            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <button onClick={() => saveEdit(s.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                            style={{ background: 'var(--accent)', color: '#0a0e17' }}>Guardar</button>
                          <button onClick={() => setEditId(null)}
                            className="text-xs font-mono" style={{ color: 'var(--muted)' }}>cancelar</button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Fila de rotación */}
                  {rotateId === s.id && (
                    <tr style={{ background: 'rgba(0,212,170,0.04)' }}>
                      <td colSpan={6} className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <input type="password" placeholder="New secret value..." value={rotateVal}
                            onChange={e => setRotateVal(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg text-sm font-mono border outline-none focus:border-teal-400"
                            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }} />
                          <button onClick={() => rotateSecret(s.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                            style={{ background: 'var(--accent)', color: '#0a0e17' }}>Confirm Rotate</button>
                          <button onClick={() => setRotateId(null)}
                            className="text-xs font-mono" style={{ color: 'var(--muted)' }}>cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
