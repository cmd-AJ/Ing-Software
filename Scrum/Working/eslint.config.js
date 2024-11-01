import { FlatCompat } from '@eslint/eslintrc';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      // Define your custom rules here or use recommended ones
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Example rule override
      '@typescript-eslint/no-unused-vars': 'error', // Example custom rule
    },
  },
];