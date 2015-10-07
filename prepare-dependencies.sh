#!/bin/bash

npm install -g bower jake

bower --allow-root install

# compile leaflet
cd bower_components/leaflet
npm install
jake
cd ../..

# clean
rm -rf _includes/vendor
rm -rf _sass/vendor

mkdir -p _includes/vendor
mkdir -p _sass/vendor

# leafletjs, minified version
cp bower_components/leaflet/dist/leaflet.js _includes/vendor/
cp bower_components/leaflet/dist/leaflet.css _sass/vendor/_leaflet.scss
cp bower_components/leaflet/dist/images/* images/

cp bower_components/normalize-scss/_normalize.scss _sass/vendor

cp bower_components/pepjs/dist/pep.min.js _includes/vendor/pep.min.js

cp bower_components/pegasus/dist/pegasus.min.js js/pegasus.min.js
