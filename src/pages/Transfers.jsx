import React, { useState } from 'react'
import { Plus, Truck, MapPin, Package, ArrowRight, Clock } from 'lucide-react'
import { Modal, FormField } from '../App'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const Transfers = ({ sites }) => {
  const [showModal, setShowModal] = useState(false)
  const [transfers, setTransfers] = useState([
    { id: 'TRF-001', from: 'Riverside Tower', to: 'Marina Bay Resort', material: 'TMT Steel 12mm', quantity: '5 tons', date: '2025-04-08', status: 'in-transit' },
    { id: 'TRF-002', from: 'Tech Park Phase 2', to: 'Green Valley Residential', material: 'OPC Cement 53 Grade', quantity: '200 bags', date: '2025-04-07', status: 'delivered' },
    { id: 'TRF-003', from: 'Riverside Tower', to: 'Highway Station Alpha', material: 'River Sand', quantity: '500 cuft', date: '2025-04-09', status: 'pending' },
  ])

  const [newTransfer, setNewTransfer] = useState({
    fromSite: '', toSite: '', material: '', quantity: '', date: ''
  })

  const handleAddTransfer = (e) => {
    e.preventDefault()
    const transfer = {
      id: `TRF-${String(transfers.length + 1).padStart(3, '0')}`,
      from: newTransfer.fromSite,
      to: newTransfer.toSite,
      material: newTransfer.material,
      quantity: newTransfer.quantity,
      date: newTransfer.date || new Date().toISOString().split('T')[0],
      status: 'pending'
    }
    setTransfers([...transfers, transfer])
    setShowModal(false)
    setNewTransfer({ fromSite: '', toSite: '', material: '', quantity: '', date: '' })
  }

  const siteOptions = sites.map(s => ({ value: s.name, label: s.name }))

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Transfers</h2>
          <p className="page-subtitle">Track material transfers between sites</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Transfer
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Truck size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Transfers</div>
            <div className="stat-value">{transfers.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Truck size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">In Transit</div>
            <div className="stat-value">{transfers.filter(t => t.status === 'in-transit').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Truck size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Delivered</div>
            <div className="stat-value">{transfers.filter(t => t.status === 'delivered').length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>From Site</th>
                <th>To Site</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 500 }}>{transfer.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={14} color="#64748B" />
                      {transfer.from}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={14} color="#64748B" />
                      {transfer.to}
                    </div>
                  </td>
                  <td>{transfer.material}</td>
                  <td style={{ fontWeight: 500 }}>{transfer.quantity}</td>
                  <td>{transfer.date}</td>
                  <td>
                    <span className={`badge ${transfer.status === 'delivered' ? 'badge-success' : transfer.status === 'in-transit' ? 'badge-info' : 'badge-warning'}`}>
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Transfer">
        <form onSubmit={handleAddTransfer}>
          <FormField label="From Site" value={newTransfer.fromSite} onChange={(e) => setNewTransfer({ ...newTransfer, fromSite: e.target.value })} type="select" options={siteOptions} required />
          <FormField label="To Site" value={newTransfer.toSite} onChange={(e) => setNewTransfer({ ...newTransfer, toSite: e.target.value })} type="select" options={siteOptions} required />
          <FormField label="Material" value={newTransfer.material} onChange={(e) => setNewTransfer({ ...newTransfer, material: e.target.value })} required />
          <FormField label="Quantity" value={newTransfer.quantity} onChange={(e) => setNewTransfer({ ...newTransfer, quantity: e.target.value })} required />
          <FormField label="Date" value={newTransfer.date} onChange={(e) => setNewTransfer({ ...newTransfer, date: e.target.value })} type="date" />
          <div className="modal-form-actions">
            <button type="button" className="btn-ghost" style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 14 }} onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn-add" style={{ padding: '10px 20px' }}>Add Transfer</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Transfers