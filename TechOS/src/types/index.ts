// Core types for the application
export type UserRole = 'admin' | 'teacher' | 'student' | 'representative';
export type InstitutionType = 'school' | 'university' | 'institute';
export type AttendanceStatus = 'present' | 'absent';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'temporary';
export type JobStatus = 'active' | 'closed' | 'draft';
export type EducationLevel = 'bachelors' | 'masters' | 'phd' | 'specialist';
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';

// Database entity types
export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  address?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface Profile {
  id: string;
  institution_id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
  created_at: string;
}

export interface Course {
  id: string;
  institution_id: string;
  name: string;
  teacher_id?: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  course_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  schedule_id: string;
  student_id: string;
  date: string;
  status: AttendanceStatus;
  created_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  created_at: string;
}

export interface RepresentativeLink {
  id: string;
  representative_id: string;
  student_id: string;
  created_at: string;
}

// Application specific types
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  attendanceToday: number;
  attendanceRate: number;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  institution_id: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  institutionId: string;
}

export interface CompleteRegistrationForm {
  firstName: string;
  lastName: string;
  role: UserRole;
  institutionId: string;
}

// Map and location types
export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: InstitutionType;
  address?: string;
}

// Application types
export interface Application {
  id: string;
  user_id: string;
  type: 'teacher' | 'institution';
  status: 'pending' | 'approved' | 'rejected';
  data?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    experience?: string;
    education?: string;
  };
  documents: string[];
  created_at: string;
  updated_at: string;
}

// Teacher Profile types
export interface TeacherProfile {
  id: string;
  user_id: string;
  specialties: string[];
  education_level?: EducationLevel;
  years_of_experience: number;
  certifications: string[];
  languages: string[];
  bio?: string;
  cv_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  created_at: string;
  updated_at: string;
}

// Job Offer types
export interface JobOffer {
  id: string;
  institution_id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  subject_area: string;
  job_type: JobType;
  status: JobStatus;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  benefits: string[];
  vacancies: number;
  application_deadline?: string;
  start_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  // Relations
  institution?: Institution;
}

// Job Application types
export interface JobApplication {
  id: string;
  job_offer_id: string;
  teacher_id: string;
  application_id?: string;
  status: ApplicationStatus;
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
  created_at: string;
  updated_at: string;
  // Relations
  job_offer?: JobOffer;
  teacher?: Profile & { teacher_profile?: TeacherProfile };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  roles?: UserRole[];
}
