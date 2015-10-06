---
---
window.WeihnachtsmarktData={"type":"FeatureCollection","features":[{% for stand_hash in site.data.staende %}{% assign stand = stand_hash[1] %}{"type":"Feature","properties":{{ stand.properties | jsonify }},"geometry":{{ stand.geometry }}}{% unless forloop.last %},{% endunless %}{% endfor %}]};
Object.freeze(window.WeihnachtsmarktData);
