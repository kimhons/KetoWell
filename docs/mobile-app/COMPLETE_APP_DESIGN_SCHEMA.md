# KetoWell: Complete App Design Schema & Implementation Status

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**Total Screens**: 138  
**Current Status**: Design Complete, Implementation Pending

---

## 📋 Table of Contents

1. [Overview & Architecture](#overview--architecture)
2. [Screen-by-Screen Breakdown](#screen-by-screen-breakdown)
3. [User Journey Maps](#user-journey-maps)
4. [Data Models & Schemas](#data-models--schemas)
5. [API Endpoints](#api-endpoints)
6. [Implementation Status](#implementation-status)
7. [Technical Dependencies](#technical-dependencies)

---

## 🏗️ Overview & Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KetoWell Platform                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐         ┌─────────────────┐               │
│  │   Web Platform  │◄───────►│ Shared Backend  │               │
│  │   (React/Vite)  │         │  (Express/tRPC) │               │
│  └─────────────────┘         └─────────────────┘               │
│         ✅ LIVE                      ✅ LIVE                     │
│                                       ▲                          │
│                                       │                          │
│                                       │                          │
│  ┌─────────────────┐                 │                          │
│  │  Mobile App     │                 │                          │
│  │   (Flutter)     │─────────────────┘                          │
│  └─────────────────┘                                            │
│    🚧 PENDING                                                    │
│                                                                   │
│  ┌─────────────────┐         ┌─────────────────┐               │
│  │  Dr. Ketone AI  │         │   PostgreSQL    │               │
│  │  (OpenAI GPT)   │         │    Database     │               │
│  └─────────────────┘         └─────────────────┘               │
│    🚧 PENDING                      ✅ LIVE                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Platform Component Status

| Component | Technology | Status | Location | Notes |
|-----------|------------|--------|----------|-------|
| **Web Application** | React 19, Vite, TailwindCSS | ✅ Live | `packages/web/` | Marketing site, book sales, referral system |
| **Backend API** | Express, tRPC, Drizzle ORM | ✅ Live | `packages/web/server/` | Authentication, book purchases, referrals |
| **Database** | PostgreSQL (TiDB) | ✅ Live | Cloud | Users, purchases, referrals, waitlist |
| **Mobile App** | Flutter | 🚧 Design Complete | `packages/mobile/` (placeholder) | 138 screens documented |
| **Dr. Ketone AI** | OpenAI GPT-4.1 | 🚧 Design Complete | Backend integration pending | Conversational AI, predictive analytics |
| **Shared Code** | TypeScript | ✅ Live | `packages/shared/` | Types, constants, utilities |

### Navigation Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Mobile App Navigation                         │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │  App Launch     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Splash Screen  │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐       ┌─────────▼─────────┐
    │  First-Time User  │       │  Returning User   │
    │   (Onboarding)    │       │   (Dashboard)     │
    └─────────┬─────────┘       └─────────┬─────────┘
              │                           │
              │                           │
    ┌─────────▼─────────────────────────┬─┘
    │                                   │
    │  Main App (Bottom Tab Navigation) │
    │                                   │
    └───────────────┬───────────────────┘
                    │
    ┌───────────────┼───────────────┬───────────────┬───────────────┐
    │               │               │               │               │
┌───▼───┐      ┌───▼───┐      ┌───▼───┐      ┌───▼───┐      ┌───▼───┐
│ Home  │      │ Track │      │Dr.K AI│      │Progress│     │Profile│
│  Tab  │      │  Tab  │      │  Tab  │      │  Tab   │     │  Tab  │
└───┬───┘      └───┬───┘      └───┬───┘      └───┬───┘      └───┬───┘
    │              │              │              │              │
    │              │              │              │              │
 Dashboard    Food Logging    AI Chat       Analytics     Settings
 Quick Stats  Macro Tracker   Coaching      Trends        Community
 Dr.K Widget  Symptoms        Insights      Predictions   Education
```

---

## 📱 Screen-by-Screen Breakdown

### Category 1: Onboarding & Safety (15 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 1 | **Splash Screen** | 🚧 Design | P0 | None | Logo animation, version check |
| 2 | **Welcome** | 🚧 Design | P0 | None | Value proposition, "Get Started" CTA |
| 3 | **Medical Screening Intro** | 🚧 Design | P0 | None | Explanation of safety screening |
| 4 | **Absolute Contraindications** | 🚧 Design | P0 | Drug database | SGLT2i, lactation, genetic disorders |
| 5 | **Medication Inventory** | 🚧 Design | P0 | Drug database, search API | List all current medications |
| 6 | **Drug Interaction Analysis** | 🚧 Design | P0 | Backend API | Risk level, required actions |
| 7 | **Physician Clearance Upload** | 🚧 Design | P1 | File upload, camera | For high-risk users |
| 8 | **Medical Condition Assessment** | 🚧 Design | P0 | None | T1D, CKD, CVD checklist |
| 9 | **Goal Setting** | 🚧 Design | P0 | None | Therapeutic vs wellness goals |
| 10 | **Identity Formation Exercise** | 🚧 Design | P1 | None | "Who are you becoming?" |
| 11 | **Baseline Measurements** | 🚧 Design | P0 | Camera integration | Weight, body comp, photos |
| 12 | **Electrolyte Protocol Education** | 🚧 Design | P0 | None | Sodium, potassium, magnesium |
| 13 | **Keto Flu Expectations** | 🚧 Design | P0 | None | Timeline, symptom checklist |
| 14 | **Personalized Safety Protocol** | 🚧 Design | P1 | PDF generation | Summary of user's plan |
| 15 | **Consent & Disclaimer** | 🚧 Design | P0 | None | Legal protection, signature |

**Implementation Notes**:
- **Critical Path**: Screens 1-9, 11-13, 15 (MVP)
- **Can Defer**: Screens 7, 10, 14 (Phase 2)
- **Backend Requirements**: Drug interaction database, risk scoring algorithm
- **Third-Party**: Drug database (RxNorm, FDA API)

---

### Category 2: Core Tracking (25 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 16 | **Dashboard Home** | 🚧 Design | P0 | Backend API | Macro ring chart, ketone status |
| 17 | **Daily Macro Tracker** | 🚧 Design | P0 | Backend API | Real-time progress bars |
| 18 | **Meal Logging - Manual Entry** | 🚧 Design | P0 | None | Food name, serving, macros |
| 19 | **Meal Logging - Search** | 🚧 Design | P0 | USDA FoodData API | Search bar, recent foods |
| 20 | **Meal Logging - Barcode Scanner** | 🚧 Design | P1 | Camera, barcode API | Scan packaged foods |
| 21 | **Meal Logging - Voice Input** | 🚧 Design | P1 | Speech-to-text, Dr. Ketone | "I had a burger..." |
| 22 | **Meal Logging - Photo Recognition** | 🚧 Design | P2 | Camera, AI vision | Take photo of meal |
| 23 | **Food Detail View** | 🚧 Design | P0 | USDA API | Nutritional breakdown |
| 24 | **Recent Foods & Favorites** | 🚧 Design | P0 | Backend API | Quick access list |
| 25 | **Meal Templates** | 🚧 Design | P1 | Backend API | Save common meals |
| 26 | **Recipe Database** | 🚧 Design | P1 | Backend API | Keto-friendly recipes |
| 27 | **Net Carbs Calculator** | 🚧 Design | P0 | None | Fiber, sugar alcohols |
| 28 | **Ketone Level Tracker** | 🚧 Design | P0 | Backend API | Blood, breath, urine |
| 29 | **Blood Glucose Tracker** | 🚧 Design | P1 | Backend API | For diabetic users |
| 30 | **Weight & Body Composition** | 🚧 Design | P0 | Camera, backend | Weight, BF%, photos |
| 31 | **Electrolyte Intake Tracker** | 🚧 Design | P0 | Backend API | Na, K, Mg tracking |
| 32 | **Hydration Tracker** | 🚧 Design | P0 | Backend API | Water intake, daily goal |
| 33 | **Symptom Logger** | 🚧 Design | P0 | Backend API | Keto flu, energy, mood |
| 34 | **Medication Adherence** | 🚧 Design | P1 | Backend API | Track daily meds |
| 35 | **Sleep Quality Tracker** | 🚧 Design | P1 | Health Connect | Hours, quality rating |
| 36 | **Exercise/Activity Logger** | 🚧 Design | P1 | Health Connect | Type, duration, intensity |
| 37 | **Daily Summary** | 🚧 Design | P0 | Backend API | End-of-day review |
| 38 | **Weekly Progress Review** | 🚧 Design | P1 | Backend API | Week-over-week comparison |
| 39 | **Monthly Trend Analysis** | 🚧 Design | P1 | Backend API | Long-term patterns |
| 40 | **Data Export** | 🚧 Design | P2 | Backend API | CSV, PDF export |

**Implementation Notes**:
- **Critical Path**: 16-19, 23-24, 27-28, 30-33, 37 (MVP)
- **Can Defer**: 20-22, 25-26, 34-36, 38-40 (Phase 2)
- **Backend Requirements**: Food database, macro calculation engine, time-series storage
- **Third-Party**: USDA FoodData Central, Nutritionix, barcode API (UPC Database)

---

### Category 3: Dr. Ketone AI Assistant (20 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 41 | **Dr. Ketone Chat Home** | 🚧 Design | P0 | OpenAI API | Main conversational interface |
| 42 | **Dr. Ketone Onboarding** | 🚧 Design | P0 | None | Avatar reveal, capabilities |
| 43 | **Ask Dr. Ketone** | 🚧 Design | P0 | OpenAI API | Q&A mode |
| 44 | **Daily Check-In** | 🚧 Design | P0 | Backend API | Proactive morning greeting |
| 45 | **Symptom Assessment Dialogue** | 🚧 Design | P0 | OpenAI API | Guided evaluation |
| 46 | **Meal Analysis & Feedback** | 🚧 Design | P0 | OpenAI API | Real-time meal evaluation |
| 47 | **Personalized Recommendations** | 🚧 Design | P0 | OpenAI API, ML models | Daily tips based on patterns |
| 48 | **Electrolyte Optimization** | 🚧 Design | P0 | Backend API | Na/K/Mg guidance |
| 49 | **Plateau Breakthrough Strategies** | 🚧 Design | P1 | ML models | Weight loss stall analysis |
| 50 | **Medication Adjustment Guidance** | 🚧 Design | P1 | Backend API | Timing for MD consultation |
| 51 | **Motivational Coaching Session** | 🚧 Design | P1 | OpenAI API | Adherence challenges |
| 52 | **Identity-Building Exercises** | 🚧 Design | P1 | Backend API | "Who are you becoming?" |
| 53 | **Habit Formation Progress** | 🚧 Design | P0 | Backend API | 66-day tracker |
| 54 | **Behavioral Pattern Analysis** | 🚧 Design | P1 | ML models | Dr. Ketone's observations |
| 55 | **Predictive Insights Dashboard** | 🚧 Design | P1 | ML models | Ketosis prediction, trajectory |
| 56 | **Dr. Ketone Settings** | 🚧 Design | P0 | Backend API | Customize AI behavior |
| 57 | **Conversation History** | 🚧 Design | P1 | Backend API | Searchable archive |
| 58 | **Saved Insights & Tips** | 🚧 Design | P1 | Backend API | Bookmarked responses |
| 59 | **Emergency Support Protocols** | 🚧 Design | P0 | Backend API | Escalation triggers |
| 60 | **Dr. Ketone Feedback** | 🚧 Design | P1 | Backend API | Rate responses |

**Implementation Notes**:
- **Critical Path**: 41-48, 53, 56, 59 (MVP)
- **Can Defer**: 49-52, 54-55, 57-58, 60 (Phase 2)
- **Backend Requirements**: OpenAI API integration, conversation memory, ML prediction models
- **Third-Party**: OpenAI GPT-4.1 or Gemini 2.5 Flash

---

### Category 4: Education & Evidence (15 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 61 | **Evidence Library Home** | 🚧 Design | P1 | Backend API | Hub for educational content |
| 62 | **Clinical Evidence - Metabolic** | 🚧 Design | P1 | Content CMS | Diabetes, weight loss, insulin |
| 63 | **Clinical Evidence - Cardiovascular** | 🚧 Design | P1 | Content CMS | LDL paradox, triglycerides |
| 64 | **Clinical Evidence - Neurological** | 🚧 Design | P1 | Content CMS | Epilepsy, Alzheimer's, Parkinson's |
| 65 | **Clinical Evidence - Cancer** | 🚧 Design | P2 | Content CMS | Glioblastoma, cachexia risks |
| 66 | **Clinical Evidence - Psychiatric** | 🚧 Design | P2 | Content CMS | Schizophrenia, bipolar |
| 67 | **Behavior Science - Habit Formation** | 🚧 Design | P1 | Content CMS | 66-day timeline, context stability |
| 68 | **Behavior Science - Motivation** | 🚧 Design | P1 | Content CMS | SDT, identity-based motivation |
| 69 | **Safety Protocols - Contraindications** | 🚧 Design | P0 | Content CMS | Absolute vs cautions |
| 70 | **Safety Protocols - Drug Interactions** | 🚧 Design | P0 | Content CMS | Medication-specific guidance |
| 71 | **Safety Protocols - Electrolyte Management** | 🚧 Design | P0 | Content CMS | Daily targets, food sources |
| 72 | **Keto Flu Management Guide** | 🚧 Design | P0 | Content CMS | Symptom-by-symptom solutions |
| 73 | **Adaptation Timeline Explained** | 🚧 Design | P0 | Content CMS | Week-by-week expectations |
| 74 | **Research Citation Browser** | 🚧 Design | P2 | Backend API | PubMed links, study details |
| 75 | **FAQ & Troubleshooting** | 🚧 Design | P1 | Content CMS | Common questions |

**Implementation Notes**:
- **Critical Path**: 61, 69-73, 75 (MVP)
- **Can Defer**: 62-68, 74 (Phase 2)
- **Backend Requirements**: Content management system, markdown rendering
- **Content**: Can reuse content from web platform `/research` page

---

### Category 5: Progress & Analytics (20 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 76 | **Progress Dashboard** | 🚧 Design | P0 | Backend API | Overview of all metrics |
| 77 | **Weight Trend Chart** | 🚧 Design | P0 | Charting library | Line chart with predictions |
| 78 | **Body Composition Trends** | 🚧 Design | P1 | Charting library | Body fat %, lean mass |
| 79 | **Ketone Level History** | 🚧 Design | P0 | Charting library | Ketosis tracking over time |
| 80 | **Blood Glucose History** | 🚧 Design | P1 | Charting library | For diabetic users |
| 81 | **Macro Adherence Report** | 🚧 Design | P0 | Backend API | Daily/weekly averages |
| 82 | **Calorie Intake Analysis** | 🚧 Design | P1 | Backend API | Trends, deficits, surpluses |
| 83 | **Electrolyte Compliance** | 🚧 Design | P0 | Backend API | Na/K/Mg daily averages |
| 84 | **Symptom Trends** | 🚧 Design | P0 | Backend API | Keto flu progression |
| 85 | **Energy Level Tracking** | 🚧 Design | P1 | Backend API | Daily energy ratings |
| 86 | **Sleep Quality Analysis** | 🚧 Design | P1 | Backend API | Hours, quality trends |
| 87 | **Exercise Activity Summary** | 🚧 Design | P1 | Backend API | Weekly activity levels |
| 88 | **Habit Streak Visualization** | 🚧 Design | P0 | Backend API | 66-day progress |
| 89 | **Milestone Achievements** | 🚧 Design | P1 | Backend API | Badges, celebrations |
| 90 | **Predictive Weight Trajectory** | 🚧 Design | P1 | ML models | Forecasted weight loss |
| 91 | **Ketosis Prediction Timeline** | 🚧 Design | P0 | ML models | When will I enter ketosis? |
| 92 | **Plateau Risk Assessment** | 🚧 Design | P1 | ML models | Early warning system |
| 93 | **Medication Adjustment Alerts** | 🚧 Design | P1 | ML models | Timing recommendations |
| 94 | **Comparison to Population Data** | 🚧 Design | P2 | Backend API | Anonymized benchmarks |
| 95 | **Custom Report Builder** | 🚧 Design | P2 | Backend API | User-defined metrics |

**Implementation Notes**:
- **Critical Path**: 76-77, 79, 81, 83-84, 88, 91 (MVP)
- **Can Defer**: 78, 80, 82, 85-87, 89-90, 92-95 (Phase 2)
- **Backend Requirements**: Time-series database, charting library (fl_chart), ML prediction models
- **Third-Party**: Chart libraries, statistical analysis packages

---

### Category 6: Social & Community (15 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 96 | **Community Home** | 🚧 Design | P2 | Backend API | Hub for social features |
| 97 | **Discussion Forums** | 🚧 Design | P2 | Backend API | Topic-based threads |
| 98 | **Forum Thread View** | 🚧 Design | P2 | Backend API | Comments, replies |
| 99 | **Create New Post** | 🚧 Design | P2 | Backend API | Text, images, polls |
| 100 | **User Profile (Public)** | 🚧 Design | P2 | Backend API | Bio, stats, achievements |
| 101 | **Success Stories** | 🚧 Design | P2 | Backend API | Before/after, testimonials |
| 102 | **Challenge Hub** | 🚧 Design | P2 | Backend API | Active challenges |
| 103 | **Challenge Detail** | 🚧 Design | P2 | Backend API | Rules, leaderboard, join |
| 104 | **Challenge Leaderboard** | 🚧 Design | P2 | Backend API | Rankings, scores |
| 105 | **Accountability Partners** | 🚧 Design | P2 | Backend API | Matching, messaging |
| 106 | **Partner Chat** | 🚧 Design | P2 | Backend API | 1-on-1 messaging |
| 107 | **Group Challenges** | 🚧 Design | P2 | Backend API | Team-based competitions |
| 108 | **Social Feed** | 🚧 Design | P2 | Backend API | Activity stream |
| 109 | **Notifications Center** | 🚧 Design | P1 | Backend API | Comments, likes, mentions |
| 110 | **Moderation Tools** | 🚧 Design | P2 | Backend API | Report, block, flag |

**Implementation Notes**:
- **Critical Path**: None (all Phase 2/3)
- **Can Defer**: All screens (Phase 2)
- **Backend Requirements**: Forum system, real-time messaging, moderation tools
- **Third-Party**: Firebase Realtime Database or Socket.io for chat

---

### Category 7: Advanced Features (10 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 111 | **Meal Planning Hub** | 🚧 Design | P2 | Backend API | Weekly meal plans |
| 112 | **Meal Plan Generator** | 🚧 Design | P2 | OpenAI API | AI-generated plans |
| 113 | **Meal Plan Detail** | 🚧 Design | P2 | Backend API | Daily breakdown |
| 114 | **Shopping List Generator** | 🚧 Design | P2 | Backend API | Auto-generated from meal plan |
| 115 | **Recipe Browser** | 🚧 Design | P2 | Backend API | Keto-friendly recipes |
| 116 | **Recipe Detail** | 🚧 Design | P2 | Backend API | Ingredients, instructions, macros |
| 117 | **Restaurant Guide** | 🚧 Design | P2 | Backend API | Keto-friendly restaurants |
| 118 | **Restaurant Menu Browser** | 🚧 Design | P2 | Backend API | Menu items with modifications |
| 119 | **Device Integrations** | 🚧 Design | P2 | Health Connect | Sync with wearables |
| 120 | **Lab Results Tracker** | 🚧 Design | P2 | Backend API | Upload lab reports |

**Implementation Notes**:
- **Critical Path**: None (all Phase 2/3)
- **Can Defer**: All screens (Phase 2)
- **Backend Requirements**: Recipe database, restaurant database, device integration APIs
- **Third-Party**: Health Connect (Android), HealthKit (iOS), restaurant APIs

---

### Category 8: Settings & Admin (18 Screens)

| # | Screen Name | Status | Priority | Dependencies | Notes |
|---|-------------|--------|----------|--------------|-------|
| 121 | **Settings Home** | 🚧 Design | P0 | None | Main settings menu |
| 122 | **Account Settings** | 🚧 Design | P0 | Backend API | Email, password, profile |
| 123 | **Notification Preferences** | 🚧 Design | P0 | Backend API | Push, email, SMS settings |
| 124 | **Privacy Settings** | 🚧 Design | P0 | Backend API | Data sharing, visibility |
| 125 | **Data & Storage** | 🚧 Design | P1 | Backend API | Cache, offline data |
| 126 | **Units & Preferences** | 🚧 Design | P0 | Backend API | Metric/imperial, time zone |
| 127 | **Macro Goals Configuration** | 🚧 Design | P0 | Backend API | Custom macro ratios |
| 128 | **Electrolyte Targets** | 🚧 Design | P0 | Backend API | Custom Na/K/Mg goals |
| 129 | **Medication Management** | 🚧 Design | P1 | Backend API | Add/edit/remove meds |
| 130 | **Medical Conditions** | 🚧 Design | P1 | Backend API | Update health conditions |
| 131 | **Physician Information** | 🚧 Design | P1 | Backend API | Contact info, clearances |
| 132 | **Subscription Management** | 🚧 Design | P0 | Stripe API | Upgrade, cancel, billing |
| 133 | **Help & Support** | 🚧 Design | P1 | Backend API | FAQs, contact support |
| 134 | **About & Legal** | 🚧 Design | P0 | None | Privacy policy, terms |
| 135 | **Tutorial & Onboarding** | 🚧 Design | P1 | None | Re-run onboarding |
| 136 | **App Version & Updates** | 🚧 Design | P1 | Backend API | Version check, changelog |
| 137 | **Feedback & Bug Report** | 🚧 Design | P1 | Backend API | Submit feedback |
| 138 | **Logout & Account Deletion** | 🚧 Design | P0 | Backend API | Sign out, delete account |

**Implementation Notes**:
- **Critical Path**: 121-124, 126-128, 132, 134, 138 (MVP)
- **Can Defer**: 125, 129-131, 133, 135-137 (Phase 2)
- **Backend Requirements**: User preferences API, subscription management (Stripe)
- **Third-Party**: Stripe for subscription management

---

## 🗺️ User Journey Maps

### Journey 1: First-Time User Onboarding

```
┌─────────────────────────────────────────────────────────────────┐
│                  First-Time User Journey                         │
└─────────────────────────────────────────────────────────────────┘

Start: App Download & Launch
│
├─► Screen 1: Splash Screen (2-3 seconds)
│   └─► Logo animation, version check
│
├─► Screen 2: Welcome
│   └─► Value proposition, "Get Started" button
│
├─► Screen 3: Medical Screening Intro
│   └─► Explanation of why screening is required
│
├─► Screen 4: Absolute Contraindications
│   ├─► "Do you take SGLT2 inhibitors?" → YES → BLOCK + Physician clearance required
│   ├─► "Are you currently breastfeeding?" → YES → BLOCK + Warning
│   └─► "Do you have porphyria or fatty acid oxidation defects?" → YES → BLOCK
│
├─► Screen 5: Medication Inventory
│   └─► Search and add all current medications
│
├─► Screen 6: Drug Interaction Analysis
│   ├─► Green: Safe to proceed
│   ├─► Yellow: Caution, monitor closely
│   └─► Red: Requires physician clearance
│
├─► Screen 8: Medical Condition Assessment
│   └─► Check all that apply: T1D, T2D, CKD, CVD, etc.
│
├─► Screen 9: Goal Setting
│   ├─► Weight loss
│   ├─► Disease management
│   ├─► Athletic performance
│   └─► General wellness
│
├─► Screen 11: Baseline Measurements
│   ├─► Current weight
│   ├─► Body fat % (optional)
│   └─► Progress photos (optional)
│
├─► Screen 12: Electrolyte Protocol Education
│   └─► Daily targets: 3-5g sodium, 3-4.7g potassium, 300-500mg magnesium
│
├─► Screen 13: Keto Flu Expectations
│   └─► Timeline: Days 1-3 (onset), Days 3-5 (ketosis), Weeks 3-6 (full adaptation)
│
├─► Screen 15: Consent & Disclaimer
│   └─► "I understand this app is not a substitute for medical advice"
│
└─► Screen 16: Dashboard Home (Main App)
    └─► Welcome message from Dr. Ketone: "Let's get started on your journey!"

Duration: 10-15 minutes
Completion Rate Target: 60% (industry average: 40%)
```

### Journey 2: Daily Active User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Daily Active User Journey                     │
└─────────────────────────────────────────────────────────────────┘

Morning (7-9 AM)
│
├─► Screen 16: Dashboard Home
│   ├─► Dr. Ketone proactive check-in: "Good morning! How are you feeling today?"
│   ├─► Quick stats: Macros remaining, ketone status, streak count
│   └─► Quick actions: Log breakfast, check symptoms
│
├─► Screen 44: Daily Check-In (Dr. Ketone)
│   ├─► "Any headaches or fatigue?" → Track symptoms
│   └─► "Did you sleep well?" → Track sleep quality
│
└─► Screen 18/19: Meal Logging - Breakfast
    └─► Log eggs, bacon, avocado → Macros updated in real-time

Midday (12-1 PM)
│
├─► Screen 19: Meal Logging - Search
│   └─► Search "Chipotle salad bowl" → Log lunch
│
└─► Screen 46: Meal Analysis & Feedback (Dr. Ketone)
    └─► "Great choice! You're at 15g carbs for the day. Keep it up!"

Afternoon (3-4 PM)
│
├─► Screen 33: Symptom Logger
│   └─► Log: Slight headache (severity 3/10)
│
└─► Screen 45: Symptom Assessment Dialogue (Dr. Ketone)
    ├─► "How much water have you had today?"
    ├─► "Did you add salt to your meals?"
    └─► "Mix 1/2 tsp salt in water and drink it. Check back in 30 min."

Evening (6-8 PM)
│
├─► Screen 19: Meal Logging - Dinner
│   └─► Log salmon, broccoli, butter
│
├─► Screen 17: Daily Macro Tracker
│   └─► Review: 20g carbs, 120g fat, 90g protein ✅ On target!
│
└─► Screen 37: Daily Summary
    ├─► Macros: 95% adherence
    ├─► Electrolytes: Sodium low (2,500mg) ⚠️
    ├─► Symptoms: Headache resolved ✅
    └─► Dr. Ketone insight: "Day 4 complete! You're likely entering ketosis soon."

Night (9-10 PM)
│
└─► Screen 76: Progress Dashboard
    ├─► Weight: -2.5 lbs this week
    ├─► Ketone trend: Increasing
    └─► Habit streak: 4 days 🔥

Duration: 15-20 minutes total (across multiple sessions)
Target DAU: 40% of MAU
```

### Journey 3: Weight Loss Plateau Resolution

```
┌─────────────────────────────────────────────────────────────────┐
│              Weight Loss Plateau Resolution Journey              │
└─────────────────────────────────────────────────────────────────┘

Trigger: Weight stable for 10+ days
│
├─► Screen 76: Progress Dashboard
│   └─► Weight chart shows plateau (flat line for 10 days)
│
├─► Screen 92: Plateau Risk Assessment (Auto-triggered)
│   └─► Dr. Ketone: "I noticed your weight has been stable. Let's analyze why."
│
├─► Screen 54: Behavioral Pattern Analysis
│   ├─► "Your protein increased from 80g to 120g 10 days ago"
│   ├─► "Some people are sensitive to excess protein (gluconeogenesis)"
│   └─► "Your calorie intake is consistent (no metabolic adaptation)"
│
├─► Screen 49: Plateau Breakthrough Strategies
│   ├─► Strategy 1: Reduce protein to 90-100g for 1 week
│   ├─► Strategy 2: Add intermittent fasting (16:8)
│   ├─► Strategy 3: Increase fat intake by 20g
│   └─► "Which strategy sounds most doable for you?"
│
├─► User selects Strategy 1
│   └─► Dr. Ketone: "Great! I'll adjust your macro targets. Let's check progress in 7 days."
│
├─► Screen 127: Macro Goals Configuration (Auto-updated)
│   └─► New targets: 20g carbs, 130g fat, 95g protein
│
└─► 7 Days Later: Screen 76: Progress Dashboard
    ├─► Weight: -1.5 lbs (plateau broken!)
    └─► Dr. Ketone: "The protein adjustment worked! Your body is responding well."

Duration: 5-10 minutes (initial analysis), 7-day follow-up
Success Rate Target: 70% of plateaus resolved within 2 weeks
```

---

## 💾 Data Models & Schemas

### Core Database Tables

#### 1. Users Table

```typescript
interface User {
  id: string;                    // UUID
  openId: string;                // Manus OAuth identifier
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
  
  // Mobile-specific fields (to be added)
  phoneNumber?: string;
  profilePhotoUrl?: string;
  timezone: string;
  locale: string;
  subscriptionTier: 'free' | 'premium' | 'clinical';
  subscriptionExpiresAt?: Date;
}
```

**Status**: ✅ Exists in web platform, needs mobile fields

#### 2. User Profile Table

```typescript
interface UserProfile {
  userId: string;                // Foreign key to users.id
  
  // Onboarding data
  goalType: 'weight_loss' | 'disease_management' | 'performance' | 'wellness';
  targetWeight?: number;
  currentWeight: number;
  heightCm: number;
  age: number;
  sex: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  
  // Medical data
  hasT1D: boolean;
  hasT2D: boolean;
  hasCKD: boolean;
  hasCVD: boolean;
  hasEpilepsy: boolean;
  otherConditions: string[];
  
  // Contraindications
  takesSGLT2i: boolean;
  isLactating: boolean;
  hasGeneticDisorder: boolean;
  
  // Macro targets
  dailyCalories: number;
  carbsGrams: number;
  fatGrams: number;
  proteinGrams: number;
  
  // Electrolyte targets
  sodiumMg: number;              // Default: 4000
  potassiumMg: number;           // Default: 3500
  magnesiumMg: number;           // Default: 400
  
  // Preferences
  units: 'metric' | 'imperial';
  notificationsEnabled: boolean;
  drKetoneCheckInFrequency: 'daily' | 'every_other_day' | 'weekly';
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 3. Medications Table

```typescript
interface Medication {
  id: string;
  userId: string;
  
  drugName: string;
  genericName: string;
  rxcui: string;                 // RxNorm Concept Unique Identifier
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  
  // Risk assessment
  riskLevel: 'safe' | 'caution' | 'requires_clearance' | 'contraindicated';
  interactionNotes: string;
  
  // Physician clearance (for high-risk meds)
  requiresClearance: boolean;
  clearanceDocumentUrl?: string;
  clearanceExpiresAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 4. Food Logs Table

```typescript
interface FoodLog {
  id: string;
  userId: string;
  
  loggedAt: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  
  // Food data
  foodName: string;
  servingSize: number;
  servingUnit: string;
  
  // Macros
  calories: number;
  carbsGrams: number;
  fiberGrams: number;
  sugarAlcoholsGrams: number;
  netCarbsGrams: number;         // carbs - fiber - sugarAlcohols
  fatGrams: number;
  proteinGrams: number;
  
  // Source
  source: 'manual' | 'search' | 'barcode' | 'voice' | 'photo';
  fdcId?: string;                // USDA FoodData Central ID
  upc?: string;                  // Barcode UPC
  
  // AI analysis (if voice/photo)
  aiConfidence?: number;
  aiRawResponse?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 5. Biomarker Logs Table

```typescript
interface BiomarkerLog {
  id: string;
  userId: string;
  
  loggedAt: Date;
  biomarkerType: 'weight' | 'ketone' | 'glucose' | 'body_fat' | 'blood_pressure';
  
  // Weight
  weightKg?: number;
  bodyFatPercent?: number;
  leanMassKg?: number;
  
  // Ketones
  ketoneLevel?: number;
  ketoneUnit?: 'mmol/L' | 'mg/dL';
  ketoneMethod?: 'blood' | 'breath' | 'urine';
  
  // Glucose
  glucoseMgDl?: number;
  glucoseContext?: 'fasting' | 'post_meal' | 'random';
  
  // Blood pressure
  systolicMmHg?: number;
  diastolicMmHg?: number;
  
  // Progress photo
  photoUrl?: string;
  photoType?: 'front' | 'side' | 'back';
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 6. Symptom Logs Table

```typescript
interface SymptomLog {
  id: string;
  userId: string;
  
  loggedAt: Date;
  
  // Keto flu symptoms
  headache: number;              // 0-10 scale
  fatigue: number;
  dizziness: number;
  nausea: number;
  irritability: number;
  brainFog: number;
  muscleCreamps: number;
  constipation: number;
  
  // Energy & mood
  energyLevel: number;           // 1-10 scale
  moodRating: number;            // 1-10 scale
  hungerLevel: number;           // 1-10 scale
  
  // Notes
  notes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 7. Electrolyte Logs Table

```typescript
interface ElectrolyteLog {
  id: string;
  userId: string;
  
  loggedAt: Date;
  
  sodiumMg: number;
  potassiumMg: number;
  magnesiumMg: number;
  
  // Sources
  sodiumSources: string[];       // ['table salt', 'bone broth', 'pickles']
  potassiumSources: string[];    // ['avocado', 'spinach', 'supplement']
  magnesiumSources: string[];    // ['almonds', 'dark chocolate', 'supplement']
  
  createdAt: Date;
  updatedAt: Date;
}
```

**Status**: 🚧 New table, needs to be created

#### 8. Dr. Ketone Conversations Table

```typescript
interface DrKetoneConversation {
  id: string;
  userId: string;
  
  startedAt: Date;
  lastMessageAt: Date;
  
  conversationType: 'chat' | 'check_in' | 'symptom_assessment' | 'meal_analysis' | 'coaching';
  
  // Context
  contextData: Record<string, any>;  // Relevant user data for this conversation
  
  messages: DrKetoneMessage[];
  
  // Outcomes
  actionsTaken: string[];        // ['logged_symptom', 'adjusted_macros', 'scheduled_doctor']
  escalationTriggered: boolean;
  escalationReason?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

interface DrKetoneMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  
  // AI metadata
  model: string;                 // 'gpt-4.1-turbo'
  tokensUsed: number;
  confidence?: number;
}
```

**Status**: 🚧 New table, needs to be created

#### 9. Habit Tracking Table

```typescript
interface HabitTracking {
  id: string;
  userId: string;
  
  startDate: Date;
  currentDay: number;            // 1-66
  targetDays: number;            // Default: 66
  
  // Daily check-ins
  checkIns: HabitCheckIn[];
  
  // Streak
  currentStreak: number;
  longestStreak: number;
  
  // Automaticity score (calculated)
  automaticityScore: number;     // 0-100
  
  // Identity exercises
  identityStatement: string;     // "I am someone who..."
  identityProgress: number;      // 0-100
  
  createdAt: Date;
  updatedAt: Date;
}

interface HabitCheckIn {
  date: Date;
  completed: boolean;
  difficultyRating: number;      // 1-10 (how hard was it today?)
  contextStability: number;      // 1-10 (same time/place/cue?)
  notes?: string;
}
```

**Status**: 🚧 New table, needs to be created

#### 10. Gamification Table

```typescript
interface GamificationProgress {
  id: string;
  userId: string;
  
  // Points & levels
  totalPoints: number;
  currentLevel: number;
  pointsToNextLevel: number;
  
  // Achievements
  achievements: Achievement[];
  
  // Challenges
  activeChallenges: Challenge[];
  completedChallenges: Challenge[];
  
  // Leaderboards
  globalRank?: number;
  weeklyRank?: number;
  
  // Rewards
  rewardsEarned: Reward[];
  rewardsRedeemed: Reward[];
  
  createdAt: Date;
  updatedAt: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: Date;
  category: 'tracking' | 'adherence' | 'social' | 'milestone';
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number;              // 0-100
  reward: Reward;
}

interface Reward {
  id: string;
  type: 'badge' | 'discount' | 'feature_unlock';
  name: string;
  description: string;
  value?: string;                // e.g., "20% off Premium"
  expiresAt?: Date;
}
```

**Status**: 🚧 New table, needs to be created (Phase 2)

---

## 🔌 API Endpoints

### Authentication Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/auth/login` | POST | ✅ Live | Manus OAuth login |
| `/api/auth/logout` | POST | ✅ Live | Clear session cookie |
| `/api/auth/me` | GET | ✅ Live | Get current user |
| `/api/auth/refresh` | POST | 🚧 Pending | Refresh access token |

### User Profile Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/profile` | GET | 🚧 Pending | Get user profile |
| `/api/profile` | PUT | 🚧 Pending | Update user profile |
| `/api/profile/onboarding` | POST | 🚧 Pending | Complete onboarding |
| `/api/profile/goals` | PUT | 🚧 Pending | Update macro/electrolyte goals |
| `/api/profile/photo` | POST | 🚧 Pending | Upload profile photo |

### Medication Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/medications` | GET | 🚧 Pending | List user medications |
| `/api/medications` | POST | 🚧 Pending | Add medication |
| `/api/medications/:id` | PUT | 🚧 Pending | Update medication |
| `/api/medications/:id` | DELETE | 🚧 Pending | Remove medication |
| `/api/medications/search` | GET | 🚧 Pending | Search drug database (RxNorm) |
| `/api/medications/interactions` | POST | 🚧 Pending | Analyze drug interactions |
| `/api/medications/clearance` | POST | 🚧 Pending | Upload physician clearance |

### Food Logging Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/food/log` | POST | 🚧 Pending | Log food entry |
| `/api/food/logs` | GET | 🚧 Pending | Get food logs (date range) |
| `/api/food/logs/:id` | PUT | 🚧 Pending | Update food log |
| `/api/food/logs/:id` | DELETE | 🚧 Pending | Delete food log |
| `/api/food/search` | GET | 🚧 Pending | Search USDA FoodData Central |
| `/api/food/barcode/:upc` | GET | 🚧 Pending | Look up food by barcode |
| `/api/food/voice` | POST | 🚧 Pending | Parse voice food log |
| `/api/food/photo` | POST | 🚧 Pending | Analyze food photo |
| `/api/food/recent` | GET | 🚧 Pending | Get recent foods |
| `/api/food/favorites` | GET | 🚧 Pending | Get favorite foods |

### Biomarker Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/biomarkers/log` | POST | 🚧 Pending | Log biomarker (weight, ketone, glucose) |
| `/api/biomarkers/logs` | GET | 🚧 Pending | Get biomarker logs (date range) |
| `/api/biomarkers/trends` | GET | 🚧 Pending | Get trend analysis |
| `/api/biomarkers/predictions` | GET | 🚧 Pending | Get predictive analytics |

### Symptom Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/symptoms/log` | POST | 🚧 Pending | Log symptoms |
| `/api/symptoms/logs` | GET | 🚧 Pending | Get symptom logs (date range) |
| `/api/symptoms/trends` | GET | 🚧 Pending | Get symptom trends |

### Electrolyte Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/electrolytes/log` | POST | 🚧 Pending | Log electrolyte intake |
| `/api/electrolytes/logs` | GET | 🚧 Pending | Get electrolyte logs (date range) |
| `/api/electrolytes/compliance` | GET | 🚧 Pending | Get compliance report |

### Dr. Ketone AI Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/dr-ketone/chat` | POST | 🚧 Pending | Send message to Dr. Ketone |
| `/api/dr-ketone/conversations` | GET | 🚧 Pending | Get conversation history |
| `/api/dr-ketone/check-in` | POST | 🚧 Pending | Trigger daily check-in |
| `/api/dr-ketone/analyze-meal` | POST | 🚧 Pending | Analyze logged meal |
| `/api/dr-ketone/assess-symptoms` | POST | 🚧 Pending | Assess symptoms |
| `/api/dr-ketone/predict-ketosis` | GET | 🚧 Pending | Predict ketosis timing |
| `/api/dr-ketone/predict-plateau` | GET | 🚧 Pending | Predict plateau risk |

### Progress & Analytics Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/progress/dashboard` | GET | 🚧 Pending | Get dashboard summary |
| `/api/progress/weight-trend` | GET | 🚧 Pending | Get weight trend data |
| `/api/progress/macro-adherence` | GET | 🚧 Pending | Get macro adherence report |
| `/api/progress/habit-streak` | GET | 🚧 Pending | Get habit streak data |

### Habit Tracking Endpoints

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/habits/check-in` | POST | 🚧 Pending | Log daily habit check-in |
| `/api/habits/progress` | GET | 🚧 Pending | Get 66-day progress |
| `/api/habits/identity` | PUT | 🚧 Pending | Update identity statement |

### Gamification Endpoints (Phase 2)

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/gamification/progress` | GET | 🚧 Pending | Get gamification progress |
| `/api/gamification/achievements` | GET | 🚧 Pending | Get achievements |
| `/api/gamification/challenges` | GET | 🚧 Pending | Get active challenges |
| `/api/gamification/leaderboard` | GET | 🚧 Pending | Get leaderboard |

### Book Integration Endpoints (Existing)

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/api/book/checkout` | POST | ✅ Live | Create Stripe checkout session |
| `/api/book/verify-purchase` | POST | ✅ Live | Verify purchase and send email |
| `/api/book/download` | GET | ✅ Live | Download book PDF |
| `/api/book/referral/generate` | POST | ✅ Live | Generate referral code |
| `/api/book/referral/validate` | GET | ✅ Live | Validate referral code |

---

## 📊 Implementation Status

### Overall Progress

```
┌─────────────────────────────────────────────────────────────────┐
│                    Implementation Progress                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Design Complete:        ████████████████████████  100% (138/138)│
│  Backend APIs:           ████░░░░░░░░░░░░░░░░░░░   20% (12/60)  │
│  Mobile Screens:         ░░░░░░░░░░░░░░░░░░░░░░░    0% (0/138)  │
│  Dr. Ketone AI:          ░░░░░░░░░░░░░░░░░░░░░░░    0% (0/1)    │
│  Database Schema:        ████░░░░░░░░░░░░░░░░░░░   20% (2/10)   │
│                                                                   │
│  Overall Completion:     ████░░░░░░░░░░░░░░░░░░░   20%          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Phase Breakdown

| Phase | Status | Completion | ETA | Notes |
|-------|--------|------------|-----|-------|
| **Design & Research** | ✅ Complete | 100% | Done | All 138 screens documented |
| **Backend APIs** | 🚧 In Progress | 20% | - | Book APIs live, need mobile APIs |
| **Mobile App MVP** | 🚧 Pending | 0% | 3-4 months | Ready to start |
| **Dr. Ketone AI** | 🚧 Pending | 0% | 2-3 months | OpenAI integration needed |
| **Gamification** | 🚧 Pending | 0% | 2-3 months | Phase 2 |
| **Medical Safety** | 🚧 Pending | 0% | 2-3 months | Phase 3 |
| **HIPAA Compliance** | 🚧 Pending | 0% | 3-4 months | Phase 4 |

### Priority Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                        Priority Matrix                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  HIGH PRIORITY (P0) - MVP Critical                               │
│  ├─ Onboarding flow (screens 1-9, 11-13, 15)                    │
│  ├─ Core tracking (screens 16-19, 23-24, 27-28, 30-33, 37)      │
│  ├─ Dr. Ketone chat (screens 41-48, 53, 56, 59)                 │
│  ├─ Progress dashboard (screens 76-77, 79, 81, 83-84, 88, 91)   │
│  └─ Settings (screens 121-124, 126-128, 132, 134, 138)          │
│                                                                   │
│  MEDIUM PRIORITY (P1) - MVP Nice-to-Have                         │
│  ├─ Advanced tracking (screens 20, 25-26, 29, 34-36, 38-39)     │
│  ├─ Dr. Ketone advanced (screens 49-52, 54-55, 57-58, 60)       │
│  ├─ Education (screens 61-68, 75)                                │
│  └─ Settings advanced (screens 125, 129-131, 133, 135-137)      │
│                                                                   │
│  LOW PRIORITY (P2) - Phase 2/3                                   │
│  ├─ Photo/voice logging (screens 21-22)                          │
│  ├─ Social features (screens 96-110)                             │
│  ├─ Advanced features (screens 111-120)                          │
│  └─ Research browser (screen 74)                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Dependencies

### Frontend (Flutter)

| Dependency | Purpose | Status | Notes |
|------------|---------|--------|-------|
| **flutter_bloc** | State management | 🚧 Pending | Recommended pattern |
| **dio** | HTTP client | 🚧 Pending | API requests |
| **fl_chart** | Charts & graphs | 🚧 Pending | Progress visualizations |
| **camera** | Camera access | 🚧 Pending | Photo logging, progress photos |
| **image_picker** | Image selection | 🚧 Pending | Photo uploads |
| **barcode_scan2** | Barcode scanning | 🚧 Pending | Food barcode lookup |
| **speech_to_text** | Voice input | 🚧 Pending | Voice food logging |
| **health** | Health data access | 🚧 Pending | HealthKit/Health Connect |
| **shared_preferences** | Local storage | 🚧 Pending | User preferences |
| **sqflite** | Local database | 🚧 Pending | Offline data |
| **firebase_messaging** | Push notifications | 🚧 Pending | Dr. Ketone check-ins |
| **url_launcher** | External links | 🚧 Pending | Open web pages, email |
| **pdf** | PDF generation | 🚧 Pending | Safety protocol PDFs |
| **intl** | Internationalization | 🚧 Pending | Date/time formatting |

### Backend (Node.js/Express)

| Dependency | Purpose | Status | Notes |
|------------|---------|--------|-------|
| **express** | Web framework | ✅ Live | Already in use |
| **@trpc/server** | Type-safe API | ✅ Live | Already in use |
| **drizzle-orm** | Database ORM | ✅ Live | Already in use |
| **openai** | Dr. Ketone AI | 🚧 Pending | GPT-4.1 integration |
| **stripe** | Payment processing | ✅ Live | Book purchases |
| **resend** | Email service | ✅ Live | Transactional emails |
| **jose** | JWT handling | ✅ Live | Authentication |
| **zod** | Schema validation | ✅ Live | Input validation |

### Third-Party APIs

| API | Purpose | Status | Cost | Notes |
|-----|---------|--------|------|-------|
| **USDA FoodData Central** | Food database | 🚧 Pending | Free | 200+ requests/hour limit |
| **Nutritionix** | Food search | 🚧 Pending | $79/mo | Alternative to USDA |
| **RxNorm (NLM)** | Drug database | 🚧 Pending | Free | NIH API |
| **OpenAI GPT-4.1** | Dr. Ketone AI | 🚧 Pending | ~$0.03/1K tokens | Conversational AI |
| **UPC Database** | Barcode lookup | 🚧 Pending | Free tier | 100 requests/day |
| **Google Vision API** | Photo food recognition | 🚧 Pending | $1.50/1K images | Optional feature |
| **Stripe** | Payment processing | ✅ Live | 2.9% + $0.30 | Book purchases |
| **Resend** | Email delivery | ✅ Live | Free tier: 3K/mo | Transactional emails |

### Infrastructure

| Service | Purpose | Status | Cost | Notes |
|---------|---------|--------|------|-------|
| **PostgreSQL (TiDB)** | Primary database | ✅ Live | Included | Manus platform |
| **S3 Storage** | File storage | ✅ Live | Included | Manus platform |
| **Firebase** | Push notifications | 🚧 Pending | Free tier | FCM for mobile |
| **Sentry** | Error tracking | 🚧 Pending | Free tier | Optional monitoring |
| **Mixpanel** | Analytics | 🚧 Pending | Free tier | User behavior tracking |

---

## 📝 Next Steps

### Immediate Actions (Week 1-2)

1. **Initialize Flutter Project**
   - Create project in `packages/mobile/`
   - Set up folder structure (features, core, shared)
   - Configure state management (BLoC pattern)
   - Set up navigation (GoRouter)

2. **Extend Backend APIs**
   - Add mobile-specific endpoints
   - Create database migrations for new tables
   - Set up OpenAI API integration
   - Integrate USDA FoodData Central

3. **Design System**
   - Create Figma mockups for key screens
   - Define color palette, typography, spacing
   - Build component library (buttons, cards, inputs)

4. **Development Environment**
   - Set up CI/CD pipeline for Flutter
   - Configure testing framework (flutter_test)
   - Set up linting and formatting rules

### Phase 1: MVP Development (Month 1-3)

**Month 1: Onboarding & Core Tracking**
- Implement screens 1-15 (onboarding)
- Implement screens 16-19, 23-24, 27-28 (basic tracking)
- Implement screens 30-33, 37 (biomarkers, symptoms)
- Backend: User profile, medications, food logging APIs

**Month 2: Dr. Ketone & Progress**
- Implement screens 41-48, 53, 56, 59 (Dr. Ketone)
- Implement screens 76-77, 79, 81, 83-84, 88, 91 (progress)
- Backend: OpenAI integration, conversation storage, analytics

**Month 3: Settings & Polish**
- Implement screens 121-124, 126-128, 132, 134, 138 (settings)
- Implement authentication flow
- Beta testing with 100 users
- Bug fixes and performance optimization

### Phase 2: Gamification (Month 4-5)

- Implement gamification system (screens 88-89, achievements)
- Implement social features (screens 96-110)
- Implement advanced tracking (screens 20-22, 25-26)
- Backend: Gamification APIs, social features

### Phase 3: Medical Safety (Month 6-7)

- Implement physician clearance system (screen 7)
- Implement medication management (screens 129-131)
- Implement provider portal (web-based)
- Backend: Drug interaction database, escalation protocols

### Phase 4: HIPAA Compliance (Month 8-10)

- Implement EHR integration (HL7 FHIR)
- Implement secure messaging
- Implement audit logging
- Security audit and penetration testing
- HIPAA compliance certification

---

## 📧 Document Information

**Document Owner**: KetoWell Development Team  
**Last Updated**: November 25, 2025  
**Version**: 1.0  
**Status**: Living Document (will be updated as implementation progresses)

**Related Documents**:
- [App Information Architecture](./architecture/app_information_architecture.md)
- [Dr. Ketone Design Specification](./specifications/dr_ketone_design_spec.md)
- [Final Research Report](./research/final_report.md)
- [App Proposal Summary](./APP_PROPOSAL_SUMMARY.md)

**GitHub Repository**: https://github.com/kimhons/KetoWell

---

**End of Document**
