import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded-xl flex flex-col items-center w-full max-w-md"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded-md w-full mb-4"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
      >
        {loading ? "Processing..." : "Upload & Predict"}
      </button>
      {prediction && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-700 w-full text-center">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </form>
  );
}
