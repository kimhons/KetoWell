import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/widgets/cards/food_card.dart';

void main() {
  group('FoodCard', () {
    testWidgets('should render food card with name and macros',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Grilled Chicken Breast',
              serving: '100g',
              calories: 165,
              protein: 31.0,
              carbs: 0.0,
              fat: 3.6,
            ),
          ),
        ),
      );

      expect(find.text('Grilled Chicken Breast'), findsOneWidget);
      expect(find.text('100g'), findsOneWidget);
      expect(find.text('165'), findsOneWidget);
      expect(find.text('31.0g'), findsOneWidget);
      expect(find.text('0.0g'), findsOneWidget);
      expect(find.text('3.6g'), findsOneWidget);
    });

    testWidgets('should render food card without serving', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Avocado',
              calories: 160,
              protein: 2.0,
              carbs: 8.5,
              fat: 14.7,
            ),
          ),
        ),
      );

      expect(find.text('Avocado'), findsOneWidget);
      expect(find.text('160'), findsOneWidget);
    });

    testWidgets('should render meal type badge', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Scrambled Eggs',
              mealType: 'Breakfast',
              calories: 200,
              protein: 14.0,
              carbs: 2.0,
              fat: 15.0,
            ),
          ),
        ),
      );

      expect(find.text('Breakfast'), findsOneWidget);
    });

    testWidgets('should call onTap when tapped', (tester) async {
      var tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Salmon',
              calories: 200,
              protein: 20.0,
              carbs: 0.0,
              fat: 13.0,
              onTap: () {
                tapped = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byType(FoodCard));
      await tester.pump();

      expect(tapped, isTrue);
    });

    testWidgets('should call onEdit when edit button tapped', (tester) async {
      var edited = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Broccoli',
              calories: 55,
              protein: 3.7,
              carbs: 11.2,
              fat: 0.6,
              onEdit: () {
                edited = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byIcon(Icons.edit));
      await tester.pump();

      expect(edited, isTrue);
    });

    testWidgets('should call onDelete when delete button tapped',
        (tester) async {
      var deleted = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Spinach',
              calories: 23,
              protein: 2.9,
              carbs: 3.6,
              fat: 0.4,
              onDelete: () {
                deleted = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byIcon(Icons.delete));
      await tester.pump();

      expect(deleted, isTrue);
    });

    testWidgets('should not render edit button when onEdit is null',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Almonds',
              calories: 579,
              protein: 21.2,
              carbs: 21.6,
              fat: 49.9,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.edit), findsNothing);
    });

    testWidgets('should not render delete button when onDelete is null',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Walnuts',
              calories: 654,
              protein: 15.2,
              carbs: 13.7,
              fat: 65.2,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.delete), findsNothing);
    });

    testWidgets('should render macro chips with correct labels',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Greek Yogurt',
              calories: 100,
              protein: 10.0,
              carbs: 4.0,
              fat: 5.0,
            ),
          ),
        ),
      );

      expect(find.text('Cal'), findsOneWidget);
      expect(find.text('P'), findsOneWidget);
      expect(find.text('C'), findsOneWidget);
      expect(find.text('F'), findsOneWidget);
    });

    testWidgets('should format macro values with one decimal place',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: FoodCard(
              name: 'Cheese',
              calories: 402,
              protein: 24.9,
              carbs: 1.28,
              fat: 33.14,
            ),
          ),
        ),
      );

      expect(find.text('24.9g'), findsOneWidget);
      expect(find.text('1.3g'), findsOneWidget);
      expect(find.text('33.1g'), findsOneWidget);
    });

    testWidgets('should handle long food names with ellipsis',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: SizedBox(
              width: 300,
              child: FoodCard(
                name: 'This is a very long food name that should be truncated',
                calories: 100,
                protein: 10.0,
                carbs: 5.0,
                fat: 3.0,
              ),
            ),
          ),
        ),
      );

      final text = tester.widget<Text>(
        find.text(
          'This is a very long food name that should be truncated',
        ),
      );
      expect(text.maxLines, 2);
      expect(text.overflow, TextOverflow.ellipsis);
    });
  });
}
