/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const got = require('got')

  const client = got.extend({
    baseUrl:
      'https://kinto-weihnachtsmarkt.codeformuenster.org/v1/buckets/weihnachtsmarkt/collections/booths/records',
    json: true,
  })

  return new Promise((resolve, reject) => {
    client
      .get('')
      .then(data => {
        for (let i in data.body.data) {
          try {
            let path = '/details/' + slugify(data.body.data[i].name)
            console.log('Create path: ' + path)
            createPage({
              path: path,
              component:
                '/home/chris/workspace/weihnachtsmarkt/src/components/Details/Details.js',
              context: data.body.data[i],
            })
          } catch (e) {
            console.error(e)
          }
        }
      })
      .catch(err => {
        console.error(err)
        reject()
      })
    resolve()
  })
}

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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
