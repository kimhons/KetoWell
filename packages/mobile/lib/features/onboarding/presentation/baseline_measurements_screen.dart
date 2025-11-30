import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/models/onboarding.dart';
import '../../../shared/widgets/buttons/custom_button.dart';
import '../../../shared/widgets/inputs/custom_text_input.dart';
import '../bloc/onboarding_bloc.dart';
import '../bloc/onboarding_event.dart';
import '../bloc/onboarding_state.dart';

class BaselineMeasurementsScreen extends StatefulWidget {
  const BaselineMeasurementsScreen({super.key});

  @override
  State<BaselineMeasurementsScreen> createState() =>
      _BaselineMeasurementsScreenState();
}

class _BaselineMeasurementsScreenState
    extends State<BaselineMeasurementsScreen> {
  final _weightController = TextEditingController();
  final _heightController = TextEditingController();
  final _ageController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  String _selectedGender = 'male';
  ActivityLevel _selectedActivityLevel = ActivityLevel.sedentary;

  @override
  void initState() {
    super.initState();
    // Load existing values from BLoC state
    final state = context.read<OnboardingBloc>().state;
    if (state is OnboardingInProgress) {
      _weightController.text = state.data.weight.toString();
      _heightController.text = state.data.height.toString();
      _ageController.text = state.data.age.toString();
      _selectedGender = state.data.gender;
      _selectedActivityLevel = state.data.activityLevel;
    }
  }

  @override
  void dispose() {
    _weightController.dispose();
    _heightController.dispose();
    _ageController.dispose();
    super.dispose();
  }

  void _handleContinue() {
    if (!_formKey.currentState!.validate()) return;

    final weight = double.parse(_weightController.text);
    final height = double.parse(_heightController.text);
    final age = int.parse(_ageController.text);

    // Update BLoC
    context.read<OnboardingBloc>().add(
          OnboardingMeasurementsUpdated(
            weight: weight,
            height: height,
            age: age,
            gender: _selectedGender,
            activityLevel: _selectedActivityLevel,
          ),
        );

    // Navigate to initial ketone reading
    Navigator.of(context).pushNamed('/onboarding/initial-ketones');
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
          'Step 7 of 10',
          style: AppTextStyles.caption.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
      ),
      body: BlocBuilder<OnboardingBloc, OnboardingState>(
        builder: (context, state) {
          return SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Progress indicator
                    LinearProgressIndicator(
                      value: 7 / 10,
                      backgroundColor: AppColors.border,
                      valueColor:
                          AlwaysStoppedAnimation<Color>(AppColors.primary),
                    ),
                    const SizedBox(height: 32),
                    // Title
                    Text(
                      'Baseline Measurements',
                      style: AppTextStyles.h2.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Help us calculate your personalized macros and track your progress.',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 32),
                    // Weight input
                    Text(
                      'Current Weight',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _weightController,
                      hint: 'Enter your weight',
                      type: TextInputType.number,
                      prefixIcon: Icons.monitor_weight_outlined,
                      suffixText: 'kg',
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your weight';
                        }
                        final weight = double.tryParse(value);
                        if (weight == null || weight <= 0 || weight > 300) {
                          return 'Please enter a valid weight (1-300 kg)';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    // Height input
                    Text(
                      'Height',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _heightController,
                      hint: 'Enter your height',
                      type: TextInputType.number,
                      prefixIcon: Icons.height_outlined,
                      suffixText: 'cm',
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your height';
                        }
                        final height = double.tryParse(value);
                        if (height == null || height <= 0 || height > 250) {
                          return 'Please enter a valid height (1-250 cm)';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    // Age input
                    Text(
                      'Age',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    CustomTextInput(
                      controller: _ageController,
                      hint: 'Enter your age',
                      type: TextInputType.number,
                      prefixIcon: Icons.cake_outlined,
                      suffixText: 'years',
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your age';
                        }
                        final age = int.tryParse(value);
                        if (age == null || age < 18 || age > 100) {
                          return 'Please enter a valid age (18-100)';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),
                    // Gender selection
                    Text(
                      'Gender',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: _buildGenderButton('Male', 'male', Icons.male),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child:
                              _buildGenderButton('Female', 'female', Icons.female),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    // Activity level selection
                    Text(
                      'Activity Level',
                      style: AppTextStyles.body.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ...ActivityLevel.values.map((level) {
                      return GestureDetector(
                        onTap: () {
                          setState(() {
                            _selectedActivityLevel = level;
                          });
                        },
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: _selectedActivityLevel == level
                                ? AppColors.primary.withOpacity(0.1)
                                : AppColors.surface,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: _selectedActivityLevel == level
                                  ? AppColors.primary
                                  : AppColors.border,
                              width: _selectedActivityLevel == level ? 2 : 1,
                            ),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 20,
                                height: 20,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: _selectedActivityLevel == level
                                        ? AppColors.primary
                                        : AppColors.border,
                                    width: 2,
                                  ),
                                  color: _selectedActivityLevel == level
                                      ? AppColors.primary
                                      : Colors.transparent,
                                ),
                                child: _selectedActivityLevel == level
                                    ? Center(
                                        child: Container(
                                          width: 8,
                                          height: 8,
                                          decoration: BoxDecoration(
                                            shape: BoxShape.circle,
                                            color: AppColors.background,
                                          ),
                                        ),
                                      )
                                    : null,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      level.displayName,
                                      style: AppTextStyles.body.copyWith(
                                        fontWeight:
                                            _selectedActivityLevel == level
                                                ? FontWeight.w600
                                                : FontWeight.normal,
                                        color: _selectedActivityLevel == level
                                            ? AppColors.primary
                                            : AppColors.textPrimary,
                                      ),
                                    ),
                                    Text(
                                      level.description,
                                      style: AppTextStyles.caption.copyWith(
                                        color: AppColors.textSecondary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                    const SizedBox(height: 32),
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
          );
        },
      ),
    );
  }

  Widget _buildGenderButton(String label, String value, IconData icon) {
    final isSelected = _selectedGender == value;
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedGender = value;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primary.withOpacity(0.1)
              : AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.primary : AppColors.border,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              size: 32,
              color: isSelected ? AppColors.primary : AppColors.textSecondary,
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: AppTextStyles.body.copyWith(
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                color: isSelected ? AppColors.primary : AppColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
