export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src="/logo192.png" alt="Logo" />
        <span>MyApp</span>
      </div>
      <div className="links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
      <button>Get Started</button>
    </nav>
  );
}
