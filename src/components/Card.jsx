// src/components/Card.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Card({ title, text, image }) {
  // Hook para detectar si la pantalla es móvil en tiempo real
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{
      ...styles.card,
      width: isMobile ? "100%" : "340px", // Ancho fluido en móvil
      maxWidth: isMobile ? "360px" : "340px", // Evita que se deforme en pantallas medianas
      margin: isMobile ? "10px 0" : "20px" // Reduce espacio exterior en móvil
    }}>
      
      <div style={{
        ...styles.imageBox,
        height: isMobile ? "180px" : "220px" // Imagen ligeramente más baja en celulares
      }}>
        <img src={image} alt={title} style={styles.image} />
        <div style={styles.imageOverlay}></div>
      </div>

      <div style={{
        ...styles.cardContent,
        padding: isMobile ? "0 20px 25px 20px" : "0 30px 35px 30px", // Relleno más compacto
        marginTop: isMobile ? "-30px" : "-40px" // Ajuste del desfase visual
      }}>
        <h3 style={{
          ...styles.cardTitle,
          fontSize: isMobile ? "1.35rem" : "1.5rem" // Fuente adaptada para celulares
        }}>{title}</h3>
        <p style={styles.cardText}>{text}</p>
        
        <Link to="/servicios" style={styles.button}>
          <span style={styles.btnText}>Ver detalles</span>
          <span style={styles.btnIcon}>→</span>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "32px", 
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(10, 37, 64, 0.1)",
    border: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)"
  },
  imageBox: {
    width: "100%",
    position: "relative",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 30%, #ffffff 100%)"
  },
  cardContent: {
    position: "relative",
    zIndex: 2,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  cardTitle: {
    color: "#0a2540",
    fontWeight: "900", 
    marginBottom: "12px",
    letterSpacing: "-1px",
    lineHeight: "1.2"
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#5e6d7a",
    lineHeight: "1.6",
    marginBottom: "25px",
    flexGrow: 1
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 22px",
    backgroundColor: "#0a2540",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "18px",
    fontSize: "0.9rem",
    fontWeight: "700",
    boxShadow: "0 8px 16px rgba(10, 37, 64, 0.15)",
    transition: "all 0.3s ease"
  },
  btnText: {
    marginRight: "8px"
  },
  btnIcon: {
    fontSize: "1.1rem"
  }
};

export default Card;