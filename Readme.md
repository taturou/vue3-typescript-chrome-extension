# Vue.js 3 Chrome Extension Sample

Chrome extension sample with Vue 3 + Vuex 4 + Vur Router 4 + Typescript 4.2 + Webpack 5.

Product name | npm package name | npm package version
:--|:--|:--
Vue.js | vue | 3.0.7
Vuex | vuex | 4.0.0
Vue Router | vue-router | 4.0.5
Typescript | typescript | 4.2.3
Pug | pug | 3.0.2
SASS/SCSS | sass-loader | 11.0.1
Webpack | webpack | 5.26.0

Notes:
* This sample does not use any Vue libraries and any CSS frameworks.
* The manifest version is 2.

---

## Features

### Popup page

It has the following sections.

* Options
  * Opning the options page of this chrome-extension.
* Counter
  * Count Up/Down button.
  * The value will sync between the options page.
* Memos
  * Add a memo.
  * The options page display all memos that are added by this section.
  * The value will sync between the options page.

Those values will be saved to the LocalStorage of Chrome via the Vuex store.

### Options page

It has the following tab.

* Counter
  * It displays the counter value that was updated by the popup page.
* Memos
  * It displays the memos that were added by the popup page.
  * You can update a memo specified.

This page is generated with Vue-Router.

Those values will be saved to the LocalStorage of Chrome via the Vuex store.

### Content script

Not supported yet.

### Backgroud script

This will save the value of the Vuex store to the LocalStorage of Chrome via a message from the popup page and the options page.

---

## Install

This does not support 'vue-cli'.

Please download this repository and modify it to create your chrome-extension.

```bash
$ git clone https://github.com/taturou/vue3-typescript-chrome-extension.git
$ cd vue3-typescript-chrome-extension
$ npm install
$ npm run build
```

---

## npm scripts

* Build chrome-extension without debug information to './dist'.
  ```
  $ npm run build
  ```

* Build chrome-extension with debug information to './dist'.
  ```
  $ npm run debug
  ```

* Build chrome-extension with debug information and watch mode.
  ```
  $ npm run watch
  ```
  Note: It does not support the hot reload. Reload the extension manually after building it.

* Remove './dist'
  ```
  $ npm run clean
  ```

---

## The structure

```
.
|-- src/
|   |-- @types/           -- Global types for Typescrip.
|   |-- background/       -- background script.
|   |-- icons/            -- Icons for the extension.
|   |-- lib/              -- Library/Utilities
|   |    |-- object/
|   |    |-- repository/  -- Repository
|   |    `-- store/       -- Vuex store.
|   |-- options/          -- Options page.
|   |-- popup/            -- Popup page.
|   `-- manifest.json     -- Manifest file.
|-- .eslintrc.js          -- Lint config for ESLint.
|-- .gitignore            -- Ignore files for git.
|-- LICENSE               -- License file.
|-- package-lock.json     -- npm lockfile.
|-- package.json          -- Build script and packages dependencies.
|-- Readme.md             -- This file.
|-- tsconfig.eslint.json  -- Lint config for Typescript.
|-- tsconfig.json         -- Config for Typescript.
`-- webpack.config.js     -- Config for webpack.
```

### manifest.json

The following properties will be updated.

* version
    * This will be replaced by the "version" of the package.json.

---

## The structure of the extension that will be created

```
.
|-- background/         -- background script.
|   `-- index.js
|-- icons/              -- Icons for the extension.
|   `-- ...
|-- options/            -- Options page.
|   |-- index.css
|   |-- index.html
|   `-- index.js
|-- popup/              -- Popup page.
|   |-- index.css
|   |-- index.html
|   `-- index.js
`-- manifest.json       -- Manifest file.
```

---

## License

MTI
