import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextProvider } from '../../contexts';
import Text from './Text';

const texts = {
    en: {
        greeting: 'Hello, World!',
        welcome: {
            message: 'Welcome to our application'
        }
    },
    es: {
        greeting: '¡Hola, Mundo!',
        welcome: {
            message: 'Bienvenido a nuestra aplicación'
        }
    }
};

const wrapper =
    (language: 'en' | 'es') =>
    ({ children }: { children: React.ReactNode }) => (
        <TextProvider texts={texts} initialLanguage={language}>
            {children}
        </TextProvider>
    );

describe('Text', () => {
    test('should return the correct value in English from context', () => {
        render(<Text textKey="greeting" />, { wrapper: wrapper('en') });

        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    test('should return the correct value in Spanish from context', () => {
        render(<Text textKey="greeting" />, { wrapper: wrapper('es') });

        expect(screen.getByText('¡Hola, Mundo!')).toBeInTheDocument();
    });

    test('should return the correct value for a nested key in English', () => {
        render(<Text textKey="welcome.message" />, { wrapper: wrapper('en') });

        expect(screen.getByText('Welcome to our application')).toBeInTheDocument();
    });

    test('should return the correct value for a nested key in Spanish', () => {
        render(<Text textKey="welcome.message" />, { wrapper: wrapper('es') });

        expect(screen.getByText('Bienvenido a nuestra aplicación')).toBeInTheDocument();
    });

    test('should return the key if the value is not found in English context', () => {
        render(<Text textKey="nonexistent" />, { wrapper: wrapper('en') });

        expect(screen.getByText('nonexistent')).toBeInTheDocument();
    });

    test('should return the key if the value is not found in Spanish context', () => {
        render(<Text textKey="nonexistent" />, { wrapper: wrapper('es') });

        expect(screen.getByText('nonexistent')).toBeInTheDocument();
    });

    test('should return the key if the nested value is not found in English context', () => {
        render(<Text textKey="welcome.nonexistent" />, { wrapper: wrapper('en') });

        expect(screen.getByText('welcome.nonexistent')).toBeInTheDocument();
    });

    test('should return the key if the nested value is not found in Spanish context', () => {
        render(<Text textKey="welcome.nonexistent" />, { wrapper: wrapper('es') });

        expect(screen.getByText('welcome.nonexistent')).toBeInTheDocument();
    });

    test('should render as h1 tag when "as" prop is "h1"', () => {
        render(<Text as="h1" textKey="greeting" />, { wrapper: wrapper('en') });

        const element = screen.getByText('Hello, World!');
        expect(element.tagName).toBe('H1');
    });

    test('should render as p tag when "as" prop is "p"', () => {
        render(<Text as="p" textKey="greeting" />, { wrapper: wrapper('en') });

        const element = screen.getByText('Hello, World!');
        expect(element.tagName).toBe('P');
    });
});
