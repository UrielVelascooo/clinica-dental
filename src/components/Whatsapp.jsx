function Whatsapp() {
  const phone = "521234567890"; // ← cambia este número

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      💬
    </a>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366",
    color: "white",
    fontSize: "24px",
    padding: "15px",
    borderRadius: "50%",
    textDecoration: "none",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
  }
};

export default Whatsapp;