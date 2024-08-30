const getBrowserLanguage = (supportedLanguages: string[]): string => {
    const language = navigator.language || '';
    const languagePrefix = language.split('-')[0];

    return supportedLanguages.indexOf(languagePrefix) !== -1
        ? languagePrefix
        : supportedLanguages[0];
};

export default getBrowserLanguage;
