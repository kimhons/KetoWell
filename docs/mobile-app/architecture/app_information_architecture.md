# Ketogenic Health App: Information Architecture
## 120+ Screen MVP - Complete Structure & User Flows

**Version**: 1.0  
**Date**: November 24, 2025  
**Total Screens**: 138 (exceeds 120 minimum requirement)

---

## Table of Contents

1. [App Structure Overview](#1-app-structure-overview)
2. [Navigation Architecture](#2-navigation-architecture)
3. [Detailed Screen Inventory](#3-detailed-screen-inventory)
4. [User Flows](#4-user-flows)
5. [Screen Specifications](#5-screen-specifications)

---

## 1. App Structure Overview

### 1.1 High-Level Architecture

```
App Launch
    │
    ├── First-Time User → Onboarding Flow (15 screens)
    │                          │
    │                          └→ Main App
    │
    └── Returning User → Main App
                            │
                            ├── Home/Dashboard (Tab 1)
                            ├── Tracking (Tab 2)
                            ├── Dr. Ketone (Tab 3)
                            ├── Progress (Tab 4)
                            └── Profile (Tab 5)
```

### 1.2 Screen Distribution by Category

| Category | Screen Count | Purpose |
|----------|--------------|---------|
| **Onboarding & Safety** | 15 | Medical screening, goal setting, education |
| **Core Tracking** | 25 | Food logging, macro tracking, symptom monitoring |
| **Dr. Ketone AI** | 20 | Conversational AI, coaching, insights |
| **Education & Evidence** | 15 | Research showcase, safety protocols, learning |
| **Progress & Analytics** | 20 | Visualizations, trends, predictions |
| **Social & Community** | 15 | Forums, challenges, accountability |
| **Advanced Features** | 10 | Meal planning, recipes, integrations |
| **Settings & Admin** | 18 | Account, preferences, support |
| **TOTAL** | **138** | |

---

## 2. Navigation Architecture

### 2.1 Primary Navigation (Bottom Tab Bar)

```
┌─────────────────────────────────────────────────────────────┐
│  [Home]   [Track]   [Dr.K]   [Progress]   [Profile]        │
└─────────────────────────────────────────────────────────────┘
```

**Tab 1: Home** - Dashboard with daily overview, quick actions, Dr. Ketone insights  
**Tab 2: Track** - Food logging, symptom tracking, measurements  
**Tab 3: Dr. Ketone** - AI assistant chat interface, proactive check-ins  
**Tab 4: Progress** - Charts, trends, analytics, predictions  
**Tab 5: Profile** - Settings, community, education, support  

### 2.2 Secondary Navigation Patterns

**Top App Bar**: Context-specific actions (filter, search, settings)  
**Floating Action Button (FAB)**: Quick logging (food, symptom, weight)  
**Bottom Sheets**: Contextual actions, Dr. Ketone quick interactions  
**Drawer (Optional)**: Advanced settings, admin functions  
**Modal Overlays**: Critical safety warnings, onboarding steps  

---

## 3. Detailed Screen Inventory

### Category 1: Onboarding & Safety (15 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 1 | Splash Screen | App loading, branding | Logo animation, version check |
| 2 | Welcome | Value proposition, CTA | Hero image, "Get Started" button |
| 3 | Medical Screening Intro | Set expectations for safety | Explanation of why screening is required |
| 4 | Absolute Contraindications | SGLT2i, lactation, genetic disorders | Yes/No questions, auto-exclude logic |
| 5 | Medication Inventory | List all current medications | Search interface, drug database |
| 6 | Drug Interaction Analysis | Results of medication screening | Risk level, required actions |
| 7 | Physician Clearance Upload | For high-risk users | Camera, file upload, form |
| 8 | Medical Condition Assessment | T1D, CKD, CVD, etc. | Multi-select checklist |
| 9 | Goal Setting | Therapeutic vs. wellness | Weight loss, disease management, performance |
| 10 | Identity Formation Exercise | "Who are you becoming?" | Reflective questions, identity statement |
| 11 | Baseline Measurements | Weight, body composition, photos | Input fields, camera integration |
| 12 | Electrolyte Protocol Education | Sodium, potassium, magnesium | Infographic, daily targets |
| 13 | Keto Flu Expectations | Symptoms, timeline, management | Timeline visualization, symptom checklist |
| 14 | Personalized Safety Protocol | Summary of user's specific plan | PDF generation, save/share |
| 15 | Consent & Disclaimer | Legal protection, user agreement | Scrollable text, checkbox, signature |

### Category 2: Core Tracking (25 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 16 | Dashboard Home | Daily overview, quick stats | Macro ring chart, ketone status, Dr. Ketone widget |
| 17 | Daily Macro Tracker | Real-time macro progress | Fat/Protein/Carb bars, net carbs, calories |
| 18 | Meal Logging - Manual Entry | Type in food details | Food name, serving size, macros |
| 19 | Meal Logging - Search | Find food in database | Search bar, recent foods, favorites |
| 20 | Meal Logging - Barcode Scanner | Scan packaged foods | Camera view, barcode detection, auto-populate |
| 21 | Meal Logging - Voice Input | "I had a burger without the bun" | Microphone, speech-to-text, Dr. Ketone parsing |
| 22 | Meal Logging - Photo Recognition | Take photo of meal | Camera, AI analysis, confirmation screen |
| 23 | Food Detail View | Nutritional breakdown | Macros, micronutrients, net carb calculation |
| 24 | Recent Foods & Favorites | Quick access to common foods | List view, star to favorite |
| 25 | Meal Templates | Save common meal combinations | Template library, create new |
| 26 | Recipe Database | Keto-friendly recipes | Search, filter by macros, save favorites |
| 27 | Net Carbs Calculator | Manual calculation tool | Fiber, sugar alcohols, result |
| 28 | Ketone Level Tracker | Blood, breath, urine | Input method, value, timestamp |
| 29 | Blood Glucose Tracker | For diabetic users | Value, timestamp, context (fasting, post-meal) |
| 30 | Weight & Body Composition | Daily/weekly weigh-ins | Weight, body fat %, lean mass, photos |
| 31 | Electrolyte Intake Tracker | Sodium, potassium, magnesium | Daily targets, food sources, supplements |
| 32 | Hydration Tracker | Water intake | Quick add buttons (8oz, 16oz), daily goal |
| 33 | Symptom Logger | Keto flu, energy, mood | Symptom checklist, severity scale, notes |
| 34 | Medication Adherence | Track daily medications | Medication list, check-off, reminders |
| 35 | Sleep Quality Tracker | Hours, quality rating | Input fields, Health Connect sync |
| 36 | Exercise/Activity Logger | Type, duration, intensity | Activity list, manual entry, sync |
| 37 | Daily Summary | End-of-day review | All tracked data, Dr. Ketone insights |
| 38 | Weekly Progress Review | Week-over-week comparison | Charts, highlights, areas for improvement |
| 39 | Monthly Trend Analysis | Long-term patterns | Multi-week charts, milestones |
| 40 | Data Export | CSV, PDF, share with provider | Export options, date range selection |

### Category 3: Dr. Ketone AI Assistant (20 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 41 | Dr. Ketone Chat Home | Main conversational interface | Message history, input field, voice button |
| 42 | Dr. Ketone Onboarding | Introduce the AI assistant | Avatar reveal, capabilities explanation |
| 43 | Ask Dr. Ketone | Q&A mode | Suggested questions, free-form input |
| 44 | Daily Check-In | Proactive morning greeting | "How are you feeling?", quick responses |
| 45 | Symptom Assessment Dialogue | Guided symptom evaluation | Branching questions, severity assessment |
| 46 | Meal Analysis & Feedback | Real-time meal evaluation | Macro breakdown, suggestions, alternatives |
| 47 | Personalized Recommendations | Daily tips based on patterns | Actionable advice, reasoning explanation |
| 48 | Electrolyte Optimization | Specific sodium/potassium/magnesium guidance | Current intake, target, food suggestions |
| 49 | Plateau Breakthrough Strategies | When weight loss stalls | Analysis of possible causes, 3-5 strategies |
| 50 | Medication Adjustment Guidance | Timing for MD consultation | Glucose trends, medication type, talking points |
| 51 | Motivational Coaching Session | Adherence challenges | Motivational interviewing, identity reinforcement |
| 52 | Identity-Building Exercises | "Who are you becoming?" | Reflective prompts, progress on identity goals |
| 53 | Habit Formation Progress | 66-day tracker with insights | Days completed, automaticity score, encouragement |
| 54 | Behavioral Pattern Analysis | Dr. Ketone's observations | "I noticed you...", pattern explanation |
| 55 | Predictive Insights Dashboard | What to expect next | Ketosis prediction, weight trajectory, risks |
| 56 | Dr. Ketone Settings | Customize AI behavior | Check-in frequency, notification preferences, voice |
| 57 | Conversation History | Searchable archive | Date filter, topic categories, bookmarks |
| 58 | Saved Insights & Tips | Bookmarked Dr. Ketone wisdom | User-saved responses, organized by topic |
| 59 | Emergency Support Protocols | When Dr. Ketone escalates | "Call your doctor," "Go to ER," resources |
| 60 | Dr. Ketone Feedback | Rate responses, report issues | Thumbs up/down, detailed feedback form |

### Category 4: Education & Evidence (15 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 61 | Evidence Library Home | Hub for all educational content | Topic categories, search, featured articles |
| 62 | Clinical Evidence - Metabolic | Diabetes, weight loss, insulin sensitivity | Research summaries, citations, key findings |
| 63 | Clinical Evidence - Cardiovascular | LDL paradox, triglycerides, blood pressure | Balanced presentation, KETO-CTA study |
| 64 | Clinical Evidence - Neurological | Epilepsy, Alzheimer's, Parkinson's, MS | Condition-specific evidence, mechanisms |
| 65 | Clinical Evidence - Cancer | Glioblastoma, cachexia risks | Conservative presentation, caveats |
| 66 | Clinical Evidence - Psychiatric | Schizophrenia, bipolar, depression | Emerging evidence, medical supervision required |
| 67 | Behavior Science - Habit Formation | 66-day timeline, context stability | Lally research, practical application |
| 68 | Behavior Science - Motivation | SDT, identity-based motivation, self-efficacy | Psychological frameworks, app integration |
| 69 | Safety Protocols - Contraindications | Absolute vs. cautions | SGLT2i, lactation, genetic disorders |
| 70 | Safety Protocols - Drug Interactions | Medication-specific guidance | Insulin, sulfonylureas, lithium, warfarin |
| 71 | Safety Protocols - Electrolyte Management | Detailed protocols | Daily targets, food sources, supplements |
| 72 | Keto Flu Management Guide | Comprehensive symptom management | Symptom-by-symptom solutions, timeline |
| 73 | Adaptation Timeline Explained | What to expect week-by-week | 3-5 days ketosis, 3-6 weeks full adaptation |
| 74 | LDL Paradox - Balanced Presentation | Nuanced cardiovascular discussion | Both perspectives, individual monitoring |
| 75 | Research References | Full citation list | Linked to PubMed, downloadable PDFs |

### Category 5: Progress & Analytics (20 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 76 | Progress Dashboard | Overview of all metrics | Multi-chart view, time range selector |
| 77 | Weight Loss Trajectory | Historical and predicted | Line chart with confidence intervals |
| 78 | Body Composition Changes | Fat vs. lean mass over time | Stacked area chart, percentage changes |
| 79 | Ketone Level Trends | BHB over time | Line chart, ketosis threshold indicator |
| 80 | Blood Glucose Patterns | For diabetic users | Line chart, fasting vs. post-meal |
| 81 | Macro Adherence Heatmap | Daily macro compliance | Calendar heatmap, color-coded |
| 82 | Electrolyte Balance Visualization | Sodium, potassium, magnesium trends | Multi-line chart, target zones |
| 83 | Symptom Timeline | Keto flu progression | Timeline with symptom markers |
| 84 | Energy Level Trends | Self-reported energy over time | Line chart, correlation with ketones |
| 85 | Sleep Quality Patterns | Hours and quality rating | Bar chart, weekly averages |
| 86 | Exercise Impact Analysis | Activity vs. weight loss | Scatter plot, correlation analysis |
| 87 | Medication Changes Timeline | Dose adjustments over time | Timeline with annotations |
| 88 | Habit Formation Progress | 66-day tracker visualization | Progress arc, daily completion markers |
| 89 | Streak Visualization | Logging streaks with forgiveness | Flame icon, streak count, freeze indicators |
| 90 | Goal Achievement Milestones | Weight, ketosis, habit goals | Trophy icons, completion dates |
| 91 | Before/After Photo Gallery | Progress photos | Side-by-side comparison, date stamps |
| 92 | Biomarker Tracking | Lipid panel, HbA1c, etc. | Table view, trend arrows, reference ranges |
| 93 | Cardiovascular Risk Assessment | Based on biomarkers | Risk score, recommendations |
| 94 | Predictive Models | AI-generated forecasts | Ketosis prediction, weight trajectory |
| 95 | Custom Chart Builder | User-defined visualizations | Axis selection, date range, export |

### Category 6: Social & Community (15 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 96 | Community Home | Hub for social features | Activity feed, trending topics, challenges |
| 97 | User Profile & Identity | Public profile page | Identity statement, progress stats, badges |
| 98 | Edit Profile | Update personal information | Photo, bio, privacy settings |
| 99 | Success Stories | Inspiring transformations | Before/after photos, testimonials, filters |
| 100 | Discussion Forums | Topic-based conversations | Categories, threads, search |
| 101 | Forum Thread View | Individual discussion | Original post, replies, upvote/downvote |
| 102 | Create Post | Start a new discussion | Title, body, category, attachments |
| 103 | Challenge Participation | Join group challenges | Active challenges, leaderboard, progress |
| 104 | Challenge Detail | Specific challenge info | Rules, participants, timeline, rewards |
| 105 | Accountability Partners | Find and connect with partners | Match algorithm, messaging, check-ins |
| 106 | Group Goals | Collaborative goal setting | Group members, shared target, progress |
| 107 | Recipe Sharing | User-submitted recipes | Upload photo, ingredients, macros, ratings |
| 108 | Meal Plan Exchange | Share meal plans | Weekly plan view, copy to own account |
| 109 | Support Groups | Condition-specific groups | Diabetes, epilepsy, weight loss, etc. |
| 110 | Community Guidelines | Rules and moderation | Code of conduct, reporting process |

### Category 7: Advanced Features (10 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 111 | Meal Planning Assistant | AI-powered meal planning | Weekly planner, macro targets, auto-generate |
| 112 | Grocery List Generator | From meal plan | Categorized list, check-off, share |
| 113 | Restaurant Guide | Keto-friendly restaurants | Location-based, menu analysis, modifications |
| 114 | Restaurant Menu Detail | Specific restaurant | Menu items, macro info, Dr. Ketone suggestions |
| 115 | Macro Calculator & Planner | Calculate daily targets | TDEE calculator, goal-based macros |
| 116 | Intermittent Fasting Integration | IF + keto | Fasting timer, eating window, history |
| 117 | Supplement Tracker | Track vitamins, minerals, MCT oil | Supplement list, dosage, reminders |
| 118 | Lab Results Upload | Import lab data | Photo/PDF upload, OCR, trend analysis |
| 119 | Provider Portal | For physician collaboration | Share data, request clearance, messaging |
| 120 | Telemedicine Integration | In-app consultations | Video call, appointment scheduling, notes |

### Category 8: Settings & Administration (18 screens)

| # | Screen Name | Purpose | Key Elements |
|---|-------------|---------|--------------|
| 121 | Profile Settings Home | Hub for all settings | Categorized list, search |
| 122 | Account Settings | Email, password, security | Edit fields, 2FA, delete account |
| 123 | Personal Information | Name, age, gender, location | Edit fields, privacy controls |
| 124 | Notification Preferences | Customize all notifications | Toggle switches, frequency, quiet hours |
| 125 | Privacy & Data Settings | Control data sharing | Toggles for analytics, research, community |
| 126 | Health Connect/HealthKit Permissions | Manage health data access | Permission list, enable/disable |
| 127 | Units & Preferences | Metric vs. imperial, date format | Dropdown selectors |
| 128 | Theme & Appearance | Light/dark mode, color scheme | Theme selector, preview |
| 129 | Subscription Management | View/change plan | Current plan, upgrade options, billing |
| 130 | Payment Settings | Credit card, billing address | Edit payment method, invoice history |
| 131 | Referral Program | Invite friends, earn rewards | Referral code, share buttons, rewards tracker |
| 132 | Help & Support | Access help resources | FAQ, contact support, live chat |
| 133 | FAQ | Common questions | Categorized, searchable |
| 134 | Contact Support | Submit a ticket | Form, attachment, priority |
| 135 | Report a Bug | Technical issue reporting | Description, screenshot, device info |
| 136 | Terms of Service | Legal agreement | Scrollable text, version history |
| 137 | Privacy Policy | Data handling practices | Scrollable text, version history |
| 138 | About & Credits | App info, team, acknowledgments | Version number, open source licenses |

---

## 4. User Flows

### 4.1 First-Time User Onboarding Flow

```
Splash Screen (1)
    ↓
Welcome (2)
    ↓
Medical Screening Intro (3)
    ↓
Absolute Contraindications (4)
    ├─→ [SGLT2i detected] → Physician Clearance Upload (7) → [Approved] → Continue
    ├─→ [Lactation detected] → Exit with education
    └─→ [Clear] → Continue
    ↓
Medication Inventory (5)
    ↓
Drug Interaction Analysis (6)
    ├─→ [High risk] → Physician Clearance Upload (7) → [Approved] → Continue
    └─→ [Low/Medium risk] → Continue
    ↓
Medical Condition Assessment (8)
    ↓
Goal Setting (9)
    ↓
Identity Formation Exercise (10)
    ↓
Baseline Measurements (11)
    ↓
Electrolyte Protocol Education (12)
    ↓
Keto Flu Expectations (13)
    ↓
Personalized Safety Protocol (14)
    ↓
Consent & Disclaimer (15)
    ↓
Dashboard Home (16) [Main App]
```

### 4.2 Daily Food Logging Flow

```
Dashboard Home (16)
    ↓
[Tap "Log Meal" FAB]
    ↓
Meal Logging Method Selection
    ├─→ Manual Entry (18) → Food Detail View (23) → Confirm → Dashboard
    ├─→ Search (19) → Food Detail View (23) → Confirm → Dashboard
    ├─→ Barcode Scanner (20) → Food Detail View (23) → Confirm → Dashboard
    ├─→ Voice Input (21) → Dr. Ketone Parsing → Food Detail View (23) → Confirm → Dashboard
    └─→ Photo Recognition (22) → AI Analysis → Food Detail View (23) → Confirm → Dashboard
```

### 4.3 Dr. Ketone Interaction Flow

```
Dashboard Home (16)
    ↓
[Dr. Ketone widget shows insight]
    ↓
[Tap widget]
    ↓
Dr. Ketone Chat Home (41)
    ├─→ Ask Question (43) → Response → Follow-up or Exit
    ├─→ Daily Check-In (44) → Symptom Assessment (45) → Recommendations (47) → Exit
    ├─→ Meal Analysis (46) → Feedback → Suggestions → Exit
    └─→ View History (57) → Select Past Conversation → Continue or Exit
```

### 4.4 Progress Review Flow

```
Progress Dashboard (76)
    ↓
[Select specific metric]
    ├─→ Weight Loss Trajectory (77) → Detailed View → Export/Share
    ├─→ Ketone Level Trends (79) → Detailed View → Dr. Ketone Insight
    ├─→ Macro Adherence Heatmap (81) → Tap Date → Daily Summary (37)
    └─→ Custom Chart Builder (95) → Configure → Save → Dashboard
```

### 4.5 Community Engagement Flow

```
Community Home (96)
    ↓
[Browse content]
    ├─→ Success Stories (99) → Story Detail → Comment/Like → Back
    ├─→ Discussion Forums (100) → Thread View (101) → Reply → Back
    ├─→ Challenges (103) → Challenge Detail (104) → Join → Track Progress
    └─→ Accountability Partners (105) → Match → Message → Check-In
```

---

## 5. Screen Specifications

### 5.1 Screen Template Structure

Each screen follows this structure:

```
┌─────────────────────────────────────────────────────────────┐
│  [Top App Bar]                                              │
│  Title                                    [Action Icons]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                    [Main Content Area]                      │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Bottom Navigation Bar] (if applicable)                    │
│  [Home]   [Track]   [Dr.K]   [Progress]   [Profile]       │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Key Screen Specifications

#### Dashboard Home (Screen 16)

**Purpose**: Daily overview and quick access to core features

**Layout**:
- **Top Section**: Greeting + Dr. Ketone widget with daily insight
- **Macro Ring Chart**: Circular progress for Fat/Protein/Carbs (center shows net carbs remaining)
- **Quick Stats Cards**: Ketone status, weight change, streak count
- **Quick Actions**: Log Meal, Log Symptom, Weigh In, Ask Dr. Ketone
- **Recent Activity**: Last 3 logged meals with thumbnails

**Interactions**:
- Tap macro ring → Daily Macro Tracker (17)
- Tap Dr. Ketone widget → Dr. Ketone Chat (41)
- Tap Quick Action → Respective logging screen
- Swipe down → Refresh data from Health Connect

#### Dr. Ketone Chat Home (Screen 41)

**Purpose**: Main conversational AI interface

**Layout**:
- **Top Section**: Dr. Ketone avatar (animated), status indicator ("Analyzing your data...")
- **Message History**: Scrollable chat bubbles (user on right, Dr. Ketone on left)
- **Input Area**: Text field, microphone button, send button
- **Suggested Prompts**: Quick-tap buttons for common queries

**Interactions**:
- Tap microphone → Voice input (speech-to-text)
- Tap suggested prompt → Auto-fill input field
- Long-press message → Copy, bookmark, share
- Swipe message left → Delete
- Tap Dr. Ketone avatar → Dr. Ketone Settings (56)

#### Weight Loss Trajectory (Screen 77)

**Purpose**: Visualize weight loss progress with predictions

**Layout**:
- **Chart**: Line chart with actual weight (solid line) and predicted range (shaded area)
- **Dr. Ketone Annotation**: Speech bubble pointing to key data points
- **Stats Cards**: Starting weight, current weight, change, goal remaining
- **Time Range Selector**: 1W, 1M, 3M, 6M, 1Y, All
- **Insights Panel**: Dr. Ketone's analysis of trends, plateau detection

**Interactions**:
- Tap data point → See exact date and weight
- Tap Dr. Ketone annotation → Expand for full explanation
- Tap time range → Update chart
- Tap "Export" → Share as image or CSV

#### Meal Logging - Voice Input (Screen 21)

**Purpose**: Natural language food logging via Dr. Ketone

**Layout**:
- **Top Section**: Dr. Ketone avatar (listening animation)
- **Transcription Area**: Real-time speech-to-text display
- **Parsed Results**: Dr. Ketone's interpretation (food items, quantities, macros)
- **Confirmation**: "Is this correct?" with edit option
- **Action Buttons**: Confirm, Edit, Cancel

**Interactions**:
- Tap microphone → Start recording
- Speak naturally → "I had a burger without the bun with cheese and avocado"
- Dr. Ketone parses → Shows interpreted meal
- Tap "Confirm" → Log meal to diary
- Tap "Edit" → Manual adjustment screen

---

## 6. Information Architecture Principles

### 6.1 Hierarchy & Prioritization

**Tier 1 (Always Accessible)**:
- Dashboard Home
- Food Logging
- Dr. Ketone Chat
- Safety Protocols

**Tier 2 (1-2 Taps Away)**:
- Progress Charts
- Symptom Tracking
- Education Library
- Community

**Tier 3 (3+ Taps Away)**:
- Advanced Settings
- Historical Data
- Administrative Functions

### 6.2 Consistency Patterns

**Navigation**:
- Bottom tab bar always visible on main screens
- Back button always top-left
- Action buttons always top-right
- FAB for primary action (context-dependent)

**Data Entry**:
- Voice input always available via microphone icon
- Barcode scanner always available via camera icon
- Recent/favorites always at top of lists
- Auto-save on all forms (no "Save" button required)

**Feedback**:
- Success: Green checkmark + haptic feedback
- Error: Red alert + explanation + suggested action
- Warning: Amber caution + context
- Info: Blue info icon + tooltip

### 6.3 Accessibility Considerations

**Visual**:
- Minimum touch target: 44x44 pts (iOS), 48x48 dp (Android)
- Color contrast ratio: 4.5:1 for text, 3:1 for UI elements
- Font size: Minimum 16sp for body text, scalable with system settings
- Color-blind friendly: Use patterns/icons in addition to color

**Auditory**:
- All audio content has text alternative
- Dr. Ketone voice output is optional
- Visual feedback for all audio cues

**Motor**:
- Voice input available for all text entry
- Large touch targets for primary actions
- Swipe gestures have button alternatives
- No time-limited interactions

**Cognitive**:
- Clear, simple language (8th-grade reading level)
- Progressive disclosure (don't overwhelm with options)
- Consistent patterns across screens
- Dr. Ketone explains complex concepts in plain language

---

## 7. Technical Considerations

### 7.1 State Management

**Riverpod 3.0** for all state management:
- **User Profile State**: Medical conditions, medications, goals
- **Tracking State**: Food logs, symptoms, measurements
- **Dr. Ketone State**: Conversation history, insights, notifications
- **Progress State**: Charts, trends, predictions
- **Community State**: Posts, comments, challenges

### 7.2 Data Persistence

**Drift (SQLite)** for local storage:
- Offline-first architecture
- All data stored locally first
- Sync to cloud when connected
- Conflict resolution for multi-device sync

**Health Connect/HealthKit** for health data:
- Weight, body composition
- Blood glucose, ketones (if available)
- Exercise, sleep
- Read/write permissions

### 7.3 Performance Optimization

**Lazy Loading**:
- Infinite scroll for lists (community, history)
- Pagination for large datasets
- Image lazy loading with placeholders

**Caching**:
- Food database cached locally
- Dr. Ketone responses cached for common queries
- Charts rendered once, cached until data changes

**Background Sync**:
- WorkManager (Android) / BGAppRefreshTask (iOS)
- Sync data every 15 minutes when app is backgrounded
- Push notifications for Dr. Ketone check-ins

---

## 8. Next Steps

This information architecture provides the foundation for:

1. **UI/UX Design**: Detailed wireframes and high-fidelity mockups for all 138 screens
2. **User Testing**: Validate flows with target users
3. **Development**: Implement screens in priority order (P0 → P1 → P2 → P3)
4. **Iteration**: Refine based on user feedback and analytics

**Recommended Development Sequence**:

**Sprint 1-2**: Onboarding & Safety (Screens 1-15)  
**Sprint 3-4**: Core Tracking (Screens 16-40)  
**Sprint 5-6**: Dr. Ketone AI (Screens 41-60)  
**Sprint 7-8**: Progress & Analytics (Screens 76-95)  
**Sprint 9-10**: Education & Community (Screens 61-75, 96-110)  
**Sprint 11-12**: Advanced Features & Settings (Screens 111-138)

---

## Conclusion

This comprehensive information architecture defines **138 screens** (exceeding the 120+ requirement) organized into a coherent, user-friendly structure. The architecture prioritizes **safety, evidence-based guidance, and AI-native intelligence** while maintaining a minimalistic, intuitive user experience.

Every screen serves a clear purpose in the user's ketogenic health journey, from initial onboarding through long-term maintenance and community engagement. The integration of **Dr. Ketone as an autonomous agent** throughout the app creates a cohesive, intelligent experience that adapts to each user's unique needs and patterns.

This foundation is ready for the next phase: detailed UI/UX design with wireframes and high-fidelity mockups.
