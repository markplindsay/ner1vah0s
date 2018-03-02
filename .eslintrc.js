module.exports = {
    env: {
      browser: true,
    },
    extends: 'airbnb',
    globals: {
      config: true,
    },
    parser: 'babel-eslint',
    rules: {
      'import/first': 'off',
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'react/jsx-filename-extension': { extensions: ['.js'] },
      'react/no-typos': 'off',
      'semi': 'off',
    },
}
