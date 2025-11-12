import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Code Blog. All rights reserved.
    </footer>
  );
}
