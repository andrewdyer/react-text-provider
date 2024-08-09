export const resolveText = (texts: Record<string, any>, key: string): string => {
    const keys = key.split('.');
    let result: any = texts;

    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            console.warn(`Text key "${key}" not found`);
            return key;
        }
    }

    return typeof result === 'string' ? result : key;
};
