import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/core/utils/logger.dart';

void main() {
  group('Logger', () {
    late Logger logger;

    setUp(() {
      logger = const Logger('TestTag');
    });

    test('should create logger with tag', () {
      expect(logger.tag, 'TestTag');
    });

    test('should log debug message without throwing', () {
      expect(() => logger.debug('Debug message'), returnsNormally);
    });

    test('should log info message without throwing', () {
      expect(() => logger.info('Info message'), returnsNormally);
    });

    test('should log warning message without throwing', () {
      expect(() => logger.warning('Warning message'), returnsNormally);
    });

    test('should log error message without throwing', () {
      expect(() => logger.error('Error message'), returnsNormally);
    });

    test('should log with error object', () {
      final error = Exception('Test error');
      expect(() => logger.error('Error occurred', error), returnsNormally);
    });

    test('should log with stack trace', () {
      final stackTrace = StackTrace.current;
      expect(
        () => logger.error('Error with trace', null, stackTrace),
        returnsNormally,
      );
    });

    test('should log with both error and stack trace', () {
      final error = Exception('Test error');
      final stackTrace = StackTrace.current;
      expect(
        () => logger.error('Complete error', error, stackTrace),
        returnsNormally,
      );
    });
  });

  group('AppLogger', () {
    test('should have predefined logger instances', () {
      expect(AppLogger.network.tag, 'Network');
      expect(AppLogger.auth.tag, 'Auth');
      expect(AppLogger.storage.tag, 'Storage');
      expect(AppLogger.ui.tag, 'UI');
      expect(AppLogger.bloc.tag, 'BLoC');
      expect(AppLogger.general.tag, 'App');
    });

    test('should be able to use predefined loggers', () {
      expect(() => AppLogger.network.info('Network call'), returnsNormally);
      expect(() => AppLogger.auth.debug('Auth check'), returnsNormally);
      expect(() => AppLogger.storage.warning('Storage warning'), returnsNormally);
      expect(() => AppLogger.ui.error('UI error'), returnsNormally);
    });
  });
}
