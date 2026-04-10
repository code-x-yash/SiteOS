import React, { useState } from 'react'
import { Plus, Users, UserCheck, Clock, MapPin, AlertTriangle, CheckCircle, X, MoreVertical } from 'lucide-react'
import { Modal, FormField } from '../../App'

const Labor = ({ workers, setWorkers, sites }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [presentWorkers, setPresentWorkers] = useState([])
  const [newWorker, setNewWorker] = useState({ name: '', role: '', site: '', wage: '', phone: '' })

  const handleAddWorker = (e) => {
    e.preventDefault()
    const worker = {
      id: `WRK-${String(workers.length + 1).padStart(3, '0')}`,
      ...newWorker,
      attendance: {},
      status: 'active'
    }
    setWorkers([...workers, worker])
    setShowAddModal(false)
    setNewWorker({ name: '', role: '', site: '', wage: '', phone: '' })
  }

  const handleMarkAttendance = (workerId) => {
    setPresentWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    )
  }

  const saveAttendance = () => {
    const updatedWorkers = workers.map(w => ({
      ...w,
      attendance: { ...w.attendance, [selectedDate]: presentWorkers.includes(w.id) }
    }))
    setWorkers(updatedWorkers)
    setShowAttendanceModal(false)
    setPresentWorkers([])
  }

  const roles = ['Mason', 'Carpenter', 'Electrician', 'Plumber', 'Helper', 'Supervisor', 'Engineer']

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Labor</h2>
          <p className="page-subtitle">Manage workforce and attendance</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => setShowAttendanceModal(true)}>
            <UserCheck size={18} />
            Mark Attendance
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Worker
          </button>
        </div>
      </div>

      <div className="stats-grid">
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
            <div className="stat-label">Present Today</div>
            <div className="stat-value">{workers.filter(w => w.attendance?.[selectedDate] || false).length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Absent</div>
            <div className="stat-value">{workers.length - workers.filter(w => w.attendance?.[selectedDate] || false).length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Role</th>
                <th>Site</th>
                <th>Daily Wage</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{worker.name}</div>
                        <div style={{ fontSize: 12, color: '#94A3B8' }}>{worker.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-info">{worker.role}</span></td>
                  <td>
                    <span className="badge badge-neutral">
                      {sites.find(s => s.id === worker.site)?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>₹{worker.wage?.toLocaleString()}</td>
                  <td>{worker.phone}</td>
                  <td>
                    <span className={`badge ${worker.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                      {worker.status}
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Worker">
        <form onSubmit={handleAddWorker}>
          <FormField label="Name" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} required />
          <FormField label="Role" value={newWorker.role} onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })} type="select" options={roles.map(r => ({value: r, label: r}))} />
          <FormField label="Site" value={newWorker.site} onChange={(e) => setNewWorker({ ...newWorker, site: e.target.value })} type="select" options={sites.map(s => ({value: s.id, label: s.name}))} />
          <FormField label="Daily Wage (₹)" value={newWorker.wage} onChange={(e) => setNewWorker({ ...newWorker, wage: e.target.value })} type="number" />
          <FormField label="Phone" value={newWorker.phone} onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })} type="tel" />
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Worker</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAttendanceModal} onClose={() => setShowAttendanceModal(false)} title="Mark Attendance">
        <div style={{ marginBottom: 20 }}>
          <FormField label="Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} type="date" />
        </div>
        <div style={{ maxHeight: 300, overflow: 'auto' }}>
          {workers.map((worker) => (
            <div key={worker.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid #E2E8F0' }}>
              <input 
                type="checkbox" 
                checked={presentWorkers.includes(worker.id)}
                onChange={() => handleMarkAttendance(worker.id)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: 500 }}>{worker.name}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{worker.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={() => setShowAttendanceModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={saveAttendance}>Save Attendance</button>
        </div>
      </Modal>
    </div>
  )
}

export default Labor