-- Add email column to profiles table
ALTER TABLE public.profiles ADD COLUMN email TEXT;

-- Update the handle_new_user trigger to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, institution_id, first_name, last_name, role, email)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'institution_id')::UUID,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'role')::public.user_role,
    NEW.email
  );
  RETURN NEW;
END;
$$;