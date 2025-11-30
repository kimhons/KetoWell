import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/network/api_error.dart';
import 'package:ketowell/core/network/api_result.dart';
import 'package:ketowell/features/auth/bloc/auth_bloc.dart';
import 'package:ketowell/features/auth/bloc/auth_event.dart';
import 'package:ketowell/features/auth/bloc/auth_state.dart';
import 'package:ketowell/features/auth/data/auth_repository.dart';
import 'package:ketowell/shared/models/user.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'auth_bloc_test.mocks.dart';

@GenerateMocks([AuthRepository])
void main() {
  late MockAuthRepository mockAuthRepository;
  late AuthBloc authBloc;

  setUp(() {
    mockAuthRepository = MockAuthRepository();
    authBloc = AuthBloc(authRepository: mockAuthRepository);
  });

  tearDown(() {
    authBloc.close();
  });

  final testUser = User(
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: DateTime(2024, 1, 1),
  );

  final testTokens = AuthTokens(
    accessToken: 'access123',
    refreshToken: 'refresh456',
    expiresAt: DateTime.now().add(const Duration(hours: 1)),
  );

  final testAuthResponse = AuthResponse(
    user: testUser,
    tokens: testTokens,
  );

  group('AuthBloc', () {
    test('initial state is AuthInitial', () {
      expect(authBloc.state, const AuthInitial());
    });

    group('AuthCheckRequested', () {
      blocTest<AuthBloc, AuthState>(
        'emits [AuthAuthenticated] when user is authenticated',
        build: () {
          when(mockAuthRepository.isAuthenticated())
              .thenAnswer((_) async => true);
          when(mockAuthRepository.getCurrentUser())
              .thenAnswer((_) async => testUser);
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthCheckRequested()),
        expect: () => [AuthAuthenticated(testUser)],
        verify: (_) {
          verify(mockAuthRepository.isAuthenticated()).called(1);
          verify(mockAuthRepository.getCurrentUser()).called(1);
        },
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthUnauthenticated] when user is not authenticated',
        build: () {
          when(mockAuthRepository.isAuthenticated())
              .thenAnswer((_) async => false);
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthCheckRequested()),
        expect: () => [const AuthUnauthenticated()],
        verify: (_) {
          verify(mockAuthRepository.isAuthenticated()).called(1);
          verifyNever(mockAuthRepository.getCurrentUser());
        },
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthUnauthenticated] when authenticated but no user data',
        build: () {
          when(mockAuthRepository.isAuthenticated())
              .thenAnswer((_) async => true);
          when(mockAuthRepository.getCurrentUser())
              .thenAnswer((_) async => null);
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthCheckRequested()),
        expect: () => [const AuthUnauthenticated()],
      );
    });

    group('AuthSignUpRequested', () {
      const signUpRequest = SignUpRequest(
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthLoading, AuthAuthenticated] when sign up succeeds',
        build: () {
          when(mockAuthRepository.signUp(signUpRequest))
              .thenAnswer((_) async => ApiResult.success(testAuthResponse));
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthSignUpRequested(signUpRequest)),
        expect: () => [
          const AuthLoading(),
          AuthAuthenticated(testUser),
        ],
        verify: (_) {
          verify(mockAuthRepository.signUp(signUpRequest)).called(1);
        },
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthLoading, AuthError, AuthUnauthenticated] when sign up fails',
        build: () {
          when(mockAuthRepository.signUp(signUpRequest)).thenAnswer(
            (_) async => ApiResult.failure(
              ApiError.badRequest('Email already exists'),
            ),
          );
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthSignUpRequested(signUpRequest)),
        expect: () => [
          const AuthLoading(),
          const AuthError('Email already exists'),
          const AuthUnauthenticated(),
        ],
      );
    });

    group('AuthLoginRequested', () {
      const loginRequest = LoginRequest(
        email: 'test@example.com',
        password: 'Password123',
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthLoading, AuthAuthenticated] when login succeeds',
        build: () {
          when(mockAuthRepository.login(loginRequest))
              .thenAnswer((_) async => ApiResult.success(testAuthResponse));
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthLoginRequested(loginRequest)),
        expect: () => [
          const AuthLoading(),
          AuthAuthenticated(testUser),
        ],
        verify: (_) {
          verify(mockAuthRepository.login(loginRequest)).called(1);
        },
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthLoading, AuthError, AuthUnauthenticated] when login fails',
        build: () {
          when(mockAuthRepository.login(loginRequest)).thenAnswer(
            (_) async => ApiResult.failure(
              ApiError.unauthorized('Invalid credentials'),
            ),
          );
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthLoginRequested(loginRequest)),
        expect: () => [
          const AuthLoading(),
          const AuthError('Invalid credentials'),
          const AuthUnauthenticated(),
        ],
      );
    });

    group('AuthLogoutRequested', () {
      blocTest<AuthBloc, AuthState>(
        'emits [AuthUnauthenticated] when logout is requested',
        build: () {
          when(mockAuthRepository.logout()).thenAnswer((_) async => {});
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthLogoutRequested()),
        expect: () => [const AuthUnauthenticated()],
        verify: (_) {
          verify(mockAuthRepository.logout()).called(1);
        },
      );
    });

    group('AuthTokenRefreshRequested', () {
      blocTest<AuthBloc, AuthState>(
        'keeps current state when token refresh succeeds',
        build: () {
          when(mockAuthRepository.refreshToken())
              .thenAnswer((_) async => ApiResult.success(testTokens));
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthTokenRefreshRequested()),
        expect: () => [],
        verify: (_) {
          verify(mockAuthRepository.refreshToken()).called(1);
        },
      );

      blocTest<AuthBloc, AuthState>(
        'emits [AuthUnauthenticated] when token refresh fails',
        build: () {
          when(mockAuthRepository.refreshToken()).thenAnswer(
            (_) async => ApiResult.failure(
              ApiError.unauthorized('Refresh token expired'),
            ),
          );
          return authBloc;
        },
        act: (bloc) => bloc.add(const AuthTokenRefreshRequested()),
        expect: () => [const AuthUnauthenticated()],
      );
    });
  });
}
