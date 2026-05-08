import { Link } from "react-router-dom";

function Services() {
  const servicesData = [
    {
      title: "Consulta y diagnóstico general",
      desc: "Evaluación completa de la salud bucal con radiografías y detección temprana de caries.",
      path: "diagnostico",
      category: "Preventiva",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvPi4NdICjLoGJ6M9KI0MwV3IfYSuwjVq5w&s"
    },
    {
      title: "Limpieza y profilaxis dental",
      desc: "Eliminación de placa y sarro, pulido y educación profesional en higiene oral.",
      path: "limpieza",
      category: "Higiene",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsU3lGKov2TAv8ZIYbBlRy7I76d4h7GTTMA&s"
    },
    {
      title: "Tratamientos de restauración",
      desc: "Empastes, coronas y carillas para reparar dientes fracturados y mejorar la estética.",
      path: "restauracion",
      category: "Restauración",
      image: "https://clinicadentalgingiva.es/wp-content/uploads/2025/09/tratamientos-de-restauracion-dental-recupera-tu-sonrisa-despues-de-danos.jpg"
    },
    {
      title: "Ortodoncia",
      desc: "Aparatos tradicionales y alineadores invisibles para la corrección de maloclusiones.",
      path: "ortodoncia",
      category: "Correctiva",
      image: "https://www.teeth22.com/wp-content/uploads/2018/11/cuidar-los-dientes-durante-tratamiento-ortodoncia-1024x511.jpg"
    },
    {
      title: "Endodoncia",
      desc: "Tratamiento de conducto para salvar dientes con infecciones o inflamaciones internas.",
      path: "endodoncia",
      category: "Especializada",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7F0pPx0yhC04XgrS6dKsgrfs4r2ahm6YKA&s"
    },
    {
      title: "Periodoncia",
      desc: "Tratamiento de encías y cirugías menores para evitar la pérdida dental prematura.",
      path: "periodoncia",
      category: "Encías",
      image: "https://periodontium.es/wp-content/uploads/2021/07/que-es-periodoncia-clinica-dental-periodontium-02.jpg"
    },
    {
      title: "Odontopediatría",
      desc: "Cuidado especializado para niños y educación en hábitos de higiene desde temprana edad.",
      path: "odontopediatria",
      category: "Infantil",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBg3EjJFyXy3PAGVfcHKEXu0Jd1uqavXnWRw&s"
    },
    {
      title: "Estética dental",
      desc: "Blanqueamiento profesional y diseño de sonrisa para una rehabilitación estética total.",
      path: "estetica",
      category: "Estética",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA3SYpLs8V60WGY_5JZOIRorUPsLoCazbVQ&s"
    },
    {
      title: "Cirugía oral",
      desc: "Extracciones complejas e implantes dentales para el reemplazo de piezas perdidas.",
      path: "cirugia",
      category: "Cirugía",
      image: "https://ceaoclinic.com/wp-content/uploads/2020/10/cirugia-bucal.jpg"
    }
  ];

  return (
    <section id="servicios" style={styles.container}>
      {/* Elementos decorativos de fondo */}
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>
      
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <div style={styles.badgeContainer}>
            <span style={styles.badgeText}>Servicios Profesionales</span>
          </div>
          <h2 style={styles.mainTitle}>
            Cuidado integral para <br /> 
            <span style={styles.gradientText}>cada una de tus necesidades</span>
          </h2>
          <div style={styles.miniDivider}></div>
        </header>

        <div style={styles.gridContainer}>
          {servicesData.map((service, i) => (
            <Link to={`/servicios/${service.path}`} key={i} className="service-card" style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={service.image} alt={service.title} style={styles.img} className="card-image" />
                <div style={styles.categoryBadge}>{service.category}</div>
                <div style={styles.numberIndicator}>0{i + 1}</div>
              </div>
              
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardDescription}>{service.desc}</p>
                
                <div style={styles.cardFooter} className="card-footer-info">
                  <span style={styles.moreInfo}>Más información</span>
                  <div style={styles.arrowCircle} className="arrow-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .service-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid rgba(2, 62, 138, 0.08);
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px -15px rgba(2, 62, 138, 0.15);
          border-color: #00b4d8;
        }

        .service-card:hover .card-image {
          transform: scale(1.1);
        }

        .service-card:hover .arrow-icon {
          background: #023e8a;
          color: white;
          transform: rotate(-45deg);
        }

        .service-card:hover .card-footer-info {
          color: #00b4d8;
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 5%",
    backgroundColor: "#f8fbff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  bgBlob1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%)",
    top: "-150px",
    left: "-100px",
    zIndex: 0
  },
  bgBlob2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(2, 62, 138, 0.05) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-100px",
    zIndex: 0
  },
  wrapper: {
    maxWidth: "1300px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1
  },
  header: {
    marginBottom: "60px",
    textAlign: "left"
  },
  badgeContainer: {
    display: "inline-block",
    padding: "8px 20px",
    background: "rgba(2, 62, 138, 0.1)",
    borderRadius: "50px",
    marginBottom: "20px"
  },
  badgeText: {
    color: "#023e8a",
    fontSize: "0.85rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  mainTitle: {
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
    fontWeight: "900",
    color: "#0a2540",
    lineHeight: "1.1",
    margin: "0 0 20px 0",
    letterSpacing: "-1px"
  },
  gradientText: {
    background: "linear-gradient(135deg, #023e8a 0%, #00b4d8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  miniDivider: {
    width: "60px",
    height: "5px",
    background: "#00b4d8",
    borderRadius: "10px"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "35px",
  },
  imageContainer: {
    height: "240px",
    position: "relative",
    overflow: "hidden"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.7s ease"
  },
  categoryBadge: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "6px 15px",
    borderRadius: "10px",
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#023e8a",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  numberIndicator: {
    position: "absolute",
    top: "20px",
    right: "25px",
    fontSize: "2rem",
    fontWeight: "900",
    color: "rgba(255, 255, 255, 0.4)",
    fontStyle: "italic"
  },
  cardBody: {
    padding: "30px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#0a2540",
    marginBottom: "15px",
    letterSpacing: "-0.5px"
  },
  cardDescription: {
    fontSize: "1.05rem",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "25px"
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#023e8a",
    fontWeight: "800",
    transition: "all 0.3s ease",
    fontSize: "0.95rem"
  },
  arrowCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s ease"
  }
};

export default Services;