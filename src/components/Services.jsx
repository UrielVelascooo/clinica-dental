import { Link } from "react-router-dom";

function Services() {
  const servicesData = [
    {
      title: "Consulta y diagnóstico general",
      desc: "Evaluación completa de la salud bucal con radiografías y detección temprana de caries.",
      path: "diagnostico",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvPi4NdICjLoGJ6M9KI0MwV3IfYSuwjVq5w&s"
    },
    {
      title: "Limpieza y profilaxis dental",
      desc: "Eliminación de placa y sarro, pulido y educación profesional en higiene oral.",
      path: "limpieza",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsU3lGKov2TAv8ZIYbBlRy7I76d4h7GTTMA&s"
    },
    {
      title: "Tratamientos de restauración",
      desc: "Empastes, coronas y carillas para reparar dientes fracturados y mejorar la estética.",
      path: "restauracion",
      image: "https://clinicadentalgingiva.es/wp-content/uploads/2025/09/tratamientos-de-restauracion-dental-recupera-tu-sonrisa-despues-de-danos.jpg"
    },
    {
      title: "Ortodoncia",
      desc: "Aparatos tradicionales y alineadores invisibles para la corrección de maloclusiones.",
      path: "ortodoncia",
      image: "https://www.teeth22.com/wp-content/uploads/2018/11/cuidar-los-dientes-durante-tratamiento-ortodoncia-1024x511.jpg"
    },
    {
      title: "Endodoncia",
      desc: "Tratamiento de conducto para salvar dientes con infecciones o inflamaciones internas.",
      path: "endodoncia",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7F0pPx0yhC04XgrS6dKsgrfs4r2ahm6YKA&s"
    },
    {
      title: "Periodoncia",
      desc: "Tratamiento de encías y cirugías menores para evitar la pérdida dental prematura.",
      path: "periodoncia",
      image: "https://periodontium.es/wp-content/uploads/2021/07/que-es-periodoncia-clinica-dental-periodontium-02.jpg"
    },
    {
      title: "Odontopediatría",
      desc: "Cuidado especializado para niños y educación en hábitos de higiene desde temprana edad.",
      path: "odontopediatria",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBg3EjJFyXy3PAGVfcHKEXu0Jd1uqavXnWRw&s"
    },
    {
      title: "Estética dental",
      desc: "Blanqueamiento profesional y diseño de sonrisa para una rehabilitación estética total.",
      path: "estetica",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA3SYpLs8V60WGY_5JZOIRorUPsLoCazbVQ&s"
    },
    {
      title: "Cirugía oral",
      desc: "Extracciones complejas e implantes dentales para el reemplazo de piezas perdidas.",
      path: "cirugia",
      image: "https://ceaoclinic.com/wp-content/uploads/2020/10/cirugia-bucal.jpg"
    }
  ];

  return (
    <section id="servicios" style={styles.container}>
      <div style={styles.bgGlow}></div>
      <div style={styles.bgCircle}></div>
      
      <div style={styles.wrapper}>
        <div style={styles.header}>
          {/* AQUÍ ESTÁ EL CAMBIO PRINCIPAL */}
          <div style={styles.badgeContainer}>
            <span style={styles.newTag}>Nuestros Tratamientos</span>
          </div>
          
          <h2 style={styles.mainTitle}>
            Diseñamos la <span style={styles.gradientText}>sonrisa</span> <br /> 
            que proyecta tu <span style={styles.italicText}>mejor versión</span>
          </h2>
          
          <div style={styles.descriptionWrapper}>
            <div style={styles.miniDivider}></div>
          </div>
        </div>

        <div style={styles.gridContainer}>
          {servicesData.map((service, i) => (
            <div key={i} className="service-card" style={styles.serviceCard}>
              <div style={styles.imageBox}>
                <img src={service.image} alt={service.title} style={styles.img} className="card-image" />
                <div style={styles.numberOverlay}>0{i + 1}</div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardText}>{service.desc}</p>
                
                <Link to={`/servicios/${service.path}`} style={styles.btnLink} className="action-button">
                  <span>Descubrir servicio</span>
                  <div style={styles.btnCircle} className="btn-circle">
                    <span style={styles.arrowIcon}>→</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .service-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(10, 37, 64, 0.12) !important;
          background: rgba(255, 255, 255, 1) !important;
        }
        .service-card:hover .card-image {
          transform: scale(1.1);
        }
        .action-button:hover {
          background-color: #0a2540 !important;
          color: #fff !important;
        }
        .action-button:hover .btn-circle {
          background: #00b4d8 !important;
          transform: translateX(5px);
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    padding: "120px 5%",
    backgroundColor: "#fcfdfe",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  bgGlow: {
    position: "absolute",
    width: "800px",
    height: "800px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%)",
    top: "-20%",
    left: "-10%",
    zIndex: 0
  },
  bgCircle: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(10, 37, 64, 0.02)",
    borderRadius: "50%",
    bottom: "-10%",
    right: "-5%",
    zIndex: 0
  },
  wrapper: {
    maxWidth: "1300px",
    margin: "0 auto",
    zIndex: 1,
    position: "relative"
  },
  header: {
    textAlign: "center",
    marginBottom: "90px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  badgeContainer: {
    background: "#023e8a", 
    padding: "12px 32px",  
    borderRadius: "60px",
    marginBottom: "30px",
    boxShadow: "0 10px 20px rgba(2, 62, 138, 0.2)", 
    border: "2px solid #00b4d8",
  },
  newTag: {
    fontSize: "1rem",      
    fontWeight: "900",     
    color: "#ffffff",      
    textTransform: "uppercase",
    letterSpacing: "3px",  
  },
  mainTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "900",
    color: "#0a2540",
    lineHeight: "1.05",
    letterSpacing: "-2px",
    maxWidth: "900px",
    margin: "0 auto 30px auto"
  },
  gradientText: {
    background: "linear-gradient(135deg, #023e8a 30%, #00b4d8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  italicText: {
    fontStyle: "italic",
    fontWeight: "400",
    color: "#0a2540",
    opacity: 0.9
  },
  descriptionWrapper: {
    maxWidth: "600px",
    position: "relative"
  },
  miniDivider: {
    width: "60px",
    height: "4px",
    background: "#00b4d8",
    margin: "10px auto 0 auto",
    borderRadius: "10px"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: "35px",
  },
  serviceCard: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "45px",
    padding: "15px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    display: "flex",
    flexDirection: "column",
  },
  imageBox: {
    height: "250px",
    borderRadius: "35px",
    overflow: "hidden",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)"
  },
  numberOverlay: {
    position: "absolute",
    bottom: "25px",
    right: "25px",
    fontSize: "3.5rem",
    fontWeight: "900",
    color: "rgba(255, 255, 255, 0.35)",
    pointerEvents: "none",
    letterSpacing: "-2px"
  },
  cardContent: {
    padding: "35px 25px 20px 25px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    fontSize: "1.45rem",
    fontWeight: "800",
    color: "#0a2540",
    marginBottom: "15px",
    letterSpacing: "-0.5px"
  },
  cardText: {
    fontSize: "1rem",
    color: "#5e6d7a",
    lineHeight: "1.7",
    marginBottom: "35px",
    flexGrow: 1
  },
  btnLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textDecoration: "none",
    color: "#0a2540",
    fontWeight: "700",
    fontSize: "0.95rem",
    padding: "10px 10px 10px 25px",
    borderRadius: "60px",
    backgroundColor: "#f1f5f9",
  },
  btnCircle: {
    width: "42px",
    height: "42px",
    backgroundColor: "#0a2540",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s ease"
  },
  arrowIcon: {
    color: "white",
    fontSize: "1.3rem",
  }
};

export default Services;