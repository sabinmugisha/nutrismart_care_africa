import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import NavigationBreadcrumbs from '@/components/common/NavigationBreadcrumbs';
import ConsultationBookingInteractive from './components/ConsultationBookingInteractive';

export const metadata: Metadata = {
  title: 'Consultation Booking - NutriSmart Care Africa',
  description:
    'Schedule appointments with certified nutrition professionals for personalized dietary guidance, health monitoring, and culturally appropriate meal planning across African communities.',
};

export default function ConsultationBookingPage() {
  return (
    <>
      <Header />
      <NavigationBreadcrumbs />
      <ConsultationBookingInteractive />
    </>
  );
}