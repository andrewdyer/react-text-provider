import React from 'react';
import { renderHook } from '@testing-library/react';
import { TextProvider } from '../../contexts';
import useText from './useText';

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

describe('useText', () => {
    test('should return the correct value in English when called with a key', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('en') });

        const text = result.current('greeting');

        expect(text).toBe('Hello, World!');
    });

    test('should return the correct value in Spanish when called with a key', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('es') });

        const text = result.current('greeting');

        expect(text).toBe('¡Hola, Mundo!');
    });

    test('should return the correct value in English when called with a nested key', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('en') });

        const text = result.current('welcome.message');

        expect(text).toBe('Welcome to our application');
    });

    test('should return the correct value in Spanish when called with a nested key', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('es') });

        const text = result.current('welcome.message');

        expect(text).toBe('Bienvenido a nuestra aplicación');
    });

    test('should return the key if the value is not found in English context', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('en') });

        const text = result.current('nonexistent');

        expect(text).toBe('nonexistent');
    });

    test('should return the key if the value is not found in Spanish context', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('es') });

        const text = result.current('nonexistent');

        expect(text).toBe('nonexistent');
    });

    test('should return the key if the nested value is not found in English context', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('en') });

        const text = result.current('welcome.nonexistent');

        expect(text).toBe('welcome.nonexistent');
    });

    test('should return the key if the nested value is not found in Spanish context', () => {
        const { result } = renderHook(() => useText(), { wrapper: wrapper('es') });

        const text = result.current('welcome.nonexistent');

        expect(text).toBe('welcome.nonexistent');
    });
});
