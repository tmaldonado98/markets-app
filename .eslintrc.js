module.exports = {
  root: true,
  env: {
    browser: true,
  },
  globals: {
    document: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/errors"],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"],
        "moduleDirectory": ["src", "node_modules"]
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    allowImportingTsExtensions: true,
    jsx: 'preserve',
    // project: './tsconfig.json',
    // tsconfigRootDir: 'markets-app-r',
  },
  "rules": {
    "@typescript-eslint/no-var-requires": "off",
    '@typescript-eslint/no-empty-function': 'off',
  }
}
