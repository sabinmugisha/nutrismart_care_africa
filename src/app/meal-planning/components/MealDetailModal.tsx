'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Meal {
  id: string;
  name: string;
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

interface MealDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToPlan: (meal: Meal) => void;
  onRemoveFromPlan?: (mealId: string) => void;
  isInPlan?: boolean;
}

const MealDetailModal = ({
  meal,
  isOpen,
  onClose,
  onAddToPlan,
  onRemoveFromPlan,
  isInPlan = false,
}: MealDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'instructions'>(
    'overview'
  );

  if (!isOpen || !meal) return null;

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

  const totalTime = meal.prepTime + meal.cookTime;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-popover rounded-xl shadow-elevation-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative h-64 overflow-hidden bg-muted">
          <AppImage
            src={meal.image}
            alt={meal.alt}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold font-heading text-popover-foreground mb-2">
                  {meal.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(
                      meal.difficulty
                    )}`}
                  >
                    {meal.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                    {meal.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-1">
                  {formatCost(meal.cost)}
                </div>
                <div className="text-xs caption text-muted-foreground">
                  per {meal.servings} servings
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="FireIcon" size={20} className="text-accent" />
                  <span className="text-xs caption text-muted-foreground">Calories</span>
                </div>
                <div className="text-xl font-bold text-card-foreground">{meal.calories}</div>
                <div className="text-xs caption text-muted-foreground">kcal</div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="ClockIcon" size={20} className="text-primary" />
                  <span className="text-xs caption text-muted-foreground">Total Time</span>
                </div>
                <div className="text-xl font-bold text-card-foreground">{totalTime}</div>
                <div className="text-xs caption text-muted-foreground">minutes</div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="UserGroupIcon" size={20} className="text-secondary" />
                  <span className="text-xs caption text-muted-foreground">Servings</span>
                </div>
                <div className="text-xl font-bold text-card-foreground">{meal.servings}</div>
                <div className="text-xs caption text-muted-foreground">people</div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="BeakerIcon" size={20} className="text-warning" />
                  <span className="text-xs caption text-muted-foreground">Protein</span>
                </div>
                <div className="text-xl font-bold text-card-foreground">{meal.protein}g</div>
                <div className="text-xs caption text-muted-foreground">per serving</div>
              </div>
            </div>

            <div className="flex space-x-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium transition-smooth ${
                  activeTab === 'overview' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-card-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 text-sm font-medium transition-smooth ${
                  activeTab === 'ingredients' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-card-foreground'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-4 py-2 text-sm font-medium transition-smooth ${
                  activeTab === 'instructions' ?'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-card-foreground'
                }`}
              >
                Instructions
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-background rounded-lg p-4 border border-border text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{meal.protein}g</div>
                      <div className="text-xs caption text-muted-foreground">Protein</div>
                    </div>
                    <div className="bg-background rounded-lg p-4 border border-border text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">{meal.carbs}g</div>
                      <div className="text-xs caption text-muted-foreground">Carbs</div>
                    </div>
                    <div className="bg-background rounded-lg p-4 border border-border text-center">
                      <div className="text-2xl font-bold text-accent mb-1">{meal.fats}g</div>
                      <div className="text-xs caption text-muted-foreground">Fats</div>
                    </div>
                  </div>
                </div>

                {meal.healthConditions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">
                      Suitable For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {meal.healthConditions.map((condition, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-success/10 text-success rounded-lg text-xs font-medium"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {meal.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted text-card-foreground rounded-lg text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-4">
                  Ingredients ({meal.ingredients.length})
                </h3>
                <ul className="space-y-3">
                  {meal.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border"
                    >
                      <Icon name="CheckCircleIcon" size={20} className="text-success mt-0.5" />
                      <span className="text-sm text-popover-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h3 className="text-lg font-semibold font-heading text-popover-foreground mb-4">
                  Cooking Instructions
                </h3>
                <ol className="space-y-4">
                  {meal.instructions.map((instruction, index) => (
                    <li key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-sm text-popover-foreground pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-card">
          <div className="flex flex-col sm:flex-row gap-3">
            {isInPlan && onRemoveFromPlan ? (
              <button
                onClick={() => {
                  onRemoveFromPlan(meal.id);
                  onClose();
                }}
                className="flex-1 button-base bg-error text-error-foreground hover:bg-error/90 transition-smooth flex items-center justify-center space-x-2"
              >
                <Icon name="TrashIcon" size={20} />
                <span>Remove from Plan</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onAddToPlan(meal);
                  onClose();
                }}
                className="flex-1 button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2"
              >
                <Icon name="PlusIcon" size={20} />
                <span>Add to Meal Plan</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 button-base bg-muted text-card-foreground hover:bg-muted/80 transition-smooth"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;