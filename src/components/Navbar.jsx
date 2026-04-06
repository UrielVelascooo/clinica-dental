import { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ajuste para que el scroll no quede tapado por el menú fijo
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  return (
    <nav style={{
      ...styles.nav,
      ...(scrolled ? styles.navScrolled : styles.navDefault)
    }}>
      <div style={styles.container}>
        <NavHashLink smooth to="/#inicio" scroll={scrollWithOffset} style={styles.logoLink}>
          <h2 style={styles.logo}>Dental<span style={styles.logoAccent}>Velasco</span></h2>
        </NavHashLink>

        <div style={styles.hamburger} onClick={() => setOpen(!open)}>
          <div style={{...styles.line, ...(open ? styles.lineTop : {})}}></div>
          <div style={{...styles.line, ...(open ? styles.lineHide : {})}}></div>
          <div style={{...styles.line, ...(open ? styles.lineBottom : {})}}></div>
        </div>

        <ul style={{
          ...styles.menu,
          ...(open ? styles.menuOpen : styles.menuClosed)
        }}>
          <li><NavHashLink smooth to="/#inicio" scroll={scrollWithOffset} style={styles.link} onClick={() => setOpen(false)}>Inicio</NavHashLink></li>
          <li><NavHashLink smooth to="/#servicios" scroll={scrollWithOffset} style={styles.link} onClick={() => setOpen(false)}>Servicios</NavHashLink></li>
          
          {/* ENLACE DENTISTAS: Vinculado al id="dentistas" de App.jsx */}
          <li><NavHashLink smooth to="/#dentistas" scroll={scrollWithOffset} style={styles.link} onClick={() => setOpen(false)}>Dentistas</NavHashLink></li>
          
          <li><NavHashLink smooth to="/#galeria" scroll={scrollWithOffset} style={styles.link} onClick={() => setOpen(false)}>Galería</NavHashLink></li>
          <li>
            <NavHashLink smooth to="/#contacto" scroll={scrollWithOffset} style={styles.cta} onClick={() => setOpen(false)}>
              Contacto
            </NavHashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000, transition: "all 0.4s ease", display: "flex", justifyContent: "center", padding: "20px 5%" },
  navDefault: { backgroundColor: "transparent", padding: "30px 5%" },
  navScrolled: { backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: "15px 5%", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  container: { width: "100%", maxWidth: "1400px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logoLink: { textDecoration: "none" },
  logo: { margin: 0, fontSize: "1.6rem", fontWeight: "900", color: "#0a2540" },
  logoAccent: { color: "#00b4d8" },
  hamburger: { display: "none", flexDirection: "column", gap: "6px", cursor: "pointer", zIndex: 2001, "@media (max-width: 768px)": { display: "flex" } },
  line: { width: "28px", height: "3px", backgroundColor: "#0a2540", borderRadius: "10px", transition: "all 0.3s ease" },
  lineTop: { transform: "rotate(45deg) translate(7px, 6px)" },
  lineHide: { opacity: 0 },
  lineBottom: { transform: "rotate(-45deg) translate(7px, -6px)" },
  menu: { listStyle: "none", display: "flex", gap: "35px", alignItems: "center", margin: 0, padding: 0 },
  link: { color: "#0a2540", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600", transition: "color 0.3s ease" },
  cta: { backgroundColor: "#0a2540", color: "white", padding: "12px 25px", borderRadius: "12px", textDecoration: "none", fontWeight: "700", fontSize: "0.9rem" },
  menuOpen: { "@media (max-width: 768px)": { position: "fixed", top: 0, right: 0, height: "100vh", width: "280px", backgroundColor: "white", flexDirection: "column", padding: "100px 40px", display: "flex" } },
  menuClosed: { "@media (max-width: 768px)": { display: "none" } }
};

export default Navbar;