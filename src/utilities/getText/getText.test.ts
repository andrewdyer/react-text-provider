import { getText, initGlobalTexts, resetGlobalTexts, setGlobalLanguage } from './getText';

describe('initGlobalTexts, setGlobalLanguage, resetGlobalTexts and getText', () => {
    const texts = {
        en: { greeting: 'Hello, World!' },
        es: { greeting: '¡Hola, Mundo!' }
    };

    afterEach(() => {
        resetGlobalTexts();
    });

    test('should initialize and retrieve text in default language', () => {
        initGlobalTexts(texts, 'en');
        expect(getText('greeting')).toBe('Hello, World!');
    });

    test('should switch language and retrieve text in new language', () => {
        initGlobalTexts(texts, 'en');
        setGlobalLanguage('es');
        expect(getText('greeting')).toBe('¡Hola, Mundo!');
    });

    test('should throw an error if texts are not initialized', () => {
        expect(() => getText('greeting')).toThrow(
            'getText: texts have not been initialized or language is not set'
        );
    });

    test('should throw an error if language is not supported', () => {
        initGlobalTexts(texts, 'en');
        expect(() => setGlobalLanguage('fr')).toThrow(
            'setGlobalLanguage: language "fr" is not supported or texts are not initialized'
        );
    });

    test('should throw an error if the language is not set', () => {
        initGlobalTexts(texts, 'en');
        resetGlobalTexts();
        expect(() => getText('greeting')).toThrow(
            'getText: texts have not been initialized or language is not set'
        );
    });
});
