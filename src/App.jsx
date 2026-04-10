import React, { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, Building2, Package, Truck, Users, 
  ClipboardList, BarChart3, Bot, Bell, Search, Menu, XCircle,
  TrendingUp, TrendingDown, AlertTriangle, Package as PackageIcon,
  CheckCircle, Clock, MapPin, CreditCard, UserCheck, Download, Plus,
  ChevronDown
} from 'lucide-react'
import { sites as initialSites, materials as initialMaterials, vendors as initialVendors, tasks as initialTasks, workers as initialWorkers, alerts } from './data/mockData'

import Dashboard from './pages/Dashboard'
import Sites from './pages/Sites'
import Materials from './pages/Materials'
import Transfers from './pages/Transfers'
import Vendors from './pages/Vendors'
import Tasks from './pages/Tasks'
import Labor from './pages/Labor'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const formatNumber = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toString()
}

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <XCircle size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

// Form Field Component
export const FormField = ({ label, value, onChange, type = 'text', required = false, options = [] }) => (
  <div className="form-group">
    <label className="form-label">{label}{required && <span style={{ color: '#EF4444' }}> *</span>}</label>
    {type === 'select' ? (
      <select className="form-select" value={value} onChange={onChange} required={required}>
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : (
      <input className="form-input" type={type} value={value} onChange={onChange} required={required} />
    )}
  </div>
)

// Sidebar Component
const Sidebar = ({ collapsed, setCollapsed }) => {
  const navItems = [
    { section: 'Main', items: [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/sites', icon: Building2, label: 'Sites', badge: 5 },
    ]},
    { section: 'Operations', items: [
      { path: '/materials', icon: Package, label: 'Materials', badge: 50 },
      { path: '/transfers', icon: Truck, label: 'Transfers', badge: 3 },
      { path: '/vendors', icon: CreditCard, label: 'Vendors' },
    ]},
    { section: 'Workforce', items: [
      { path: '/tasks', icon: ClipboardList, label: 'Tasks' },
      { path: '/labor', icon: Users, label: 'Labor' },
    ]},
    { section: 'Analytics', items: [
      { path: '/reports', icon: BarChart3, label: 'Reports' },
      { path: '/ai', icon: Bot, label: 'AI Assistant' },
    ]}
  ]

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">S</div>
        <span className="sidebar-title">SiteOS</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((section, idx) => (
          <div key={idx} className="nav-section">
            <div className="nav-section-title">{section.section}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon className="nav-item-icon" size={20} />
                <span className="nav-item-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}

// Header Component
const Header = ({ title, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationCount = 5

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-btn" onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <button className="header-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            {notificationCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                background: '#EF4444',
                color: 'white',
                fontSize: '10px',
                fontWeight: '600',
                padding: '2px 5px',
                borderRadius: '10px',
                minWidth: '16px',
                textAlign: 'center'
              }}>
                {notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              width: 320,
              maxHeight: 400,
              overflow: 'auto',
              zIndex: 1000,
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ padding: 16, borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Notifications</div>
              </div>
              {alerts.slice(0, 5).map((alert, idx) => (
                <div key={idx} style={{
                  padding: 12,
                  borderBottom: idx < 4 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: alert.type === 'danger' ? '#EF4444' : alert.type === 'warning' ? '#F59E0B' : '#3B82F6',
                      marginTop: 6,
                      flexShrink: 0
                    }} />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{alert.title}</div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{alert.description}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{alert.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="user-avatar">RK</div>
      </div>
    </header>
  )
}

// Main Layout Component
const Layout = ({ children, sites }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  
  const getPageTitle = () => {
    const titles = {
      '/': 'Dashboard',
      '/sites': 'Sites',
      '/materials': 'Materials',
      '/transfers': 'Transfers',
      '/vendors': 'Vendors',
      '/tasks': 'Tasks',
      '/labor': 'Labor',
      '/reports': 'Reports',
      '/ai': 'AI Assistant'
    }
    return titles[location.pathname] || 'SiteOS'
  }

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className="main-content">
        <Header title={getPageTitle()} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        {React.cloneElement(children, { sites })}
      </main>
    </div>
  )
}

// App with Layout and State
export const AppWithState = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sites, setSites] = useState(initialSites)
  const [materials, setMaterials] = useState(initialMaterials)
  const [vendors, setVendors] = useState(initialVendors)
  const [tasks, setTasks] = useState(initialTasks)
  const [workers, setWorkers] = useState(initialWorkers)
  const location = useLocation()
  
  const getPageTitle = () => {
    const titles = {
      '/': 'Dashboard',
      '/sites': 'Sites',
      '/materials': 'Materials',
      '/transfers': 'Transfers',
      '/vendors': 'Vendors',
      '/tasks': 'Tasks',
      '/labor': 'Labor',
      '/reports': 'Reports',
      '/ai': 'AI Assistant'
    }
    return titles[location.pathname] || 'SiteOS'
  }

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className="main-content">
        <Header title={getPageTitle()} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Routes>
          <Route path="/" element={<Dashboard sites={sites} />} />
          <Route path="/sites" element={<Sites sites={sites} setSites={setSites} />} />
          <Route path="/materials" element={<Materials materials={materials} setMaterials={setMaterials} sites={sites} />} />
          <Route path="/transfers" element={<Transfers sites={sites} />} />
          <Route path="/vendors" element={<Vendors vendors={vendors} setVendors={setVendors} />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} sites={sites} />} />
          <Route path="/labor" element={<Labor workers={workers} setWorkers={setWorkers} sites={sites} />} />
          <Route path="/reports" element={<Reports sites={sites} />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </main>
    </div>
  )
}

export default AppWithState