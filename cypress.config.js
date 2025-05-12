const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // NÃO defina baseUrl aqui se usa múltiplas APIs
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
