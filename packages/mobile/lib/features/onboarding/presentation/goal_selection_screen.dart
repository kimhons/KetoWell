import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/models/onboarding.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class GoalSelectionScreen extends StatefulWidget {
  const GoalSelectionScreen({super.key});

  @override
  State<GoalSelectionScreen> createState() => _GoalSelectionScreenState();
}

class _GoalSelectionScreenState extends State<GoalSelectionScreen> {
  HealthGoal? _selectedGoal;

  // Goal icons mapping
  final Map<HealthGoal, IconData> _goalIcons = {
    HealthGoal.weightLoss: Icons.monitor_weight_outlined,
    HealthGoal.diabetes: Icons.bloodtype_outlined,
    HealthGoal.epilepsy: Icons.psychology_outlined,
    HealthGoal.cancer: Icons.health_and_safety_outlined,
    HealthGoal.cognitiveHealth: Icons.lightbulb_outline,
    HealthGoal.generalWellness: Icons.favorite_outline,
  };

  @override
  void initState() {
    super.initState();
    // Load existing goal from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _selectedGoal = state.data.primaryGoal;
    }
  }

  void _handleGoalSelection(HealthGoal goal) {
    setState(() {
      _selectedGoal = goal;
    });
  }

  void _handleContinue() {
    if (_selectedGoal == null) return;

    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingGoalUpdated(goal: _selectedGoal!),
        );

    // Navigate based on goal
    if (_selectedGoal == HealthGoal.weightLoss) {
      // Navigate to target weight screen
      Navigator.of(context).pushNamed('/onboarding/target-metrics');
    } else {
      // Skip target weight for other goals
      Navigator.of(context).pushNamed('/onboarding/baseline-measurements');
    }
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
          'Step 5 of 10',
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
                  value: 5 / 10,
                  backgroundColor: AppColors.border,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // Title
                        Text(
                          'What\'s Your Primary Goal?',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Choose your main reason for starting a ketogenic diet. We\'ll personalize your experience.',
                          style: AppTextStyles.body.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Goals grid
                        Expanded(
                          child: GridView.builder(
                            gridDelegate:
                                const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 12,
                              mainAxisSpacing: 12,
                              childAspectRatio: 0.85,
                            ),
                            itemCount: HealthGoal.values.length,
                            itemBuilder: (context, index) {
                              final goal = HealthGoal.values[index];
                              final isSelected = _selectedGoal == goal;

                              return GestureDetector(
                                onTap: () => _handleGoalSelection(goal),
                                child: Container(
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: isSelected
                                        ? AppColors.primary.withOpacity(0.1)
                                        : AppColors.surface,
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(
                                      color: isSelected
                                          ? AppColors.primary
                                          : AppColors.border,
                                      width: isSelected ? 2 : 1,
                                    ),
                                  ),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      // Icon
                                      Container(
                                        width: 56,
                                        height: 56,
                                        decoration: BoxDecoration(
                                          color: isSelected
                                              ? AppColors.primary
                                              : AppColors.primary
                                                  .withOpacity(0.1),
                                          shape: BoxShape.circle,
                                        ),
                                        child: Icon(
                                          _goalIcons[goal],
                                          color: isSelected
                                              ? AppColors.background
                                              : AppColors.primary,
                                          size: 28,
                                        ),
                                      ),
                                      const SizedBox(height: 12),
                                      // Goal name
                                      Text(
                                        goal.displayName,
                                        style: AppTextStyles.body.copyWith(
                                          fontWeight: isSelected
                                              ? FontWeight.w600
                                              : FontWeight.normal,
                                          color: isSelected
                                              ? AppColors.primary
                                              : AppColors.textPrimary,
                                        ),
                                        textAlign: TextAlign.center,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const SizedBox(height: 4),
                                      // Goal description
                                      Text(
                                        goal.description,
                                        style: AppTextStyles.caption.copyWith(
                                          color: AppColors.textSecondary,
                                        ),
                                        textAlign: TextAlign.center,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Continue button
                        CustomButton(
                          text: 'Continue',
                          onPressed: _selectedGoal != null ? _handleContinue : null,
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
}
