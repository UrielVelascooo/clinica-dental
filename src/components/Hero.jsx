import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="inicio" style={styles.heroContainer}>
      {/* ELEMENTOS GEOMÉTRICOS DE FONDO (Sustituyen la imagen) */}
      <div style={styles.bgShape1}></div>
      <div style={styles.bgShape2}></div>
      <div style={styles.bgShape3}></div>

      <div style={styles.wrapper}>
        <div style={styles.content}>
          {/* BADGE FLOTANTE */}
          <motion.div 
            style={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={styles.statusDot}></span>
            Innovación en Odontología
          </motion.div>

          {/* TÍTULO ESCULTÓRICO */}
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Boca <br />
            <span style={styles.outlineText}>sana,</span> <br />
            <span style={styles.highlight}>vida plena.</span>
          </motion.h1>

          {/* DESCRIPCIÓN REFINADA */}
          <motion.p 
            style={styles.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nos preocupamos por tu salud dental con los mejores tratamientos, 
            utilizando tecnología de vanguardia en un espacio diseñado para tu bienestar.
          </motion.p>

          {/* INDICADORES VISUALES DE CONFIANZA */}
          <motion.div 
            style={styles.trustGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>✦</span>
              <p style={styles.trustText}>Tecnología Digital</p>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>✦</span>
              <p style={styles.trustText}>Atención Premium</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroContainer: {
    height: "100vh",
    backgroundColor: "#fdfeff",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  },
  // FORMAS GEOMÉTRICAS QUE REEMPLAZAN LA IMAGEN
  bgShape1: {
    position: "absolute",
    width: "800px",
    height: "800px",
    background: "rgba(144, 224, 239, 0.15)",
    borderRadius: "50%",
    top: "-200px",
    right: "-200px",
    filter: "blur(80px)",
    zIndex: 0
  },
  bgShape2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(0, 180, 216, 0.08)",
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    bottom: "-100px",
    left: "-100px",
    filter: "blur(60px)",
    zIndex: 0
  },
  bgShape3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    border: "2px solid rgba(0, 180, 216, 0.1)",
    borderRadius: "50px",
    top: "20%",
    right: "15%",
    transform: "rotate(15deg)",
    zIndex: 0
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 5%",
    width: "100%",
    zIndex: 1
  },
  content: {
    maxWidth: "800px",
    textAlign: "left"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,119,182,0.08)",
    fontSize: "14px",
    fontWeight: "700",
    color: "#0077b6",
    marginBottom: "40px",
    border: "1px solid rgba(0,119,182,0.05)"
  },
  statusDot: {
    width: "8px",
    height: "8px",
    background: "#00b4d8",
    borderRadius: "50%",
    boxShadow: "0 0 10px #00b4d8"
  },
  title: {
    fontSize: "clamp(4rem, 10vw, 7rem)",
    fontWeight: "900",
    lineHeight: "0.95",
    color: "#023e8a",
    margin: "0 0 30px 0",
    letterSpacing: "-4px"
  },
  outlineText: {
    color: "transparent",
    WebkitTextStroke: "1.5px #00b4d8", // Texto con borde para ligereza visual
  },
  highlight: {
    color: "#00b4d8",
  },
  text: {
    fontSize: "1.25rem",
    lineHeight: "1.8",
    color: "#52606d",
    maxWidth: "550px",
    marginBottom: "50px"
  },
  trustGrid: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap"
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  trustIcon: {
    fontSize: "20px",
    color: "#00b4d8",
    fontWeight: "bold"
  },
  trustText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#023e8a",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "1px"
  }
};

export default Hero;