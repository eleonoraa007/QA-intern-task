const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automaticityacademy.ngrok.app/",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    env: {
      email: "testUser1@example.com",
      password: "passwordUser1",
    },
  },
});
