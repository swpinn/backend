import os
import cv2
import numpy as np
from flask import Flask, jsonify, request
from tensorflow.keras.models import load_model
import tensorflow as tf
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration
app.config['ALLOWED_EXTENSIONS'] = set(['png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = 'static/uploads/'
app.config['MODEL_FILE'] = 'face_types_model.h5'

# Load the trained model
model = load_model(app.config['MODEL_FILE'])

# Get class names from folder names
class_names = ['Heart', 'Oval', 'Round', 'Square']

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get the image file from the request
        image_file = request.files["image"]

        # Check if the file is allowed
        if image_file and allowed_file(image_file.filename):
            # Save the file with a secure filename
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(filepath)

            # Read the image file
            image = cv2.imread(filepath)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Resize the image to the model's input size
            resized_image = tf.image.resize(image, (250, 190))

            # Normalize the image
            normalized_image = resized_image / 255.0

            # Expand the dimensions to match the model input shape
            input_data = np.expand_dims(normalized_image, axis=0)

            # Make predictions
            predictions = model.predict(input_data)
            predicted_class_index = np.argmax(predictions, axis=1)[0]
            predicted_class = class_names[predicted_class_index]

            return jsonify({"prediction": predicted_class}), 200
        else:
            return jsonify({"error": "Invalid file format. Please upload a PNG, JPG, or JPEG image."}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
