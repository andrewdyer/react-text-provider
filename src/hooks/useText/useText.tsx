import React from 'react';
import { TextContext } from '../../contexts';
import { resolveText } from '../../utilities';

type UseTextReturn = {
    t: (key: string) => string;
};

const useText = (key?: string): string | UseTextReturn => {
    const texts = React.useContext(TextContext);

    if (!texts) {
        throw new Error('useText must be used within a TextProvider');
    }

    const getText = (k: string) => resolveText(texts, k);

    if (key) {
        return getText(key);
    }

    return { t: getText };
};

export default useText;
