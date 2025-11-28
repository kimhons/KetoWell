import 'package:dio/dio.dart';
import '../constants/app_constants.dart';
import 'api_error.dart';
import 'api_result.dart';

/// HTTP API client using Dio
class ApiClient {
  late final Dio _dio;

  ApiClient({
    String? baseUrl,
    Duration? timeout,
    List<Interceptor>? interceptors,
  }) {
    _dio = Dio(
      BaseOptions(
        baseUrl: baseUrl ?? AppConstants.apiBaseUrl,
        connectTimeout: timeout ?? AppConstants.apiTimeout,
        receiveTimeout: timeout ?? AppConstants.apiTimeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // Add interceptors
    if (interceptors != null) {
      _dio.interceptors.addAll(interceptors);
    }

    // Add logging interceptor in debug mode
    _dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        error: true,
        logPrint: (obj) => print('[API] $obj'),
      ),
    );
  }

  /// GET request
  Future<ApiResult<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );
      return ApiSuccess(fromJson(response.data));
    } catch (e) {
      return ApiFailure(_handleError(e));
    }
  }

  /// POST request
  Future<ApiResult<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return ApiSuccess(fromJson(response.data));
    } catch (e) {
      return ApiFailure(_handleError(e));
    }
  }

  /// PUT request
  Future<ApiResult<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return ApiSuccess(fromJson(response.data));
    } catch (e) {
      return ApiFailure(_handleError(e));
    }
  }

  /// DELETE request
  Future<ApiResult<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return ApiSuccess(fromJson(response.data));
    } catch (e) {
      return ApiFailure(_handleError(e));
    }
  }

  /// PATCH request
  Future<ApiResult<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _dio.patch(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return ApiSuccess(fromJson(response.data));
    } catch (e) {
      return ApiFailure(_handleError(e));
    }
  }

  /// Handle Dio errors and convert to ApiError
  ApiError _handleError(dynamic error) {
    if (error is DioException) {
      switch (error.type) {
        case DioExceptionType.connectionTimeout:
        case DioExceptionType.sendTimeout:
        case DioExceptionType.receiveTimeout:
          return ApiError.timeout();

        case DioExceptionType.connectionError:
          return ApiError.network(
            'No internet connection. Please check your network.',
          );

        case DioExceptionType.badResponse:
          final statusCode = error.response?.statusCode;
          final message = _extractErrorMessage(error.response?.data);

          switch (statusCode) {
            case 401:
              return ApiError.unauthorized(message);
            case 403:
              return ApiError.forbidden(message);
            case 404:
              return ApiError.notFound(message);
            case 500:
            case 502:
            case 503:
              return ApiError.serverError(message);
            default:
              return ApiError(
                type: ApiErrorType.unknown,
                message: message ?? 'Request failed with status $statusCode',
                statusCode: statusCode,
              );
          }

        case DioExceptionType.cancel:
          return ApiError.unknown('Request was cancelled');

        case DioExceptionType.badCertificate:
          return ApiError.network('SSL certificate verification failed');

        case DioExceptionType.unknown:
        default:
          return ApiError.unknown(error.message ?? 'An unknown error occurred');
      }
    }

    return ApiError.unknown(error.toString());
  }

  /// Extract error message from response data
  String? _extractErrorMessage(dynamic data) {
    if (data is Map<String, dynamic>) {
      return data['message'] as String? ??
          data['error'] as String? ??
          data['detail'] as String?;
    }
    return null;
  }

  /// Get the underlying Dio instance (for advanced use cases)
  Dio get dio => _dio;
}
