-- Create enums
CREATE TYPE public.institution_type AS ENUM ('school', 'university', 'institute');
CREATE TYPE public.user_role AS ENUM ('admin', 'teacher', 'student', 'representative');
CREATE TYPE public.attendance_status AS ENUM ('present', 'absent');

-- Create institutions table
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type public.institution_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role public.user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Create representative_links table
CREATE TABLE public.representative_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  representative_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(representative_id, student_id)
);

-- Create schedules table
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create attendance_records table
CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES public.schedules(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status public.attendance_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(schedule_id, student_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.representative_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's institution_id
CREATE OR REPLACE FUNCTION public.get_user_institution_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT institution_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Helper function to get user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Helper function to check if user is a teacher for a course
CREATE OR REPLACE FUNCTION public.is_teacher_for_course(course_id_param UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.courses
    WHERE id = course_id_param AND teacher_id = auth.uid()
  );
$$;

-- RLS Policies for institutions
CREATE POLICY "Users can view institutions in their organization"
  ON public.institutions FOR SELECT
  USING (id = public.get_user_institution_id());

CREATE POLICY "Admins can insert institutions"
  ON public.institutions FOR INSERT
  WITH CHECK (public.get_user_role() = 'admin');

CREATE POLICY "Admins can update institutions"
  ON public.institutions FOR UPDATE
  USING (id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

CREATE POLICY "Admins can delete institutions"
  ON public.institutions FOR DELETE
  USING (id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their institution"
  ON public.profiles FOR SELECT
  USING (institution_id = public.get_user_institution_id());

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

CREATE POLICY "Admins can delete profiles"
  ON public.profiles FOR DELETE
  USING (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

-- RLS Policies for courses
CREATE POLICY "Users can view courses in their institution"
  ON public.courses FOR SELECT
  USING (institution_id = public.get_user_institution_id());

CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  USING (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  USING (institution_id = public.get_user_institution_id() AND public.get_user_role() = 'admin');

-- RLS Policies for enrollments
CREATE POLICY "Users can view enrollments in their institution"
  ON public.enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN public.courses c ON c.id = enrollments.course_id
      WHERE p.id = auth.uid() 
      AND p.institution_id = c.institution_id
    )
  );

CREATE POLICY "Admins can manage enrollments"
  ON public.enrollments FOR ALL
  USING (
    public.get_user_role() = 'admin' AND
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = enrollments.course_id 
      AND c.institution_id = public.get_user_institution_id()
    )
  );

-- RLS Policies for representative_links
CREATE POLICY "Users can view representative_links in their institution"
  ON public.representative_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND (p.id = representative_links.representative_id OR p.id = representative_links.student_id)
    )
  );

CREATE POLICY "Admins can manage representative_links"
  ON public.representative_links FOR ALL
  USING (
    public.get_user_role() = 'admin' AND
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = representative_links.student_id
      AND p.institution_id = public.get_user_institution_id()
    )
  );

-- RLS Policies for schedules
CREATE POLICY "Users can view schedules in their institution"
  ON public.schedules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = schedules.course_id
      AND c.institution_id = public.get_user_institution_id()
    )
  );

CREATE POLICY "Admins can manage schedules"
  ON public.schedules FOR ALL
  USING (
    public.get_user_role() = 'admin' AND
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = schedules.course_id
      AND c.institution_id = public.get_user_institution_id()
    )
  );

-- RLS Policies for attendance_records
CREATE POLICY "Users can view attendance in their institution"
  ON public.attendance_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.schedules s
      JOIN public.courses c ON c.id = s.course_id
      WHERE s.id = attendance_records.schedule_id
      AND c.institution_id = public.get_user_institution_id()
    )
  );

CREATE POLICY "Teachers can insert attendance for their courses"
  ON public.attendance_records FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.schedules s
      JOIN public.courses c ON c.id = s.course_id
      WHERE s.id = attendance_records.schedule_id
      AND c.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can update attendance for their courses"
  ON public.attendance_records FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.schedules s
      JOIN public.courses c ON c.id = s.course_id
      WHERE s.id = attendance_records.schedule_id
      AND c.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all attendance"
  ON public.attendance_records FOR ALL
  USING (
    public.get_user_role() = 'admin' AND
    EXISTS (
      SELECT 1 FROM public.schedules s
      JOIN public.courses c ON c.id = s.course_id
      WHERE s.id = attendance_records.schedule_id
      AND c.institution_id = public.get_user_institution_id()
    )
  );

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, institution_id, first_name, last_name, role)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'institution_id')::UUID,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'role')::public.user_role
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();