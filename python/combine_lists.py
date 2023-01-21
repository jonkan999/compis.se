import json

# Load the data from the two JSON files
with open("python/png_URL_list.json", 'r', encoding='utf-8') as png_file:
    png_data = json.load(png_file)

with open("python/hk_pdf_URL_list.json", 'r', encoding='utf-8') as hk_pdf_file:
    hk_pdf_data = json.load(hk_pdf_file)

# Combine the data from the two files
combined_data = hk_pdf_data + png_data

# Save the combined data to a new JSON file
with open("python/combined_URL_list.json", 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, ensure_ascii=False)