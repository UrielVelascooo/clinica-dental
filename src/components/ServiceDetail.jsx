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
    subtitle: "Salud de Encías",
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

  if (!service) {
    return (
      <div style={styles.errorContainer}>
        <h2>Servicio no encontrado</h2>
        <Link to="/" style={styles.backButton}>Regresar al inicio</Link>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      
      <div style={styles.glow} />

      <div style={styles.contentWrapper}>
        <Link to="/" style={styles.backButton}>
          <span>←</span> Volver a Especialidades
        </Link>

        <div style={styles.mainGrid}>
          
          <div style={styles.visualSide}>
            <div style={styles.imageContainer}>
              <img src={service.image} alt={service.title} style={styles.image} />
              <div style={styles.imageBadge}>{service.subtitle}</div>
            </div>
          </div>

          
          <div style={styles.infoSide}>
            <div style={styles.card}>
              <h1 style={styles.title}>{service.title}</h1>
              <div style={styles.accent} />
              <p style={styles.description}>{service.fullDesc}</p>
              
              <h3 style={styles.sectionLabel}>Lo que incluye este servicio:</h3>
              <div style={styles.benefitsGrid}>
                {service.ventajas.map((v, i) => (
                  <div key={i} style={styles.benefitItem}>
                    <div style={styles.check}>✓</div>
                    <span>{v}</span>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/tu_numero" target="_blank" rel="noreferrer" style={styles.cta}>
                Agendar Consulta de Valoración
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "120px 5% 60px 5%",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
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
    marginBottom: "40px",
    fontSize: "0.9rem",
    transition: "transform 0.2s ease"
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "60px",
    alignItems: "start"
  },
  visualSide: {
    position: "relative"
  },
  imageContainer: {
    borderRadius: "40px",
    overflow: "hidden",
    boxShadow: "0 30px 60px rgba(10, 37, 64, 0.15)",
    height: "550px",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  imageBadge: {
    position: "absolute",
    top: "30px",
    right: "30px",
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    borderRadius: "15px",
    fontWeight: "800",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#0a2540",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },
  infoSide: {
    textAlign: "left"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    padding: "50px",
    borderRadius: "32px",
    border: "1px solid #f0f4f8",
    boxShadow: "0 20px 40px rgba(10, 37, 64, 0.05)"
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    fontWeight: "900",
    color: "#0a2540",
    lineHeight: "1.1",
    marginBottom: "20px",
    letterSpacing: "-2px"
  },
  accent: {
    width: "70px",
    height: "5px",
    backgroundColor: "#00b4d8",
    borderRadius: "10px",
    marginBottom: "35px"
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#52606d",
    marginBottom: "40px"
  },
  sectionLabel: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#0a2540",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  benefitsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "50px"
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "1.05rem",
    color: "#52606d",
    fontWeight: "500"
  },
  check: {
    width: "24px",
    height: "24px",
    backgroundColor: "rgba(0, 180, 216, 0.1)",
    color: "#00b4d8",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    fontWeight: "900"
  },
  cta: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#0a2540",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "18px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    boxShadow: "0 10px 25px rgba(10, 37, 64, 0.2)",
    transition: "transform 0.3s ease"
  },
  errorContainer: {
    padding: "150px",
    textAlign: "center",
    fontFamily: "sans-serif"
  }
};

export default ServiceDetail;