import React from 'react';
import { render, screen } from '@testing-library/react';
import { useText } from '../../hooks';
import TextProvider from './TextProvider';

const texts = {
    greeting: 'Hello, World!',
    welcome: {
        message: 'Welcome to our application'
    }
};
const TestComponent: React.FC<{ keyToTest: string }> = ({ keyToTest }) => {
    const text = useText(keyToTest);
    return <div>{text}</div>;
};

describe('TextProvider and useText', () => {
    test('should provide the correct text value via context', () => {
        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="greeting" />
            </TextProvider>
        );
        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    test('should provide the correct value for a nested key', () => {
        render(
            <TextProvider texts={texts}>
                <TestComponent keyToTest="welcome.message" />
            </TextProvider>
        );
        expect(screen.getByText('Welcome to our application')).toBeInTheDocument();
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

    test('should throw an error if useText is used outside of TextProvider', () => {
        const TestComponentWithoutProvider = () => {
            try {
                const text = useText('greeting');
                return <div>{text}</div>;
            } catch (e) {
                return <div>{(e as Error).message}</div>;
            }
        };

        render(<TestComponentWithoutProvider />);
        expect(screen.getByText('useText must be used within a TextProvider')).toBeInTheDocument();
    });
});
