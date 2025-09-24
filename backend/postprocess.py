class_treatments = {
    'akiec': "Consult dermatologist; may require cryotherapy or excision.",
    'bcc': "Topical treatment or surgery; consult dermatologist.",
    'bkl': "Monitor for changes; usually benign, consult dermatologist if needed.",
    'df': "Usually benign; surgical removal if symptomatic.",
    'mel': "Urgent consultation with oncologist/dermatologist; may require biopsy.",
    'nv': "Normal mole; monitor for changes, yearly skin check recommended.",
    'vasc': "Consult doctor for vascular lesion treatment options."
}

CONFIDENCE_THRESHOLD = 0.1

def process_prediction(predicted_class, confidence):
    """Return final JSON response with messages and notes."""
    if confidence < CONFIDENCE_THRESHOLD:
        return {
            "disease": "Unknown / Not a skin disease",
            "confidence": round(confidence, 2),
            "message": "Image does not resemble any known skin disease. Please try a clearer or relevant image."
        }

    return {
        "disease": predicted_class,
        "confidence": round(confidence, 2),
        "basic_treatment": class_treatments.get(predicted_class, "Consult doctor."),
        "note": "Always consult a dermatologist for accurate diagnosis."
    }
