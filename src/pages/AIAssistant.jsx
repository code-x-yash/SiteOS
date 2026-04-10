import React, { useState } from 'react'
import { Bot, Send, Sparkles, MessageSquare, TrendingUp, Package, Users, AlertTriangle } from 'lucide-react'

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your SiteOS AI Assistant. I can help you with:\n\n• Site performance analysis\n• Material inventory insights\n• Task and workforce recommendations\n• Budget optimization\n• Risk alerts\n\nHow can I help you today?', time: 'Just now' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    { icon: TrendingUp, label: 'Site Performance', query: 'Show site performance analysis' },
    { icon: Package, label: 'Material Status', query: 'What are the low stock materials?' },
    { icon: Users, label: 'Workforce', query: 'Show workforce utilization' },
    { icon: AlertTriangle, label: 'Risk Analysis', query: 'Show risk alerts' }
  ]

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage = { id: Date.now(), role: 'user', content: input, time: 'Just now' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const responses = {
        'site performance': 'Based on current data, Riverside Tower Complex is at 68% progress with ₹28.75Cr spent of ₹45Cr budget. Tech Park Phase 2 is the best performer at 82% completion.',
        'material': 'Current material status: 3 items are low on stock (OPC Cement, TMT Steel 12mm, River Sand). Consider ordering soon to avoid delays.',
        'workforce': 'Total 670 workers across 5 sites. Today\'s attendance: 623 present (93%). Highway Station Alpha has the highest workforce with 234 workers.',
        'risk': '⚠️ High Priority Alerts:\n• Highway Station Alpha is delayed (33% progress vs planned 45%)\n• River Sand stock critically low at 15,000 cuft\n• Budget burn rate at 62% (on track)',
        'default': 'I can help you analyze your construction sites, materials, workforce, and budgets. Try asking about "site performance", "material status", "workforce", or "risk analysis".'
      }
      
      const responseKey = Object.keys(responses).find(k => input.toLowerCase().includes(k))
      const response = responses[responseKey] || responses.default
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: 'assistant', 
        content: response, 
        time: 'Just now' 
      }])
      setIsLoading(false)
    }, 1000)
  }

  const handleQuickAction = (query) => {
    setInput(query)
    handleSend()
  }

  return (
    <div className="page-content fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">AI Assistant</h2>
          <p className="page-subtitle">Smart insights and recommendations</p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 24, alignItems: 'start' }}>
        <div className="card" style={{ height: 'calc(100vh - 220px)', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot size={20} color="#3B82F6" />
              AI Chat
            </h3>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                display: 'flex', 
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
              }}>
                <div style={{ 
                  maxWidth: '80%', 
                  padding: 12, 
                  borderRadius: 12,
                  background: msg.role === 'user' ? '#3B82F6' : '#F1F5F9',
                  color: msg.role === 'user' ? 'white' : '#1E293B',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
                <Sparkles size={16} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about your sites..."
                style={{ 
                  flex: 1, 
                  padding: '10px 14px', 
                  borderRadius: 8, 
                  border: '1px solid #E2E8F0',
                  outline: 'none'
                }}
              />
              <button className="btn btn-primary" onClick={handleSend} disabled={isLoading}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.query)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: 14,
                      borderRadius: 8,
                      border: '1px solid #E2E8F0',
                      background: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <action.icon size={18} color="#3B82F6" />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sample Questions</h3>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'What\'s the current budget utilization?',
                'Which site is behind schedule?',
                'Show me material consumption trends',
                'How many workers are present today?'
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  style={{
                    padding: 10,
                    borderRadius: 6,
                    border: 'none',
                    background: '#F8FAFC',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: '#64748B'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant