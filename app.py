from flask import Flask, request, render_template, jsonify
import pytesseract
from PIL import Image
import cv2
import numpy as np
import openai
from io import BytesIO

app = Flask(__name__)

# Configure the LLaMA API key
LLAMA_API_KEY = "2db70e18-55fe-4828-bb55-aafe24a131e5"
client = openai.OpenAI(
    api_key=LLAMA_API_KEY,
    base_url="https://api.sambanova.ai/v1",
)

def extract_medicine_name(image):
    text = pytesseract.image_to_string(image)
    return text.strip()

def preprocess_image(image):
    gray_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    _, thresh_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return Image.fromarray(thresh_image)

def clean_response(text):
    """Remove asterisks from the response text."""
    return text.replace('**', '')

def get_medicine_info_from_llama(medicine_name):
    response = client.chat.completions.create(
        model="Llama-3.1-Swallow-8B-Instruct-v0.3",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"What can you tell me about {medicine_name} medicine?"}
        ],
        temperature=0.1,
        top_p=0.1
    )
    # Clean the response to remove asterisks
    return clean_response(response.choices[0].message.content)

def fetch_nearby_hospitals(location):
    response = client.chat.completions.create(
        model="Llama-3.1-Swallow-8B-Instruct-v0.3",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides the names of nearby hospitals based on the user's location. Categorize the hospitals into public and private sectors and give their locations also"},
            {"role": "user", "content": f"Can you list the names of hospitals near {location}? Categorize them into public and private sectors and include the hospitals locations"}
        ],
        temperature=0.1,
        top_p=0.1
    )
    # Clean the response to remove asterisks
    return clean_response(response.choices[0].message.content)

# Landing page route
@app.route('/')
def landing():
    return render_template('landing.html')

# Module selection page
@app.route('/modules')
def modules():
    return render_template('modules.html')

# Text query page
@app.route('/text_query')
def text_query():
    return render_template('text_query.html')

# Image query page
@app.route('/image_query')
def image_query():
    return render_template('image_query.html')

# Hospital locator page
@app.route('/hospital_locator')
def hospital_locator():
    return render_template('hospital_locator.html')

# Endpoint to get medicine info
@app.route('/get_medicine_info', methods=['POST'])
def get_medicine_info():
    medicine_name = request.form.get('medicine_name')
    if not medicine_name:
        return jsonify({'error': 'Please enter a medicine name!'}), 400
    try:
        response = get_medicine_info_from_llama(medicine_name)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to process uploaded image
@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded!'}), 400
    file = request.files['image']
    image = Image.open(file)
    preprocessed_image = preprocess_image(image)
    extracted_name = extract_medicine_name(preprocessed_image)
    if not extracted_name:
        return jsonify({'error': 'Could not extract a valid medicine name from the image.'}), 400
    try:
        response = get_medicine_info_from_llama(extracted_name)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to fetch nearby hospitals
@app.route('/get_hospitals', methods=['POST'])
def get_hospitals():
    location = request.form.get('location')
    if not location:
        return jsonify({'error': 'Please enter a location!'}), 400
    try:
        hospital_info = fetch_nearby_hospitals(location)
        return jsonify({'response': hospital_info})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
