export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step-card">
            <span>🔒</span>
            <h3>Encrypt</h3>
            <p>Your file is secured with advanced encryption.</p>
          </div>
          <div className="step-card">
            <span>☁️</span>
            <h3>Upload</h3>
            <p>Data is sent safely to our cloud servers.</p>
          </div>
          <div className="step-card">
            <span>🤖</span>
            <h3>Analyze</h3>
            <p>AI processes the file and generates results.</p>
          </div>
          <div className="step-card">
            <span>📊</span>
            <h3>Results</h3>
            <p>Get fast and accurate predictions instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
