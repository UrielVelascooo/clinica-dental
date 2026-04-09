import { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";

const DentalLogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 64 64" fill="none" style={{ transition: 'transform 0.3s ease' }}>
    <circle cx="32" cy="32" r="30" fill="url(#grad)" />
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#00b4d8", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#0a2540", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M32 14C26 14 20 18 20 28c0 6 2 10 5 14-2 3-4 6-4 10 0 2 1.5 3 3 3 2.5 0 4-2 5-5 .5-.5 1-.5 1.5 0 1 3 2.5 5 5 5 1.5 0 3-1 3-3 0-4-2-7-4-10 3-4 5-8 5-14 0-10-6-14-12-14z"
      fill="white"
      fillOpacity="0.9"
    />
    <rect x="29" y="26" width="6" height="12" fill="#00b4d8" rx="1"/>
    <rect x="26" y="29" width="12" height="6" fill="#00b4d8" rx="1"/>
  </svg>
);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate - 90, behavior: "smooth" });
  };

  return (
    <nav style={styles.navWrapper}>
      <div
        style={{
          ...styles.navContainer,
          ...(scrolled ? styles.navScrolled : styles.navDefault),
        }}
      >
        
        <NavHashLink smooth to="/#inicio" style={styles.logoContainer} className="logo-hover">
          <DentalLogoIcon />
          <div style={styles.textStack}>
            <span style={styles.logoMain}>DENTAL</span>
            <span style={styles.logoSub}>VELASCO</span>
          </div>
        </NavHashLink>

        
        <ul style={styles.menuList}>
          {["Inicio", "Dentistas", "Servicios", "Galería"].map((item) => (
            <li key={item} style={styles.navItem}>
              <NavHashLink
                smooth
                to={`/#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                scroll={scrollWithOffset}
                style={styles.link}
                className="nav-link-hover"
              >
                {item}
              </NavHashLink>
            </li>
          ))}
          
          <li>
            <NavHashLink
              smooth
              to="/#contacto"
              style={styles.contactBtn}
            >
              Contacto
            </NavHashLink>
          </li>
        </ul>
      </div>

      
      <style>{`
        .nav-link-hover { position: relative; }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #00b4d8;
          transition: width 0.3s ease;
        }
        .nav-link-hover:hover::after { width: 100%; }
        .logo-hover:hover svg { transform: rotate(-10deg) scale(1.1); }
      `}</style>
    </nav>
  );
}

const styles = {
  navWrapper: {
    position: "fixed",
    top: "20px",
    left: 0,
    right: 0,
    zIndex: 3000,
    display: "flex",
    justifyContent: "center",
    padding: "0 20px",
  },
  navContainer: {
    width: "100%",
    maxWidth: "1100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "50px",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  navDefault: {
    padding: "15px 30px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
  },
  navScrolled: {
    padding: "10px 25px",
    backgroundColor: "rgba(10, 37, 64, 0.92)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    transform: "scale(0.98)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  },
  textStack: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1",
  },
  logoMain: {
    fontSize: "1.1rem",
    fontWeight: "900",
    color: "#0a2540",
    letterSpacing: "2px",
    transition: "color 0.3s",
  },
  logoSub: {
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#00b4d8",
    marginTop: "2px",
  },
  menuList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  link: {
    textDecoration: "none",
    color: "#0a2540",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "0.3s",
  },
  contactBtn: {
    textDecoration: "none",
    backgroundColor: "#00b4d8",
    color: "white",
    padding: "10px 22px",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(0, 180, 216, 0.3)",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
};

export default Navbar;