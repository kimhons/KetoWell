import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class EducationKetoFluScreen extends StatefulWidget {
  const EducationKetoFluScreen({super.key});

  @override
  State<EducationKetoFluScreen> createState() => _EducationKetoFluScreenState();
}

class _EducationKetoFluScreenState extends State<EducationKetoFluScreen> {
  bool _acknowledged = false;

  @override
  void initState() {
    super.initState();
    // Load existing acknowledgment from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _acknowledged = state.data.ketoFluAcknowledged;
    }
  }

  void _handleContinue() {
    if (!_acknowledged) {
      _showAcknowledgmentDialog();
      return;
    }

    // Update BLoC
    context.read<OnboardingBloc>().add(
          const OnboardingKetoFluAcknowledged(),
        );

    // Navigate to safety guidelines
    Navigator.of(context).pushNamed('/onboarding/education-safety');
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
          'Please confirm that you understand what to expect during the adaptation period before continuing.',
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
                              color: AppColors.warning.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              Icons.healing_outlined,
                              size: 48,
                              color: AppColors.warning,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Title
                        Text(
                          'The "Keto Flu" Is Temporary',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Understanding the adaptation period will help you push through successfully.',
                          style: AppTextStyles.body.copyWith(
                            color: AppColors.textSecondary,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 32),
                        // What it is
                        _buildInfoCard(
                          title: 'What Is It?',
                          content:
                              'The "keto flu" is a collection of symptoms some people experience during the first 3-7 days of keto. It\'s NOT actually the flu—it\'s your body adapting to using fat for fuel instead of carbs.',
                          color: AppColors.info,
                        ),
                        const SizedBox(height: 16),
                        // Common symptoms
                        _buildInfoCard(
                          title: 'Common Symptoms',
                          content:
                              '• Fatigue and low energy\n'
                              '• Headaches\n'
                              '• Brain fog\n'
                              '• Irritability\n'
                              '• Muscle cramps\n'
                              '• Nausea\n'
                              '• Difficulty sleeping',
                          color: AppColors.warning,
                        ),
                        const SizedBox(height: 16),
                        // Timeline
                        _buildInfoCard(
                          title: 'Timeline',
                          content:
                              '**Days 1-3:** Symptoms may begin\n'
                              '**Days 3-7:** Peak discomfort\n'
                              '**Week 2:** Symptoms fade\n'
                              '**Week 3-4:** Full adaptation\n'
                              '**Week 4+:** Increased energy and mental clarity',
                          color: AppColors.success,
                        ),
                        const SizedBox(height: 16),
                        // How to minimize
                        _buildInfoCard(
                          title: 'How to Minimize It',
                          content:
                              '• **Electrolytes!** (most important)\n'
                              '• Drink plenty of water\n'
                              '• Get enough sleep\n'
                              '• Don\'t restrict calories too much\n'
                              '• Light exercise only\n'
                              '• Be patient with yourself',
                          color: AppColors.primary,
                        ),
                        const SizedBox(height: 24),
                        // Encouragement box
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.success.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppColors.success),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                Icons.emoji_events_outlined,
                                color: AppColors.success,
                                size: 24,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'You Can Do This!',
                                      style: AppTextStyles.body.copyWith(
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.success,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      'The first week is the hardest, but it gets SO much better. Most people report increased energy, mental clarity, and reduced cravings by week 3-4.',
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
                                    'I understand that the adaptation period is temporary and I\'m prepared to push through',
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
          Text(
            title,
            style: AppTextStyles.body.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 8),
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
