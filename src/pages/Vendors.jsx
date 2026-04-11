import React, { useState } from 'react'
import { Plus, CreditCard, Phone, Mail, MapPin, MoreVertical } from 'lucide-react'
import { Modal, FormField } from '../App'

const Vendors = ({ vendors, setVendors }) => {
  const [showModal, setShowModal] = useState(false)
  const [newVendor, setNewVendor] = useState({ name: '', category: '', contact: '', phone: '', email: '', address: '' })

  const handleAddVendor = (e) => {
    e.preventDefault()
    const vendor = {
      id: `VND-${String(vendors.length + 1).padStart(3, '0')}`,
      ...newVendor,
      totalOrders: 0,
      totalSpent: 0,
      rating: 0
    }
    setVendors([...vendors, vendor])
    setShowModal(false)
    setNewVendor({ name: '', category: '', contact: '', phone: '', email: '', address: '' })
  }

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Vendors</h2>
          <p className="page-subtitle">Manage vendor relationships</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><CreditCard size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Vendors</div>
            <div className="stat-value">{vendors.length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Category</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{vendor.name}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{vendor.id}</div>
                  </td>
                  <td><span className="badge badge-info">{vendor.category}</span></td>
                  <td>{vendor.contact}</td>
                  <td>{vendor.phone}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.totalOrders || 0}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>₹{(vendor.totalSpent || 0).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Vendor">
        <form onSubmit={handleAddVendor}>
          <FormField label="Vendor Name" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} required />
          <FormField label="Category" value={newVendor.category} onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })} type="select" options={[{value: 'Cement', label: 'Cement'}, {value: 'Steel', label: 'Steel'}, {value: 'Aggregates', label: 'Aggregates'}, {value: 'Bricks', label: 'Bricks'}, {value: 'Paint', label: 'Paint'}, {value: 'Electrical', label: 'Electrical'}, {value: 'Plumbing', label: 'Plumbing'}]} />
          <FormField label="Contact Person" value={newVendor.contact} onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })} />
          <FormField label="Phone" value={newVendor.phone} onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })} type="tel" />
          <FormField label="Email" value={newVendor.email} onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })} type="email" />
          <FormField label="Address" value={newVendor.address} onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })} />
          <div className="modal-form-actions">
            <button type="button" className="btn-ghost" style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 14 }} onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn-add" style={{ padding: '10px 20px' }}>Add Vendor</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Vendors