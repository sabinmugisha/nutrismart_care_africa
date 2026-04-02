import Icon from '@/components/ui/AppIcon';

interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

const TrustSignals = () => {
  const trustSignals: TrustSignal[] = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Certified Healthcare',
      description: 'Approved by Rwanda Ministry of Health',
    },
    {
      icon: 'UserGroupIcon',
      title: '50,000+ Users',
      description: 'Trusted across African communities',
    },
    {
      icon: 'LockClosedIcon',
      title: 'Secure & Private',
      description: 'Your health data is protected',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {trustSignals.map((signal, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-card/50 rounded-lg border border-primary/10"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name={signal.icon as any} size={24} className="text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground mb-2">{signal.title}</h3>
          <p className="text-xs caption text-muted-foreground">{signal.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;