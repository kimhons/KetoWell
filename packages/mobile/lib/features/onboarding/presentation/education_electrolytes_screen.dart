import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class EducationElectrolytesScreen extends StatefulWidget {
  const EducationElectrolytesScreen({super.key});

  @override
  State<EducationElectrolytesScreen> createState() =>
      _EducationElectrolytesScreenState();
}

class _EducationElectrolytesScreenState
    extends State<EducationElectrolytesScreen> {
  bool _acknowledged = false;

  @override
  void initState() {
    super.initState();
    // Load existing acknowledgment from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _acknowledged = state.data.electrolytesAcknowledged;
    }
  }

  void _handleContinue() {
    if (!_acknowledged) {
      _showAcknowledgmentDialog();
      return;
    }

    // Update BLoC
    context.read<OnboardingBloc>().add(
          const OnboardingElectrolytesAcknowledged(),
        );

    // Navigate to keto flu education
    Navigator.of(context).pushNamed('/onboarding/education-keto-flu');
  }

  void _showAcknowledgmentDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text(
          'Please Acknowledge',
          style: AppTextStyles.h4.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        content: Text(
          'Please confirm that you understand the importance of electrolyte supplementation before continuing.',
          style: AppTextStyles.body,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              'OK',
              style: AppTextStyles.body.copyWith(
                color: AppColors.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Step 9 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Progress indicator
                LinearProgressIndicator(
                  value: 9 / 10,
                  backgroundColor: AppColors.border,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Icon
                        Center(
                          child: Container(
                            width: 80,
                            height: 80,
                            decoration: BoxDecoration(
                              color: AppColors.primary.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              Icons.water_drop_outlined,
                              size: 48,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Title
                        Text(
                          'Electrolytes Are Critical',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Proper electrolyte balance is essential for success and safety on a ketogenic diet.',
                          style: AppTextStyles.body.copyWith(
                            color: AppColors.textSecondary,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 32),
                        // Why it matters
                        _buildInfoCard(
                          icon: Icons.help_outline,
                          title: 'Why It Matters',
                          content:
                              'When you start keto, your body sheds water and electrolytes rapidly. This can cause:\n\n'
                              '• Headaches and fatigue\n'
                              '• Muscle cramps\n'
                              '• Dizziness\n'
                              '• Heart palpitations\n'
                              '• Nausea',
                          color: AppColors.info,
                        ),
                        const SizedBox(height: 16),
                        // Daily targets
                        _buildInfoCard(
                          icon: Icons.track_changes_outlined,
                          title: 'Daily Targets',
                          content:
                              '**Sodium:** 3,000-5,000 mg\n'
                              '(1-2 tsp salt per day)\n\n'
                              '**Potassium:** 3,000-4,000 mg\n'
                              '(avocados, spinach, salmon)\n\n'
                              '**Magnesium:** 300-400 mg\n'
                              '(supplement recommended)',
                          color: AppColors.success,
                        ),
                        const SizedBox(height: 16),
                        // How to get them
                        _buildInfoCard(
                          icon: Icons.restaurant_outlined,
                          title: 'How to Get Them',
                          content:
                              '• Salt your food liberally\n'
                              '• Drink bone broth daily\n'
                              '• Eat potassium-rich foods\n'
                              '• Take a magnesium supplement\n'
                              '• Consider electrolyte drinks',
                          color: AppColors.warning,
                        ),
                        const SizedBox(height: 24),
                        // Warning box
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.error.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppColors.error),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                Icons.warning_outlined,
                                color: AppColors.error,
                                size: 24,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Don\'t Skip This!',
                                      style: AppTextStyles.body.copyWith(
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.error,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      'Most people who fail on keto do so because they don\'t supplement electrolytes. This is the #1 preventable mistake.',
                                      style: AppTextStyles.caption.copyWith(
                                        color: AppColors.textPrimary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Acknowledgment checkbox
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              _acknowledged = !_acknowledged;
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: _acknowledged
                                  ? AppColors.primary.withOpacity(0.1)
                                  : AppColors.surface,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: _acknowledged
                                    ? AppColors.primary
                                    : AppColors.border,
                                width: _acknowledged ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 24,
                                  height: 24,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(6),
                                    border: Border.all(
                                      color: _acknowledged
                                          ? AppColors.primary
                                          : AppColors.border,
                                      width: 2,
                                    ),
                                    color: _acknowledged
                                        ? AppColors.primary
                                        : Colors.transparent,
                                  ),
                                  child: _acknowledged
                                      ? Icon(
                                          Icons.check,
                                          size: 16,
                                          color: AppColors.background,
                                        )
                                      : null,
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    'I understand the importance of electrolyte supplementation and will follow the daily targets',
                                    style: AppTextStyles.body.copyWith(
                                      fontWeight: _acknowledged
                                          ? FontWeight.w600
                                          : FontWeight.normal,
                                      color: _acknowledged
                                          ? AppColors.primary
                                          : AppColors.textPrimary,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Continue button
                        CustomButton(
                          text: 'Continue',
                          onPressed: _handleContinue,
                          isFullWidth: true,
                          size: ButtonSize.large,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoCard({
    required IconData icon,
    required String title,
    required String content,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 8),
              Text(
                title,
                style: AppTextStyles.body.copyWith(
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            content,
            style: AppTextStyles.caption.copyWith(
              color: AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
