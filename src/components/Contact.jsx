import React from "react";

function Contact() {
  return (
    <section id="contacto" style={styles.container}>
      {/* Decoración de fondo */}
      <div style={styles.burbuja1}></div>

      <div style={styles.header}>
        <div style={styles.lineaAcento}></div>
        <span style={styles.miniSubtitle}>Contacto</span>
        <h2 style={styles.mainTitle}>Estamos aquí para <span style={styles.highlight}>ayudarte</span></h2>
      </div>

      <div style={styles.wrapper}>
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={styles.formBox}>
          <h3 style={styles.cardTitle}>Envíanos un mensaje</h3>
          <p style={styles.cardText}>Resolveremos tus dudas en menos de 24 horas.</p>

          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <input type="text" placeholder="Nombre completo" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <input type="email" placeholder="Correo electrónico" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <input type="tel" placeholder="Teléfono" style={styles.input} />
            </div>
            <textarea placeholder="¿En qué podemos ayudarte?" style={styles.textarea}></textarea>

            <button 
              style={styles.button}
              onMouseEnter={(e) => e.currentTarget.style.background = "#0096c7"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0077b6"}
            >
              Enviar Mensaje <span style={{marginLeft: '8px'}}>→</span>
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: INFO Y HORARIOS */}
        <div style={styles.infoBox}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Información de contacto</h3>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📍</span>
              <p style={styles.infoText}>Ixtapaluca, Estado de México</p>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📞</span>
              <p style={styles.infoText}>55 1234 5678</p>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📧</span>
              <p style={styles.infoText}>contacto@clinica.com</p>
            </div>
          </div>

          <div style={styles.scheduleCard}>
            <h3 style={styles.infoTitle}>Horarios de atención</h3>
            <div style={styles.scheduleRow}>
              <span>Lunes - Viernes</span>
              <span style={styles.timeBadge}>9:00 AM - 7:00 PM</span>
            </div>
            <div style={styles.scheduleRow}>
              <span>Sábado</span>
              <span style={styles.timeBadge}>9:00 AM - 2:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAPA CON ESTILO MODERNO */}
      <div style={styles.mapSection}>
        <div style={styles.mapOverlay}>Ubicación de nuestra clínica</div>
        <iframe
          title="mapa"
          src="https://www.google.com/maps?q=Ixtapaluca&output=embed"
          style={styles.map}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 5%",
    background: "#fdfeff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  burbuja1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(144, 224, 239, 0.15)",
    borderRadius: "50%",
    top: "10%",
    right: "-100px",
    filter: "blur(100px)",
    zIndex: 0
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 60px auto",
    textAlign: "left",
    zIndex: 1,
    position: "relative"
  },
  lineaAcento: {
    width: "50px",
    height: "4px",
    background: "#00b4d8",
    borderRadius: "2px",
    marginBottom: "15px"
  },
  miniSubtitle: {
    color: "#0077b6",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "2px"
  },
  mainTitle: {
    fontSize: "3rem",
    color: "#023e8a",
    fontWeight: "800",
    marginTop: "10px"
  },
  highlight: {
    color: "#00b4d8"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "50px",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto 80px auto",
    zIndex: 1,
    position: "relative"
  },
  formBox: {
    flex: "1 1 450px",
    background: "white",
    padding: "45px",
    borderRadius: "30px",
    boxShadow: "0 20px 50px rgba(2, 62, 138, 0.05)",
    border: "1px solid rgba(0, 119, 182, 0.05)"
  },
  cardTitle: {
    fontSize: "1.8rem",
    color: "#023e8a",
    marginBottom: "10px",
    fontWeight: "700"
  },
  cardText: {
    color: "#6b7280",
    marginBottom: "30px",
    fontSize: "15px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  },
  textarea: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "15px",
    minHeight: "130px",
    outline: "none",
    resize: "none",
    width: "100%",
    boxSizing: "border-box"
  },
  button: {
    padding: "18px",
    background: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0, 119, 182, 0.15)"
  },
  infoBox: {
    flex: "1 1 350px",
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  },
  infoCard: {
    background: "white",
    padding: "35px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.02)"
  },
  scheduleCard: {
    background: "linear-gradient(135deg, #023e8a, #0077b6)",
    color: "white",
    padding: "35px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0,119,182,0.15)"
  },
  infoTitle: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    fontWeight: "700"
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  icon: {
    fontSize: "20px",
    width: "40px",
    height: "40px",
    background: "rgba(0, 180, 216, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    margin: 0,
    color: "#52606d",
    fontWeight: "500"
  },
  scheduleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    fontSize: "15px"
  },
  timeBadge: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "6px 12px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "13px"
  },
  mapSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "32px",
    overflow: "hidden",
    boxShadow: "0 30px 60px rgba(2, 62, 138, 0.1)",
    position: "relative"
  },
  mapOverlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "white",
    padding: "10px 20px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px",
    color: "#023e8a",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  map: {
    width: "100%",
    height: "450px",
    border: "0"
  }
};

export default Contact;