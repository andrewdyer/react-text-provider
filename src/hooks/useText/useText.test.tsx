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
    test('should return the correct value from context', () => {
        const { result } = renderHook(() => useText('greeting'), { wrapper });

        expect(result.current).toBe('Hello, World!');
    });

    test('should return the correct value for a nested key', () => {
        const { result } = renderHook(() => useText('welcome.message'), { wrapper });

        expect(result.current).toBe('Welcome to our application');
    });

    test('should return the key if the value is not found in context', () => {
        const { result } = renderHook(() => useText('nonexistent'), { wrapper });

        expect(result.current).toBe('nonexistent');
    });

    test('should return the key if the nested value is not found in context', () => {
        const { result } = renderHook(() => useText('welcome.nonexistent'), { wrapper });

        expect(result.current).toBe('welcome.nonexistent');
    });
});
