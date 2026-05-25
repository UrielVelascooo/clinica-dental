// src/components/Dentists.jsx
import React, { useState, useEffect } from 'react';

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
      img: "https://objects-mx.cdn-topdoctors.com/provider/665475/image/profile/small/adela-zamudio-ortiz-1742571173"
    },
    {
      name: "Dr. Carlos Ramírez",
      role: "Implantólogo",
      specialty: "Cirugía Guiada",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    }
  ];

  // Detector de pantalla móvil para reordenación y consistencia de diseño
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="nosotros" style={{
      ...styles.container,
      padding: isMobile ? "60px 20px" : "120px 5%"
    }}>
      {/* Fondos estéticos desenfocados (Premium UX) */}
      <div style={styles.burbuja1}></div>
      <div style={styles.burbuja2}></div>
      
      <div style={styles.wrapper}>

        {/* 1. SECCIÓN DE INTRODUCCIÓN GENERAL */}
        <div style={{
          ...styles.introHeader,
          marginBottom: isMobile ? "45px" : "70px"
        }}>
          <span style={styles.introSubtitle}>Nuestra Esencia</span>
          <h1 style={styles.introTitle}>
            Un espacio creado para <span style={styles.highlight}>transformar</span> tu experiencia dental
          </h1>
          <p style={{
            ...styles.introText,
            fontSize: isMobile ? "1.02rem" : "1.15rem",
            lineHeight: isMobile ? "1.6" : "1.7"
          }}>
            En <strong>Dental ITIZ </strong>, somos una clínica especializada en odontología de alta especialidad y diseño de sonrisas. Nos dedicamos a fusionar el arte de la estética dental con la precisión científica más avanzada, ofreciendo tratamientos personalizados que priorizan tu confort, salud y confianza en un entorno exclusivamente premium.
          </p>
          <div style={styles.introDivider}></div>
        </div>
        
        {/* 2. BLOQUE ORDENADO DE MISIÓN Y VISIÓN (REACTIVO) */}
        <div style={{
          ...styles.mvContainer,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "24px" : "40px",
          marginBottom: isMobile ? "70px" : "100px"
        }}>
          <div style={{ 
            ...styles.mvCard, 
            width: isMobile ? "100%" : "50%",
            padding: isMobile ? "28px 24px" : "36px 30px",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left"
          }} className="mv-card">
            <div style={styles.mvIconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 style={styles.mvTitle}>Nuestra Misión</h3>
            <p style={styles.mvText}>
              Brindar servicios odontológicos integrales con los más altos estándares de calidad y tecnología, 
              garantizando tratamientos precisos en un ambiente cálido que devuelva la confianza y bienestar 
              a cada sonrisa.
            </p>
          </div>

          <div style={{ 
            ...styles.mvCard, 
            width: isMobile ? "100%" : "50%",
            padding: isMobile ? "28px 24px" : "36px 30px",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left"
          }} className="mv-card">
            <div style={styles.mvIconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 style={styles.mvTitle}>Nuestra Visión</h3>
            <p style={styles.mvText}>
              Ser la clínica dental líder y de referencia en salud bucodental premium, reconocida por la 
              innovación constante de nuestros procesos quirúrgicos, excelencia clínica y el trato humano 
              excepcional de nuestro equipo.
            </p>
          </div>
        </div>

        {/* 3. SECCIÓN INFERIOR: DETALLES CLÍNICOS Y PRESENTACIÓN DE MÉDICOS */}
        <div style={{
          ...styles.layout,
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? "50px" : "60px"
        }}>
          
          {/* COLUMNA A: TEXTO DE PROPUESTA DE VALOR */}
          <div style={{
            ...styles.heroContent,
            textAlign: isMobile ? "center" : "left"
          }}>
            <div style={{
              ...styles.lineaAcento,
              margin: isMobile ? "0 auto 20px auto" : "0 0 20px 0"
            }}></div>
            <span style={styles.subtitle}>Excelencia Clínica</span>
            <h2 style={styles.title}>
              Liderando el futuro de tu <span style={styles.highlight}>salud bucal</span>
            </h2>
            <p style={{
              ...styles.text,
              marginBottom: isMobile ? "35px" : "45px"
            }}>
              Combinamos la calidez humana con la odontología de vanguardia. Nuestro equipo
              de especialistas garantiza una experiencia segura, ordenada y confortable.
            </p>
            
            {/* Contenedor de ventajas clave */}
            <div style={styles.features}>
              <div style={{
                ...styles.featureItem,
                flexDirection: isMobile ? "column" : "row",
                textAlign: isMobile ? "center" : "left"
              }} className="feature-card">
                <div style={styles.iconCircle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h4 style={styles.featureTitle}>Diagnóstico Preciso</h4>
                  <p style={styles.featureText}>Tecnología digital de última generación.</p>
                </div>
              </div>
              
              <div style={{
                ...styles.featureItem,
                flexDirection: isMobile ? "column" : "row",
                textAlign: isMobile ? "center" : "left"
              }} className="feature-card">
                <div style={styles.iconCircle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <div>
                  <h4 style={styles.featureTitle}>Cuidado Paciente-Céntrico</h4>
                  <p style={styles.featureText}>Tu bienestar es nuestra prioridad real.</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA B: GRILLA DEL EQUIPO DE ODONTÓLOGOS */}
          <div style={{
            ...styles.teamGrid,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "stretch",
            justifyContent: isMobile ? "center" : "flex-end",
            gap: isMobile ? "30px" : "20px"
          }}>
            {team.map((doc, i) => (
              <div
                key={i}
                className="dentist-card"
                style={{
                  ...styles.card,
                  width: isMobile ? "100%" : "230px",
                  maxWidth: isMobile ? "350px" : "none",
                  // Desplazamiento premium asimétrico solo activo en computadoras
                  transform: (!isMobile && i === 1) ? "translateY(35px)" : "translateY(0)" 
                }}
              >
                <div style={styles.imageWrapper}>
                  <img src={doc.img} style={styles.image} alt={doc.name} className="dentist-img" />
                  <div className="img-overlay"></div>
                </div>
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
      </div>

      {/* Control de Transiciones e Interacciones Premium */}
      <style>{`
        .dentist-card {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dentist-card:hover {
          box-shadow: 0 40px 70px rgba(1, 42, 74, 0.12) !important;
          border-color: #00b4d8 !important;
          background: #ffffff !important;
          transform: ${isMobile ? "translateY(-6px) !important" : "translateY(20px) !important"}; /* Adaptado al desfase vertical original en desktop */
        }
        .dentist-card:hover .dentist-img { transform: scale(1.06); }
        
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { 
          transform: ${isMobile ? "translateY(-3px)" : "translateX(8px)"}; 
          background: #fff !important; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.03); 
        }
        
        .mv-card { transition: all 0.4s ease; }
        .mv-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 25px 50px rgba(0, 119, 182, 0.08); 
          border-color: rgba(0, 180, 216, 0.3) !important; 
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    background: "#f8fbfd", 
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box"
  },
  burbuja1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(144, 224, 239, 0.12)",
    borderRadius: "50%",
    top: "10%",
    right: "-100px",
    filter: "blur(100px)",
    zIndex: 0
  },
  burbuja2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(0, 119, 182, 0.05)",
    borderRadius: "50%",
    bottom: "-50px",
    left: "-100px",
    filter: "blur(90px)",
    zIndex: 0
  },
  wrapper: {
    maxWidth: "1300px", 
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box"
  },
  introHeader: {
    textAlign: "center",
    maxWidth: "850px",
    margin: "0 auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  introSubtitle: {
    color: "#0077b6",
    fontSize: "0.85rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "3.5px",
    marginBottom: "14px"
  },
  introTitle: {
    fontSize: "clamp(1.9rem, 4.2vw, 2.8rem)",
    fontWeight: "900",
    lineHeight: "1.25",
    color: "#012a4a",
    margin: "0 0 22px 0",
    letterSpacing: "-0.8px"
  },
  introText: {
    color: "#475569",
    fontWeight: "500",
    margin: "0 0 35px 0"
  },
  introDivider: {
    width: "60px",
    height: "3px",
    background: "rgba(0, 180, 216, 0.25)",
    borderRadius: "10px"
  },
  mvContainer: {
    display: "flex",
    width: "100%",
    boxSizing: "border-box"
  },
  mvCard: {
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(0, 180, 216, 0.12)",
    borderRadius: "24px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.01)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column"
  },
  mvIconCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "rgba(0, 180, 216, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
    flexShrink: 0
  },
  mvTitle: {
    fontSize: "1.35rem",
    fontWeight: "800",
    color: "#012a4a",
    margin: "0 0 12px 0",
    letterSpacing: "-0.5px"
  },
  mvText: {
    fontSize: "0.96rem",
    lineHeight: "1.65",
    color: "#475569",
    margin: 0,
    fontWeight: "500"
  },
  layout: {
    display: "grid",
    alignItems: "center",
    boxSizing: "border-box"
  },
  heroContent: { boxSizing: "border-box" },
  lineaAcento: {
    width: "70px",
    height: "5px",
    background: "#00b4d8", 
    borderRadius: "10px"
  },
  subtitle: {
    color: "#0077b6",
    fontSize: "0.85rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "2.5px"
  },
  title: {
    fontSize: "clamp(2rem, 4.5vw, 3rem)",
    fontWeight: "900",
    lineHeight: "1.2",
    margin: "12px 0 24px 0",
    color: "#012a4a",
    letterSpacing: "-1px"
  },
  highlight: { color: "#00b4d8" },
  text: {
    fontSize: "1.02rem",
    lineHeight: "1.65",
    color: "#475569", 
    fontWeight: "500"
  },
  features: { display: "flex", flexDirection: "column", gap: "16px" },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    background: "rgba(255,255,255,0.8)",
    padding: "20px",
    borderRadius: "22px",
    border: "1px solid rgba(0, 180, 216, 0.08)",
    boxSizing: "border-box"
  },
  iconCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "rgba(0, 180, 216, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginBottom: "4px"
  },
  featureTitle: { margin: "0 0 6px 0", fontSize: "1.05rem", color: "#012a4a", fontWeight: "800" },
  featureText: { margin: 0, fontSize: "0.92rem", color: "#64748b", lineHeight: "1.45" },
  teamGrid: {
    display: "flex",
    boxSizing: "border-box",
    width: "100%"
  },
  card: {
    background: "#ffffff",
    borderRadius: "28px",
    boxShadow: "0 12px 45px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0, 180, 216, 0.06)",
    overflow: "hidden",
    flexShrink: 0,
    boxSizing: "border-box"
  },
  imageWrapper: { height: "280px", overflow: "hidden", background: "#f1f5f9" },
  image: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" },
  cardInfo: { padding: "24px 18px", textAlign: "center" },
  cardName: { color: "#012a4a", fontSize: "1.2rem", margin: "0 0 4px 0", fontWeight: "900" },
  cardRole: { color: "#00b4d8", fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.6px" },
  divider: { height: "2px", background: "rgba(0, 180, 216, 0.15)", margin: "14px auto", width: "25px" },
  cardSpecialty: { color: "#64748b", fontSize: "0.85rem", fontWeight: "600" }
};

export default Dentists;