from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import joblib
import numpy as np
import logging
from logging.handlers import RotatingFileHandler

# Initialize Flask app
app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/api/predict": {"origins": "*"}})

# Set up logging
if not os.path.exists('logs'):
    os.mkdir('logs')

file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
file_handler.setLevel(logging.INFO)

app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
app.logger.info('App startup')

# Load the pre-trained model
model = joblib.load('xgb_model.pkl')

# Define a route for the prediction
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()
        feature_names = data.get('feature_names')
        features = data.get('features')
        
        if len(features) != 38:
            raise ValueError(f"Expected 38 features, got {len(features)}")

        app.logger.info("Received data: %s", data)
        app.logger.info("Feature names: %s", feature_names)
        app.logger.info("Features: %s", features)

        # Convert the list of features into a NumPy array and reshape it for the model
        features_array = np.array(features, dtype=np.float64).reshape(1, -1)
        app.logger.info("Features array shape: %s", features_array.shape)

        # Use the model to predict
        prediction = model.predict(features_array)
        
        # Convert prediction to a standard Python float
        prediction_value = float(prediction[0])
        app.logger.info("Prediction: %f", prediction_value)

        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction_value})

    except Exception as e:
        app.logger.error("Error in prediction: %s", e)  # Log the error
        return jsonify({'error': str(e)}), 400

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your SMTP server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'certifiedadevi@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'demodemo'  # Replace with your email password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_DEFAULT_SENDER'] = 'certifiedadevi@gmail.com'  # Replace with your email

mail = Mail(app)

# Define a route for the contact form submission
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        # Extract data from the request
        full_name = request.form.get('fullName')
        email = request.form.get('email')
        message_body = request.form.get('messageBody')

        app.logger.info("Contact form data - Name: %s, Email: %s, Message: %s", full_name, email, message_body)

        # Validate the input
        if not full_name or not email or not message_body:
            app.logger.warning("Validation error: Missing fields")
            return jsonify({'error': 'All fields are required'}), 400

        # Create the email message
        msg = Message(subject='Contact Us Form Submission',
                      recipients=[app.config['MAIL_DEFAULT_SENDER']],
                      body=f"Name: {full_name}\nEmail: {email}\nMessage: {message_body}")

        # Send the email
        mail.send(msg)
        app.logger.info("Email sent successfully")

        return jsonify({'message': 'Message sent successfully'}), 200

    except Exception as e:
        app.logger.error("Error in contact form submission: %s", e)  # Log the error
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
