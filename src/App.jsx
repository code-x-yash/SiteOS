import React, { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, Building2, Package, Truck, Users, 
  ClipboardList, FileText, BarChart3, Bot, Bell, Search,
  Menu, X, ChevronDown, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, Clock, MapPin, Calendar, DollarSign, PackageCheck,
  ArrowRight, ArrowUpRight, ArrowDownRight, Activity, CreditCard,
  Wrench, UserCheck, Filter, Download, Send, Sparkles, Plus, XCircle
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, AreaChart
} from 'recharts'
import {
  sites as initialSites, materials as initialMaterials, materialMovements, vendors as initialVendors, purchaseOrders,
  tasks as initialTasks, workers as initialWorkers, transfers, activities, alerts, costData,
  materialUsageData, sitePerformanceData, getMaterialStockBySite,
  getSiteById, getMaterialById, getVendorById, getTotalMaterialValue,
  getTotalBudget, getTotalSpent, getActiveTasksCount, aiSuggestions
} from './data/mockData'

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
const Modal = ({ isOpen, onClose, title, children }) => {
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
const FormField = ({ label, value, onChange, type = 'text', required = false, options = [] }) => (
  <div className="form-group">
    <label className="form-label">{label}{required && <span style={{ color: '#EF4444' }}> *</span>}</label>
    {type === 'select' ? (
      <select className="form-select" value={value} onChange={onChange} required={required}>
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea className="form-input" value={value} onChange={onChange} rows={3} />
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

// Dashboard Component
const Dashboard = ({ sites }) => {
  const totalMaterialValue = getTotalMaterialValue()
  const totalBudget = getTotalBudget()
  const totalSpent = getTotalSpent()
  const activeTasks = getActiveTasksCount()
  
  const burnRate = ((totalSpent / totalBudget) * 100).toFixed(1)

  return (
    <div className="page-content fade-in">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Sites</div>
            <div className="stat-value">{sites.length}</div>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>2 new this month</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <ClipboardList size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Tasks</div>
            <div className="stat-value">{activeTasks}</div>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>8 completed</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Material Value</div>
            <div className="stat-value">{formatCurrency(totalMaterialValue)}</div>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>+12% this month</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Cost Burn Rate</div>
            <div className="stat-value">{burnRate}%</div>
            <div className="stat-trend down">
              <TrendingDown size={14} />
              <span>On track</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cost Trends</h3>
          </div>
          <div className="card-body">
            <AreaChartComponent data={costData} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="card-body">
            <div className="activity-feed">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon`} style={{
                    background: activity.color === 'green' ? 'rgba(34,197,94,0.1)' :
                               activity.color === 'orange' ? 'rgba(245,158,11,0.1)' :
                               activity.color === 'red' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                    color: activity.color === 'green' ? '#22C55E' :
                           activity.color === 'orange' ? '#F59E0B' :
                           activity.color === 'red' ? '#EF4444' : '#3B82F6'
                  }}>
                    {activity.icon === 'package' ? <Package size={18} /> :
                     activity.icon === 'check-circle' ? <CheckCircle size={18} /> :
                     activity.icon === 'alert-triangle' ? <AlertTriangle size={18} /> :
                     activity.icon === 'truck' ? <Truck size={18} /> :
                     activity.icon === 'trending-up' ? <TrendingUp size={18} /> :
                     <Clock size={18} />}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-desc">{activity.description}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Site Performance</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sitePerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={11} width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#3B82F6" name="Progress %" radius={[0, 4, 4, 0]} />
                <Bar dataKey="budget" fill="#22C55E" name="Budget %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Alerts</h3>
            <span className="badge badge-danger">{alerts.length}</span>
          </div>
          <div className="card-body">
            <div className="alerts-list">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  <AlertTriangle className="alert-icon" size={20} />
                  <div className="alert-content">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-desc">{alert.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Sites Overview</h3>
            <button className="btn btn-secondary btn-sm">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Location</th>
                  <th>Progress</th>
                  <th>Active Tasks</th>
                  <th>Budget Used</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, #1E3A5F, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                          {site.image}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{site.name}</div>
                          <div style={{ fontSize: 12, color: '#94A3B8' }}>{site.manager}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B' }}>
                        <MapPin size={14} />
                        {site.location}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className={`progress-fill ${site.progress > 70 ? 'green' : site.progress > 40 ? 'blue' : 'orange'}`} style={{ width: `${site.progress}%` }}></div>
                        </div>
                        <span style={{ fontWeight: 500 }}>{site.progress}%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-info">{site.activeTasks}</span></td>
                    <td>
                      <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
                        {formatCurrency(site.spent)}
                      </div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>of {formatCurrency(site.budget)}</div>
                    </td>
                    <td>
                      <span className={`badge ${site.status === 'active' ? 'badge-success' : site.status === 'delayed' ? 'badge-danger' : 'badge-neutral'}`}>
                        {site.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// AreaChart helper
const AreaChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorMaterial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
      <Tooltip formatter={(value) => formatCurrency(value)} />
      <Area type="monotone" dataKey="material" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMaterial)" strokeWidth={2} />
      <Area type="monotone" dataKey="labor" stroke="#22C55E" fillOpacity={0.1} fill="#22C55E" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
)

// Sites Component
const Sites = ({ sites, setSites }) => {
  const [view, setView] = useState('grid')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '', location: '', type: 'Commercial', budget: '', manager: ''
  })

  const handleAddSite = () => {
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newSite = {
      id: `site-${Date.now()}`,
      name: formData.name || 'New Construction Site',
      location: formData.location || 'New Location',
      type: formData.type,
      progress: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      budget: parseInt(formData.budget) || 10000000,
      spent: 0,
      activeTasks: 0,
      workers: 0,
      manager: formData.manager || 'TBD',
      image: '🏗️'
    }
    setSites([...sites, newSite])
    setShowModal(false)
    setFormData({ name: '', location: '', type: 'Commercial', budget: '', manager: '' })
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Construction Sites</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>Manage and monitor all your construction projects</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 8, padding: 4 }}>
            <button
              onClick={() => setView('grid')}
              className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-ghost'}`}
            >
              List
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleAddSite}>
            <Plus size={18} />
            Add Site
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Site">
        <form onSubmit={handleSubmit}>
          <FormField label="Site Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <FormField label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
          <FormField label="Type" type="select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} 
            options={[
              { value: 'Commercial', label: 'Commercial' },
              { value: 'Residential', label: 'Residential' },
              { value: 'Hospitality', label: 'Hospitality' },
              { value: 'Infrastructure', label: 'Infrastructure' }
            ]} />
          <FormField label="Budget (₹)" type="number" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="10000000" />
          <FormField label="Project Manager" value={formData.manager} onChange={(e) => setFormData({...formData, manager: e.target.value})} />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Site</button>
          </div>
        </form>
      </Modal>

      <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr', gap: 20 }}>
        {sites.map((site) => (
          <div key={site.id} className="site-card">
            <div className="site-image">{site.image}</div>
            <div className="site-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="site-name">{site.name}</div>
                  <div className="site-location">
                    <MapPin size={12} />
                    {site.location}
                  </div>
                </div>
                <span className={`badge ${site.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                  {site.status}
                </span>
              </div>
              
              <div className="site-stats">
                <div className="site-stat">
                  <div className="site-stat-value">{site.progress}%</div>
                  <div className="site-stat-label">Progress</div>
                </div>
                <div className="site-stat">
                  <div className="site-stat-value">{site.activeTasks}</div>
                  <div className="site-stat-label">Tasks</div>
                </div>
                <div className="site-stat">
                  <div className="site-stat-value">{site.workers}</div>
                  <div className="site-stat-label">Workers</div>
                </div>
              </div>
              
              <div className="site-progress">
                <div className="progress-bar">
                  <div className={`progress-fill ${site.progress > 70 ? 'green' : site.progress > 40 ? 'blue' : 'orange'}`} style={{ width: `${site.progress}%` }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>BUDGET</div>
                  <div style={{ fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{formatCurrency(site.budget)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>SPENT</div>
                  <div style={{ fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{formatCurrency(site.spent)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>MANAGER</div>
                  <div style={{ fontWeight: 500 }}>{site.manager.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Materials Component
const Materials = ({ materials, setMaterials, sites }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '', category: 'Cement', unit: 'pcs', price: '', totalStock: '', minStock: ''
  })
  
  const categories = [...new Set(materials.map(m => m.category))]
  
  const filteredMaterials = materials.filter(mat => {
    const matchesSearch = mat.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || mat.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (mat) => {
    if (mat.totalStock < mat.minStock) return 'danger'
    if (mat.totalStock < mat.minStock * 1.5) return 'warning'
    return 'success'
  }

  const handleAddMaterial = () => {
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMaterial = {
      id: `mat-${Date.now()}`,
      name: formData.name || 'New Material',
      category: formData.category,
      unit: formData.unit,
      price: parseInt(formData.price) || 100,
      totalStock: parseInt(formData.totalStock) || 0,
      minStock: parseInt(formData.minStock) || 100
    }
    setMaterials([...materials, newMaterial])
    setShowModal(false)
    setFormData({ name: '', category: 'Cement', unit: 'pcs', price: '', totalStock: '', minStock: '' })
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Material Intelligence</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>{materials.length} materials across {sites.length} sites</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddMaterial}>
          <Plus size={18} />
          Add Material
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Material">
        <form onSubmit={handleSubmit}>
          <FormField label="Material Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <FormField label="Category" type="select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
            options={categories.map(c => ({ value: c, label: c }))} />
          <FormField label="Unit" type="select" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}
            options={[
              { value: 'pcs', label: 'Pieces' },
              { value: 'bag', label: 'Bags' },
              { value: 'ton', label: 'Tons' },
              { value: 'kg', label: 'Kilograms' },
              { value: 'meter', label: 'Meters' },
              { value: 'sqft', label: 'Square Feet' },
              { value: 'cuft', label: 'Cubic Feet' },
              { value: 'liter', label: 'Liters' }
            ]} />
          <FormField label="Price per Unit (₹)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
          <FormField label="Initial Stock" type="number" value={formData.totalStock} onChange={(e) => setFormData({...formData, totalStock: e.target.value})} />
          <FormField label="Minimum Stock Alert" type="number" value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: e.target.value})} />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Material</button>
          </div>
        </form>
      </Modal>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="search-box" style={{ width: 300 }}>
              <Search size={18} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{ width: 180 }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-secondary btn-sm">
            <Download size={16} />
            Export
          </button>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gap: 12 }}>
            {filteredMaterials.slice(0, 15).map((mat) => (
              <div key={mat.id} className="material-row">
                <div className="material-icon">
                  <Package size={20} />
                </div>
                <div className="material-info">
                  <div className="material-name">{mat.name}</div>
                  <div className="material-category">{mat.category}</div>
                </div>
                <div className="material-stock">
                  <div className="material-qty" style={{ color: getStockStatus(mat) === 'danger' ? '#EF4444' : getStockStatus(mat) === 'warning' ? '#F59E0B' : '#0F172A' }}>
                    {formatNumber(mat.totalStock)}
                  </div>
                  <div className="material-unit">{mat.unit}s</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`status-dot ${getStockStatus(mat)}`}></span>
                    <span style={{ fontSize: 12, color: '#64748B' }}>
                      Min: {formatNumber(mat.minStock)}
                    </span>
                  </div>
                </div>
                <div className="material-value">
                  {formatCurrency(mat.totalStock * mat.price)}
                </div>
                <button className="btn btn-ghost btn-sm">
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Transfers Component
const Transfers = () => {
  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Multi-Site Transfers</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>Track material transfers between sites</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Transfer
        </button>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {transfers.map((transfer) => {
          const material = getMaterialById(transfer.materialId)
          const fromSite = getSiteById(transfer.fromSite)
          const toSite = getSiteById(transfer.toSite)
          
          return (
            <div key={transfer.id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600 }}>{fromSite?.name.split(' ')[0]}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>From</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 2, background: '#E2E8F0' }}></div>
                      <div style={{ 
                        width: 40, height: 40, borderRadius: '50%', 
                        background: transfer.status === 'received' ? '#22C55E' : transfer.status === 'in_transit' ? '#3B82F6' : '#F59E0B',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                      }}>
                        <Truck size={18} />
                      </div>
                      <div style={{ width: 40, height: 2, background: '#E2E8F0' }}></div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600 }}>{toSite?.name.split(' ')[0]}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>To</div>
                    </div>
                  </div>
                  <span className={`badge ${
                    transfer.status === 'received' ? 'badge-success' : 
                    transfer.status === 'in_transit' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {transfer.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div style={{ marginTop: 20, padding: 16, background: '#F8FAFC', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>MATERIAL</div>
                      <div style={{ fontWeight: 500 }}>{material?.name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>QUANTITY</div>
                      <div style={{ fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{transfer.quantity} {material?.unit}s</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>REQUESTED BY</div>
                      <div style={{ fontWeight: 500 }}>{transfer.requestedBy}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>APPROVED BY</div>
                      <div style={{ fontWeight: 500 }}>{transfer.approvedBy || 'Pending'}</div>
                    </div>
                  </div>
                </div>

                <div className="timeline" style={{ marginTop: 20 }}>
                  <div className="timeline-item">
                    <div className="timeline-dot completed">
                      <CheckCircle size={12} />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">Transfer Requested</div>
                      <div className="timeline-time">{transfer.requestedDate}</div>
                    </div>
                  </div>
                  {transfer.shippedDate && (
                    <div className="timeline-item">
                      <div className={`timeline-dot ${transfer.status === 'received' ? 'completed' : 'active'}`}>
                        {transfer.status === 'received' ? <CheckCircle size={12} /> : <Truck size={12} />}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-title">Shipped</div>
                        <div className="timeline-time">{transfer.shippedDate}</div>
                      </div>
                    </div>
                  )}
                  {transfer.receivedDate && (
                    <div className="timeline-item">
                      <div className="timeline-dot completed">
                        <PackageCheck size={12} />
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-title">Received</div>
                        <div className="timeline-time">{transfer.receivedDate}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Vendors Component
const Vendors = ({ vendors, setVendors }) => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '', category: 'General', contact: '', email: ''
  })

  const handleAddVendor = () => {
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newVendor = {
      id: `ven-${Date.now()}`,
      name: formData.name || 'New Vendor',
      category: formData.category,
      contact: formData.contact || '+91 98765 00000',
      email: formData.email || 'new@vendor.com',
      rating: 4.0,
      totalOrders: 0,
      pendingPayments: 0
    }
    setVendors([...vendors, newVendor])
    setShowModal(false)
    setFormData({ name: '', category: 'General', contact: '', email: '' })
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Vendor Management</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>{vendors.length} active vendors</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddVendor}>
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Vendor">
        <form onSubmit={handleSubmit}>
          <FormField label="Vendor Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <FormField label="Category" type="select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
            options={[
              { value: 'Cement', label: 'Cement' },
              { value: 'Steel', label: 'Steel' },
              { value: 'Aggregates', label: 'Aggregates' },
              { value: 'Paint', label: 'Paint' },
              { value: 'Tiles', label: 'Tiles' },
              { value: 'Plumbing', label: 'Plumbing' },
              { value: 'Electrical', label: 'Electrical' },
              { value: 'General', label: 'General' }
            ]} />
          <FormField label="Contact Number" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} placeholder="+91 98765 00000" />
          <FormField label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="vendor@email.com" />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Vendor</button>
          </div>
        </form>
      </Modal>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Purchase Orders</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary btn-sm">Filter</button>
            <button className="btn btn-secondary btn-sm">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Vendor</th>
                <th>Site</th>
                <th>Amount</th>
                <th>Items</th>
                <th>Received</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => {
                const vendor = getVendorById(po.vendorId)
                const site = getSiteById(po.siteId)
                return (
                  <tr key={po.id}>
                    <td style={{ fontWeight: 600, fontFamily: 'JetBrains Mono' }}>{po.poNumber}</td>
                    <td>{vendor?.name}</td>
                    <td>{site?.name.split(' ')[0]}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 500 }}>{formatCurrency(po.amount)}</td>
                    <td>{po.items}</td>
                    <td>{po.received}/{po.items}</td>
                    <td>
                      <span className={`badge ${
                        po.status === 'approved' ? 'badge-success' :
                        po.status === 'pending' ? 'badge-warning' :
                        po.status === 'in_transit' ? 'badge-info' : 'badge-neutral'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                    <td style={{ color: '#64748B' }}>{po.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Vendor Directory</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {vendors.slice(0, 8).map((vendor) => (
                <div key={vendor.id} style={{ padding: 16, background: '#F8FAFC', borderRadius: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{vendor.name}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{vendor.category}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#F59E0B' }}>★</span>
                      <span style={{ fontWeight: 500 }}>{vendor.rating}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: '#64748B' }}>Total Orders</span>
                      <span style={{ fontWeight: 500 }}>{vendor.totalOrders}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 4 }}>
                      <span style={{ color: '#64748B' }}>Pending</span>
                      <span style={{ fontWeight: 500, fontFamily: 'JetBrains Mono' }}>{formatCurrency(vendor.pendingPayments)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tasks Component
const Tasks = ({ tasks, setTasks, sites }) => {
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '', siteId: '', priority: 'medium', assignee: '', dueDate: ''
  })
  
  const statusColumns = [
    { status: 'pending', label: 'Pending', color: '#F59E0B' },
    { status: 'in_progress', label: 'In Progress', color: '#3B82F6' },
    { status: 'done', label: 'Done', color: '#22C55E' }
  ]

  const handleAddTask = () => {
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = {
      id: `task-${Date.now()}`,
      title: formData.title || 'New Task',
      siteId: formData.siteId || 'site-001',
      status: 'pending',
      progress: 0,
      assignee: formData.assignee || 'Unassigned',
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      priority: formData.priority,
      materials: []
    }
    setTasks([...tasks, newTask])
    setShowModal(false)
    setFormData({ title: '', siteId: '', priority: 'medium', assignee: '', dueDate: '' })
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Task Management</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>{tasks.length} active tasks across all sites</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddTask}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Task">
        <form onSubmit={handleSubmit}>
          <FormField label="Task Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <FormField label="Site" type="select" value={formData.siteId} onChange={(e) => setFormData({...formData, siteId: e.target.value})}
            options={sites.map(s => ({ value: s.id, label: s.name }))} />
          <FormField label="Priority" type="select" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}
            options={[
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]} />
          <FormField label="Assignee" value={formData.assignee} onChange={(e) => setFormData({...formData, assignee: e.target.value})} placeholder="Worker name" />
          <FormField label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Task</button>
          </div>
        </form>
      </Modal>

      <div className="kanban-board">
        {statusColumns.map((column) => {
          const columnTasks = tasks.filter(t => t.status === column.status)
          return (
            <div key={column.status} className="kanban-column">
              <div className="kanban-header">
                <div className="kanban-title">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: column.color, display: 'inline-block' }}></span>
                  {column.label}
                  <span className="kanban-count">{columnTasks.length}</span>
                </div>
              </div>
              <div className="kanban-cards">
                {columnTasks.map((task) => {
                  const site = getSiteById(task.siteId)
                  return (
                    <div key={task.id} className="kanban-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <span className={`badge ${
                          task.priority === 'high' ? 'badge-danger' :
                          task.priority === 'medium' ? 'badge-warning' : 'badge-neutral'
                        }`}>
                          {task.priority}
                        </span>
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>{task.dueDate}</span>
                      </div>
                      <div className="kanban-card-title">{task.title}</div>
                      <div className="kanban-card-meta">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Building2 size={12} />
                          {site?.name.split(' ')[0]}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <UserCheck size={12} />
                          {task.assignee.split(' ')[0]}
                        </span>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                          <span style={{ color: '#64748B' }}>Progress</span>
                          <span style={{ fontWeight: 500 }}>{task.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill blue" style={{ width: `${task.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Labor Component
const Labor = ({ workers, setWorkers, sites }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedWorkers, setSelectedWorkers] = useState([])
  const [formData, setFormData] = useState({
    name: '', role: 'Labor', siteId: '', dailyWage: '', phone: ''
  })
  
  const handleAddWorker = () => {
    setShowAddModal(true)
  }

  const handleSubmitWorker = (e) => {
    e.preventDefault()
    const newWorker = {
      id: `wkr-${Date.now()}`,
      name: formData.name || 'New Worker',
      role: formData.role,
      siteId: formData.siteId || 'site-001',
      dailyWage: parseInt(formData.dailyWage) || 600,
      attendance: 0,
      overtime: 0,
      status: 'active',
      phone: formData.phone || '+91 98765 00000'
    }
    setWorkers([...workers, newWorker])
    setShowAddModal(false)
    setFormData({ name: '', role: 'Labor', siteId: '', dailyWage: '', phone: '' })
  }

  const handleMarkAttendance = () => {
    setShowAttendanceModal(true)
    setSelectedWorkers(workers.map(w => ({ ...w, present: w.status !== 'on_leave' })))
  }

  const handleSaveAttendance = () => {
    const updatedWorkers = workers.map(w => {
      const selected = selectedWorkers.find(sw => sw.id === w.id)
      return {
        ...w,
        attendance: selected && selected.present ? w.attendance + 1 : w.attendance
      }
    })
    setWorkers(updatedWorkers)
    setShowAttendanceModal(false)
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Labor Management</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>{workers.length} workers across all sites</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={handleMarkAttendance}>
            <UserCheck size={18} />
            Mark Attendance
          </button>
          <button className="btn btn-primary" onClick={handleAddWorker}>
            <Plus size={18} />
            Add Worker
          </button>
        </div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Worker">
        <form onSubmit={handleSubmitWorker}>
          <FormField label="Worker Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <FormField label="Role" type="select" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
            options={[
              { value: 'Supervisor', label: 'Supervisor' },
              { value: 'Mason', label: 'Mason' },
              { value: 'Electrician', label: 'Electrician' },
              { value: 'Plumber', label: 'Plumber' },
              { value: 'Labor', label: 'Labor' },
              { value: 'Carpenter', label: 'Carpenter' },
              { value: 'Painter', label: 'Painter' }
            ]} />
          <FormField label="Site" type="select" value={formData.siteId} onChange={(e) => setFormData({...formData, siteId: e.target.value})}
            options={sites.map(s => ({ value: s.id, label: s.name }))} />
          <FormField label="Daily Wage (₹)" type="number" value={formData.dailyWage} onChange={(e) => setFormData({...formData, dailyWage: e.target.value})} required />
          <FormField label="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91 98765 00000" />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add Worker</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAttendanceModal} onClose={() => setShowAttendanceModal(false)} title="Mark Attendance">
        <div style={{ maxHeight: 400, overflow: 'auto' }}>
          <p style={{ marginBottom: 16, color: '#64748B' }}>Select workers present today:</p>
          {selectedWorkers.map(w => (
            <div key={w.id} style={{ 
              display: 'flex', alignItems: 'center', gap: 12, padding: 12, 
              background: w.present ? 'rgba(34,197,94,0.1)' : '#F8FAFC', 
              borderRadius: 8, marginBottom: 8, cursor: 'pointer' 
            }}
            onClick={() => setSelectedWorkers(selectedWorkers.map(sw => sw.id === w.id ? { ...sw, present: !sw.present } : sw))}>
              <input type="checkbox" checked={w.present} onChange={() => {}} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{w.role}</div>
              </div>
              <span className={`badge ${w.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                {w.status}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-secondary" onClick={() => setShowAttendanceModal(false)} style={{ flex: 1 }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSaveAttendance} style={{ flex: 1 }}>Save Attendance</button>
        </div>
      </Modal>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Workers</div>
            <div className="stat-value">{workers.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><UserCheck size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Active Today</div>
            <div className="stat-value">{workers.filter(w => w.status === 'active').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">On Leave</div>
            <div className="stat-value">{workers.filter(w => w.status === 'on_leave').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><DollarSign size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Monthly Wage</div>
            <div className="stat-value">{formatCurrency(workers.reduce((sum, w) => sum + (w.dailyWage * w.attendance), 0))}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-box" style={{ width: 300 }}>
            <Search size={18} color="#94A3B8" />
            <input type="text" placeholder="Search workers..." />
          </div>
          <select className="form-select" style={{ width: 160 }}>
            <option>All Roles</option>
            <option>Supervisor</option>
            <option>Mason</option>
            <option>Electrician</option>
            <option>Plumber</option>
          </select>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Role</th>
                <th>Site</th>
                <th>Daily Wage</th>
                <th>Attendance</th>
                <th>Overtime</th>
                <th>Earnings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => {
                const site = getSiteById(worker.siteId)
                const earnings = (worker.dailyWage * worker.attendance) + (worker.overtime * (worker.dailyWage / 8) * 2)
                return (
                  <tr key={worker.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #0B1F3A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{worker.name}</div>
                          <div style={{ fontSize: 12, color: '#94A3B8' }}>{worker.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-info">{worker.role}</span></td>
                    <td>{site?.name.split(' ')[0]}</td>
                    <td style={{ fontFamily: 'JetBrains Mono' }}>₹{worker.dailyWage}</td>
                    <td>{worker.attendance}/30</td>
                    <td>{worker.overtime}h</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{formatCurrency(earnings)}</td>
                    <td>
                      <span className={`badge ${worker.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {worker.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Reports Component
const Reports = ({ sites }) => {
  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Reports & Analytics</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>Comprehensive insights across all sites</p>
        </div>
        <button className="btn btn-primary">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Material Usage vs Expected</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={materialUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="expected" fill="#E2E8F0" name="Expected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="usage" fill="#3B82F6" name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cost Distribution</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Materials', value: 27700000, color: '#3B82F6' },
                    { name: 'Labor', value: 11550000, color: '#22C55E' },
                    { name: 'Equipment', value: 4950000, color: '#F59E0B' },
                    { name: 'Other', value: 2500000, color: '#8B5CF6' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costData.slice(0, 1).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#22C55E', '#F59E0B', '#8B5CF6'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Budget Overview</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
              {sites.map((site) => {
                const usedPercent = (site.spent / site.budget * 100).toFixed(1)
                return (
                  <div key={site.id} style={{ padding: 20, background: '#F8FAFC', borderRadius: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>{site.name.split(' ')[0]}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                      <span style={{ color: '#64748B' }}>Used</span>
                      <span style={{ fontWeight: 500 }}>{usedPercent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${parseFloat(usedPercent) > 90 ? 'red' : parseFloat(usedPercent) > 70 ? 'orange' : 'green'}`} 
                        style={{ width: `${Math.min(parseFloat(usedPercent), 100)}%` }}
                      ></div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: '#64748B' }}>{formatCurrency(site.spent)}</span>
                      <span style={{ color: '#64748B' }}>{formatCurrency(site.budget)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// AI Assistant Component
const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m SiteOS AI Assistant. I can help you with:\n\n• Material stock levels\n• Site progress updates\n• Cost analysis\n• Task management\n• Vendor information\n\nHow can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg = { id: Date.now(), type: 'user', text: input }
    setMessages([...messages, userMsg])
    
    setTimeout(() => {
      const responses = [
        'Based on the current data, you have 2,450 bags of OPC Cement across all sites. The minimum required is 500 bags.',
        'Highway Station Alpha is currently 12 days behind schedule. I recommend reviewing the task allocations.',
        'Your total material value is approximately ₹45.8Cr. This includes all raw materials across 5 sites.',
        'You have 3 pending transfer requests and 2 low stock alerts that need attention.',
        'Marina Bay Resort is at 45% progress and requires additional materials to meet the timeline.'
      ]
      const botMsg = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: responses[Math.floor(Math.random() * responses.length)] 
      }
      setMessages(prev => [...prev, botMsg])
    }, 1000)
    
    setInput('')
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>AI Assistant</h2>
          <p style={{ color: '#64748B', marginTop: 4 }}>Get instant insights about your sites</p>
        </div>
      </div>

      <div className="card" style={{ height: 'calc(100vh - 220px)', display: 'flex', flexDirection: 'column' }}>
        <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}>
          <div style={{ padding: 20, borderBottom: '1px solid #E2E8F0', display: 'flex', gap: 12 }}>
            {aiSuggestions.slice(0, 4).map((suggestion, idx) => (
              <button
                key={idx}
                className="btn btn-secondary btn-sm"
                onClick={() => setInput(suggestion.query)}
              >
                <Sparkles size={14} />
                {suggestion.query.split(' ').slice(0, 3).join(' ')}...
              </button>
            ))}
          </div>
          
          <div className="chat-messages" style={{ flex: 1, overflow: 'auto', padding: 20 }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div style={{ 
                    width: 32, height: 32, borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #3B82F6, #0B1F3A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                    flexShrink: 0
                  }}>
                    <Bot size={16} />
                  </div>
                )}
                <div className="chat-message-content">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything about your sites..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
const App = () => {
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
          <Route path="/transfers" element={<Transfers />} />
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

export default App