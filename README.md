---
status: work-in-progress
uri: http://codeformuenster.org/weihnachtsmarkt/
forum: http://forum.codeformuenster.org/t/weihnachtsmarkt-hilfe/28
---

# Weihnachtsmarkt

Webseite zum Durchsuchen und Auffinden von Ständen auf den fünf Adventsmärkten in Münster.

![weihnachtsmarkt-1](https://cloud.githubusercontent.com/assets/225698/6495200/1ead83f8-c2c8-11e4-80ee-3bf9a1fc4e4e.png)

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
