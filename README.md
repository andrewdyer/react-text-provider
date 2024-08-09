# React Text Provider

A package for managing and accessing text strings throughout your application.

## Getting Started

To install this package use npm:

```bash
npm install react-text-provider
```

## Usage

### Define Your Texts

First, define your text configuration in a separate file. This configuration will store all the text strings your app needs:

```ts
// texts.ts
export const texts = {
    greeting: 'Hello, World!',
    welcome: {
        message: 'Welcome to our application'
    }
};
```

### Inside React Components

Wrap your main application component with the `TextProvider` to make the texts available throughout your app:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TextProvider } from 'react-text-provider';
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
import { useText } from 'react-feature-toggler';

function App() {
    const greeting = useText('greeting');

    return <h1>{greeting}</h1>;
}

export default App;
```

Alternatively, for components that render a lot of text you can use the `Text` component to streamline the process:

```tsx
// App.tsx
import React from 'react';
import { Text } from 'react-feature-toggler';

function App() {
    return (
        <React.Fragment>
            <h1>
                <Text textKey="greeting" />
            </h1>
            <h2>
                <Text textKey="welcome.message" />
            </h2>
        </React.Fragment>
    );
}

export default App;
```

### Outside React Components

If you need to use texts outside of React components (e.g., in validation schemas), initialize your text configuration globally early in your app’s lifecycle:

```ts
// initializeTexts.ts
import { initGlobalTexts } from 'react-text-provider';
import { texts } from './texts';

initGlobalTexts(texts);
```

Then, import this initialization in your entry file:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './initializeTexts';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
        <App />
    document.getElementById('root')
);
```

Then to access text strings in non-React code (e.g., validation schemas, utility functions), use the `getText` helper function.

```ts
// someUtility.ts
import { getText } from 'react-text-provider';

function validate() {
    const errorMessage = getText('validation.error');
    // Use errorMessage in validation logic
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
yalc add react-text-provider
```

This will install the package from the local Yalc store. You can now use it in the project as you would with any other npm package.

### Updating the Package with Yalc

After publishing changes to this package to the local Yalc store, navigate to the project directory and run:

```bash
yalc update react-text-provider
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

### Enabling Publishing

Publishing is controlled by the `PUBLISH_ENABLED` environment variable. To enable publishing, you need to set this variable to true. You can set environment variables in your repository settings:

1. Go to your repository on GitHub.
2. Click on Settings.
3. Navigate to Secrets and variables > Actions.
4. Add a new repository variable named `PUBLISH_ENABLED` and set its value to true.

### Creating and Using an npm Token

To publish the package, you need an npm token:

1. Log in to your npm account.
2. Navigate to Access Tokens in your npm account settings.
3. Generate a new token with the Automation option, especially if you have 2FA enabled.
4. Add the token to your GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions.
    - Add a new secret named `NPM_TOKEN` and paste your npm token.

By configuring these settings, the GitHub Actions workflow will publish your package to npm when you create a new release.
