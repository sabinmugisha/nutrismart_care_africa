'use client';

import Icon from '@/components/ui/AppIcon';

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const RegistrationProgress = ({ currentStep, totalSteps, stepLabels }: RegistrationProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="CheckIcon" size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs caption text-center ${
                    isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div className="flex-1 h-1 mx-2 mt-[-24px]">
                  <div
                    className={`h-full transition-smooth ${
                      isCompleted ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-smooth"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default RegistrationProgress;