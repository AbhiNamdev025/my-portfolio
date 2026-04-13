import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { BriefcaseBusiness, Menu, X } from "lucide-react";
import Button from "../common/Button";
import ThemeToggle from "../common/ThemeToggle";
import { PERSONAL_INFO } from "../../data/content";
import styles from "./Navbar.module.css";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Skills", to: "/skills" },
  { name: "Projects", to: "/projects" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  const brandName = useMemo(() => {
    const firstName = PERSONAL_INFO.name?.split(" ")[0] || "Abhishek";
    return `${firstName} Namdev`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsidePress = (event) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} ref={navRef}>
        <NavLink to="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoIcon}>
            <BriefcaseBusiness size={16} />
          </span>
          <span className={styles.logoText}>{brandName}</span>
        </NavLink>

        <div className={`${styles.links} ${open ? styles.show : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
          <Button as={NavLink} to="/contact" className={styles.hireBtn}>
            Hire Me
          </Button>
          <button
            className={styles.mobileBtn}
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <button
          className={styles.mobileOverlay}
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
