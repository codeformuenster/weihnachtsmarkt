# Weihnachtsmarkt 2014 Münster


## Install

Required software:
* Ruby
* [npm](https://www.npmjs.org/)
* [Middleman](http://middlemanapp.com/basics/getting-started/): ```npm install middleman```
* [Bower](http://bower.io/): ```npm install bower```

Steps to get it running:
* Clone the repository:
	git clone -b wm-map https://github.com/codeformuenster/weihnachtsmarkt.git
	git branch gh-pages origin/gh-pages
* ```cd weihnachtsmarkt```
* Install Bundle dependencies: ```bundle install```
* Install Bower depedencies: ```bower update```
* Run app local: ```bundle exec middleman```

## Deployment (on gh-pages)

First make sure you don't have any outstanding commits, then

	$ bundle exec rake build
	$ bundle exec rake publish

## License

Apache Version 2.0