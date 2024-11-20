// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "node/no-unpublished-import": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    "prefer": "type-imports",
                    "fixStyle": "separate-type-imports"
                }
            ],
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/no-import-type-side-effects": "error"
        }
    },
    {
        files: ["docs/**/*.tsx", "docs/**/*.ts"],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.docs.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    }
);