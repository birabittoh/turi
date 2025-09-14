// ESLint v9 flat config migration from .eslintrc.json
export default [
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    },
    rules: {
      'valid-jsdoc': 'off',
      'jsdoc/check-tag-names': 'off',
      'no-console': 'off'
    }
  }
];
