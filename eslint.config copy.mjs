import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules",
        "docs/dist",
        "cases/spectypes/build",
        "cases/ts-runtime-checks/build",
        "cases/typia/build",
        "cases/deepkit/build",
        "cases/ts-auto-guard/build",
        "cases/ts-auto-guard/src/index.guard.ts",
        "**/jest.config.js",
    ],
}, ...compat.extends("./node_modules/gts/"), {
    languageOptions: {
        globals: {
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "node/no-unpublished-import": "off",

        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
            fixStyle: "separate-type-imports",
        }],

        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
    },
}, {
    files: ["docs/**/*.tsx"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.docs.json",
        },
    },
}];