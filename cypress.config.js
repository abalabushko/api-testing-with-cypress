const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    auth_token: 'AUTH0_SECRET'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://pokeapi.co/api/v2',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false
  },
});
