function Card({ title, text, image }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>{text}</p>
      <button style={styles.button}>Leer más</button>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "0.3s"
  },
  image: {
    width: "100%",
    borderRadius: "10px"
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#0a2540",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Card;