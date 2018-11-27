/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const got = require('got')

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://kinto.codeformuenster.org'
    : 'http://localhost:8888'

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const client = got.extend({
    baseUrl,
    json: true,
  })

  return client
    .get('/v1/buckets/weihnachtsmarkt/collections/booths/records')
    .then(({ body }) => {
      body.data.forEach((data, index) => {
        let path = createPath(data, index)
        console.log('Create path: ' + path)
        createPage({
          path: path,
          component: process.cwd() + '/src/templates/Details.js',
          context: data,
        })
      })
    })
    .catch(() => {})
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

function createPath(data, index) {
  let path = '/details/' + index
  if ('name' in data) {
    let slugifiedName = slugify(data.name)
    if (slugifiedName === null) {
      if ('id' in data) {
        slugifiedName = data.id
      } else {
        slugifiedName = index
      }
    }
    path = '/details/' + slugifiedName
  }

  return path
}

function slugify(text) {
  if (text === undefined || text === null) {
    return null
  }

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
