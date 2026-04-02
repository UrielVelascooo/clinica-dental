import { motion } from "framer-motion";

function Gallery() {
  return (
    <motion.section
      id="galeria"
      className="gallery-section"
      style={styles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={styles.title}>Galería</h2>

      <div className="gallery-grid" style={styles.grid}>
        <img src="https://cuidateplus.marca.com/sites/default/files/styles/natural/public/cms/2023-06/limpieza-dental.jpg.webp?itok=R5G-Yt_8" style={styles.img} />
        <img src="https://www.shutterstock.com/image-photo/dentists-work-dental-office-showing-260nw-2626103783.jpg" style={styles.img} />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWagW52WPsKBQYFsOtWj5THrzUeonBJSk9Q&s" style={styles.img} />
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