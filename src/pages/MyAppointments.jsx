// src/pages/MisCitas.jsx
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCitas = async () => {
      if (user) {
        try {
          const q = query(collection(db, "citas"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const docs = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            docs.push({ id: doc.id, ...data });
          });

          docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setCitas(docs);
        } catch (error) {
          console.error("Error cargando citas del usuario:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCitas();
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{
      ...styles.pageWrapper,
      padding: isMobile ? "100px 16px 60px" : "140px 20px 80px"
    }}>
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={styles.topBadge}>Portal Personal</span>
          <h2 style={{
            ...styles.mainTitle,
            fontSize: isMobile ? "1.8rem" : "2.5rem"
          }}>Tu Historial <br/><span style={styles.textBlue}>Dental ITIZ </span></h2>
          <p style={styles.subtitle}>Gestiona tus citas con tecnología de vanguardia.</p>
        </header>
        
        {loading ? (
          <div style={styles.loaderContainer}><div className="spinner"></div></div>
        ) : (
          <div style={styles.grid}>
            {citas.length > 0 ? (
              citas.map(cita => {
                const fechaCita = cita.fecha || cita.date || "";
                const fechaObj = fechaCita ? new Date(fechaCita + "T00:00:00") : new Date();
                const dia = fechaObj.getDate() || "--";
                const mes = fechaCita ? fechaObj.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase() : "ND";
                const diaSemana = fechaCita ? fechaObj.toLocaleDateString('es-ES', { weekday: 'long' }) : "Fecha no asignada";

                const estadoReal = (String(cita.estado || '').toLowerCase() === 'cancelada' || String(cita.status || '').toLowerCase() === 'cancelada') 
                  ? 'cancelada' 
                  : (cita.estado || cita.status || 'pendiente');

                let chipColor = '#10b981'; 
                let chipBg = '#f0fdf4';
                let chipShadow = '0 0 15px rgba(16, 185, 129, 0.3)';

                if (estadoReal === 'cancelada') {
                  chipColor = '#ef4444'; 
                  chipBg = '#fef2f2';
                  chipShadow = '0 0 15px rgba(239, 68, 68, 0.3)';
                } else if (estadoReal === 'reprogramada') {
                  chipColor = '#ea580c'; 
                  chipBg = '#ffedd5';
                  chipShadow = '0 0 15px rgba(234, 88, 12, 0.3)';
                } else if (estadoReal === 'pendiente') {
                  chipColor = '#00b4d8'; 
                  chipBg = '#e0f2fe';
                  chipShadow = '0 0 15px rgba(0, 180, 216, 0.3)';
                }

                return (
                  <div 
                    key={cita.id} 
                    style={{
                      ...styles.card,
                      flexDirection: isMobile ? "column" : "row"
                    }} 
                    onClick={() => toggleExpand(cita.id)}
                  >
                    {/* SECCIÓN DE LA FECHA */}
                    <div style={{
                      ...styles.dateSection,
                      flexDirection: isMobile ? "row" : "column",
                      justifyContent: isMobile ? "space-between" : "center",
                      padding: isMobile ? "15px 20px" : "25px",
                      minWidth: isMobile ? "auto" : "110px",
                    }}>
                      <div style={{
                        ...styles.bigDate,
                        flexDirection: isMobile ? "row" : "column",
                        gap: isMobile ? "8px" : "0px",
                        alignItems: "center"
                      }}>
                        <span style={styles.dateNum}>{dia}</span>
                        <span style={{
                          ...styles.dateMonth,
                          fontSize: isMobile ? "14px" : "12px"
                        }}>{mes}</span>
                      </div>
                      
                      <div style={{
                        ...styles.divider,
                        display: isMobile ? "none" : "block"
                      }}></div>
                      
                      <div style={{
                        ...styles.timeInfo,
                        alignItems: isMobile ? "flex-end" : "center"
                      }}>
                        <span style={styles.dayName}>{diaSemana}</span>
                        <span style={{ fontSize: "14px", color: isMobile ? "#67e8f9" : "#00b4d8", fontWeight: "bold", marginTop: "4px" }}>
                          {cita.hora || cita.time || "Pendiente"}
                        </span>
                      </div>
                    </div>

                    {/* INFORMACIÓN CLÍNICA PRINCIPAL */}
                    <div style={{
                      ...styles.mainInfo,
                      padding: isMobile ? "20px" : "25px"
                    }}>
                      <div style={{
                        ...styles.serviceHeader,
                        flexDirection: isMobile ? "column-reverse" : "row",
                        alignItems: isMobile ? "flex-start" : "start",
                        gap: isMobile ? "10px" : "15px"
                      }}>
                        <h3 style={styles.serviceName}>{cita.servicio || cita.service || "Servicio General"}</h3>
                        <div style={{
                          ...styles.statusChip,
                          color: chipColor,
                          backgroundColor: chipBg,
                          boxShadow: chipShadow,
                          alignSelf: isMobile ? "flex-end" : "auto"
                        }}>
                          {estadoReal}
                        </div>
                      </div>

                      <div style={{
                        ...styles.detailsRow,
                        gap: isMobile ? "15px" : "30px"
                      }}>
                        <div style={styles.patientBox}>
                          <span style={styles.label}>PACIENTE</span>
                          <span style={styles.value}>{cita.nombrePaciente || cita.nombre || "No registrado"}</span>
                        </div>
                        
                        <div style={styles.sedeBox}>
                          <span style={styles.label}>SEDE CLÍNICA</span>
                          <span style={styles.sedeValue}>🏥 Instituto Tecnológico de Iztapalapa</span>
                        </div>
                      </div>

                      {/* CONTENIDO EXTENDIDO (PROTOCOLO CLÍNICO) */}
                      {expandedId === cita.id && (
                        <div style={styles.expandedContent}>
                          <div style={{
                            ...styles.instructionCard,
                            padding: isMobile ? "15px" : "20px"
                          }}>
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
                            <p style={styles.instrFooter}>Tratamiento: <strong>{cita.servicio || cita.service || "Consulta"}</strong></p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                <p>No tienes citas registradas actualmente.</p>
                <Link to="/agendar" style={{ color: "#00b4d8", fontWeight: "bold", textDecoration: "none" }}>Agendar una cita ahora</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { minHeight: "100vh", backgroundColor: "#f8fafc", boxSizing: "border-box" },
  container: { maxWidth: "900px", margin: "0 auto", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  header: { marginBottom: "40px", textAlign: "center" },
  topBadge: { fontSize: "11px", fontWeight: "700", color: "#00b4d8", textTransform: "uppercase", letterSpacing: "1px" },
  mainTitle: { fontWeight: "900", color: "#023e8a", margin: "10px 0", lineHeight: "1.2" },
  textBlue: { color: "#00b4d8" },
  subtitle: { color: "#64748b", fontSize: "16px" },
  loaderContainer: { display: "flex", justifyContent: "center", padding: "60px" },
  grid: { display: "flex", flexDirection: "column", gap: "20px" },
  card: { display: "flex", backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(2, 62, 138, 0.05)", border: "1px solid #edf2f7", cursor: "pointer", transition: "transform 0.2s", boxSizing: "border-box" },
  dateSection: { backgroundColor: "#023e8a", color: "white", display: "flex", alignItems: "center", textAlign: "center", boxSizing: "border-box" },
  bigDate: { display: "flex" },
  dateNum: { fontSize: "2rem", fontWeight: "900", lineHeight: "1" },
  dateMonth: { fontWeight: "700", opacity: 0.8, textTransform: "uppercase" },
  divider: { width: "30px", height: "2px", backgroundColor: "rgba(255,255,255,0.2)", margin: "10px 0" },
  timeInfo: { display: "flex", flexDirection: "column" },
  dayName: { fontSize: "11px", textTransform: "uppercase", opacity: 0.7, letterSpacing: "0.5px", whiteSpace: "nowrap" },
  mainInfo: { flex: 1, display: "flex", flexDirection: "column", gap: "15px", boxSizing: "border-box" },
  serviceHeader: { display: "flex", width: "100%", boxSizing: "border-box" },
  serviceName: { margin: 0, color: "#023e8a", fontSize: "1.3rem", fontWeight: "800" },
  statusChip: { padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", transition: "all 0.3s ease", whiteSpace: "nowrap" },
  detailsRow: { display: "flex", flexWrap: "wrap" },
  patientBox: { display: "flex", flexDirection: "column", gap: "4px" },
  sedeBox: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "10px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.5px" },
  value: { fontSize: "14px", fontWeight: "600", color: "#1e293b" },
  sedeValue: { fontSize: "14px", fontWeight: "600", color: "#023e8a" },
  expandedContent: { marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #edf2f7", boxSizing: "border-box" },
  instructionCard: { backgroundColor: "#f8fafc", borderRadius: "14px", border: "1px solid #e2e8f0", boxSizing: "border-box" },
  instrTitle: { margin: "0 0 12px 0", color: "#023e8a", fontSize: "14px", fontWeight: "700" },
  instrGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "12px", color: "#475569", lineHeight: "1.5" },
  instrItem: { background: "white", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7", boxSizing: "border-box" },
  instrFooter: { marginTop: "15px", margin: "15px 0 0 0", fontSize: "12px", color: "#64748b", textAlign: "right" }
};

export default MyAppointments;