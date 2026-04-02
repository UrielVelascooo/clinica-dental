import { motion } from "framer-motion";

function Gallery() {
  return (
    <motion.section
      id="galeria"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={styles.title}>Galería</h2>

      <div style={styles.grid}>
        <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5" style={styles.img} />
        <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db" style={styles.img} />
        <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09" style={styles.img} />
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
  title: {
    fontSize: "2rem",
    marginBottom: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px"
  },
  img: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  }
};

export default Gallery;