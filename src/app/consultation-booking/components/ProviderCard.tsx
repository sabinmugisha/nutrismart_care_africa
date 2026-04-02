import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Provider {
  id: string;
  name: string;
  image: string;
  alt: string;
  credentials: string;
  specializations: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availability: string;
}

interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onSelect: () => void;
}

const ProviderCard = ({ provider, isSelected, onSelect }: ProviderCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full bg-card rounded-xl p-6 border transition-smooth text-left ${
        isSelected
          ? 'border-primary shadow-elevation-md'
          : 'border-primary/10 hover:border-primary/30 shadow-elevation-sm'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          <AppImage
            src={provider.image}
            alt={provider.alt}
            className="w-full h-full object-cover"
          />
          {isSelected && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="CheckIcon" size={20} className="text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold font-heading text-card-foreground">
                {provider.name}
              </h3>
              <p className="text-sm caption text-muted-foreground">{provider.credentials}</p>
            </div>
            <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded">
              <Icon name="StarIcon" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">{provider.rating}</span>
              <span className="text-xs caption text-muted-foreground">
                ({provider.reviewCount})
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs caption text-muted-foreground mb-1">Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {provider.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs caption rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="LanguageIcon" size={16} className="text-muted-foreground" />
                  <span className="text-sm caption text-muted-foreground">
                    {provider.languages.join(', ')}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
                  <span className="text-sm caption text-muted-foreground">
                    {provider.availability}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold data-text text-primary">
                  {provider.consultationFee.toLocaleString()} RWF
                </p>
                <p className="text-xs caption text-muted-foreground">per session</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProviderCard;