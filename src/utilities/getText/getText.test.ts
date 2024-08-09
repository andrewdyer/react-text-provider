import { initGlobalTexts, getText, resetGlobalTexts } from './getText';

describe('initGlobalTexts, resetGlobalTexts and getText', () => {
    const texts = {
        greeting: 'Hello, World!',
        welcome: {
            message: 'Welcome to our application'
        }
    };

    beforeEach(() => {
        resetGlobalTexts();
    });

    test('should return the correct value after initialization', () => {
        initGlobalTexts(texts);
        expect(getText('greeting')).toBe('Hello, World!');
    });

    test('should return the key if the text is not found', () => {
        initGlobalTexts(texts);
        expect(getText('nonexistent')).toBe('nonexistent');
    });

    test('should return the correct value for a nested key', () => {
        initGlobalTexts(texts);
        expect(getText('welcome.message')).toBe('Welcome to our application');
    });

    test('should return the key if the nested value is not found', () => {
        initGlobalTexts(texts);
        expect(getText('welcome.nonexistent')).toBe('welcome.nonexistent');
    });

    test('should throw an error if getText is called before initGlobalTexts', () => {
        expect(() => getText('welcome.message')).toThrow(
            'getText: texts have not been initialized'
        );
    });
});
