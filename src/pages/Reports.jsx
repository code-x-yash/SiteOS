import React from 'react'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Package, Users, Download } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { costData, sitePerformanceData, activities } from '../data/mockData'

const formatCurrency = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6']

const Reports = ({ sites }) => {
  const materialCategoryData = [
    { name: 'Cement', value: 4500000 },
    { name: 'Steel', value: 8200000 },
    { name: 'Aggregates', value: 1200000 },
    { name: 'Bricks', value: 800000 },
    { name: 'Paint', value: 650000 },
    { name: 'Tiles', value: 950000 },
  ]

  const siteBudgetData = sites.map(s => ({
    name: s.name.split(' ')[0],
    budget: s.budget / 10000000,
    spent: s.spent / 10000000,
    remaining: (s.budget - s.spent) / 10000000
  }))

  const totalBudget = sites.reduce((a, s) => a + s.budget, 0)
  const totalSpent = sites.reduce((a, s) => a + s.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Reports</h2>
          <p className="page-subtitle">Analytics and financial reports</p>
        </div>
        <button className="btn btn-secondary">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><DollarSign size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Budget</div>
            <div className="stat-value">{formatCurrency(totalBudget)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><TrendingDown size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">{formatCurrency(totalSpent)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><TrendingUp size={24} /></div>
          <div className="stat-content">
            <div className="stat-label">Remaining</div>
            <div className="stat-value">{formatCurrency(totalRemaining)}</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cost Overview</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="material" fill="#3B82F6" name="Material" />
                <Bar dataKey="labor" fill="#22C55E" name="Labor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Material Distribution</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={materialCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {materialCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <h3 className="card-title">Site Budget Analysis</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th>Budget</th>
                <th>Spent</th>
                <th>Remaining</th>
                <th>Usage %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((site) => {
                const usage = ((site.spent / site.budget) * 100).toFixed(1)
                return (
                  <tr key={site.id}>
                    <td style={{ fontWeight: 500 }}>{site.name}</td>
                    <td style={{ fontFamily: 'JetBrains Mono' }}>{formatCurrency(site.budget)}</td>
                    <td style={{ fontFamily: 'JetBrains Mono' }}>{formatCurrency(site.spent)}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', color: '#22C55E' }}>{formatCurrency(site.budget - site.spent)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 100 }}>
                          <div className={`progress-fill ${usage > 90 ? 'red' : usage > 70 ? 'orange' : 'green'}`} style={{ width: `${usage}%` }}></div>
                        </div>
                        <span style={{ fontSize: 12 }}>{usage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${usage > 90 ? 'badge-danger' : usage > 70 ? 'badge-warning' : 'badge-success'}`}>
                        {usage > 90 ? 'Critical' : usage > 70 ? 'Warning' : 'Healthy'}
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

export default Reports