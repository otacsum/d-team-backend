module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint/eslint-plugin',
      '@darraghor/nestjs-typed'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@darraghor/nestjs-typed/recommended',
      '../code-standards/js/.eslintrc.js',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'new-cap': 0, // Allows @Decorator() formatted decorator functions.
      '@darraghor/nestjs-typed/api-method-should-specify-api-response':
              'off',
    },
};
