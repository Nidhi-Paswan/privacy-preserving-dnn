import { useState } from "react";
import CryptoJS from "crypto-js";

const KEY = "this_is_16bytek1";
const IV = "this_is_16byteiv";



const ImageInput = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
};

const handleUpload = async () => {
    if (!image) return alert("Select an image first!");

        setLoading(true);
        setResult(null);

        const reader = new FileReader();
        reader.onload = async () => {
            const wordArray = CryptoJS.lib.WordArray.create(reader.result);
            const encrypted = CryptoJS.AES.encrypt(wordArray, CryptoJS.enc.Utf8.parse(KEY), {
                iv: CryptoJS.enc.Utf8.parse(IV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();

            const formData = new FormData();
            const blob = new Blob([encrypted], { type: "text/plain" });
            formData.append("file", blob, "enc.txt");

            try {
                const res = await fetch("http://127.0.0.1:5000/predict", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                setResult(data);
            } catch (err) {
                console.error(err);
                alert("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        reader.readAsArrayBuffer(image);
};

return (
        <div className="container">
            <h1 className="title">Skin Disease Prediction</h1>

            <div className="card">
                <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                {preview && <img src={preview} alt="preview" className="preview-img" />}
                <button
                    onClick={handleUpload}
                    className="btn"
                    disabled={loading}
                >
                    {loading ? "Predicting..." : "Upload & Predict"}
                </button>
            </div>

            {result && (
                <div className="result">
                    <p className="result-text">
                        Predicted Disease: <span className="highlight">{result.disease}</span>
                    </p>
                    <p className="result-text">
                        Confidence: <span className="highlight">{(result.confidence * 100).toFixed(2)}%</span>
                    </p>
                    {result.basic_treatment && <p className="result-text">Basic Treatment: {result.basic_treatment}</p>}
                    {result.note && <p className="result-text">Note: {result.note}</p>}
                </div>
            )}
        </div>
    );
};

export default ImageInput;
