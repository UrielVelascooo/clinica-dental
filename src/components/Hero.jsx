import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.section
      id="inicio"
      className="hero-section"
      style={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="hero-overlay" style={styles.overlay}>
        <h1 className="hero-title" style={styles.title}>Boca sana</h1>
        <p className="hero-text" style={styles.text}>
          Nos preocupamos por tu salud dental con los mejores tratamientos
        </p>
      </div>
    </motion.section>
  );
}

const styles = {
  hero: {
    height: "90vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    backgroundColor: "rgba(10, 37, 64, 0.6)",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    color: "white"
  },
 title: {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "15px"
},
text: {
  fontSize: "1.1rem",
  maxWidth: "90%"
}
};

export default Hero;