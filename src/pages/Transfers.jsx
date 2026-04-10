import React from 'react'
import { Truck, MapPin, Package, ArrowRight, Clock } from 'lucide-react'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const Transfers = ({ sites }) => {
  const transfers = [
    { id: 'TRF-001', from: 'Riverside Tower', to: 'Marina Bay Resort', material: 'TMT Steel 12mm', quantity: '5 tons', date: '2025-04-08', status: 'in-transit' },
    { id: 'TRF-002', from: 'Tech Park Phase 2', to: 'Green Valley Residential', material: 'OPC Cement 53 Grade', quantity: '200 bags', date: '2025-04-07', status: 'delivered' },
    { id: 'TRF-003', from: 'Riverside Tower', to: 'Highway Station Alpha', material: 'River Sand', quantity: '500 cuft', date: '2025-04-09', status: 'pending' },
  ]

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Transfers</h2>
          <p className="page-subtitle">Track material transfers between sites</p>
        </div>
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
    </div>
  )
}

export default Transfers