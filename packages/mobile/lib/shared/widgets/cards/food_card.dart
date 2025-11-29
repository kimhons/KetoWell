import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';

/// A card component for displaying food items with macros
class FoodCard extends StatelessWidget {
  final String name;
  final String? serving;
  final int calories;
  final double protein;
  final double carbs;
  final double fat;
  final String? imageUrl;
  final String? mealType;
  final VoidCallback? onTap;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const FoodCard({
    super.key,
    required this.name,
    this.serving,
    required this.calories,
    required this.protein,
    required this.carbs,
    required this.fat,
    this.imageUrl,
    this.mealType,
    this.onTap,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.border, width: 1),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header row with meal type and actions
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (mealType != null)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: _getMealTypeColor().withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      mealType!,
                      style: AppTextStyles.caption.copyWith(
                        color: _getMealTypeColor(),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                if (mealType == null) const SizedBox.shrink(),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (onEdit != null)
                      IconButton(
                        icon: Icon(
                          Icons.edit,
                          size: 20,
                          color: AppColors.textSecondary,
                        ),
                        onPressed: onEdit,
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                      ),
                    if (onDelete != null) ...[
                      const SizedBox(width: 8),
                      IconButton(
                        icon: Icon(
                          Icons.delete,
                          size: 20,
                          color: AppColors.error,
                        ),
                        onPressed: onDelete,
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                      ),
                    ],
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            // Food name and serving
            Row(
              children: [
                if (imageUrl != null) ...[
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.network(
                      imageUrl!,
                      width: 48,
                      height: 48,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppColors.border,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(
                            Icons.restaurant,
                            color: AppColors.textSecondary,
                            size: 24,
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                ],
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: AppTextStyles.subtitle.copyWith(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      if (serving != null) ...[
                        const SizedBox(height: 4),
                        Text(
                          serving!,
                          style: AppTextStyles.caption.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            // Macros row
            Row(
              children: [
                _buildMacroChip(
                  label: 'Cal',
                  value: calories.toString(),
                  color: AppColors.primary,
                ),
                const SizedBox(width: 8),
                _buildMacroChip(
                  label: 'P',
                  value: '${protein.toStringAsFixed(1)}g',
                  color: AppColors.secondary,
                ),
                const SizedBox(width: 8),
                _buildMacroChip(
                  label: 'C',
                  value: '${carbs.toStringAsFixed(1)}g',
                  color: AppColors.warning,
                ),
                const SizedBox(width: 8),
                _buildMacroChip(
                  label: 'F',
                  value: '${fat.toStringAsFixed(1)}g',
                  color: AppColors.success,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMacroChip({
    required String label,
    required String value,
    required Color color,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            Text(
              label,
              style: AppTextStyles.caption.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              value,
              style: AppTextStyles.caption.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getMealTypeColor() {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return AppColors.warning;
      case 'lunch':
        return AppColors.success;
      case 'dinner':
        return AppColors.primary;
      case 'snack':
        return AppColors.secondary;
      default:
        return AppColors.textSecondary;
    }
  }
}
