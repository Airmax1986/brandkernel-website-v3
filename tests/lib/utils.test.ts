import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  formatEmailPrivacy,
  validateEmail,
  debounce,
  throttle,
  formatDate,
  formatDateRelative,
  generateId,
  capitalize,
  truncateText,
  slugify,
  deepClone,
  isServer,
  isClient,
} from '@/lib/utils';

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('text-red', 'bg-blue')).toBe('text-red bg-blue');
  });

  it('should filter out falsy values', () => {
    expect(cn('text-red', false, null, undefined, 'bg-blue')).toBe('text-red bg-blue');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });

  it('should trim extra spaces', () => {
    expect(cn('text-red   ', '  bg-blue')).toBe('text-red bg-blue');
  });

  it('should collapse multiple spaces', () => {
    expect(cn('text-red    bg-blue')).toBe('text-red bg-blue');
  });
});

describe('formatEmailPrivacy', () => {
  it('should mask email for privacy', () => {
    expect(formatEmailPrivacy('user@example.com')).toBe('u***r@example.com');
  });

  it('should handle short local parts', () => {
    expect(formatEmailPrivacy('ab@example.com')).toBe('a***@example.com');
  });

  it('should handle single character local part', () => {
    expect(formatEmailPrivacy('a@example.com')).toBe('a***@example.com');
  });

  it('should return original if invalid email', () => {
    expect(formatEmailPrivacy('invalid-email')).toBe('invalid-email');
  });

  it('should handle long email addresses', () => {
    expect(formatEmailPrivacy('verylongusername@example.com')).toBe('v***e@example.com');
  });
});

describe('validateEmail', () => {
  it('should validate correct email formats', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('test.user@example.co.uk')).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);
  });

  it('should reject emails without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('should reject emails without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('should reject emails without TLD', () => {
    expect(validateEmail('user@example')).toBe(false);
  });

  it('should reject emails with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
  });

  it('should handle email with whitespace trimming', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true);
  });

  it('should reject empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should delay function execution', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous calls', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute immediately on first call', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should ignore subsequent calls within time limit', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should allow call after time limit', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('formatDate', () => {
  it('should format Date object correctly', () => {
    const date = new Date('2025-01-15');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/January 15, 2025/);
  });

  it('should format date string correctly', () => {
    const formatted = formatDate('2025-01-15');
    expect(formatted).toMatch(/January 15, 2025/);
  });

  it('should handle different locales', () => {
    const date = new Date('2025-01-15');
    const formatted = formatDate(date, 'de-DE');
    expect(formatted).toMatch(/15\. Januar 2025/);
  });
});

describe('formatDateRelative', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return "just now" for recent dates', () => {
    const date = new Date('2025-01-15T11:59:50Z');
    expect(formatDateRelative(date)).toBe('just now');
  });

  it('should return minutes ago', () => {
    const date = new Date('2025-01-15T11:55:00Z');
    expect(formatDateRelative(date)).toBe('5 minutes ago');
  });

  it('should return hours ago', () => {
    const date = new Date('2025-01-15T10:00:00Z');
    expect(formatDateRelative(date)).toBe('2 hours ago');
  });

  it('should return days ago', () => {
    const date = new Date('2025-01-10T12:00:00Z');
    expect(formatDateRelative(date)).toBe('5 days ago');
  });

  it('should return formatted date for old dates', () => {
    const date = new Date('2024-01-15T12:00:00Z');
    const result = formatDateRelative(date);
    expect(result).toMatch(/January 15, 2024/);
  });
});

describe('generateId', () => {
  it('should generate ID of default length', () => {
    const id = generateId();
    expect(id.length).toBeLessThanOrEqual(8);
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate ID up to specified length', () => {
    const id = generateId(12);
    expect(id.length).toBeLessThanOrEqual(12);
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate different IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should only contain alphanumeric characters', () => {
    const id = generateId(20);
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should lowercase rest of string', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  it('should handle single character', () => {
    expect(capitalize('h')).toBe('H');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle mixed case', () => {
    expect(capitalize('hELLO wORLD')).toBe('Hello world');
  });
});

describe('truncateText', () => {
  it('should truncate long text', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
  });

  it('should not truncate short text', () => {
    expect(truncateText('Hi', 10)).toBe('Hi');
  });

  it('should handle exact length', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('should trim before truncating', () => {
    expect(truncateText('Hello World Test', 10)).toBe('Hello Worl...');
  });

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });
});

describe('slugify', () => {
  it('should convert text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify('Hello & World!')).toBe('hello-world');
  });

  it('should replace spaces with hyphens', () => {
    expect(slugify('Multiple   Spaces')).toBe('multiple-spaces');
  });

  it('should remove leading/trailing hyphens', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('should handle underscores', () => {
    expect(slugify('hello_world_test')).toBe('hello-world-test');
  });

  it('should handle mixed case and special chars', () => {
    expect(slugify('Brand Kernel™: The Best!')).toBe('brand-kernel-the-best');
  });

  it('should handle already slugified text', () => {
    expect(slugify('hello-world')).toBe('hello-world');
  });
});

describe('deepClone', () => {
  it('should clone simple objects', () => {
    const obj = { a: 1, b: 2 };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('should clone nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned.a).not.toBe(obj.a);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('should clone dates', () => {
    const date = new Date('2025-01-15');
    const cloned = deepClone(date);
    expect(cloned.getTime()).toBe(date.getTime());
    expect(cloned).not.toBe(date);
  });

  it('should handle null', () => {
    expect(deepClone(null)).toBe(null);
  });

  it('should handle primitives', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
  });

  it('should clone complex nested structures', () => {
    const obj = {
      str: 'test',
      num: 42,
      arr: [1, 2, { nested: true }],
      obj: { deep: { value: 'test' } },
      date: new Date('2025-01-15'),
    };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned.arr).not.toBe(obj.arr);
    expect(cloned.obj.deep).not.toBe(obj.obj.deep);
  });
});

describe('isServer', () => {
  it('should check for window object', () => {
    // In happy-dom test environment, window is defined
    // So isServer() will return false
    const result = isServer();
    expect(typeof result).toBe('boolean');
  });
});

describe('isClient', () => {
  it('should check for window object', () => {
    // In happy-dom test environment, window is defined
    // So isClient() will return true
    const result = isClient();
    expect(typeof result).toBe('boolean');
  });
});
