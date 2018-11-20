const fs = require('fs')

fs.readFile('./gatsby-config.js', 'utf8', function(err, data) {
  if (err) throw err

  const new_data = data.replace(
    "cacheId: 'weihnachtsmarkt-ms'",
    `cacheId: 'weihnachtsmarkt-ms-${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 8)}'`
  )
  //Do your processing, MD5, send a satellite to the moon, etc.
  fs.writeFile('./gatsby-config.js', new_data, function(err) {
    if (err) throw err
    console.log('complete')
  })
})
