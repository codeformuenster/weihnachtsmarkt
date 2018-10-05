module.exports = {
  siteMetadata: {
    title: 'Weihnachtsmarkt.ms',
    longTitle: 'Weihnachtsmarkt.ms Münster - Mobile App',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'weihnachtsmarkt.ms',
        short_name: 'Weihnachtsmarkt',
        start_url: '/',
        background_color: '#0C192E',
        theme_color: '#0C192E',
        display: 'standalone',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-eslint',
  ],
}
