import React, { useState } from 'react'
import { Plus, MapPin, Calendar, Users, TrendingUp, MoreVertical, X, Building2 } from 'lucide-react'
import { Modal, FormField } from '../App'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const Sites = ({ sites, setSites }) => {
  const [showModal, setShowModal] = useState(false)
  const [newSite, setNewSite] = useState({
    name: '', location: '', type: '', budget: '', manager: ''
  })

  const handleAddSite = (e) => {
    e.preventDefault()
    const site = {
      id: `site-${String(sites.length + 1).padStart(3, '0')}`,
      name: newSite.name,
      location: newSite.location,
      type: newSite.type,
      progress: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      budget: parseInt(newSite.budget) || 0,
      spent: 0,
      activeTasks: 0,
      workers: 0,
      manager: newSite.manager,
      image: '🏗️'
    }
    setSites([...sites, site])
    setShowModal(false)
    setNewSite({ name: '', location: '', type: '', budget: '', manager: '' })
  }

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Sites</h2>
          <p className="page-subtitle">Manage construction sites and projects</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Site
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Building2 size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Sites</div>
            <div className="stat-value">{sites.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><TrendingUp size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Active</div>
            <div className="stat-value">{sites.filter(s => s.status === 'active').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Users size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Workers</div>
            <div className="stat-value">{sites.reduce((a, s) => a + s.workers, 0)}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th>Location</th>
                <th>Type</th>
                <th>Progress</th>
                <th>Budget</th>
                <th>Manager</th>
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
                        <div style={{ fontSize: 12, color: '#94A3B8' }}>{site.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B' }}>
                      <MapPin size={14} />
                      {site.location}
                    </div>
                  </td>
                  <td><span className="badge badge-info">{site.type}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className={`progress-fill ${site.progress > 70 ? 'green' : site.progress > 40 ? 'blue' : 'orange'}`} style={{ width: `${site.progress}%` }}></div>
                      </div>
                      <span style={{ fontWeight: 500 }}>{site.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
                      {formatCurrency(site.budget)}
                    </div>
                  </td>
                  <td>{site.manager}</td>
                  <td>
                    <span className={`badge ${site.status === 'active' ? 'badge-success' : site.status === 'delayed' ? 'badge-danger' : 'badge-neutral'}`}>
                      {site.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Site">
        <form onSubmit={handleAddSite}>
          <FormField label="Site Name" value={newSite.name} onChange={(e) => setNewSite({ ...newSite, name: e.target.value })} required />
          <FormField label="Location" value={newSite.location} onChange={(e) => setNewSite({ ...newSite, location: e.target.value })} required />
          <FormField label="Type" value={newSite.type} onChange={(e) => setNewSite({ ...newSite, type: e.target.value })} type="select" options={[{value: 'Commercial', label: 'Commercial'}, {value: 'Residential', label: 'Residential'}, {value: 'Hospitality', label: 'Hospitality'}, {value: 'Infrastructure', label: 'Infrastructure'}]} />
          <FormField label="Budget (₹)" value={newSite.budget} onChange={(e) => setNewSite({ ...newSite, budget: e.target.value })} type="number" />
          <FormField label="Manager" value={newSite.manager} onChange={(e) => setNewSite({ ...newSite, manager: e.target.value })} />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Site</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Sites