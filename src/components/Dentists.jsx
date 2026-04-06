import React from 'react';

function Dentists() {
  const team = [
    {
      name: "Dr. Juan Pérez",
      role: "Ortodoncista",
      specialty: "Diseño de Sonrisas",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    {
      name: "Dra. María López",
      role: "Endodoncista",
      specialty: "Microscopía Dental",
      img: "https://images.unsplash.com/photo-1594824388853-d0c0b5c7b5e5"
    },
    {
      name: "Dr. Carlos Ramírez",
      role: "Implantólogo",
      specialty: "Cirugía Guiada",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    }
  ];

  return (
    <section id="nosotros" style={styles.container}>
      {/* Elementos decorativos sutiles de fondo (formas orgánicas y limpias) */}
      <div style={styles.burbuja1}></div>
      <div style={styles.burbuja2}></div>
      
      <div style={styles.layout}>
        {/* COLUMNA IZQUIERDA: TEXTO Y PROPUESTA DE VALOR */}
        <div style={styles.heroContent}>
          <div style={styles.lineaAcento}></div>
          <span style={styles.subtitle}>Excelencia Clínica</span>
          <h2 style={styles.title}>
            Liderando el futuro de tu <span style={styles.highlight}>salud bucal</span>
          </h2>
          <p style={styles.text}>
            Combinamos la calidez humana con la odontología de vanguardia. Nuestro equipo
            de especialistas certificados se dedica a diseñar tratamientos integrales que
            devuelven la función y la estética, garantizando una experiencia segura y confortable.
          </p>
          
          <div style={styles.features}>
            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div>
                <h4 style={styles.featureTitle}>Diagnóstico Preciso</h4>
                <p style={styles.featureText}>Tecnología digital de última generación.</p>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <div>
                <h4 style={styles.featureTitle}>Cuidado Paciente-Céntrico</h4>
                <p style={styles.featureText}>Tu comodidad y bienestar son prioridad.</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TARJETAS DE ESPECIALISTAS (ESTILO FLOTANTE LIMPIO) */}
        <div style={styles.teamGrid}>
          {team.map((doc, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                transform: i === 1 ? "translateY(30px)" : "translateY(0)" // Desfase elegante
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = i === 1 ? "translateY(15px) scale(1.02)" : "translateY(-15px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,119,182,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = i === 1 ? "translateY(30px) scale(1)" : "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
              }}
            >
              <img src={doc.img} style={styles.image} alt={doc.name} />
              <div style={styles.cardInfo}>
                <h3 style={styles.cardName}>{doc.name}</h3>
                <p style={styles.cardRole}>{doc.role}</p>
                <div style={styles.divider}></div>
                <p style={styles.cardSpecialty}>{doc.specialty}</p>
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
    padding: "120px 5%",
    background: "#fdfeff", // Blanco casi puro, sensación de limpieza
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },

  // Formas de fondo suaves y orgánicas (no geométricas/tecnológicas)
  burbuja1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(144, 224, 239, 0.2)", // Azul cian muy suave
    borderRadius: "50%",
    top: "-100px",
    left: "-100px",
    filter: "blur(80px)",
    zIndex: 0
  },

  burbuja2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(0, 119, 182, 0.08)", // Azul clínico sutil
    borderRadius: "50%",
    bottom: "10%",
    right: "5%",
    filter: "blur(60px)",
    zIndex: 0
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
    gap: "80px",
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    zIndex: 1,
    alignItems: "center"
  },

  heroContent: {
    textAlign: "left",
    position: "relative"
  },

  lineaAcento: {
    width: "60px",
    height: "4px",
    background: "#0077b6", // Azul principal
    borderRadius: "2px",
    marginBottom: "15px"
  },

  subtitle: {
    color: "#0077b6",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1.5px"
  },

  title: {
    fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
    fontWeight: "800",
    lineHeight: "1.15",
    margin: "15px 0 25px 0",
    color: "#023e8a" // Azul marino oscuro profesional
  },

  highlight: {
    color: "#00b4d8", // Azul más claro para énfasis
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#52606d", // Gris suave, no negro
    marginBottom: "45px",
    maxWidth: "550px"
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.03)"
  },

  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(0, 180, 216, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },

  featureTitle: {
    margin: "0 0 2px 0",
    fontSize: "17px",
    color: "#023e8a",
    fontWeight: "600"
  },

  featureText: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280"
  },

  teamGrid: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    paddingTop: "40px" // Espacio para el efecto hover superior
  },

  card: {
    background: "#ffffff",
    borderRadius: "24px",
    width: "230px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "all 0.5s ease",
    border: "1px solid rgba(0,0,0,0.03)",
    overflow: "hidden", // Importante para que la imagen respete los bordes
    cursor: "pointer",
    flexShrink: 0
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
  },

  cardInfo: {
    padding: "20px",
    textAlign: "left",
    background: "#fff",
    position: "relative"
  },

  cardName: {
    color: "#023e8a",
    fontSize: "18px",
    margin: "0 0 4px 0",
    fontWeight: "700"
  },

  cardRole: {
    color: "#0077b6",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "12px 0"
  },

  cardSpecialty: {
    color: "#6b7280",
    fontSize: "13px",
    margin: 0,
    fontStyle: "italic"
  }
};

export default Dentists;