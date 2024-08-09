import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextProvider } from '../../contexts';
import Text from './Text';

const texts = {
    greeting: 'Hello, World!',
    welcome: {
        message: 'Welcome to our application'
    }
};

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TextProvider texts={texts}>{children}</TextProvider>
);

describe('Text', () => {
    test('should return the correct value from context', () => {
        render(<Text textKey="greeting" />, { wrapper });

        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    test('should return the correct value for a nested key', () => {
        render(<Text textKey="welcome.message" />, { wrapper });

        expect(screen.getByText('Welcome to our application')).toBeInTheDocument();
    });

    test('should return the key if the value is not found', () => {
        render(<Text textKey="nonexistent" />, { wrapper });

        expect(screen.getByText('nonexistent')).toBeInTheDocument();
    });

    test('should return the key if the nested value is not found', () => {
        render(<Text textKey="welcome.nonexistent" />, { wrapper });

        expect(screen.getByText('welcome.nonexistent')).toBeInTheDocument();
    });

    test('should render as h1 tag when as prop is h1', () => {
        render(<Text as="h1" textKey="greeting" />, { wrapper });

        const element = screen.getByText('Hello, World!');
        expect(element.tagName).toBe('H1');
    });

    test('should render as p tag when as prop is p', () => {
        render(<Text as="p" textKey="greeting" />, { wrapper });

        const element = screen.getByText('Hello, World!');
        expect(element.tagName).toBe('P');
    });
});
