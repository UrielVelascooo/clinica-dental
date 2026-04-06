import { Link } from "react-router-dom";

function Card({ title, text, image }) {
  return (
    <div style={styles.card}>
      {/* Contenedor de imagen con máscara de degradado */}
      <div style={styles.imageBox}>
        <img src={image} alt={title} style={styles.image} />
        <div style={styles.imageOverlay}></div>
      </div>

      {/* Contenido que "flota" sobre la imagen */}
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
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
    width: "340px",
    backgroundColor: "#ffffff",
    borderRadius: "32px", // Bordes ultra-redondeados coherentes
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(10, 37, 64, 0.1)",
    border: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
    margin: "20px"
  },
  imageBox: {
    width: "100%",
    height: "220px",
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
    padding: "0 30px 35px 30px",
    marginTop: "-40px", // Efecto innovador de solapado
    position: "relative",
    zIndex: 2,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#0a2540",
    fontWeight: "900", // Máximo peso para impacto visual
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