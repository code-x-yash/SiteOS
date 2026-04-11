import React, { useState } from 'react'
import { Plus, ClipboardList, Calendar, User, MapPin, Clock, AlertTriangle, MoreVertical } from 'lucide-react'
import { Modal, FormField } from '../App'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const Tasks = ({ tasks, setTasks, sites }) => {
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', site: '', priority: '', assignee: '', dueDate: '', budget: '' })

  const handleAddTask = (e) => {
    e.preventDefault()
    const task = {
      id: `TSK-${String(tasks.length + 1).padStart(3, '0')}`,
      title: newTask.title,
      siteId: newTask.site,
      priority: newTask.priority || 'medium',
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      budget: parseInt(newTask.budget) || 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, task])
    setShowModal(false)
    setNewTask({ title: '', site: '', priority: '', assignee: '', dueDate: '', budget: '' })
  }

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Tasks</h2>
          <p className="page-subtitle">Track and manage project tasks</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><ClipboardList size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{tasks.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><ClipboardList size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{tasks.filter(t => t.status === 'completed').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Pending</div>
            <div className="stat-value">{tasks.filter(t => t.status === 'pending').length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Site</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Budget</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{task.title}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{task.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">
                      {sites.find(s => s.id === task.siteId)?.name || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${task.priority === 'high' ? 'badge-danger' : task.priority === 'medium' ? 'badge-warning' : 'badge-neutral'}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.assignee}</td>
                  <td>{task.dueDate}</td>
                  <td style={{ fontFamily: 'JetBrains Mono' }}>{formatCurrency(task.budget)}</td>
                  <td>
                    <span className={`badge ${task.status === 'completed' ? 'badge-success' : task.status === 'in-progress' ? 'badge-info' : 'badge-warning'}`}>
                      {task.status}
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Task">
        <form onSubmit={handleAddTask}>
          <FormField label="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
          <FormField label="Site" value={newTask.site} onChange={(e) => setNewTask({ ...newTask, site: e.target.value })} type="select" options={sites.map(s => ({value: s.id, label: s.name}))} />
          <FormField label="Priority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} type="select" options={[{value: 'low', label: 'Low'}, {value: 'medium', label: 'Medium'}, {value: 'high', label: 'High'}]} />
          <FormField label="Assignee" value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} />
          <FormField label="Due Date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} type="date" />
          <FormField label="Budget (₹)" value={newTask.budget} onChange={(e) => setNewTask({ ...newTask, budget: e.target.value })} type="number" />
          <div className="modal-form-actions">
            <button type="button" className="btn-ghost" style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontSize: 14 }} onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn-add" style={{ padding: '10px 20px' }}>Add Task</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Tasks