import React from 'react';
import { render, screen } from '@testing-library/react';
import { useText } from '../../hooks';
import TextProvider from './TextProvider';

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

const TestComponent: React.FC<{ keyToTest: string }> = ({ keyToTest }) => {
    const text = useText();

    const label = text(keyToTest);

    return <div>{label}</div>;
};

describe('TextProvider and useText', () => {
    test('should provide the correct text value via context in English', () => {
        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="greeting" />
            </TextProvider>
        );
        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    test('should provide the correct text value via context in Spanish', () => {
        render(
            <TextProvider texts={texts} initialLanguage="es">
                <TestComponent keyToTest="greeting" />
            </TextProvider>
        );
        expect(screen.getByText('¡Hola, Mundo!')).toBeInTheDocument();
    });

    test('should provide the correct value for a nested key in English', () => {
        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="welcome.message" />
            </TextProvider>
        );
        expect(screen.getByText('Welcome to our application')).toBeInTheDocument();
    });

    test('should provide the correct value for a nested key in Spanish', () => {
        render(
            <TextProvider texts={texts} initialLanguage="es">
                <TestComponent keyToTest="welcome.message" />
            </TextProvider>
        );
        expect(screen.getByText('Bienvenido a nuestra aplicación')).toBeInTheDocument();
    });

    test('should warn and return the key if the text is not found in the context', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="nonexistent" />
            </TextProvider>
        );
        expect(screen.getByText('nonexistent')).toBeInTheDocument();
        expect(consoleWarnSpy).toHaveBeenCalledWith('Text key "nonexistent" not found');

        consoleWarnSpy.mockRestore();
    });

    test('should warn and return the key if the nested value is not found in the context', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="welcome.nonexistent" />
            </TextProvider>
        );
        expect(screen.getByText('welcome.nonexistent')).toBeInTheDocument();
        expect(consoleWarnSpy).toHaveBeenCalledWith('Text key "welcome.nonexistent" not found');

        consoleWarnSpy.mockRestore();
    });

    test('should return an empty object if the selected language does not exist in the texts', () => {
        render(
            <TextProvider texts={texts} initialLanguage="fr">
                <TestComponent keyToTest="greeting" />
            </TextProvider>
        );
        expect(screen.getByText('greeting')).toBeInTheDocument();
    });

    test('should throw an error if useText is used outside of TextProvider', () => {
        const TestComponentWithoutProvider = () => {
            try {
                const text = useText();

                const label = text('greeting');

                return <div>{label}</div>;
            } catch (e) {
                return <div>{(e as Error).message}</div>;
            }
        };

        render(<TestComponentWithoutProvider />);
        expect(screen.getByText('useText must be used within a TextProvider')).toBeInTheDocument();
    });
});
