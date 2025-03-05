import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"], // Требует использование точки с запятой
      "indent": ["error", 2], // Два пробела для отступов
      "quotes": ["error", "double"], // Использование двойных кавычек
      "comma-dangle": ["error", "always-multiline"], // Висячая запятая при многострочном коде
      "no-trailing-spaces": "error", // Запрещает пробелы в конце строки
      "space-before-function-paren": ["error", {  // Без пробела перед скобками функции
        anonymous: "never",  // Без пробела у обычных функций
        named: "never",      // Без пробела у именованных функций
        asyncArrow: "always", // Разрешает пробел после `async`
      }],
      "eqeqeq": ["error", "always"], // Использование строгого сравнения
      "no-console": "warn", // Предупреждение при использовании console.log
      "curly": "error", // Обязательное использование фигурных скобок
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Запрещает неиспользуемые переменные, но разрешает _
      "max-len": ["error", { "code": 120, "ignoreUrls": true }], // Максимальная длина строки 140 символов, исключая URL
    },
  },
  {
    ignores: ["dist"], // Игнорирует папку dist
  },
];
