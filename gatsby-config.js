module.exports = {
  siteMetadata: {
    title: 'Weihnachtsmarkt.ms',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'weihnachtsmarkt.ms',
        short_name: 'weihnachtsmarkt',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-eslint',
  ],
}
