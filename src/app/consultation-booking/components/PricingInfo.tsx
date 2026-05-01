import Icon from '@/components/ui/AppIcon';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const PricingInfo = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Standard',
      price: 15000,
      description: 'Basic nutrition consultation',
      features: [
        '30-minute consultation',
        'Basic meal plan',
        'Email follow-up support',
        'General nutrition guidance',
      ],
    },
    {
      name: 'Premium',
      price: 25000,
      description: 'Comprehensive nutrition care',
      features: [
        '60-minute consultation',
        'Personalized meal plan',
        'Weekly follow-up calls',
        'Condition-specific guidance',
        'Family nutrition planning',
      ],
      recommended: true,
    },
    {
      name: 'Emergency',
      price: 35000,
      description: 'Immediate nutrition support',
      features: [
        'Same-day consultation',
        'Priority scheduling',
        'Urgent dietary intervention',
        '24/7 emergency support',
      ],
    },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold font-heading text-card-foreground">
          Consultation Pricing
        </h3>
        <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-lg">
          <Icon name="InformationCircleIcon" size={16} className="text-accent" />
          <span className="text-xs caption text-accent">Sliding scale available</span>
        </div>
      </div>

      <div className="space-y-4">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-4 rounded-lg border transition-smooth ${
              tier.recommended
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-base font-semibold font-heading text-card-foreground">
                    {tier.name}
                  </h4>
                  {tier.recommended && (
                    <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs caption rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm caption text-muted-foreground">{tier.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold data-text text-primary">
                  {tier.price.toLocaleString()}
                </p>
                <p className="text-xs caption text-muted-foreground">RWF</p>
              </div>
            </div>

            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={16}
                    className="text-success flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm caption text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="CurrencyDollarIcon" size={20} className="text-secondary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-card-foreground mb-1">
              Sliding Scale Pricing
            </p>
            <p className="text-xs caption text-muted-foreground">
              We offer reduced rates based on income level to ensure nutrition care is
              accessible to all. Insurance partnerships available with RSSB, MMI, and Britam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;