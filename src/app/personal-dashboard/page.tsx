import type { Metadata } from 'next';
import PersonalDashboardClient from './PersonalDashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard - NutriSmart Care Africa',
  description: 'Access your personalized nutrition guidance, track dietary progress, manage meal plans, and monitor health metrics.',
};

export default function PersonalDashboardPage() {
  return <PersonalDashboardClient />;
}