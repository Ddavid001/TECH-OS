import { describe, it, expect } from 'vitest';
import { ValidationUtils } from '@/lib/validators';

describe('ValidationUtils', () => {
  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(ValidationUtils.isValidEmail('test@example.com')).toBe(true);
      expect(ValidationUtils.isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(ValidationUtils.isValidEmail('invalid-email')).toBe(false);
      expect(ValidationUtils.isValidEmail('@domain.com')).toBe(false);
      expect(ValidationUtils.isValidEmail('user@')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('validates strong passwords', () => {
      expect(ValidationUtils.isStrongPassword('password123')).toBe(true);
      expect(ValidationUtils.isStrongPassword('mypassword')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(ValidationUtils.isStrongPassword('123')).toBe(false);
      expect(ValidationUtils.isStrongPassword('pass')).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('validates file size limits', () => {
      const smallFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(smallFile, 'size', { value: 1024 }); // 1KB
      
      expect(ValidationUtils.isValidFileSize(smallFile, 5 * 1024 * 1024)).toBe(true);
    });

    it('rejects files that are too large', () => {
      const largeFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 }); // 10MB
      
      expect(ValidationUtils.isValidFileSize(largeFile, 5 * 1024 * 1024)).toBe(false);
    });
  });

  describe('isValidFileType', () => {
    it('validates allowed file types', () => {
      const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      
      expect(ValidationUtils.isValidFileType(pdfFile, allowedTypes)).toBe(true);
    });

    it('rejects disallowed file types', () => {
      const textFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      const allowedTypes = ['application/pdf', 'image/jpeg'];
      
      expect(ValidationUtils.isValidFileType(textFile, allowedTypes)).toBe(false);
    });
  });

  describe('isValidCoordinates', () => {
    it('validates correct coordinates', () => {
      expect(ValidationUtils.isValidCoordinates(10.4806, -66.9036)).toBe(true);
      expect(ValidationUtils.isValidCoordinates(0, 0)).toBe(true);
    });

    it('rejects invalid coordinates', () => {
      expect(ValidationUtils.isValidCoordinates(91, 0)).toBe(false);
      expect(ValidationUtils.isValidCoordinates(0, 181)).toBe(false);
      expect(ValidationUtils.isValidCoordinates(-91, 0)).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('sanitizes string input', () => {
      expect(ValidationUtils.sanitizeString('  hello world  ')).toBe('hello world');
      expect(ValidationUtils.sanitizeString('test<script>alert("xss")</script>')).toBe('testalert("xss")');
    });
  });

  describe('isValidVenezuelanPhone', () => {
    it('validates Venezuelan phone numbers', () => {
      expect(ValidationUtils.isValidVenezuelanPhone('+584121234567')).toBe(true);
      expect(ValidationUtils.isValidVenezuelanPhone('04121234567')).toBe(true);
      expect(ValidationUtils.isValidVenezuelanPhone('4121234567')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(ValidationUtils.isValidVenezuelanPhone('123456')).toBe(false);
      expect(ValidationUtils.isValidVenezuelanPhone('+1234567890')).toBe(false);
    });
  });

  describe('isValidVenezuelanId', () => {
    it('validates Venezuelan ID formats', () => {
      expect(ValidationUtils.isValidVenezuelanId('V-12345678')).toBe(true);
      expect(ValidationUtils.isValidVenezuelanId('E-87654321')).toBe(true);
    });

    it('rejects invalid ID formats', () => {
      expect(ValidationUtils.isValidVenezuelanId('12345678')).toBe(false);
      expect(ValidationUtils.isValidVenezuelanId('V12345678')).toBe(false);
    });
  });
});
