import 'package:flutter/material.dart';

class AppColors {
  // Primary Brand Colors
  static const Color primary = Color(0xFF059669); // Emerald green (keto-friendly)
  static const Color primaryLight = Color(0xFF10B981);
  static const Color primaryDark = Color(0xFF047857);
  
  // Secondary Colors
  static const Color secondary = Color(0xFF8B5CF6); // Purple (Dr. Ketone AI)
  static const Color secondaryLight = Color(0xFFA78BFA);
  static const Color secondaryDark = Color(0xFF7C3AED);
  
  // Neutral Colors
  static const Color background = Color(0xFFF9FAFB);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color border = Color(0xFFE5E7EB);
  
  // Text Colors
  static const Color textPrimary = Color(0xFF111827);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textTertiary = Color(0xFF9CA3AF);
  
  // Status Colors
  static const Color success = Color(0xFF10B981); // Green
  static const Color warning = Color(0xFFF59E0B); // Amber
  static const Color error = Color(0xFFEF4444); // Red
  static const Color info = Color(0xFF3B82F6); // Blue
  
  // Macro Colors (for food tracking)
  static const Color carbs = Color(0xFFF59E0B); // Amber
  static const Color protein = Color(0xFFEC4899); // Pink
  static const Color fat = Color(0xFF8B5CF6); // Purple
  static const Color calories = Color(0xFF6366F1); // Indigo
  
  // Ketone Level Colors
  static const Color ketoneNone = Color(0xFFEF4444); // Red (not in ketosis)
  static const Color ketoneTrace = Color(0xFFF59E0B); // Amber (trace ketones)
  static const Color ketoneLight = Color(0xFFFBBF24); // Yellow (light ketosis)
  static const Color ketoneModerate = Color(0xFF10B981); // Green (moderate ketosis)
  static const Color ketoneDeep = Color(0xFF059669); // Dark green (deep ketosis)
  
  // Symptom Severity Colors
  static const Color symptomNone = Color(0xFF10B981); // Green
  static const Color symptomMild = Color(0xFFFBBF24); // Yellow
  static const Color symptomModerate = Color(0xFFF59E0B); // Amber
  static const Color symptomSevere = Color(0xFFEF4444); // Red
  
  // Gamification Colors
  static const Color streak = Color(0xFFF97316); // Orange (fire emoji)
  static const Color achievement = Color(0xFFFBBF24); // Gold
  static const Color level = Color(0xFF8B5CF6); // Purple
  
  // Gradient Colors
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFF059669), Color(0xFF10B981)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient secondaryGradient = LinearGradient(
    colors: [Color(0xFF8B5CF6), Color(0xFFA78BFA)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient ketosisGradient = LinearGradient(
    colors: [Color(0xFF10B981), Color(0xFF059669), Color(0xFF047857)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );
  
  // Shadow Colors
  static const Color shadowLight = Color(0x0D000000); // 5% black
  static const Color shadowMedium = Color(0x1A000000); // 10% black
  static const Color shadowDark = Color(0x33000000); // 20% black
}
