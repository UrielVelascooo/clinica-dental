import { Link } from "react-router-dom";

function Services() {
  const servicesData = [
    {
      title: "Consulta y diagnóstico general",
      desc: "Evaluación completa de la salud bucal con radiografías y detección temprana de caries.",
      path: "diagnostico",
      image: "https://images.unsplash.com/photo-1629909604934-2cca5b2f64ee?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Limpieza y profilaxis dental",
      desc: "Eliminación de placa y sarro, pulido y educación profesional en higiene oral.",
      path: "limpieza",
      image: "https://images.unsplash.com/photo-1606811971618-478622128c19?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Tratamientos de restauración",
      desc: "Empastes, coronas y carillas para reparar dientes fracturados y mejorar la estética.",
      path: "restauracion",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Ortodoncia",
      desc: "Aparatos tradicionales y alineadores invisibles para la corrección de maloclusiones.",
      path: "ortodoncia",
      image: "https://images.unsplash.com/photo-1588776814222-19f875050ef1?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Endodoncia",
      desc: "Tratamiento de conducto para salvar dientes con infecciones o inflamaciones internas.",
      path: "endodoncia",
      image: "https://images.unsplash.com/photo-1612117180496-e179e83ae410?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Periodoncia",
      desc: "Tratamiento de encías y cirugías menores para evitar la pérdida dental prematura.",
      path: "periodoncia",
      image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Odontopediatría",
      desc: "Cuidado especializado para niños y educación en hábitos de higiene desde temprana edad.",
      path: "odontopediatria",
      image: "https://images.unsplash.com/photo-1593012920516-e575d1d6cc4e?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Estética dental",
      desc: "Blanqueamiento profesional y diseño de sonrisa para una rehabilitación estética total.",
      path: "estetica",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "Cirugía oral",
      desc: "Extracciones complejas e implantes dentales para el reemplazo de piezas perdidas.",
      path: "cirugia",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500&auto=format&fit=crop"
    }
  ];

  return (
    <section id="servicios" style={styles.container}>
      <div style={styles.bgGlow}></div>
      
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.accentLine}></div>
          <span style={styles.tagline}>Nuestros Servicios</span>
          <h2 style={styles.mainTitle}>
            Excelencia dental <br /> 
            <span style={styles.blueText}>a tu alcance</span>
          </h2>
          <p style={styles.description}>
            Ofrecemos soluciones integrales con tecnología de punta para garantizar 
            que tu sonrisa sea funcional, saludable y estética.
          </p>
        </div>

        <div style={styles.fullGrid}>
          {servicesData.map((service, i) => (
            <div 
              key={i} 
              style={{
                ...styles.serviceCard,
                marginTop: i % 2 !== 0 ? "40px" : "0px" 
              }}
            >
              <div style={styles.imageWrapper}>
                <img src={service.image} alt={service.title} style={styles.img} />
                <div style={styles.overlay}></div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardText}>{service.desc}</p>
                <Link to={`/servicios/${service.path}`} style={styles.link}>
                  Saber más 
                  <span style={styles.arrow}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 5%",
    backgroundColor: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.05) 0%, transparent 70%)",
    top: "-10%",
    right: "-5%",
    zIndex: 0
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
    zIndex: 1,
    position: "relative"
  },
  header: {
    textAlign: "left",
    marginBottom: "80px",
    maxWidth: "800px"
  },
  accentLine: {
    width: "60px",
    height: "5px",
    backgroundColor: "#0a2540",
    marginBottom: "25px",
    borderRadius: "2px"
  },
  tagline: {
    fontSize: "0.9rem",
    fontWeight: "800",
    color: "#0a2540",
    textTransform: "uppercase",
    letterSpacing: "3px",
  },
  mainTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "900",
    color: "#0a2540",
    lineHeight: "1.1",
    letterSpacing: "-2px",
    margin: "15px 0"
  },
  blueText: {
    color: "#00b4d8"
  },
  description: {
    fontSize: "1.1rem",
    color: "#5e6d7a",
    lineHeight: "1.8",
    maxWidth: "600px"
  },
  fullGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "40px",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: "32px",
    boxShadow: "0 20px 40px rgba(10, 37, 64, 0.05)",
    overflow: "hidden",
    border: "1px solid #f8fafc",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease"
  },
  imageWrapper: {
    height: "200px",
    position: "relative"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10, 37, 64, 0.1), transparent)"
  },
  cardContent: {
    padding: "30px",
    textAlign: "left",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#0a2540",
    marginBottom: "12px",
    lineHeight: "1.2"
  },
  cardText: {
    fontSize: "0.95rem",
    color: "#5e6d7a",
    lineHeight: "1.6",
    marginBottom: "25px",
    flexGrow: 1
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#0a2540",
    fontWeight: "800",
    fontSize: "0.85rem",
    gap: "8px"
  },
  arrow: {
    color: "#00b4d8",
    fontSize: "1.1rem"
  }
};

export default Services;