import React from 'react';
import { getBrowserLanguage } from '../../utilities';
import TextContext from '../TextContext';

export interface TextProviderProps {
    texts: Record<string, Record<string, any>>;
    initialLanguage?: string;
    children: React.ReactNode;
}

const TextProvider: React.FC<TextProviderProps> = ({ texts, initialLanguage, children }) => {
    const supportedLanguages = Object.keys(texts);
    const [language, setLanguage] = React.useState<string>(
        initialLanguage || getBrowserLanguage(supportedLanguages)
    );

    const value = React.useMemo(
        () => ({
            texts: texts[language] || {},
            setLanguage
        }),
        [language, texts]
    );

    return <TextContext.Provider value={value}>{children}</TextContext.Provider>;
};

export default TextProvider;
