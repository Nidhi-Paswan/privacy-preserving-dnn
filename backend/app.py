from flask import Flask, request, jsonify
from crypto_utils import decrypt_image
from postprocess import process_prediction
from predict import predict_image 
from flask_cors import CORS 
import io

app = Flask(__name__)
CORS(app, origins="http://localhost:5173") 

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    enc_file = request.files["file"].read()
    try:
        # print("Encrypted file bytes:", enc_file[:50])  
        
        enc_str = enc_file.decode('utf-8')  
        # print("Encrypted string sample:", enc_str[:50])

        img_bytes = decrypt_image(enc_str)
        # print("Decrypted bytes length:", len(img_bytes))

        img_stream = io.BytesIO(img_bytes)
        disease, confidence = predict_image(img_stream)
        result = process_prediction(disease, confidence)
        return jsonify(result)

    except Exception as e:
        print("Error in predict:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
