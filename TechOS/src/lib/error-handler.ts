import { AppError } from '@/types';

/**
 * Custom error class for application-specific errors
 */
export class AppErrorClass extends Error {
  public readonly code: string;
  public readonly details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Error codes for consistent error handling
 */
export const ERROR_CODES = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_EMAIL_NOT_CONFIRMED: 'AUTH_EMAIL_NOT_CONFIRMED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // Validation errors
  VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_EMAIL: 'VALIDATION_INVALID_EMAIL',
  VALIDATION_PASSWORD_TOO_SHORT: 'VALIDATION_PASSWORD_TOO_SHORT',
  VALIDATION_PASSWORDS_DONT_MATCH: 'VALIDATION_PASSWORDS_DONT_MATCH',
  
  // Database errors
  DB_CONNECTION_ERROR: 'DB_CONNECTION_ERROR',
  DB_QUERY_ERROR: 'DB_QUERY_ERROR',
  DB_CONSTRAINT_VIOLATION: 'DB_CONSTRAINT_VIOLATION',
  
  // File upload errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_INVALID_TYPE: 'FILE_INVALID_TYPE',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

/**
 * Error messages for user-friendly display
 */
export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Credenciales inválidas. Verifica tu email y contraseña.',
  [ERROR_CODES.AUTH_USER_NOT_FOUND]: 'Usuario no encontrado.',
  [ERROR_CODES.AUTH_EMAIL_NOT_CONFIRMED]: 'Por favor, confirma tu email antes de iniciar sesión.',
  [ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS]: 'No tienes permisos para realizar esta acción.',
  
  [ERROR_CODES.VALIDATION_REQUIRED_FIELD]: 'Este campo es obligatorio.',
  [ERROR_CODES.VALIDATION_INVALID_EMAIL]: 'Por favor, ingresa un email válido.',
  [ERROR_CODES.VALIDATION_PASSWORD_TOO_SHORT]: 'La contraseña debe tener al menos 6 caracteres.',
  [ERROR_CODES.VALIDATION_PASSWORDS_DONT_MATCH]: 'Las contraseñas no coinciden.',
  
  [ERROR_CODES.DB_CONNECTION_ERROR]: 'Error de conexión con la base de datos.',
  [ERROR_CODES.DB_QUERY_ERROR]: 'Error al consultar la base de datos.',
  [ERROR_CODES.DB_CONSTRAINT_VIOLATION]: 'Los datos ingresados no son válidos.',
  
  [ERROR_CODES.FILE_TOO_LARGE]: 'El archivo es demasiado grande.',
  [ERROR_CODES.FILE_INVALID_TYPE]: 'Tipo de archivo no válido.',
  [ERROR_CODES.FILE_UPLOAD_FAILED]: 'Error al subir el archivo.',
  
  [ERROR_CODES.NETWORK_ERROR]: 'Error de conexión. Verifica tu internet.',
  [ERROR_CODES.NETWORK_TIMEOUT]: 'La solicitud tardó demasiado tiempo.',
  
  [ERROR_CODES.UNKNOWN_ERROR]: 'Ha ocurrido un error inesperado.',
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Error interno del servidor.',
} as const;

/**
 * Error handler utility functions
 */
export class ErrorHandler {
  /**
   * Create an AppError from a Supabase error
   */
  static fromSupabaseError(error: any): AppErrorClass {
    const code = error.code || ERROR_CODES.UNKNOWN_ERROR;
    const message = error.message || ERROR_MESSAGES[code] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR];
    
    return new AppErrorClass(code, message, error.details);
  }

  /**
   * Create an AppError from a network error
   */
  static fromNetworkError(error: any): AppErrorClass {
    if (error.name === 'AbortError') {
      return new AppErrorClass(ERROR_CODES.NETWORK_TIMEOUT, ERROR_MESSAGES[ERROR_CODES.NETWORK_TIMEOUT]);
    }
    
    return new AppErrorClass(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR], error);
  }

  /**
   * Create an AppError from a validation error
   */
  static fromValidationError(field: string, message: string): AppErrorClass {
    return new AppErrorClass(ERROR_CODES.VALIDATION_REQUIRED_FIELD, `${field}: ${message}`);
  }

  /**
   * Get user-friendly error message
   */
  static getUserMessage(error: AppErrorClass): string {
    return ERROR_MESSAGES[error.code as keyof typeof ERROR_MESSAGES] || error.message;
  }

  /**
   * Log error for debugging
   */
  static logError(error: AppErrorClass, context?: string): void {
    console.error(`[${context || 'App'}] Error:`, {
      code: error.code,
      message: error.message,
      details: error.details,
      stack: error.stack,
    });
  }
}

/**
 * Hook for error handling in React components
 */
export const useErrorHandler = () => {
  const handleError = (error: any, context?: string): AppErrorClass => {
    let appError: AppErrorClass;
    
    if (error instanceof AppErrorClass) {
      appError = error;
    } else if (error?.code && error?.message) {
      // Supabase error
      appError = ErrorHandler.fromSupabaseError(error);
    } else if (error?.name === 'AbortError' || error?.message?.includes('fetch')) {
      // Network error
      appError = ErrorHandler.fromNetworkError(error);
    } else {
      // Unknown error
      appError = new AppErrorClass(ERROR_CODES.UNKNOWN_ERROR, error?.message || 'Error desconocido');
    }
    
    ErrorHandler.logError(appError, context);
    return appError;
  };

  return { handleError };
};
