import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyAppointments() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      if (user) {
        try {
          const q = query(collection(db, "citas"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const docs = [];
          querySnapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
          docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setCitas(docs);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCitas();
  }, [user]);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={styles.topBadge}>Portal Personal</span>
          <h2 style={styles.mainTitle}>Tu Historial <br/><span style={styles.textBlue}>Dental ITIZ </span></h2>
          <p style={styles.subtitle}>Gestiona tus citas con tecnología de vanguardia.</p>
        </header>
        
        {loading ? (
          <div style={styles.loaderContainer}><div className="spinner"></div></div>
        ) : (
          <div style={styles.grid}>
            {citas.length > 0 ? (
              citas.map(cita => {
                const fechaObj = new Date(cita.fecha + "T00:00:00");
                const dia = fechaObj.getDate();
                const mes = fechaObj.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
                const diaSemana = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });

                return (
                  <div key={cita.id} style={styles.card}>
                    <div style={styles.dateSection}>
                      <div style={styles.bigDate}>
                        <span style={styles.dateNum}>{dia}</span>
                        <span style={styles.dateMonth}>{mes}</span>
                      </div>
                      <div style={styles.divider}></div>
                      <div style={styles.timeInfo}>
                        <span style={styles.dayName}>{diaSemana}</span>
                      </div>
                    </div>

                    <div style={styles.mainInfo}>
                      <div style={styles.serviceHeader}>
                        <h3 style={styles.serviceName}>{cita.servicio}</h3>
                        <div style={{
                          ...styles.statusChip,
                          color: cita.estado === 'pendiente' ? '#00b4d8' : '#10b981',
                          boxShadow: cita.estado === 'pendiente' ? '0 0 15px rgba(0, 180, 216, 0.3)' : '0 0 15px rgba(16, 185, 129, 0.3)'
                        }}>
                          {cita.estado || "pendiente"}
                        </div>
                      </div>

                      <div style={styles.detailsRow}>
                        <div style={styles.patientBox}>
                          <span style={styles.label}>PACIENTE</span>
                          <span style={styles.value}>{cita.nombrePaciente}</span>
                        </div>
                        
                        {/* SEDE RESALTADA */}
                        <div style={styles.sedeBox}>
                          <span style={styles.label}>SEDE CLINICA</span>
                          <span style={styles.sedeValue}>🏥 Instituto Tecnológico de Iztapalapa</span>
                        </div>
                      </div>

                      {expandedId === cita.id && (
                        <div style={styles.expandedContent}>
                          <div style={styles.instructionCard}>
                            <h4 style={styles.instrTitle}>Protocolo para tu cita:</h4>
                            <div style={styles.instrGrid}>
                              <div style={styles.instrItem}>
                                <strong>Puntualidad:</strong> Favor de llegar 15 min antes para toma de signos y registro.
                              </div>
                              <div style={styles.instrItem}>
                                <strong>Higiene:</strong> Realizar un cepillado profundo antes de ingresar a clínica.
                              </div>
                              <div style={styles.instrItem}>
                                <strong>Ayuno:</strong> Si tu tratamiento requiere anestesia, evita comidas pesadas 2h antes.
                              </div>
                              <div style={styles.instrItem}>
                                <strong>Acompañantes:</strong> Por protocolos de salud, se permite máximo un acompañante en sala de espera.
                              </div>
                            </div>
                            <p style={styles.instrFooter}>Tratamiento: <strong>{cita.servicio}</strong></p>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => setExpandedId(expandedId === cita.id ? null : cita.id)}
                        style={{
                          ...styles.btnExpand,
                          backgroundColor: expandedId === cita.id ? "#023e8a" : "rgba(2, 62, 138, 0.05)",
                          color: expandedId === cita.id ? "white" : "#023e8a"
                        }}
                      >
                        {expandedId === cita.id ? "Ocultar protocolo" : "Ver indicaciones obligatorias"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyCircle}>🦷</div>
                <h3>¿Listo para tu próxima sonrisa?</h3>
                <Link to="/#citas" style={styles.primaryBtn}>Agendar Cita Ahora</Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spinner {
          width: 40px; height: 40px; border: 4px solid #f3f3f3;
          border-top: 4px solid #00b4d8; border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles = {
  pageWrapper: { padding: "160px 5% 80px", minHeight: "100vh", backgroundColor: "#f8fbff", fontFamily: "'Inter', sans-serif" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "60px" },
  topBadge: { color: "#00b4d8", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" },
  mainTitle: { color: "#023e8a", fontSize: "3.5rem", fontWeight: "900", margin: "10px 0", lineHeight: "1" },
  textBlue: { color: "#00b4d8" },
  subtitle: { color: "#64748b", fontSize: "1.2rem", maxWidth: "500px" },
  grid: { display: "flex", flexDirection: "column", gap: "30px" },
  
  card: {
    display: "flex", backgroundColor: "white", borderRadius: "40px", overflow: "hidden",
    boxShadow: "0 20px 50px rgba(2, 62, 138, 0.06)", border: "1px solid rgba(255, 255, 255, 0.8)",
    animation: "slideUp 0.6s ease forwards", flexWrap: "wrap"
  },
  dateSection: {
    backgroundColor: "#023e8a", color: "white", padding: "40px",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    minWidth: "180px", textAlign: "center"
  },
  bigDate: { display: "flex", flexDirection: "column", lineHeight: "1" },
  dateNum: { fontSize: "4rem", fontWeight: "900" },
  dateMonth: { fontSize: "1.2rem", fontWeight: "700", opacity: 0.8 },
  divider: { width: "30px", height: "4px", backgroundColor: "#00b4d8", margin: "20px 0", borderRadius: "10px" },
  dayName: { textTransform: "capitalize", fontWeight: "600", fontSize: "1rem" },

  mainInfo: { flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "300px" },
  serviceHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px" },
  serviceName: { fontSize: "1.8rem", color: "#023e8a", fontWeight: "800", margin: 0 },
  statusChip: { padding: "8px 18px", borderRadius: "100px", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", backgroundColor: "white", border: "1px solid" },
  
  detailsRow: { display: "flex", gap: "40px", marginBottom: "30px", flexWrap: "wrap" },
  patientBox: { flex: 1 },
  sedeBox: { flex: 2 }, // Más espacio para la sede
  label: { fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase" },
  value: { fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", display: "block", marginTop: "5px" },
  
  // SEDE RESALTADA
  sedeValue: { 
    fontSize: "1.4rem", // Más grande como pediste
    fontWeight: "800", 
    color: "#023e8a", 
    display: "block", 
    marginTop: "5px",
    borderLeft: "4px solid #00b4d8",
    paddingLeft: "15px"
  },

  expandedContent: { marginBottom: "25px", animation: "slideUp 0.3s ease" },
  instructionCard: { backgroundColor: "#f0f9ff", padding: "30px", borderRadius: "30px", border: "1px solid #e0f2fe" },
  instrTitle: { color: "#023e8a", margin: "0 0 20px 0", fontSize: "16px", fontWeight: "900", textTransform: "uppercase" },
  instrGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" },
  instrItem: { fontSize: "14px", color: "#475569", lineHeight: "1.5", backgroundColor: "white", padding: "12px", borderRadius: "15px" },
  instrFooter: { marginTop: "20px", fontSize: "13px", color: "#00b4d8", fontWeight: "700", borderTop: "1px solid #e0f2fe", paddingTop: "15px" },

  btnExpand: { padding: "18px", borderRadius: "20px", border: "none", fontWeight: "800", cursor: "pointer", transition: "all 0.3s" },
  
  emptyState: { textAlign: "center", padding: "100px 20px", backgroundColor: "white", borderRadius: "50px" },
  emptyCircle: { fontSize: "4rem", marginBottom: "20px" },
  primaryBtn: { display: "inline-block", backgroundColor: "#00b4d8", color: "white", padding: "20px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: "800" },
  loaderContainer: { display: "flex", justifyContent: "center", padding: "100px" }
};

export default MyAppointments;