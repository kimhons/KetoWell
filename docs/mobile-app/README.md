# KetoWell Mobile App Design Documentation

Comprehensive design documentation for the KetoWell Flutter mobile application, including information architecture, AI assistant specifications, and evidence-based research foundations.

---

## 📁 Directory Structure

```
docs/mobile-app/
├── README.md                               # This file
├── architecture/                           # App structure and screen specifications
│   └── app_information_architecture.md    # 138 screens with complete user flows
├── specifications/                         # Feature and component specifications
│   └── dr_ketone_design_spec.md           # AI assistant design and capabilities
└── research/                               # Evidence-based research foundations
    ├── final_report.md                    # Comprehensive research across 5 domains
    ├── cross_domain_synthesis.md          # Integration of research findings
    ├── integrated_research_synthesis.md   # Unified framework
    ├── research_framework.md              # Research methodology
    └── domain1-5_*.md                     # Domain-specific research files
```

---

## 🏗️ App Information Architecture

The **app_information_architecture.md** document contains detailed specifications for **138 screens** organized into 8 categories. This represents a complete MVP that exceeds the 120-screen minimum requirement.

### Screen Distribution

| Category | Screens | Purpose |
|----------|---------|---------|
| **Onboarding & Safety** | 15 | Medical screening, contraindication detection, goal setting |
| **Core Tracking** | 25 | Food logging, macro tracking, symptom monitoring |
| **Dr. Ketone AI** | 20 | Conversational AI assistant, coaching, insights |
| **Education & Evidence** | 15 | Research showcase, safety protocols, learning modules |
| **Progress & Analytics** | 20 | Visualizations, trends, predictive analytics |
| **Social & Community** | 15 | Forums, challenges, accountability partners |
| **Advanced Features** | 10 | Meal planning, recipes, device integrations |
| **Settings & Admin** | 18 | Account management, preferences, support |

### Navigation Architecture

The app uses a **5-tab bottom navigation** pattern:

1. **Home** - Dashboard with daily overview, quick actions, Dr. Ketone insights
2. **Track** - Food logging, symptom tracking, measurements
3. **Dr. Ketone** - AI assistant chat interface, proactive check-ins
4. **Progress** - Charts, trends, analytics, predictions
5. **Profile** - Settings, community, education, support

---

## 🤖 Dr. Ketone AI Assistant

The **dr_ketone_design_spec.md** document defines the personality, capabilities, and implementation details for Dr. Ketone, an autonomous AI health agent.

### Core Identity

Dr. Ketone is **proactive, predictive, and deeply integrated** into every aspect of the user's ketogenic health journey. Unlike traditional chatbots, Dr. Ketone takes initiative to check in, analyze patterns, and offer insights without being asked.

### Agentic Capabilities

1. **Adaptive Onboarding & Risk Stratification**
   - Dynamic questioning that adapts based on user responses
   - Real-time risk calculation for contraindications (SGLT2 inhibitors, lactation, genetic disorders)
   - Personalized safety protocol generation

2. **Intelligent Meal Analysis**
   - Real-time macro calculation with net carb adjustments
   - Restaurant menu database with keto modifications
   - Predictive meal planning based on remaining daily targets

3. **Predictive Health Insights**
   - Ketosis prediction with confidence intervals
   - Electrolyte deficiency early warning system
   - Weight loss plateau analysis
   - Medication adjustment timing guidance

4. **Conversational Health Coaching**
   - Voice-first food logging ("I had a burger without the bun")
   - Symptom assessment with guided evaluation
   - Motivational interviewing for adherence challenges

5. **Autonomous Monitoring & Intervention**
   - Proactive check-ins during critical windows (weeks 1-4)
   - Pattern recognition for concerning trends
   - Escalation protocols for medical emergencies

### Personality Traits

- **Authoritative but humble**: Medical expertise with appropriate disclaimers
- **Encouraging but realistic**: Celebrates progress while setting accurate expectations
- **Curious & analytical**: Treats each user as a unique case study
- **Proactive & vigilant**: Anticipates needs and identifies concerning patterns
- **Conversational & accessible**: Explains complex science in plain language

---

## 📚 Research Foundations

The **research/** directory contains comprehensive evidence-based research across **5 critical domains** that inform every aspect of the app's design and functionality.

### Domain 1: Clinical Evidence

**Cancer Therapy**
- Meta-analysis showing improved outcomes in multiple cancer types
- Glioblastoma survival: 29.4 months vs 15-20 months historical control
- Optimal macros: 80-85% fat, 16-18% protein, 2-4% carbs for >12 weeks

**Cardiovascular Health**
- Triglycerides: -15.11 mg/dL
- HDL cholesterol: +2.92 mg/dL
- Blood pressure: Systolic -2.05 mmHg, Diastolic -1.26 mmHg
- LDL paradox: +4.81 mg/dL (requires monitoring)

**Type 2 Diabetes**
- HbA1c reduction in 16/21 meta-analyses
- Strong short-term glycemic control
- Insulin sensitivity improvements (transient)

**Neurological Conditions**
- Epilepsy: >50% seizure reduction in 62% of patients
- Alzheimer's: Enhanced cognitive function via alternative brain fuel
- Parkinson's: Improved motor and non-motor symptoms
- Multiple Sclerosis: ~50% reduction in fatigue, improved quality of life

### Domain 2: Psychology & Behavior Change

**Habit Formation**
- 59-154 days for automaticity (Lally et al.)
- Median 66 days for habit formation
- Context stability is critical for automaticity

**Dopamine Motivation (MAGNet Theory)**
- Distance-sensitive rewards: Closer goals = higher dopamine
- Frequent rewards in early weeks, gradual spacing
- Intrinsic motivation through autonomy and competence

**Identity-Based Motivation**
- β = 0.41-0.43 effect size
- "Who are you becoming?" exercises
- Identity reinforcement throughout journey

**Self-Determination Theory (SDT)**
- Autonomy: User choice and control
- Competence: Progress visualization and mastery
- Relatedness: Community and social features

### Domain 3: Gamification Science

**SDT-Aligned Gamification**
- Effect size: d = 0.39 (significantly higher than generic approaches)
- Adaptive difficulty based on user progress
- Intrinsic motivation over extrinsic rewards

**Distance-Sensitive Rewards**
- Closer goals trigger higher dopamine release
- Frequent rewards in weeks 1-4 (highest dropout risk)
- Gradual spacing as habits form

**Social Comparison**
- Leaderboards with upward/downward comparison
- Challenges and accountability partners
- Community forums for support

**Progress Visualization**
- Streak tracking with visual cues
- Milestone celebrations
- Trend analysis and predictions

### Domain 4: Medical Safety

**Absolute Contraindications**
- **SGLT2 Inhibitors**: Risk of euglycemic diabetic ketoacidosis (DKA)
- **Lactation**: Risk of lactation ketoacidosis (ICU case reports 2024-2025)
- **Genetic Disorders**: Porphyria, fatty acid oxidation defects

**Drug Interactions**
- **Insulin**: Hypoglycemia risk, requires dose adjustment
- **Sulfonylureas**: Hypoglycemia risk, physician monitoring required
- **Lithium**: Requires weekly monitoring
- **Warfarin**: INR monitoring required

**Electrolyte Management**
- **Sodium**: 3,000-5,000mg/day (prevents keto flu)
- **Potassium**: 3,000-4,700mg/day
- **Magnesium**: 300-500mg/day

**Keto Flu Timeline**
- **Days 1-3**: Onset of symptoms (headache, fatigue, irritability)
- **Days 3-5**: Ketosis entry
- **Weeks 3-6**: Full adaptation

### Domain 5: Technical Implementation

**Phased Development Strategy**
1. **Phase 1: MVP (Non-HIPAA)** - Core tracking, basic AI, safety screening
2. **Phase 2: Gamification** - SDT-aligned rewards, community features
3. **Phase 3: Medical Safety** - Physician clearance, drug interaction database
4. **Phase 4: HIPAA Compliance** - EHR integration, provider portal

**AI/ML Integration**
- **Conversational AI**: OpenAI GPT-4.1 or Gemini 2.5 Flash
- **Predictive Models**: Time-series analysis, Bayesian inference
- **Anomaly Detection**: Concerning patterns, safety escalation

**Data Architecture**
- Time-series database for tracking data
- Graph database for user relationships
- Vector database for AI embeddings

**Regulatory Compliance**
- FDA wellness app classification (non-medical device)
- HIPAA considerations for Phase 4
- Data privacy and security (GDPR, CCPA)

---

## 🎯 Key Design Principles

### 1. Safety-First Approach
Every feature prioritizes user safety through mandatory contraindication screening, proactive side effect management, and medical provider integration for high-risk users.

### 2. Habit-First Design
The app provides maximum support during weeks 1-4 (highest dropout risk) with a 66-day habit formation system, identity reinforcement exercises, and context-stable cues for automaticity.

### 3. Evidence-Based Guidance
Every recommendation is grounded in peer-reviewed research with transparent reasoning, citation links, and acknowledgment of uncertainty and individual variability.

### 4. Dopamine-Aware Gamification
The reward system uses distance-sensitive rewards (closer goals = higher dopamine), frequent rewards in early weeks with gradual spacing, and intrinsic motivation through autonomy and competence.

### 5. Personalized Intelligence
Dr. Ketone learns from user patterns to provide predictive insights with confidence intervals, individualized meal plans and recommendations, and behavioral pattern analysis with coaching.

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (Non-HIPAA)
- Core tracking (food, macros, weight, symptoms)
- Basic Dr. Ketone chat interface
- Safety screening and contraindication detection
- Habit formation system (66-day tracker)

### Phase 2: Gamification
- SDT-aligned reward system
- Streak tracking and milestone celebrations
- Community features (forums, challenges)
- Leaderboards with social comparison

### Phase 3: Medical Safety
- Physician clearance upload system
- Drug interaction database
- Medication adherence tracking
- Escalation protocols for concerning patterns

### Phase 4: HIPAA Compliance
- EHR integration (HL7 FHIR)
- Secure data storage and encryption
- Provider portal for medical oversight
- Audit logging and compliance reporting

---

## 📊 Success Metrics

### Primary Outcomes
- **Adherence Rate**: % of users maintaining ketosis >12 weeks
- **Habit Formation**: % of users completing 66-day program
- **Safety Events**: Zero serious adverse events related to app guidance

### Secondary Outcomes
- **Engagement**: Daily active users, session duration, feature usage
- **Clinical Outcomes**: Weight loss, HbA1c reduction, symptom improvement
- **User Satisfaction**: NPS score, app store ratings, retention rate

### Behavioral Metrics
- **Logging Frequency**: Food logs per day, symptom tracking consistency
- **Dr. Ketone Interactions**: Chat sessions per week, question types
- **Gamification Engagement**: Streaks maintained, challenges completed

---

## 🔗 Related Resources

- **KetoWell Website**: [GitHub Repository](https://github.com/kimhons/KetoWell)
- **Book Content**: 56,620-word evidence-based guide (303 pages)
- **Web Platform**: Marketing site, book sales, referral system

---

**Last Updated**: November 25, 2025  
**Version**: 1.0  
**Status**: Design Complete, Ready for Flutter Implementation
