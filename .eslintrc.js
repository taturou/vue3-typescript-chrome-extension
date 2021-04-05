module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // スペース2個でインデント
    indent: ['error', 2, { SwitchCase: 1 }],
    // 改行コードはLF
    'linebreak-style': [2, 'unix'],
    // セミコロンを省略する
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': ['error', 'first'],
    'newline-per-chained-call': [2],
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    // console.log() を使わない
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // vue
    'vue/no-deprecated-slot-attribute': 2,
    'vue/no-deprecated-scope-attribute': 2,
    'vue/no-deprecated-slot-scope-attribute': 2,
    'vue/no-deprecated-filter': 2,
    'vue/no-deprecated-v-bind-sync': 2,
    'vue/no-deprecated-v-on-number-modifiers': 2,
    'vue/no-deprecated-events-api': 2,
    'vue/no-deprecated-functional-template': 2,
    'vue/no-deprecated-html-element-is': 2,
    'vue/no-deprecated-vue-config-keycodes': 2,
    'vue/no-deprecated-dollar-listeners-api': 2,
    'vue/no-deprecated-v-on-native-modifier': 2,
    'vue/no-deprecated-dollar-scopedslots-api': 2
  }
}
