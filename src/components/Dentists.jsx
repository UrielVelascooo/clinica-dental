import { motion } from "framer-motion";

function Dentists() {
  return (
    <motion.section
      id="dentistas"
      className="dentists-section"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p style={styles.slogan}>Nuestro equipo de profesionales</p>

      <h2 style={styles.title}>Nuestros Dentistas</h2>

      <p style={styles.description}>
        Contamos con especialistas altamente capacitados, comprometidos con brindarte una atención de calidad, confianza y los mejores resultados para tu salud y estética dental.
      </p>

      <div className="dentists-cards" style={styles.cards}>
        <motion.div
          style={styles.card}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            style={styles.image}
          />
          <h3>Dra. Daniela Pérez</h3>
          <p>Especialista en Ortodoncia</p>
        </motion.div>

        <motion.div
          style={styles.card}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f"
            style={styles.image}
          />
          <h3>Dra. María López</h3>
          <p>Especialista en Implantología</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    backgroundColor: "#ffffff"
  },
  slogan: {
    color: "blue",
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "1.8rem",
    letterSpacing: "1px"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px"
  },
  description: {
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    color: "#555",
    fontSize: "1rem"
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },
  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    cursor: "pointer"
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "15px"
  }
};

export default Dentists;