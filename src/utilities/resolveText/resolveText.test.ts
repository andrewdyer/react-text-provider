import { resolveText } from './resolveText';

describe('resolveText', () => {
    const texts = {
        greeting: 'Hello, World!',
        welcome: {
            message: 'Welcome to our application'
        }
    };

    test('should return the correct value for a valid key', () => {
        expect(resolveText(texts, 'greeting')).toBe('Hello, World!');
    });

    test('should return the key if the value is not found', () => {
        expect(resolveText(texts, 'nonexistent')).toBe('nonexistent');
    });

    test('should return the correct value for a nested key', () => {
        expect(resolveText(texts, 'welcome.message')).toBe('Welcome to our application');
    });

    test('should return the key if the nested value is not found', () => {
        expect(resolveText(texts, 'welcome.nonexistent')).toBe('welcome.nonexistent');
    });
});
