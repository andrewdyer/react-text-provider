import React from 'react';
import { useText } from '../../hooks';

interface TextProps {
    as?: keyof JSX.IntrinsicElements;
    textKey: string;
}

const Text: React.FC<TextProps> = ({ as: Component = React.Fragment, textKey }) => {
    const text = useText(textKey);

    return <Component>{text}</Component>;
};

export default Text;
