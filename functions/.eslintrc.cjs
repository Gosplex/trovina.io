module.exports = {
  root: true,
  env: {
    es6: true,
    node: true, // Node globals (process, Buffer, etc.)
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },

  extends: [
    "eslint:recommended",
    "google",
  ],

  globals: {
    process: "readonly", // ✅ FIXES: 'process' is not defined
  },

  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },

  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
