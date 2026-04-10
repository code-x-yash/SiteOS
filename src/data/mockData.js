export const sites = [
  {
    id: 'site-001',
    name: 'Riverside Tower Complex',
    location: 'Mumbai, Maharashtra',
    type: 'Commercial',
    progress: 68,
    status: 'active',
    startDate: '2025-01-15',
    endDate: '2026-06-30',
    budget: 45000000,
    spent: 28750000,
    activeTasks: 24,
    workers: 156,
    manager: 'Rajesh Kumar',
    image: '🏢'
  },
  {
    id: 'site-002',
    name: 'Marina Bay Resort',
    location: 'Goa, Goa',
    type: 'Hospitality',
    progress: 45,
    status: 'active',
    startDate: '2025-03-01',
    endDate: '2026-12-31',
    budget: 78000000,
    spent: 32400000,
    activeTasks: 38,
    workers: 89,
    manager: 'Priya Sharma',
    image: '🏖️'
  },
  {
    id: 'site-003',
    name: 'Tech Park Phase 2',
    location: 'Bangalore, Karnataka',
    type: 'Commercial',
    progress: 82,
    status: 'active',
    startDate: '2024-08-10',
    endDate: '2026-03-15',
    budget: 32000000,
    spent: 24500000,
    activeTasks: 12,
    workers: 124,
    manager: 'Anil Gupta',
    image: '🏗️'
  },
  {
    id: 'site-004',
    name: 'Highway Station Alpha',
    location: 'Delhi-Jaipur Highway',
    type: 'Infrastructure',
    progress: 33,
    status: 'delayed',
    startDate: '2025-02-20',
    endDate: '2027-01-15',
    budget: 120000000,
    spent: 35600000,
    activeTasks: 56,
    workers: 234,
    manager: 'Sanjay Rao',
    image: '🛣️'
  },
  {
    id: 'site-005',
    name: 'Green Valley Residential',
    location: 'Pune, Maharashtra',
    type: 'Residential',
    progress: 55,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2026-08-30',
    budget: 28000000,
    spent: 14200000,
    activeTasks: 18,
    workers: 67,
    manager: 'Meera Patel',
    image: '🏠'
  }
];

export const materials = [
  { id: 'mat-001', name: 'OPC Cement 53 Grade', category: 'Cement', unit: 'bag', price: 380, totalStock: 2450, minStock: 500 },
  { id: 'mat-002', name: 'PPC Cement', category: 'Cement', unit: 'bag', price: 350, totalStock: 3200, minStock: 400 },
  { id: 'mat-003', name: 'TMT Steel 12mm', category: 'Steel', unit: 'ton', price: 58000, totalStock: 45, minStock: 10 },
  { id: 'mat-004', name: 'TMT Steel 16mm', category: 'Steel', unit: 'ton', price: 57000, totalStock: 38, minStock: 8 },
  { id: 'mat-005', name: 'TMT Steel 20mm', category: 'Steel', unit: 'ton', price: 56000, totalStock: 22, minStock: 8 },
  { id: 'mat-006', name: 'River Sand', category: 'Aggregates', unit: 'cuft', price: 45, totalStock: 15000, minStock: 2000 },
  { id: 'mat-007', name: 'M-Sand', category: 'Aggregates', unit: 'cuft', price: 38, totalStock: 8500, minStock: 1500 },
  { id: 'mat-008', name: '10mm Aggregate', category: 'Aggregates', unit: 'cuft', price: 32, totalStock: 6200, minStock: 1000 },
  { id: 'mat-009', name: '20mm Aggregate', category: 'Aggregates', unit: 'cuft', price: 30, totalStock: 4800, minStock: 800 },
  { id: 'mat-010', name: 'Red Clay Bricks', category: 'Bricks', unit: 'pcs', price: 8, totalStock: 85000, minStock: 10000 },
  { id: 'mat-011', name: 'Fly Ash Bricks', category: 'Bricks', unit: 'pcs', price: 12, totalStock: 42000, minStock: 5000 },
  { id: 'mat-012', name: 'AAC Blocks', category: 'Blocks', unit: 'pcs', price: 85, totalStock: 12000, minStock: 2000 },
  { id: 'mat-013', name: 'Interior Paint (White)', category: 'Paint', unit: 'liter', price: 280, totalStock: 850, minStock: 100 },
  { id: 'mat-014', name: 'Exterior Paint', category: 'Paint', unit: 'liter', price: 350, totalStock: 420, minStock: 80 },
  { id: 'mat-015', name: 'Enamel Paint', category: 'Paint', unit: 'liter', price: 220, totalStock: 380, minStock: 60 },
  { id: 'mat-016', name: 'Ceramic Floor Tile 600x600', category: 'Tiles', unit: 'sqft', price: 45, totalStock: 4500, minStock: 500 },
  { id: 'mat-017', name: 'Vitrified Tile 600x600', category: 'Tiles', unit: 'sqft', price: 65, totalStock: 2800, minStock: 400 },
  { id: 'mat-018', name: 'Wall Tile 300x450', category: 'Tiles', unit: 'sqft', price: 38, totalStock: 3200, minStock: 400 },
  { id: 'mat-019', name: 'Ceramic Sanitary Set', category: 'Sanitary', unit: 'set', price: 4500, totalStock: 85, minStock: 20 },
  { id: 'mat-020', name: 'CPVC Pipe 25mm', category: 'Plumbing', unit: 'meter', price: 85, totalStock: 850, minStock: 150 },
  { id: 'mat-021', name: 'CPVC Pipe 32mm', category: 'Plumbing', unit: 'meter', price: 120, totalStock: 620, minStock: 100 },
  { id: 'mat-022', name: 'PVC Pipe 110mm', category: 'Plumbing', unit: 'meter', price: 180, totalStock: 340, minStock: 80 },
  { id: 'mat-023', name: 'GI Pipe 15mm', category: 'Plumbing', unit: 'meter', price: 95, totalStock: 480, minStock: 100 },
  { id: 'mat-024', name: 'Copper Wire 2.5sqmm', category: 'Electrical', unit: 'meter', price: 25, totalStock: 25000, minStock: 3000 },
  { id: 'mat-025', name: 'Copper Wire 4sqmm', category: 'Electrical', unit: 'meter', price: 38, totalStock: 18000, minStock: 2000 },
  { id: 'mat-026', name: 'Electric Switches', category: 'Electrical', unit: 'pcs', price: 45, totalStock: 1200, minStock: 200 },
  { id: 'mat-027', name: 'LED Bulb 9W', category: 'Electrical', unit: 'pcs', price: 120, totalStock: 850, minStock: 150 },
  { id: 'mat-028', name: 'MCB 16A', category: 'Electrical', unit: 'pcs', price: 180, totalStock: 240, minStock: 50 },
  { id: 'mat-029', name: 'Plywood 19mm', category: 'Wood', unit: 'sheet', price: 2200, totalStock: 180, minStock: 40 },
  { id: 'mat-030', name: 'Flush Door', category: 'Wood', unit: 'pcs', price: 3500, totalStock: 95, minStock: 25 },
  { id: 'mat-031', name: 'Aluminium Window', category: 'Aluminium', unit: 'sqft', price: 280, totalStock: 450, minStock: 80 },
  { id: 'mat-032', name: 'Glass Panel', category: 'Glass', unit: 'sqft', price: 180, totalStock: 320, minStock: 60 },
  { id: 'mat-033', name: 'RCC Hume Pipe', category: 'Infrastructure', unit: 'pcs', price: 2500, totalStock: 65, minStock: 15 },
  { id: 'mat-034', name: 'Steel Grating', category: 'Steel', unit: 'sqft', price: 450, totalStock: 280, minStock: 50 },
  { id: 'mat-035', name: 'Bitumen', category: 'Infrastructure', unit: 'kg', price: 65, totalStock: 8500, minStock: 1000 },
  { id: 'mat-036', name: 'Ready Mix Concrete M25', category: 'Concrete', unit: 'cum', price: 4500, totalStock: 120, minStock: 30 },
  { id: 'mat-037', name: 'Ready Mix Concrete M30', category: 'Concrete', unit: 'cum', price: 4800, totalStock: 85, minStock: 25 },
  { id: 'mat-038', name: 'Stone Grit', category: 'Aggregates', unit: 'cuft', price: 28, totalStock: 5600, minStock: 800 },
  { id: 'mat-039', name: 'Marble Flooring', category: 'Flooring', unit: 'sqft', price: 180, totalStock: 850, minStock: 120 },
  { id: 'mat-040', name: 'Granite Slab', category: 'Flooring', unit: 'sqft', price: 220, totalStock: 420, minStock: 80 },
  { id: 'mat-041', name: 'Kitchen Sink', category: 'Sanitary', unit: 'pcs', price: 5500, totalStock: 45, minStock: 12 },
  { id: 'mat-042', name: 'Water Heater', category: 'Plumbing', unit: 'pcs', price: 8500, totalStock: 28, minStock: 8 },
  { id: 'mat-043', name: 'Air Conditioner 1.5T', category: 'HVAC', unit: 'pcs', price: 35000, totalStock: 15, minStock: 5 },
  { id: 'mat-044', name: 'Elevator', category: 'Infrastructure', unit: 'unit', price: 1800000, totalStock: 3, minStock: 1 },
  { id: 'mat-045', name: 'Fire Extinguisher', category: 'Safety', unit: 'pcs', price: 2500, totalStock: 120, minStock: 30 },
  { id: 'mat-046', name: 'Safety Helmets', category: 'Safety', unit: 'pcs', price: 350, totalStock: 450, minStock: 100 },
  { id: 'mat-047', name: 'Safety Vests', category: 'Safety', unit: 'pcs', price: 280, totalStock: 380, minStock: 80 },
  { id: 'mat-048', name: 'Scaffolding Pipe', category: 'Scaffolding', unit: 'meter', price: 180, totalStock: 2500, minStock: 400 },
  { id: 'mat-049', name: 'Shuttering Plywood', category: 'Formwork', unit: 'sheet', price: 1800, totalStock: 220, minStock: 50 },
  { id: 'mat-050', name: 'Binding Wire', category: 'Steel', unit: 'kg', price: 85, totalStock: 1200, minStock: 200 }
];

export const materialMovements = [
  { id: 'mov-001', materialId: 'mat-001', type: 'inward', from: 'UltraTech Cement Ltd', to: 'site-001', quantity: 500, date: '2026-04-05', status: 'approved', approvedBy: 'Rajesh Kumar', amount: 190000 },
  { id: 'mov-002', materialId: 'mat-003', type: 'inward', from: 'Tata Steel', to: 'site-001', quantity: 15, date: '2026-04-04', status: 'approved', approvedBy: 'Rajesh Kumar', amount: 870000 },
  { id: 'mov-003', materialId: 'mat-001', type: 'issue', from: 'site-001', to: 'Task-Foundation', quantity: 200, date: '2026-04-03', status: 'approved', approvedBy: 'Anil Gupta', amount: 76000 },
  { id: 'mov-004', materialId: 'mat-006', type: 'inward', from: 'Local Supplier', to: 'site-002', quantity: 5000, date: '2026-04-02', status: 'approved', approvedBy: 'Priya Sharma', amount: 225000 },
  { id: 'mov-005', materialId: 'mat-012', type: 'transfer', from: 'site-001', to: 'site-003', quantity: 2000, date: '2026-04-01', status: 'in_transit', approvedBy: 'Rajesh Kumar', amount: 170000 },
  { id: 'mov-006', materialId: 'mat-016', type: 'inward', from: 'Kajaria Ceramics', to: 'site-002', quantity: 1500, date: '2026-03-30', status: 'approved', approvedBy: 'Priya Sharma', amount: 67500 },
  { id: 'mov-007', materialId: 'mat-020', type: 'inward', from: 'Finolex', to: 'site-003', quantity: 300, date: '2026-03-28', status: 'approved', approvedBy: 'Anil Gupta', amount: 25500 },
  { id: 'mov-008', materialId: 'mat-001', type: 'waste', from: 'site-002', to: 'Discarded', quantity: 25, date: '2026-03-25', status: 'approved', approvedBy: 'Priya Sharma', amount: 9500 },
  { id: 'mov-009', materialId: 'mat-024', type: 'inward', from: 'Havells India', to: 'site-004', quantity: 8000, date: '2026-03-24', status: 'approved', approvedBy: 'Sanjay Rao', amount: 200000 },
  { id: 'mov-010', materialId: 'mat-029', type: 'issue', from: 'site-003', to: 'Task-Cabinets', quantity: 40, date: '2026-03-22', status: 'approved', approvedBy: 'Anil Gupta', amount: 88000 },
  { id: 'mov-011', materialId: 'mat-036', type: 'inward', from: 'Ambuja Concrete', to: 'site-005', quantity: 50, date: '2026-03-20', status: 'approved', approvedBy: 'Meera Patel', amount: 225000 },
  { id: 'mov-012', materialId: 'mat-002', type: 'transfer', from: 'site-002', to: 'site-005', quantity: 800, date: '2026-03-18', status: 'received', approvedBy: 'Priya Sharma', amount: 280000 },
  { id: 'mov-013', materialId: 'mat-046', type: 'return', from: 'Workers', to: 'site-001', quantity: 45, date: '2026-03-15', status: 'approved', approvedBy: 'Rajesh Kumar', amount: 15750 },
  { id: 'mov-014', materialId: 'mat-013', type: 'inward', from: 'Asian Paints', to: 'site-003', quantity: 200, date: '2026-03-12', status: 'approved', approvedBy: 'Anil Gupta', amount: 56000 },
  { id: 'mov-015', materialId: 'mat-044', type: 'inward', from: 'Otis Elevators', to: 'site-002', quantity: 1, date: '2026-03-10', status: 'approved', approvedBy: 'Priya Sharma', amount: 1800000 }
];

export const vendors = [
  { id: 'ven-001', name: 'UltraTech Cement Ltd', category: 'Cement', contact: '+91 98765 43210', email: 'orders@ultratech.com', rating: 4.8, totalOrders: 156, pendingPayments: 2450000 },
  { id: 'ven-002', name: 'Tata Steel', category: 'Steel', contact: '+91 98765 43211', email: 'sales@tatasteel.com', rating: 4.9, totalOrders: 89, pendingPayments: 1820000 },
  { id: 'ven-003', name: 'Ambuja Cements', category: 'Cement', contact: '+91 98765 43212', email: 'supply@ambuja.com', rating: 4.6, totalOrders: 124, pendingPayments: 980000 },
  { id: 'ven-004', name: 'Kajaria Ceramics', category: 'Tiles', contact: '+91 98765 43213', email: 'orders@kajaria.com', rating: 4.7, totalOrders: 67, pendingPayments: 560000 },
  { id: 'ven-005', name: 'Finolex Pipes', category: 'Plumbing', contact: '+91 98765 43214', email: 'sales@finolex.com', rating: 4.5, totalOrders: 45, pendingPayments: 320000 },
  { id: 'ven-006', name: 'Havells India', category: 'Electrical', contact: '+91 98765 43215', email: 'orders@havells.com', rating: 4.8, totalOrders: 78, pendingPayments: 450000 },
  { id: 'ven-007', name: 'Asian Paints', category: 'Paint', contact: '+91 98765 43216', email: 'supply@asianpaints.com', rating: 4.7, totalOrders: 92, pendingPayments: 680000 },
  { id: 'ven-008', name: 'Berger Paints', category: 'Paint', contact: '+91 98765 43217', email: 'orders@berger.com', rating: 4.6, totalOrders: 54, pendingPayments: 320000 },
  { id: 'ven-009', name: 'JSW Steel', category: 'Steel', contact: '+91 98765 43218', email: 'sales@jswsteel.com', rating: 4.8, totalOrders: 43, pendingPayments: 1250000 },
  { id: 'ven-010', name: 'Local Sand Suppliers', category: 'Aggregates', contact: '+91 98765 43219', email: 'local@sand.com', rating: 4.2, totalOrders: 234, pendingPayments: 180000 },
  { id: 'ven-011', name: 'Greenply Industries', category: 'Wood', contact: '+91 98765 43220', email: 'orders@greenply.com', rating: 4.5, totalOrders: 38, pendingPayments: 420000 },
  { id: 'ven-012', name: 'Otis Elevators', category: 'Infrastructure', contact: '+91 98765 43221', email: 'sales@otis.com', rating: 4.9, totalOrders: 8, pendingPayments: 3600000 }
];

export const purchaseOrders = [
  { id: 'po-001', vendorId: 'ven-001', siteId: 'site-001', poNumber: 'PO/2026/001', date: '2026-04-01', amount: 950000, status: 'approved', items: 2, received: 1 },
  { id: 'po-002', vendorId: 'ven-002', siteId: 'site-002', poNumber: 'PO/2026/002', date: '2026-03-28', amount: 1740000, status: 'approved', items: 3, received: 2 },
  { id: 'po-003', vendorId: 'ven-004', siteId: 'site-003', poNumber: 'PO/2026/003', date: '2026-03-25', amount: 337500, status: 'pending', items: 2, received: 0 },
  { id: 'po-004', vendorId: 'ven-006', siteId: 'site-004', poNumber: 'PO/2026/004', date: '2026-03-22', amount: 500000, status: 'approved', items: 4, received: 3 },
  { id: 'po-005', vendorId: 'ven-007', siteId: 'site-001', poNumber: 'PO/2026/005', date: '2026-03-20', amount: 280000, status: 'approved', items: 2, received: 2 },
  { id: 'po-006', vendorId: 'ven-005', siteId: 'site-005', poNumber: 'PO/2026/006', date: '2026-03-18', amount: 165000, status: 'approved', items: 3, received: 1 },
  { id: 'po-007', vendorId: 'ven-009', siteId: 'site-002', poNumber: 'PO/2026/007', date: '2026-03-15', amount: 2280000, status: 'in_transit', items: 4, received: 0 },
  { id: 'po-008', vendorId: 'ven-011', siteId: 'site-003', poNumber: 'PO/2026/008', date: '2026-03-12', amount: 440000, status: 'approved', items: 2, received: 2 }
];

export const tasks = [
  { id: 'task-001', title: 'Foundation Work - Block A', siteId: 'site-001', status: 'done', progress: 100, assignee: 'Ravi Kumar', dueDate: '2026-03-15', priority: 'high', materials: ['mat-001', 'mat-006', 'mat-009'] },
  { id: 'task-002', title: 'Ground Floor Slab Casting', siteId: 'site-001', status: 'in_progress', progress: 65, assignee: 'Suresh Patel', dueDate: '2026-04-20', priority: 'high', materials: ['mat-036', 'mat-001', 'mat-003'] },
  { id: 'task-003', title: 'Electrical Wiring - Floor 1', siteId: 'site-001', status: 'pending', progress: 0, assignee: 'Mohammad Khan', dueDate: '2026-05-01', priority: 'medium', materials: ['mat-024', 'mat-025', 'mat-026'] },
  { id: 'task-004', title: 'Plumbing Installation - Floor 2', siteId: 'site-002', status: 'in_progress', progress: 40, assignee: 'Dinesh Sharma', dueDate: '2026-04-25', priority: 'high', materials: ['mat-020', 'mat-021', 'mat-022'] },
  { id: 'task-005', title: 'Facade Installation', siteId: 'site-003', status: 'in_progress', progress: 75, assignee: 'Vijay Singh', dueDate: '2026-04-10', priority: 'high', materials: ['mat-031', 'mat-032'] },
  { id: 'task-006', title: 'Road Base Layer', siteId: 'site-004', status: 'pending', progress: 0, assignee: 'Arun Kumar', dueDate: '2026-05-15', priority: 'medium', materials: ['mat-007', 'mat-008', 'mat-035'] },
  { id: 'task-007', title: 'Interior Painting - Lobby', siteId: 'site-003', status: 'pending', progress: 0, assignee: 'Naveen Reddy', dueDate: '2026-04-30', priority: 'low', materials: ['mat-013', 'mat-015'] },
  { id: 'task-008', title: 'Tiles Flooring - Ground Floor', siteId: 'site-005', status: 'done', progress: 100, assignee: 'Gopal Das', dueDate: '2026-03-28', priority: 'high', materials: ['mat-016', 'mat-017'] },
  { id: 'task-009', title: 'Steel Fabrication - Roof', siteId: 'site-002', status: 'in_progress', progress: 55, assignee: 'Kamal Singh', dueDate: '2026-04-18', priority: 'high', materials: ['mat-003', 'mat-004', 'mat-005'] },
  { id: 'task-010', title: 'HVAC Installation', siteId: 'site-002', status: 'pending', progress: 0, assignee: 'Amit Verma', dueDate: '2026-05-10', priority: 'medium', materials: ['mat-043'] },
  { id: 'task-011', title: 'Waterproofing Work', siteId: 'site-001', status: 'done', progress: 100, assignee: 'Santosh Gupta', dueDate: '2026-03-20', priority: 'high', materials: ['mat-001', 'mat-007'] },
  { id: 'task-012', title: 'Window Glass Installation', siteId: 'site-003', status: 'in_progress', progress: 30, assignee: 'Raj Malhotra', dueDate: '2026-04-22', priority: 'medium', materials: ['mat-032', 'mat-031'] }
];

export const workers = [
  { id: 'wkr-001', name: 'Ravi Kumar', role: 'Supervisor', siteId: 'site-001', dailyWage: 1200, attendance: 28, overtime: 12, status: 'active', phone: '+91 98765 10001' },
  { id: 'wkr-002', name: 'Suresh Patel', role: 'Mason', siteId: 'site-001', dailyWage: 800, attendance: 26, overtime: 8, status: 'active', phone: '+91 98765 10002' },
  { id: 'wkr-003', name: 'Mohammad Khan', role: 'Electrician', siteId: 'site-001', dailyWage: 900, attendance: 25, overtime: 6, status: 'active', phone: '+91 98765 10003' },
  { id: 'wkr-004', name: 'Dinesh Sharma', role: 'Plumber', siteId: 'site-002', dailyWage: 850, attendance: 27, overtime: 10, status: 'active', phone: '+91 98765 10004' },
  { id: 'wkr-005', name: 'Vijay Singh', role: 'Fabricator', siteId: 'site-003', dailyWage: 950, attendance: 24, overtime: 15, status: 'active', phone: '+91 98765 10005' },
  { id: 'wkr-006', name: 'Arun Kumar', role: 'Equipment Operator', siteId: 'site-004', dailyWage: 1100, attendance: 28, overtime: 20, status: 'active', phone: '+91 98765 10006' },
  { id: 'wkr-007', name: 'Naveen Reddy', role: 'Painter', siteId: 'site-003', dailyWage: 750, attendance: 22, overtime: 4, status: 'active', phone: '+91 98765 10007' },
  { id: 'wkr-008', name: 'Gopal Das', role: 'Tile Mason', siteId: 'site-005', dailyWage: 850, attendance: 26, overtime: 8, status: 'active', phone: '+91 98765 10008' },
  { id: 'wkr-009', name: 'Kamal Singh', role: 'Steel Fixer', siteId: 'site-002', dailyWage: 900, attendance: 25, overtime: 12, status: 'active', phone: '+91 98765 10009' },
  { id: 'wkr-010', name: 'Amit Verma', role: 'HVAC Technician', siteId: 'site-002', dailyWage: 1000, attendance: 20, overtime: 0, status: 'on_leave', phone: '+91 98765 10010' },
  { id: 'wkr-011', name: 'Santosh Gupta', role: 'Waterproofing Specialist', siteId: 'site-001', dailyWage: 950, attendance: 24, overtime: 6, status: 'active', phone: '+91 98765 10011' },
  { id: 'wkr-012', name: 'Raj Malhotra', role: 'Glazier', siteId: 'site-003', dailyWage: 880, attendance: 23, overtime: 8, status: 'active', phone: '+91 98765 10012' },
  { id: 'wkr-013', name: 'Praveen Kumar', role: 'Labor', siteId: 'site-004', dailyWage: 600, attendance: 28, overtime: 16, status: 'active', phone: '+91 98765 10013' },
  { id: 'wkr-014', name: 'Deepak Singh', role: 'Carpenter', siteId: 'site-003', dailyWage: 850, attendance: 25, overtime: 10, status: 'active', phone: '+91 98765 10014' },
  { id: 'wkr-015', name: 'Manoj Sharma', role: 'Helper', siteId: 'site-005', dailyWage: 550, attendance: 27, overtime: 5, status: 'active', phone: '+91 98765 10015' },
  { id: 'wkr-016', name: 'Vikram Patel', role: 'Welder', siteId: 'site-002', dailyWage: 900, attendance: 24, overtime: 14, status: 'active', phone: '+91 98765 10016' },
  { id: 'wkr-017', name: 'Ashok Kumar', role: 'Safety Officer', siteId: 'site-004', dailyWage: 1200, attendance: 28, overtime: 18, status: 'active', phone: '+91 98765 10017' },
  { id: 'wkr-018', name: 'Rakesh Gupta', role: 'Bar Bending', siteId: 'site-001', dailyWage: 800, attendance: 26, overtime: 10, status: 'active', phone: '+91 98765 10018' },
  { id: 'wkr-019', name: 'Sunil Rao', role: 'Driver', siteId: 'site-003', dailyWage: 750, attendance: 28, overtime: 8, status: 'active', phone: '+91 98765 10019' },
  { id: 'wkr-020', name: 'Babu Krishnan', role: 'Store Keeper', siteId: 'site-005', dailyWage: 700, attendance: 28, overtime: 0, status: 'active', phone: '+91 98765 10020' }
];

export const transfers = [
  { id: 'trf-001', materialId: 'mat-001', fromSite: 'site-002', toSite: 'site-005', quantity: 800, status: 'received', requestedDate: '2026-03-10', shippedDate: '2026-03-12', receivedDate: '2026-03-15', requestedBy: 'Priya Sharma', approvedBy: 'Meera Patel' },
  { id: 'trf-002', materialId: 'mat-012', fromSite: 'site-001', toSite: 'site-003', quantity: 2000, status: 'in_transit', requestedDate: '2026-03-28', shippedDate: '2026-04-01', receivedDate: null, requestedBy: 'Rajesh Kumar', approvedBy: 'Anil Gupta' },
  { id: 'trf-003', materialId: 'mat-020', fromSite: 'site-003', toSite: 'site-002', quantity: 150, status: 'pending', requestedDate: '2026-04-05', shippedDate: null, receivedDate: null, requestedBy: 'Anil Gupta', approvedBy: null },
  { id: 'trf-004', materialId: 'mat-024', fromSite: 'site-001', toSite: 'site-004', quantity: 5000, status: 'in_transit', requestedDate: '2026-04-02', shippedDate: '2026-04-06', receivedDate: null, requestedBy: 'Rajesh Kumar', approvedBy: 'Sanjay Rao' },
  { id: 'trf-005', materialId: 'mat-046', fromSite: 'site-004', toSite: 'site-001', quantity: 100, status: 'received', requestedDate: '2026-03-05', shippedDate: '2026-03-07', receivedDate: '2026-03-08', requestedBy: 'Sanjay Rao', approvedBy: 'Rajesh Kumar' }
];

export const activities = [
  { id: 'act-001', type: 'material', icon: 'package', title: 'Cement received', description: '500 bags of OPC Cement arrived at Riverside Tower', time: '2 hours ago', color: 'blue' },
  { id: 'act-002', type: 'task', icon: 'check-circle', title: 'Task completed', description: 'Foundation Work - Block A marked as done', time: '4 hours ago', color: 'green' },
  { id: 'act-003', type: 'alert', icon: 'alert-triangle', title: 'Low stock alert', description: 'TMT Steel 20mm below minimum threshold', time: '5 hours ago', color: 'orange' },
  { id: 'act-004', type: 'transfer', icon: 'truck', title: 'Transfer in transit', description: '2000 AAC Blocks from site-001 to Tech Park', time: '6 hours ago', color: 'blue' },
  { id: 'act-005', type: 'vendor', icon: 'trending-up', title: 'New PO approved', description: 'PO-007 for JSW Steel worth ₹22.8L approved', time: '8 hours ago', color: 'green' },
  { id: 'act-006', type: 'delay', icon: 'clock', title: 'Delay warning', description: 'Highway Station Alpha behind schedule by 12 days', time: '10 hours ago', color: 'red' }
];

export const alerts = [
  { id: 'alert-001', type: 'warning', title: 'Material Delay', description: 'Sand delivery for Marina Bay Resort delayed by 3 days', site: 'site-002', time: '2 hours ago' },
  { id: 'alert-002', type: 'danger', title: 'Low Stock Alert', description: 'TMT Steel 20mm stock below minimum (22/8 tons)', site: 'All Sites', time: '5 hours ago' },
  { id: 'alert-003', type: 'warning', title: 'Budget Alert', description: 'Riverside Tower at 85% budget utilization', site: 'site-001', time: '1 day ago' },
  { id: 'alert-004', type: 'danger', title: 'Schedule Delay', description: 'Highway Station Alpha 12 days behind schedule', site: 'site-004', time: '1 day ago' },
  { id: 'alert-005', type: 'info', title: 'Pending Approval', description: '3 transfer requests awaiting approval', site: '-', time: '3 hours ago' }
];

export const costData = [
  { month: 'Oct', material: 4200000, labor: 1800000, equipment: 800000, other: 400000 },
  { month: 'Nov', material: 4800000, labor: 1950000, equipment: 750000, other: 450000 },
  { month: 'Dec', material: 5100000, labor: 2100000, equipment: 900000, other: 500000 },
  { month: 'Jan', material: 4500000, labor: 1850000, equipment: 850000, other: 380000 },
  { month: 'Feb', material: 3900000, labor: 1650000, equipment: 700000, other: 350000 },
  { month: 'Mar', material: 5200000, labor: 2200000, equipment: 950000, other: 420000 }
];

export const materialUsageData = [
  { name: 'OPC Cement', usage: 8500, expected: 9000 },
  { name: 'TMT Steel', usage: 145, expected: 150 },
  { name: 'Sand', usage: 12000, expected: 13000 },
  { name: 'Bricks', usage: 45000, expected: 48000 },
  { name: 'Paint', usage: 1800, expected: 2000 },
  { name: 'Tiles', usage: 8500, expected: 9000 }
];

export const sitePerformanceData = [
  { name: 'Riverside Tower', progress: 68, budget: 64, timeline: 72 },
  { name: 'Marina Bay', progress: 45, budget: 42, timeline: 48 },
  { name: 'Tech Park', progress: 82, budget: 78, timeline: 85 },
  { name: 'Highway Station', progress: 33, budget: 30, timeline: 25 },
  { name: 'Green Valley', progress: 55, budget: 51, timeline: 58 }
];

export const getMaterialStockBySite = (materialId) => {
  const siteStocks = {};
  sites.forEach(site => {
    siteStocks[site.id] = Math.floor(Math.random() * 1000) + 100;
  });
  return siteStocks;
};

export const getSiteById = (siteId) => sites.find(s => s.id === siteId);
export const getMaterialById = (materialId) => materials.find(m => m.id === materialId);
export const getVendorById = (vendorId) => vendors.find(v => v.id === vendorId);
export const getWorkerById = (workerId) => workers.find(w => w.id === workerId);

export const getTasksBySite = (siteId) => tasks.filter(t => t.siteId === siteId);
export const getMovementsByMaterial = (materialId) => materialMovements.filter(m => m.materialId === materialId);

export const getTotalMaterialValue = () => {
  return materials.reduce((total, mat) => total + (mat.totalStock * mat.price), 0);
};

export const getTotalBudget = () => {
  return sites.reduce((total, site) => total + site.budget, 0);
};

export const getTotalSpent = () => {
  return sites.reduce((total, site) => total + site.spent, 0);
};

export const getActiveTasksCount = () => {
  return tasks.filter(t => t.status !== 'done').length;
};

export const getWorkersBySite = (siteId) => {
  return workers.filter(w => w.siteId === siteId);
};

export const aiSuggestions = [
  { query: 'How much cement is left across all sites?' },
  { query: 'Which site is behind schedule?' },
  { query: 'Show material usage for this month' },
  { query: 'List pending vendor payments' },
  { query: 'What materials are low on stock?' }
];