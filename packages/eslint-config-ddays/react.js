module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "standard",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        "prettier",
        "next",
    ],
    ignorePatterns: [
        "dist/*",
        // ".eslintrc.cjs",
        "__generated/*",
    ],
    plugins: ["@typescript-eslint", "simple-import-sort"],
    // parser: '@typescript-eslint/parser',
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};