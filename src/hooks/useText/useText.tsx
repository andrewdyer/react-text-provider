import React from 'react';
import { TextContext } from '../../contexts';
import { resolveText } from '../../utilities';

const useText = (key: string): string => {
    const texts = React.useContext(TextContext);

    if (!texts) {
        throw new Error('useText must be used within a TextProvider');
    }

    return resolveText(texts, key);
};

export default useText;
