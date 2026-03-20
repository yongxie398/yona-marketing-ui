# Product Requirements Document: Onboarding Flow

## Document Information

| Field | Value |
|-------|-------|
| Product | Yona AI Revenue Agent |
| Feature | User Onboarding Flow |
| Version | 1.0 |
| Status | Implemented |

---

## 1. Executive Summary

The onboarding flow is designed to guide new Shopify merchants through a seamless setup experience, transforming app installation into an engaging journey that maximizes activation rates and time-to-value. The flow consists of three core steps: plan selection, brand voice configuration, and AI activation confirmation.

---

## 2. Problem Statement

### 2.1 Current Challenges

- **High Drop-off Rates**: Complex onboarding processes lead to user abandonment
- **Unclear Value Proposition**: Users don't immediately understand the revenue recovery potential
- **Generic Messaging**: Default email templates don't match merchant brand identity
- **Trust Barriers**: New users are uncertain about AI-driven customer communication

### 2.2 Goals

1. Reduce time-to-first-value to under 5 minutes
2. Achieve 80%+ onboarding completion rate
3. Establish brand voice consistency from day one
4. Build user confidence in AI capabilities

---

## 3. User Personas

### 3.1 Primary Persona: Small Business Owner

- **Profile**: Runs a Shopify store with $2K-$50K monthly revenue
- **Goals**: Recover lost revenue, automate customer engagement
- **Pain Points**: Limited time, non-technical background
- **Needs**: Quick setup, clear ROI demonstration

### 3.2 Secondary Persona: E-commerce Manager

- **Profile**: Manages marketing for medium-sized stores
- **Goals**: Optimize conversion rates, maintain brand consistency
- **Pain Points**: Multiple tools to manage, needs customization
- **Needs**: Detailed configuration options, analytics integration

---

## 4. Onboarding Flow Overview

### 4.1 Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ONBOARDING JOURNEY                               │
└─────────────────────────────────────────────────────────────────────────┘

[Shopify App Store]
        │
        ▼
[App Installation] ───────────────────────────────────────────────────────
        │
        ▼
[OAuth Authorization] ──▶ User grants permissions to access store data
        │
        ▼
[Store Registration] ────▶ Backend creates tenant, sets up webhooks
        │
        ├──────────────────────────────────────────────────────────────┐
        │                                                              │
        │   isNewStore?                                               │
        │       │                                                     │
        │       ├── YES ──▶ [Onboarding Flow]                        │
        │       │                   │                                 │
        │       │                   ▼                                 │
        │       │           [Step 1: Plan Selection]                  │
        │       │                   │                                 │
        │       │                   ▼                                 │
        │       │           [Step 2: Brand Voice]                     │
        │       │                   │                                 │
        │       │                   ▼                                 │
        │       │           [Step 3: AI Activation]                   │
        │       │                   │                                 │
        │       │                   ▼                                 │
        │       │           [Dashboard]                               │
        │       │                   │                                 │
        │       │                   ▼                                 │
        │       │           [First Sale Celebration] ◀── Triggered    │
        │       │                                                     │
        │       └── NO ───▶ [Dashboard] (Skip onboarding)             │
        │                                                              │
        └──────────────────────────────────────────────────────────────┘
```

### 4.2 Step Summary

| Step | Name | Duration | Primary Action | Success Metric |
|------|------|----------|----------------|----------------|
| 0 | OAuth & Registration | ~10 sec | Grant permissions | Store registered |
| 1 | Plan Selection | ~60 sec | Choose subscription | Plan selected |
| 2 | Brand Voice | ~45 sec | Select communication style | Voice configured |
| 3 | AI Activation | ~15 sec | Confirm activation | AI enabled |
| 4 | First Sale | Variable | Receive notification | Sale recovered |

---

## 5. Detailed Requirements

### 5.1 Step 0: OAuth & Store Registration

#### 5.1.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| OAUTH-001 | System must initiate OAuth flow when user installs app from Shopify App Store | P0 |
| OAUTH-002 | System must exchange authorization code for access token | P0 |
| OAUTH-003 | System must register store in database with unique identifier | P0 |
| OAUTH-004 | System must set up webhooks for orders, customers, products, checkouts, and app uninstallation | P0 |
| OAUTH-005 | System must detect new vs. returning stores using `onboarding_complete` flag | P0 |
| OAUTH-006 | System must redirect new stores to onboarding flow | P0 |
| OAUTH-007 | System must redirect returning stores directly to dashboard | P0 |

#### 5.1.2 UI/UX Requirements

- **Seamless Transition**: No visible loading states during OAuth redirect
- **Error Handling**: Clear error messages if authorization fails
- **Session Persistence**: Maintain session across redirects

#### 5.1.3 Technical Specifications

- OAuth 2.0 authorization code flow
- Session cookies for authentication state
- Webhook registration via Shopify Admin API
- Store status tracking: `active`, `uninstalled`, `suspended`

---

### 5.2 Step 1: Plan Selection

#### 5.2.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| PLAN-001 | System must display available subscription plans with pricing | P0 |
| PLAN-002 | System must show plan features comparison | P0 |
| PLAN-003 | System must provide savings calculator for ROI demonstration | P1 |
| PLAN-004 | System must recommend plan based on projected revenue | P2 |
| PLAN-005 | System must integrate with Shopify Billing API | P0 |
| PLAN-006 | System must handle subscription confirmation callback | P0 |
| PLAN-007 | System must allow plan changes post-onboarding | P1 |

#### 5.2.2 UI/UX Requirements

##### Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Progress Bar: Step 1 of 3 ━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░░░░ 33%] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              Choose Your Plan                                           │
│              Select the plan that fits your business                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐    │
│  │     STARTER                 │    │     GROWTH                  │    │
│  │     $29/month               │    │     $79/month               │    │
│  │                             │    │     ⭐ RECOMMENDED          │    │
│  │     ✓ Up to 500 orders      │    │     ✓ Unlimited orders      │    │
│  │     ✓ Basic analytics       │    │     ✓ Advanced analytics    │    │
│  │     ✓ Email support         │    │     ✓ Priority support      │    │
│  │     ✓ Standard templates    │    │     ✓ Custom templates      │    │
│  │                             │    │     ✓ A/B testing           │    │
│  │     [Select Starter]        │    │     [Select Growth]         │    │
│  └─────────────────────────────┘    └─────────────────────────────┘    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  💰 Savings Calculator                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Projected Monthly Revenue: [ $ 2,000          ]                │   │
│  │                                                                 │   │
│  │  Potential Monthly Recovery: $600                               │   │
│  │  Recommended Plan: Growth                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✓ Cancel anytime    ✓ Billed through Shopify    ✓ No long-term contract│
│                                                                         │
│                        [Back]              [Continue]                    │
└─────────────────────────────────────────────────────────────────────────┘
```

##### Visual Design Specifications

| Element | Specification |
|---------|---------------|
| Card Width | Equal width, responsive (stacked on mobile) |
| Selected State | Primary color border, light background tint |
| Recommended Badge | Positioned top-right of card |
| Savings Calculator | Collapsible section below plan cards |
| Trust Signals | Subtle footer with checkmark icons |

##### Interaction Patterns

- **Hover State**: Subtle elevation and border highlight
- **Selection**: Click anywhere on card to select
- **Calculator**: Real-time calculation as user types
- **Navigation**: Disabled "Continue" until plan selected

#### 5.2.3 Business Logic

```
IF projected_revenue < $1000 THEN
    recommend_plan = "Starter"
ELSE IF projected_revenue >= $1000 AND projected_revenue < $5000 THEN
    recommend_plan = "Growth"
ELSE
    recommend_plan = "Enterprise" (future)

potential_recovery = projected_revenue * 0.30  // 30% recovery rate
```

---

### 5.3 Step 2: Brand Voice Configuration

#### 5.3.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| VOICE-001 | System must offer 4 distinct brand voice options | P0 |
| VOICE-002 | System must provide live email preview for each voice | P0 |
| VOICE-003 | System must save brand voice preference to database | P0 |
| VOICE-004 | System must allow brand voice modification post-onboarding | P1 |
| VOICE-005 | System must apply brand voice to all AI-generated content | P0 |

#### 5.3.2 UI/UX Requirements

##### Brand Voice Options

| Voice | Icon | Description | Use Case |
|-------|------|-------------|----------|
| Friendly | 👋 | Warm, conversational, approachable | Lifestyle brands, small businesses |
| Professional | 💼 | Polished, business-focused, trustworthy | B2B, premium brands |
| Playful | 🎉 | Fun, energetic, engaging | Youth brands, entertainment |
| Minimal | ✨ | Clean, direct, concise | Tech brands, modern aesthetics |

##### Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Progress Bar: Step 2 of 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░ 66%] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              Define Your Brand Voice                                    │
│              Choose how Yona communicates with your customers           │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────┐│
│  │   👋          │  │   💼          │  │   🎉          │  │   ✨      ││
│  │   Friendly    │  │   Professional│  │   Playful     │  │   Minimal ││
│  │               │  │               │  │               │  │           ││
│  │   Warm &      │  │   Polished &  │  │   Fun &       │  │   Clean & ││
│  │   approachable│  │   trustworthy │  │   energetic   │  │   direct  ││
│  │               │  │               │  │               │  │           ││
│  │  [SELECTED]   │  │               │  │               │  │           ││
│  └───────────────┘  └───────────────┘  └───────────────┘  └───────────┘│
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📧 Live Email Preview                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Subject: We noticed you left something behind! 🛒               │   │
│  │                                                                 │   │
│  │  Hi Sarah!                                                      │   │
│  │                                                                 │   │
│  │  We noticed you left some awesome items in your cart.           │   │
│  │  No pressure, but we wanted to make sure you didn't forget!     │   │
│  │                                                                 │   │
│  │  Your items are waiting for you:                                │   │
│  │  • Classic White T-Shirt - $29.00                               │   │
│  │  • Running Shoes - $89.00                                       │   │
│  │                                                                 │   │
│  │  [Complete Your Order]                                          │   │
│  │                                                                 │   │
│  │  Cheers,                                                        │   │
│  │  The Team                                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│                        [Back]              [Continue]                    │
└─────────────────────────────────────────────────────────────────────────┘
```

##### Visual Design Specifications

| Element | Specification |
|---------|---------------|
| Card Grid | 4 columns on desktop, 2 on tablet, 1 on mobile |
| Card Height | Fixed height for visual consistency |
| Icon Size | 32px, centered at top |
| Preview Panel | Full-width below selection cards |
| Preview Animation | Smooth transition when switching voices |

##### Interaction Patterns

- **Selection**: Click card to select, instant preview update
- **Preview**: Real-time email preview updates with smooth animation
- **Default**: "Friendly" pre-selected as most universally applicable
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select

#### 5.3.3 Sample Messages by Voice

##### Friendly
```
Subject: We noticed you left something behind! 🛒

Hi Sarah!

We noticed you left some awesome items in your cart. 
No pressure, but we wanted to make sure you didn't forget!

Your items are waiting for you:
• Classic White T-Shirt - $29.00
• Running Shoes - $89.00

[Complete Your Order]

Cheers,
The Team
```

##### Professional
```
Subject: Your Cart Awaits Your Return

Dear Sarah,

We noticed you have items awaiting purchase in your shopping cart.
We wanted to remind you that these items are still available.

Your Cart Summary:
• Classic White T-Shirt - $29.00
• Running Shoes - $89.00

[Complete Your Order]

Best regards,
Customer Service Team
```

##### Playful
```
Subject: Oops! Your cart is feeling lonely! 🎉

Hey Sarah! 👋

Your cart is sitting there like "um, hello? remember me?" 😅
Those items are TOTALLY waiting for you!

What you left behind:
• Classic White T-Shirt - $29.00
• Running Shoes - $89.00

[Come Back & Shop!]

You rock! ✨
The Team
```

##### Minimal
```
Subject: Cart Reminder

Sarah,

Items in your cart:
• Classic White T-Shirt - $29.00
• Running Shoes - $89.00

[Complete Order]

Thanks
```

---

### 5.4 Step 3: AI Activation Confirmation

#### 5.4.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| ACTIVATE-001 | System must display setup completion status | P0 |
| ACTIVATE-002 | System must show checklist of completed steps | P0 |
| ACTIVATE-003 | System must explain what happens next | P0 |
| ACTIVATE-004 | System must enable AI monitoring upon confirmation | P0 |
| ACTIVATE-005 | System must set `onboarding_complete` flag to true | P0 |
| ACTIVATE-006 | System must redirect to dashboard after activation | P0 |
| ACTIVATE-007 | System must show expected timeline for first action | P1 |

#### 5.4.2 UI/UX Requirements

##### Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Progress Bar: Step 3 of 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              Your AI is Ready! 🎉                                       │
│              Review your setup and activate                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✅ Setup Status                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ✓ Data Synced                                                   │   │
│  │    Your store data has been imported                             │   │
│  │                                                                  │   │
│  │  ✓ Brand Voice Set                                               │   │
│  │    Friendly tone selected                                        │   │
│  │                                                                  │   │
│  │  ○ AI Activated                                                  │   │
│  │    Click below to start monitoring                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🚀 What Happens Next                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  1. AI Starts Monitoring                                         │   │
│  │     Yona begins tracking abandoned carts and checkouts           │   │
│  │                                                                  │   │
│  │  2. Automatic Messages                                           │   │
│  │     Personalized emails sent at optimal times                    │   │
│  │                                                                  │   │
│  │  3. Revenue Recovery                                             │   │
│  │     Recovered sales appear in your dashboard                     │   │
│  │                                                                  │   │
│  │  4. Track Results                                                │   │
│  │     Monitor performance and optimize                             │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ⏱️ Expected first action: Within 24 hours                              │
│                                                                         │
│                        [Back]              [Activate AI]                 │
└─────────────────────────────────────────────────────────────────────────┘
```

##### Visual Design Specifications

| Element | Specification |
|---------|---------------|
| Checklist Icons | Green checkmark for completed, empty circle for pending |
| Status Colors | Green for complete, gray for pending |
| Timeline Badge | Subtle background, prominent icon |
| CTA Button | Primary color, full-width on mobile |

##### Interaction Patterns

- **Activation**: Single click to activate AI
- **Loading State**: Spinner during activation process
- **Success Animation**: Brief celebration before redirect
- **Redirect**: Automatic redirect to dashboard after 2 seconds

---

### 5.5 Post-Onboarding: First Sale Celebration

#### 5.5.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| CELEBRATE-001 | System must detect first attributed sale | P0 |
| CELEBRATE-002 | System must display celebration modal | P0 |
| CELEBRATE-003 | System must show sale details (revenue, customer, recovery time) | P1 |
| CELEBRATE-004 | System must provide share functionality | P2 |
| CELEBRATE-005 | System must track celebration display to prevent repeats | P0 |

#### 5.5.2 UI/UX Requirements

##### Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    🎉 CONGRATULATIONS! 🎉                               │
│                                                                         │
│              [Confetti Animation Background]                            │
│                                                                         │
│              🏆 First Win Achievement Unlocked!                         │
│                                                                         │
│              You just recovered your first sale!                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  💰 $127.50 Recovered                                            │   │
│  │                                                                  │   │
│  │  Customer: Sarah Johnson                                         │   │
│  │  Recovery Time: 2 hours 34 minutes                               │   │
│  │  Campaign: Cart Abandonment                                      │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│              [Share Your Win]              [View Dashboard]             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

##### Visual Design Specifications

| Element | Specification |
|---------|---------------|
| Modal Size | Centered, max-width 480px |
| Animation | Confetti burst on modal open |
| Achievement Badge | Gold trophy icon with glow effect |
| Share Button | Uses Web Share API or clipboard fallback |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| PERF-001 | OAuth flow completion | < 5 seconds |
| PERF-002 | Page load time | < 2 seconds |
| PERF-003 | API response time | < 500ms |
| PERF-004 | Animation frame rate | 60fps |

### 6.2 Accessibility

| ID | Requirement | Standard |
|----|-------------|----------|
| A11Y-001 | WCAG 2.1 AA compliance | Required |
| A11Y-002 | Keyboard navigation | Full support |
| A11Y-003 | Screen reader support | Full support |
| A11Y-004 | Color contrast ratio | 4.5:1 minimum |

### 6.3 Security

| ID | Requirement | Implementation |
|----|-------------|----------------|
| SEC-001 | OAuth token encryption | AES-256 |
| SEC-002 | Session management | Secure cookies |
| SEC-003 | CSRF protection | Built-in to Next.js |
| SEC-004 | Input validation | Server-side validation |

### 6.4 Localization

| ID | Requirement | Priority |
|----|-------------|----------|
| L10N-001 | Support for multiple languages | P2 |
| L10N-002 | Currency formatting based on store | P1 |
| L10N-003 | Date/time formatting based on timezone | P1 |

---

## 7. Technical Architecture

### 7.1 Component Structure

```
src/
├── app/
│   └── onboarding/
│       ├── plan-selection/
│       │   └── page.tsx
│       ├── brand-voice/
│       │   └── page.tsx
│       └── ai-live/
│           └── page.tsx
├── components/
│   └── onboarding/
│       ├── OnboardingLayout.tsx
│       ├── OnboardingProgress.tsx
│       ├── OnboardingHeader.tsx
│       ├── OnboardingActions.tsx
│       └── SelectableCard.tsx
└── styles/
    └── design-tokens.css
```

### 7.2 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/shops/register` | POST | Register/reactivate store |
| `/api/v1/stores/domain/{shop}` | GET | Fetch store info |
| `/api/v1/stores/domain/{shop}` | PATCH | Update store settings |
| `/api/v1/billing/plans` | GET | Fetch available plans |
| `/api/v1/billing/subscribe` | POST | Create subscription |

### 7.3 Data Flow

```
User Action → React Component → Next.js API Route → FastAPI Backend → PostgreSQL
                                    ↓
                            Shopify Billing API
```

---

## 8. Success Metrics

### 8.1 Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| Onboarding Completion Rate | 80% | Completed / Started |
| Time to Complete | < 5 min | Average duration |
| Plan Selection Rate | 70% | Users selecting paid plan |
| Brand Voice Selection | 95% | Users selecting voice |
| First Week Activation | 60% | Users with AI action in 7 days |

### 8.2 Tracking Events

| Event | Trigger | Properties |
|-------|---------|------------|
| onboarding_started | OAuth complete | store_id, timestamp |
| plan_viewed | Plan selection page load | store_id |
| plan_selected | User clicks plan | store_id, plan_id |
| voice_selected | User selects voice | store_id, voice_type |
| ai_activated | Activation button click | store_id |
| onboarding_completed | Redirect to dashboard | store_id, duration |
| first_sale_celebrated | Modal displayed | store_id, sale_amount |

---

## 9. Future Enhancements

### 9.1 Phase 2 Features

- **Interactive Tutorial**: Guided walkthrough of dashboard features
- **Integration Setup**: Connect additional channels (SMS, push)
- **Custom Templates**: Edit email templates during onboarding
- **Team Invites**: Add team members during setup

### 9.2 Phase 3 Features

- **AI Training**: Upload brand guidelines for custom voice
- **Goal Setting**: Define revenue recovery targets
- **Competitor Analysis**: Industry benchmarking

---

## 10. Appendix

### 10.1 Glossary

| Term | Definition |
|------|------------|
| Brand Voice | The tone and style of AI-generated communications |
| Cart Abandonment | When a customer adds items but doesn't complete purchase |
| Recovery | Converting an abandoned cart to a completed sale |
| Attribution | Tracking which action led to a conversion |

### 10.2 Related Documents

- [TENANT_ONBOARDING.md](./yona-marketing/backend/TENANT_ONBOARDING.md) - API Documentation
- [ONBOARDING_GAP_ANALYSIS.md](./ONBOARDING_GAP_ANALYSIS.md) - Implementation Gap Analysis

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-05 | AI Assistant | Initial PRD based on current implementation |
