function Footer() {
  return (
    <footer style={styles.footer}>
      <h3>DentalVelasco</h3>
      <p>© 2026 Clínica Dental - Todos los derechos reservados</p>

      <div style={styles.links}>
        <span>Inicio</span>
        <span>Servicios</span>
        <span>Contacto</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0a2540",
    color: "white",
    textAlign: "center",
    padding: "30px 20px",
    marginTop: "40px"
  },
  links: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "0.9rem"
  }
};

export default Footer;