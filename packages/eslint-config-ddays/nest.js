module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "standard",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist/*"],
    plugins: ["@typescript-eslint", "simple-import-sort"],
    rules: {
        "no-useless-constructor": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
            },
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
};