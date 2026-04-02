import Icon from '@/components/ui/AppIcon';

interface ParticipantGroup {
  id: string;
  name: string;
  count: number;
  demographic: string;
  enrollmentDate: string;
}

interface ParticipantManagementPanelProps {
  groups: ParticipantGroup[];
  totalParticipants: number;
}

const ParticipantManagementPanel = ({
  groups,
  totalParticipants,
}: ParticipantManagementPanelProps) => {
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold font-heading text-card-foreground mb-1">
            Participant Management
          </h2>
          <p className="text-sm caption text-muted-foreground">
            Total Participants: {totalParticipants.toLocaleString()}
          </p>
        </div>
        <button className="button-base bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
          <Icon name="PlusIcon" size={20} />
          <span>Add Group</span>
        </button>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-muted transition-smooth"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon name="UserGroupIcon" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-card-foreground mb-1">{group.name}</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-sm caption text-muted-foreground">{group.demographic}</p>
                  <span className="text-xs caption text-muted-foreground">•</span>
                  <p className="text-sm caption text-muted-foreground">
                    Enrolled: {group.enrollmentDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-2xl font-bold data-text text-card-foreground">
                  {group.count.toLocaleString()}
                </p>
                <p className="text-xs caption text-muted-foreground">Participants</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-lg hover:bg-card transition-smooth"
                  aria-label="View group details"
                >
                  <Icon name="EyeIcon" size={20} className="text-muted-foreground" />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-card transition-smooth"
                  aria-label="Edit group"
                >
                  <Icon name="PencilIcon" size={20} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth">
            <Icon name="DocumentPlusIcon" size={20} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Bulk Registration</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth">
            <Icon name="ClipboardDocumentListIcon" size={20} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Group Meal Plans</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-smooth">
            <Icon name="ChartBarSquareIcon" size={20} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Progress Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantManagementPanel;