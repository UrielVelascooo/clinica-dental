import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      
      <div style={styles.decorShape}></div>
      <div style={styles.decorCircle}></div>
      
      <div style={styles.container}>
        <div style={styles.contentRow}>
          
          
          <div style={styles.brandBlock}>
            <h3 style={styles.logo}>
              Dental<span style={styles.highlight}>Velasco</span>
            </h3>
            <div style={styles.verticalDivider}></div>
            <span style={styles.tagline}>Estética & Salud Dental</span>
          </div>

          
          <div style={styles.copyBlock}>
            <p style={styles.copyText}>
              © 2026 Clínica Dental. Todos los derechos reservados.
              <span style={styles.location}> | Instituto Tegnologico de Iztapalapa, CDMX</span>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#fdfeff", 
    color: "#1f2937",
    padding: "60px 5%",
    marginTop: "0",
    fontFamily: "'Inter', sans-serif",
    position: "relative", 
    overflow: "hidden", 
    borderTop: "1px solid #f1f5f9" 
  },

  
  decorShape: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(144, 224, 239, 0.1)", 
    borderRadius: "100px",
    transform: "rotate(45deg)",
    bottom: "-150px",
    left: "-100px",
    zIndex: 0
  },

  decorCircle: {
    position: "absolute",
    width: "150px",
    height: "150px",
    background: "rgba(0, 180, 216, 0.05)", 
    borderRadius: "50%",
    top: "-50px",
    right: "10%",
    zIndex: 0
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    zIndex: 1, 
    position: "relative"
  },

  contentRow: {
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center", 
    flexWrap: "wrap", 
    gap: "20px"
  },

  brandBlock: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  logo: {
    fontSize: "1.4rem",
    fontWeight: "800",
    margin: 0,
    color: "#023e8a", 
    letterSpacing: "-0.5px"
  },

  highlight: {
    color: "#00b4d8", 
    fontWeight: "300" 
  },

  verticalDivider: {
    width: "1px",
    height: "24px",
    background: "#e5e7eb"
  },

  tagline: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },

  copyBlock: {
    textAlign: "right"
  },

  copyText: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.5"
  },

  location: {
    color: "#9ca3af"
  }
};

export default Footer;