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

Notes: \
This sample is checked with `node v15.11.0` and `npm v7.6.0`. \
This sample does not use any Vue libraries and any CSS frameworks. \
The chrome-extension manifest version is v2 (MV2).

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
  Note: \
  It does not support the hot reload. Reload the extension manually after building it.

* Zip the './dist' to './dist_zip/(product-name)-(product-version).zip'
  ```
  $ npm run zip
  ```
  Notes: \
  (product-name) is the "name" property of the package.json. \
  (product-version) is the "version" property of the package.json.

* Remove './dist'
  ```
  $ npm run clean
  ```

---

## The structure

```
.
|-- dist_zip/             -- Products compressed are here if you execute 'npm run zip'.
|-- scripts/              -- Script files for the package.json's commands.
|-- src/
|   |-- @types/           -- Global types for Typescrip.
|   |-- background/       -- background script.
|   |-- icons/            -- Icons for the extension.
|   |-- lib/              -- Library
|   |    |-- repository/  -- Repository to save the values of the Vuex store.
|   |    |-- store/       -- Vuex store.
|   |    `-- tabs/        -- Operate the browser tab.
|   |-- options/          -- Options page.
|   |-- popup/            -- Popup page.
|   |-- util/             -- Utilities
|   |    |-- Date/        -- Operate the Data object.
|   |    `-- object/      -- Operate the general object.
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

* name
    * This will be replaced by the "productName" of the package.json.
* version
    * This will be replaced by the "version" of the package.json.
* description
    * This will be replaced by the "description" of the package.json.

### Vuex store (src/lib/store)

This store supports the module.
In other words, you can use the following methods:

e.g.: If a store whose module name is 'moduleA' has 'property1' property.

* `const value = store.getters['moduleA/property1']`
* `store.commit('moduleA/property1', value)`
* `store.dispatch('moduleA/property1', value)`

In addition, the parameter types are defined by Typescript, you can predict the parameters with the benefit of the editor.

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
