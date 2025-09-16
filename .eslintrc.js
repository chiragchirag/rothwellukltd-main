module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // React rules
    "no-undef": ["error", { typeof: true }],
    "react/no-unescaped-entities": "off",
    "react/jsx-uses-react": "error", // Detect missing React import in JSX files
    "react/jsx-uses-vars": "error", // Detect unused variables in JSX
    "react/prop-types": "off", // Disable prop-types if using TypeScript
    "react/no-danger": "error", // Prevent usage of dangerouslySetInnerHTML
    "react/no-array-index-key": "error", // Enforce providing a unique key for array elements

    // React Hooks rules
    // "react-hooks/rules-of-hooks": "error", // Enforce rules of Hooks
    // "react-hooks/exhaustive-deps": "warn", // Check dependencies of Hooks for useEffect and useCallback

    // General JavaScript rules
    "no-unused-vars": "error", // Detect unused variables
    // "no-console": "error", // Detect console.log and similar console methods
    "no-use-before-define": "error", // Prevent using variables before they are defined
    "prefer-const": "error", // Encourage using const for variables that are not reassigned
    camelcase: ["error", { properties: "always" }],
    "id-denylist": ["error", "snake_case"],
    "no-duplicate-imports": "error", // Prevent importing the same module multiple times
    "no-var": "error", // Disallow using var to declare variables
    "prefer-template": "error", // Encourage using template literals instead of concatenation
    "prefer-destructuring": ["error", { array: true, object: true }], // Encourage using destructuring assignment
    "no-loop-func": "error", // Prevent creating functions inside loops
    "no-multi-spaces": "error", // Disallow multiple consecutive spaces
    "no-useless-concat": "error", // Disallow unnecessary string concatenation
    "no-alert": "error", // Prevent usage of alert, confirm, and prompt
    "no-process-env": "off", // Prevent usage of process.env
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true },
    ], // Detect unused expressions
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='setInterval']", // Restrict usage of setInterval function
        message: "Please unregister timers in clean-up effects.", // Provide a custom error message
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect", // You can specify the exact version here if you know it
    },
  },
};
