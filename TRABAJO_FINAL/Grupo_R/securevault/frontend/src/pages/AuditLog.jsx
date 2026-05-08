import React, { useEffect, useState } from 'react'
import api from '../utils/api'

const ACTION_COLORS = {
  LOGIN: 'var(--accent)',
  REGISTER: 'var(--accent)',
  CREATE_SECRET: 'var(--accent2)',
  REVEAL_SECRET: 'var(--warn)',
  ROTATE_SECRET: 'var(--accent2)',
  DELETE_SECRET: 'var(--danger)',
}

export default function AuditLog() {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    api.get('/api/v1/audit/?limit=100').then(r => setLogs(r.data)).catch(() => {})
  }, [])

  const filtered = filter ? logs.filter(l => l.action.includes(filter.toUpperCase())) : logs

  return (
    <div className="space-y-5 fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Audit Log</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Immutable record of all actions — {logs.length} events
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          placeholder="Filter by action (e.g. REVEAL)..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm font-mono border outline-none w-64"
          style={{ background: 'var(--surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
        />
        {filter && (
          <button onClick={() => setFilter('')} className="text-xs font-mono" style={{ color: 'var(--muted)' }}>clear</button>
        )}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-xs font-mono uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <th className="px-5 py-3 text-left">Timestamp</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Resource</th>
              <th className="px-4 py-3 text-left">Details</th>
              <th className="px-4 py-3 text-left">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center" style={{ color: 'var(--muted)' }}>No logs found.</td></tr>
            ) : filtered.map(log => (
              <tr key={log.id} className="hover:bg-gray-900 transition-colors">
                <td className="px-5 py-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text)' }}>
                  {log.username}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{
                    color: ACTION_COLORS[log.action] || 'var(--text)',
                    background: 'rgba(0,0,0,0.3)'
                  }}>{log.action}</span>
                </td>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  {log.resource}{log.resource_id ? ` · ${log.resource_id.slice(0,8)}` : ''}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>
                  {log.details || '—'}
                </td>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  {log.ip_address || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
