import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/utils/logger.dart';
import '../data/auth_repository.dart';
import 'auth_event.dart';
import 'auth_state.dart';

/// BLoC for managing authentication state
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository _authRepository;
  final Logger _logger = Logger.tagged('AuthBloc');

  AuthBloc({
    required AuthRepository authRepository,
  })  : _authRepository = authRepository,
        super(const AuthInitial()) {
    on<AuthCheckRequested>(_onAuthCheckRequested);
    on<AuthSignUpRequested>(_onSignUpRequested);
    on<AuthLoginRequested>(_onLoginRequested);
    on<AuthLogoutRequested>(_onLogoutRequested);
    on<AuthTokenRefreshRequested>(_onTokenRefreshRequested);
  }

  /// Check if user is authenticated on app start
  Future<void> _onAuthCheckRequested(
    AuthCheckRequested event,
    Emitter<AuthState> emit,
  ) async {
    _logger.info('Checking authentication status');

    final isAuthenticated = await _authRepository.isAuthenticated();

    if (isAuthenticated) {
      final user = await _authRepository.getCurrentUser();
      if (user != null) {
        _logger.info('User is authenticated');
        emit(AuthAuthenticated(user));
      } else {
        _logger.warning('User authenticated but no user data found');
        emit(const AuthUnauthenticated());
      }
    } else {
      _logger.info('User is not authenticated');
      emit(const AuthUnauthenticated());
    }
  }

  /// Handle sign up request
  Future<void> _onSignUpRequested(
    AuthSignUpRequested event,
    Emitter<AuthState> emit,
  ) async {
    _logger.info('Processing sign up request');
    emit(const AuthLoading());

    final result = await _authRepository.signUp(event.request);

    result.when(
      success: (authResponse) {
        _logger.info('Sign up successful');
        emit(AuthAuthenticated(authResponse.user));
      },
      failure: (error) {
        _logger.error('Sign up failed: ${error.message}');
        emit(AuthError(error.message));
        emit(const AuthUnauthenticated());
      },
    );
  }

  /// Handle login request
  Future<void> _onLoginRequested(
    AuthLoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    _logger.info('Processing login request');
    emit(const AuthLoading());

    final result = await _authRepository.login(event.request);

    result.when(
      success: (authResponse) {
        _logger.info('Login successful');
        emit(AuthAuthenticated(authResponse.user));
      },
      failure: (error) {
        _logger.error('Login failed: ${error.message}');
        emit(AuthError(error.message));
        emit(const AuthUnauthenticated());
      },
    );
  }

  /// Handle logout request
  Future<void> _onLogoutRequested(
    AuthLogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    _logger.info('Processing logout request');
    await _authRepository.logout();
    emit(const AuthUnauthenticated());
  }

  /// Handle token refresh request
  Future<void> _onTokenRefreshRequested(
    AuthTokenRefreshRequested event,
    Emitter<AuthState> emit,
  ) async {
    _logger.info('Processing token refresh request');

    final result = await _authRepository.refreshToken();

    result.when(
      success: (tokens) {
        _logger.info('Token refresh successful');
        // Keep current state, just updated tokens in storage
      },
      failure: (error) {
        _logger.error('Token refresh failed: ${error.message}');
        // Token refresh failed, logout user
        emit(const AuthUnauthenticated());
      },
    );
  }
}
