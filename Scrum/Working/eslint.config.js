import { FlatCompat } from '@eslint/eslintrc';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'public/**',
      'src/controller/**',
    ],
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
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': [
        'warn', 
        { allow: ['warn', 'error', 'info', 'debug'] }
      ],
    },
  },
];
