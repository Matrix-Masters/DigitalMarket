from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from PIL import Image
from werkzeug.utils import secure_filename
from pytesseract import image_to_string
import py_eureka_client.eureka_client as eureka_client

eureka_client.init(eureka_server="http://localhost:8761/eureka",
                   app_name="Python-Service",
                   instance_port=5000)

app = Flask(__name__)

#CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

if not os.path.exists(r'C:\Users\talel\Desktop\Matrix-Masters\DigitalMarket\PythonIA\uploads'):
    os.makedirs(r'C:\Users\talel\Desktop\Matrix-Masters\DigitalMarket\PythonIA\uploads')

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    if filename == '':
        return jsonify({'error': 'No selected file'}), 400

    temp_image_path = os.path.join(r'C:\Users\talel\Desktop\Matrix-Masters\DigitalMarket\PythonIA\uploads', filename)
    file.save(temp_image_path)
    
    name_pattern = r"الاسم\s*\s*(.*?)\s*[\n<]"
    surname_pattern = r"اللقب\s*\s*(.*?)\s*[\n<]"
    id_number_pattern = r"الرقم\s*\s*(.*?)\s*[\n<]"
    
    img = Image.open(r'C:\Users\talel\Desktop\Matrix-Masters\DigitalMarket\PythonIA\uploads' + '\\' + filename)
    text = image_to_string(img, lang="ara")
    name_match = re.search(name_pattern, text)
    surname_match = re.search(surname_pattern, text)
    id_number_matches = re.search(id_number_pattern, text)
    result = {}
    if name_match and surname_match and id_number_matches:
        surname = surname_match.group(1)
        result['LastName']=surname     
        number = id_number_matches.group(1)
        result['Number']=number   
        name = name_match.group(1)
        result['name']=name
    else:
        return jsonify({"error":"Wrong From Cart"}),400
  
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
