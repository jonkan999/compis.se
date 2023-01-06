import io
import requests
import PyPDF2
from PIL import Image
import pdf2image

# Download the PDF
url = "https://hemkop.eo.se/hkp/4629.pdf"
response = requests.get(url)

# Save the PDF to a file
with open("4629.pdf", "wb") as f:
    f.write(response.content)

image = pdf2image.convert_from_path('page.pdf',poppler_path=r'C:\Users\ENGJOE\Downloads\poppler\poppler-0.67.0_x86\poppler-0.67.0\bin')
image[0].save('page.jpg', 'JPEG')
# Open the PDF file
""" with open("4629.pdf", "rb") as f:
    pdf = PyPDF2.PdfReader(f)

    # Get the first page
    page = pdf.pages[0]

        # Extract the page's text as a string
    page_text = page.extract_text()
    print("here is:"+page_text)
    # Create a bytes object from the text
    page_bytes = io.BytesIO(page_text.encode('utf-8'))
    # Create an image from the bytes
    image = Image.open(page_bytes)
    # Save the image as a JPEG file
    image.save('page.jpg', 'JPEG') """

"""     print(page)
    # Convert the page to a PIL image
    image = Image.frombytes("RGB", (int(page.mediabox.width), int(page.mediabox.height)), bytes(page.extract_text().encode(), 'utf-8') )
    # Save the image to a file
    image.save("page.jpg", "JPEG") """

"""     # Create a new PDF file
    new_pdf = PyPDF2.PdfWriter()
    # Add the first page to the new PDF file
    new_pdf.add_page(page)
    # Save the new PDF file
    with open("page.pdf", "wb") as output:
        new_pdf.write(output)
        # Get the raw data of the page """

"""     data = page.extract_text().encode()

    # Convert the page to a JPEG
    image = Image.frombytes("RGB", (int(page.mediabox.upper_right[0]), int(page.mediabox.upper_right[1])), data)
    # Save the image to a file
    image.save("page.jpg") """