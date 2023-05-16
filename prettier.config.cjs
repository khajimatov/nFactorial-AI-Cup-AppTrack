/** @type {import("prettier").Config} */
module.exports = {
  tabWidth: 2,
  printWidth: 100,
  semi: true,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^~/types/(.*)$",
    "^~/config/(.*)$",
    "^~/lib/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
};
