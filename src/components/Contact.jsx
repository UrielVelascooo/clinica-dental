import React from "react";

function Contact() {
  return (
    <section id="contacto" style={styles.container}>
      
      <div style={styles.burbuja1}></div>

      <div style={styles.header}>
        <div style={styles.lineaAcento}></div>
        <span style={styles.miniSubtitle}>Ubicación y Contacto</span>
        <h2 style={styles.mainTitle}>Visítanos en nuestra <span style={styles.highlight}>clínica</span></h2>
      </div>

      <div style={styles.wrapper}>
        
       
        <div style={styles.infoCardMain}>
          <h3 style={styles.infoTitle}>Información de contacto</h3>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📍</span>
            <p style={styles.infoText}>Av Telecomunicaciones, Chinam Pac de Juárez, Iztapalapa, 09208 Ciudad de México, CDMX</p>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📞</span>
            <p style={styles.infoText}>55 1234 5678</p>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}>📧</span>
            <p style={styles.infoText}>contacto@clinica.com</p>
          </div>

          <div style={styles.socialWrapper}>
            <p style={styles.socialLabel}>Síguenos para más consejos</p>
            <div style={styles.socialLinks}>
              <a href="https://www.instagram.com/TU_USUARIO" target="_blank" rel="noreferrer" style={styles.socialIcon} className="insta-hover">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/TU_PAGINA" target="_blank" rel="noreferrer" style={styles.socialIcon} className="face-hover">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@TU_USUARIO" target="_blank" rel="noreferrer" style={styles.socialIcon} className="tok-hover">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      
        <div style={styles.scheduleCardMain}>
          <h3 style={styles.infoTitle}>Horarios de atención</h3>
          <div style={styles.scheduleRow}>
            <span>Lunes - Viernes</span>
            <span style={styles.timeBadge}>9:00 AM - 7:00 PM</span>
          </div>
          <div style={styles.scheduleRow}>
            <span>Sábado</span>
            <span style={styles.timeBadge}>9:00 AM - 2:00 PM</span>
          </div>
          <p style={styles.scheduleNote}>* Previa cita para una mejor atención.</p>
        </div>

      </div>

     
      <div style={styles.mapSection}>
        <div style={styles.mapOverlay}>Dental Velasco — Ubicación</div>
        <iframe
          title="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.7421416600864!2d-99.05548712406544!3d19.38031478188792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fd0614558e4b%3A0x3760847a107a0b9f!2sTecNM%20%7C%20Tecnol%C3%B3gico%20Nacional%20de%20M%C3%A9xico%20Campus%20Iztapalapa!5e0!3m2!1ses-419!2smx!4v1775537153095!5m2!1ses-419!2smx" 
          style={styles.map}
          loading="lazy"
        ></iframe>
      </div>

      <style>{`
        .insta-hover:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%) !important; color: white !important; transform: translateY(-5px); border-color: transparent !important; }
        .face-hover:hover { background: #1877F2 !important; color: white !important; transform: translateY(-5px); border-color: transparent !important; }
        .tok-hover:hover { background: #000000 !important; color: white !important; transform: translateY(-5px); border-color: transparent !important; }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 5%",
    background: "#fdfeff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  burbuja1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(144, 224, 239, 0.15)",
    borderRadius: "50%",
    top: "10%",
    right: "-100px",
    filter: "blur(100px)",
    zIndex: 0
  },
  header: {
    maxWidth: "1200px",
    margin: "0 auto 60px auto",
    textAlign: "center",
    zIndex: 1,
    position: "relative"
  },
  lineaAcento: {
    width: "50px",
    height: "4px",
    background: "#00b4d8",
    borderRadius: "2px",
    margin: "0 auto 15px auto"
  },
  miniSubtitle: {
    color: "#0077b6",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "2px"
  },
  mainTitle: {
    fontSize: "2.8rem",
    color: "#023e8a",
    fontWeight: "800",
    marginTop: "10px"
  },
  highlight: {
    color: "#00b4d8"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    maxWidth: "1100px",
    margin: "0 auto 80px auto",
    zIndex: 1,
    position: "relative"
  },
  infoCardMain: {
    flex: "1 1 450px",
    background: "white",
    padding: "45px",
    borderRadius: "30px",
    boxShadow: "0 20px 50px rgba(2, 62, 138, 0.05)",
    border: "1px solid rgba(0, 119, 182, 0.05)"
  },
  scheduleCardMain: {
    flex: "1 1 350px",
    background: "linear-gradient(135deg, #023e8a, #0077b6)",
    color: "white",
    padding: "45px",
    borderRadius: "30px",
    boxShadow: "0 20px 40px rgba(2, 62, 138, 0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  infoTitle: {
    fontSize: "1.5rem",
    marginBottom: "30px",
    fontWeight: "800",
    color: "inherit" // Se adapta si es blanco o azul
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "20px"
  },
  icon: {
    fontSize: "20px",
    width: "45px",
    height: "45px",
    background: "rgba(0, 180, 216, 0.1)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    margin: 0,
    color: "#4a5568",
    fontWeight: "500",
    lineHeight: "1.5"
  },
  scheduleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "500"
  },
  timeBadge: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px"
  },
  scheduleNote: {
    marginTop: "20px",
    fontSize: "13px",
    opacity: 0.8,
    fontStyle: "italic"
  },
  socialWrapper: {
    marginTop: "35px",
    paddingTop: "30px",
    borderTop: "1px solid #f1f5f9"
  },
  socialLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    fontWeight: "800",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1.5px"
  },
  socialLinks: {
    display: "flex",
    gap: "15px"
  },
  socialIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#64748b",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "1px solid #e2e8f0"
  },
  mapSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "40px",
    overflow: "hidden",
    boxShadow: "0 30px 60px rgba(2, 62, 138, 0.1)",
    position: "relative",
    border: "8px solid white" 
  },
  mapOverlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "white",
    padding: "12px 24px",
    borderRadius: "15px",
    fontWeight: "800",
    fontSize: "14px",
    color: "#023e8a",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    zIndex: 10
  },
  map: {
    width: "100%",
    height: "500px",
    border: "0"
  }
};

export default Contact;