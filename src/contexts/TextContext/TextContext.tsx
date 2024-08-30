import React from 'react';

interface TextContextType {
    texts: Record<string, any>;
    setLanguage: (language: string) => void;
}

const TextContext = React.createContext<TextContextType | undefined>(undefined);

export default TextContext;
