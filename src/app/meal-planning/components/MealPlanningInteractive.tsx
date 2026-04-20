'use client';

import { useState, useEffect } from 'react';
import WeeklyCalendarGrid from './WeeklyCalendarGrid';
import RecipeLibraryPanel from './RecipeLibraryPanel';
import MealDetailModal from './MealDetailModal';
import WeeklySummaryCard from './WeeklySummaryCard';
import ShoppingListPanel from './ShoppingListPanel';
import QuickActionsBar from './QuickActionsBar';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image: string;
  alt: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  cost: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  healthConditions: string[];
  tags: string[];
}

interface DayMeals {
  date: string;
  dayName: string;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
    snack?: Meal;
  };
}

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  estimatedCost: number;
  checked: boolean;
}

const MealPlanningInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [weekData, setWeekData] = useState<DayMeals[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const mockWeekData: DayMeals[] = [
      {
        date: '20/01/2026',
        dayName: 'Monday',
        meals: {
          breakfast: {
            id: 'meal-1',
            name: 'Isombe with Cassava',
            type: 'breakfast',
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            alt: 'Traditional Rwandan isombe dish with mashed cassava leaves and peanut sauce served in white bowl',
            category: 'traditional',
            calories: 420,
            protein: 18,
            carbs: 52,
            fats: 15,
            prepTime: 20,
            cookTime: 45,
            servings: 4,
            cost: 3500,
            difficulty: 'Medium',
            ingredients: [
              '500g cassava leaves (isombe)',
              '200g peanut butter',
              '2 onions, chopped',
              '3 tomatoes, diced',
              '2 cloves garlic',
              '1 cup water',
              'Salt to taste',
            ],
            instructions: [
              'Wash and finely chop the cassava leaves',
              'Boil the leaves in water for 30 minutes until tender',
              'In a separate pan, sauté onions and garlic until golden',
              'Add tomatoes and cook until soft',
              'Mix in peanut butter and water to create a smooth sauce',
              'Add the boiled cassava leaves to the sauce',
              'Simmer for 15 minutes, stirring occasionally',
              'Season with salt and serve hot with ugali or rice',
            ],
            healthConditions: ['Diabetes-friendly', 'Heart-healthy', 'High-protein'],
            tags: ['traditional', 'vegetarian', 'nutritious', 'local'],
          },
          lunch: {
            id: 'meal-2',
            name: 'Grilled Tilapia with Vegetables',
            type: 'lunch',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
            alt: 'Grilled whole tilapia fish with colorful roasted vegetables including carrots, bell peppers, and green beans on white plate',
            category: 'lunch',
            calories: 380,
            protein: 35,
            carbs: 28,
            fats: 12,
            prepTime: 15,
            cookTime: 25,
            servings: 2,
            cost: 4200,
            difficulty: 'Easy',
            ingredients: [
              '2 whole tilapia fish, cleaned',
              '2 carrots, sliced',
              '1 bell pepper, sliced',
              '200g green beans',
              '2 tbsp olive oil',
              'Lemon juice',
              'Fresh herbs (parsley, thyme)',
              'Salt and pepper',
            ],
            instructions: [
              'Season tilapia with salt, pepper, and lemon juice',
              'Let marinate for 10 minutes',
              'Heat grill or pan to medium-high heat',
              'Grill fish for 5-7 minutes per side until cooked through',
              'Meanwhile, steam or sauté vegetables with olive oil',
              'Season vegetables with herbs, salt, and pepper',
              'Serve grilled fish with vegetables on the side',
              'Garnish with fresh lemon wedges',
            ],
            healthConditions: ['Heart-healthy', 'Low-carb', 'High-protein'],
            tags: ['fish', 'healthy', 'quick', 'protein-rich'],
          },
        },
      },
      {
        date: '21/01/2026',
        dayName: 'Tuesday',
        meals: {
          breakfast: {
            id: 'meal-3',
            name: 'Banana Porridge with Groundnuts',
            type: 'breakfast',
            image: 'https://images.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg',
            alt: 'Creamy banana porridge topped with crushed groundnuts and honey in ceramic bowl',
            category: 'breakfast',
            calories: 340,
            protein: 12,
            carbs: 58,
            fats: 8,
            prepTime: 5,
            cookTime: 15,
            servings: 2,
            cost: 1800,
            difficulty: 'Easy',
            ingredients: [
              '3 ripe bananas',
              '2 cups milk',
              '1/2 cup groundnuts, crushed',
              '2 tbsp honey',
              '1/4 tsp cinnamon',
              'Pinch of salt',
            ],
            instructions: [
              'Mash bananas in a pot',
              'Add milk and bring to a gentle simmer',
              'Stir continuously for 10 minutes until thick',
              'Add cinnamon and salt',
              'Serve hot topped with crushed groundnuts',
              'Drizzle with honey before serving',
            ],
            healthConditions: ['Energy-boosting', 'Kid-friendly'],
            tags: ['breakfast', 'quick', 'affordable', 'sweet'],
          },
          dinner: {
            id: 'meal-4',
            name: 'Beef Stew with Sweet Potatoes',
            type: 'dinner',
            image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg',
            alt: 'Rich beef stew with chunks of orange sweet potatoes and carrots in dark brown gravy',
            category: 'dinner',
            calories: 480,
            protein: 32,
            carbs: 45,
            fats: 18,
            prepTime: 20,
            cookTime: 60,
            servings: 6,
            cost: 6500,
            difficulty: 'Medium',
            ingredients: [
              '800g beef, cubed',
              '3 large sweet potatoes, cubed',
              '2 onions, chopped',
              '4 tomatoes, diced',
              '2 carrots, sliced',
              '3 cloves garlic',
              '2 cups beef broth',
              'Spices (paprika, cumin, bay leaves)',
              'Salt and pepper',
            ],
            instructions: [
              'Brown beef cubes in a large pot with oil',
              'Remove beef and sauté onions and garlic',
              'Add tomatoes and cook until soft',
              'Return beef to pot with broth and spices',
              'Simmer covered for 40 minutes',
              'Add sweet potatoes and carrots',
              'Cook for another 20 minutes until vegetables are tender',
              'Adjust seasoning and serve hot',
            ],
            healthConditions: ['High-protein', 'Iron-rich'],
            tags: ['hearty', 'family-meal', 'traditional', 'filling'],
          },
        },
      },
      {
        date: '22/01/2026',
        dayName: 'Wednesday',
        meals: {},
      },
      {
        date: '23/01/2026',
        dayName: 'Thursday',
        meals: {},
      },
      {
        date: '24/01/2026',
        dayName: 'Friday',
        meals: {},
      },
      {
        date: '25/01/2026',
        dayName: 'Saturday',
        meals: {},
      },
      {
        date: '26/01/2026',
        dayName: 'Sunday',
        meals: {},
      },
    ];

    setWeekData(mockWeekData);
  }, []);

  const mockRecipes: Meal[] = [
    {
      id: 'recipe-1',
      name: 'Matoke with Beans',
      type: 'lunch',
      image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e',
      alt: 'Steamed green plantains with red kidney beans in tomato sauce on traditional wooden plate',
      category: 'traditional',
      calories: 390,
      protein: 15,
      carbs: 68,
      fats: 6,
      prepTime: 15,
      cookTime: 40,
      servings: 4,
      cost: 2800,
      difficulty: 'Easy',
      ingredients: [
        '6 green plantains (matoke)',
        '1 cup red kidney beans, cooked',
        '2 onions, chopped',
        '3 tomatoes, diced',
        '1 cup coconut milk',
        'Curry powder',
        'Salt to taste',
      ],
      instructions: [
        'Peel and cut plantains into chunks',
        'Steam plantains until tender (about 30 minutes)',
        'In a pan, sauté onions until soft',
        'Add tomatoes and curry powder, cook until sauce forms',
        'Add cooked beans and coconut milk',
        'Simmer for 10 minutes',
        'Serve beans over steamed matoke',
      ],
      healthConditions: ['Diabetes-friendly', 'High-fiber', 'Vegetarian'],
      tags: ['traditional', 'filling', 'affordable', 'local'],
    },
    {
      id: 'recipe-2',
      name: 'Chicken Brochettes',
      type: 'dinner',
      image: 'https://images.pexels.com/photos/5175532/pexels-photo-5175532.jpeg',
      alt: 'Grilled chicken skewers with bell peppers and onions on metal skewers with char marks',
      category: 'dinner',
      calories: 320,
      protein: 38,
      carbs: 12,
      fats: 14,
      prepTime: 30,
      cookTime: 15,
      servings: 4,
      cost: 5200,
      difficulty: 'Easy',
      ingredients: [
        '800g chicken breast, cubed',
        '2 bell peppers, cubed',
        '2 onions, cubed',
        '3 tbsp vegetable oil',
        '2 tbsp lemon juice',
        'Garlic powder',
        'Paprika',
        'Salt and pepper',
      ],
      instructions: [
        'Cut chicken into 2-inch cubes',
        'Mix oil, lemon juice, and spices for marinade',
        'Marinate chicken for 20 minutes',
        'Thread chicken, peppers, and onions onto skewers',
        'Grill over medium-high heat for 12-15 minutes',
        'Turn frequently until chicken is cooked through',
        'Serve hot with rice or salad',
      ],
      healthConditions: ['High-protein', 'Low-carb', 'Gluten-free'],
      tags: ['grilled', 'protein-rich', 'popular', 'party-food'],
    },
    {
      id: 'recipe-3',
      name: 'Vegetable Soup with Lentils',
      type: 'dinner',
      image: 'https://images.pixabay.com/photo/2017/06/01/18/46/cook-2364221_1280.jpg',
      alt: 'Hearty vegetable soup with red lentils, carrots, and greens in white bowl with steam rising',
      category: 'dinner',
      calories: 280,
      protein: 16,
      carbs: 42,
      fats: 5,
      prepTime: 15,
      cookTime: 35,
      servings: 6,
      cost: 2200,
      difficulty: 'Easy',
      ingredients: [
        '1 cup red lentils',
        '2 carrots, diced',
        '2 potatoes, cubed',
        '1 onion, chopped',
        '2 tomatoes, diced',
        '1 cup spinach',
        '6 cups vegetable broth',
        'Spices (cumin, turmeric)',
        'Salt and pepper',
      ],
      instructions: [
        'Rinse lentils thoroughly',
        'Sauté onions in a large pot',
        'Add carrots and potatoes, cook for 5 minutes',
        'Add tomatoes and spices',
        'Pour in broth and lentils',
        'Bring to boil, then simmer for 25 minutes',
        'Add spinach in last 5 minutes',
        'Season and serve hot',
      ],
      healthConditions: ['Heart-healthy', 'High-fiber', 'Vegetarian', 'Low-fat'],
      tags: ['soup', 'healthy', 'budget-friendly', 'warming'],
    },
    {
      id: 'recipe-4',
      name: 'Mandazi with Tea',
      type: 'snack',
      image: 'https://images.unsplash.com/photo-1612182062631-c8a0e2e8f2e2',
      alt: 'Golden fried mandazi pastries dusted with sugar on blue ceramic plate next to cup of tea',
      category: 'snack',
      calories: 220,
      protein: 5,
      carbs: 35,
      fats: 8,
      prepTime: 20,
      cookTime: 15,
      servings: 8,
      cost: 1500,
      difficulty: 'Medium',
      ingredients: [
        '3 cups all-purpose flour',
        '1/2 cup sugar',
        '1 tsp baking powder',
        '1/2 tsp cardamom',
        '1 egg',
        '1 cup coconut milk',
        'Oil for frying',
      ],
      instructions: [
        'Mix flour, sugar, baking powder, and cardamom',
        'Beat egg with coconut milk',
        'Combine wet and dry ingredients to form dough',
        'Knead until smooth, let rest for 15 minutes',
        'Roll out dough and cut into triangles',
        'Heat oil to 350°F (175°C)',
        'Fry mandazi until golden brown on both sides',
        'Drain on paper towels and serve warm',
      ],
      healthConditions: ['Energy-boosting'],
      tags: ['snack', 'traditional', 'sweet', 'popular'],
    },
    {
      id: 'recipe-5',
      name: 'Avocado Salad',
      type: 'lunch',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      alt: 'Fresh avocado salad with cherry tomatoes, red onions, and lime dressing in glass bowl',
      category: 'lunch',
      calories: 240,
      protein: 4,
      carbs: 18,
      fats: 18,
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      cost: 2500,
      difficulty: 'Easy',
      ingredients: [
        '2 ripe avocados, cubed',
        '1 cup cherry tomatoes, halved',
        '1/2 red onion, thinly sliced',
        '1 cucumber, diced',
        'Juice of 1 lime',
        '2 tbsp olive oil',
        'Fresh cilantro',
        'Salt and pepper',
      ],
      instructions: [
        'Cut avocados into cubes',
        'Combine with tomatoes, onion, and cucumber',
        'Mix lime juice and olive oil for dressing',
        'Pour dressing over salad',
        'Toss gently to combine',
        'Garnish with fresh cilantro',
        'Serve immediately',
      ],
      healthConditions: ['Heart-healthy', 'Low-carb', 'Gluten-free', 'Vegetarian'],
      tags: ['salad', 'fresh', 'quick', 'healthy-fats'],
    },
  ];

  const calculateWeeklySummary = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCost = 0;
    let mealsPlanned = 0;

    weekData.forEach((day) => {
      Object.values(day.meals).forEach((meal) => {
        if (meal) {
          totalCalories += meal.calories;
          totalProtein += meal.protein;
          totalCarbs += meal.carbs;
          totalFats += meal.fats;
          totalCost += meal.cost;
          mealsPlanned++;
        }
      });
    });

    return {
      totalCalories,
      avgCaloriesPerDay: Math.round(totalCalories / 7),
      totalProtein,
      totalCarbs,
      totalFats,
      totalCost,
      mealsPlanned,
      totalMeals: 28,
    };
  };

  const handleMealClick = (meal: Meal, _day?: string, _mealType?: string) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const handleAddMeal = (day: string, mealType: string) => {
    console.log(`Add meal for ${day} - ${mealType}`);
  };

  const handleRecipeSelect = (recipe: Meal | { id: string; name: string; image: string; alt: string; category: string; calories: number; protein: number; carbs: number; fats: number; prepTime: number; servings: number; cost: number; difficulty: 'Easy' | 'Medium' | 'Hard'; ingredients: string[]; instructions: string[]; healthConditions: string[]; tags: string[] }) => {
    setSelectedMeal(recipe as Meal);
    setIsModalOpen(true);
  };

  const handleAddToPlan = (meal: Meal) => {
    console.log('Add to plan:', meal.name);
    setHasUnsavedChanges(true);
  };

  const handleToggleShoppingItem = (itemId: string) => {
    setShoppingItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleGenerateShoppingList = () => {
    const mockShoppingItems: ShoppingItem[] = [
      {
        id: 'item-1',
        name: 'Cassava leaves',
        quantity: '500g',
        category: 'Vegetables',
        estimatedCost: 800,
        checked: false,
      },
      {
        id: 'item-2',
        name: 'Peanut butter',
        quantity: '200g',
        category: 'Proteins',
        estimatedCost: 1200,
        checked: false,
      },
      {
        id: 'item-3',
        name: 'Tilapia fish',
        quantity: '2 whole',
        category: 'Proteins',
        estimatedCost: 4200,
        checked: false,
      },
      {
        id: 'item-4',
        name: 'Sweet potatoes',
        quantity: '3 large',
        category: 'Vegetables',
        estimatedCost: 600,
        checked: false,
      },
      {
        id: 'item-5',
        name: 'Beef',
        quantity: '800g',
        category: 'Proteins',
        estimatedCost: 5000,
        checked: false,
      },
      {
        id: 'item-6',
        name: 'Bananas',
        quantity: '6 pieces',
        category: 'Fruits',
        estimatedCost: 500,
        checked: false,
      },
      {
        id: 'item-7',
        name: 'Rice',
        quantity: '2kg',
        category: 'Grains',
        estimatedCost: 2000,
        checked: false,
      },
      {
        id: 'item-8',
        name: 'Onions',
        quantity: '1kg',
        category: 'Vegetables',
        estimatedCost: 400,
        checked: false,
      },
      {
        id: 'item-9',
        name: 'Tomatoes',
        quantity: '1kg',
        category: 'Vegetables',
        estimatedCost: 600,
        checked: false,
      },
      {
        id: 'item-10',
        name: 'Cooking oil',
        quantity: '1L',
        category: 'Spices',
        estimatedCost: 1500,
        checked: false,
      },
    ];

    setShoppingItems(mockShoppingItems);
  };

  const handleGenerateWeeklyPlan = () => {
    console.log('Generate AI-powered weekly plan');
    setHasUnsavedChanges(true);
  };

  const handleSavePlan = () => {
    console.log('Save meal plan');
    setHasUnsavedChanges(false);
  };

  const handleSharePlan = () => {
    console.log('Share meal plan');
  };

  const handlePrintPlan = () => {
    if (isHydrated && typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleExportList = () => {
    console.log('Export shopping list');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-16 bg-muted rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-muted rounded-xl" />
            <div className="h-96 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuickActionsBar
        onGenerateWeeklyPlan={handleGenerateWeeklyPlan}
        onSavePlan={handleSavePlan}
        onSharePlan={handleSharePlan}
        onPrintPlan={handlePrintPlan}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeeklyCalendarGrid
            weekData={weekData}
            onMealClick={handleMealClick}
            onAddMeal={handleAddMeal}
          />

          <WeeklySummaryCard summary={calculateWeeklySummary()} />
        </div>

        <div className="space-y-6">
          <div className="h-[500px]">
            <RecipeLibraryPanel recipes={mockRecipes} onRecipeSelect={handleRecipeSelect} />
          </div>

          <div className="h-[500px]">
            <ShoppingListPanel
              items={shoppingItems}
              onToggleItem={handleToggleShoppingItem}
              onGenerateList={handleGenerateShoppingList}
              onExportList={handleExportList}
            />
          </div>
        </div>
      </div>

      <MealDetailModal
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToPlan={handleAddToPlan}
      />
    </div>
  );
};

export default MealPlanningInteractive;