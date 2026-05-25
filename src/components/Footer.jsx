// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
// Importamos Link de react-router-dom para la navegación fluida a la tienda independiente
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  // Detector de pantalla móvil en tiempo real
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer style={{
      ...styles.footer,
      padding: isMobile ? "50px 16px 30px" : "80px 5% 40px"
    }}>
     
      <div style={styles.glowBlue}></div>
      
      <div style={styles.container}>
        <div style={{
          ...styles.mainGrid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
          gap: isMobile ? "35px" : "50px",
          marginBottom: isMobile ? "40px" : "60px"
        }}>
          
          {/* COLUMNA: MARCA */}
          <div style={{
            ...styles.brandColumn,
            textAlign: isMobile ? "center" : "left"
          }}>
            <h3 style={styles.logo}>
              Dental<span style={styles.highlight}> ITIZ </span>
            </h3>
            <p style={{
              ...styles.brandDesc,
              margin: isMobile ? "0 auto" : "0",
              maxWidth: "320px"
            }}>
              Elevando los estándares de salud dental con tecnología de vanguardia y un enfoque humano en el corazón de Iztapalapa.
            </p>
          </div>

          {/* COLUMNA: ENLACES */}
          <div style={{
            ...styles.linkColumn,
            textAlign: isMobile ? "center" : "left"
          }}>
            <h4 style={styles.columnTitle}>Explorar</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}><a href="#inicio" style={styles.link}>Inicio</a></li>
              <li style={styles.linkItem}><a href="#servicios" style={styles.link}>Tratamientos</a></li>
              <li style={styles.linkItem}><a href="#nosotros" style={styles.link}>Nosotros</a></li>
              {/* ✔️ SECCIONES AÑADIDAS: Galería y Tienda vinculadas perfectamente */}
             
              <li style={styles.linkItem}><Link to="/tienda" style={styles.link}>Tienda Store</Link></li>
              <li style={styles.linkItem}><a href="#contacto" style={styles.link}>Ubicación</a></li>
            </ul>
          </div>

          {/* COLUMNA: SEDE / CONTACTO */}
          <div style={{
            ...styles.contactColumn,
            textAlign: isMobile ? "center" : "left"
          }}>
            <h4 style={styles.columnTitle}>Sede Institucional</h4>
            <p style={styles.locationText}>
              📍 Instituto Tecnológico de Iztapalapa<br/>
              Ciudad de México, CP 09820
            </p>
            <p style={styles.contactPhone}>
              📞 +52 (55) 1234 5678
            </p>
          </div>
        </div>

        {/* BARRA INFERIOR DE DERECHOS */}
        <div style={{
          ...styles.bottomBar,
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          textAlign: isMobile ? "center" : "left",
          gap: isMobile ? "15px" : "20px",
          paddingTop: isMobile ? "25px" : "30px"
        }}>
          <p style={styles.copyText}>
            © {currentYear} Dental Velasco. Todos los derechos reservados.
          </p>
          <div style={{
            ...styles.legalLinks,
            justifyContent: isMobile ? "center" : "flex-end"
          }}>
            <span style={styles.legalLink}>Privacidad</span>
            <span style={styles.legalLink}>Términos</span>
          </div>
        </div>
      </div>

      <style>{`
        footer a { text-decoration: none; transition: all 0.3s ease; }
        footer a:hover { color: #00b4d8 !important; transform: ${isMobile ? "none" : "translateX(5px)"}; }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#ffffff",
    position: "relative",
    overflow: "hidden",
    borderTop: "1px solid #f1f5f9",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box"
  },
  glowBlue: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.06) 0%, rgba(255,255,255,0) 70%)",
    top: "-200px",
    right: "-100px",
    zIndex: 0
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box"
  },
  mainGrid: {
    display: "grid",
    boxSizing: "border-box"
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "900",
    color: "#023e8a",
    margin: "0 0 15px 0",
    letterSpacing: "-1px"
  },
  highlight: {
    color: "#00b4d8",
    fontWeight: "300"
  },
  brandDesc: {
    color: "#64748b",
    fontSize: "14.5px",
    lineHeight: "1.65"
  },
  columnTitle: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  linkItem: {
    marginBottom: "10px"
  },
  link: {
    color: "#64748b",
    fontSize: "14.5px",
    fontWeight: "500",
    display: "inline-block"
  },
  locationText: {
    color: "#64748b",
    fontSize: "14.5px",
    lineHeight: "1.6",
    marginBottom: "12px"
  },
  contactPhone: {
    color: "#023e8a",
    fontWeight: "700",
    fontSize: "14.5px",
    margin: 0
  },
  bottomBar: {
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    boxSizing: "border-box"
  },
  copyText: {
    color: "#94a3b8",
    fontSize: "13.5px",
    margin: 0
  },
  legalLinks: {
    display: "flex",
    gap: "25px"
  },
  legalLink: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default Footer;