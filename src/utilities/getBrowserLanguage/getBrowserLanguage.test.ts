import getBrowserLanguage from './getBrowserLanguage';

describe('getBrowserLanguage', () => {
    beforeAll(() => {
        Object.defineProperty(navigator, 'language', {
            writable: true,
            value: 'es-ES'
        });
    });

    test('should return the correct language prefix if it is supported', () => {
        const supportedLanguages = ['en', 'es', 'fr'];
        const language = getBrowserLanguage(supportedLanguages);
        expect(language).toBe('es');
    });

    test('should return the default language if the browser language is not supported', () => {
        Object.defineProperty(navigator, 'language', {
            writable: true,
            value: 'de-DE'
        });

        const supportedLanguages = ['en', 'es', 'fr'];
        const language = getBrowserLanguage(supportedLanguages);
        expect(language).toBe('en');
    });

    test('should return the default language if browser language is undefined', () => {
        Object.defineProperty(navigator, 'language', {
            writable: true,
            value: undefined
        });

        const supportedLanguages = ['en', 'es', 'fr'];
        const language = getBrowserLanguage(supportedLanguages);
        expect(language).toBe('en');
    });

    test('should return the correct language for language with a region code', () => {
        Object.defineProperty(navigator, 'language', {
            writable: true,
            value: 'en-US'
        });

        const supportedLanguages = ['en', 'es', 'fr'];
        const language = getBrowserLanguage(supportedLanguages);
        expect(language).toBe('en');
    });

    test('should handle an empty supportedLanguages array gracefully', () => {
        Object.defineProperty(navigator, 'language', {
            writable: true,
            value: 'en-US'
        });

        const supportedLanguages: string[] = [];
        const language = getBrowserLanguage(supportedLanguages);
        expect(language).toBe(undefined);
    });
});
