function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>DentalCare</h2>

      <ul style={styles.menu}>
  <li><a href="#inicio" style={styles.link}>Inicio</a></li>
  <li><a href="#servicios" style={styles.link}>Servicios</a></li>
  <li><a href="#dentistas" style={styles.link}>Dentistas</a></li>
  <li><a href="#galeria" style={styles.link}>Galería</a></li>
  <li><a href="#contacto" style={styles.link}>Contacto</a></li>
</ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 60px",
    backgroundColor: "#0a2540",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  menu: {
    display: "flex",
    gap: "30px",
    listStyle: "none",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer"
  }
};

export default Navbar;