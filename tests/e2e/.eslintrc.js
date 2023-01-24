const path = require("path");
const synpressPath = path.join(
  process.cwd(),
  "/node_modules/@synthetixio/synpress",
);

module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "cypress/no-unnecessary-waiting": "off",
    "ui-testing/no-hard-wait": "off",
    "testing-library/await-async-utils": "off",
    "ui-testing/missing-assertion-in-test": "off",
    "ui-testing/no-css-page-layout-selector": "off",
  },
};
