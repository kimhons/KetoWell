import 'package:equatable/equatable.dart';

/// Represents different types of API errors
enum ApiErrorType {
  network,
  timeout,
  unauthorized,
  forbidden,
  notFound,
  serverError,
  unknown,
}

/// API error model with detailed error information
class ApiError extends Equatable {
  final ApiErrorType type;
  final String message;
  final int? statusCode;
  final dynamic data;

  const ApiError({
    required this.type,
    required this.message,
    this.statusCode,
    this.data,
  });

  factory ApiError.network(String message) {
    return ApiError(
      type: ApiErrorType.network,
      message: message,
    );
  }

  factory ApiError.timeout() {
    return const ApiError(
      type: ApiErrorType.timeout,
      message: 'Request timeout. Please check your internet connection.',
    );
  }

  factory ApiError.unauthorized([String? message]) {
    return ApiError(
      type: ApiErrorType.unauthorized,
      message: message ?? 'Unauthorized. Please log in again.',
      statusCode: 401,
    );
  }

  factory ApiError.forbidden([String? message]) {
    return ApiError(
      type: ApiErrorType.forbidden,
      message: message ?? 'Access forbidden.',
      statusCode: 403,
    );
  }

  factory ApiError.notFound([String? message]) {
    return ApiError(
      type: ApiErrorType.notFound,
      message: message ?? 'Resource not found.',
      statusCode: 404,
    );
  }

  factory ApiError.serverError([String? message]) {
    return ApiError(
      type: ApiErrorType.serverError,
      message: message ?? 'Server error. Please try again later.',
      statusCode: 500,
    );
  }

  factory ApiError.unknown([String? message]) {
    return ApiError(
      type: ApiErrorType.unknown,
      message: message ?? 'An unknown error occurred.',
    );
  }

  @override
  List<Object?> get props => [type, message, statusCode, data];

  @override
  String toString() {
    return 'ApiError(type: $type, message: $message, statusCode: $statusCode)';
  }
}
