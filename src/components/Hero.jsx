import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section id="inicio" style={styles.heroContainer}>
      <div style={styles.bgShape1}></div>
      <div style={styles.bgShape2}></div>
      <div style={styles.bgShape3}></div>

      {/* El wrapper ahora tiene las mismas medidas que tu NavbarContainer */}
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={styles.statusDot}></span>
            Innovación en Odontología
          </motion.div>

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

          <motion.p
            style={styles.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nos preocupamos por tu salud dental con los mejores tratamientos,
            utilizando tecnología de vanguardia en un espacio diseñado para tu bienestar.
          </motion.p>

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
    minHeight: "100vh",
    backgroundColor: "#fdfeff",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "120px 0 60px 0",
  },
  wrapper: {
    width: "92%",         // <--- IGUAL AL NAVBAR
    maxWidth: "1300px",   // <--- IGUAL AL NAVBAR
    margin: "0 auto",
    zIndex: 1,
    boxSizing: "border-box",
    padding: "0"          // Quitamos el padding extra para que el borde sea exacto al Navbar
  },
  content: { width: "100%", maxWidth: "850px" },
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
    marginBottom: "30px",
    border: "1px solid rgba(0,119,182,0.05)",
  },
  statusDot: { width: "8px", height: "8px", background: "#00b4d8", borderRadius: "50%", boxShadow: "0 0 10px #00b4d8" },
  title: {
    fontSize: "clamp(3.5rem, 12vw, 7rem)",
    fontWeight: "900",
    lineHeight: "0.95",
    color: "#023e8a",
    margin: "0 0 30px 0",
    letterSpacing: "-4px",
  },
  outlineText: { color: "transparent", WebkitTextStroke: "1.5px #00b4d8" },
  highlight: { color: "#00b4d8" },

  text: {
    fontSize: "clamp(1rem, 4vw, 1.25rem)",
    lineHeight: "1.8",
    color: "#52606d",
    maxWidth: "550px",
    marginBottom: "50px",
  },
  trustGrid: { display: "flex", gap: "30px", flexWrap: "wrap" },
  trustItem: { display: "flex", alignItems: "center", gap: "12px" },
  trustIcon: { fontSize: "20px", color: "#00b4d8", fontWeight: "bold" },
  trustText: { fontSize: "14px", fontWeight: "600", color: "#023e8a", textTransform: "uppercase", letterSpacing: "1px", margin: 0 },

  bgShape1: {
    position: "absolute",
    width: "100%",
    maxWidth: "800px",
    height: "800px",
    background: "rgba(144, 224, 239, 0.15)",
    borderRadius: "50%",
    top: "-200px",
    right: "-200px",
    filter: "blur(80px)",
    zIndex: 0,
  },
  bgShape2: {
    position: "absolute",
    width: "100%",
    maxWidth: "500px",
    height: "500px",
    background: "rgba(0, 180, 216, 0.08)",
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    bottom: "-100px",
    left: "-100px",
    filter: "blur(60px)",
    zIndex: 0,
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
    zIndex: 0,
  },
};

export default Hero;