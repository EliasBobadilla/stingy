import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginSecurity from 'eslint-plugin-security';
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

/**
 * @type {import("eslint").Linter.Config}
 * */
export const baseConfig = [
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    rules: {
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  {
    plugins: {
      "sort-keys-fix": sortKeysFix,
    },
    rules: {
      "sort-keys-fix/sort-keys-fix": "warn"
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSecurity.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "dist/**",
      ".next/**",
      "node_modules/**",
      ".turbo/**",
      ".vscode/**",
    ],
  },
];
