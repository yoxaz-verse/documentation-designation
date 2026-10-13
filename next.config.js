const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  async redirects() {
    return [
      { source: '/architecture', destination: '/', permanent: true },
      { source: '/departments', destination: '/', permanent: true },
    ]
  },
})
