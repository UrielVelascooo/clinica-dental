import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section
      id="contacto"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={styles.title}>Contacto</h2>

      <div style={styles.content}>
        <div style={styles.info}>
          <h3>Clínica Dental</h3>
          <p>📍 Dirección: Calle Ejemplo #123</p>
          <p>📞 Teléfono: 55 1234 5678</p>

          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            style={styles.button}
          >
            Agendar por WhatsApp
          </a>
        </div>

        <div style={styles.map}>
          <iframe
            src="https://www.google.com/maps?q=Mexico&output=embed"
            width="100%"
            height="300"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
}

const styles = {
  container: {
    padding: "50px",
    textAlign: "center"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "30px"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },
  info: {
    maxWidth: "300px",
    textAlign: "left"
  },
  map: {
    width: "100%",
    maxWidth: "400px"
  },
  button: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#0a2540",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none"
  }
};

export default Contact;