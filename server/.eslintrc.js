module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'prefer-arrow-callback': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'eslint-comments/no-use': [
      'error',
      { allow: ['eslint-disable-next-line'] },
    ],
  },
};
