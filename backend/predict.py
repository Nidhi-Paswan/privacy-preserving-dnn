import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
from PIL import Image

MODEL_PATH = os.path.join(".", "model", "best_model.keras")
model = tf.keras.models.load_model(MODEL_PATH)

class_names = list(model.layers[-1].weights[0].shape)[0] 
class_labels = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']  

def predict_image(img_path):
    
    img = Image.open(img_path).convert("RGB")
    img = img.resize((224,224))

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0) / 255.0

    preds = model.predict(x)
    class_idx = np.argmax(preds, axis=1)[0]
    confidence = preds[0][class_idx]
    # print("Predictions:", preds)
    # print("Argmax index:", idx)
    # print("Confidence:", confidence)

    return class_labels[class_idx], float(confidence)


# if __name__ == "__main__":
#     test_image = "./trainingModel/HAM10000_images/ISIC_0034311.jpg" 
#     if os.path.exists(test_image):
#         label, conf = predict_image(test_image)
#         print(f"Prediction: {label} ({conf*100:.2f}% confidence)")
#     else:
#         print(" image not found")
