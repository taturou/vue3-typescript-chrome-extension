# {{ productName }}

{{ description }}

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

{{#useLicense}}---

## License

{{ license }}
{{/useLicense}}