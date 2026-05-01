import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Consultation {
  id: string;
  nutritionistName: string;
  nutritionistImage: string;
  nutritionistAlt: string;
  specialty: string;
  date: string;
  time: string;
  type: 'Video Call' | 'In-Person' | 'Phone Call';
  status: 'confirmed' | 'pending' | 'rescheduled';
}

interface UpcomingConsultationsProps {
  consultations: Consultation[];
}

const UpcomingConsultations = ({ consultations }: UpcomingConsultationsProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return 'VideoCameraIcon';
      case 'In-Person':
        return 'UserGroupIcon';
      case 'Phone Call':
        return 'PhoneIcon';
      default:
        return 'CalendarIcon';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'rescheduled':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">
          Upcoming Consultations
        </h2>
        <Icon name="CalendarDaysIcon" size={24} className="text-primary" />
      </div>

      <div className="space-y-4">
        {consultations.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CalendarIcon" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No upcoming consultations</p>
            <button className="mt-4 button-base bg-primary text-primary-foreground hover:bg-primary/90">
              Book Consultation
            </button>
          </div>
        ) : (
          consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth"
            >
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={consultation.nutritionistImage}
                    alt={consultation.nutritionistAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-card-foreground">
                        {consultation.nutritionistName}
                      </h3>
                      <p className="text-xs caption text-muted-foreground">
                        {consultation.specialty}
                      </p>
                    </div>
                    <span
                      className={`text-xs caption px-2 py-1 rounded-full ${getStatusColor(
                        consultation.status
                      )}`}
                    >
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="CalendarIcon" size={16} className="text-primary" />
                      <span className="text-sm text-card-foreground">{consultation.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="ClockIcon" size={16} className="text-primary" />
                      <span className="text-sm text-card-foreground">{consultation.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={getTypeIcon(consultation.type) as any}
                        size={16}
                        className="text-primary"
                      />
                      <span className="text-sm text-card-foreground">{consultation.type}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="button-base text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                      Join Now
                    </button>
                    <button className="button-base text-sm bg-muted text-card-foreground hover:bg-muted/80">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingConsultations;