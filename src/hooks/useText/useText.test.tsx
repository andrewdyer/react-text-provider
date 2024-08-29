import React from 'react';
import { renderHook } from '@testing-library/react';
import { TextProvider } from '../../contexts';
import useText from './useText';

const texts = {
    greeting: 'Hello, World!',
    welcome: {
        message: 'Welcome to our application'
    }
};

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TextProvider texts={texts}>{children}</TextProvider>
);

describe('useText', () => {
    test('should return the correct value when called with a key', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        const text = result.current('greeting')

        expect(text).toBe('Hello, World!');
    });

    test('should return the correct value when called with a nested key', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        const text = result.current('welcome.message');

        expect(text).toBe('Welcome to our application');
    });

    test('should return the key if the value is not found in context', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        const text = result.current('nonexistent');

        expect(text).toBe('nonexistent');
    });

    test('should return the key if the nested value is not found in context', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        const text = result.current('welcome.nonexistent');

        expect(text).toBe('welcome.nonexistent');
    });
});
