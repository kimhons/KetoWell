# KetoWell Mobile App - Development Guide

**Developer**: Adrian (Florida expat)  
**Approach**: Test-Driven Development (TDD) with systematic, iterative implementation  
**Philosophy**: Quality over speed - every feature must work flawlessly before moving on

---

## 🎯 Development Principles

### 1. Test-Driven Development (TDD)
- Write tests first
- Implement code to make tests pass
- Refactor while keeping tests green
- **Never adjust tests to make them pass - fix the code instead**

### 2. Iterative & Incremental
- Build small, working pieces
- Integrate continuously
- Test after each piece
- Move forward only when everything works

### 3. Beautiful & Functional
- Pixel-perfect UI
- Smooth animations
- Intuitive UX
- Accessible design

### 4. Production-Ready Code
- Proper error handling
- Loading states
- Empty states
- Offline support
- Performance optimized

---

## 🏗️ Current Implementation Status

### ✅ Phase 1: Core Infrastructure (IN PROGRESS)

**Completed**:
- [x] Project structure
- [x] Design system (colors, typography, theme)
- [x] Dependencies configured
- [x] API error model with tests
- [x] API result wrapper with tests
- [x] API client with Dio
- [x] Storage service interface
- [x] SharedPreferences storage implementation

**In Progress**:
- [ ] Token refresh interceptor
- [ ] Network connectivity monitoring
- [ ] Navigation with GoRouter
- [ ] Logging service

**Tests Status**:
- ✅ `api_error_test.dart` - 8 tests (ready to run)
- ✅ `api_result_test.dart` - 11 tests (ready to run)

---

## 📦 Project Structure

```
lib/
├── core/
│   ├── theme/
│   │   ├── app_theme.dart          ✅ Complete
│   │   ├── app_colors.dart         ✅ Complete
│   │   └── app_text_styles.dart    ✅ Complete
│   ├── constants/
│   │   └── app_constants.dart      ✅ Complete
│   ├── network/
│   │   ├── api_client.dart         ✅ Complete
│   │   ├── api_error.dart          ✅ Complete + Tests
│   │   ├── api_result.dart         ✅ Complete + Tests
│   │   └── interceptors/           🚧 Next
│   └── storage/
│       ├── storage_service.dart    ✅ Complete
│       └── shared_prefs_storage_service.dart  ✅ Complete
├── features/
│   ├── auth/                       📋 Planned
│   ├── onboarding/                 📋 Planned
│   ├── tracking/                   📋 Planned
│   ├── dr_ketone/                  📋 Planned
│   ├── progress/                   📋 Planned
│   └── settings/                   📋 Planned
└── shared/
    ├── models/                     📋 Planned
    └── widgets/                    📋 Planned

test/
├── core/
│   └── network/
│       ├── api_error_test.dart     ✅ Complete (8 tests)
│       └── api_result_test.dart    ✅ Complete (11 tests)
```

---

## 🧪 Running Tests

### Run All Tests
```bash
flutter test
```

### Run Specific Test File
```bash
flutter test test/core/network/api_error_test.dart
```

### Run Tests with Coverage
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

### Watch Mode (auto-run on file changes)
```bash
flutter test --watch
```

---

## 🚀 Next Steps

### Immediate (Phase 1 Completion)

1. **Auth Token Interceptor**
   - Automatically add JWT token to requests
   - Handle token refresh on 401
   - Test with mock API

2. **Network Connectivity Monitor**
   - Detect online/offline status
   - Queue requests when offline
   - Retry when connection restored

3. **Navigation Setup**
   - Configure GoRouter
   - Define all routes
   - Handle deep links
   - Protected routes (auth required)

4. **Logging Service**
   - Structured logging
   - Log levels (debug, info, warn, error)
   - Remote logging (Sentry integration)

### Phase 2: Shared UI Components

Build reusable components with tests:
- Custom buttons (primary, secondary, outline, text)
- Custom inputs (text, number, password, search)
- Cards (stat, food, progress)
- Loading states (shimmer, spinner, skeleton)
- Empty/error states
- Bottom navigation
- App bar
- Modals and dialogs

### Phase 3: Authentication

Implement complete auth flow:
- Login screen
- Signup screen
- Forgot password
- Auth BLoC with full test coverage
- Token management
- Auto-login
- Logout

---

## 📝 Code Style Guidelines

### Naming Conventions
- Classes: `PascalCase`
- Files: `snake_case.dart`
- Variables/Functions: `camelCase`
- Constants: `camelCase` or `SCREAMING_SNAKE_CASE`
- Private members: `_leadingUnderscore`

### File Organization
```dart
// 1. Imports (grouped)
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../core/theme/app_colors.dart';
import '../models/user.dart';

// 2. Class definition
class MyWidget extends StatelessWidget {
  // 3. Fields
  final String title;
  
  // 4. Constructor
  const MyWidget({
    super.key,
    required this.title,
  });
  
  // 5. Lifecycle methods
  @override
  Widget build(BuildContext context) {
    return Container();
  }
  
  // 6. Public methods
  void publicMethod() {}
  
  // 7. Private methods
  void _privateMethod() {}
}
```

### Widget Best Practices
- Use `const` constructors whenever possible
- Extract complex widgets into separate files
- Keep `build` methods small and readable
- Use `Builder` widgets to avoid context issues
- Prefer composition over inheritance

### BLoC Best Practices
- One BLoC per feature
- Events are user actions
- States represent UI states
- Use `Equatable` for events and states
- Handle all possible states in UI

---

## 🐛 Debugging Tips

### Common Issues

**1. "StorageService not initialized"**
```dart
// Solution: Initialize in main()
await storageService.init();
```

**2. "Context not found"**
```dart
// Solution: Use Builder or extract widget
Builder(
  builder: (context) => YourWidget(),
)
```

**3. "setState called after dispose"**
```dart
// Solution: Check mounted before setState
if (mounted) {
  setState(() {});
}
```

### Performance Profiling
```bash
flutter run --profile
# Then use DevTools
flutter pub global activate devtools
flutter pub global run devtools
```

---

## 📚 Resources

### Flutter Documentation
- [Flutter Docs](https://docs.flutter.dev/)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Effective Dart](https://dart.dev/guides/language/effective-dart)

### State Management
- [Flutter BLoC](https://bloclibrary.dev/)
- [BLoC Architecture](https://bloclibrary.dev/#/architecture)

### Testing
- [Flutter Testing](https://docs.flutter.dev/testing)
- [Widget Testing](https://docs.flutter.dev/cookbook/testing/widget/introduction)
- [Integration Testing](https://docs.flutter.dev/testing/integration-tests)

### Design
- [Material Design 3](https://m3.material.io/)
- [Flutter Widget Catalog](https://docs.flutter.dev/ui/widgets)

---

## 🎯 Success Criteria

Before moving to the next phase, ensure:

✅ All tests pass (`flutter test`)  
✅ No linting errors (`flutter analyze`)  
✅ Code is formatted (`flutter format lib/`)  
✅ Features work as expected in the app  
✅ Error handling is comprehensive  
✅ Loading states are implemented  
✅ Code is documented  
✅ Committed to GitHub with clear commit message  

---

## 📞 Contact

**Developer**: Adrian  
**Repository**: https://github.com/kimhons/KetoWell  
**Documentation**: `/docs/mobile-app/`

---

**Last Updated**: November 28, 2025  
**Current Phase**: Phase 1 - Core Infrastructure  
**Test Coverage**: 19 tests written, ready to run locally
