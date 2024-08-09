import React from 'react';
import TextContext from '../TextContext';

export interface TextProviderProps {
    texts: Record<string, any>;
    children: React.ReactNode;
}

const TextProvider: React.FC<TextProviderProps> = ({ texts, children }) => {
    return <TextContext.Provider value={texts}>{children}</TextContext.Provider>;
};

export default TextProvider;
