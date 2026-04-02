'use client';

import Icon from '@/components/ui/AppIcon';

interface QuickActionsBarProps {
  onGenerateWeeklyPlan: () => void;
  onSavePlan: () => void;
  onSharePlan: () => void;
  onPrintPlan: () => void;
  hasUnsavedChanges: boolean;
}

const QuickActionsBar = ({
  onGenerateWeeklyPlan,
  onSavePlan,
  onSharePlan,
  onPrintPlan,
  hasUnsavedChanges,
}: QuickActionsBarProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onGenerateWeeklyPlan}
          className="flex-1 sm:flex-none button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth flex items-center justify-center space-x-2"
        >
          <Icon name="SparklesIcon" size={20} />
          <span>Generate Weekly Plan</span>
        </button>

        <div className="hidden sm:block w-px h-8 bg-border" />

        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <button
            onClick={onSavePlan}
            className="relative px-4 py-2 rounded-lg bg-success text-success-foreground hover:bg-success/90 transition-smooth flex items-center space-x-2"
            aria-label="Save plan"
          >
            <Icon name="BookmarkIcon" size={20} />
            <span className="hidden md:inline">Save</span>
            {hasUnsavedChanges && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full" />
            )}
          </button>

          <button
            onClick={onSharePlan}
            className="px-4 py-2 rounded-lg bg-muted text-card-foreground hover:bg-muted/80 transition-smooth flex items-center space-x-2"
            aria-label="Share plan"
          >
            <Icon name="ShareIcon" size={20} />
            <span className="hidden md:inline">Share</span>
          </button>

          <button
            onClick={onPrintPlan}
            className="px-4 py-2 rounded-lg bg-muted text-card-foreground hover:bg-muted/80 transition-smooth flex items-center space-x-2"
            aria-label="Print plan"
          >
            <Icon name="PrinterIcon" size={20} />
            <span className="hidden md:inline">Print</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <Icon name="InformationCircleIcon" size={20} className="text-muted-foreground" />
          <span className="text-xs caption text-muted-foreground hidden lg:inline">
            Drag meals to customize your weekly plan
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsBar;