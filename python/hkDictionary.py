import pickle
import requests
import json

pdf_list = [
    {'url': 'https://hemkop.eo.se/hkp/4629.pdf', 'description': 'Hemköp Skärholmen Bredäng'},
    {'url': 'https://hemkop.eo.se/hkp/4633.pdf', 'description': 'Hemköp Fruängen'},
    {'url': 'https://hemkop.eo.se/hkp/4613.pdf', 'description': 'Hemköp Sjövikshallen'},
    {'url': 'https://hemkop.eo.se/hkp/4190.pdf', 'description': 'Hemköp Torsplan'},
    {'url': 'https://hemkop.eo.se/hkp/4753.pdf', 'description': 'Hemköp Sickla Köpkvarter'}

]

access_token = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg'

# Iterate through the descriptions in the pdf_list
for pdf in pdf_list:
    description = pdf['description']

    # Use the description as a search string
    search_string = description

    # Perform the geocoding request
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search_string + '.json?access_token=' + access_token
    response = requests.get(url)
    data = json.loads(response.text)

    # Get the geocoordinates from the results
    latitude = data['features'][0]['center'][1]
    longitude = data['features'][0]['center'][0]

    pdf["lnglat_cord"] = (longitude,latitude)

    # Get and store pdf files
    response = requests.get(pdf['url'])
    open('python/' + pdf['description'] + '.pdf', 'wb').write(response.content)

# Save the pdf_list with geo_cord to a json file
json_data = json.dumps(pdf_list)
print(json_data)
with open("python/hk_pdf_URL_list.json", 'w', encoding='utf-8') as f:
    json.dump(pdf_list, f, ensure_ascii=False)