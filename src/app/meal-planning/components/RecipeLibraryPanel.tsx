'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Recipe {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  cost: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  healthConditions: string[];
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

interface RecipeLibraryPanelProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  selectedHealthCondition?: string;
  maxBudget?: number;
}

const RecipeLibraryPanel = ({
  recipes,
  onRecipeSelect,
  selectedHealthCondition,
  maxBudget,
}: RecipeLibraryPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'traditional'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      recipe.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;

    const matchesHealthCondition =
      !selectedHealthCondition ||
      recipe.healthConditions.includes(selectedHealthCondition);

    const matchesBudget = !maxBudget || recipe.cost <= maxBudget;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesHealthCondition &&
      matchesBudget
    );
  });

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(cost);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-success bg-success/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold font-heading text-card-foreground mb-4">
          Recipe Library
        </h3>

        <div className="relative mb-4">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-smooth ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-card-foreground hover:bg-muted/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="AdjustmentsHorizontalIcon" size={18} className="text-muted-foreground" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-input border border-border rounded-lg text-xs text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon name="DocumentTextIcon" size={48} className="text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              No recipes found matching your criteria
            </p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => onRecipeSelect(recipe)}
              className="w-full bg-background rounded-lg border border-border hover:border-primary hover:shadow-elevation-sm transition-smooth overflow-hidden text-left"
            >
              <div className="flex">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-muted">
                  <AppImage
                    src={recipe.image}
                    alt={recipe.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-card-foreground line-clamp-1 flex-1">
                      {recipe.name}
                    </h4>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(
                        recipe.difficulty
                      )}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs caption text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="ClockIcon" size={14} />
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="FireIcon" size={14} />
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {formatCost(recipe.cost)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="UserGroupIcon" size={14} className="text-muted-foreground" />
                      <span className="text-xs caption text-muted-foreground">
                        {recipe.servings} servings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeLibraryPanel;