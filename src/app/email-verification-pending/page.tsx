'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

export default function EmailVerificationPendingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState<string>('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [resendError, setResendError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get email from session storage (set during registration)
    const storedEmail = sessionStorage.getItem('pending_verification_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email || countdown > 0) return;
    setResendStatus('sending');
    setResendError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/personal-dashboard`,
        },
      });
      if (error) throw error;
      setResendStatus('sent');
      setCountdown(60);
    } catch (err: any) {
      setResendStatus('error');
      setResendError(err?.message || 'Failed to resend. Please try again.');
    }
  };

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
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6">
            <Icon name="EnvelopeIcon" size={40} className="text-primary" />
          </div>

          <h2 className="text-2xl font-heading font-semibold text-card-foreground mb-3">
            Verify Your Email
          </h2>
          <p className="text-muted-foreground mb-2">
            We&apos;ve sent a confirmation link to:
          </p>
          {email && (
            <p className="font-semibold text-card-foreground mb-4 break-all">{email}</p>
          )}
          <p className="text-sm text-muted-foreground mb-8">
            Please check your inbox and click the verification link to activate your account. The link will expire in 24 hours.
          </p>

          {/* Steps */}
          <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left space-y-3">
            <p className="text-sm font-medium text-card-foreground mb-2">What to do next:</p>
            {[
              'Open your email inbox',
              'Find the email from NutriSmart Care',
              'Click the "Confirm your email" button',
              'You\'ll be redirected to your dashboard',
            ].map((step, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          {/* Resend section */}
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground mb-3">Didn&apos;t receive the email?</p>

            {resendStatus === 'sent' && (
              <div className="flex items-center justify-center space-x-2 text-success mb-3">
                <Icon name="CheckCircleIcon" size={18} />
                <span className="text-sm font-medium">Verification email resent!</span>
              </div>
            )}

            {resendStatus === 'error' && resendError && (
              <div className="flex items-center justify-center space-x-2 text-error mb-3">
                <Icon name="ExclamationCircleIcon" size={18} />
                <span className="text-sm">{resendError}</span>
              </div>
            )}

            <button
              onClick={handleResend}
              disabled={resendStatus === 'sending' || countdown > 0}
              className="w-full button-base border-2 border-primary text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              {resendStatus === 'sending' ? (
                <span className="flex items-center justify-center space-x-2">
                  <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                  <span>Sending...</span>
                </span>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                'Resend Verification Email'
              )}
            </button>

            <p className="text-xs text-muted-foreground mt-3">
              Also check your spam or junk folder.
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Already verified?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in here
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Wrong email?{' '}
            <Link href="/user-registration" className="text-primary hover:text-primary/80 font-medium">
              Register again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
