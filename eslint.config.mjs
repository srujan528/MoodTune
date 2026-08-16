import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow @ts-nocheck and @ts-ignore for Framer Motion type issues
      "@typescript-eslint/ban-ts-comment": "off",
      // Allow explicit any for Framer Motion complex types
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unused vars in some cases
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;