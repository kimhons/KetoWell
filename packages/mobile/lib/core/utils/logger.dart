import 'package:flutter/foundation.dart';

/// Log levels for the logger
enum LogLevel {
  debug,
  info,
  warning,
  error,
}

/// Simple logger service with different log levels
class Logger {
  final String tag;

  const Logger(this.tag);

  /// Log debug message (only in debug mode)
  void debug(String message, [dynamic error, StackTrace? stackTrace]) {
    _log(LogLevel.debug, message, error, stackTrace);
  }

  /// Log info message
  void info(String message, [dynamic error, StackTrace? stackTrace]) {
    _log(LogLevel.info, message, error, stackTrace);
  }

  /// Log warning message
  void warning(String message, [dynamic error, StackTrace? stackTrace]) {
    _log(LogLevel.warning, message, error, stackTrace);
  }

  /// Log error message
  void error(String message, [dynamic error, StackTrace? stackTrace]) {
    _log(LogLevel.error, message, error, stackTrace);
  }

  void _log(
    LogLevel level,
    String message,
    dynamic error,
    StackTrace? stackTrace,
  ) {
    // Only log debug messages in debug mode
    if (level == LogLevel.debug && kReleaseMode) {
      return;
    }

    final timestamp = DateTime.now().toIso8601String();
    final levelStr = level.name.toUpperCase().padRight(7);
    final tagStr = '[$tag]'.padRight(20);

    final logMessage = '$timestamp $levelStr $tagStr $message';

    // Print to console
    if (kDebugMode) {
      debugPrint(logMessage);

      if (error != null) {
        debugPrint('  Error: $error');
      }

      if (stackTrace != null) {
        debugPrint('  Stack trace:\n$stackTrace');
      }
    }

    // In production, you would send errors to a remote logging service
    // like Sentry, Firebase Crashlytics, etc.
    if (level == LogLevel.error && kReleaseMode) {
      _sendToRemoteLogging(logMessage, error, stackTrace);
    }
  }

  void _sendToRemoteLogging(
    String message,
    dynamic error,
    StackTrace? stackTrace,
  ) {
    // TODO: Implement remote logging (Sentry, Firebase Crashlytics, etc.)
    // For now, this is a placeholder
  }
}

/// Global logger instances for different parts of the app
class AppLogger {
  static const network = Logger('Network');
  static const auth = Logger('Auth');
  static const storage = Logger('Storage');
  static const ui = Logger('UI');
  static const bloc = Logger('BLoC');
  static const general = Logger('App');
}
