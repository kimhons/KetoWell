import 'package:equatable/equatable.dart';
import 'api_error.dart';

/// Result wrapper for API calls that can either succeed or fail
sealed class ApiResult<T> extends Equatable {
  const ApiResult();
}

/// Successful API result with data
class ApiSuccess<T> extends ApiResult<T> {
  final T data;

  const ApiSuccess(this.data);

  @override
  List<Object?> get props => [data];
}

/// Failed API result with error
class ApiFailure<T> extends ApiResult<T> {
  final ApiError error;

  const ApiFailure(this.error);

  @override
  List<Object?> get props => [error];
}

/// Extension methods for ApiResult
extension ApiResultExtension<T> on ApiResult<T> {
  /// Returns true if the result is a success
  bool get isSuccess => this is ApiSuccess<T>;

  /// Returns true if the result is a failure
  bool get isFailure => this is ApiFailure<T>;

  /// Returns the data if success, null otherwise
  T? get dataOrNull {
    if (this is ApiSuccess<T>) {
      return (this as ApiSuccess<T>).data;
    }
    return null;
  }

  /// Returns the error if failure, null otherwise
  ApiError? get errorOrNull {
    if (this is ApiFailure<T>) {
      return (this as ApiFailure<T>).error;
    }
    return null;
  }

  /// Executes onSuccess if result is success, onFailure if failure
  R when<R>({
    required R Function(T data) onSuccess,
    required R Function(ApiError error) onFailure,
  }) {
    if (this is ApiSuccess<T>) {
      return onSuccess((this as ApiSuccess<T>).data);
    } else {
      return onFailure((this as ApiFailure<T>).error);
    }
  }

  /// Maps the success data to a new type
  ApiResult<R> map<R>(R Function(T data) transform) {
    if (this is ApiSuccess<T>) {
      return ApiSuccess(transform((this as ApiSuccess<T>).data));
    } else {
      return ApiFailure((this as ApiFailure<T>).error);
    }
  }
}
