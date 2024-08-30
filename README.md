# React Text Toolkit

A package for managing and accessing text strings throughout your application.

## License

Licensed under MIT. Totally free for private or commercial projects.

## Getting Started

To install this package use npm:

```bash
npm install react-text-toolkit
```

## Usage

### Define Your Texts

First, define your text configuration in a separate file. This configuration will store all the text strings your app needs, organized by language:

```ts
// texts.ts
export const texts = {
    en: {
        greeting: 'Hello, World!',
        welcome: {
            message: 'Welcome to our application'
        },
        validation: {
            error: 'This field is required.'
        }
    },
    es: {
        greeting: '¡Hola, Mundo!',
        welcome: {
            message: 'Bienvenido a nuestra aplicación'
        },
        validation: {
            error: 'Este campo es obligatorio.'
        }
    }
};
```

### Inside React Components

Wrap your main application component with the `TextProvider` to make the texts available throughout your app. You can specify an initial language, or it will default to the user’s browser language:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TextProvider } from 'react-text-toolkit';
import App from './App';
import { texts } from './texts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <TextProvider texts={texts}>
        <App />
    </TextProvider>
);
```

Then use the `useText` hook to retrieve text strings in your React components:

```tsx
// App.tsx
import React from 'react';
import { useText } from 'react-text-toolkit';

function App() {
    const text = useText();

    return (
        <div>
            <h1>{text('greeting')}</h1>
            <p>{text('welcome.message')}</p>
        </div>
    );
}

export default App;
```

Alternatively, you can also use the `Text` component for a more streamlined way to render text:

```tsx
// App.tsx
import React from 'react';
import { Text } from 'react-text-toolkit';

function App() {
    return (
        <React.Fragment>
            <Text as="h1" textKey="greeting" />
            <Text as="p" textKey="welcome.message" />
        </React.Fragment>
    );
}

export default App;
```

### Outside React Components

If you need to use texts outside of React components (e.g., in validation schemas), initialize your text configuration globally early in your app’s lifecycle:

```ts
// initializeTexts.ts
import { initGlobalTexts } from 'react-text-toolkit';
import { texts } from './texts';

initGlobalTexts(texts, 'en');
```

Then, import this initialization in your entry file:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './initializeTexts';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```

Then to access text strings in non-React code (e.g., validation schemas, utility functions), use the `getText` helper function.

```ts
// someUtility.ts
import { getText } from 'react-text-toolkit';

function validate() {
    const errorMessage = getText('validation.error');
    // Use errorMessage in validation logic
}
```

You can also switch the global language outside of React components using the `setGlobalLanguage` function:

```ts
// switchLanguage.ts
import { setGlobalLanguage } from 'react-text-toolkit';

function switchLanguageToSpanish() {
    setGlobalLanguage('es');
}
```

And if necessary, you can reset the global texts and language configuration:

```ts
// resetTexts.ts
import { resetGlobalTexts } from 'react-text-toolkit';

function reset() {
    resetGlobalTexts();
}
```

## Local Development

For local development, use Yalc to install this package in your project.

Yalc is a tool for managing local development of npm packages. It allows you to work on this package locally and test it in other projects without publishing to the npm registry.

To use yalc, you need to install it globally on your machine. You can do this using npm:

```bash
npm install yalc -g
```

### Installing the Package with Yalc

First, navigate to the project directory where you want to use this package and run:

```bash
yalc add react-text-toolkit
```

This will install the package from the local Yalc store. You can now use it in the project as you would with any other npm package.

### Updating the Package with Yalc

After publishing changes to this package to the local Yalc store, navigate to the project directory and run:

```bash
yalc update react-text-toolkit
```

This will update the installed version of this package in the project.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds production files in your `dist/` folder. It generates CommonJS, ES Modules, as well as TypeScript declaration files.

### `npm run build:cjs`

Builds CommonJS (CJS) modules for the project.

### `npm run build:esm`

Builds ES Modules (ESM) for the project.

### `npm run build:types`

Generates TypeScript declaration files.

### `npm run clean`

Removes the `dist/` folder to ensure a clean build.

### `npm run format`

Formats the code using Prettier according to the rules defined in package.json.

### `npm run test`

Runs the test suite for the project using Jest.

### `npm run test:watch`

Runs the test suite in watch mode, re-running tests when files change.

### `npm run test:coverage`

Runs the test suite and generates a coverage report.

### `npm run yalc:publish`

Publishes the package to the local Yalc store for local development.

### `npm run yalc:push`

Publishes updates to the package in the local Yalc store and pushes the changes to linked projects.

## Publishing

This repository is configured to publish the package to npm, every time you publish a new release, using GitHub Actions.

### Creating and Using an npm Token

To publish the package, you need an npm token:

1. Log in to your npm account.
2. Navigate to Access Tokens in your npm account settings.
3. Generate a new token with the Automation option, especially if you have 2FA enabled.
4. Add the token to your GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions.
    - Add a new secret named `NPM_TOKEN` and paste your npm token.
