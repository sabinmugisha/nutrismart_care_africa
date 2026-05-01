'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  estimatedCost: number;
  checked: boolean;
}

interface ShoppingListPanelProps {
  items: ShoppingItem[];
  onToggleItem: (itemId: string) => void;
  onGenerateList: () => void;
  onExportList: () => void;
}

const ShoppingListPanel = ({
  items,
  onToggleItem,
  onGenerateList,
  onExportList,
}: ShoppingListPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(items.map((item) => item.category))];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const checkedCount = items.filter((item) => item.checked).length;

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(cost);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      Vegetables: 'BeakerIcon',
      Fruits: 'SparklesIcon',
      Grains: 'CubeIcon',
      Proteins: 'FireIcon',
      Dairy: 'CakeIcon',
      Spices: 'StarIcon',
    };
    return iconMap[category] || 'ShoppingBagIcon';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-heading text-card-foreground">
            Shopping List
          </h3>
          <button
            onClick={onGenerateList}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            aria-label="Generate shopping list"
          >
            <Icon name="ArrowPathIcon" size={20} />
          </button>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-primary">
              {checkedCount}/{items.length} items
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${items.length > 0 ? (checkedCount / items.length) * 100 : 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs caption text-muted-foreground">Estimated Total</span>
            <span className="text-lg font-bold text-primary">{formatCost(totalCost)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center mb-4">
              No items in your shopping list yet
            </p>
            <button
              onClick={onGenerateList}
              className="button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            >
              Generate List
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-smooth text-left ${
                  item.checked
                    ? 'bg-muted border-border opacity-60' :'bg-background border-border hover:border-primary'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                    item.checked
                      ? 'bg-primary border-primary' :'border-border hover:border-primary'
                  }`}
                >
                  {item.checked && <Icon name="CheckIcon" size={14} className="text-white" />}
                </div>

                <Icon
                  name={getCategoryIcon(item.category) as any}
                  size={18}
                  className="text-muted-foreground"
                />

                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium ${
                      item.checked
                        ? 'line-through text-muted-foreground'
                        : 'text-card-foreground'
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs caption text-muted-foreground">{item.quantity}</span>
                    <span className="text-xs font-medium text-primary">
                      {formatCost(item.estimatedCost)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-border">
          <button
            onClick={onExportList}
            className="w-full button-base bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="DocumentArrowDownIcon" size={20} />
            <span>Export Shopping List</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingListPanel;