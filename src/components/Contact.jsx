import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section
      id="contacto"
      className="contact-section"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={styles.title}>Contacto</h2>

      <div style={styles.content}>
        <div style={styles.info}>
          <h3>Clínica Dental</h3>
          <p>📍 Dirección: 1er retorno Elvira Vargas, CTM Culhuacan, 04909. Ciudad de Mexico</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.337283377204!2d-99.10577152406694!3d19.311165181942464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce018bd66fd177%3A0x8e9b2371ca4ee182!2sPrimer%20Rtno.%20de%20Elvira%20Vargas%2C%20Coapa%2C%2004909%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1775107236368!5m2!1ses-419!2smx"
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
    flexDirection: "column",
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