import js from '@eslint/js';
import eslintBoundaries from 'eslint-plugin-boundaries';
import eslintImport from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tsLint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default tsLint.config(
  {
    plugins: {
      'typescript-eslint': tsLint.plugin,
      react: reactPlugin,
      reactJsxRuntime: reactPlugin.configs.flat['jsx-runtime'],
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      import: eslintImport,
      boundaries: eslintBoundaries,
    },
  },
  {
    ignores: [
      '!.*',
      'node_modules',
      'coverage',
      'dist',
      'build',
      '.cache',
      'storybook-static',
      'eslint.config.js',
      'config/eslint/eslint-rules.js',
      'vite.config.ts',
      '.storybook',
      'test',
      'jest.config.ts',
      '*.d.ts',
      '.env',
      '.env.*',
      '*.log',
      'public/',
      'static/',
      '.vscode/',
      '.idea/',
      '*.min.js',
      '*.css',
      '*.scss',
      '*.less',
      '*.svg',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.ico',
      'tmp/',
      'temp/',
      'out/',
      '*.tmp',
      '*.temp',
      '*.iml',
      '.DS_Store',
      'coverage/',
      'reports/',
    ],
  },
  js.configs.recommended,
  ...tsLint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },

      'boundaries/include': ['src/**/*'],

      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'app',
        },
        {
          type: 'pages',
          pattern: 'src/pages/*',
          capture: ['page'],
        },
        {
          type: 'widgets',
          pattern: 'widgets/*',
          capture: ['widget'],
        },
        {
          type: 'features',
          pattern: 'features/*',
          capture: ['feature'],
        },
        {
          type: 'entities',
          pattern: 'entities/*',
          capture: ['entity'],
        },
        {
          type: 'shared',
          pattern: 'shared/*',
          capture: ['segment'],
        },
      ],

      'boundaries/ignore': ['**/*.test.*'],
    },
    rules: {
      // React specific rules
      'react-refresh/only-export-components': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-pascal-case': ['warn', { allowAllCaps: true, ignore: [] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.ts', '.jsx', '.tsx'] }],
      'react/no-children-prop': 'off',

      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      // Import rules
      'import/export': 'error',
      'import/no-deprecated': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unused-modules': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-amd': 'error',
      'import/no-commonjs': 'error',
      'import/no-import-module-exports': 'error',
      'import/no-nodejs-modules': 'off',
      'import/unambiguous': 'off',
      'import/default': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-relative-packages': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/consistent-type-specifier-style': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'never',
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'pages/**', group: 'internal', position: 'after' },
            { pattern: 'widgets/**', group: 'internal', position: 'after' },
            { pattern: 'features/**', group: 'internal', position: 'after' },
            { pattern: 'entities/**', group: 'internal', position: 'after' },
            { pattern: 'shared/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            { target: [['shared', { segment: 'lib' }]], allow: '*/index.ts' },
            { target: [['shared', { segment: 'lib' }]], allow: '*.(ts|tsx)' },
            {
              target: [['shared', { segment: 'constants' }]],
              allow: '**',
            },
            { target: [['shared', { segment: 'ui' }]], allow: '**' },
            { target: [['shared', { segment: 'assets' }]], allow: 'index.ts' },
            { target: [['shared', { segment: 'api' }]], allow: 'index.ts' },
            {
              target: ['app', 'pages', 'widgets', 'features', 'entities'],
              allow: 'index.(ts|tsx)',
            },
          ],
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          message: '${file.type} is not allowed to import (${dependency.type})',
          rules: [
            {
              from: ['shared'],
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message: 'Shared module must not import upper layers (${dependency.type})',
            },
            {
              from: ['entities'],
              disallow: ['app', 'pages', 'widgets', 'features'],
              message: 'Entity must not import upper layers (${dependency.type})',
            },
            {
              from: ['entities'],
              disallow: [['entities', { entity: '!${entity}' }]],
              message: 'Entity must not import other entity',
            },
            {
              from: ['features'],
              disallow: ['app', 'pages', 'widgets'],
              message: 'Feature must not import upper layers (${dependency.type})',
            },
            {
              from: ['features'],
              disallow: [['features', { feature: '!${feature}' }]],
              message: 'Feature must not import other feature',
            },
            {
              from: ['widgets'],
              disallow: ['app', 'pages'],
              message: 'Widget must not import upper layers (${dependency.type})',
            },
            {
              from: ['widgets'],
              disallow: [['widgets', { widget: '!${widget}' }]],
              message: 'Widget must not import other widget',
            },
            {
              from: ['pages'],
              disallow: ['app'],
              message: 'Page must not import upper layers (${dependency.type})',
            },
            {
              from: ['pages'],
              disallow: [['pages', { page: '!${page}' }]],
              message: 'Page must not import other page',
            },
          ],
        },
      ],

      // General JavaScript rules
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-new-symbol': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      // Other rules
      camelcase: 'error',
      'spaced-comment': 'error',
      'no-duplicate-imports': 'error',
      'max-len': ['error', { code: 250 }],
      'no-console': 'error',
    },
  },
);
