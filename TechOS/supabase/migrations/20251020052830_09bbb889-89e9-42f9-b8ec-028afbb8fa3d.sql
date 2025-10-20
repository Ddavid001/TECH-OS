-- Create storage bucket for class materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('class-materials', 'class-materials', false);

-- Create class_materials table
CREATE TABLE public.class_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_by UUID NOT NULL,
  is_for_absence BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create teacher_absences table
CREATE TABLE public.teacher_absences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL,
  course_id UUID NOT NULL,
  absence_date DATE NOT NULL,
  message TEXT,
  auto_release_materials BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on class_materials
ALTER TABLE public.class_materials ENABLE ROW LEVEL SECURITY;

-- RLS policies for class_materials
CREATE POLICY "Users can view materials in their institution"
ON public.class_materials
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN courses c ON c.id = s.course_id
    WHERE s.id = class_materials.schedule_id
    AND c.institution_id = get_user_institution_id()
  )
);

CREATE POLICY "Teachers can insert materials for their courses"
ON public.class_materials
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN courses c ON c.id = s.course_id
    WHERE s.id = class_materials.schedule_id
    AND c.teacher_id = auth.uid()
  )
);

CREATE POLICY "Teachers can delete materials for their courses"
ON public.class_materials
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN courses c ON c.id = s.course_id
    WHERE s.id = class_materials.schedule_id
    AND c.teacher_id = auth.uid()
  )
);

CREATE POLICY "Teachers can update materials for their courses"
ON public.class_materials
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM schedules s
    JOIN courses c ON c.id = s.course_id
    WHERE s.id = class_materials.schedule_id
    AND c.teacher_id = auth.uid()
  )
);

-- Enable RLS on teacher_absences
ALTER TABLE public.teacher_absences ENABLE ROW LEVEL SECURITY;

-- RLS policies for teacher_absences
CREATE POLICY "Users can view absences in their institution"
ON public.teacher_absences
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM courses c
    WHERE c.id = teacher_absences.course_id
    AND c.institution_id = get_user_institution_id()
  )
);

CREATE POLICY "Teachers can insert their own absences"
ON public.teacher_absences
FOR INSERT
WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Teachers can update their own absences"
ON public.teacher_absences
FOR UPDATE
USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can delete their own absences"
ON public.teacher_absences
FOR DELETE
USING (teacher_id = auth.uid());

-- Storage policies for class-materials bucket
CREATE POLICY "Teachers can view their course materials"
ON storage.objects
FOR SELECT
USING (bucket_id = 'class-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can upload materials"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'class-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can delete materials"
ON storage.objects
FOR DELETE
USING (bucket_id = 'class-materials' AND auth.uid() IS NOT NULL);