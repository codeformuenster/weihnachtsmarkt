/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()

  let newConfig = {
    ...config,
    module: {
      ...config.module,
      noParse: /(mapbox-gl)\.js$/,
    },
  }

  if (stage === 'build-html') {
    newConfig = {
      ...newConfig,
      module: {
        ...newConfig.module,
        rules: [
          ...newConfig.module.rules,
          {
            test: /(mapbox-gl)\.js$/,
            loader: 'null-loader',
          },
        ],
      },
    }
  }

  actions.replaceWebpackConfig(newConfig)
}
