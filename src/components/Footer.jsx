import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
     
      <div style={styles.glowBlue}></div>
      
      <div style={styles.container}>
        <div style={styles.mainGrid}>
          
         
          <div style={styles.brandColumn}>
            <h3 style={styles.logo}>
              Dental<span style={styles.highlight}> ITIZ </span>
            </h3>
            <p style={styles.brandDesc}>
              Elevando los estándares de salud dental con tecnología de vanguardia y un enfoque humano en el corazón de Iztapalapa.
            </p>
          </div>

          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Explorar</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}><a href="#inicio" style={styles.link}>Inicio</a></li>
              <li style={styles.linkItem}><a href="#servicios" style={styles.link}>Tratamientos</a></li>
              <li style={styles.linkItem}><a href="#dentistas" style={styles.link}>Especialistas</a></li>
              <li style={styles.linkItem}><a href="#citas" style={styles.link}>Agendar Cita</a></li>
            </ul>
          </div>

         
          <div style={styles.contactColumn}>
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

       
        <div style={styles.bottomBar}>
          <p style={styles.copyText}>
            © {currentYear} Dental Velasco. Todos los derechos reservados.
          </p>
          <div style={styles.legalLinks}>
            <span style={styles.legalLink}>Privacidad</span>
            <span style={styles.legalLink}>Términos</span>
          </div>
        </div>
      </div>

      <style>{`
        footer a { text-decoration: none; transition: all 0.3s ease; }
        footer a:hover { color: #00b4d8 !important; transform: translateX(5px); }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#ffffff",
    padding: "80px 5% 40px",
    position: "relative",
    overflow: "hidden",
    borderTop: "1px solid #f1f5f9",
    fontFamily: "'Inter', sans-serif",
  },
  glowBlue: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(255,255,255,0) 70%)",
    top: "-200px",
    right: "-100px",
    zIndex: 0
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "50px",
    marginBottom: "60px"
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "900",
    color: "#023e8a",
    margin: "0 0 20px 0",
    letterSpacing: "-1px"
  },
  highlight: {
    color: "#00b4d8",
    fontWeight: "300"
  },
  brandDesc: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "320px"
  },
  columnTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "25px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  linkItem: {
    marginBottom: "12px"
  },
  link: {
    color: "#64748b",
    fontSize: "15px",
    fontWeight: "500",
    display: "inline-block"
  },
  locationText: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "15px"
  },
  contactPhone: {
    color: "#023e8a",
    fontWeight: "700",
    fontSize: "15px"
  },
  bottomBar: {
    paddingTop: "30px",
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },
  copyText: {
    color: "#94a3b8",
    fontSize: "14px",
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