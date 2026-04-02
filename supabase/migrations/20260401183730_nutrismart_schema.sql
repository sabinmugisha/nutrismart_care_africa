-- NutriSmart Care Africa - Full Schema Migration
-- Auth, Nutrition Data, Consultations, Progress Tracking

-- ============================================================
-- 1. TYPES (ENUMs)
-- ============================================================

DROP TYPE IF EXISTS public.user_role CASCADE;
CREATE TYPE public.user_role AS ENUM ('individual', 'provider', 'admin', 'institution_admin');

DROP TYPE IF EXISTS public.consultation_status CASCADE;
CREATE TYPE public.consultation_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled');

DROP TYPE IF EXISTS public.consultation_type CASCADE;
CREATE TYPE public.consultation_type AS ENUM ('video_call', 'in_person', 'phone_call');

DROP TYPE IF EXISTS public.meal_type CASCADE;
CREATE TYPE public.meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');

DROP TYPE IF EXISTS public.health_status CASCADE;
CREATE TYPE public.health_status AS ENUM ('good', 'monitoring', 'attention');

-- ============================================================
-- 2. CORE TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL DEFAULT '',
    phone_number TEXT,
    role public.user_role DEFAULT 'individual'::public.user_role,
    avatar_url TEXT,
    age INTEGER,
    gender TEXT,
    country TEXT,
    city TEXT,
    preferred_language TEXT DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.health_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    health_conditions TEXT[] DEFAULT '{}',
    is_pregnant BOOLEAN DEFAULT false,
    allergies TEXT,
    medications TEXT,
    activity_level TEXT,
    dietary_restrictions TEXT[] DEFAULT '{}',
    meal_frequency TEXT,
    cooking_skill TEXT,
    budget_level TEXT,
    market_access TEXT,
    preferred_foods TEXT[] DEFAULT '{}',
    avoided_foods TEXT,
    nutrition_goals TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.nutrition_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    credentials TEXT,
    specializations TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    consultation_fee INTEGER DEFAULT 0,
    availability_status TEXT DEFAULT 'available',
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    consultation_type public.consultation_type DEFAULT 'video_call'::public.consultation_type,
    status public.consultation_status DEFAULT 'pending'::public.consultation_status,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    health_concerns TEXT,
    insurance_provider TEXT,
    insurance_number TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    notes TEXT,
    is_emergency BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.meal_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    meal_type public.meal_type NOT NULL,
    meal_name TEXT NOT NULL,
    calories INTEGER DEFAULT 0,
    protein DECIMAL(6,2) DEFAULT 0,
    carbs DECIMAL(6,2) DEFAULT 0,
    fats DECIMAL(6,2) DEFAULT 0,
    ingredients TEXT[] DEFAULT '{}',
    image_url TEXT,
    is_completed BOOLEAN DEFAULT false,
    logged_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.nutrition_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    goal_type TEXT NOT NULL,
    target_value DECIMAL(10,2) NOT NULL,
    current_value DECIMAL(10,2) DEFAULT 0,
    unit TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL,
    value TEXT NOT NULL,
    unit TEXT,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relation TEXT NOT NULL,
    age INTEGER,
    image_url TEXT,
    health_status public.health_status DEFAULT 'good'::public.health_status,
    last_updated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.meal_plan_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    meal_type public.meal_type NOT NULL,
    meal_name TEXT NOT NULL,
    calories INTEGER DEFAULT 0,
    protein DECIMAL(6,2) DEFAULT 0,
    carbs DECIMAL(6,2) DEFAULT 0,
    fats DECIMAL(6,2) DEFAULT 0,
    ingredients TEXT[] DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    tracked_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_calories INTEGER DEFAULT 0,
    total_protein DECIMAL(6,2) DEFAULT 0,
    total_carbs DECIMAL(6,2) DEFAULT 0,
    total_fats DECIMAL(6,2) DEFAULT 0,
    water_glasses INTEGER DEFAULT 0,
    exercise_minutes INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_health_profiles_user_id ON public.health_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_providers_user_id ON public.nutrition_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON public.consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_provider_id ON public.consultations(provider_id);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON public.consultations(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_meal_logs_user_id ON public.meal_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_logs_logged_at ON public.meal_logs(logged_at);
CREATE INDEX IF NOT EXISTS idx_nutrition_goals_user_id ON public.nutrition_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id ON public.health_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_user_id ON public.family_members(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON public.meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_tracking_user_id ON public.progress_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_tracking_date ON public.progress_tracking(tracked_date);

-- ============================================================
-- 4. FUNCTIONS (BEFORE RLS POLICIES)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'individual')::public.user_role
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid()
    AND (au.raw_user_meta_data->>'role' = 'admin'
         OR au.raw_user_meta_data->>'role' = 'institution_admin')
)
$$;

CREATE OR REPLACE FUNCTION public.is_provider_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid()
    AND au.raw_user_meta_data->>'role' = 'provider'
)
$$;

-- ============================================================
-- 5. ENABLE RLS
-- ============================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 6. RLS POLICIES
-- ============================================================

-- user_profiles
DROP POLICY IF EXISTS "users_manage_own_user_profiles" ON public.user_profiles;
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles FOR ALL TO authenticated
USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "admin_full_access_user_profiles" ON public.user_profiles;
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles FOR SELECT TO authenticated
USING (public.is_admin_from_auth());

-- health_profiles
DROP POLICY IF EXISTS "users_manage_own_health_profiles" ON public.health_profiles;
CREATE POLICY "users_manage_own_health_profiles"
ON public.health_profiles FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- nutrition_providers (public read, own write)
DROP POLICY IF EXISTS "public_read_nutrition_providers" ON public.nutrition_providers;
CREATE POLICY "public_read_nutrition_providers"
ON public.nutrition_providers FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "providers_manage_own_profile" ON public.nutrition_providers;
CREATE POLICY "providers_manage_own_profile"
ON public.nutrition_providers FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- consultations
DROP POLICY IF EXISTS "patients_view_own_consultations" ON public.consultations;
CREATE POLICY "patients_view_own_consultations"
ON public.consultations FOR SELECT TO authenticated
USING (patient_id = auth.uid() OR provider_id = auth.uid());

DROP POLICY IF EXISTS "patients_create_consultations" ON public.consultations;
CREATE POLICY "patients_create_consultations"
ON public.consultations FOR INSERT TO authenticated
WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "consultation_parties_update" ON public.consultations;
CREATE POLICY "consultation_parties_update"
ON public.consultations FOR UPDATE TO authenticated
USING (patient_id = auth.uid() OR provider_id = auth.uid())
WITH CHECK (patient_id = auth.uid() OR provider_id = auth.uid());

DROP POLICY IF EXISTS "patients_delete_consultations" ON public.consultations;
CREATE POLICY "patients_delete_consultations"
ON public.consultations FOR DELETE TO authenticated
USING (patient_id = auth.uid());

-- meal_logs
DROP POLICY IF EXISTS "users_manage_own_meal_logs" ON public.meal_logs;
CREATE POLICY "users_manage_own_meal_logs"
ON public.meal_logs FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- nutrition_goals
DROP POLICY IF EXISTS "users_manage_own_nutrition_goals" ON public.nutrition_goals;
CREATE POLICY "users_manage_own_nutrition_goals"
ON public.nutrition_goals FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- health_metrics
DROP POLICY IF EXISTS "users_manage_own_health_metrics" ON public.health_metrics;
CREATE POLICY "users_manage_own_health_metrics"
ON public.health_metrics FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- family_members
DROP POLICY IF EXISTS "users_manage_own_family_members" ON public.family_members;
CREATE POLICY "users_manage_own_family_members"
ON public.family_members FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- meal_plans
DROP POLICY IF EXISTS "users_manage_own_meal_plans" ON public.meal_plans;
CREATE POLICY "users_manage_own_meal_plans"
ON public.meal_plans FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- meal_plan_items
DROP POLICY IF EXISTS "users_manage_own_meal_plan_items" ON public.meal_plan_items;
CREATE POLICY "users_manage_own_meal_plan_items"
ON public.meal_plan_items FOR ALL TO authenticated
USING (
    meal_plan_id IN (
        SELECT id FROM public.meal_plans WHERE user_id = auth.uid()
    )
)
WITH CHECK (
    meal_plan_id IN (
        SELECT id FROM public.meal_plans WHERE user_id = auth.uid()
    )
);

-- progress_tracking
DROP POLICY IF EXISTS "users_manage_own_progress_tracking" ON public.progress_tracking;
CREATE POLICY "users_manage_own_progress_tracking"
ON public.progress_tracking FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ============================================================
-- 7. TRIGGERS
-- ============================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_health_profiles_updated_at ON public.health_profiles;
CREATE TRIGGER update_health_profiles_updated_at
    BEFORE UPDATE ON public.health_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_consultations_updated_at ON public.consultations;
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON public.consultations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_progress_tracking_updated_at ON public.progress_tracking;
CREATE TRIGGER update_progress_tracking_updated_at
    BEFORE UPDATE ON public.progress_tracking
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 8. MOCK DATA
-- ============================================================

DO $$
DECLARE
    patient_uuid UUID := gen_random_uuid();
    provider_uuid UUID := gen_random_uuid();
    admin_uuid UUID := gen_random_uuid();
    institution_uuid UUID := gen_random_uuid();
    consultation_uuid UUID := gen_random_uuid();
    meal_plan_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users (trigger auto-creates user_profiles)
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (patient_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'patient@nutrismart.rw', crypt('Patient@2026', gen_salt('bf', 10)), now(), now(), now(),
         jsonb_build_object('full_name', 'John Doe', 'role', 'individual'),
         jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (provider_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'provider@nutrismart.rw', crypt('Provider@2026', gen_salt('bf', 10)), now(), now(), now(),
         jsonb_build_object('full_name', 'Dr. Aisha Uwimana', 'role', 'provider'),
         jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@nutrismart.rw', crypt('Admin@2026', gen_salt('bf', 10)), now(), now(), now(),
         jsonb_build_object('full_name', 'Admin User', 'role', 'admin'),
         jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (institution_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.doe@example.com', crypt('NutriSmart2026!', gen_salt('bf', 10)), now(), now(), now(),
         jsonb_build_object('full_name', 'John Doe Institution', 'role', 'institution_admin'),
         jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null)
    ON CONFLICT (id) DO NOTHING;

    -- Update patient profile with extra details
    UPDATE public.user_profiles
    SET age = 32, gender = 'female', country = 'Rwanda', city = 'Kigali', phone_number = '+250788000001'
    WHERE id = patient_uuid;

    -- Create provider profile
    INSERT INTO public.nutrition_providers (user_id, credentials, specializations, languages, rating, review_count, consultation_fee, availability_status)
    VALUES (
        provider_uuid,
        'PhD in Clinical Nutrition, RD',
        ARRAY['Diabetes Management', 'Pregnancy Nutrition', 'Weight Management'],
        ARRAY['English', 'Kinyarwanda'],
        4.9, 127, 25000, 'available'
    ) ON CONFLICT DO NOTHING;

    -- Create health profile for patient
    INSERT INTO public.health_profiles (user_id, health_conditions, activity_level, dietary_restrictions, nutrition_goals)
    VALUES (
        patient_uuid,
        ARRAY['none'],
        'moderate',
        ARRAY['none'],
        ARRAY['weight_management', 'healthy_eating']
    ) ON CONFLICT DO NOTHING;

    -- Create nutrition goals for patient
    INSERT INTO public.nutrition_goals (user_id, goal_type, target_value, current_value, unit)
    VALUES
        (patient_uuid, 'calories', 2000, 1450, 'kcal'),
        (patient_uuid, 'protein', 80, 68, 'g'),
        (patient_uuid, 'water', 8, 6, 'glasses'),
        (patient_uuid, 'exercise', 30, 25, 'min')
    ON CONFLICT DO NOTHING;

    -- Create health metrics for patient
    INSERT INTO public.health_metrics (user_id, metric_type, value, unit)
    VALUES
        (patient_uuid, 'weight', '72.5', 'kg'),
        (patient_uuid, 'blood_pressure', '118/76', 'mmHg'),
        (patient_uuid, 'blood_sugar', '95', 'mg/dL'),
        (patient_uuid, 'bmi', '23.8', '')
    ON CONFLICT DO NOTHING;

    -- Create family members for patient
    INSERT INTO public.family_members (user_id, name, relation, age, health_status)
    VALUES
        (patient_uuid, 'Grace Uwimana', 'Daughter', 8, 'good'::public.health_status),
        (patient_uuid, 'Emmanuel Mugisha', 'Son', 12, 'monitoring'::public.health_status),
        (patient_uuid, 'Marie Mukamana', 'Mother', 58, 'attention'::public.health_status)
    ON CONFLICT DO NOTHING;

    -- Create a consultation
    INSERT INTO public.consultations (id, patient_id, provider_id, consultation_type, status, scheduled_at, health_concerns)
    VALUES (
        consultation_uuid,
        patient_uuid,
        provider_uuid,
        'video_call'::public.consultation_type,
        'confirmed'::public.consultation_status,
        now() + interval '1 day',
        'General nutrition assessment and meal planning'
    ) ON CONFLICT (id) DO NOTHING;

    -- Create meal plan for patient
    INSERT INTO public.meal_plans (id, user_id, week_start_date)
    VALUES (meal_plan_uuid, patient_uuid, CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER)
    ON CONFLICT (id) DO NOTHING;

    -- Create meal log entries for patient
    INSERT INTO public.meal_logs (user_id, meal_type, meal_name, calories, protein, carbs, fats, ingredients, is_completed)
    VALUES
        (patient_uuid, 'breakfast'::public.meal_type, 'Ugali with Sukuma Wiki and Eggs', 450, 18, 65, 12, ARRAY['Maize flour', 'Kale', 'Eggs', 'Tomatoes', 'Onions'], true),
        (patient_uuid, 'lunch'::public.meal_type, 'Grilled Tilapia with Brown Rice', 520, 35, 48, 18, ARRAY['Tilapia', 'Brown rice', 'Spinach', 'Carrots', 'Lemon'], false),
        (patient_uuid, 'snack'::public.meal_type, 'Fresh Fruit Salad with Groundnuts', 180, 6, 28, 8, ARRAY['Papaya', 'Mango', 'Banana', 'Groundnuts', 'Lime juice'], false),
        (patient_uuid, 'dinner'::public.meal_type, 'Bean Stew with Sweet Potatoes', 480, 22, 72, 10, ARRAY['Red beans', 'Sweet potatoes', 'Tomatoes', 'Onions', 'Garlic'], false)
    ON CONFLICT DO NOTHING;

    -- Create progress tracking for patient
    INSERT INTO public.progress_tracking (user_id, tracked_date, total_calories, total_protein, total_carbs, total_fats, water_glasses, exercise_minutes)
    VALUES
        (patient_uuid, CURRENT_DATE - 6, 1850, 75, 220, 48, 7, 30),
        (patient_uuid, CURRENT_DATE - 5, 1920, 82, 235, 52, 8, 45),
        (patient_uuid, CURRENT_DATE - 4, 1780, 68, 210, 44, 6, 20),
        (patient_uuid, CURRENT_DATE - 3, 2050, 88, 250, 58, 8, 60),
        (patient_uuid, CURRENT_DATE - 2, 1890, 78, 225, 50, 7, 35),
        (patient_uuid, CURRENT_DATE - 1, 2100, 92, 260, 62, 9, 50),
        (patient_uuid, CURRENT_DATE, 1450, 68, 165, 38, 6, 25)
    ON CONFLICT DO NOTHING;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;
