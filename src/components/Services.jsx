import { motion } from "framer-motion";
import Card from "./Card";

function Services() {
  return (
    <motion.section
      id="servicios"
      className="services-section"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Nuestros Servicios</h2>

      <div className="services-cards" style={styles.cards}>
        <Card
          title="Diseño de sonrisa"
          text="Mejoramos tu sonrisa con tratamientos estéticos."
          image="https://dentioral.com/wp-content/uploads/2016/01/diseno-de-sonrisa-dentioral.jpg"
        />

        <Card
          title="Ortodoncia"
          text="Alinea tus dientes con los mejores especialistas."
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCY3QiRtYKamiQG5PpbeapoAMWuYwV9v54CQ&s"
        />

        <Card
          title="Implantes"
          text="Recupera tu sonrisa con implantes dentales."
          image="https://dentalarrasate.com/wp-content/uploads/implantes-dentales-duelen.jpg"
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