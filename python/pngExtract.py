import datetime
import requests
import urllib.request
import json

# Get the current date and time
now = datetime.datetime.now()

# Get the current year, month, and week
year = now.year
month = now.month
week = now.isocalendar()[1]

# Convert month to 2 digits
if month < 10:
    month = "0" + str(month)
else:
    month = str(month)

# Convert week to 1 digit
week = str(week)[-1]

# Print the result
"https://www.kistagrossen.com/wp-content/uploads/"+str(year)+"/"+month+"/v"+week+".png"

png_list = [
    {'url': "https://www.kistagrossen.com/wp-content/uploads/"+str(year)+"/"+month+"/v"+week+".png", 'description': 'kista grossen'},
]

access_token = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg'

# Iterate through the descriptions in the pdf_list
for png in png_list:
    description = png['description']

    # Use the description as a search string
    search_string = description

    # Perform the geocoding request
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search_string + '.json?access_token=' + access_token
    response = requests.get(url)
    data = json.loads(response.text)

    print(data)

    # Get the geocoordinates from the results
    latitude = data['features'][0]['center'][1]
    longitude = data['features'][0]['center'][0]

    png["lnglat_cord"] = (longitude,latitude)

    # Get get png from url location and save the results
    urllib.request.urlretrieve(png['url'], "python/"+description+".png")


print("File saved successfully!")

# Save the pdf_list with geo_cord to a json file
json_data = json.dumps(png_list)
print(json_data)
with open("python/png_URL_list.json", 'w', encoding='utf-8') as f:
    json.dump(png_list, f, ensure_ascii=False)