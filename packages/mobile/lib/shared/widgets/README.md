# Shared UI Components

This directory contains reusable UI components used throughout the KetoWell mobile app.

## Components

### Buttons

#### CustomButton

A versatile button component with multiple variants, sizes, and states.

**Features:**
- 4 variants: primary, secondary, outline, text
- 3 sizes: small (40px), medium (48px), large (56px)
- Loading state with spinner
- Icon support (left or right)
- Full width option
- Disabled state
- Consistent with design system

**Usage:**

```dart
// Primary button
CustomButton(
  text: 'Continue',
  onPressed: () {
    // Handle press
  },
)

// Secondary button with icon
CustomButton(
  text: 'Add Item',
  variant: ButtonVariant.secondary,
  icon: Icons.add,
  onPressed: () {},
)

// Outline button (large, full width)
CustomButton(
  text: 'Cancel',
  variant: ButtonVariant.outline,
  size: ButtonSize.large,
  isFullWidth: true,
  onPressed: () {},
)

// Loading state
CustomButton(
  text: 'Saving...',
  isLoading: true,
  onPressed: () {},
)

// Disabled button
const CustomButton(
  text: 'Disabled',
  onPressed: null,
)
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | `String` | required | Button text |
| `onPressed` | `VoidCallback?` | `null` | Callback when pressed (null = disabled) |
| `variant` | `ButtonVariant` | `primary` | Button style variant |
| `size` | `ButtonSize` | `medium` | Button size |
| `isLoading` | `bool` | `false` | Show loading spinner |
| `isFullWidth` | `bool` | `false` | Expand to full width |
| `icon` | `IconData?` | `null` | Optional icon |
| `iconRight` | `bool` | `false` | Position icon on right side |

---

### Inputs

#### CustomTextInput

A flexible text input component with validation, various input types, and consistent styling.

**Features:**
- 6 input types: text, email, password, number, phone, multiline
- Label, hint, helper text, error text
- Prefix and suffix icons
- Password visibility toggle
- Real-time validation
- Enabled/disabled/read-only states
- Keyboard type auto-selection
- Input formatters for number/phone
- Consistent with design system

**Usage:**

```dart
// Basic text input
CustomTextInput(
  label: 'Full Name',
  hint: 'Enter your full name',
  onChanged: (value) {
    // Handle change
  },
)

// Email input with validation
CustomTextInput(
  label: 'Email',
  hint: 'you@example.com',
  type: InputType.email,
  prefixIcon: Icons.email,
  validator: (value) {
    if (value == null || value.isEmpty) {
      return 'Email is required';
    }
    if (!value.contains('@')) {
      return 'Invalid email format';
    }
    return null;
  },
)

// Password input (auto-toggle visibility)
CustomTextInput(
  label: 'Password',
  hint: 'Enter your password',
  type: InputType.password,
  prefixIcon: Icons.lock,
  validator: (value) {
    if (value == null || value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return null;
  },
)

// Number input
CustomTextInput(
  label: 'Age',
  hint: 'Enter your age',
  type: InputType.number,
  prefixIcon: Icons.calendar_today,
)

// Multiline input
CustomTextInput(
  label: 'Notes',
  hint: 'Add your notes here...',
  type: InputType.multiline,
  maxLines: 5,
)

// Input with helper text
CustomTextInput(
  label: 'Username',
  hint: 'Choose a username',
  helperText: 'Only letters, numbers, and underscores',
)

// Disabled input
const CustomTextInput(
  label: 'Email',
  hint: 'user@example.com',
  enabled: false,
)

// Read-only input
const CustomTextInput(
  label: 'User ID',
  hint: '12345',
  readOnly: true,
)
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `String?` | `null` | Input label above field |
| `hint` | `String?` | `null` | Placeholder text |
| `helperText` | `String?` | `null` | Helper text below field |
| `errorText` | `String?` | `null` | Error message (overrides validator) |
| `type` | `InputType` | `text` | Input type (text, email, password, etc.) |
| `controller` | `TextEditingController?` | `null` | Text controller |
| `validator` | `String? Function(String?)?` | `null` | Validation function |
| `onChanged` | `void Function(String)?` | `null` | Called when text changes |
| `onSubmitted` | `void Function(String)?` | `null` | Called when submitted |
| `prefixIcon` | `IconData?` | `null` | Icon at start of field |
| `suffixIcon` | `IconData?` | `null` | Icon at end of field |
| `onSuffixIconPressed` | `VoidCallback?` | `null` | Callback for suffix icon |
| `enabled` | `bool` | `true` | Enable/disable input |
| `readOnly` | `bool` | `false` | Make input read-only |
| `maxLines` | `int?` | `null` | Maximum lines (multiline) |
| `maxLength` | `int?` | `null` | Maximum character length |
| `textInputAction` | `TextInputAction?` | `null` | Keyboard action button |
| `focusNode` | `FocusNode?` | `null` | Focus node |
| `autofocus` | `bool` | `false` | Auto-focus on mount |

---

## Testing

All components have comprehensive widget tests:

- **CustomButton**: 13 tests covering all variants, sizes, states, and interactions
- **CustomTextInput**: 18 tests covering all input types, validation, and states

Run tests:
```bash
flutter test test/shared/widgets/
```

---

## Design System Integration

All components use the app's design system:

- **Colors**: `AppColors` from `core/theme/app_colors.dart`
- **Typography**: `AppTextStyles` from `core/theme/app_text_styles.dart`
- **Theme**: Consistent with `AppTheme` configuration

---

## Best Practices

### Buttons

1. **Use appropriate variants:**
   - `primary`: Main actions (submit, continue, save)
   - `secondary`: Secondary actions (add, edit)
   - `outline`: Alternative actions (cancel, back)
   - `text`: Tertiary actions (skip, learn more)

2. **Show loading states:**
   ```dart
   CustomButton(
     text: isLoading ? 'Saving...' : 'Save',
     isLoading: isLoading,
     onPressed: isLoading ? null : _handleSave,
   )
   ```

3. **Use full width for mobile:**
   ```dart
   CustomButton(
     text: 'Continue',
     isFullWidth: true,
     onPressed: _handleContinue,
   )
   ```

### Text Inputs

1. **Always provide labels:**
   ```dart
   CustomTextInput(
     label: 'Email', // ✅ Good
     hint: 'you@example.com',
   )
   ```

2. **Use appropriate input types:**
   - `InputType.email` for emails
   - `InputType.password` for passwords
   - `InputType.number` for numbers
   - `InputType.phone` for phone numbers
   - `InputType.multiline` for long text

3. **Provide helpful validation:**
   ```dart
   validator: (value) {
     if (value == null || value.isEmpty) {
       return 'This field is required'; // Clear message
     }
     return null;
   }
   ```

4. **Use controllers for complex forms:**
   ```dart
   final emailController = TextEditingController();
   
   CustomTextInput(
     controller: emailController,
     label: 'Email',
   )
   ```

---

## Accessibility

Both components follow Flutter accessibility best practices:

- Proper semantic labels
- Keyboard navigation support
- Screen reader compatible
- Sufficient touch targets (minimum 48x48)
- High contrast colors
- Focus indicators

---

## Future Components

Planned components for Phase 2:

- [ ] CustomCard (stat, food, progress variants)
- [ ] LoadingState (shimmer, spinner, skeleton)
- [ ] EmptyState (no data, error, search)
- [ ] CustomChart (ring, line, bar)
- [ ] CustomBottomNav
- [ ] CustomAppBar
- [ ] CustomModal
- [ ] CustomChip
- [ ] CustomSwitch
- [ ] CustomRadio
- [ ] CustomCheckbox

---

**Last Updated**: November 28, 2025  
**Components**: 2 (Button, TextInput)  
**Tests**: 31 widget tests
