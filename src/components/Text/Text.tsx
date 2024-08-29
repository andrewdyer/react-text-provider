import React from 'react';
import { useText } from '../../hooks';

interface TextProps {
    as?: keyof JSX.IntrinsicElements;
    textKey: string;
}

const Text: React.FC<TextProps> = ({ as: Component = React.Fragment, textKey }) => {
    const getText = useText();

    const textValue = getText(textKey);

    return <Component>{textValue}</Component>;
};

export default Text;