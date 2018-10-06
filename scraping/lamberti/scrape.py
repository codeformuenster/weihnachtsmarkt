import requests
import json
from parsel import Selector

geojsondata = {}
jsondata = {}


def xstr(s):
    return s if s else ''


def post_booth(booth):
    r = requests.post('http://localhost:8888/v1/buckets/weihnachtsmarkt/collections/booths/records',
                      json={'data': booth}, auth=('admin', 'admin'))
    r.raise_for_status()


with open('lamberti.json') as jsonfile:
    jsondata = json.load(jsonfile)

with open('lamberti.geojson') as geojsonfile:
    geojsondata = json.load(geojsonfile)

for booth in jsondata:
    booth_no = int(booth['nr'][-2:])
    text = requests.get(booth['url']).text
    selector = Selector(text=text)

    booth_name = selector.css('.booth-title::text').get()
    booth_descr = selector.css('.booth-body > p::text').getall()

    booth_owner_company = selector.css('.contactParticle--company::text').get()
    booth_owner_name = selector.css(
        '.contactParticle--name\:firstname\,lastname::text').get()
    booth_owner_street = selector.css('.contactParticle--street::text').get()
    booth_owner_city = selector.css(
        '.contactParticle--city\:postal_code\,locality::text').get()
    booth_owner_phone = selector.css('.contactParticle--phone::text').get()
    booth_owner_email = selector.css('.contactParticle--email > a::text').get()
    booth_owner_web_url = selector.css(
        '.contactParticle--website > a::attr(href)').get()

    booth_products = selector.css(".products::text").get()
    if booth_products:
        booth_products = booth_products.split(",")
        booth_products = list(
            map(lambda b: {"name": b.strip()}, booth_products))
    else:
        booth_products = []

    booth_owner = ", ".join([booth_owner_name, booth_owner_company,
                             booth_owner_street, booth_owner_city])

    # Look up geometry
    geometry = None
    for booth_geometry in geojsondata["features"]:
        if booth_geometry["properties"]["nr"] == booth_no:
            geometry = booth_geometry["geometry"]
            break

    if geometry == None:
        print("no geometry for booth %s. Skipping import" % booth_no)
    else:
        post_booth({
            "owner": {
                "name": booth_owner,
                "email": booth_owner_email,
                "web_url": booth_owner_web_url,
                "telephone": booth_owner_phone
            },
            "name": booth_name,
            "tags": [
                "Ohne",
            ],
            "type": "food",
            "market": "Lamberti",
            "goods": booth_products,
            "description": booth_descr,
            "geometry": geometry
        })

    print("done processing %s" % booth_no)

# url = 'http://parsel.readthedocs.org/en/latest/_static/selectors-sample1.html'
# text = requests.get(url).text
# selector = Selector(text=text)
