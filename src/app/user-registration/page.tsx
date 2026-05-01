import type { Metadata } from 'next';
import RegistrationInteractive from './components/RegistrationInteractive';

export const metadata: Metadata = {
  title: 'User Registration - NutriSmart Care Africa',
  description:
    'Create your NutriSmart account with comprehensive health profiling for personalized nutrition guidance tailored to African communities and local food preferences.',
};

export default function UserRegistrationPage() {
  return <RegistrationInteractive />;
}