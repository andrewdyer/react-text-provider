import { resolveText } from '../resolveText';

interface GlobalTexts {
    [language: string]: Record<string, any>;
}

let globalTexts: GlobalTexts | undefined;
let currentLanguage: string | undefined;

export const initGlobalTexts = (texts: GlobalTexts, initialLanguage: string) => {
    globalTexts = texts;
    currentLanguage = initialLanguage;
};

export const resetGlobalTexts = () => {
    globalTexts = undefined;
    currentLanguage = undefined;
};

export const setGlobalLanguage = (language: string) => {
    if (!globalTexts || !globalTexts[language]) {
        throw new Error(
            `setGlobalLanguage: language "${language}" is not supported or texts are not initialized`
        );
    }
    currentLanguage = language;
};

export const getText = (key: string): string => {
    if (!globalTexts || !currentLanguage) {
        throw new Error('getText: texts have not been initialized or language is not set');
    }

    const languageTexts = globalTexts[currentLanguage];

    return resolveText(languageTexts, key);
};
