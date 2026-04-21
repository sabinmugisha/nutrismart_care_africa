-- NutriSmart Care Africa - Admin RBAC & Provider Verification Migration
-- Adds admin update access to nutrition_providers for verification workflow

-- Allow admins to update nutrition_providers (for approve/deactivate workflow)
DROP POLICY IF EXISTS "admin_update_nutrition_providers" ON public.nutrition_providers;
CREATE POLICY "admin_update_nutrition_providers"
ON public.nutrition_providers FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'institution_admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'institution_admin')
  )
);

-- Allow admins to update user_profiles (for activate/deactivate workflow)
DROP POLICY IF EXISTS "admin_update_user_profiles" ON public.user_profiles;
CREATE POLICY "admin_update_user_profiles"
ON public.user_profiles FOR UPDATE TO authenticated
USING (
  id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.user_profiles AS admin_check
    WHERE admin_check.id = auth.uid()
    AND admin_check.role IN ('admin', 'institution_admin')
  )
)
WITH CHECK (
  id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.user_profiles AS admin_check
    WHERE admin_check.id = auth.uid()
    AND admin_check.role IN ('admin', 'institution_admin')
  )
);

-- Allow admins to read all consultations for system stats
DROP POLICY IF EXISTS "admin_read_all_consultations" ON public.consultations;
CREATE POLICY "admin_read_all_consultations"
ON public.consultations FOR SELECT TO authenticated
USING (
  patient_id = auth.uid()
  OR provider_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'institution_admin')
  )
);
