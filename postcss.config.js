/* eslint-disable import/no-extraneous-dependencies */
// https://postcss.org/
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const atImport = require("postcss-import");
const reporter = require("postcss-reporter");
const cssstats = require("cssstats");

const plugins = [
  autoprefixer
];

if (process.env.NODE_ENV === "production") {
  // use purgeCSS and cssnano in production
  // https://github.com/postcss/postcss-import
  plugins.push(atImport());
  // https://www.purgecss.com/with-postcss
  plugins.push(purgecss({
    content: [
      "./src/*.vue",
      "./src/components/*.vue",
      "./src/views/*.vue",
      "./public/*.html"
    ],
    css: [],
    whitelist: [
      "html",
      "body"
      // "splitpanes__pane",
      // "splitpanes--horizontal",
      // "splitpanes__splitter",
      // "splitpanes--vertical",
      // "button-info",
    ]
    // whitelistPatterns: [/splitpanes[-_]{2}[\w]*/]
  })
  );
  // https://cssnano.co/guides/getting-started
  plugins.push(cssnano({
    preset: ["default", {
      discardComments: {
        removeAll: true
      }
    }]
  }));
}

// https://cssstats.com/docs/pkg/core
plugins.push(cssstats());
// https://github.com/postcss/postcss-reporter
plugins.push(reporter({ filter: (message) => { return true; }, clearAllMessages: true }));

module.exports = {
  plugins
};
