import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ketowell/shared/widgets/navigation/custom_app_bar.dart';

void main() {
  group('CustomAppBar', () {
    testWidgets('should render app bar with title', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Dashboard',
            ),
          ),
        ),
      );

      expect(find.text('Dashboard'), findsOneWidget);
    });

    testWidgets('should render app bar with custom title widget',
        (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              titleWidget: Row(
                children: const [
                  Icon(Icons.star),
                  SizedBox(width: 8),
                  Text('Custom Title'),
                ],
              ),
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.star), findsOneWidget);
      expect(find.text('Custom Title'), findsOneWidget);
    });

    testWidgets('should show back button when showBackButton is true',
        (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Details',
              showBackButton: true,
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
    });

    testWidgets('should not show back button by default', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Home',
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.arrow_back), findsNothing);
    });

    testWidgets('should call onBackPressed when back button tapped',
        (tester) async {
      var backPressed = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Details',
              showBackButton: true,
              onBackPressed: () {
                backPressed = true;
              },
            ),
          ),
        ),
      );

      await tester.tap(find.byIcon(Icons.arrow_back));
      await tester.pump();

      expect(backPressed, isTrue);
    });

    testWidgets('should render action buttons', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Settings',
              actions: [
                IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.more_vert),
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.search), findsOneWidget);
      expect(find.byIcon(Icons.more_vert), findsOneWidget);
    });

    testWidgets('should render custom leading widget', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Profile',
              leading: IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () {},
              ),
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.menu), findsOneWidget);
    });

    testWidgets('should use custom colors', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Themed',
              backgroundColor: Colors.blue,
              foregroundColor: Colors.white,
            ),
          ),
        ),
      );

      final appBar = tester.widget<AppBar>(find.byType(AppBar));
      expect(appBar.backgroundColor, Colors.blue);
      expect(appBar.foregroundColor, Colors.white);
    });

    testWidgets('should center title by default', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Centered',
            ),
          ),
        ),
      );

      final appBar = tester.widget<AppBar>(find.byType(AppBar));
      expect(appBar.centerTitle, isTrue);
    });

    testWidgets('should allow non-centered title', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Left Aligned',
              centerTitle: false,
            ),
          ),
        ),
      );

      final appBar = tester.widget<AppBar>(find.byType(AppBar));
      expect(appBar.centerTitle, isFalse);
    });

    testWidgets('should have correct preferred size', (tester) async {
      const appBar = CustomAppBar(title: 'Test');
      expect(appBar.preferredSize.height, kToolbarHeight);
    });

    testWidgets('should set custom elevation', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Elevated',
              elevation: 4.0,
            ),
          ),
        ),
      );

      final appBar = tester.widget<AppBar>(find.byType(AppBar));
      expect(appBar.elevation, 4.0);
    });

    testWidgets('should have zero elevation by default', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            appBar: CustomAppBar(
              title: 'Flat',
            ),
          ),
        ),
      );

      final appBar = tester.widget<AppBar>(find.byType(AppBar));
      expect(appBar.elevation, 0);
    });
  });

  group('CustomSliverAppBar', () {
    testWidgets('should render sliver app bar with title', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Profile',
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.text('Profile'), findsOneWidget);
    });

    testWidgets('should show back button when showBackButton is true',
        (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Details',
                  showBackButton: true,
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.byIcon(Icons.arrow_back), findsOneWidget);
    });

    testWidgets('should render flexible space', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                CustomSliverAppBar(
                  title: 'Profile',
                  flexibleSpace: Container(
                    color: Colors.blue,
                    child: const Center(
                      child: Text('Flexible Content'),
                    ),
                  ),
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      expect(find.text('Flexible Content'), findsOneWidget);
    });

    testWidgets('should be pinned by default', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Pinned',
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      final sliverAppBar =
          tester.widget<SliverAppBar>(find.byType(SliverAppBar));
      expect(sliverAppBar.pinned, isTrue);
    });

    testWidgets('should not float by default', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Not Floating',
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      final sliverAppBar =
          tester.widget<SliverAppBar>(find.byType(SliverAppBar));
      expect(sliverAppBar.floating, isFalse);
    });

    testWidgets('should have default expanded height', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Expanded',
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      final sliverAppBar =
          tester.widget<SliverAppBar>(find.byType(SliverAppBar));
      expect(sliverAppBar.expandedHeight, 200.0);
    });

    testWidgets('should allow custom expanded height', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CustomScrollView(
              slivers: [
                const CustomSliverAppBar(
                  title: 'Custom Height',
                  expandedHeight: 300.0,
                ),
                SliverList(
                  delegate: SliverChildListDelegate([
                    const SizedBox(height: 1000),
                  ]),
                ),
              ],
            ),
          ),
        ),
      );

      final sliverAppBar =
          tester.widget<SliverAppBar>(find.byType(SliverAppBar));
      expect(sliverAppBar.expandedHeight, 300.0);
    });
  });
}
