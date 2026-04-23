'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function EmailConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/personal-dashboard';
  const [countdown, setCountdown] = useState(5);
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyTimer = setTimeout(() => {
      setStatus('success');
    }, 1200);
    return () => clearTimeout(verifyTimer);
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    if (countdown <= 0) {
      router?.push(next);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router, next]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/professional-landing-page" className="inline-flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
              <svg className="w-7 h-7 text-primary-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-semibold font-heading text-primary">NutriSmart</h1>
              <p className="text-xs text-muted-foreground">Care Africa</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="card-base text-center">
          {status === 'verifying' && (
            <>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6">
                <Icon name="ArrowPathIcon" size={40} className="text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-3">
                Verifying Your Account
              </h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your email address…
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
                <Icon name="CheckCircleIcon" size={44} className="text-green-600" />
              </div>

              <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-3">
                Email Verified!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your account has been successfully verified. Welcome to NutriSmart Care Africa!
              </p>

              {/* Account status badge */}
              <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-4 py-2 mb-8">
                <Icon name="ShieldCheckIcon" size={16} />
                <span className="text-sm font-medium">Account Active &amp; Verified</span>
              </div>

              {/* Redirect notice with progress bar */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Redirecting you to your personal dashboard in{' '}
                  <span className="font-semibold text-primary text-base">{countdown}</span>{' '}
                  second{countdown !== 1 ? 's' : ''}…
                </p>
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => router?.push(next)}
                className="w-full button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Go to Dashboard Now</span>
                  <Icon name="ArrowRightIcon" size={18} />
                </span>
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto mb-6">
                <Icon name="ExclamationCircleIcon" size={44} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-3">
                Verification Failed
              </h2>
              <p className="text-muted-foreground mb-8">
                The verification link may have expired or is invalid. Please request a new one.
              </p>
              <Link
                href="/email-verification-pending"
                className="w-full button-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth inline-flex items-center justify-center"
              >
                Request New Link
              </Link>
            </>
          )}
        </div>

        {/* Footer links */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
