module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'sort-class-members',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // TODO: make this work with nestjs routes
    // 'sort-class-members/sort-class-members': [
    //   2,
    //   {
    //     order: [
    //       '[static-properties]',
    //       '[static-methods]',
    //       '[properties]',
    //       '[conventional-private-properties]',
    //       'constructor',
    //       '[sorted-methods]',
    //       '[conventional-private-methods]',
    //     ],
    //     groups: {
    //       'sorted-methods': [{ type: 'method', sort: 'alphabetical' }],
    //     },
    //     accessorPairPositioning: 'getThenSet',
    //   },
    // ],
  },
};
