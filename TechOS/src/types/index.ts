// Core types for the application
export type UserRole = 'admin' | 'teacher' | 'student' | 'representative';
export type InstitutionType = 'school' | 'university' | 'institute';
export type AttendanceStatus = 'present' | 'absent';

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

// Job Offers types - MEJORADO
export interface JobOffer {
  id: string;
  institution_id?: string;
  institution_name: string;
  institution_details?: string;
  position_title: string;
  branch?: string;
  description?: string;
  requirements: string;
  experience_level?: 'Junior' | 'Intermedio' | 'Senior';
  education_level?: string;
  tentative_salary?: string;
  schedule?: string;
  benefits?: string;
  application_deadline?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

// NUEVO: Job Application types
export interface JobApplication {
  id: string;
  user_id: string;
  job_offer_id: string;
  status: 'submitted' | 'reviewing' | 'accepted' | 'rejected' | 'withdrawn';
  cover_letter?: string;
  resume_url?: string;
  portfolio_url?: string;
  phone?: string;
  email?: string;
  additional_info?: Record<string, any>;
  submitted_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

// NUEVO: Job Application Summary (vista)
export interface JobApplicationSummary {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  user_email: string;
  position_title: string;
  institution_name: string;
  status: string;
  submitted_at: string;
  reviewed_at?: string;
  total_applications_for_offer: number;
  application_number: number;
}

// NUEVO: Application Audit Log
export interface ApplicationAuditLog {
  id: string;
  application_id: string;
  action: string;
  old_status?: string;
  new_status?: string;
  changed_by?: string;
  changed_at: string;
  notes?: string;
}

// NUEVO: Job Applications Stats
export interface JobApplicationsStats {
  total_applications: number;
  pending_applications: number;
  accepted_applications: number;
  rejected_applications: number;
  unique_applicants: number;
  offers_with_applications: number;
}

// Application types
export interface Application {
  id: string;
  user_id: string;
  type: 'teacher' | 'institution';
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  created_at: string;
  updated_at: string;
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
