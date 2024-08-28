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
        const { result } = renderHook(() => useText('greeting'), { wrapper });

        expect(result.current).toBe('Hello, World!');
    });

    test('should return the correct value when called with a nested key', () => {
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

    test('should return a function when called without a key', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        if (typeof result.current !== 'string') {
            expect(typeof result.current.t).toBe('function');
        } else {
            throw new Error('Expected useText to return an object with a t function');
        }
    });

    test('should return the correct value when called with a key using the t function', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        if (typeof result.current !== 'string') {
            const label = result.current.t('greeting');
            expect(label).toBe('Hello, World!');
        } else {
            throw new Error('Expected useText to return an object with a t function');
        }
    });

    test('should return the key if the value is not found in context using the t function', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        if (typeof result.current !== 'string') {
            const label = result.current.t('nonexistent');
            expect(label).toBe('nonexistent');
        } else {
            throw new Error('Expected useText to return an object with a t function');
        }
    });

    test('should return the key if the nested value is not found in context using the t function', () => {
        const { result } = renderHook(() => useText(), { wrapper });

        if (typeof result.current !== 'string') {
            const label = result.current.t('welcome.nonexistent');
            expect(label).toBe('welcome.nonexistent');
        } else {
            throw new Error('Expected useText to return an object with a t function');
        }
    });
});
