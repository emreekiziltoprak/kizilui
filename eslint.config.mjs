// Root ESLint flat config for the monorepo
// Uses @typescript-eslint for TS, plus minimal React + Hooks rules
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      ".yarn/**",
      ".pnp.cjs",
      ".pnp.loader.mjs",
      ".eslintrc.js",
      "**/dist/**",
      "**/lib/**",
      "**/coverage/**",
      "**/.storybook/**",
      "**/.cache/**",
      "site/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}", "*.{js,mjs,cjs}", "packages/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2021,
      globals: {
        // Node.js globals for script files
        require: "readonly",
        module: "readonly",
        exports: "writable",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        Buffer: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["**/*.{ts,tsx}", "packages/**/*.{ts,tsx}", "*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: 2021,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // React modern JSX runtime
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Common TS tweaks
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
    },
  },
  // Disable any formatting-related rules in favor of Prettier
  {
    rules: {
      ...prettier.rules,
    },
  },
];
