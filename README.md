---
status: semi-finished
uri: http://codeformuenster.org/weihnachtsmarkt/
---

# Weihnachtsmarkt 2014 Münster


## Install

Required software:
* Ruby
* [npm](https://www.npmjs.org/)
* [Middleman](http://middlemanapp.com/basics/getting-started/): ```npm install middleman```
* [Bower](http://bower.io/): ```npm install bower```

Steps to get it running:
* Clone the repository: ```git clone https://github.com/codeformuenster/weihnachtsmarkt.git```
* ```cd weihnachtsmarkt```
* Install Bundle dependencies: ```bundle install```
* Install Bower depedencies: ```bower update```
* Run app locally: ```bundle exec middleman```

## Deployment (on gh-pages)

First make sure you don't have any outstanding commits, then

	$ bundle exec rake build
	$ bundle exec rake publish

## License

Apache Version 2.0
