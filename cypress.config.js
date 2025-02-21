const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
  },
  includeShadowDom: true,
  component: {
    devServer: {
      framework: 'cypress-ct-lit',
      bundler: 'vite',
    }
  }
})
