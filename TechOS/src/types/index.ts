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
  jobOffers?: string[];
}

// Job Offer types
export interface JobOffer {
  id: string;
  title: string;
  institution: string;
  institutionType: InstitutionType;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: string;
  contractType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  category: string;
  subject?: string;
  vacancies: number;
  postedDate: string;
  deadline?: string;
  contactEmail?: string;
  isActive: boolean;
}

// Teacher Profile types
export interface TeacherExperience {
  institution: string;
  position: string;
  subject?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface TeacherEducation {
  degree: string;
  institution: string;
  field: string;
  graduationYear: string;
}

export interface TeacherCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

export interface TeacherProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photo?: string;
  bio: string;
  specialties: string[];
  experience: TeacherExperience[];
  education: TeacherEducation[];
  certifications: TeacherCertification[];
  skills: string[];
  languages: string[];
  yearsOfExperience: number;
  cvUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  availableFrom?: string;
  preferredLocations: string[];
  created_at: string;
  updated_at: string;
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

export interface TeacherApplicationData {
  jobOfferId?: string;
  teacherProfile: TeacherProfile;
  coverLetter: string;
  availability: string;
  expectedSalary?: string;
  references: {
    name: string;
    position: string;
    institution: string;
    email: string;
    phone: string;
  }[];
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
