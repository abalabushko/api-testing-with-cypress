const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    auth_token: 'auth_token',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://gorest.co.in/public/v2',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false
  },
});
