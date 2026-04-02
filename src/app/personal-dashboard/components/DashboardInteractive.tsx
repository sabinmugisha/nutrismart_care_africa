'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import NutritionGoalsCard from './NutritionGoalsCard';
import WeeklyProgressChart from './WeeklyProgressChart';
import TodaysMealPlan from './TodaysMealPlan';
import HealthMetricsCard from './HealthMetricsCard';
import QuickActionsPanel from './QuickActionsPanel';
import UpcomingConsultations from './UpcomingConsultations';
import NutritionTipsCard from './NutritionTipsCard';
import FamilyMembersCard from './FamilyMembersCard';

interface NutritionGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

interface WeeklyData {
  day: string;
  calories: number;
  protein: number;
  target: number;
}

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

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

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

interface NutritionTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

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

const MEAL_IMAGES: Record<string, {image: string;alt: string;}> = {
  breakfast: {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_152440786-1767129340814.png",
    alt: 'Traditional African breakfast with white ugali, green sukuma wiki vegetables, and two fried eggs on ceramic plate'
  },
  lunch: {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12152aae6-1772899299848.png",
    alt: 'Grilled whole tilapia fish with brown rice, sliced tomatoes and green vegetables on white plate'
  },
  snack: {
    image: "https://images.unsplash.com/photo-1702692534232-a165cef641e7",
    alt: 'Colorful fruit salad with papaya, mango, banana pieces and roasted groundnuts in glass bowl'
  },
  dinner: {
    image: "https://images.unsplash.com/photo-1735233024815-7986206a18a9",
    alt: 'Rich red bean stew with chunks of orange sweet potatoes in traditional ceramic bowl'
  }
};

const MEAL_TIMES: Record<string, string> = {
  breakfast: '07:00 AM',
  lunch: '01:00 PM',
  snack: '04:00 PM',
  dinner: '07:00 PM'
};

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

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && user) {
      loadDashboardData();
      // Real-time subscription for consultations
      const channel = supabase.
      channel('consultations_changes').
      on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'consultations',
        filter: `patient_id=eq.${user.id}`
      }, () => {
        loadConsultations();
      }).
      subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isHydrated, user]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    await Promise.all([
    loadMeals(),
    loadNutritionGoals(),
    loadWeeklyProgress(),
    loadHealthMetrics(),
    loadConsultations(),
    loadFamilyMembers()]
    );
    setIsLoading(false);
  };

  const loadMeals = async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.
    from('meal_logs').
    select('*').
    eq('user_id', user.id).
    gte('logged_at', `${today}T00:00:00`).
    lte('logged_at', `${today}T23:59:59`).
    order('logged_at', { ascending: true });

    if (error) {
      console.log('Meals load error:', error.message);
      return;
    }

    if (data && data.length > 0) {
      setMeals(data.map((m) => ({
        id: m.id,
        type: m.meal_type.charAt(0).toUpperCase() + m.meal_type.slice(1) as Meal['type'],
        name: m.meal_name,
        time: MEAL_TIMES[m.meal_type] || '12:00 PM',
        calories: m.calories || 0,
        protein: m.protein || 0,
        carbs: m.carbs || 0,
        fats: m.fats || 0,
        image: MEAL_IMAGES[m.meal_type]?.image || '',
        alt: MEAL_IMAGES[m.meal_type]?.alt || m.meal_name,
        ingredients: m.ingredients || [],
        isCompleted: m.is_completed || false
      })));
    } else {
      // Fallback display data
      setMeals([
      { id: '1', type: 'Breakfast', name: 'Ugali with Sukuma Wiki and Eggs', time: '07:00 AM', calories: 450, protein: 18, carbs: 65, fats: 12, image: MEAL_IMAGES.breakfast.image, alt: MEAL_IMAGES.breakfast.alt, ingredients: ['Maize flour', 'Kale', 'Eggs', 'Tomatoes', 'Onions'], isCompleted: false },
      { id: '2', type: 'Lunch', name: 'Grilled Tilapia with Brown Rice', time: '01:00 PM', calories: 520, protein: 35, carbs: 48, fats: 18, image: MEAL_IMAGES.lunch.image, alt: MEAL_IMAGES.lunch.alt, ingredients: ['Tilapia', 'Brown rice', 'Spinach', 'Carrots', 'Lemon'], isCompleted: false },
      { id: '3', type: 'Snack', name: 'Fresh Fruit Salad with Groundnuts', time: '04:00 PM', calories: 180, protein: 6, carbs: 28, fats: 8, image: MEAL_IMAGES.snack.image, alt: MEAL_IMAGES.snack.alt, ingredients: ['Papaya', 'Mango', 'Banana', 'Groundnuts', 'Lime juice'], isCompleted: false },
      { id: '4', type: 'Dinner', name: 'Bean Stew with Sweet Potatoes', time: '07:00 PM', calories: 480, protein: 22, carbs: 72, fats: 10, image: MEAL_IMAGES.dinner.image, alt: MEAL_IMAGES.dinner.alt, ingredients: ['Red beans', 'Sweet potatoes', 'Tomatoes', 'Onions', 'Garlic'], isCompleted: false }]
      );
    }
  };

  const loadNutritionGoals = async () => {
    if (!user) return;
    const { data, error } = await supabase.
    from('nutrition_goals').
    select('*').
    eq('user_id', user.id);

    if (error) {
      console.log('Goals load error:', error.message);
      return;
    }

    const iconMap: Record<string, {icon: string;color: string;}> = {
      calories: { icon: 'FireIcon', color: 'bg-primary' },
      protein: { icon: 'BeakerIcon', color: 'bg-accent' },
      water: { icon: 'WaterIcon', color: 'bg-secondary' },
      exercise: { icon: 'BoltIcon', color: 'bg-success' }
    };

    if (data && data.length > 0) {
      setNutritionGoals(data.map((g) => ({
        id: g.id,
        title: g.goal_type.charAt(0).toUpperCase() + g.goal_type.slice(1),
        current: Number(g.current_value) || 0,
        target: Number(g.target_value) || 0,
        unit: g.unit,
        icon: iconMap[g.goal_type]?.icon || 'ChartBarIcon',
        color: iconMap[g.goal_type]?.color || 'bg-primary'
      })));
    } else {
      setNutritionGoals([
      { id: '1', title: 'Calories', current: 1450, target: 2000, unit: 'kcal', icon: 'FireIcon', color: 'bg-primary' },
      { id: '2', title: 'Protein', current: 68, target: 80, unit: 'g', icon: 'BeakerIcon', color: 'bg-accent' },
      { id: '3', title: 'Water', current: 6, target: 8, unit: 'glasses', icon: 'WaterIcon', color: 'bg-secondary' },
      { id: '4', title: 'Exercise', current: 25, target: 30, unit: 'min', icon: 'BoltIcon', color: 'bg-success' }]
      );
    }
  };

  const loadWeeklyProgress = async () => {
    if (!user) return;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const { data, error } = await supabase.
    from('progress_tracking').
    select('*').
    eq('user_id', user.id).
    gte('tracked_date', sevenDaysAgo.toISOString().split('T')[0]).
    order('tracked_date', { ascending: true });

    if (error) {
      console.log('Progress load error:', error.message);
      return;
    }

    if (data && data.length > 0) {
      setWeeklyData(data.map((p, i) => ({
        day: DAYS[i % 7],
        calories: p.total_calories || 0,
        protein: Number(p.total_protein) || 0,
        target: 2000
      })));
    } else {
      setWeeklyData([
      { day: 'Mon', calories: 1850, protein: 75, target: 2000 },
      { day: 'Tue', calories: 1920, protein: 82, target: 2000 },
      { day: 'Wed', calories: 1780, protein: 68, target: 2000 },
      { day: 'Thu', calories: 2050, protein: 88, target: 2000 },
      { day: 'Fri', calories: 1890, protein: 78, target: 2000 },
      { day: 'Sat', calories: 2100, protein: 92, target: 2000 },
      { day: 'Sun', calories: 1950, protein: 80, target: 2000 }]
      );
    }
  };

  const loadHealthMetrics = async () => {
    if (!user) return;
    const { data, error } = await supabase.
    from('health_metrics').
    select('*').
    eq('user_id', user.id).
    order('recorded_at', { ascending: false });

    if (error) {
      console.log('Metrics load error:', error.message);
      return;
    }

    const metricConfig: Record<string, {label: string;icon: string;status: HealthMetric['status'];trend: HealthMetric['trend'];change: string;}> = {
      weight: { label: 'Weight', icon: 'ScaleIcon', status: 'normal', trend: 'down', change: '-0.5 kg this week' },
      blood_pressure: { label: 'Blood Pressure', icon: 'HeartIcon', status: 'normal', trend: 'stable', change: 'Within normal range' },
      blood_sugar: { label: 'Blood Sugar', icon: 'BeakerIcon', status: 'normal', trend: 'stable', change: 'Fasting level normal' },
      bmi: { label: 'BMI', icon: 'ChartBarIcon', status: 'normal', trend: 'down', change: 'Healthy range' }
    };

    if (data && data.length > 0) {
      const seen = new Set<string>();
      const uniqueMetrics = data.filter((m) => {
        if (seen.has(m.metric_type)) return false;
        seen.add(m.metric_type);
        return true;
      });
      setHealthMetrics(uniqueMetrics.map((m) => ({
        id: m.id,
        label: metricConfig[m.metric_type]?.label || m.metric_type,
        value: m.value,
        unit: m.unit || '',
        status: metricConfig[m.metric_type]?.status || 'normal',
        icon: metricConfig[m.metric_type]?.icon || 'ChartBarIcon',
        trend: metricConfig[m.metric_type]?.trend || 'stable',
        change: metricConfig[m.metric_type]?.change || ''
      })));
    } else {
      setHealthMetrics([
      { id: '1', label: 'Weight', value: '72.5', unit: 'kg', status: 'normal', icon: 'ScaleIcon', trend: 'down', change: '-0.5 kg this week' },
      { id: '2', label: 'Blood Pressure', value: '118/76', unit: 'mmHg', status: 'normal', icon: 'HeartIcon', trend: 'stable', change: 'Within normal range' },
      { id: '3', label: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', icon: 'BeakerIcon', trend: 'stable', change: 'Fasting level normal' },
      { id: '4', label: 'BMI', value: '23.8', unit: '', status: 'normal', icon: 'ChartBarIcon', trend: 'down', change: 'Healthy range' }]
      );
    }
  };

  const loadConsultations = async () => {
    if (!user) return;
    const { data, error } = await supabase.
    from('consultations').
    select(`
        *,
        provider:provider_id (
          full_name,
          avatar_url
        )
      `).
    eq('patient_id', user.id).
    gte('scheduled_at', new Date().toISOString()).
    order('scheduled_at', { ascending: true }).
    limit(5);

    if (error) {
      console.log('Consultations load error:', error.message);
      return;
    }

    const typeMap: Record<string, Consultation['type']> = {
      video_call: 'Video Call',
      in_person: 'In-Person',
      phone_call: 'Phone Call'
    };

    if (data && data.length > 0) {
      setConsultations(data.map((c) => ({
        id: c.id,
        nutritionistName: (c.provider as any)?.full_name || 'Dr. Nutrition Expert',
        nutritionistImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1807508bd-1769080212556.png",
        nutritionistAlt: 'Professional nutritionist in medical coat',
        specialty: 'Nutrition & Dietetics',
        date: new Date(c.scheduled_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: new Date(c.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: typeMap[c.consultation_type] || 'Video Call',
        status: c.status as Consultation['status']
      })));
    } else {
      setConsultations([
      { id: '1', nutritionistName: 'Dr. Amina Uwase', nutritionistImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1823d71c5-1763299188021.png", nutritionistAlt: 'Professional African female nutritionist in white medical coat', specialty: 'Diabetes & Weight Management', date: 'Tomorrow', time: '10:00 AM', type: 'Video Call', status: 'confirmed' }]
      );
    }
  };

  const loadFamilyMembers = async () => {
    if (!user) return;
    const { data, error } = await supabase.
    from('family_members').
    select('*').
    eq('user_id', user.id).
    order('created_at', { ascending: true });

    if (error) {
      console.log('Family members load error:', error.message);
      return;
    }

    const memberImages = [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ceadbcc-1772182453068.png", alt: 'Young African girl with braided hair wearing yellow dress smiling brightly' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_127400d6a-1763296439452.png", alt: 'African teenage boy in blue school uniform with backpack showing confident smile' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd792b86-1773021658825.png", alt: 'Elderly African woman with gray hair wearing traditional colorful headwrap and warm smile' }];


    if (data && data.length > 0) {
      setFamilyMembers(data.map((m, i) => ({
        id: m.id,
        name: m.name,
        relation: m.relation,
        age: m.age || 0,
        image: memberImages[i % memberImages.length].image,
        alt: memberImages[i % memberImages.length].alt,
        healthStatus: m.health_status as FamilyMember['healthStatus'],
        lastUpdated: new Date(m.last_updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })));
    } else {
      setFamilyMembers([
      { id: '1', name: 'Grace Uwimana', relation: 'Daughter', age: 8, image: memberImages[0].image, alt: memberImages[0].alt, healthStatus: 'good', lastUpdated: '2 days ago' },
      { id: '2', name: 'Emmanuel Mugisha', relation: 'Son', age: 12, image: memberImages[1].image, alt: memberImages[1].alt, healthStatus: 'monitoring', lastUpdated: '1 week ago' },
      { id: '3', name: 'Marie Mukamana', relation: 'Mother', age: 58, image: memberImages[2].image, alt: memberImages[2].alt, healthStatus: 'attention', lastUpdated: '3 days ago' }]
      );
    }
  };

  const handleMealComplete = async (mealId: string) => {
    if (!isHydrated || !user) return;

    setMeals((prevMeals) =>
    prevMeals.map((meal) =>
    meal.id === mealId ? { ...meal, isCompleted: true } : meal
    )
    );

    const { error } = await supabase.
    from('meal_logs').
    update({ is_completed: true }).
    eq('id', mealId).
    eq('user_id', user.id);

    if (error) {
      console.log('Meal complete error:', error.message);
    }
  };

  const quickActions: QuickAction[] = [
  { id: '1', title: 'Log Meal', description: 'Track what you ate today', icon: 'PencilSquareIcon', color: 'bg-primary', action: 'log-meal' },
  { id: '2', title: 'Book Consultation', description: 'Schedule with nutritionist', icon: 'CalendarIcon', color: 'bg-accent', action: 'book-consultation' },
  { id: '3', title: 'Track Symptoms', description: 'Record health changes', icon: 'DocumentTextIcon', color: 'bg-secondary', action: 'track-symptoms' },
  { id: '4', title: 'View Reports', description: 'Check progress analytics', icon: 'ChartPieIcon', color: 'bg-success', action: 'view-reports' }];


  const nutritionTips: NutritionTip[] = [
  { id: '1', category: 'Hydration', title: 'Drink Water Before Meals', description: 'Drinking a glass of water 30 minutes before meals can improve digestion and help with portion control.', icon: 'WaterIcon', color: 'bg-secondary' },
  { id: '2', category: 'Local Foods', title: 'Include More Leafy Greens', description: 'Sukuma wiki and amaranth are rich in iron and vitamins. Aim for at least one serving daily.', icon: 'LeafIcon', color: 'bg-success' },
  { id: '3', category: 'Diabetes Care', title: 'Monitor Carbohydrate Timing', description: 'Spread your carbohydrate intake evenly throughout the day to maintain stable blood sugar levels.', icon: 'ClockIcon', color: 'bg-warning' }];


  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded-xl" />
              <div className="h-96 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>);

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
    </div>);

};

export default DashboardInteractive;