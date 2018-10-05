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
        background_color: '#663399',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
}
