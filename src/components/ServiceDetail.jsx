import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const infoServicios = {
  diagnostico: {
    title: "Consulta y Diagnóstico General",
    subtitle: "Prevención Inteligente",
    fullDesc: "La base de una sonrisa duradera es una evaluación exhaustiva. Utilizamos tecnología de punta para detectar problemas antes de que causen dolor.",
    ventajas: [
      "Evaluación completa de la salud bucal",
      "Radiografías digitales de baja radiación",
      "Detección temprana de caries y enfermedades periodontales",
      "Revisiones periódicas preventivas"
    ],
    image: "https://www.clinicadentalventas.com/theme/unify2/assets/img/blog/la-importancia-diagnostico-dental-correcto-top.jpg"
  },
  limpieza: {
    title: "Limpieza y Profilaxis Dental",
    subtitle: "Higiene Profesional",
    fullDesc: "Eliminamos lo que el cepillo en casa no puede. Un procedimiento esencial para mantener tus encías sanas y tus dientes brillantes.",
    ventajas: [
      "Eliminación profunda de placa y sarro",
      "Pulido dental para eliminar manchas",
      "Aplicación de flúor protector",
      "Educación personalizada en higiene oral"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27_qdOHnjOS0s6fFSnIpp_zzFjpFfzgLTCA&s"
  },
  restauracion: {
    title: "Tratamientos de Restauración",
    subtitle: "Funcionalidad y Estética",
    fullDesc: "Devolvemos la forma y función a tus dientes dañados con materiales de alta resistencia que imitan el color natural del esmalte.",
    ventajas: [
      "Empastes y reconstrucciones estéticas",
      "Coronas y puentes de porcelana/zirconio",
      "Reparación de dientes fracturados",
      "Carillas para mejorar la forma dental"
    ],
    image: "https://dentaldaia.com/wp-content/uploads/2021/07/PULPOTOMIA-H2.jpg"
  },
  ortodoncia: {
    title: "Ortodoncia Avanzada",
    subtitle: "Alineación Perfecta",
    fullDesc: "Corregimos la posición de tus dientes y tu mordida para mejorar no solo tu estética, sino también tu salud mandibular.",
    ventajas: [
      "Alineadores invisibles (estética total)",
      "Brackets tradicionales de alta eficiencia",
      "Corrección de maloclusiones complejas",
      "Seguimiento personalizado mes a mes"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLu1vt7nSZx7y3H2lpjuq-sBllflhVJTv3Ww&s"
  },
  endodoncia: {
    title: "Endodoncia",
    subtitle: "Salva tus Dientes",
    fullDesc: "Especialidad dedicada a tratar el interior del diente (pulpa) para eliminar el dolor y evitar extracciones innecesarias.",
    ventajas: [
      "Tratamiento de infecciones internas",
      "Eliminación efectiva del dolor dental",
      "Conservación de la pieza natural",
      "Tecnología rotatoria para mayor rapidez"
    ],
    image: "https://www.cirbdental.com.mx/wp-content/uploads/2019/05/Endodoncia-tratamiento-1024x576.jpg"
  },
  periodoncia: {
    title: "Periodoncia",
    subtitle: "Salva tus Encías",
    fullDesc: "Tratamos las enfermedades que afectan el soporte de tus dientes. Unas encías sanas son el cimiento de una boca saludable.",
    ventajas: [
      "Tratamiento de gingivitis y periodontitis",
      "Cirugías menores de regeneración tisular",
      "Limpiezas profundas (raspado y alisado)",
      "Prevención de la pérdida dental"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGraC-MRdItQf6J2WTW5T4A5VQO2_k9oU57Q&s"
  },
  odontopediatria: {
    title: "Odontopediatría",
    subtitle: "Primeras Sonrisas",
    fullDesc: "Cuidado especializado para los más pequeños en un ambiente diseñado para que pierdan el miedo al dentista desde el primer día.",
    ventajas: [
      "Educación en hábitos de higiene infantil",
      "Prevención y tratamiento de caries de leche",
      "Selladores de fosetas y fisuras",
      "Ambiente lúdico y de confianza"
    ],
    image: "https://simonblas.com/wp-content/uploads/2021/06/Portada-Prevencio%CC%81n-en-Odontopediatria.png"
  },
  estetica: {
    title: "Estética Dental",
    subtitle: "Diseño de Sonrisa",
    fullDesc: "Combinamos ciencia y arte para crear la sonrisa que siempre proyectaste. Resultados naturales y armónicos.",
    ventajas: [
      "Blanqueamiento dental profesional",
      "Diseño de sonrisa digital",
      "Carillas de alta estética",
      "Rehabilitación estética integral"
    ],
    image: "https://estudidentalbarcelona.com/wp-content/uploads/2020/01/shutterstock_539034556.jpg"
  },
  cirugia: {
    title: "Cirugía Oral e Implantes",
    subtitle: "Restauración Total",
    fullDesc: "Procedimientos quirúrgicos precisos para recuperar piezas perdidas o corregir problemas estructurales en la mandíbula.",
    ventajas: [
      "Colocación de implantes dentales",
      "Extracción de muelas del juicio",
      "Cirugía de encías y mandíbula",
      "Sedación consciente disponible"
    ],
    image: "https://www.westcoastdental.com/wp-content/uploads/2021/03/What-Is-Oral-Surgery_-portrait.jpg"
  }
};

function ServiceDetail() {
  const { id } = useParams();
  const service = infoServicios[id];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!service) {
    return (
      <div style={{...styles.errorContainer, padding: isMobile ? "80px 20px" : "150px"}}>
        <h2>Servicio no encontrado</h2>
        <Link to="/" style={styles.backButton}>Regresar al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.pageContainer,
      padding: isMobile ? "90px 4% 40px 4%" : "120px 5% 60px 5%"
    }}>
      
      <div style={styles.glow} />

      <div style={styles.contentWrapper}>
        <Link to="/" style={styles.backButton} className="back-btn-hover">
          <span>←</span> Volver a Especialidades
        </Link>

        <div style={{
          ...styles.mainGrid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(450px, 1fr))",
          gap: isMobile ? "30px" : "60px"
        }}>
          
          {/* LATERAL VISUAL (IMAGEN) */}
          <div style={styles.visualSide}>
            <div style={{
              ...styles.imageContainer,
              height: isMobile ? "clamp(280px, 45vh, 400px)" : "550px",
              borderRadius: isMobile ? "24px" : "40px"
            }}>
              <img src={service.image} alt={service.title} style={styles.image} />
              <div style={{
                ...styles.imageBadge,
                top: isMobile ? "15px" : "30px",
                right: isMobile ? "15px" : "30px",
                padding: isMobile ? "6px 14px" : "10px 20px",
                fontSize: isMobile ? "0.7rem" : "0.8rem"
              }}>
                {service.subtitle}
              </div>
            </div>
          </div>

          {/* LATERAL DE DETALLES (TARJETA) */}
          <div style={styles.infoSide}>
            <div style={{
              ...styles.card,
              padding: isMobile ? "24px" : "50px",
              borderRadius: isMobile ? "24px" : "32px"
            }}>
              <h1 style={styles.title}>{service.title}</h1>
              <div style={styles.accent} />
              <p style={{
                ...styles.description,
                fontSize: isMobile ? "1.05rem" : "1.2rem",
                lineHeight: isMobile ? "1.6" : "1.8"
              }}>{service.fullDesc}</p>
              
              <h3 style={styles.sectionLabel}>Lo que incluye este servicio:</h3>
              <div style={styles.benefitsGrid}>
                {service.ventajas.map((v, i) => (
                  <div key={i} style={styles.benefitItem}>
                    <div style={styles.check}>✓</div>
                    <span style={{ fontSize: isMobile ? "0.95rem" : "1.05rem" }}>{v}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://wa.me/tu_numero" 
                target="_blank" 
                rel="noreferrer" 
                style={{
                  ...styles.cta,
                  padding: isMobile ? "16px" : "20px",
                  fontSize: isMobile ? "1rem" : "1.1rem"
                }}
                className="cta-btn-pulse"
              >
                Agendar Consulta de Valoración
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .back-btn-hover:hover {
          transform: translateX(-5px);
          color: #00b4d8 !important;
        }
        .cta-btn-pulse {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-btn-pulse:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(10, 37, 64, 0.3);
          background-color: #0077b6 !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box"
  },
  glow: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(0, 180, 216, 0.07) 0%, transparent 70%)",
    zIndex: 0
  },
  contentWrapper: {
    maxWidth: "1300px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "#0a2540",
    fontWeight: "700",
    marginBottom: "25px",
    fontSize: "0.9rem",
    transition: "transform 0.2s ease, color 0.2s ease"
  },
  mainGrid: {
    display: "grid",
    alignItems: "start"
  },
  visualSide: {
    position: "relative",
    width: "100%"
  },
  imageContainer: {
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(10, 37, 64, 0.12)",
    position: "relative",
    width: "100%"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  imageBadge: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#0a2540",
    boxShadow: "0 8px 16px rgba(0,0,0,0.08)"
  },
  infoSide: {
    textAlign: "left",
    width: "100%"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    border: "1px solid #f0f4f8",
    boxShadow: "0 20px 40px rgba(10, 37, 64, 0.04)"
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 3rem)",
    fontWeight: "900",
    color: "#0a2540",
    lineHeight: "1.15",
    marginBottom: "15px",
    letterSpacing: "-1px"
  },
  accent: {
    width: "60px",
    height: "4px",
    backgroundColor: "#00b4d8",
    borderRadius: "10px",
    marginBottom: "25px"
  },
  description: {
    color: "#52606d",
    marginBottom: "30px"
  },
  sectionLabel: {
    fontSize: "1rem",
    fontWeight: "800",
    color: "#0a2540",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  benefitsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "35px"
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#52606d",
    fontWeight: "500",
    lineHeight: "1.4"
  },
  check: {
    width: "22px",
    height: "22px",
    backgroundColor: "rgba(0, 180, 216, 0.1)",
    color: "#00b4d8",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "900",
    flexShrink: 0
  },
  cta: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#0a2540",
    color: "#ffffff",
    borderRadius: "16px",
    textDecoration: "none",
    fontWeight: "700",
    boxShadow: "0 8px 20px rgba(10, 37, 64, 0.15)",
    boxSizing: "border-box"
  },
  errorContainer: {
    textAlign: "center",
    fontFamily: "sans-serif"
  }
};

export default ServiceDetail;