const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const ngPlugin = require('@angular-eslint/eslint-plugin');
const ngTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const ngTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'out-tsc/**',
      '**/*.spec.ts',
      '**/karma.conf.js'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': ngPlugin
    },
    rules: {}
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: ngTemplateParser
    },
    plugins: {
      '@angular-eslint/template': ngTemplatePlugin
    },
    rules: {}
  }
];
