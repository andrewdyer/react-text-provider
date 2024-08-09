import { resolveText } from '../resolveText';

let globalTexts: Record<string, any> | undefined;

export const initGlobalTexts = (texts: Record<string, any>) => {
    globalTexts = texts;
};

export const resetGlobalTexts = () => {
    globalTexts = undefined;
};

export const getText = (key: string): string => {
    if (!globalTexts) {
        throw new Error('getText: texts have not been initialized');
    }

    return resolveText(globalTexts, key);
};
