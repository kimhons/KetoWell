# KetoWell Mobile App

Evidence-Based Ketogenic Health Platform - Flutter Mobile Application

---

## 📱 Project Overview

KetoWell is a comprehensive ketogenic health application that combines medical-grade safety screening, AI-powered guidance (Dr. Ketone), and evidence-based protocols to help users safely adopt and maintain a ketogenic lifestyle.

**Key Features**:
- 🛡️ Medical safety screening with contraindication detection
- 🤖 Dr. Ketone AI assistant for personalized coaching
- 📊 Comprehensive tracking (food, macros, symptoms, biomarkers)
- 📈 Progress analytics with predictive insights
- 🎯 66-day habit formation system
- 🏆 Gamification with SDT-aligned rewards
- 👥 Community features and challenges

---

## 🏗️ Project Structure

```
lib/
├── core/
│   ├── theme/
│   │   ├── app_theme.dart          # Main theme configuration
│   │   ├── app_colors.dart         # Color palette
│   │   └── app_text_styles.dart    # Typography system
│   ├── constants/
│   │   └── app_constants.dart      # App-wide constants
│   ├── network/
│   │   ├── api_client.dart         # HTTP client setup
│   │   ├── api_endpoints.dart      # API endpoint definitions
│   │   └── interceptors/           # Request/response interceptors
│   └── utils/
│       ├── validators.dart         # Input validation utilities
│       ├── formatters.dart         # Data formatting utilities
│       └── extensions.dart         # Dart extensions
├── features/
│   ├── auth/
│   │   ├── data/                   # Data sources, repositories
│   │   ├── domain/                 # Entities, use cases
│   │   └── presentation/           # UI, BLoC, widgets
│   ├── onboarding/
│   │   └── ...                     # 15 screens
│   ├── tracking/
│   │   └── ...                     # 25 screens
│   ├── dr_ketone/
│   │   └── ...                     # 20 screens
│   ├── progress/
│   │   └── ...                     # 20 screens
│   ├── community/
│   │   └── ...                     # 15 screens (Phase 2)
│   └── settings/
│       └── ...                     # 18 screens
└── shared/
    ├── models/                     # Shared data models
    └── widgets/                    # Reusable UI components
        ├── buttons/
        ├── cards/
        ├── inputs/
        └── charts/
```

---

## 🎨 Design System

### Colors

**Primary Brand Colors**:
- Primary: `#059669` (Emerald green - keto-friendly)
- Secondary: `#8B5CF6` (Purple - Dr. Ketone AI)

**Macro Colors**:
- Carbs: `#F59E0B` (Amber)
- Protein: `#EC4899` (Pink)
- Fat: `#8B5CF6` (Purple)
- Calories: `#6366F1` (Indigo)

**Ketone Level Colors**:
- None: `#EF4444` (Red)
- Trace: `#F59E0B` (Amber)
- Light: `#FBBF24` (Yellow)
- Moderate: `#10B981` (Green)
- Deep: `#059669` (Dark green)

### Typography

**Font Family**: Inter

**Text Styles**:
- H1: 32px, Bold
- H2: 28px, Bold
- H3: 24px, SemiBold
- H4: 20px, SemiBold
- H5: 18px, SemiBold
- Body: 16px, Regular
- Caption: 12px, Regular
- Button: 16px, SemiBold

### Spacing

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

### Border Radius

- SM: 8px
- MD: 12px
- LG: 16px
- XL: 20px
- Full: 9999px

---

## 🚀 Getting Started

### Prerequisites

- Flutter SDK 3.24.5 or higher
- Dart SDK 3.5.4 or higher
- Android Studio / Xcode (for mobile development)
- VS Code with Flutter extension (recommended)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/kimhons/KetoWell.git
cd KetoWell/packages/mobile
```

2. **Install dependencies**:
```bash
flutter pub get
```

3. **Run code generation** (for API clients, JSON serialization):
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

4. **Run the app**:
```bash
# iOS
flutter run -d ios

# Android
flutter run -d android

# Web (for testing)
flutter run -d chrome
```

---

## 📦 Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `flutter_bloc` | ^8.1.6 | State management |
| `go_router` | ^14.6.2 | Navigation |
| `dio` | ^5.7.0 | HTTP client |
| `shared_preferences` | ^2.3.3 | Local storage |
| `sqflite` | ^2.4.1 | Local database |

### UI Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `fl_chart` | ^0.69.2 | Charts and graphs |
| `cached_network_image` | ^3.4.1 | Image caching |
| `shimmer` | ^3.0.0 | Loading skeletons |

### Feature Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `camera` | ^0.11.0+2 | Camera access |
| `image_picker` | ^1.1.2 | Photo selection |
| `barcode_scan2` | ^4.3.3 | Barcode scanning |
| `speech_to_text` | ^7.0.0 | Voice input |
| `health` | ^11.1.0 | Health data access |
| `firebase_messaging` | ^15.1.5 | Push notifications |

---

## 🧪 Testing

### Run Unit Tests
```bash
flutter test
```

### Run Integration Tests
```bash
flutter test integration_test
```

### Run Tests with Coverage
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

---

## 🏗️ Architecture

### Clean Architecture + BLoC Pattern

The app follows **Clean Architecture** principles with **BLoC** for state management:

```
Presentation Layer (UI + BLoC)
    ↓
Domain Layer (Use Cases + Entities)
    ↓
Data Layer (Repositories + Data Sources)
```

**Benefits**:
- Separation of concerns
- Testability
- Scalability
- Maintainability

### Feature-First Structure

Each feature is self-contained with its own:
- **Data**: API clients, repositories, models
- **Domain**: Entities, use cases, business logic
- **Presentation**: Screens, widgets, BLoC

---

## 📱 Screens Roadmap

### Phase 1: MVP (Months 1-3)

**Onboarding & Safety** (15 screens):
- ✅ Splash screen
- ✅ Welcome screen
- 🚧 Medical screening (contraindications, medications)
- 🚧 Goal setting
- 🚧 Baseline measurements

**Core Tracking** (25 screens):
- 🚧 Dashboard
- 🚧 Food logging (manual, search, barcode, voice)
- 🚧 Macro tracking
- 🚧 Symptom logging
- 🚧 Biomarker tracking (weight, ketones, glucose)

**Dr. Ketone AI** (20 screens):
- 🚧 Chat interface
- 🚧 Daily check-ins
- 🚧 Meal analysis
- 🚧 Symptom assessment
- 🚧 Predictive insights

**Progress & Analytics** (20 screens):
- 🚧 Progress dashboard
- 🚧 Weight trends
- 🚧 Ketone history
- 🚧 Macro adherence
- 🚧 Habit streak

**Settings** (18 screens):
- 🚧 Account settings
- 🚧 Notification preferences
- 🚧 Macro goals
- 🚧 Subscription management

### Phase 2: Gamification (Months 4-5)

- 🚧 Achievements and badges
- 🚧 Challenges and competitions
- 🚧 Leaderboards
- 🚧 Community forums
- 🚧 Accountability partners

### Phase 3: Medical Safety (Months 6-7)

- 🚧 Drug interaction database
- 🚧 Medication adherence tracking
- 🚧 Provider portal integration
- 🚧 Escalation protocols

### Phase 4: HIPAA Compliance (Months 8-10)

- 🚧 EHR integration (HL7 FHIR)
- 🚧 Secure messaging
- 🚧 Audit logging
- 🚧 Compliance certification

---

## 🔗 API Integration

### Backend API

**Base URL**: `https://ketowell.manus.space/api`

**Authentication**: JWT tokens (access + refresh)

**Key Endpoints**:
- `/auth/login` - User authentication
- `/profile` - User profile management
- `/food/log` - Food logging
- `/biomarkers/log` - Biomarker tracking
- `/dr-ketone/chat` - AI chat interface
- `/progress/dashboard` - Progress analytics

### Third-Party APIs

| API | Purpose | Status |
|-----|---------|--------|
| USDA FoodData Central | Food database | 🚧 Pending |
| RxNorm (NLM) | Drug database | 🚧 Pending |
| OpenAI GPT-4.1 | Dr. Ketone AI | 🚧 Pending |
| Firebase FCM | Push notifications | 🚧 Pending |
| Stripe | Subscription management | ✅ Live |

---

## 🎯 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/onboarding-screens
```

### 2. Implement Feature
- Create data models
- Implement repository
- Create use cases
- Build BLoC
- Design UI screens
- Write tests

### 3. Run Tests
```bash
flutter test
```

### 4. Format Code
```bash
flutter format lib/
```

### 5. Analyze Code
```bash
flutter analyze
```

### 6. Create Pull Request
- Push to GitHub
- Create PR with description
- Request code review
- Merge after approval

---

## 📚 Resources

### Documentation

- [Complete App Design Schema](../../docs/mobile-app/COMPLETE_APP_DESIGN_SCHEMA.md)
- [App Proposal Summary](../../docs/mobile-app/APP_PROPOSAL_SUMMARY.md)
- [Information Architecture](../../docs/mobile-app/architecture/app_information_architecture.md)
- [Dr. Ketone Design Spec](../../docs/mobile-app/specifications/dr_ketone_design_spec.md)
- [Research Foundations](../../docs/mobile-app/research/)

### Flutter Resources

- [Flutter Documentation](https://docs.flutter.dev/)
- [Flutter BLoC Documentation](https://bloclibrary.dev/)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Material Design Guidelines](https://m3.material.io/)

---

## 👥 Team

**Project Owner**: KetoWell Development Team  
**Repository**: https://github.com/kimhons/KetoWell  
**Support**: support@ketowell.com

---

## 📄 License

Copyright © 2025 KetoWell. All rights reserved.

---

**Last Updated**: November 25, 2025  
**Version**: 1.0.0  
**Status**: Initial Setup Complete
