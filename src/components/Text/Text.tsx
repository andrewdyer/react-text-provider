import React from 'react';
import { useText } from '../../hooks';

export interface TextProps {
    textKey: string;
}

const Text: React.FC<TextProps> = ({ textKey }) => {
    const text = useText(textKey);

    return <React.Fragment>{text}</React.Fragment>;
}

export default Text;