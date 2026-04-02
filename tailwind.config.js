/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* primary/15 */
        input: "var(--color-input)", /* Subtle warm gray */
        ring: "var(--color-ring)", /* Warm orange */
        background: "var(--color-background)", /* Soft white */
        foreground: "var(--color-foreground)", /* Primary text */
        primary: {
          DEFAULT: "var(--color-primary)", /* Deep forest green */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Rich earth brown */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Warm red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Subtle warm gray */
          foreground: "var(--color-muted-foreground)", /* Medium gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Warm orange */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* Deep blue-gray */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Subtle warm gray */
          foreground: "var(--color-card-foreground)", /* Deep blue-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Fresh green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Amber */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Warm red */
          foreground: "var(--color-error-foreground)", /* white */
        },
        text: {
          primary: "var(--color-text-primary)", /* Deep blue-gray */
          secondary: "var(--color-text-secondary)", /* Medium gray */
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)", /* 16px */
        md: "var(--radius-md)", /* 12px */
        sm: "var(--radius-sm)", /* 6px */
        xl: "var(--radius-xl)", /* 24px */
      },
      fontFamily: {
        heading: ['Crimson Text', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "fade-in": "fade-in 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      ringOffsetWidth: {
        '3': '3px',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '250': '250',
        '300': '300',
      },
    },
  },
  plugins: [],
}