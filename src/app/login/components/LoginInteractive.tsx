'use client';

import LoginForm from './LoginForm';
import TrustSignals from './TrustSignals';

const LoginInteractive = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-6">
                  <svg
                    className="w-10 h-10 text-primary-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold font-heading text-primary mb-4">
                  NutriSmart Care Africa
                </h2>
                <p className="text-lg text-muted-foreground mb-8 text-measure">
                  Empowering African communities with personalized nutrition guidance and
                  culturally appropriate dietary support for better health outcomes.
                </p>
              </div>

              <TrustSignals />
            </div>

            <div className="lg:sticky lg:top-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInteractive;