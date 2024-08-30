import React from 'react';
import { TextContext } from '../../contexts';
import { resolveText } from '../../utilities';

type TextFunction = (key: string) => string;

function useText(): TextFunction {
    const context = React.useContext(TextContext);

    if (!context) {
        throw new Error('useText must be used within a TextProvider');
    }

    return (key: string) => {
        return resolveText(context.texts, key);
    };
}

export default useText;
