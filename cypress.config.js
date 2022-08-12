const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    auth_token: '0c5e8798de155e01f6d2dabf8f142542154dae5acce9cdf794f5e740e5e910e8'
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
