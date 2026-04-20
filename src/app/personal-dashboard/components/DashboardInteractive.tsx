'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ─── Helper Components ────────────────────────────────────────────────────────

interface NutritionGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

interface NutritionGoalsCardProps {
  goals: NutritionGoal[];
}

const NutritionGoalsCard = ({ goals }: NutritionGoalsCardProps) => {
  const calculateProgress = (current: number, target: number): number => Math.min((current / target) * 100, 100);
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">Today's Nutrition Goals</h2>
        <Icon name="ChartBarIcon" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          return (
            <div key={goal.id} className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${goal.color}`}><Icon name={goal.icon as any} size={20} className="text-white" /></div>
                <span className="text-xs caption text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <h3 className="text-sm font-medium text-card-foreground mb-2">{goal.title}</h3>
              <div className="mb-2">
                <div className="flex items-baseline space-x-1"><span className="text-2xl font-bold data-text text-primary">{goal.current}</span><span className="text-sm text-muted-foreground">/ {goal.target} {goal.unit}</span></div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden"><div className={`h-full ${goal.color} transition-smooth`} style={{ width: `${progress}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface WeeklyData {
  day: string;
  calories: number;
  protein: number;
  target: number;
}

interface WeeklyProgressChartProps {
  data: WeeklyData[];
}

const WeeklyProgressChart = ({ data }: WeeklyProgressChartProps) => (
  <div className="card-base">
    <div className="flex items-center justify-between mb-6">
      <div><h2 className="text-2xl font-semibold font-heading text-card-foreground">Weekly Progress</h2><p className="text-sm caption text-muted-foreground mt-1">Your nutrition intake over the past 7 days</p></div>
    </div>
    <div className="w-full h-80" aria-label="Weekly Nutrition Progress Bar Chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 90, 39, 0.1)" />
          <XAxis dataKey="day" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
          <YAxis tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} label={{ value: 'Calories', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--color-popover)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-popover-foreground)' }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          <Bar dataKey="calories" fill="#2D5A27" name="Calories Consumed" radius={[8, 8, 0, 0]} />
          <Bar dataKey="protein" fill="#E67E22" name="Protein (g)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#8B4513" name="Target Calories" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'alert';
  icon: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

interface HealthMetricsCardProps {
  metrics: HealthMetric[];
}

const HealthMetricsCard = ({ metrics }: HealthMetricsCardProps) => {
  const getStatusColor = (status: string) => { switch (status) { case 'normal': return 'text-success'; case 'warning': return 'text-warning'; case 'alert': return 'text-error'; default: return 'text-muted-foreground'; } };
  const getStatusBg = (status: string) => { switch (status) { case 'normal': return 'bg-success/10'; case 'warning': return 'bg-warning/10'; case 'alert': return 'bg-error/10'; default: return 'bg-muted'; } };
  const getTrendIcon = (trend: string) => { switch (trend) { case 'up': return 'ArrowTrendingUpIcon'; case 'down': return 'ArrowTrendingDownIcon'; default: return 'MinusIcon'; } };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold font-heading text-card-foreground">Health Metrics</h2><Icon name="HeartIcon" size={24} className="text-error" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className={`rounded-lg p-4 border transition-smooth ${getStatusBg(metric.status)} border-border hover:shadow-elevation-md`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)} bg-background`}><Icon name={metric.icon as any} size={20} /></div>
                <div><p className="text-sm caption text-muted-foreground">{metric.label}</p><div className="flex items-baseline space-x-1 mt-1"><span className="text-2xl font-bold data-text text-card-foreground">{metric.value}</span><span className="text-sm text-muted-foreground">{metric.unit}</span></div></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2"><Icon name={getTrendIcon(metric.trend) as any} size={16} className={getStatusColor(metric.status)} /><span className={`text-xs caption ${getStatusColor(metric.status)}`}>{metric.change}</span></div>
              <span className={`text-xs caption px-2 py-1 rounded-full ${getStatusColor(metric.status)} ${getStatusBg(metric.status)}`}>{metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

interface QuickActionsPanelProps {
  actions: QuickAction[];
}

const QuickActionsPanel = ({ actions }: QuickActionsPanelProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const handleActionClick = (actionId: string) => { setSelectedAction(actionId); setTimeout(() => setSelectedAction(null), 300); };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold font-heading text-card-foreground">Quick Actions</h2><Icon name="BoltIcon" size={24} className="text-accent" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button key={action.id} onClick={() => handleActionClick(action.id)} className={`bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth text-left ${selectedAction === action.id ? 'scale-95' : 'hover:scale-105'}`}>
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}><Icon name={action.icon as any} size={24} className="text-white" /></div>
            <h3 className="text-sm font-semibold text-card-foreground mb-1">{action.title}</h3>
            <p className="text-xs caption text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  alt: string;
  ingredients: string[];
  isCompleted: boolean;
}

interface TodaysMealPlanProps {
  meals: Meal[];
  onMealComplete: (mealId: string) => void;
}

const TodaysMealPlan = ({ meals, onMealComplete }: TodaysMealPlanProps) => {
  const getMealIcon = (type: string) => { switch (type) { case 'Breakfast': return 'SunIcon'; case 'Lunch': return 'ClockIcon'; case 'Dinner': return 'MoonIcon'; case 'Snack': return 'CakeIcon'; default: return 'ClockIcon'; } };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold font-heading text-card-foreground">Today's Meal Plan</h2><Icon name="CalendarIcon" size={24} className="text-primary" /></div>
      <div className="space-y-4">
        {meals.map((meal) => (
          <div key={meal.id} className={`bg-background rounded-lg border transition-smooth ${meal.isCompleted ? 'border-success bg-success/5' : 'border-border hover:shadow-elevation-md'}`}>
            <div className="flex flex-col md:flex-row gap-4 p-4">
              <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage src={meal.image} alt={meal.alt} className="w-full h-full object-cover" />
                {meal.isCompleted && (<div className="absolute inset-0 bg-success/80 flex items-center justify-center"><Icon name="CheckCircleIcon" size={40} className="text-white" /></div>)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1"><Icon name={getMealIcon(meal.type) as any} size={18} className="text-primary" /><span className="text-xs caption text-muted-foreground">{meal.type} • {meal.time}</span></div>
                    <h3 className="text-lg font-semibold text-card-foreground">{meal.name}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center"><p className="text-xs caption text-muted-foreground mb-1">Calories</p><p className="text-sm font-semibold data-text text-primary">{meal.calories}</p></div>
                  <div className="text-center"><p className="text-xs caption text-muted-foreground mb-1">Protein</p><p className="text-sm font-semibold data-text text-accent">{meal.protein}g</p></div>
                  <div className="text-center"><p className="text-xs caption text-muted-foreground mb-1">Carbs</p><p className="text-sm font-semibold data-text text-secondary">{meal.carbs}g</p></div>
                  <div className="text-center"><p className="text-xs caption text-muted-foreground mb-1">Fats</p><p className="text-sm font-semibold data-text text-warning">{meal.fats}g</p></div>
                </div>
                <div className="mb-3">
                  <p className="text-xs caption text-muted-foreground mb-2">Key Ingredients:</p>
                  <div className="flex flex-wrap gap-2">{meal.ingredients.map((ingredient, index) => (<span key={index} className="text-xs caption px-2 py-1 bg-muted rounded-full text-card-foreground">{ingredient}</span>))}</div>
                </div>
                <button onClick={() => onMealComplete(meal.id)} disabled={meal.isCompleted} className={`button-base text-sm ${meal.isCompleted ? 'bg-success text-success-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                  {meal.isCompleted ? (<><Icon name="CheckIcon" size={16} className="mr-2" />Completed</>) : 'Mark as Eaten'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const getTypeIcon = (type: string) => { switch (type) { case 'Video Call': return 'VideoCameraIcon'; case 'In-Person': return 'UserGroupIcon'; case 'Phone Call': return 'PhoneIcon'; default: return 'CalendarIcon'; } };
  const getStatusColor = (status: string) => { switch (status) { case 'confirmed': return 'text-success bg-success/10'; case 'pending': return 'text-warning bg-warning/10'; case 'rescheduled': return 'text-accent bg-accent/10'; default: return 'text-muted-foreground bg-muted'; } };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold font-heading text-card-foreground">Upcoming Consultations</h2><Icon name="CalendarDaysIcon" size={24} className="text-primary" /></div>
      <div className="space-y-4">
        {consultations.length === 0 ? (
          <div className="text-center py-8"><Icon name="CalendarIcon" size={48} className="text-muted-foreground mx-auto mb-3" /><p className="text-sm text-muted-foreground">No upcoming consultations</p><button className="mt-4 button-base bg-primary text-primary-foreground hover:bg-primary/90">Book Consultation</button></div>
        ) : (
          consultations.map((consultation) => (
            <div key={consultation.id} className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><AppImage src={consultation.nutritionistImage} alt={consultation.nutritionistAlt} className="w-full h-full object-cover" /></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div><h3 className="text-base font-semibold text-card-foreground">{consultation.nutritionistName}</h3><p className="text-xs caption text-muted-foreground">{consultation.specialty}</p></div>
                    <span className={`text-xs caption px-2 py-1 rounded-full ${getStatusColor(consultation.status)}`}>{consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center space-x-2"><Icon name="CalendarIcon" size={16} className="text-primary" /><span className="text-sm text-card-foreground">{consultation.date}</span></div>
                    <div className="flex items-center space-x-2"><Icon name="ClockIcon" size={16} className="text-primary" /><span className="text-sm text-card-foreground">{consultation.time}</span></div>
                    <div className="flex items-center space-x-2"><Icon name={getTypeIcon(consultation.type) as any} size={16} className="text-primary" /><span className="text-sm text-card-foreground">{consultation.type}</span></div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="button-base text-sm bg-primary text-primary-foreground hover:bg-primary/90">Join Now</button>
                    <button className="button-base text-sm bg-muted text-card-foreground hover:bg-muted/80">Reschedule</button>
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

interface NutritionTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface NutritionTipsCardProps {
  tips: NutritionTip[];
}

const NutritionTipsCard = ({ tips }: NutritionTipsCardProps) => (
  <div className="card-base">
    <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-semibold font-heading text-card-foreground">Personalized Tips</h2><Icon name="LightBulbIcon" size={24} className="text-accent" /></div>
    <div className="space-y-3">
      {tips.map((tip) => (
        <div key={tip.id} className="bg-background rounded-lg p-4 border border-border hover:shadow-elevation-md transition-smooth">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${tip.color} flex-shrink-0`}><Icon name={tip.icon as any} size={20} className="text-white" /></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1"><span className="text-xs caption px-2 py-0.5 rounded bg-muted text-muted-foreground">{tip.category}</span></div>
              <h3 className="text-sm font-semibold text-card-foreground mb-1">{tip.title}</h3>
              <p className="text-xs caption text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  image: string;
  alt: string;
  healthStatus: 'good' | 'monitoring' | 'attention';
  lastUpdated: string;
}

interface FamilyMembersCardProps {
  members: FamilyMember[];
}

const FamilyMembersCard = ({ members }: FamilyMembersCardProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const getHealthStatusColor = (status: string) => { switch (status) { case 'good': return 'text-success bg-success/10'; case 'monitoring': return 'text-warning bg-warning/10'; case 'attention': return 'text-error bg-error/10'; default: return 'text-muted-foreground bg-muted'; } };
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold font-heading text-card-foreground">Family Nutrition</h2>
        <button className="button-base text-sm bg-primary text-primary-foreground hover:bg-primary/90"><Icon name="PlusIcon" size={16} className="mr-2" />Add Member</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <button key={member.id} onClick={() => setSelectedMember(member.id)} className={`bg-background rounded-lg p-4 border transition-smooth text-left ${selectedMember === member.id ? 'border-primary shadow-elevation-md' : 'border-border hover:shadow-elevation-md'}`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0"><AppImage src={member.image} alt={member.alt} className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0"><h3 className="text-sm font-semibold text-card-foreground truncate">{member.name}</h3><p className="text-xs caption text-muted-foreground">{member.relation} • {member.age} years</p></div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs caption px-2 py-1 rounded-full ${getHealthStatusColor(member.healthStatus)}`}>{member.healthStatus === 'good' ? 'Healthy' : member.healthStatus === 'monitoring' ? 'Monitoring' : 'Needs Attention'}</span>
              <span className="text-xs caption text-muted-foreground">{member.lastUpdated}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Main Interactive Component ───────────────────────────────────────────────

const MEAL_IMAGES: Record<string, { image: string; alt: string }> = {
  breakfast: { image: "https://img.rocket.new/generatedImages/rocket_gen_img_152440786-1767129340814.png", alt: 'Traditional African breakfast with white ugali, green sukuma wiki vegetables, and two fried eggs on ceramic plate' },
  lunch: { image: "https://img.rocket.new/generatedImages/rocket_gen_img_12152aae6-1772899299848.png", alt: 'Grilled whole tilapia fish with brown rice, sliced tomatoes and green vegetables on white plate' },
  snack: { image: "https://images.unsplash.com/photo-1702692534232-a165cef641e7", alt: 'Colorful fruit salad with papaya, mango, banana pieces and roasted groundnuts in glass bowl' },
  dinner: { image: "https://images.unsplash.com/photo-1735233024815-7986206a18a9", alt: 'Rich red bean stew with chunks of orange sweet potatoes in traditional ceramic bowl' },
};
const MEAL_TIMES: Record<string, string> = { breakfast: '07:00 AM', lunch: '01:00 PM', snack: '04:00 PM', dinner: '07:00 PM' };
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DashboardInteractive = () => {
  const { user } = useAuth();
  const supabase = createClient();
  const [isHydrated, setIsHydrated] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoal[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (isHydrated && user) {
      loadDashboardData();
      const channel = supabase.channel('consultations_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'consultations', filter: `patient_id=eq.${user.id}` }, () => { loadConsultations(); }).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isHydrated, user]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    await Promise.all([loadMeals(), loadNutritionGoals(), loadWeeklyProgress(), loadHealthMetrics(), loadConsultations(), loadFamilyMembers()]);
    setIsLoading(false);
  };

  const loadMeals = async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.from('meal_logs').select('*').eq('user_id', user.id).gte('logged_at', `${today}T00:00:00`).lte('logged_at', `${today}T23:59:59`).order('logged_at', { ascending: true });
    if (error) { console.log('Meals load error:', error.message); return; }
    if (data && data.length > 0) {
      setMeals(data.map((m) => ({ id: m.id, type: m.meal_type.charAt(0).toUpperCase() + m.meal_type.slice(1) as Meal['type'], name: m.meal_name, time: MEAL_TIMES[m.meal_type] || '12:00 PM', calories: m.calories || 0, protein: m.protein || 0, carbs: m.carbs || 0, fats: m.fats || 0, image: MEAL_IMAGES[m.meal_type]?.image || '', alt: MEAL_IMAGES[m.meal_type]?.alt || m.meal_name, ingredients: m.ingredients || [], isCompleted: m.is_completed || false })));
    } else {
      setMeals([
        { id: '1', type: 'Breakfast', name: 'Ugali with Sukuma Wiki and Eggs', time: '07:00 AM', calories: 450, protein: 18, carbs: 65, fats: 12, image: MEAL_IMAGES.breakfast.image, alt: MEAL_IMAGES.breakfast.alt, ingredients: ['Maize flour', 'Kale', 'Eggs', 'Tomatoes', 'Onions'], isCompleted: false },
        { id: '2', type: 'Lunch', name: 'Grilled Tilapia with Brown Rice', time: '01:00 PM', calories: 520, protein: 35, carbs: 48, fats: 18, image: MEAL_IMAGES.lunch.image, alt: MEAL_IMAGES.lunch.alt, ingredients: ['Tilapia', 'Brown rice', 'Spinach', 'Carrots', 'Lemon'], isCompleted: false },
        { id: '3', type: 'Snack', name: 'Fresh Fruit Salad with Groundnuts', time: '04:00 PM', calories: 180, protein: 6, carbs: 28, fats: 8, image: MEAL_IMAGES.snack.image, alt: MEAL_IMAGES.snack.alt, ingredients: ['Papaya', 'Mango', 'Banana', 'Groundnuts', 'Lime juice'], isCompleted: false },
        { id: '4', type: 'Dinner', name: 'Bean Stew with Sweet Potatoes', time: '07:00 PM', calories: 480, protein: 22, carbs: 72, fats: 10, image: MEAL_IMAGES.dinner.image, alt: MEAL_IMAGES.dinner.alt, ingredients: ['Red beans', 'Sweet potatoes', 'Tomatoes', 'Onions', 'Garlic'], isCompleted: false },
      ]);
    }
  };

  const loadNutritionGoals = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('nutrition_goals').select('*').eq('user_id', user.id);
    if (error) { console.log('Goals load error:', error.message); return; }
    const iconMap: Record<string, { icon: string; color: string }> = { calories: { icon: 'FireIcon', color: 'bg-primary' }, protein: { icon: 'BeakerIcon', color: 'bg-accent' }, water: { icon: 'WaterIcon', color: 'bg-secondary' }, exercise: { icon: 'BoltIcon', color: 'bg-success' } };
    if (data && data.length > 0) {
      setNutritionGoals(data.map((g) => ({ id: g.id, title: g.goal_type.charAt(0).toUpperCase() + g.goal_type.slice(1), current: Number(g.current_value) || 0, target: Number(g.target_value) || 0, unit: g.unit, icon: iconMap[g.goal_type]?.icon || 'ChartBarIcon', color: iconMap[g.goal_type]?.color || 'bg-primary' })));
    } else {
      setNutritionGoals([
        { id: '1', title: 'Calories', current: 1450, target: 2000, unit: 'kcal', icon: 'FireIcon', color: 'bg-primary' },
        { id: '2', title: 'Protein', current: 68, target: 80, unit: 'g', icon: 'BeakerIcon', color: 'bg-accent' },
        { id: '3', title: 'Water', current: 6, target: 8, unit: 'glasses', icon: 'WaterIcon', color: 'bg-secondary' },
        { id: '4', title: 'Exercise', current: 25, target: 30, unit: 'min', icon: 'BoltIcon', color: 'bg-success' },
      ]);
    }
  };

  const loadWeeklyProgress = async () => {
    if (!user) return;
    const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const { data, error } = await supabase.from('progress_tracking').select('*').eq('user_id', user.id).gte('tracked_date', sevenDaysAgo.toISOString().split('T')[0]).order('tracked_date', { ascending: true });
    if (error) { console.log('Progress load error:', error.message); return; }
    if (data && data.length > 0) { setWeeklyData(data.map((p, i) => ({ day: DAYS[i % 7], calories: p.total_calories || 0, protein: Number(p.total_protein) || 0, target: 2000 }))); }
    else { setWeeklyData([{ day: 'Mon', calories: 1850, protein: 75, target: 2000 }, { day: 'Tue', calories: 1920, protein: 82, target: 2000 }, { day: 'Wed', calories: 1780, protein: 68, target: 2000 }, { day: 'Thu', calories: 2050, protein: 88, target: 2000 }, { day: 'Fri', calories: 1890, protein: 78, target: 2000 }, { day: 'Sat', calories: 2100, protein: 92, target: 2000 }, { day: 'Sun', calories: 1950, protein: 80, target: 2000 }]); }
  };

  const loadHealthMetrics = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('health_metrics').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false });
    if (error) { console.log('Metrics load error:', error.message); return; }
    const metricConfig: Record<string, { label: string; icon: string; status: HealthMetric['status']; trend: HealthMetric['trend']; change: string }> = {
      weight: { label: 'Weight', icon: 'ScaleIcon', status: 'normal', trend: 'down', change: '-0.5 kg this week' },
      blood_pressure: { label: 'Blood Pressure', icon: 'HeartIcon', status: 'normal', trend: 'stable', change: 'Within normal range' },
      blood_sugar: { label: 'Blood Sugar', icon: 'BeakerIcon', status: 'normal', trend: 'stable', change: 'Fasting level normal' },
      bmi: { label: 'BMI', icon: 'ChartBarIcon', status: 'normal', trend: 'down', change: 'Healthy range' },
    };
    if (data && data.length > 0) {
      const seen = new Set<string>();
      const uniqueMetrics = data.filter((m) => { if (seen.has(m.metric_type)) return false; seen.add(m.metric_type); return true; });
      setHealthMetrics(uniqueMetrics.map((m) => ({ id: m.id, label: metricConfig[m.metric_type]?.label || m.metric_type, value: m.value, unit: m.unit || '', status: metricConfig[m.metric_type]?.status || 'normal', icon: metricConfig[m.metric_type]?.icon || 'ChartBarIcon', trend: metricConfig[m.metric_type]?.trend || 'stable', change: metricConfig[m.metric_type]?.change || '' })));
    } else {
      setHealthMetrics([
        { id: '1', label: 'Weight', value: '72.5', unit: 'kg', status: 'normal', icon: 'ScaleIcon', trend: 'down', change: '-0.5 kg this week' },
        { id: '2', label: 'Blood Pressure', value: '118/76', unit: 'mmHg', status: 'normal', icon: 'HeartIcon', trend: 'stable', change: 'Within normal range' },
        { id: '3', label: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', icon: 'BeakerIcon', trend: 'stable', change: 'Fasting level normal' },
        { id: '4', label: 'BMI', value: '23.8', unit: '', status: 'normal', icon: 'ChartBarIcon', trend: 'down', change: 'Healthy range' },
      ]);
    }
  };

  const loadConsultations = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('consultations').select(`*, provider:provider_id (full_name, avatar_url)`).eq('patient_id', user.id).gte('scheduled_at', new Date().toISOString()).order('scheduled_at', { ascending: true }).limit(5);
    if (error) { console.log('Consultations load error:', error.message); return; }
    const typeMap: Record<string, Consultation['type']> = { video_call: 'Video Call', in_person: 'In-Person', phone_call: 'Phone Call' };
    if (data && data.length > 0) {
      setConsultations(data.map((c) => ({ id: c.id, nutritionistName: (c.provider as any)?.full_name || 'Dr. Nutrition Expert', nutritionistImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1807508bd-1769080212556.png", nutritionistAlt: 'Professional nutritionist in medical coat', specialty: 'Nutrition & Dietetics', date: new Date(c.scheduled_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), time: new Date(c.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), type: typeMap[c.consultation_type] || 'Video Call', status: c.status as Consultation['status'] })));
    } else {
      setConsultations([{ id: '1', nutritionistName: 'Dr. Amina Uwase', nutritionistImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1823d71c5-1763299188021.png", nutritionistAlt: 'Professional African female nutritionist in white medical coat', specialty: 'Diabetes & Weight Management', date: 'Tomorrow', time: '10:00 AM', type: 'Video Call', status: 'confirmed' }]);
    }
  };

  const loadFamilyMembers = async () => {
    if (!user) return;
    const { data, error } = await supabase.from('family_members').select('*').eq('user_id', user.id).order('created_at', { ascending: true });
    if (error) { console.log('Family members load error:', error.message); return; }
    const memberImages = [
      { image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ceadbcc-1772182453068.png", alt: 'Young African girl with braided hair wearing yellow dress smiling brightly' },
      { image: "https://img.rocket.new/generatedImages/rocket_gen_img_127400d6a-1763296439452.png", alt: 'African teenage boy in blue school uniform with backpack showing confident smile' },
      { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd792b86-1773021658825.png", alt: 'Elderly African woman with gray hair wearing traditional colorful headwrap and warm smile' },
    ];
    if (data && data.length > 0) {
      setFamilyMembers(data.map((m, i) => ({ id: m.id, name: m.name, relation: m.relation, age: m.age || 0, image: memberImages[i % memberImages.length].image, alt: memberImages[i % memberImages.length].alt, healthStatus: m.health_status as FamilyMember['healthStatus'], lastUpdated: new Date(m.last_updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })));
    } else {
      setFamilyMembers([
        { id: '1', name: 'Grace Uwimana', relation: 'Daughter', age: 8, image: memberImages[0].image, alt: memberImages[0].alt, healthStatus: 'good', lastUpdated: '2 days ago' },
        { id: '2', name: 'Emmanuel Mugisha', relation: 'Son', age: 12, image: memberImages[1].image, alt: memberImages[1].alt, healthStatus: 'monitoring', lastUpdated: '1 week ago' },
        { id: '3', name: 'Marie Mukamana', relation: 'Mother', age: 58, image: memberImages[2].image, alt: memberImages[2].alt, healthStatus: 'attention', lastUpdated: '3 days ago' },
      ]);
    }
  };

  const handleMealComplete = async (mealId: string) => {
    if (!isHydrated || !user) return;
    setMeals((prevMeals) => prevMeals.map((meal) => meal.id === mealId ? { ...meal, isCompleted: true } : meal));
    const { error } = await supabase.from('meal_logs').update({ is_completed: true }).eq('id', mealId).eq('user_id', user.id);
    if (error) console.log('Meal complete error:', error.message);
  };

  const quickActions: QuickAction[] = [
    { id: '1', title: 'Log Meal', description: 'Track what you ate today', icon: 'PencilSquareIcon', color: 'bg-primary', action: 'log-meal' },
    { id: '2', title: 'Book Consultation', description: 'Schedule with nutritionist', icon: 'CalendarIcon', color: 'bg-accent', action: 'book-consultation' },
    { id: '3', title: 'Track Symptoms', description: 'Record health changes', icon: 'DocumentTextIcon', color: 'bg-secondary', action: 'track-symptoms' },
    { id: '4', title: 'View Reports', description: 'Check progress analytics', icon: 'ChartPieIcon', color: 'bg-success', action: 'view-reports' },
  ];

  const nutritionTips: NutritionTip[] = [
    { id: '1', category: 'Hydration', title: 'Drink Water Before Meals', description: 'Drinking a glass of water 30 minutes before meals can improve digestion and help with portion control.', icon: 'WaterIcon', color: 'bg-secondary' },
    { id: '2', category: 'Local Foods', title: 'Include More Leafy Greens', description: 'Sukuma wiki and amaranth are rich in iron and vitamins. Aim for at least one serving daily.', icon: 'LeafIcon', color: 'bg-success' },
    { id: '3', category: 'Diabetes Care', title: 'Monitor Carbohydrate Timing', description: 'Spread your carbohydrate intake evenly throughout the day to maintain stable blood sugar levels.', icon: 'ClockIcon', color: 'bg-warning' },
  ];

  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="h-96 bg-muted rounded-xl" /><div className="h-96 bg-muted rounded-xl" /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <NutritionGoalsCard goals={nutritionGoals} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProgressChart data={weeklyData} />
        <HealthMetricsCard metrics={healthMetrics} />
      </div>
      <QuickActionsPanel actions={quickActions} />
      <TodaysMealPlan meals={meals} onMealComplete={handleMealComplete} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingConsultations consultations={consultations} />
        <NutritionTipsCard tips={nutritionTips} />
      </div>
      <FamilyMembersCard members={familyMembers} />
    </div>
  );
};

export default DashboardInteractive;