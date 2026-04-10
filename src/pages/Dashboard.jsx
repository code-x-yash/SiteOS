import React from 'react'
import { Building2, Package, ClipboardList, TrendingUp, TrendingDown, AlertTriangle, MapPin, ArrowRight, Clock, CheckCircle, Truck } from 'lucide-react'
import { getTotalMaterialValue, getTotalBudget, getTotalSpent, getActiveTasksCount } from '../data/mockData'
import { getSiteById } from '../data/mockData'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { activities, alerts, sitePerformanceData, costData } from '../data/mockData'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const AreaChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
      <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
      <Tooltip formatter={(value) => `₹${(value/10000000).toFixed(1)}Cr`} />
      <Bar dataKey="material" fill="#3B82F6" name="Material" />
      <Bar dataKey="labor" fill="#22C55E" name="Labor" />
    </BarChart>
  </ResponsiveContainer>
)

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
              <MapPin size={16} />
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

export default Dashboard