import { useState } from "react";

function Appointment() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const enviarWhatsApp = () => {
    const mensaje = `Hola, quiero agendar una cita:
Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Servicio: ${form.servicio}
Fecha: ${form.fecha}`;

    const url = `https://wa.me/521XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <section style={styles.section}>
      {/* Decoración de fondo coherente con el resto del sitio */}
      <div style={styles.burbuja1}></div>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.lineaAcento}></div>
          <h2 style={styles.title}>Agenda tu visita</h2>
          <p style={styles.subtitle}>
            Estás a un paso de transformar tu sonrisa. Completa tus datos y nos pondremos en contacto.
          </p>
        </div>

        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Juan Pérez"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono de contacto</label>
            <input
              type="tel"
              name="telefono"
              placeholder="Tu número de celular"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Tratamiento de interés</label>
            <select
              name="servicio"
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Selecciona un servicio</option>
              <option>Diseño de sonrisa</option>
              <option>Ortodoncia</option>
              <option>Implantes Dentales</option>
              <option>Limpieza Profunda</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Fecha preferida</label>
            <input
              type="date"
              name="fecha"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button 
            onClick={enviarWhatsApp} 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.background = "#0096c7"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0077b6"}
          >
            Confirmar por WhatsApp
            <span style={{ marginLeft: '10px' }}>→</span>
          </button>
          
          <p style={styles.footerNote}>
            🔒 Tu información está protegida bajo estándares de privacidad médica.
          </p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "100px 20px",
    background: "#fdfeff", // Fondo limpio coherente
    display: "flex",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  burbuja1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(0, 180, 216, 0.08)",
    borderRadius: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    filter: "blur(100px)",
    zIndex: 0
  },
  container: {
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "32px",
    width: "100%",
    maxWidth: "550px",
    boxShadow: "0 25px 60px rgba(2, 62, 138, 0.08)",
    border: "1px solid rgba(0, 119, 182, 0.05)",
    zIndex: 1,
    position: "relative"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  lineaAcento: {
    width: "40px",
    height: "4px",
    background: "#00b4d8",
    borderRadius: "2px",
    margin: "0 auto 15px auto"
  },
  title: {
    fontSize: "2.2rem",
    marginBottom: "12px",
    color: "#023e8a",
    fontWeight: "800"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.5",
    maxWidth: "400px",
    margin: "0 auto"
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#023e8a",
    marginLeft: "4px"
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
    color: "#1f2937"
  },
  select: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: "15px",
    outline: "none",
    cursor: "pointer",
    color: "#1f2937"
  },
  button: {
    marginTop: "10px",
    padding: "18px",
    backgroundColor: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0, 119, 182, 0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  footerNote: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "20px",
    textAlign: "center"
  }
};

export default Appointment;