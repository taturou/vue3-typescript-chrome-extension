module.exports = {
  prompts: {
    name: {
      type: 'string',
      message: 'Product Name (not include space characters):'
    },
    productName: {
      type: 'string',
      message: 'Chrome extension Name:',
      default: "Vue3 + Typescript",
    },
    description: {
      type: 'string',
      message: 'Description:',
      default: "Chrome extension template with Vue 3 + Vuex 4 + Vue Router 4 + Typescript 4.2 + SCSS + Webpack 5.",
    },
    author: {
      type: 'string',
      message: 'Author:'
    },
    useLicense: {
      type: "confirm",
      message: "Use an OSS License?:"
    },
    license: {
      when: "useLicense",
      type: 'list',
      message: 'Pick a license:',
      choices: [
        "Apache License 2.0",
        "BSD 2-Clause Simplified License",
        "BSD 3-Clause New or Revised License",
        "Eclipse Public License 2.0",
        "GNU General Public License v3.0",
        "GNU Lesser General Public License v2.1",
        "MIT License",
        "Mozilla Public License 2.0"
      ]
    },
    year: {
      when: "useLicense",
      type: 'string',
      message: 'Copyright year:',
      default: "2021",
    },
    manifestVer: {
      type: 'list',
      message: 'Chrome extension\'s manifest version:',
      choices: [
        "v2",
        "v3"
      ]
    }
  },
  filters: {
    "LICENSE":  "useLicense"
  },
  skipInterpolation: [
    'node_modules/**',
    'scripts/**',
    'src/**/*.vue'
  ],
  complete: (data) => {
    console.log('\nTo get started:');
    if (!data.inPlace) {
      console.log(`  cd ${data.destDirName}`);
    }
    console.log('  npm install');
    console.log('  npm run build');
  }
};
