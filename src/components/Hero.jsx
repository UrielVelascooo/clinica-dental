import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Hero() {
  // Detector de pantalla móvil en tiempo real
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="inicio" style={{
      ...styles.heroContainer,
      padding: isMobile ? "100px 0 40px 0" : "120px 0 60px 0",
      minHeight: isMobile ? "auto" : "100vh" // Evita layouts demasiado estirados en celulares
    }}>
      <div style={styles.bgShape1}></div>
      <div style={styles.bgShape2}></div>
      <div style={styles.bgShape3}></div>

      <div style={styles.wrapper}>
        <div style={{
          ...styles.content,
          textAlign: isMobile ? "center" : "left"
        }}>
          
          {/* BADGE SUPERIOR */}
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={styles.statusDot}></span>
            Innovación en Odontología
          </motion.div>

          {/* TÍTULO PRINCIPAL RESPONSIVE */}
          <motion.h1
            style={{
              ...styles.title,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.5rem)" : "clamp(3.5rem, 12vw, 7rem)",
              letterSpacing: isMobile ? "-1.5px" : "-4px",
              lineHeight: isMobile ? "1.05" : "0.95",
              margin: isMobile ? "0 0 20px 0" : "0 0 30px 0"
            }}
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Boca {isMobile ? "" : <br />}
            <span style={{
              ...styles.outlineText,
              WebkitTextStroke: isMobile ? "1px #00b4d8" : "1.5px #00b4d8"
            }}>sana,</span> {isMobile ? "" : <br />}
            <span style={styles.highlight}>vida plena.</span>
          </motion.h1>

          {/* DESCRIPCIÓN */}
          <motion.p
            style={{
              ...styles.text,
              margin: isMobile ? "0 auto 35px auto" : "0 0 50px 0"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nos preocupamos por tu salud dental con los mejores tratamientos,
            utilizando tecnología de vanguardia en un espacio diseñado para tu bienestar.
          </motion.p>

          {/* ICONOS DE CONFIANZA */}
          <motion.div
            style={{
              ...styles.trustGrid,
              justifyContent: isMobile ? "center" : "flex-start",
              gap: isMobile ? "20px" : "30px"
            }}
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
    backgroundColor: "#fdfeff",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  wrapper: {
    width: "92%",         
    maxWidth: "1300px",   
    margin: "0 auto",
    zIndex: 1,
    boxSizing: "border-box",
    padding: "0"          
  },
  content: { width: "100%", maxWidth: "850px", boxSizing: "border-box" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,119,182,0.08)",
    fontSize: "13px",
    fontWeight: "700",
    color: "#0077b6",
    marginBottom: "25px",
    border: "1px solid rgba(0,119,182,0.05)",
  },
  statusDot: { width: "8px", height: "8px", background: "#00b4d8", borderRadius: "50%", boxShadow: "0 0 10px #00b4d8" },
  title: {
    fontWeight: "900",
    color: "#023e8a",
  },
  outlineText: { color: "transparent" },
  highlight: { color: "#00b4d8" },
  text: {
    fontSize: "clamp(1rem, 4vw, 1.22rem)",
    lineHeight: "1.7",
    color: "#52606d",
    maxWidth: "550px",
  },
  trustGrid: { display: "flex", flexWrap: "wrap" },
  trustItem: { display: "flex", alignItems: "center", gap: "10px" },
  trustIcon: { fontSize: "18px", color: "#00b4d8", fontWeight: "bold" },
  trustText: { fontSize: "13px", fontWeight: "700", color: "#023e8a", textTransform: "uppercase", letterSpacing: "1px", margin: 0 },

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
    width: "260px",
    height: "260px",
    border: "2px solid rgba(0, 180, 216, 0.08)",
    borderRadius: "50px",
    top: "15%",
    right: "8%",
    transform: "rotate(15deg)",
    zIndex: 0,
  },
};

export default Hero;