/// Abstract storage service for key-value storage
abstract class StorageService {
  /// Initialize the storage service
  Future<void> init();

  /// Save a string value
  Future<void> setString(String key, String value);

  /// Get a string value
  Future<String?> getString(String key);

  /// Save an integer value
  Future<void> setInt(String key, int value);

  /// Get an integer value
  Future<int?> getInt(String key);

  /// Save a boolean value
  Future<void> setBool(String key, bool value);

  /// Get a boolean value
  Future<bool?> getBool(String key);

  /// Save a double value
  Future<void> setDouble(String key, double value);

  /// Get a double value
  Future<double?> getDouble(String key);

  /// Save a list of strings
  Future<void> setStringList(String key, List<String> value);

  /// Get a list of strings
  Future<List<String>?> getStringList(String key);

  /// Remove a value
  Future<void> remove(String key);

  /// Clear all values
  Future<void> clear();

  /// Check if a key exists
  Future<bool> containsKey(String key);

  /// Get all keys
  Future<Set<String>> getKeys();
}
