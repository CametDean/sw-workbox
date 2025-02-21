const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  includeShadowDom: true,
  component: {
    devServer: {
      framework: 'cypress-ct-lit',
      bundler: 'vite',
    }
  }
})
