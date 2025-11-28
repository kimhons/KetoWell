import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTextStyles {
  // Headings
  static const TextStyle h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    height: 1.2,
    letterSpacing: -0.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle h2 = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    height: 1.3,
    letterSpacing: -0.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle h3 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.3,
    letterSpacing: -0.3,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle h4 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4,
    letterSpacing: -0.2,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle h5 = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.4,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  // Body Text
  static const TextStyle body = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle bodyMedium = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w500,
    height: 1.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle bodySmall = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: AppColors.textSecondary,
    fontFamily: 'Inter',
  );
  
  // Caption & Labels
  static const TextStyle caption = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    height: 1.4,
    color: AppColors.textTertiary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle captionMedium = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.4,
    color: AppColors.textSecondary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle label = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.1,
    color: AppColors.textSecondary,
    fontFamily: 'Inter',
  );
  
  // Button Text
  static const TextStyle button = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.2,
    letterSpacing: 0.2,
    fontFamily: 'Inter',
  );
  
  static const TextStyle buttonSmall = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.2,
    letterSpacing: 0.2,
    fontFamily: 'Inter',
  );
  
  // Special Text Styles
  static const TextStyle number = TextStyle(
    fontSize: 48,
    fontWeight: FontWeight.bold,
    height: 1.1,
    letterSpacing: -1,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle numberSmall = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    height: 1.1,
    letterSpacing: -0.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  // Macro Display (for food tracking)
  static const TextStyle macroValue = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    height: 1.2,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle macroLabel = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.3,
    letterSpacing: 0.5,
    color: AppColors.textSecondary,
    fontFamily: 'Inter',
  );
  
  // Dr. Ketone Chat Styles
  static const TextStyle chatMessage = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: AppColors.textPrimary,
    fontFamily: 'Inter',
  );
  
  static const TextStyle chatTimestamp = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.normal,
    height: 1.3,
    color: AppColors.textTertiary,
    fontFamily: 'Inter',
  );
}
