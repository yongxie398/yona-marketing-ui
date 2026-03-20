# Billing Feature PRD (Product Requirements Document)

## 1. Executive Summary

The billing system for Yona AI Revenue Agent is a **revenue-share pricing model** integrated with Shopify's native billing API. The system follows a **V1 Simplified Model** with two pricing tiers, enabling merchants to pay based on the revenue recovered by the AI agent.

### Key Business Model
- **Revenue-Share Pricing**: Fees based on recovered revenue, not fixed subscriptions
- **Shopify Native Billing**: No third-party payment processors (Stripe, etc.)
- **Usage-Based Charges**: Variable fees via Shopify UsageCharges API
- **First Month Free**: Incentive for Starter plan adoption

---

## 2. Pricing Plans

### V1 Simplified Pricing Model

| Plan | Monthly Fee | Revenue Share | First Month Free | Target Customer |
|------|-------------|---------------|------------------|-----------------|
| **Starter** | $0 | 8% | Yes (30 days) | New stores, testing phase |
| **Growth** | $39 | 5% | No | Established stores, high volume |

### Plan Details

#### Starter Plan
- **Price**: $0/month base fee
- **Revenue Share**: 8% of recovered revenue
- **First Month Free**: 30-day free period from subscription start
- **Target**: New stores, stores testing the AI agent
- **Features**:
  - Up to 500 orders/month
  - Basic analytics dashboard
  - Email support
  - Standard email templates
  - Cart abandonment recovery

#### Growth Plan
- **Price**: $39/month base fee
- **Revenue Share**: 5% of recovered revenue
- **First Month Free**: Not applicable
- **Target**: Established stores with higher order volume
- **Features**:
  - Unlimited orders
  - Advanced analytics & insights
  - Priority support
  - Custom email templates
  - All recovery campaigns
  - A/B testing
  - Advanced AI personalization

### Break-Even Analysis
- **Break-even point**: ~$1,300 recovered revenue
- At $1,300 recovered:
  - Starter: $0 + (8% × $1,300) = $104
  - Growth: $39 + (5% × $1,300) = $104
- **Recommendation Logic**: Upgrade banner shows when Starter user recovers >$500

---

## 3. Frontend Requirements

### 3.1 Billing Dashboard Page (`/billing`)

#### Location
`yona-marketing-shopify/src/app/billing/page.tsx`

#### UI Components

##### Current Plan Card
- Display plan name (Starter/Growth)
- Monthly fee (Free or $39)
- Revenue share percentage (8% or 5%)
- First Month Free indicator (Starter only)
  - Green highlighted section
  - Days remaining countdown
  - Celebration emoji (🎉)

##### This Month Metrics Card
- Recovered Revenue (formatted currency)
- Base Monthly Fee (if Growth plan)
- Revenue Share Fee
  - Shows "FREE (First Month)" if applicable
  - Otherwise shows calculated fee
- Total Estimated (sum or FREE)

##### Upgrade Banner
- **Trigger Condition**: `show_upgrade_banner = true` when recovered revenue > $500
- **Content**: "You've recovered $X this month. Upgrade to Growth and pay less per dollar recovered."
- **Action**: "Upgrade to Growth" button
- **Loading State**: Spinner during upgrade process

##### Attribution Explanation Modal
- **Trigger**: "How we calculate revenue →" link
- **Content**:
  - Clicked an AI email
  - Purchased within 7 days
  - AI email was the last marketing touch

##### Navigation
- Back to Dashboard button
- Back to Settings button

#### Data Structure (BillingDashboard Interface)

```typescript
interface BillingDashboard {
  plan: {
    name: string;
    type: string;
    price_monthly: number;
    revenue_share_percentage: number;
    first_month_free: boolean;
  };
  billing_period: {
    first_month_free_active: boolean;
    first_month_days_remaining: number;
  };
  metrics: {
    recovered_revenue: number;
    billable_revenue: number;
    estimated_fee: number;
    base_monthly_fee: number;
  };
  show_upgrade_banner: boolean;
}
```

#### Loading States
- Full-page spinner during initial load
- Error banner with retry button on failure

#### Error Handling
- Display error message in Banner component
- Retry button to reload data

---

### 3.2 Plan Selection Page (`/onboarding/plan-selection`)

#### Location
`yona-marketing-shopify/src/app/onboarding/plan-selection/page.tsx`

#### UI Components

##### Progress Header
- Logo with gradient background
- App name: "Yona AI Revenue Agent"
- Progress indicator: "Step 1 of 3"
- Progress bar (33% complete)

##### Plan Cards (Side by Side)

###### Card Layout
- Plan name (Starter/Growth)
- Price display: $X/month
- Description text
- Feature list with check icons
- Select button

###### Selection State
- Selected card: Emerald border (2px), shadow
- Unselected card: Gray border (2px)
- Hover: Emerald border transition

###### Recommended Badge
- Amber gradient background
- "⭐ RECOMMENDED" text
- Auto-recommended based on projected revenue:
  - < $1,000 revenue → Starter recommended
  - >= $1,000 revenue → Growth recommended

##### Savings Calculator Card
- Blue gradient background
- Input field for projected monthly revenue
- Calculated outputs:
  - Potential Monthly Recovery (30% of revenue)
  - Recommended Plan
- Real-time calculation on input change

##### Trust Signals
- "Cancel anytime"
- "Billed through Shopify"
- "No long-term contract"
- Check icons with emerald color

##### Navigation
- Continue button (emerald, right-aligned)
- Disabled state when no plan selected
- Loading spinner during processing

#### Data Structure (Plan Interface)

```typescript
interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_monthly: number;
  revenue_share_percentage: number;
  free_tier_amount: number;
  is_recommended: boolean;
  features: string[];
}
```

#### User Flow
1. User enters plan selection page
2. System fetches available plans from API
3. User optionally enters projected revenue
4. System auto-recommends plan based on revenue
5. User clicks plan card to select
6. User clicks "Continue" button
7. System creates subscription via API
8. Redirect to Shopify billing confirmation (if needed)
9. Redirect to next onboarding step

---

### 3.3 Dashboard Header Billing Button

#### Location
`yona-marketing-shopify/src/app/page.tsx` (DashboardHeader component)

#### Requirements
- CreditCard icon (lucide-react)
- "Billing" label
- Outline variant button
- Navigation to `/billing?shop={domain}&host={host}`
- Positioned in header right section

---

### 3.4 Frontend API Routes (Next.js API Proxies)

#### Plans API
- **Route**: `/api/billing/plans`
- **File**: `src/app/api/billing/plans/route.ts`
- **Method**: GET
- **Purpose**: Fetch available plans from backend

#### Subscribe API
- **Route**: `/api/billing/subscribe`
- **File**: `src/app/api/billing/subscribe/route.ts`
- **Method**: POST
- **Body**: `{ store_id, plan_slug }`
- **Response**: `{ confirmation_url }` (Shopify billing URL)

#### Dashboard API
- **Route**: `/api/billing/dashboard`
- **File**: `src/app/api/billing/dashboard/route.ts`
- **Method**: GET
- **Query**: `store_id`
- **Response**: BillingDashboard object

#### Upgrade API
- **Route**: `/api/billing/upgrade`
- **File**: `src/app/api/billing/upgrade/route.ts`
- **Method**: POST
- **Query**: `store_id`
- **Purpose**: Upgrade from Starter to Growth

#### Savings Calculator API
- **Route**: `/api/billing/calculate-savings`
- **File**: `src/app/api/billing/calculate-savings/route.ts`
- **Method**: POST
- **Purpose**: Calculate potential savings between plans

---

## 4. Backend Architecture

### 4.1 Database Models

#### Plans Table
```python
class Plan:
    id: UUID
    name: str                    # "Starter", "Growth"
    slug: str                    # "starter", "growth"
    description: str | None
    price_monthly: Decimal       # 0 or 39
    revenue_share_percentage: int # 8 or 5
    free_tier_amount: Decimal
    first_month_free: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime
```

#### Subscriptions Table
```python
class Subscription:
    id: UUID
    store_id: UUID
    plan_id: UUID
    shopify_recurring_charge_id: str
    status: str                  # active, cancelled, expired
    current_period_start: datetime
    current_period_end: datetime
    first_month_free: bool
    first_month_free_ends_at: datetime | None
    created_at: datetime
    updated_at: datetime
```

#### Payments Table
```python
class Payment:
    id: UUID
    store_id: UUID
    subscription_id: UUID
    shopify_payment_id: str
    amount: Decimal
    currency: str
    status: str
    payment_type: str
    created_at: datetime
```

#### Invoices Table
```python
class Invoice:
    id: UUID
    store_id: UUID
    subscription_id: UUID
    shopify_usage_charge_id: str
    shopify_billing_on: datetime
    number: str
    status: str
    amount: Decimal
    recovered_amount: Decimal
    fee_percentage: Decimal
    created_at: datetime
```

#### Billing Events Table
```python
class BillingEvent:
    id: UUID
    store_id: UUID
    order_id: UUID
    message_id: UUID
    revenue_amount: Decimal
    calculated_fee: Decimal
    event_type: str
    created_at: datetime
```

#### Store Billing Summaries Table
```python
class StoreBillingSummary:
    id: UUID
    store_id: UUID
    period_start: datetime
    period_end: datetime
    total_recovered_revenue: Decimal
    billable_revenue: Decimal
    calculated_fee: Decimal
    created_at: datetime
```

#### Store Billing Quotas Table
```python
class StoreBillingQuota:
    id: UUID
    store_id: UUID
    monthly_budget: Decimal
    current_monthly_spent: Decimal
    ai_message_limit: int
    created_at: datetime
    updated_at: datetime
```

#### Revenue Attributions Table
```python
class RevenueAttribution:
    id: UUID
    order_id: UUID
    message_id: UUID
    store_id: UUID
    attributed_amount: Decimal
    attribution_type: str
    created_at: datetime
```

---

### 4.2 Backend Services

#### BillingService
**File**: `backend/app/services/billing_service.py`

**Methods**:
- `list_plans()` - List all available subscription plans
- `get_plan(plan_id)` - Retrieve plan by ID
- `get_plan_by_slug(slug)` - Retrieve plan by slug (starter/growth)
- `create_subscription(store_id, plan_id)` - Create subscription with Shopify billing
- `get_subscription_by_store(store_id)` - Get store's current subscription
- `update_subscription_plan(store_id, new_plan_id)` - Upgrade/downgrade plans
- `get_monthly_recovered_revenue(store_id)` - Calculate recovered revenue
- `get_store_billing_info(store_id)` - Comprehensive billing information
- `record_billing_event(store_id, order_id, message_id, amount)` - Record revenue attribution

#### ShopifyBillingService
**File**: `backend/app/services/shopify_billing_service.py`

**Shopify Billing Flow**:
1. `create_recurring_charge()` - Create $0 recurring charge to collect payment method
2. `activate_recurring_charge()` - Activate after merchant approval
3. `create_usage_charge()` - Create variable charges when revenue is recovered

**Key Features**:
- Auto-detects development stores and enables test mode
- Uses Shopify API version 2024-01
- Supports capped amounts for usage charges ($500 max)
- 14-day trial period for paid plans

#### AttributionService
**File**: `backend/app/services/attribution_service.py`

**Revenue Attribution Model**:
- **Last-touch attribution**: Links order to the last AI message
- **7-day conversion window**: From message to purchase
- **First-month-free logic**: No fees during first 30 days for Starter

**Methods**:
- `attribute_order_to_message(order_id, message_id)` - Attribute order to AI message
- `get_first_month_free_status(store_id)` - Check first month free eligibility
- `get_attribution_summary(store_id)` - Get attribution statistics

#### CostControlService
**File**: `backend/app/services/cost_control_service.py`

**AI Cost Management**:
- Enforces AI budget limits per store
- Revenue-aware throttling:
  - <$50 recovered: 10 AI messages/month
  - $50-$200: 20 messages (Starter) / 50 (Growth)
  - >$200: 2.5x base limit
- Tracks AI message costs and usage

---

### 4.3 Backend API Endpoints

**File**: `backend/app/api/v1/endpoints/billing.py`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/billing/plans` | GET | List available plans |
| `/api/v1/billing/subscribe` | POST | Create subscription |
| `/api/v1/billing/stores/{store_id}/subscription` | GET | Get store subscription |
| `/api/v1/billing/stores/{store_id}/dashboard` | GET | Billing dashboard data |
| `/api/v1/billing/stores/{store_id}/upgrade` | POST | Upgrade to Growth plan |
| `/api/v1/billing/stores/{store_id}/billing-info` | GET | Comprehensive billing info |
| `/api/v1/billing/stores/{store_id}/usage-summary` | GET | Usage summary |
| `/api/v1/billing/stores/{store_id}/attribute-order` | POST | Manual order attribution |
| `/api/v1/billing/stores/{store_id}/attribution-summary` | GET | Attribution statistics |
| `/api/v1/billing/stores/{store_id}/first-month-free-status` | GET | First month free status |
| `/api/v1/billing/shopify-callback` | GET | Shopify billing callback |
| `/api/v1/billing/calculate-savings` | POST | Savings calculator |
| `/api/v1/billing/webhook/order-completed` | POST | Order webhook for attribution |

---

## 5. Business Logic

### 5.1 Revenue Attribution

**Attribution Window**: 7 days from AI message to purchase

**Attribution Model**: Last-touch attribution
- Links orders to AI-generated messages
- Creates billing events for fee calculation
- Only AI-attributed revenue is billable

**Criteria for Attribution**:
1. Customer clicked an AI email
2. Purchased within 7 days of click
3. AI email was the last marketing touch

### 5.2 First Month Free (Starter Plan)

**Eligibility**:
- Starter plan subscribers only
- New subscriptions only
- 30-day period from subscription start

**Implementation**:
- `first_month_free` flag on subscription
- `first_month_free_ends_at` timestamp
- Revenue share fee waived during period
- Display "FREE (First Month)" in billing dashboard

### 5.3 Upgrade Banner Logic

**Trigger Conditions**:
- User is on Starter plan
- Recovered revenue > $500 in current period

**Content**:
- Shows recovered revenue amount
- Suggests upgrade to Growth
- Calculates potential savings

**Break-Even Point**:
- At $1,300 recovered revenue, both plans cost $104
- Above $1,300, Growth plan is cheaper

### 5.4 AI Cost Control

**Budget Enforcement**:
- Monthly budget per store
- Current monthly spend tracking
- AI message limits based on revenue tier

**Throttling Rules**:
| Recovered Revenue | Starter Limit | Growth Limit |
|-------------------|---------------|--------------|
| <$50 | 10/month | 10/month |
| $50-$200 | 20/month | 50/month |
| >$200 | 2.5x base | 2.5x base |

---

## 6. User Flows

### 6.1 New User Onboarding

```
1. User installs app from Shopify App Store
2. App redirects to /onboarding/plan-selection
3. User sees plan comparison cards
4. User optionally enters projected revenue
5. System recommends appropriate plan
6. User selects plan and clicks Continue
7. System creates subscription via Shopify API
8. User redirected to Shopify billing confirmation
9. User approves billing
10. User redirected to next onboarding step
```

### 6.2 Billing Dashboard Access

```
1. User clicks "Billing" button in dashboard header
2. System fetches billing dashboard data
3. Display current plan and metrics
4. If eligible, show upgrade banner
5. User can click "How we calculate revenue" for attribution modal
6. User can navigate back to dashboard or settings
```

### 6.3 Plan Upgrade Flow

```
1. User sees upgrade banner (recovered > $500)
2. User clicks "Upgrade to Growth" button
3. System calls upgrade API endpoint
4. Shopify creates new recurring charge
5. User redirected to Shopify confirmation
6. User approves new billing terms
7. Plan updated to Growth
8. Dashboard refreshed with new plan details
```

### 6.4 Revenue Attribution Flow

```
1. AI sends email to customer
2. Customer clicks email link
3. Customer makes purchase within 7 days
4. Order webhook triggers attribution service
5. System links order to last AI message
6. Billing event created with revenue amount
7. Fee calculated based on plan percentage
8. Usage charge created via Shopify API
```

---

## 7. Shopify Integration

### 7.1 Billing API Version
- **Version**: 2024-01

### 7.2 Recurring Application Charge
- **Purpose**: Collect payment method
- **Amount**: $0 base (for Starter) or $39 (for Growth)
- **Trial Period**: 14 days for paid plans

### 7.3 Usage Charges
- **Purpose**: Variable fees based on recovered revenue
- **Capped Amount**: $500 maximum per charge
- **Frequency**: When revenue is attributed

### 7.4 Test Mode
- Auto-enabled for development stores
- No real charges during testing

---

## 8. Technical Implementation Files

### Backend Files

| File | Purpose |
|------|---------|
| `app/models/billing.py` | Core billing models |
| `app/models/store_billing_quota.py` | AI cost quota model |
| `app/models/billing_event.py` | Pydantic schemas |
| `app/services/billing_service.py` | Main billing logic |
| `app/services/shopify_billing_service.py` | Shopify API integration |
| `app/services/attribution_service.py` | Revenue attribution |
| `app/services/cost_control_service.py` | AI cost management |
| `app/api/v1/endpoints/billing.py` | REST API endpoints |
| `alembic/versions/002_add_billing_tables.py` | Database migration |
| `alembic/versions/003_add_missing_billing_tables.py` | Additional tables |
| `migrations/001_billing_and_tracking.sql` | SQL migration |
| `scripts/update_simplified_billing.py` | Pricing migration |
| `tests/test_billing_api.py` | API tests |

### Frontend Files

| File | Purpose |
|------|---------|
| `src/app/billing/page.tsx` | Billing dashboard page |
| `src/app/onboarding/plan-selection/page.tsx` | Plan selection page |
| `src/app/api/billing/plans/route.ts` | Plans API proxy |
| `src/app/api/billing/subscribe/route.ts` | Subscribe API proxy |
| `src/app/api/billing/dashboard/route.ts` | Dashboard API proxy |
| `src/app/api/billing/upgrade/route.ts` | Upgrade API proxy |
| `src/app/api/billing/calculate-savings/route.ts` | Savings calculator |

---

## 9. Future Considerations

### 9.1 Potential Enhancements
- Invoice history page with PDF downloads
- Payment method management
- Prorated upgrades/downgrades
- Annual billing discount
- Enterprise custom pricing

### 9.2 Analytics Enhancements
- Revenue recovery trends
- ROI calculator improvements
- Plan comparison tool
- Churn prediction

### 9.3 Billing Improvements
- Multiple currency support
- Regional pricing
- Volume discounts
- Referral credits

---

## 10. Success Metrics

### 10.1 Key Performance Indicators
- Plan conversion rate (Starter → Growth)
- Average revenue per user (ARPU)
- Monthly recurring revenue (MRR)
- Revenue recovery rate
- Customer lifetime value (CLV)

### 10.2 Monitoring
- Billing event tracking
- Usage charge success rate
- Attribution accuracy
- Plan churn rate

---

## 11. Appendix

### A. Environment Variables
```
SHOPIFY_API_VERSION=2024-01
SHOPIFY_APP_URL=<app-url>
SHOPIFY_API_KEY=<api-key>
SHOPIFY_API_SECRET=<api-secret>
```

### B. Database Migrations
Run migrations in order:
1. `002_add_billing_tables.py`
2. `003_add_missing_billing_tables.py`

### C. Testing
- Test file: `backend/tests/test_billing_api.py`
- Coverage: Plan listing, subscription, dashboard, upgrade, free tier calculation

---

**Document Version**: 1.0  
**Last Updated**: 2026-03-06  
**Author**: AI Revenue Agent Team
