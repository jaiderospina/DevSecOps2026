import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { to: '/secrets',   label: 'Secrets',   icon: '🔑' },
  { to: '/audit',     label: 'Audit Log', icon: '📋' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col border-r transition-all duration-300"
        style={{
          width: collapsed ? '64px' : '220px',
          background: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="text-2xl pulse-accent" style={{ color: 'var(--accent)' }}>⬡</span>
          {!collapsed && (
            <span className="font-mono font-bold tracking-widest text-sm" style={{ color: 'var(--accent)' }}>
              SECUREVAULT
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 font-medium
                ${isActive
                  ? 'text-white'
                  : 'hover:bg-gray-800'
                }`
              }
              style={({ isActive }) => isActive ? { background: 'rgba(0,212,170,0.12)', color: 'var(--accent)' } : { color: 'var(--muted)' }}
            >
              <span className="text-lg">{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User / logout */}
        <div className="border-t px-3 py-4 space-y-2" style={{ borderColor: 'var(--border)' }}>
          {!collapsed && (
            <div className="px-2">
              <p className="text-xs font-mono truncate" style={{ color: 'var(--accent)' }}>{user?.username}</p>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{user?.role}</p>
            </div>
          )}
          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 font-medium
              ${isActive ? '' : 'hover:bg-gray-800'}`
            }
            style={({ isActive }) => isActive ? { background: 'rgba(0,212,170,0.12)', color: 'var(--accent)' } : { color: 'var(--muted)' }}
            title="Cambiar contraseña"
          >
            <span className="text-lg">🔒</span>
            {!collapsed && <span className="text-xs">Cambiar Contraseña</span>}
          </NavLink>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-full flex items-center justify-center py-1 rounded text-xs transition-colors hover:bg-gray-800"
            style={{ color: 'var(--muted)' }}
          >
            {collapsed ? '→' : '←'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-red-950"
            style={{ color: 'var(--danger)' }}
          >
            <span>⏻</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 fade-in">
        <Outlet />
      </main>
    </div>
  )
}
