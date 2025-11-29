import 'package:equatable/equatable.dart';
import '../../../shared/models/user.dart';

/// Base auth event
abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object?> get props => [];
}

/// Check if user is authenticated on app start
class AuthCheckRequested extends AuthEvent {
  const AuthCheckRequested();
}

/// User requested sign up
class AuthSignUpRequested extends AuthEvent {
  final SignUpRequest request;

  const AuthSignUpRequested(this.request);

  @override
  List<Object?> get props => [request];
}

/// User requested login
class AuthLoginRequested extends AuthEvent {
  final LoginRequest request;

  const AuthLoginRequested(this.request);

  @override
  List<Object?> get props => [request];
}

/// User requested logout
class AuthLogoutRequested extends AuthEvent {
  const AuthLogoutRequested();
}

/// Token refresh requested
class AuthTokenRefreshRequested extends AuthEvent {
  const AuthTokenRefreshRequested();
}
