import React, { useState } from 'react'
import { Plus, Package, AlertTriangle, Search, Filter, MoreVertical } from 'lucide-react'
import { Modal, FormField } from '../../App'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const Materials = ({ materials, setMaterials, sites }) => {
  const [showModal, setShowModal] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    name: '', category: '', unit: '', price: '', totalStock: '', minStock: ''
  })
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddMaterial = (e) => {
    e.preventDefault()
    const material = {
      id: `mat-${String(materials.length + 1).padStart(3, '0')}`,
      name: newMaterial.name,
      category: newMaterial.category,
      unit: newMaterial.unit,
      price: parseInt(newMaterial.price) || 0,
      totalStock: parseInt(newMaterial.totalStock) || 0,
      minStock: parseInt(newMaterial.minStock) || 0
    }
    setMaterials([...materials, material])
    setShowModal(false)
    setNewMaterial({ name: '', category: '', unit: '', price: '', totalStock: '', minStock: '' })
  }

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = materials.reduce((a, m) => a + (m.price * m.totalStock), 0)
  const lowStock = materials.filter(m => m.totalStock < m.minStock).length

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Materials</h2>
          <p className="page-subtitle">Track inventory and stock levels</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Material
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Package size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Items</div>
            <div className="stat-value">{materials.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Package size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">{formatCurrency(totalValue)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Low Stock</div>
            <div className="stat-value">{lowStock}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Inventory</h3>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="search-box" style={{ width: 250 }}>
              <Search size={18} color="#94A3B8" />
              <input type="text" placeholder="Search materials..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Value</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((material) => (
                <tr key={material.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{material.name}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{material.id}</div>
                  </td>
                  <td><span className="badge badge-info">{material.category}</span></td>
                  <td>{material.unit}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>₹{material.price.toLocaleString()}</td>
                  <td>
                    <span style={{ fontWeight: 500, color: material.totalStock < material.minStock ? '#EF4444' : '#1E293B' }}>
                      {material.totalStock.toLocaleString()}
                    </span>
                  </td>
                  <td>{material.minStock.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{formatCurrency(material.price * material.totalStock)}</td>
                  <td>
                    <span className={`badge ${material.totalStock < material.minStock ? 'badge-danger' : material.totalStock < material.minStock * 1.5 ? 'badge-warning' : 'badge-success'}`}>
                      {material.totalStock < material.minStock ? 'Low Stock' : material.totalStock < material.minStock * 1.5 ? 'Medium' : 'OK'}
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Material">
        <form onSubmit={handleAddMaterial}>
          <FormField label="Material Name" value={newMaterial.name} onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })} required />
          <FormField label="Category" value={newMaterial.category} onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })} type="select" options={[{value: 'Cement', label: 'Cement'}, {value: 'Steel', label: 'Steel'}, {value: 'Aggregates', label: 'Aggregates'}, {value: 'Bricks', label: 'Bricks'}, {value: 'Blocks', label: 'Blocks'}, {value: 'Paint', label: 'Paint'}, {value: 'Tiles', label: 'Tiles'}]} />
          <FormField label="Unit" value={newMaterial.unit} onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })} type="select" options={[{value: 'bag', label: 'Bag'}, {value: 'ton', label: 'Ton'}, {value: 'cuft', label: 'Cuft'}, {value: 'pcs', label: 'Pcs'}, {value: 'liter', label: 'Liter'}, {value: 'sqft', label: 'Sqft'}]} />
          <FormField label="Price (₹)" value={newMaterial.price} onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })} type="number" />
          <FormField label="Initial Stock" value={newMaterial.totalStock} onChange={(e) => setNewMaterial({ ...newMaterial, totalStock: e.target.value })} type="number" />
          <FormField label="Min Stock Level" value={newMaterial.minStock} onChange={(e) => setNewMaterial({ ...newMaterial, minStock: e.target.value })} type="number" />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Material</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Materials