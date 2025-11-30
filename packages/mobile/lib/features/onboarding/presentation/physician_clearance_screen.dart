import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class PhysicianClearanceScreen extends StatefulWidget {
  const PhysicianClearanceScreen({super.key});

  @override
  State<PhysicianClearanceScreen> createState() =>
      _PhysicianClearanceScreenState();
}

class _PhysicianClearanceScreenState extends State<PhysicianClearanceScreen> {
  bool _hasPhysicianClearance = false;

  @override
  void initState() {
    super.initState();
    // Load existing value from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _hasPhysicianClearance = state.data.hasPhysicianClearance;
    }
  }

  void _handleContinue() {
    if (!_hasPhysicianClearance) {
      // Show dialog explaining requirement
      _showRequirementDialog();
      return;
    }

    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingPhysicianClearanceUpdated(_hasPhysicianClearance),
        );

    // Navigate to goal setting
    Navigator.of(context).pushNamed('/onboarding/goal-selection');
  }

  void _showRequirementDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text(
          'Physician Clearance Required',
          style: AppTextStyles.h4.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        content: Text(
          'For your safety, we require physician clearance before starting a ketogenic diet, especially if you have medical conditions or take medications.\n\nPlease consult your physician and return when you have clearance.',
          style: AppTextStyles.body,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              'I Understand',
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
          'Step 4 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Progress indicator
                  LinearProgressIndicator(
                    value: 4 / 10,
                    backgroundColor: AppColors.border,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                  ),
                  const SizedBox(height: 32),
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
                        Icons.medical_services_outlined,
                        size: 48,
                        color: AppColors.primary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Title
                  Text(
                    'Physician Clearance',
                    style: AppTextStyles.h2.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Have you consulted with your physician about starting a ketogenic diet?',
                    style: AppTextStyles.body.copyWith(
                      color: AppColors.textSecondary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  // Info box
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.info.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.info),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(
                              Icons.info_outline,
                              color: AppColors.info,
                              size: 20,
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Why This Matters:',
                              style: AppTextStyles.body.copyWith(
                                fontWeight: FontWeight.w600,
                                color: AppColors.info,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          '• Ensures the diet is safe for your specific health situation\n\n'
                          '• Allows medication adjustments if needed\n\n'
                          '• Provides professional monitoring and support\n\n'
                          '• Reduces risk of complications',
                          style: AppTextStyles.caption.copyWith(
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  // Checkbox
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _hasPhysicianClearance = !_hasPhysicianClearance;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: _hasPhysicianClearance
                            ? AppColors.primary.withOpacity(0.1)
                            : AppColors.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: _hasPhysicianClearance
                              ? AppColors.primary
                              : AppColors.border,
                          width: _hasPhysicianClearance ? 2 : 1,
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
                                color: _hasPhysicianClearance
                                    ? AppColors.primary
                                    : AppColors.border,
                                width: 2,
                              ),
                              color: _hasPhysicianClearance
                                  ? AppColors.primary
                                  : Colors.transparent,
                            ),
                            child: _hasPhysicianClearance
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
                              'I have consulted with my physician and received clearance to start a ketogenic diet',
                              style: AppTextStyles.body.copyWith(
                                fontWeight: _hasPhysicianClearance
                                    ? FontWeight.w600
                                    : FontWeight.normal,
                                color: _hasPhysicianClearance
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
                  const SizedBox(height: 12),
                  // Help text
                  TextButton(
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          backgroundColor: AppColors.surface,
                          title: Text(
                            'Need Help Finding a Physician?',
                            style: AppTextStyles.h4.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          content: Text(
                            'We recommend:\n\n'
                            '1. Your primary care physician\n'
                            '2. An endocrinologist (for diabetes)\n'
                            '3. A neurologist (for epilepsy)\n'
                            '4. A registered dietitian with keto experience\n\n'
                            'You can also use our Provider Portal to find keto-friendly physicians in your area.',
                            style: AppTextStyles.body,
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.of(context).pop(),
                              child: Text(
                                'Got It',
                                style: AppTextStyles.body.copyWith(
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                    child: Text(
                      'Need help finding a physician?',
                      style: AppTextStyles.caption.copyWith(
                        color: AppColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
