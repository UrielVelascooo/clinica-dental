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
      <div style={styles.burbuja1}></div>
      <div style={styles.burbuja2}></div>
      
      <div style={styles.wrapper}>
        <div style={styles.layout}>
          
          <div style={styles.heroContent}>
            <div style={styles.lineaAcento}></div>
            <span style={styles.subtitle}>Excelencia Clínica</span>
            <h2 style={styles.title}>
              Liderando el futuro de tu <span style={styles.highlight}>salud bucal</span>
            </h2>
            <p style={styles.text}>
              Combinamos la calidez humana con la odontología de vanguardia. Nuestro equipo
              de especialistas garantiza una experiencia segura y confortable.
            </p>
            
            <div style={styles.features}>
              <div style={styles.featureItem} className="feature-card">
                <div style={styles.iconCircle}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h4 style={styles.featureTitle}>Diagnóstico Preciso</h4>
                  <p style={styles.featureText}>Tecnología digital de última generación.</p>
                </div>
              </div>
              <div style={styles.featureItem} className="feature-card">
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

         
          <div style={styles.teamGrid} className="team-grid-container">
            {team.map((doc, i) => (
              <div
                key={i}
                className="dentist-card"
                style={{
                  ...styles.card,
                  transform: i === 1 ? "translateY(30px)" : "translateY(0)" 
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
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dentist-card:hover {
          box-shadow: 0 40px 70px rgba(1, 42, 74, 0.15) !important;
          border-color: #00b4d8 !important;
          background: #ffffff !important;
          transform: translateY(-10px) !important;
        }
        .dentist-card:hover .dentist-img { transform: scale(1.1); }
        .feature-card:hover { transform: translateX(10px); background: #fff !important; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        
        @media (max-width: 1100px) {
          .team-grid-container { flex-wrap: wrap; margin-top: 40px; }
          .dentist-card { width: 100% !important; max-width: 300px; transform: none !important; }
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    padding: "120px 5%",
    background: "#f8fbfd", 
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  wrapper: {
    maxWidth: "1300px", 
    margin: "0 auto",
    position: "relative",
    zIndex: 1
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", 
    gap: "50px",
    alignItems: "center"
  },
  heroContent: { textAlign: "left" },
  lineaAcento: {
    width: "80px",
    height: "6px",
    background: "#00b4d8", 
    borderRadius: "10px",
    marginBottom: "20px"
  },
  subtitle: {
    color: "#0077b6",
    fontSize: "0.9rem",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "3px"
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: "15px 0 25px 0",
    color: "#012a4a",
    letterSpacing: "-1px"
  },
  highlight: { color: "#00b4d8" },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#475569", 
    marginBottom: "40px",
    fontWeight: "500"
  },
  features: { display: "flex", flexDirection: "column", gap: "15px" },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "rgba(255,255,255,0.7)",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid rgba(0, 180, 216, 0.1)"
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "15px",
    background: "rgba(0, 180, 216, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  featureTitle: { margin: "0", fontSize: "1.1rem", color: "#012a4a", fontWeight: "800" },
  featureText: { margin: 0, fontSize: "0.95rem", color: "#64748b" },
  teamGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end" 
  },
  card: {
    background: "#ffffff",
    borderRadius: "30px",
    width: "240px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0, 180, 216, 0.1)",
    overflow: "hidden",
    flexShrink: 0
  },
  imageWrapper: { height: "260px", overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" },
  cardInfo: { padding: "20px", textAlign: "center" },
  cardName: { color: "#012a4a", fontSize: "1.2rem", margin: "0 0 5px 0", fontWeight: "900" },
  cardRole: { color: "#00b4d8", fontSize: "0.9rem", fontWeight: "800", textTransform: "uppercase" },
  divider: { height: "2px", background: "rgba(0, 180, 216, 0.1)", margin: "12px auto", width: "30px" },
  cardSpecialty: { color: "#64748b", fontSize: "0.85rem", fontWeight: "600" }
};

export default Dentists;