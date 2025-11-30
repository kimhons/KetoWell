# KetoWell Mobile App - Development TODO

## Phase 1: Core Infrastructure ✅
- [x] Project structure created
- [x] Design system implemented
- [x] Dependencies configured
- [x] API error model with comprehensive tests
- [x] API result wrapper with tests
- [x] API client with Dio
- [x] Storage service interface
- [x] SharedPreferences storage implementation
- [x] Token refresh interceptor with tests
- [x] Network connectivity monitoring with tests
- [x] Navigation with GoRouter (routes + protected routes)
- [x] Logging service with tests
- [x] Main app integration with all services

## Phase 2: Shared UI Components 🚧
- [x] Custom buttons (primary, secondary, outline, text) with 13 tests
- [x] Custom text inputs (text, email, password, number, phone, multiline) with 18 tests
- [x] Component documentation (README.md)
- [x] Custom cards (stat card, food card, progress card) with 37 tests
- [x] Bottom navigation bar with 12 tests
- [x] App bar (standard and sliver) with 20 tests
- [ ] Loading states (shimmer, spinner, skeleton)
- [ ] Empty states
- [ ] Error states
- [ ] Custom app bar
- [ ] Modal bottom sheets
- [ ] Dialogs (alert, confirm, custom)

## Phase 3: Authentication
- [ ] Login screen
- [ ] Signup screen
- [ ] Forgot password screen
- [ ] Auth BLoC (login, signup, logout, token refresh)
- [ ] Auth repository
- [ ] Token storage and retrieval
- [ ] Auto-login on app start
- [ ] Logout functionality

## Phase 4: Onboarding Flow
- [ ] Welcome screen
- [ ] Medical screening intro
- [ ] Contraindications check (SGLT2i, lactation, genetic disorders)
- [ ] Medication inventory
- [ ] Goal setting screen
- [ ] Baseline measurements (weight, photos)
- [ ] Electrolyte education
- [ ] Keto flu expectations
- [ ] Consent and disclaimer
- [ ] Onboarding BLoC

## Phase 5: Dashboard & Home
- [ ] Dashboard home screen
- [ ] Daily macro ring chart
- [ ] Quick stats cards (weight, ketones, streak)
- [ ] Dr. Ketone widget
- [ ] Quick action buttons
- [ ] Daily summary
- [ ] Dashboard BLoC

## Phase 6: Food Tracking
- [ ] Meal logging - manual entry
- [ ] Meal logging - search (USDA API)
- [ ] Food detail view
- [ ] Recent foods list
- [ ] Macro calculator
- [ ] Net carbs calculator
- [ ] Daily macro tracker
- [ ] Meal history
- [ ] Food tracking BLoC

## Phase 7: Biomarker Tracking
- [ ] Weight logging
- [ ] Ketone level tracking
- [ ] Blood glucose tracking (for diabetics)
- [ ] Body composition tracking
- [ ] Progress photos
- [ ] Biomarker BLoC

## Phase 8: Symptom & Electrolyte Tracking
- [ ] Symptom logger (keto flu symptoms)
- [ ] Electrolyte intake tracker
- [ ] Hydration tracker
- [ ] Daily symptom summary
- [ ] Symptom BLoC

## Phase 9: Progress & Analytics
- [ ] Progress dashboard
- [ ] Weight trend chart
- [ ] Ketone history chart
- [ ] Macro adherence report
- [ ] Habit streak visualization
- [ ] Weekly/monthly summaries
- [ ] Progress BLoC

## Phase 10: Dr. Ketone AI
- [ ] Chat interface
- [ ] Message bubbles (user, assistant)
- [ ] Typing indicator
- [ ] Daily check-in
- [ ] Meal analysis
- [ ] Symptom assessment
- [ ] Chat BLoC
- [ ] OpenAI API integration

## Phase 11: Settings & Profile
- [ ] Settings home
- [ ] Account settings
- [ ] Notification preferences
- [ ] Macro goals configuration
- [ ] Electrolyte targets
- [ ] Units preferences
- [ ] Profile management
- [ ] Settings BLoC

## Phase 12: Habit Formation
- [ ] 66-day habit tracker
- [ ] Daily check-in
- [ ] Streak counter
- [ ] Milestone celebrations
- [ ] Identity-building exercises
- [ ] Habit BLoC

## Phase 13: Polish & UX
- [ ] Animations (page transitions, micro-interactions)
- [ ] Haptic feedback
- [ ] Loading states everywhere
- [ ] Error handling everywhere
- [ ] Empty states everywhere
- [ ] Offline support
- [ ] Pull-to-refresh
- [ ] Infinite scroll where needed

## Phase 14: Testing
- [ ] Unit tests for all BLoCs
- [ ] Unit tests for all repositories
- [ ] Unit tests for all services
- [ ] Widget tests for all screens
- [ ] Widget tests for all components
- [ ] Integration tests for critical flows
- [ ] Test coverage > 80%

## Phase 15: Final Polish
- [ ] Performance optimization
- [ ] Memory leak fixes
- [ ] Accessibility (screen readers, contrast)
- [ ] Internationalization setup
- [ ] App icons
- [ ] Splash screen assets
- [ ] Store screenshots
- [ ] App store descriptions

## Phase 16: Deployment
- [ ] iOS build configuration
- [ ] Android build configuration
- [ ] App signing
- [ ] Release notes
- [ ] Beta testing (TestFlight, Firebase App Distribution)
- [ ] App Store submission
- [ ] Google Play submission

## Phase 3: Authentication System 🚧
- [x] User model (User, AuthTokens, SignUpRequest, LoginRequest, AuthResponse)
- [x] Auth repository with API integration
- [x] Auth BLoC (state, events, bloc)
- [x] Sign-up screen with full validation
- [x] Login screen with validation
- [ ] JWT token management (partial - needs testing)
- [ ] Password reset flow
- [ ] Email verification
- [x] Auth state persistence (via storage)
- [ ] Protected route handling
- [x] Tests for auth models (25 tests)
- [ ] Tests for auth repository
- [x] Tests for auth BLoC (11 tests)
- [ ] Tests for sign-up screen
- [ ] Tests for login screen
