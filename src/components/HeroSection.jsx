export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>Secure & Smart AI Solutions</h1>
        <p>
          Upload your data securely and let our AI handle the rest with
          encryption-powered processing.
        </p>
        <div className="upload-box">
          <input type="file" />
          <button>Upload & Analyze</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="Ai.jpg" alt="AI Illustration" />
      </div>
    </section>
  );
}
