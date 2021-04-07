module.exports = {
  printWidth: 120,
  tabWidth: 2,
  // タブではなくスペースを使う
  useTabs: false,
  // セミコロン不要
  semi: false,
  // シングルクォーテーションを使う
  singleQuote: true,
  // 必要な場合のみ、オブジェクトプロパティを引用符で囲む
  quoteProps: 'as-needed',
  // 末尾にカンマを付けない
  trailingComma: 'none',
  // オブジェクトの {} の内側にスペースを入れる
  bracketSpacing: true,
  // アロー関数のパラメターを常に () で囲む
  arrowParens: 'always',
  // printWidthを超える行は as-is で
  proseWrap: 'preserve',
  // HTMLの空白を区別しない
  htmlWhitespaceSensitivity: 'ignore',
  // Vueファイル内で<scrip>/<style>内のコードをインデントしない
  vueIndentScriptAndStyle: false,
  // 改行文字は LF (UNIX)
  endOfLine: 'lf',
  //引用コードのフォーマットは、Prettierが自動的に識別できる場合にのみフォーマットする
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: ['*.md'],
      options: {
        tabWidth: 4
      }
    }
  ]
}
