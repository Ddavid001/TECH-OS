import { describe, it, expect } from 'vitest';
import { ErrorHandler, ERROR_CODES, ERROR_MESSAGES, AppErrorClass } from '@/lib/error-handler';

describe('ErrorHandler', () => {
  describe('fromSupabaseError', () => {
    it('creates AppError from Supabase error', () => {
      const supabaseError = {
        code: 'auth/invalid-credentials',
        message: 'Invalid login credentials',
      };

      const appError = ErrorHandler.fromSupabaseError(supabaseError);
      
      expect(appError).toBeInstanceOf(AppErrorClass);
      expect(appError.code).toBe('auth/invalid-credentials');
      expect(appError.message).toBe('Invalid login credentials');
    });

    it('handles Supabase error without code', () => {
      const supabaseError = {
        message: 'Database connection failed',
      };

      const appError = ErrorHandler.fromSupabaseError(supabaseError);
      
      expect(appError.code).toBe(ERROR_CODES.UNKNOWN_ERROR);
      expect(appError.message).toBe('Database connection failed');
    });
  });

  describe('fromNetworkError', () => {
    it('creates timeout error for AbortError', () => {
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';

      const appError = ErrorHandler.fromNetworkError(abortError);
      
      expect(appError.code).toBe(ERROR_CODES.NETWORK_TIMEOUT);
      expect(appError.message).toBe(ERROR_MESSAGES[ERROR_CODES.NETWORK_TIMEOUT]);
    });

    it('creates network error for fetch errors', () => {
      const fetchError = new Error('Failed to fetch');

      const appError = ErrorHandler.fromNetworkError(fetchError);
      
      expect(appError.code).toBe(ERROR_CODES.NETWORK_ERROR);
      expect(appError.message).toBe(ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]);
    });
  });

  describe('fromValidationError', () => {
    it('creates validation error with field and message', () => {
      const appError = ErrorHandler.fromValidationError('email', 'Invalid email format');
      
      expect(appError.code).toBe(ERROR_CODES.VALIDATION_REQUIRED_FIELD);
      expect(appError.message).toBe('email: Invalid email format');
    });
  });

  describe('getUserMessage', () => {
    it('returns user-friendly message for known error codes', () => {
      const appError = new AppErrorClass(
        ERROR_CODES.AUTH_INVALID_CREDENTIALS,
        'Invalid credentials'
      );

      const userMessage = ErrorHandler.getUserMessage(appError);
      
      expect(userMessage).toBe(ERROR_MESSAGES[ERROR_CODES.AUTH_INVALID_CREDENTIALS]);
    });

    it('returns original message for unknown error codes', () => {
      const appError = new AppErrorClass('UNKNOWN_CODE', 'Custom error message');

      const userMessage = ErrorHandler.getUserMessage(appError);
      
      expect(userMessage).toBe('Custom error message');
    });
  });

  describe('logError', () => {
    it('logs error information', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const appError = new AppErrorClass(
        ERROR_CODES.AUTH_INVALID_CREDENTIALS,
        'Invalid credentials',
        { userId: '123' }
      );

      ErrorHandler.logError(appError, 'AuthTest');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[AuthTest] Error:',
        expect.objectContaining({
          code: ERROR_CODES.AUTH_INVALID_CREDENTIALS,
          message: 'Invalid credentials',
          details: { userId: '123' },
        })
      );

      consoleSpy.mockRestore();
    });
  });
});

describe('AppErrorClass', () => {
  it('creates error with all properties', () => {
    const error = new AppErrorClass('TEST_CODE', 'Test message', { data: 'test' });
    
    expect(error.name).toBe('AppError');
    expect(error.code).toBe('TEST_CODE');
    expect(error.message).toBe('Test message');
    expect(error.details).toEqual({ data: 'test' });
  });

  it('creates error without details', () => {
    const error = new AppErrorClass('TEST_CODE', 'Test message');
    
    expect(error.code).toBe('TEST_CODE');
    expect(error.message).toBe('Test message');
    expect(error.details).toBeUndefined();
  });
});
