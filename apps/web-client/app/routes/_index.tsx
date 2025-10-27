import { Button } from "capybara";
import { greet } from "common";

export default function Home() {
  const welcomeMessage = greet("World");

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        padding: "2rem",
      }}
    >
      <h1>Welcome to Stingy</h1>
      <p>{welcomeMessage}</p>
      <Button variant="primary">Get Started</Button>
      <div style={{ marginTop: "2rem" }}>
        <h3>Built with:</h3>
        <ul>
          <li>⚡ React Router 7</li>
          <li>⚛️ React 18</li>
          <li>🔧 Vite</li>
          <li>📦 Turborepo</li>
          <li>🎨 Capybara UI Components</li>
        </ul>
      </div>
    </div>
  );
}
