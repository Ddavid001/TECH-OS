import { z } from 'zod';
import { UserRole, InstitutionType } from '@/types';

/**
 * Common validation schemas
 */
export const emailSchema = z.string().email('Por favor, ingresa un email válido');
export const passwordSchema = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres');
export const nameSchema = z.string().min(1, 'Este campo es obligatorio').max(50, 'Máximo 50 caracteres');
export const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/, 'Formato de teléfono inválido').optional();

/**
 * User role validation
 */
export const userRoleSchema = z.enum(['admin', 'teacher', 'student', 'representative'] as const);

/**
 * Institution type validation
 */
export const institutionTypeSchema = z.enum(['school', 'university', 'institute'] as const);

/**
 * Login form validation
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

/**
 * Registration form validation
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: nameSchema,
  lastName: nameSchema,
  role: userRoleSchema,
  institutionId: z.string().uuid('ID de institución inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

/**
 * Complete registration form validation
 */
export const completeRegistrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  role: userRoleSchema,
  institutionId: z.string().uuid('ID de institución inválido'),
});

/**
 * Institution validation
 */
export const institutionSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  type: institutionTypeSchema,
  address: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

/**
 * Course validation
 */
export const courseSchema = z.object({
  name: z.string().min(1, 'El nombre del curso es obligatorio').max(100, 'Máximo 100 caracteres'),
  teacherId: z.string().uuid('ID de profesor inválido').optional(),
});

/**
 * File upload validation
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().default(5 * 1024 * 1024), // 5MB default
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'application/pdf']),
});

/**
 * Location validation
 */
export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

/**
 * Application form validation
 */
export const teacherApplicationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  experience: z.string().optional(),
  education: z.string().optional(),
  documents: z.array(z.string()).min(1, 'Debes subir al menos un documento'),
});

export const institutionApplicationSchema = z.object({
  name: z.string().min(1, 'El nombre de la institución es obligatorio'),
  type: institutionTypeSchema,
  address: z.string().min(1, 'La dirección es obligatoria'),
  contactName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  documents: z.array(z.string()).min(1, 'Debes subir al menos un documento'),
});

/**
 * Validation utility functions
 */
export class ValidationUtils {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    return emailSchema.safeParse(email).success;
  }

  /**
   * Validate password strength
   */
  static isStrongPassword(password: string): boolean {
    return passwordSchema.safeParse(password).success;
  }

  /**
   * Validate file size
   */
  static isValidFileSize(file: File, maxSize: number = 5 * 1024 * 1024): boolean {
    return file.size <= maxSize;
  }

  /**
   * Validate file type
   */
  static isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate coordinates
   */
  static isValidCoordinates(lat: number, lng: number): boolean {
    return locationSchema.safeParse({ latitude: lat, longitude: lng }).success;
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Validate Venezuelan phone number
   */
  static isValidVenezuelanPhone(phone: string): boolean {
    const phoneRegex = /^(\+58|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
  }

  /**
   * Validate Venezuelan ID (Cédula)
   */
  static isValidVenezuelanId(id: string): boolean {
    const idRegex = /^[VE]-\d{7,8}$/i;
    return idRegex.test(id);
  }
}

/**
 * Form validation hook
 */
export const useFormValidation = <T extends z.ZodType>(schema: T) => {
  const validate = (data: unknown): { success: boolean; errors?: z.ZodError } => {
    const result = schema.safeParse(data);
    return {
      success: result.success,
      errors: result.success ? undefined : result.error,
    };
  };

  return { validate };
};
