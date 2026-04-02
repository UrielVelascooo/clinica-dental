import { motion } from "framer-motion";
import Card from "./Card";

function Services() {
  return (
    <motion.section
      id="servicios"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Nuestros Servicios</h2>

      <div style={styles.cards}>
        <Card
          title="Diseño de sonrisa"
          text="Mejoramos tu sonrisa con tratamientos estéticos."
          image="https://images.unsplash.com/photo-1606813907291-d86efa9b94db"
        />

        <Card
          title="Ortodoncia"
          text="Alinea tus dientes con los mejores especialistas."
          image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        />

        <Card
          title="Implantes"
          text="Recupera tu sonrisa con implantes dentales."
          image="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
        />
      </div>
    </motion.section>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    backgroundColor: "#f5f5f5"
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap"
  }
};

export default Services;