import 'package:shared_preferences/shared_preferences.dart';
import 'storage_service.dart';

/// SharedPreferences implementation of StorageService
class SharedPrefsStorageService implements StorageService {
  SharedPreferences? _prefs;

  @override
  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  void _ensureInitialized() {
    if (_prefs == null) {
      throw StateError('StorageService not initialized. Call init() first.');
    }
  }

  @override
  Future<void> setString(String key, String value) async {
    _ensureInitialized();
    await _prefs!.setString(key, value);
  }

  @override
  Future<String?> getString(String key) async {
    _ensureInitialized();
    return _prefs!.getString(key);
  }

  @override
  Future<void> setInt(String key, int value) async {
    _ensureInitialized();
    await _prefs!.setInt(key, value);
  }

  @override
  Future<int?> getInt(String key) async {
    _ensureInitialized();
    return _prefs!.getInt(key);
  }

  @override
  Future<void> setBool(String key, bool value) async {
    _ensureInitialized();
    await _prefs!.setBool(key, value);
  }

  @override
  Future<bool?> getBool(String key) async {
    _ensureInitialized();
    return _prefs!.getBool(key);
  }

  @override
  Future<void> setDouble(String key, double value) async {
    _ensureInitialized();
    await _prefs!.setDouble(key, value);
  }

  @override
  Future<double?> getDouble(String key) async {
    _ensureInitialized();
    return _prefs!.getDouble(key);
  }

  @override
  Future<void> setStringList(String key, List<String> value) async {
    _ensureInitialized();
    await _prefs!.setStringList(key, value);
  }

  @override
  Future<List<String>?> getStringList(String key) async {
    _ensureInitialized();
    return _prefs!.getStringList(key);
  }

  @override
  Future<void> remove(String key) async {
    _ensureInitialized();
    await _prefs!.remove(key);
  }

  @override
  Future<void> clear() async {
    _ensureInitialized();
    await _prefs!.clear();
  }

  @override
  Future<bool> containsKey(String key) async {
    _ensureInitialized();
    return _prefs!.containsKey(key);
  }

  @override
  Future<Set<String>> getKeys() async {
    _ensureInitialized();
    return _prefs!.getKeys();
  }
}
