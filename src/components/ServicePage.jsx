import { Link } from "react-router-dom";

function Services() {
  const servicesData = [
    { title: "Consulta y diagnóstico general", path: "diagnostico", desc: "Evaluación completa de la salud bucal.", image: "https://images.unsplash.com/photo-1629909604934-2cca5b2f64ee?q=80&w=400" },
    { title: "Limpieza y profilaxis dental", path: "limpieza", desc: "Eliminación de placa y sarro profesional.", image: "https://images.unsplash.com/photo-1606811971618-478622128c19?q=80&w=400" },
    { title: "Tratamientos de restauración", path: "restauracion", desc: "Empastes y coronas de alta estética.", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=400" },
    { title: "Ortodoncia", path: "ortodoncia", desc: "Alineadores invisibles y brackets modernos.", image: "https://images.unsplash.com/photo-1588776814222-19f875050ef1?q=80&w=400" },
    { title: "Endodoncia", path: "endodoncia", desc: "Tratamientos de conducto sin dolor.", image: "https://images.unsplash.com/photo-1612117180496-e179e83ae410?q=80&w=400" },
    { title: "Periodoncia", path: "periodoncia", desc: "Cuidado avanzado de encías y tejidos.", image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=400" },
    { title: "Odontopediatría", path: "odontopediatria", desc: "Atención especializada para los más pequeños.", image: "https://images.unsplash.com/photo-1593012920516-e575d1d6cc4e?q=80&w=400" },
    { title: "Estética dental", path: "estetica", desc: "Blanqueamiento y diseño de sonrisa total.", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400" },
    { title: "Cirugía oral", path: "cirugia", desc: "Implantes y extracciones con precisión.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400" }
  ];

  return (
    <section id="servicios" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.accent} />
        <h2 style={styles.mainTitle}>Nuestras <span style={styles.blue}>Especialidades</span></h2>
      </div>

      <div style={styles.fullGrid}>
        {servicesData.map((service, i) => (
          <div key={i} style={{ ...styles.card, marginTop: i % 2 !== 0 ? "40px" : "0px" }}>
            <img src={service.image} alt={service.title} style={styles.img} />
            <div style={styles.cardInfo}>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardText}>{service.desc}</p>
              <Link to={`/servicios/${service.path}`} style={styles.link}>
                Saber más →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  container: { padding: "100px 5%", backgroundColor: "#ffffff" },
  header: { marginBottom: "60px", textAlign: "left", maxWidth: "1200px", margin: "0 auto 60px auto" },
  accent: { width: "60px", height: "5px", backgroundColor: "#0a2540", marginBottom: "20px" },
  mainTitle: { fontSize: "3.5rem", fontWeight: "900", color: "#0a2540", letterSpacing: "-2px" },
  blue: { color: "#00b4d8" },
  fullGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", maxWidth: "1300px", margin: "0 auto" },
  card: { backgroundColor: "#fff", borderRadius: "32px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9", transition: "all 0.3s ease" },
  img: { width: "100%", height: "200px", objectFit: "cover" },
  cardInfo: { padding: "30px" },
  cardTitle: { fontSize: "1.3rem", fontWeight: "800", color: "#0a2540", marginBottom: "10px" },
  cardText: { fontSize: "0.95rem", color: "#5e6d7a", marginBottom: "20px", lineHeight: "1.5" },
  link: { textDecoration: "none", color: "#00b4d8", fontWeight: "800", fontSize: "0.9rem" }
};

export default Services;