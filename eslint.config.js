import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);

// import js from "@eslint/js";
// import tseslint from "typescript-eslint";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import prettier from "eslint-plugin-prettier";
// import globals from "globals";

// export default [
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   {
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.es2021,
//       },
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         project: true,
//       },
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       prettier,
//     },
//     rules: {
//       "prettier/prettier": "error",
//       "react-hooks/rules-of-hooks": "error",
//       "react-hooks/exhaustive-deps": "warn",
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ];
