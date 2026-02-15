# React + TypeScript + Vite - Feature-First Architecture

This is a React application built with TypeScript and Vite, following a feature-first architecture for better scalability and maintainability.

## Project Structure

```
apps/react-vite/
├── public/                    # Static assets
│   ├── icons/
│   ├── illusteration/
│   └── manifest.json
├── src/
│   ├── assets/                # Images, icons, fonts
│   ├── app/                   # Application-wide config
│   │   ├── store.ts           # Store configuration
│   │   └── hooks.ts           # Shared app hooks
│   ├── features/              # Feature-first folders (each feature self-contained)
│   │   ├── auth/              # Authentication feature
│   │   │   ├── components/    # Auth UI components
│   │   │   └── api/           # Auth API calls
│   │   ├── bills/             # Bills management feature
│   │   ├── friends/           # Friends feature
│   │   ├── groups/            # Groups feature
│   │   ├── posts/             # Posts feature
│   │   ├── profile/           # User profile feature
│   │   ├── notifications/     # Notifications
│   │   └── users/             # User management
│   ├── components/            # Reusable/shared UI components
│   │   ├── ui/                # UI primitives (Button, Input, etc.)
│   │   └── layout/            # Layout components (Header, etc.)
│   ├── services/              # Shared services (API client, etc.)
│   │   └── http.ts
│   ├── hooks/                 # Global custom hooks
│   ├── routes/                # Route declarations
│   ├── store/                 # State management
│   │   └── slices/            # Zustand store slices
│   ├── utils/                 # Helpers & utilities
│   ├── App.tsx                # App root
│   └── main.tsx               # Entry point
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── .env.example               # Sample environment variables
├── package.json
└── tsconfig.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format:fix` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run preview` - Preview production build

## Features

- ⚡️ Vite for fast development and building
- ⚛️ React 19 with TypeScript
- 🎨 Chakra UI for component library
- 🎯 TanStack Query for data fetching
- 🗂️ Feature-first architecture
- 📱 PWA support with service workers
- 🌐 Internationalization (RTL support)
- 🎨 Tailwind CSS for styling



```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
