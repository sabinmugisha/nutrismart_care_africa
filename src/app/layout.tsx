// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NutriSmart Care Africa',
  description: 'AI-powered nutrition solutions for personalized wellness across Africa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body>{children}</body>
   </html>   
  );
}