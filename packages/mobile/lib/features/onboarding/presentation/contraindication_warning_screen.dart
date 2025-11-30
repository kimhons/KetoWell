import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../shared/widgets/buttons/custom_button.dart';

class ContraIndicationWarningScreen extends StatelessWidget {
  const ContraIndicationWarningScreen({super.key});

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
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // Error icon
              Center(
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    color: AppColors.error.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.error_outline,
                    size: 60,
                    color: AppColors.error,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              // Title
              Text(
                'CRITICAL CONTRAINDICATION',
                style: AppTextStyles.h2.copyWith(
                  fontWeight: FontWeight.bold,
                  color: AppColors.error,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              // Warning message
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.error.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.error, width: 2),
                ),
                child: Column(
                  children: [
                    Text(
                      'You cannot start a ketogenic diet while taking an SGLT2 inhibitor.',
                      style: AppTextStyles.h4.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Combining SGLT2 inhibitors with a ketogenic diet significantly increases the risk of euglycemic diabetic ketoacidosis (euDKA), a life-threatening condition.',
                      style: AppTextStyles.body.copyWith(
                        color: AppColors.textPrimary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              // What to do section
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
                          Icons.medical_services_outlined,
                          color: AppColors.info,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'What You Should Do:',
                          style: AppTextStyles.body.copyWith(
                            fontWeight: FontWeight.w600,
                            color: AppColors.info,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      '1. Consult your physician about switching to an alternative diabetes medication\n\n'
                      '2. Do NOT start a ketogenic diet until you have stopped taking the SGLT2 inhibitor\n\n'
                      '3. Return to KetoWell once your medication has been changed',
                      style: AppTextStyles.caption.copyWith(
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),
              // Action buttons
              CustomButton(
                text: 'Contact My Physician',
                onPressed: () {
                  // TODO: Open phone/email app
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please contact your physician directly'),
                    ),
                  );
                },
                isFullWidth: true,
                size: ButtonSize.large,
              ),
              const SizedBox(height: 12),
              CustomButton(
                text: 'Exit Onboarding',
                onPressed: () {
                  Navigator.of(context).pushNamedAndRemoveUntil(
                    '/welcome',
                    (route) => false,
                  );
                },
                variant: ButtonVariant.outline,
                isFullWidth: true,
                size: ButtonSize.large,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
