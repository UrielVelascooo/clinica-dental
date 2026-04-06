import { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yCoordinate - 80, behavior: 'smooth' }); 
  };

  return (
    <nav style={{
      ...styles.nav,
      ...(scrolled ? styles.navScrolled : styles.navDefault)
    }}>
      <div style={styles.container}>
        <NavHashLink smooth to="/#inicio" style={styles.logo}>
          Dental<span style={{color: "#00b4d8"}}>Velasco</span>
        </NavHashLink>

        {/* BOTÓN DE 3 PUNTOS / HAMBURGUESA */}
        <div style={styles.menuIcon} onClick={() => setOpen(!open)}>
          <div style={{...styles.dot, ...(open ? styles.dotActive : {})}}></div>
          <div style={{...styles.dot, ...(open ? styles.dotActive : {})}}></div>
          <div style={{...styles.dot, ...(open ? styles.dotActive : {})}}></div>
        </div>

        {/* MENÚ OVERLAY PARA CELULAR Y DESKTOP */}
        <ul style={{
          ...styles.menuList,
          ...(open ? styles.menuVisible : styles.menuHidden)
        }}>
          {["Inicio", "Servicios", "Dentistas", "Galería", "Contacto"].map((item) => (
            <li key={item} style={styles.navItem}>
              <NavHashLink 
                smooth 
                to={`/#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                scroll={scrollWithOffset}
                style={styles.link}
                onClick={() => setOpen(false)}
              >
                {item}
              </NavHashLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Fondo oscuro cuando el menú está abierto en el cel */}
      {open && <div style={styles.overlay} onClick={() => setOpen(false)}></div>}
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 3000,
    transition: "all 0.3s ease", display: "flex", justifyContent: "center"
  },
  navDefault: { padding: "25px 20px", backgroundColor: "transparent" },
  navScrolled: { 
    padding: "15px 20px", 
    backgroundColor: "rgba(255, 255, 255, 0.95)", 
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)" 
  },
  container: {
    width: "100%", maxWidth: "1200px", display: "flex", 
    justifyContent: "space-between", alignItems: "center"
  },
  logo: {
    fontSize: "1.5rem", fontWeight: "900", color: "#0a2540", textDecoration: "none"
  },
  menuIcon: {
    display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer", padding: "10px"
  },
  dot: {
    width: "6px", height: "6px", backgroundColor: "#0a2540", borderRadius: "50%", transition: "0.3s"
  },
  dotActive: { backgroundColor: "#00b4d8", transform: "scale(1.2)" },
  
  // Lógica de lista adaptable
  menuList: {
    listStyle: "none", margin: 0, padding: 0, display: "flex", gap: "30px",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  },
  // ESTOS ESTILOS SE ACTIVAN EN CELULAR (Simulado vía JS para Vercel)
  menuHidden: window.innerWidth < 768 ? {
    position: "fixed", top: "-100vh", right: "20px", left: "20px",
    flexDirection: "column", backgroundColor: "white", padding: "40px",
    borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", opacity: 0
  } : {},
  
  menuVisible: window.innerWidth < 768 ? {
    top: "80px", opacity: 1
  } : {},

  link: {
    textDecoration: "none", color: "#0a2540", fontWeight: "700", fontSize: "1rem"
  },
  overlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.2)", zIndex: -1, backdropFilter: "blur(4px)"
  }
};

export default Navbar;