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
      img: "https://images.unsplash.com/photo-1594824388853-d0c0b5c7b5e5"
    },
    {
      name: "Dr. Carlos Ramírez",
      role: "Implantólogo",
      specialty: "Cirugía Guiada",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    }
  ];

  // Detector de pantalla móvil en tiempo real
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="nosotros" style={{
      ...styles.container,
      padding: isMobile ? "60px 16px" : "120px 5%"
    }}>
      <div style={styles.burbuja1}></div>
      <div style={styles.burbuja2}></div>
      
      <div style={styles.wrapper}>
        <div style={{
          ...styles.layout,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "50px"
        }}>
          
          {/* COLUMNA: TEXTO E INTRODUCCIÓN */}
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
              marginBottom: isMobile ? "30px" : "40px"
            }}>
              Combinamos la calidez humana con la odontología de vanguardia. Nuestro equipo
              de especialistas garantiza una experiencia segura y confortable.
            </p>
            
            <div style={styles.features}>
              <div style={styles.featureItem} className="feature-card">
                <div style={styles.iconCircle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={styles.featureTitle}>Diagnóstico Preciso</h4>
                  <p style={styles.featureText}>Tecnología digital de última generación.</p>
                </div>
              </div>
              <div style={styles.featureItem} className="feature-card">
                <div style={styles.iconCircle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4 style={styles.featureTitle}>Cuidado Paciente-Céntrico</h4>
                  <p style={styles.featureText}>Tu bienestar es nuestra prioridad real.</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA: TARJETAS DEL EQUIPO */}
          <div style={{
            ...styles.teamGrid,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "stretch",
            justifyContent: isMobile ? "center" : "flex-end",
            gap: isMobile ? "24px" : "20px"
          }}>
            {team.map((doc, i) => (
              <div
                key={i}
                className="dentist-card"
                style={{
                  ...styles.card,
                  width: isMobile ? "100%" : "240px",
                  maxWidth: isMobile ? "320px" : "none",
                  transform: (!isMobile && i === 1) ? "translateY(30px)" : "translateY(0)" 
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

      <style>{`
        .dentist-card {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dentist-card:hover {
          box-shadow: 0 40px 70px rgba(1, 42, 74, 0.12) !important;
          border-color: #00b4d8 !important;
          background: #ffffff !important;
          transform: ${isMobile ? "translateY(-8px) !important" : "translateY(-10px) !important"};
        }
        .dentist-card:hover .dentist-img { transform: scale(1.08); }
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { transform: translateX(${isMobile ? "0px" : "8px"}); background: #fff !important; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
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
    fontSize: "0.88rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "2.5px"
  },
  title: {
    fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
    fontWeight: "900",
    lineHeight: "1.15",
    margin: "12px 0 22px 0",
    color: "#012a4a",
    letterSpacing: "-1px"
  },
  highlight: { color: "#00b4d8" },
  text: {
    fontSize: "1.05rem",
    lineHeight: "1.65",
    color: "#475569", 
    fontWeight: "500"
  },
  features: { display: "flex", flexDirection: "column", gap: "14px" },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    background: "rgba(255,255,255,0.75)",
    padding: "18px",
    borderRadius: "20px",
    border: "1px solid rgba(0, 180, 216, 0.08)",
    boxSizing: "border-box"
  },
  iconCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "rgba(0, 180, 216, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  featureTitle: { margin: "0 0 4px 0", fontSize: "1.05rem", color: "#012a4a", fontWeight: "800" },
  featureText: { margin: 0, fontSize: "0.92rem", color: "#64748b", lineHeight: "1.4" },
  teamGrid: {
    display: "flex",
    boxSizing: "border-box",
    width: "100%"
  },
  card: {
    background: "#ffffff",
    borderRadius: "28px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0, 180, 216, 0.08)",
    overflow: "hidden",
    flexShrink: 0,
    boxSizing: "border-box"
  },
  imageWrapper: { height: "270px", overflow: "hidden", background: "#f1f5f9" },
  image: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
  cardInfo: { padding: "22px 16px", textAlign: "center" },
  cardName: { color: "#012a4a", fontSize: "1.18rem", margin: "0 0 4px 0", fontWeight: "900" },
  cardRole: { color: "#00b4d8", fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" },
  divider: { height: "2px", background: "rgba(0, 180, 216, 0.1)", margin: "12px auto", width: "25px" },
  cardSpecialty: { color: "#64748b", fontSize: "0.85rem", fontWeight: "600" }
};

export default Dentists;