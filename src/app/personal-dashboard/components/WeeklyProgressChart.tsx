import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WeeklyData {
  day: string;
  calories: number;
  protein: number;
  target: number;
}

interface WeeklyProgressChartProps {
  data: WeeklyData[];
}

const WeeklyProgressChart = ({ data }: WeeklyProgressChartProps) => {
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold font-heading text-card-foreground">
            Weekly Progress
          </h2>
          <p className="text-sm caption text-muted-foreground mt-1">
            Your nutrition intake over the past 7 days
          </p>
        </div>
      </div>

      <div className="w-full h-80" aria-label="Weekly Nutrition Progress Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 90, 39, 0.1)" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--color-border)' }}
              label={{ value: 'Calories', angle: -90, position: 'insideLeft', fill: 'var(--color-text-secondary)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-popover-foreground)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="calories" fill="#2D5A27" name="Calories Consumed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="protein" fill="#E67E22" name="Protein (g)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="target" fill="#8B4513" name="Target Calories" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;