'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'rw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

// Full translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'NutriSmart',
    'app.tagline': 'Care Africa',
    'nav.home': 'Home',
    'nav.dashboard': 'My Dashboard',
    'nav.mealPlanning': 'Meal Planning',
    'nav.consultations': 'Consultations',
    'nav.adminPortal': 'Admin Portal',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started',
    'nav.logout': 'Logout',
    'lang.toggle': 'Kinyarwanda',
    // Landing Page
    'landing.hero.title': 'Nutrition Intelligence for Africa',
    'landing.hero.subtitle': 'Personalized, culturally-relevant nutrition guidance powered by local food knowledge. Combating malnutrition and NCDs across African communities.',
    'landing.hero.cta': 'Start Your Journey',
    'landing.hero.login': 'Sign In',
    'landing.stats.users': 'Active Users',
    'landing.stats.providers': 'Nutrition Providers',
    'landing.stats.meals': 'Meal Plans Created',
    'landing.stats.countries': 'Countries Served',
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to continue your nutrition journey',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot password?',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing in...',
    'login.noAccount': "Don't have an account?",
    'login.createAccount': 'Create Account',
    'login.error.email.required': 'Email address is required',
    'login.error.email.invalid': 'Please enter a valid email address',
    'login.error.password.required': 'Password is required',
    'login.error.invalid': 'Invalid email or password. Please try again.',
    // Registration
    'register.title': 'Create Your Account',
    'register.subtitle': 'Join thousands of Africans improving their nutrition',
    'register.step.basic': 'Basic Info',
    'register.step.demographic': 'Demographics',
    'register.step.health': 'Health',
    'register.step.lifestyle': 'Lifestyle',
    'register.step.food': 'Food Access',
    'register.submit': 'Create Account',
    'register.submitting': 'Creating Account...',
    'register.haveAccount': 'Already have an account?',
    'register.signIn': 'Sign In',
    // Dashboard
    'dashboard.welcome': 'Welcome Back',
    'dashboard.subtitle': "Here's your nutrition overview for today",
    'dashboard.myAccount': 'My Account',
    'dashboard.myMealPlan': 'My Meal Plan',
    'dashboard.myProgress': 'My Progress',
    'dashboard.myConsultations': 'My Consultations',
    'dashboard.todaysMeals': "Today's Meals",
    'dashboard.nutritionGoals': 'Nutrition Goals',
    'dashboard.weeklyProgress': 'Weekly Progress',
    'dashboard.healthMetrics': 'Health Metrics',
    'dashboard.upcomingConsultations': 'Upcoming Consultations',
    'dashboard.nutritionTips': 'Nutrition Tips',
    'dashboard.familyMembers': 'Family Members',
    'dashboard.quickActions': 'Quick Actions',
    // Meal Planning
    'meals.title': 'Meal Planning',
    'meals.subtitle': 'Plan your weekly nutrition with local African foods',
    'meals.weeklyCalendar': 'Weekly Calendar',
    'meals.recipeLibrary': 'Recipe Library',
    'meals.shoppingList': 'Shopping List',
    'meals.weeklySummary': 'Weekly Summary',
    'meals.addMeal': 'Add Meal',
    'meals.savePlan': 'Save Plan',
    // Admin Portal
    'admin.title': 'Admin Portal',
    'admin.subtitle': 'System management and oversight',
    'admin.systemStats': 'System Statistics',
    'admin.userManagement': 'User Management',
    'admin.institutionDashboard': 'Institution Dashboard',
    'admin.providerVerification': 'Provider Verification',
    'admin.totalUsers': 'Total Users',
    'admin.activeConsultations': 'Active Consultations',
    'admin.totalRegistrations': 'Total Registrations',
    'admin.institutionalImpact': 'Institutional Impact',
    'admin.approve': 'Approve',
    'admin.deactivate': 'Deactivate',
    'admin.pending': 'Pending',
    'admin.active': 'Active',
    'admin.inactive': 'Inactive',
    'admin.verified': 'Verified',
    'admin.unverified': 'Unverified',
    // Nutrition (cultural context)
    'nutrition.localFoods': 'Local Foods',
    'nutrition.isombe': 'Isombe (Cassava Leaves)',
    'nutrition.ibirayi': 'Ibirayi (Potatoes)',
    'nutrition.amateke': 'Amateke (Beans)',
    'nutrition.uburo': 'Uburo (Sorghum)',
    'nutrition.tip.stunting': 'Iron-rich foods like isombe help prevent stunting in children',
    'nutrition.tip.ncd': 'Reduce NCDs risk with low-sugar local foods like uburo and amateke',
  },
  rw: {
    // Common
    'app.name': 'NutriSmart',
    'app.tagline': 'Ubuzima bwa Afrika',
    'nav.home': 'Ahabanza',
    'nav.dashboard': 'Imbonerahamwe Yanjye',
    'nav.mealPlanning': 'Gutegura Indyo',
    'nav.consultations': 'Inama z\'Ubuzima',
    'nav.adminPortal': 'Ikibanza cy\'Ubuyobozi',
    'nav.login': 'Injira',
    'nav.getStarted': 'Tangira',
    'nav.logout': 'Sohoka',
    'lang.toggle': 'English',
    // Landing Page
    'landing.hero.title': 'Ubwenge bw\'Indyo ku Mugabane wa Afrika',
    'landing.hero.subtitle': 'Inama z\'indyo zihuye n\'umuco wacu, zifashishije ubumenyi bw\'ibiribwa by\'aho. Kurwanya inzara n\'indwara z\'imibereho muri sosiyete z\'Afrika.',
    'landing.hero.cta': 'Tangira Urugendo Rwawe',
    'landing.hero.login': 'Injira',
    'landing.stats.users': 'Abakoresha Bakoresheje',
    'landing.stats.providers': 'Inzobere mu Indyo',
    'landing.stats.meals': 'Gahunda z\'Indyo Zakozwe',
    'landing.stats.countries': 'Ibihugu Bisabwa',
    // Login
    'login.title': 'Murakaza Neza',
    'login.subtitle': 'Injira kugirango ukomeze urugendo rwawe rwo kurya neza',
    'login.email': 'Aderesi ya Email',
    'login.password': 'Ijambo Ryibanga',
    'login.rememberMe': 'Nyibuka',
    'login.forgotPassword': 'Wibagiwe ijambo ryibanga?',
    'login.signIn': 'Injira',
    'login.signingIn': 'Urarinjira...',
    'login.noAccount': 'Ntufite konti?',
    'login.createAccount': 'Fungura Konti',
    'login.error.email.required': 'Aderesi ya email irakenewe',
    'login.error.email.invalid': 'Injiza aderesi ya email yemewe',
    'login.error.password.required': 'Ijambo ryibanga rirakenewe',
    'login.error.invalid': 'Email cyangwa ijambo ryibanga bitemewe. Gerageza nanone.',
    // Registration
    'register.title': 'Fungura Konti Yawe',
    'register.subtitle': 'Injira mu muryango w\'Abafarika bagira indyo nziza',
    'register.step.basic': 'Amakuru Shingiro',
    'register.step.demographic': 'Amakuru y\'Ubwoko',
    'register.step.health': 'Ubuzima',
    'register.step.lifestyle': 'Imibereho',
    'register.step.food': 'Ibiribwa',
    'register.submit': 'Fungura Konti',
    'register.submitting': 'Gufungura Konti...',
    'register.haveAccount': 'Usanzwe ufite konti?',
    'register.signIn': 'Injira',
    // Dashboard
    'dashboard.welcome': 'Murakaza Neza',
    'dashboard.subtitle': 'Dore incamake y\'indyo yawe ya none',
    'dashboard.myAccount': 'Konti Yanjye',
    'dashboard.myMealPlan': 'Gahunda Yanjye y\'Indyo',
    'dashboard.myProgress': 'Iterambere Ryanjye',
    'dashboard.myConsultations': 'Inama Zanjye',
    'dashboard.todaysMeals': 'Indyo ya None',
    'dashboard.nutritionGoals': 'Intego z\'Indyo',
    'dashboard.weeklyProgress': 'Iterambere rya Buri Cyumweru',
    'dashboard.healthMetrics': 'Ibipimo by\'Ubuzima',
    'dashboard.upcomingConsultations': 'Inama Zizaza',
    'dashboard.nutritionTips': 'Inama z\'Indyo',
    'dashboard.familyMembers': 'Abagize Umuryango',
    'dashboard.quickActions': 'Ibikorwa Byihuse',
    // Meal Planning
    'meals.title': 'Gutegura Indyo',
    'meals.subtitle': 'Tegura indyo ya buri cyumweru ukoresheje ibiribwa by\'aho i Rwanda',
    'meals.weeklyCalendar': 'Gahunda ya Buri Cyumweru',
    'meals.recipeLibrary': 'Ububiko bw\'Amafunguro',
    'meals.shoppingList': 'Urutonde rw\'Ibiribwa',
    'meals.weeklySummary': 'Incamake ya Buri Cyumweru',
    'meals.addMeal': 'Ongeraho Ifunguro',
    'meals.savePlan': 'Bika Gahunda',
    // Admin Portal
    'admin.title': 'Ikibanza cy\'Ubuyobozi',
    'admin.subtitle': 'Gucunga no kugenzura sisitemu',
    'admin.systemStats': 'Imibare ya Sisitemu',
    'admin.userManagement': 'Gucunga Abakoresha',
    'admin.institutionDashboard': 'Imbonerahamwe y\'Inzego',
    'admin.providerVerification': 'Kwemeza Inzobere',
    'admin.totalUsers': 'Abakoresha Bose',
    'admin.activeConsultations': 'Inama Zikorwa',
    'admin.totalRegistrations': 'Iyandikisha Ryose',
    'admin.institutionalImpact': 'Ingaruka ku Nzego',
    'admin.approve': 'Emeza',
    'admin.deactivate': 'Hagarika',
    'admin.pending': 'Biritegerezwa',
    'admin.active': 'Birakora',
    'admin.inactive': 'Bihagaritswe',
    'admin.verified': 'Byemejwe',
    'admin.unverified': 'Bitaremejwe',
    // Nutrition (cultural context - Kinyarwanda specific)
    'nutrition.localFoods': 'Ibiribwa by\'Aho',
    'nutrition.isombe': 'Isombe (Amashaza y\'Imyumbati)',
    'nutrition.ibirayi': 'Ibirayi (Pomme de Terre)',
    'nutrition.amateke': 'Amateke (Ibishyimbo)',
    'nutrition.uburo': 'Uburo (Inshama)',
    'nutrition.tip.stunting': 'Ibiribwa birimo icyuma nk\'isombe bifasha gukumira igabanuka ry\'ubukuzi mu bana',
    'nutrition.tip.ncd': 'Gabanya indwara z\'imibereho ukoresheje ibiribwa by\'aho birimo isukari nke nk\'uburo n\'amateke',
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nutrismart_language') as Language;
      if (saved === 'en' || saved === 'rw') {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutrismart_language', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'rw' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations['en'][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
