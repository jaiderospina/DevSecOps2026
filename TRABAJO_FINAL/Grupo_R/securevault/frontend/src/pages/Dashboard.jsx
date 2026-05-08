import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { Link } from 'react-router-dom'

function StatCard({ label, value, color, icon }) {
  return (
    <div className="rounded-xl p-5 border flex items-center gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{label}</p>
        <p className="text-3xl font-mono font-bold mt-1" style={{ color: color || 'var(--text)' }}>{value ?? '—'}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentLogs, setRecentLogs] = useState([])

  useEffect(() => {
    api.get('/api/v1/audit/stats').then(r => setStats(r.data)).catch(() => {})
    api.get('/api/v1/audit/?limit=5').then(r => setRecentLogs(r.data)).catch(() => {})
  }, [])

  const actionColor = (action) => {
    if (action.includes('DELETE')) return 'var(--danger)'
    if (action.includes('REVEAL')) return 'var(--warn)'
    if (action.includes('ROTATE')) return 'var(--accent2)'
    return 'var(--accent)'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, <span style={{ color: 'var(--accent)' }} className="font-mono">{user?.username}</span></h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Role: <span className="font-mono uppercase">{user?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Secrets" value={stats?.total_secrets} color="var(--accent)" icon="🔑" />
        <StatCard label="Expired Secrets" value={stats?.expired_secrets} color="var(--danger)" icon="⚠️" />
        <StatCard label="Audit Events" value={stats?.total_audit_events} color="var(--accent2)" icon="📋" />
      </div>

      {stats?.expired_secrets > 0 && (
        <div className="rounded-xl p-4 border flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'var(--danger)' }}>
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--danger)' }}>
              {stats.expired_secrets} secret(s) require rotation
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              These credentials have not been rotated in 90+ days.{' '}
              <Link to="/secrets" className="underline" style={{ color: 'var(--accent2)' }}>Go to Secrets →</Link>
            </p>
          </div>
        </div>
      )}

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-sm font-semibold font-mono uppercase tracking-wider">Recent Activity</h2>
          <Link to="/audit" className="text-xs" style={{ color: 'var(--accent2)' }}>View all →</Link>
        </div>
        {recentLogs.length === 0 ? (
          <p className="px-5 py-4 text-sm" style={{ color: 'var(--muted)' }}>No activity yet.</p>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {recentLogs.map(log => (
              <div key={log.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.3)', color: actionColor(log.action) }}>
                    {log.action}
                  </span>
                  <span style={{ color: 'var(--muted)' }}>{log.resource_id?.slice(0, 8) || log.resource}</span>
                </div>
                <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
