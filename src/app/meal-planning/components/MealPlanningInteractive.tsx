'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';


// ─── Helper Components ────────────────────────────────────────────────────────

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

// WeeklyCalendarGrid
interface WeeklyCalendarGridProps {
  weekData: DayMeals[];
  onMealClick: (meal: Meal, day: string, mealType: string) => void;
  onAddMeal: (day: string, mealType: string) => void;
}

const WeeklyCalendarGrid = ({ weekData, onMealClick, onAddMeal }: WeeklyCalendarGridProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const mealTypes = [
  { key: 'breakfast', label: 'Breakfast', icon: 'SunIcon', color: 'text-accent' },
  { key: 'lunch', label: 'Lunch', icon: 'ClockIcon', color: 'text-primary' },
  { key: 'dinner', label: 'Dinner', icon: 'MoonIcon', color: 'text-secondary' },
  { key: 'snack', label: 'Snack', icon: 'CakeIcon', color: 'text-warning' }];

  const formatCost = (cost: number) => new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(cost);

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left"><span className="text-sm font-semibold text-card-foreground">Meal Type</span></th>
              {weekData.map((day) =>
              <th key={day.date} className="p-4 text-center min-w-[180px]">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-card-foreground">{day.dayName}</span>
                    <span className="text-xs caption text-muted-foreground mt-1">{day.date}</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((mealType) =>
            <tr key={mealType.key} className="border-b border-border last:border-b-0">
                <td className="p-4 bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Icon name={mealType.icon as any} size={20} className={mealType.color} />
                    <span className="text-sm font-medium text-card-foreground">{mealType.label}</span>
                  </div>
                </td>
                {weekData.map((day) => {
                const meal = day.meals[mealType.key as keyof typeof day.meals];
                return (
                  <td key={`${day.date}-${mealType.key}`} className="p-2">
                      {meal ?
                    <button onClick={() => onMealClick(meal, day.date, mealType.key)} className="w-full p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth text-left">
                          <h4 className="text-sm font-medium text-card-foreground mb-2 line-clamp-1">{meal.name}</h4>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs caption text-muted-foreground"><span>{meal.calories} kcal</span><span>{meal.prepTime} min</span></div>
                            <div className="text-xs font-medium text-primary">{formatCost(meal.cost)}</div>
                          </div>
                        </button> :

                    <button onClick={() => onAddMeal(day.date, mealType.key)} className="w-full h-24 flex items-center justify-center border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-smooth">
                          <Icon name="PlusIcon" size={24} className="text-muted-foreground" />
                        </button>
                    }
                    </td>);

              })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">
        <div className="flex overflow-x-auto space-x-2 p-4 border-b border-border">
          {weekData.map((day) =>
          <button key={day.date} onClick={() => setSelectedDay(day.date)} className={`flex-shrink-0 px-4 py-2 rounded-lg transition-smooth ${selectedDay === day.date || !selectedDay && day.date === weekData[0].date ? 'bg-primary text-primary-foreground' : 'bg-muted text-card-foreground'}`}>
              <div className="text-center"><div className="text-sm font-semibold">{day.dayName}</div><div className="text-xs caption mt-1">{day.date}</div></div>
            </button>
          )}
        </div>
        <div className="p-4 space-y-4">
          {mealTypes.map((mealType) => {
            const currentDay = weekData.find((d) => d.date === selectedDay) || weekData[0];
            const meal = currentDay.meals[mealType.key as keyof typeof currentDay.meals];
            return (
              <div key={mealType.key} className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2"><Icon name={mealType.icon as any} size={20} className={mealType.color} /><span className="text-sm font-semibold text-card-foreground">{mealType.label}</span></div>
                  {!meal && <button onClick={() => onAddMeal(currentDay.date, mealType.key)} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"><Icon name="PlusIcon" size={20} /></button>}
                </div>
                {meal ?
                <button onClick={() => onMealClick(meal, currentDay.date, mealType.key)} className="w-full text-left">
                    <h4 className="text-base font-medium text-card-foreground mb-2">{meal.name}</h4>
                    <div className="flex items-center justify-between text-sm caption text-muted-foreground mb-2"><span>{meal.calories} kcal</span><span>{meal.prepTime} min</span></div>
                    <div className="text-sm font-medium text-primary">{formatCost(meal.cost)}</div>
                  </button> :

                <p className="text-sm caption text-muted-foreground text-center py-4">No meal planned</p>
                }
              </div>);

          })}
        </div>
      </div>
    </div>);

};

// MealDetailModal
interface MealDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToPlan: (meal: Meal) => void;
  onRemoveFromPlan?: (mealId: string) => void;
  isInPlan?: boolean;
}

const MealDetailModal = ({ meal, isOpen, onClose, onAddToPlan, onRemoveFromPlan, isInPlan = false }: MealDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'instructions'>('overview');
  if (!isOpen || !meal) return null;
  const formatCost = (cost: number) => new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(cost);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {case 'Easy':return 'text-success bg-success/10';case 'Medium':return 'text-warning bg-warning/10';case 'Hard':return 'text-error bg-error/10';default:return 'text-muted-foreground bg-muted';}
  };
  const totalTime = meal.prepTime + meal.cookTime;
  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-popover rounded-xl shadow-elevation-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative h-64 overflow-hidden bg-muted">
          <AppImage src={meal.image} alt={meal.alt} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-smooth" aria-label="Close modal"><Icon name="XMarkIcon" size={24} className="text-white" /></button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold font-heading text-popover-foreground mb-2">{meal.name}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>{meal.difficulty}</span>
                  <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">{meal.category}</span>
                </div>
              </div>
              <div className="text-right"><div className="text-2xl font-bold text-primary mb-1">{formatCost(meal.cost)}</div><div className="text-xs caption text-muted-foreground">per {meal.servings} servings</div></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background rounded-lg p-4 border border-border"><div className="flex items-center space-x-2 mb-2"><Icon name="FireIcon" size={20} className="text-accent" /><span className="text-xs caption text-muted-foreground">Calories</span></div><div className="text-xl font-bold text-card-foreground">{meal.calories}</div><div className="text-xs caption text-muted-foreground">kcal</div></div>
              <div className="bg-background rounded-lg p-4 border border-border"><div className="flex items-center space-x-2 mb-2"><Icon name="ClockIcon" size={20} className="text-primary" /><span className="text-xs caption text-muted-foreground">Total Time</span></div><div className="text-xl font-bold text-card-foreground">{totalTime}</div><div className="text-xs caption text-muted-foreground">minutes</div></div>
              <div className="bg-background rounded-lg p-4 border border-border"><div className="flex items-center space-x-2 mb-2"><Icon name="UserGroupIcon" size={20} className="text-secondary" /><span className="text-xs caption text-muted-foreground">Servings</span></div><div className="text-xl font-bold text-card-foreground">{meal.servings}</div><div className="text-xs caption text-muted-foreground">people</div></div>
              <div className="bg-background rounded-lg p-4 border border-border"><div className="flex items-center space-x-2 mb-2"><Icon name="BeakerIcon" size={20} className="text-warning" /><span className="text-xs caption text-muted-foreground">Protein</span></div><div className="text-xl font-bold text-card-foreground">{meal.protein}g</div><div className="text-xs caption text-muted-foreground">per serving</div></div>
            </div>
            <div className="flex space-x-2 mb-6 border-b border-border">
              {(['overview', 'ingredients', 'instructions'] as const).map((tab) =>
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium transition-smooth capitalize ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-card-foreground'}`}>{tab}</button>
              )}
            </div>
            {activeTab === 'overview' &&
            <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">Nutritional Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-background rounded-lg p-4 border border-border text-center"><div className="text-2xl font-bold text-primary mb-1">{meal.protein}g</div><div className="text-xs caption text-muted-foreground">Protein</div></div>
                    <div className="bg-background rounded-lg p-4 border border-border text-center"><div className="text-2xl font-bold text-secondary mb-1">{meal.carbs}g</div><div className="text-xs caption text-muted-foreground">Carbs</div></div>
                    <div className="bg-background rounded-lg p-4 border border-border text-center"><div className="text-2xl font-bold text-accent mb-1">{meal.fats}g</div><div className="text-xs caption text-muted-foreground">Fats</div></div>
                  </div>
                </div>
                {meal.healthConditions.length > 0 && <div><h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">Suitable For</h3><div className="flex flex-wrap gap-2">{meal.healthConditions.map((condition, index) => <span key={index} className="px-3 py-1 bg-success/10 text-success rounded-lg text-xs font-medium">{condition}</span>)}</div></div>}
                {meal.tags.length > 0 && <div><h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">Tags</h3><div className="flex flex-wrap gap-2">{meal.tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-muted text-card-foreground rounded-lg text-xs">#{tag}</span>)}</div></div>}
              </div>
            }
            {activeTab === 'ingredients' &&
            <div>
                <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-4">Ingredients ({meal.ingredients.length})</h3>
                <ul className="space-y-3">
                  {meal.ingredients.map((ingredient, index) =>
                <li key={index} className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border"><Icon name="CheckCircleIcon" size={20} className="text-success mt-0.5" /><span className="text-sm text-popover-foreground">{ingredient}</span></li>
                )}
                </ul>
              </div>
            }
            {activeTab === 'instructions' &&
            <div>
                <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-4">Cooking Instructions</h3>
                <ol className="space-y-4">
                  {meal.instructions.map((instruction, index) =>
                <li key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{index + 1}</div>
                      <p className="flex-1 text-sm text-popover-foreground pt-1">{instruction}</p>
                    </li>
                )}
                </ol>
              </div>
            }
          </div>
        </div>
        <div className="p-6 border-t border-border bg-card">
          <div className="flex flex-col sm:flex-row gap-3">
            {isInPlan && onRemoveFromPlan ?
            <button onClick={() => {onRemoveFromPlan(meal.id);onClose();}} className="flex-1 button-base bg-error text-error-foreground hover:bg-error/90 transition-smooth flex items-center justify-center space-x-2"><Icon name="TrashIcon" size={20} /><span>Remove from Plan</span></button> :

            <button onClick={() => {onAddToPlan(meal);onClose();}} className="flex-1 button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2"><Icon name="PlusIcon" size={20} /><span>Add to Meal Plan</span></button>
            }
            <button onClick={onClose} className="flex-1 button-base bg-muted text-card-foreground hover:bg-muted/80 transition-smooth">Close</button>
          </div>
        </div>
      </div>
    </div>);

};

// WeeklySummaryCard
interface NutritionSummary {
  totalCalories: number;
  avgCaloriesPerDay: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCost: number;
  mealsPlanned: number;
  totalMeals: number;
}

interface WeeklySummaryCardProps {
  summary: NutritionSummary;
}

const WeeklySummaryCard = ({ summary }: WeeklySummaryCardProps) => {
  const formatCost = (cost: number) => new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(cost);
  const completionPercentage = Math.round(summary.mealsPlanned / summary.totalMeals * 100);
  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-heading text-card-foreground">Weekly Summary</h3>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-lg font-bold text-primary">{completionPercentage}%</span></div>
      </div>
      <div className="space-y-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2"><div className="flex items-center space-x-2"><Icon name="ChartBarIcon" size={20} className="text-primary" /><span className="text-sm font-medium text-card-foreground">Plan Progress</span></div><span className="text-sm font-bold text-primary">{summary.mealsPlanned}/{summary.totalMeals}</span></div>
          <div className="w-full bg-muted rounded-full h-2"><div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${completionPercentage}%` }} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2"><Icon name="FireIcon" size={18} className="text-accent" /><span className="text-xs caption text-muted-foreground">Total Calories</span></div>
            <div className="text-xl font-bold text-card-foreground">{summary.totalCalories.toLocaleString()}</div>
            <div className="text-xs caption text-muted-foreground mt-1">~{summary.avgCaloriesPerDay} per day</div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2"><Icon name="CurrencyDollarIcon" size={18} className="text-success" /><span className="text-xs caption text-muted-foreground">Total Cost</span></div>
            <div className="text-xl font-bold text-card-foreground">{formatCost(summary.totalCost)}</div>
            <div className="text-xs caption text-muted-foreground mt-1">{formatCost(summary.totalCost / 7)} per day</div>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-3">Macronutrient Breakdown</h4>
          <div className="space-y-3">
            {[
            { label: 'Protein', value: summary.totalProtein, color: 'bg-primary', textColor: 'text-primary' },
            { label: 'Carbs', value: summary.totalCarbs, color: 'bg-secondary', textColor: 'text-secondary' },
            { label: 'Fats', value: summary.totalFats, color: 'bg-accent', textColor: 'text-accent' }].
            map(({ label, value, color, textColor }) =>
            <div key={label}>
                <div className="flex items-center justify-between mb-1"><span className="text-xs caption text-muted-foreground">{label}</span><span className={`text-xs font-medium ${textColor}`}>{value}g</span></div>
                <div className="w-full bg-muted rounded-full h-1.5"><div className={`${color} rounded-full h-1.5`} style={{ width: `${value / (summary.totalProtein + summary.totalCarbs + summary.totalFats) * 100}%` }} /></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

// ShoppingListPanel
interface ShoppingListPanelProps {
  items: ShoppingItem[];
  onToggleItem: (itemId: string) => void;
  onGenerateList: () => void;
  onExportList: () => void;
}

const ShoppingListPanel = ({ items, onToggleItem, onGenerateList, onExportList }: ShoppingListPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(items.map((item) => item.category))];
  const filteredItems = selectedCategory === 'all' ? items : items.filter((item) => item.category === selectedCategory);
  let totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const checkedCount = items.filter((item) => item.checked).length;
  const formatCost = (cost: number) => new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(cost);
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = { Vegetables: 'BeakerIcon', Fruits: 'SparklesIcon', Grains: 'CubeIcon', Proteins: 'FireIcon', Dairy: 'CakeIcon', Spices: 'StarIcon' };
    return iconMap[category] || 'ShoppingBagIcon';
  };
  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-heading text-card-foreground">Shopping List</h3>
          <button onClick={onGenerateList} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth" aria-label="Generate shopping list"><Icon name="ArrowPathIcon" size={20} /></button>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border mb-4">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Progress</span><span className="text-sm font-medium text-primary">{checkedCount}/{items.length} items</span></div>
          <div className="w-full bg-muted rounded-full h-2 mb-3"><div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${items.length > 0 ? checkedCount / items.length * 100 : 0}%` }} /></div>
          <div className="flex items-center justify-between"><span className="text-xs caption text-muted-foreground">Estimated Total</span><span className="text-lg font-bold text-primary">{formatCost(totalCost)}</span></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) =>
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-smooth ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-card-foreground hover:bg-muted/80'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 ?
        <div className="flex flex-col items-center justify-center py-12">
            <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center mb-4">No items in your shopping list yet</p>
            <button onClick={onGenerateList} className="button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2"><Icon name="DocumentArrowDownIcon" size={20} /><span>Generate List</span></button>
          </div> :

        <div className="space-y-2">
            {filteredItems.map((item) =>
          <button key={item.id} onClick={() => onToggleItem(item.id)} className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-smooth text-left ${item.checked ? 'bg-muted border-border opacity-60' : 'bg-background border-border hover:border-primary'}`}>
                <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${item.checked ? 'bg-primary border-primary' : 'border-border hover:border-primary'}`}>
                  {item.checked && <Icon name="CheckIcon" size={14} className="text-white" />}
                </div>
                <Icon name={getCategoryIcon(item.category) as any} size={18} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${item.checked ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>{item.name}</div>
                  <div className="flex items-center justify-between mt-1"><span className="text-xs caption text-muted-foreground">{item.quantity}</span><span className="text-xs font-medium text-primary">{formatCost(item.estimatedCost)}</span></div>
                </div>
              </button>
          )}
          </div>
        }
      </div>
      {items.length > 0 &&
      <div className="p-4 border-t border-border">
          <button onClick={onExportList} className="w-full button-base bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-smooth flex items-center justify-center space-x-2"><Icon name="DocumentArrowDownIcon" size={20} /><span>Export Shopping List</span></button>
        </div>
      }
    </div>);

};

// RecipeLibraryPanel
interface RecipeLibraryPanelProps {
  recipes: Meal[];
  onRecipeSelect: (recipe: Meal) => void;
  selectedHealthCondition?: string;
  maxBudget?: number;
}

const RecipeLibraryPanel = ({ recipes, onRecipeSelect, selectedHealthCondition, maxBudget }: RecipeLibraryPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'traditional'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesHealthCondition = !selectedHealthCondition || recipe.healthConditions.includes(selectedHealthCondition);
    const matchesBudget = !maxBudget || recipe.cost <= maxBudget;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesHealthCondition && matchesBudget;
  });
  const formatCost = (cost: number) => new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(cost);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {case 'Easy':return 'text-success bg-success/10';case 'Medium':return 'text-warning bg-warning/10';case 'Hard':return 'text-error bg-error/10';default:return 'text-muted-foreground bg-muted';}
  };
  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">Recipe Library</h3>
        <div className="relative mb-4">
          <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search recipes, ingredients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) =>
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-smooth ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-card-foreground hover:bg-muted/80'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="AdjustmentsHorizontalIcon" size={18} className="text-muted-foreground" />
          <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="flex-1 px-3 py-1.5 bg-input border border-border rounded-lg text-xs text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            {difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty === 'all' ? 'All Difficulties' : difficulty}</option>)}
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredRecipes.length === 0 ?
        <div className="flex flex-col items-center justify-center py-12"><Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mb-4" /><p className="text-sm text-muted-foreground text-center">No recipes found matching your criteria</p></div> :

        filteredRecipes.map((recipe) =>
        <button key={recipe.id} onClick={() => onRecipeSelect(recipe)} className="w-full bg-background rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth overflow-hidden text-left">
              <div className="flex">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-muted"><AppImage src={recipe.image} alt={recipe.alt} className="w-full h-full object-cover" /></div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-card-foreground line-clamp-1 flex-1">{recipe.name}</h4>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>{recipe.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs caption text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1"><Icon name="ClockIcon" size={14} /><span>{recipe.prepTime + recipe.cookTime} min</span></div>
                    <div className="flex items-center space-x-1"><Icon name="FireIcon" size={14} /><span>{recipe.calories} kcal</span></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">{formatCost(recipe.cost)}</span>
                    <div className="flex items-center space-x-1"><Icon name="UserGroupIcon" size={14} className="text-muted-foreground" /><span className="text-xs caption text-muted-foreground">{recipe.servings} servings</span></div>
                  </div>
                </div>
              </div>
            </button>
        )
        }
      </div>
    </div>);

};

// QuickActionsBar
interface QuickActionsBarProps {
  onGenerateWeeklyPlan: () => void;
  onSavePlan: () => void;
  onSharePlan: () => void;
  onPrintPlan: () => void;
  hasUnsavedChanges: boolean;
}

const QuickActionsBar = ({ onGenerateWeeklyPlan, onSavePlan, onSharePlan, onPrintPlan, hasUnsavedChanges }: QuickActionsBarProps) =>
<div className="bg-card rounded-xl border border-border shadow-elevation-sm p-4">
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={onGenerateWeeklyPlan} className="flex-1 sm:flex-none button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2"><Icon name="SparklesIcon" size={20} /><span>Generate Weekly Plan</span></button>
      <div className="hidden sm:block w-px h-8 bg-border" />
      <div className="flex items-center gap-2 flex-1 sm:flex-none">
        <button onClick={onSavePlan} className="relative px-4 py-2 rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-smooth flex items-center space-x-2" aria-label="Save plan">
          <Icon name="BookmarkIcon" size={20} /><span className="hidden md:inline">Save</span>
          {hasUnsavedChanges && <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full" />}
        </button>
        <button onClick={onSharePlan} className="px-4 py-2 rounded-lg bg-muted text-card-foreground hover:bg-muted/80 transition-smooth flex items-center space-x-2" aria-label="Share plan"><Icon name="ShareIcon" size={20} /><span className="hidden md:inline">Share</span></button>
        <button onClick={onPrintPlan} className="px-4 py-2 rounded-lg bg-muted text-card-foreground hover:bg-muted/80 transition-smooth flex items-center space-x-2" aria-label="Print plan"><Icon name="PrinterIcon" size={20} /><span className="hidden md:inline">Print</span></button>
      </div>
      <div className="flex items-center space-x-2 ml-auto"><Icon name="InformationCircleIcon" size={20} className="text-muted-foreground" /><span className="text-xs caption text-muted-foreground hidden lg:inline">Drag meals to customize your weekly plan</span></div>
    </div>
  </div>;


// ─── Main Interactive Component ───────────────────────────────────────────────

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
    { date: '20/01/2026', dayName: 'Monday', meals: {
        breakfast: { id: 'meal-1', name: 'Isombe with Cassava', type: 'breakfast', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad7257d2-1772379201127.png", alt: 'Traditional Rwandan isombe dish with mashed cassava leaves and peanut sauce served in white bowl', category: 'traditional', calories: 420, protein: 18, carbs: 52, fats: 15, prepTime: 20, cookTime: 45, servings: 4, cost: 3500, difficulty: 'Medium', ingredients: ['500g cassava leaves (isombe)', '200g peanut butter', '2 onions, chopped', '3 tomatoes, diced', '2 cloves garlic', '1 cup water', 'Salt to taste'], instructions: ['Wash and finely chop the cassava leaves', 'Boil the leaves in water for 30 minutes until tender', 'In a separate pan, sauté onions and garlic until golden', 'Add tomatoes and cook until soft', 'Mix in peanut butter and water to create a smooth sauce', 'Add the boiled cassava leaves to the sauce', 'Simmer for 15 minutes, stirring occasionally', 'Season with salt and serve hot with ugali or rice'], healthConditions: ['Diabetes-friendly', 'Heart-healthy', 'High-protein'], tags: ['traditional', 'vegetarian', 'nutritious', 'local'] },
        lunch: { id: 'meal-2', name: 'Grilled Tilapia with Vegetables', type: 'lunch', image: "https://img.rocket.new/generatedImages/rocket_gen_img_12152aae6-1772899299848.png", alt: 'Grilled whole tilapia fish with colorful roasted vegetables including carrots, bell peppers, and green beans on white plate', category: 'lunch', calories: 380, protein: 35, carbs: 28, fats: 12, prepTime: 15, cookTime: 25, servings: 2, cost: 4200, difficulty: 'Easy', ingredients: ['2 whole tilapia fish, cleaned', '2 carrots, sliced', '1 bell pepper, sliced', '200g green beans', '2 tbsp olive oil', 'Lemon juice', 'Fresh herbs (parsley, thyme)', 'Salt and pepper'], instructions: ['Season tilapia with salt, pepper, and lemon juice', 'Let marinate for 10 minutes', 'Heat grill or pan to medium-high heat', 'Grill fish for 5-7 minutes per side until cooked through', 'Meanwhile, steam or sauté vegetables with olive oil', 'Season vegetables with herbs, salt, and pepper', 'Serve grilled fish with vegetables on the side', 'Garnish with fresh lemon wedges'], healthConditions: ['Heart-healthy', 'Low-carb', 'High-protein'], tags: ['fish', 'healthy', 'quick', 'protein-rich'] }
      } },
    { date: '21/01/2026', dayName: 'Tuesday', meals: {
        breakfast: { id: 'meal-3', name: 'Banana Porridge with Groundnuts', type: 'breakfast', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1007476ad-1771439642416.png", alt: 'Creamy banana porridge topped with crushed groundnuts and honey in ceramic bowl', category: 'breakfast', calories: 340, protein: 12, carbs: 58, fats: 8, prepTime: 5, cookTime: 15, servings: 2, cost: 1800, difficulty: 'Easy', ingredients: ['3 ripe bananas', '2 cups milk', '1/2 cup groundnuts, crushed', '2 tbsp honey', '1/4 tsp cinnamon', 'Pinch of salt'], instructions: ['Mash bananas in a pot', 'Add milk and bring to a gentle simmer', 'Stir continuously for 10 minutes until thick', 'Add cinnamon and salt', 'Serve hot topped with crushed groundnuts', 'Drizzle with honey before serving'], healthConditions: ['Energy-boosting', 'Kid-friendly'], tags: ['breakfast', 'quick', 'affordable', 'sweet'] },
        dinner: { id: 'meal-4', name: 'Beef Stew with Sweet Potatoes', type: 'dinner', image: "https://images.unsplash.com/photo-1631172936563-4bdd7ca7696c", alt: 'Rich beef stew with chunks of orange sweet potatoes and carrots in dark brown gravy', category: 'dinner', calories: 480, protein: 32, carbs: 45, fats: 18, prepTime: 20, cookTime: 60, servings: 6, cost: 6500, difficulty: 'Medium', ingredients: ['800g beef, cubed', '3 large sweet potatoes, cubed', '2 onions, chopped', '4 tomatoes, diced', '2 carrots, sliced', '3 cloves garlic', '2 cups beef broth', 'Spices (paprika, cumin, bay leaves)', 'Salt and pepper'], instructions: ['Brown beef cubes in a large pot with oil', 'Remove beef and sauté onions and garlic', 'Add tomatoes and cook until soft', 'Return beef to pot with broth and spices', 'Simmer covered for 40 minutes', 'Add sweet potatoes and carrots', 'Cook for another 20 minutes until vegetables are tender', 'Adjust seasoning and serve hot'], healthConditions: ['High-protein', 'Iron-rich'], tags: ['hearty', 'family-meal', 'traditional', 'filling'] }
      } },
    { date: '22/01/2026', dayName: 'Wednesday', meals: {} },
    { date: '23/01/2026', dayName: 'Thursday', meals: {} },
    { date: '24/01/2026', dayName: 'Friday', meals: {} },
    { date: '25/01/2026', dayName: 'Saturday', meals: {} },
    { date: '26/01/2026', dayName: 'Sunday', meals: {} }];

    setWeekData(mockWeekData);
  }, []);

  const mockRecipes: Meal[] = [
  { id: 'recipe-1', name: 'Matoke with Beans', type: 'lunch', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e50f7f5a-1772818698896.png", alt: 'Steamed green plantains with red kidney beans in tomato sauce on traditional wooden plate', category: 'traditional', calories: 390, protein: 15, carbs: 68, fats: 6, prepTime: 15, cookTime: 40, servings: 4, cost: 2800, difficulty: 'Easy', ingredients: ['6 green plantains (matoke)', '1 cup red kidney beans, cooked', '2 onions, chopped', '3 tomatoes, diced', '1 cup coconut milk', 'Curry powder', 'Salt to taste'], instructions: ['Peel and cut plantains into chunks', 'Steam plantains until tender (about 30 minutes)', 'In a pan, sauté onions until soft', 'Add tomatoes and curry powder, cook until sauce forms', 'Add cooked beans and coconut milk', 'Simmer for 10 minutes', 'Serve beans over steamed matoke'], healthConditions: ['Diabetes-friendly', 'High-fiber', 'Vegetarian'], tags: ['traditional', 'filling', 'affordable', 'local'] },
  { id: 'recipe-2', name: 'Chicken Brochettes', type: 'dinner', image: "https://images.unsplash.com/photo-1626323109252-0adb3b46692b", alt: 'Grilled chicken skewers with bell peppers and onions on metal skewers with char marks', category: 'dinner', calories: 320, protein: 38, carbs: 12, fats: 14, prepTime: 30, cookTime: 15, servings: 4, cost: 5200, difficulty: 'Easy', ingredients: ['800g chicken breast, cubed', '2 bell peppers, cubed', '2 onions, cubed', '3 tbsp vegetable oil', '2 tbsp lemon juice', 'Garlic powder', 'Paprika', 'Salt and pepper'], instructions: ['Cut chicken into 2-inch cubes', 'Mix oil, lemon juice, and spices for marinade', 'Marinate chicken for 20 minutes', 'Thread chicken, peppers, and onions onto skewers', 'Grill over medium-high heat for 12-15 minutes', 'Turn frequently until chicken is cooked through', 'Serve hot with rice or salad'], healthConditions: ['High-protein', 'Low-carb', 'Gluten-free'], tags: ['grilled', 'protein-rich', 'popular', 'party-food'] },
  { id: 'recipe-3', name: 'Vegetable Soup with Lentils', type: 'dinner', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f387b8b3-1772308582819.png", alt: 'Hearty vegetable soup with red lentils, carrots, and greens in white bowl with steam rising', category: 'dinner', calories: 280, protein: 16, carbs: 42, fats: 5, prepTime: 15, cookTime: 35, servings: 6, cost: 2200, difficulty: 'Easy', ingredients: ['1 cup red lentils', '2 carrots, diced', '2 potatoes, cubed', '1 onion, chopped', '2 tomatoes, diced', '1 cup spinach', '6 cups vegetable broth', 'Spices (cumin, turmeric)', 'Salt and pepper'], instructions: ['Rinse lentils thoroughly', 'Sauté onions in a large pot', 'Add carrots and potatoes, cook for 5 minutes', 'Add tomatoes and spices', 'Pour in broth and lentils', 'Bring to boil, then simmer for 25 minutes', 'Add spinach in last 5 minutes', 'Season and serve hot'], healthConditions: ['Heart-healthy', 'High-fiber', 'Vegetarian', 'Low-fat'], tags: ['soup', 'healthy', 'budget-friendly', 'warming'] },
  { id: 'recipe-4', name: 'Mandazi with Tea', type: 'snack', image: "https://img.rocket.new/generatedImages/rocket_gen_img_15f62581d-1772948451819.png", alt: 'Golden fried mandazi pastries dusted with sugar on blue ceramic plate next to cup of tea', category: 'snack', calories: 220, protein: 5, carbs: 35, fats: 8, prepTime: 20, cookTime: 15, servings: 8, cost: 1500, difficulty: 'Medium', ingredients: ['3 cups all-purpose flour', '1/2 cup sugar', '1 tsp baking powder', '1/2 tsp cardamom', '1 egg', '1 cup coconut milk', 'Oil for frying'], instructions: ['Mix flour, sugar, baking powder, and cardamom', 'Beat egg with coconut milk', 'Combine wet and dry ingredients to form dough', 'Knead until smooth, let rest for 15 minutes', 'Roll out dough and cut into triangles', 'Heat oil to 350°F (175°C)', 'Fry mandazi until golden brown on both sides', 'Drain on paper towels and serve warm'], healthConditions: ['Energy-boosting'], tags: ['snack', 'traditional', 'sweet', 'popular'] },
  { id: 'recipe-5', name: 'Avocado Salad', type: 'lunch', image: "https://images.unsplash.com/photo-1722720774271-3ca416ffdb65", alt: 'Fresh avocado salad with cherry tomatoes, red onions, and lime dressing in glass bowl', category: 'lunch', calories: 240, protein: 4, carbs: 18, fats: 18, prepTime: 10, cookTime: 0, servings: 2, cost: 2500, difficulty: 'Easy', ingredients: ['2 ripe avocados, cubed', '1 cup cherry tomatoes, halved', '1/2 red onion, thinly sliced', '1 cucumber, diced', 'Juice of 1 lime', '2 tbsp olive oil', 'Fresh cilantro', 'Salt and pepper'], instructions: ['Cut avocados into cubes', 'Combine with tomatoes, onion, and cucumber', 'Mix lime juice and olive oil for dressing', 'Pour dressing over salad', 'Toss gently to combine', 'Garnish with fresh cilantro', 'Serve immediately'], healthConditions: ['Heart-healthy', 'Low-carb', 'Gluten-free', 'Vegetarian'], tags: ['salad', 'fresh', 'quick', 'healthy-fats'] }];


  const calculateWeeklySummary = () => {
    let totalCalories = 0,totalProtein = 0,totalCarbs = 0,totalFats = 0,totalCost = 0,mealsPlanned = 0;
    weekData.forEach((day) => {
      Object.values(day.meals).forEach((meal) => {
        if (meal) {totalCalories += meal.calories;totalProtein += meal.protein;totalCarbs += meal.carbs;totalFats += meal.fats;totalCost += meal.cost;mealsPlanned++;}
      });
    });
    return { totalCalories, avgCaloriesPerDay: Math.round(totalCalories / 7), totalProtein, totalCarbs, totalFats, totalCost, mealsPlanned, totalMeals: 28 };
  };

  const handleMealClick = (meal: Meal) => {setSelectedMeal(meal);setIsModalOpen(true);};
  const handleAddMeal = (day: string, mealType: string) => {console.log(`Add meal for ${day} - ${mealType}`);};
  const handleRecipeSelect = (recipe: Meal) => {setSelectedMeal(recipe);setIsModalOpen(true);};
  const handleAddToPlan = (meal: Meal) => {console.log('Add to plan:', meal.name);setHasUnsavedChanges(true);};
  const handleToggleShoppingItem = (itemId: string) => {setShoppingItems((prev) => prev.map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item));};
  const handleGenerateShoppingList = () => {
    setShoppingItems([
    { id: 'item-1', name: 'Cassava leaves', quantity: '500g', category: 'Vegetables', estimatedCost: 800, checked: false },
    { id: 'item-2', name: 'Peanut butter', quantity: '200g', category: 'Proteins', estimatedCost: 1200, checked: false },
    { id: 'item-3', name: 'Tilapia fish', quantity: '2 whole', category: 'Proteins', estimatedCost: 4200, checked: false },
    { id: 'item-4', name: 'Sweet potatoes', quantity: '3 large', category: 'Vegetables', estimatedCost: 600, checked: false },
    { id: 'item-5', name: 'Beef', quantity: '800g', category: 'Proteins', estimatedCost: 5000, checked: false },
    { id: 'item-6', name: 'Bananas', quantity: '6 pieces', category: 'Fruits', estimatedCost: 500, checked: false },
    { id: 'item-7', name: 'Rice', quantity: '2kg', category: 'Grains', estimatedCost: 2000, checked: false },
    { id: 'item-8', name: 'Onions', quantity: '1kg', category: 'Vegetables', estimatedCost: 400, checked: false },
    { id: 'item-9', name: 'Tomatoes', quantity: '1kg', category: 'Vegetables', estimatedCost: 600, checked: false },
    { id: 'item-10', name: 'Cooking oil', quantity: '1L', category: 'Spices', estimatedCost: 1500, checked: false }]
    );
  };
  const handleGenerateWeeklyPlan = () => {console.log('Generate AI-powered weekly plan');setHasUnsavedChanges(true);};
  const handleSavePlan = () => {console.log('Save meal plan');setHasUnsavedChanges(false);};
  const handleSharePlan = () => {console.log('Share meal plan');};
  const handlePrintPlan = () => {if (isHydrated && typeof window !== 'undefined') window.print();};
  const handleExportList = () => {console.log('Export shopping list');};

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
      </div>);

  }

  return (
    <div className="space-y-6">
      <QuickActionsBar onGenerateWeeklyPlan={handleGenerateWeeklyPlan} onSavePlan={handleSavePlan} onSharePlan={handleSharePlan} onPrintPlan={handlePrintPlan} hasUnsavedChanges={hasUnsavedChanges} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeeklyCalendarGrid weekData={weekData} onMealClick={handleMealClick} onAddMeal={handleAddMeal} />
          <WeeklySummaryCard summary={calculateWeeklySummary()} />
        </div>
        <div className="space-y-6">
          <div className="h-[500px]"><RecipeLibraryPanel recipes={mockRecipes} onRecipeSelect={handleRecipeSelect} /></div>
          <div className="h-[500px]"><ShoppingListPanel items={shoppingItems} onToggleItem={handleToggleShoppingItem} onGenerateList={handleGenerateShoppingList} onExportList={handleExportList} /></div>
        </div>
      </div>
      <MealDetailModal meal={selectedMeal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddToPlan={handleAddToPlan} />
    </div>);

};

export default MealPlanningInteractive;