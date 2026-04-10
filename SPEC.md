# SiteOS - Construction Site Operating System

## Project Overview

**Project Name:** SiteOS
**Type:** Enterprise Web Application (SPA)
**Core Functionality:** Multi-site construction management platform for material tracking, site operations, and cost control
**Target Users:** Construction project managers, site supervisors, material coordinators, finance teams

---

## UI/UX Specification

### Layout Structure

**Navigation:**
- Collapsible sidebar (280px expanded, 72px collapsed)
- Top header bar (64px height) with search, notifications, user profile
- Main content area with breadcrumb navigation

**Page Sections:**
- Dashboard (overview with cards, activity feed, alerts)
- Sites Management (list view with detail pages)
- Materials (full CRUD with movements)
- Transfers (multi-site transfer tracking)
- Vendors (billing and PO management)
- Tasks (Kanban board)
- Labor (worker management)
- Reports (analytics charts)
- AI Assistant (chat interface)

**Responsive Breakpoints:**
- Desktop: 1280px+ (primary focus)
- Tablet: 768px-1279px (optimized layout)
- Mobile: <768px (simplified view)

### Visual Design

**Color Palette:**
```
--primary: #0B1F3A (deep navy)
--primary-light: #1E3A5F
--secondary: #1E293B (dark slate)
--secondary-light: #334155
--accent: #3B82F6 (blue)
--accent-light: #60A5FA
--success: #22C55E
--success-light: #4ADE80
--warning: #F59E0B
--warning-light: #FBBF24
--danger: #EF4444
--danger-light: #F87171
--background: #F8FAFC
--background-dark: #F1F5F9
--surface: #FFFFFF
--surface-elevated: #FFFFFF
--text-primary: #0F172A
--text-secondary: #475569
--text-muted: #94A3B8
--border: #E2E8F0
--border-light: #F1F5F9
```

**Typography:**
- Font Family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
- Heading 1: 32px / 700 weight / -0.02em tracking
- Heading 2: 24px / 600 weight / -0.01em tracking
- Heading 3: 18px / 600 weight
- Body: 14px / 400 weight / 1.5 line-height
- Caption: 12px / 500 weight
- Monospace: 'JetBrains Mono', monospace (for numbers/codes)

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px
- Card padding: 24px
- Section gap: 32px

**Visual Effects:**
- Card shadows: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)
- Elevated shadows: 0 10px 40px rgba(0,0,0,0.1)
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Glassmorphism: backdrop-blur(12px) with semi-transparent backgrounds
- Hover transitions: 150ms ease-out
- Page transitions: 200ms ease-out

### Components

**Cards:**
- Stat cards with icon, value, label, trend indicator
- Site cards with progress bar, thumbnail, quick stats
- Material cards with stock level indicator

**Tables:**
- Sortable headers with hover states
- Row hover highlight
- Pagination controls
- Bulk selection checkbox
- Inline actions (edit, delete, view)

**Forms:**
- Floating labels
- Inline validation messages
- Auto-save indicators
- Large touch targets (44px minimum)

**Modals:**
- Centered with backdrop blur
- Slide-up animation on mobile
- Close on escape/outside click

**Buttons:**
- Primary: solid accent color
- Secondary: outlined
- Ghost: text only
- Icon buttons: 40px touch target
- Loading state with spinner

**Badges/Tags:**
- Status badges (colored pills)
- Role badges
- Count badges on nav items

**Charts:**
- Line charts for trends
- Bar charts for comparisons
- Donut charts for distributions
- Consistent color scheme

---

## Functionality Specification

### 1. Dashboard
- Overview statistics cards (animated counters)
- Live activity feed (real-time updates simulation)
- Alert system for delays, low stock, issues
- Quick action buttons

### 2. Sites Management
- Site list with grid/list toggle
- Site detail with tabbed interface
- Progress tracking with visual indicators
- Quick stats per site
- Site-specific material/labor/cost views

### 3. Material Intelligence System
- Material master list with search/filter
- Stock levels per site
- Movement types: Inward, Transfer, Issue, Return, Waste
- Movement history with approval workflow
- Low stock alerts
- Material valuation

### 4. Multi-Site Transfer System
- Transfer request creation
- Status tracking: Pending → In Transit → Received
- Timeline visualization
- Source/destination site tracking

### 5. Consumption Tracking
- Usage linked to tasks/sites/contractors
- Expected vs actual comparison
- Variance calculation and highlighting

### 6. Vendor Billing Module
- Vendor directory
- Purchase Order management
- GRN (Goods Received Note)
- Invoice tracking
- PO vs Received vs Used comparison

### 7. Tasks & Work Progress
- Kanban board (Pending, In Progress, Done)
- Task assignment
- Material linking
- Progress percentage
- Due date tracking

### 8. Labor Management
- Worker directory
- Attendance tracking
- Wage calculation (mock)
- Skill/role categorization

### 9. Reports & Analytics
- Material usage trends
- Cost analysis charts
- Site performance metrics
- Export functionality

### 10. AI Assistant Panel
- Chat interface
- Example query suggestions
- Context-aware responses (mock)

---

## Mock Data Requirements

**Sites (5):**
- Riverside Tower Complex
- Marina Bay Resort
- Tech Park Phase 2
- Highway Station Alpha
- Residential Village

**Materials (50+):**
- Cement (OPC, PPC, PSC)
- Steel (TMT, Structural)
- Sand, Aggregate, Brick
- Paint, Tile, Sanitary
- Electrical, Plumbing

**Transactions (100+):**
- Mix of inward, transfer, issue, return, waste
- Spanning last 6 months

**Vendors (10+):**
- Realistic construction material suppliers
- Different material categories

**Workers (20+):**
- Various roles (mason, electrician, plumber, supervisor)

---

## Acceptance Criteria

1. All pages render without errors
2. Navigation works between all modules
3. Mock data displays correctly
4. Charts render properly
5. Responsive on desktop/tablet
6. Smooth animations and transitions
7. No console errors
8. Build completes successfully