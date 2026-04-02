import type { Metadata } from 'next';
import LoginInteractive from './components/LoginInteractive';

export const metadata: Metadata = {
  title: 'Login - NutriSmart Care Africa',
  description:
    'Sign in to access your personalized nutrition dashboard, meal planning tools, and healthcare provider consultations across African communities.',
};

export default function LoginPage() {
  return <LoginInteractive />;
}