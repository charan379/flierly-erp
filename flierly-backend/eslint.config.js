/* eslint-disable no-undef */
// eslint.config.js
const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tseslintParser = require('@typescript-eslint/parser');
const globals = require('globals');

module.exports = [
  eslint.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'coverage/**'],
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // General rules
      'no-console': 'warn',
      eqeqeq: 'error',
      'no-unused-vars': 'off', // Turn off base rule as it can report incorrect errors
      'space-before-function-paren': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],

      // ES6+ rules
      'arrow-spacing': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
    },
  },
  {
    // Override specific rules for test files
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
