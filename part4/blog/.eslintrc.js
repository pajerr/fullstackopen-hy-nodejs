module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  /*
eqeqeq warns if equality is made without triple equlals operator
prevent unnecessary trailing spaces at the ends of lines 
require that there is always a space before and after curly braces
demand a consistent use of whitespaces in the function parameters of arrow functions.
disable warning about console.log commands
*/
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0
  }
}
