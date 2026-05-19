import { useState } from "react";
import BrandMark from "./ui/BrandMark";
import Button from "./ui/Button";

const links = [
  { href: "#features", label: "Product" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#how", label: "How It Works" },
  { href: "#integration", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="nav" id="nav">
      <div className="nav__inner">
        <a href="#" className="brand" aria-label="FlowCart home">
          <span className="brand__mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="brand__name">
            FlowCart<span className="brand__dot">.</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href="#" className="nav__login">
            Login
          </a>
          <Button href="#cta" size="sm">
            Start Free Trial
          </Button>
        </div>

        <button
          type="button"
          className="nav__toggle"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          id="navToggle"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile${mobileOpen ? " open" : ""}`} id="navMobile">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#" className="nav__mobile-login" onClick={() => setMobileOpen(false)}>
          Login
        </a>
        <Button href="#cta" onClick={() => setMobileOpen(false)}>
          Start Free Trial
        </Button>
      </div>
    </header>
  );
}
