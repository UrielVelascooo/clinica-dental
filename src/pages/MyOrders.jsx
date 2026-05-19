// src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyOrders() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCompras = async () => {
      if (user) {
        try {
          const q = query(collection(db, "orders"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const docs = [];
          
          querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          
          docs.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
          });
          
          setCompras(docs);
        } catch (error) {
          console.error("Error cargando el historial de compras de Firestore:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCompras();
  }, [user]);

  return (
    <div style={{
      ...styles.pageWrapper,
      padding: isMobile ? "100px 16px 60px" : "160px 5% 80px"
    }}>
      <div style={styles.container}>
        <header style={{ ...styles.header, marginBottom: isMobile ? "35px" : "60px" }}>
          <span style={styles.topBadge}>Portal Comercial</span>
          <h2 style={{
            ...styles.mainTitle,
            fontSize: isMobile ? "2rem" : "3.5rem"
          }}>Tus Pedidos <br/><span style={styles.textBlue}>Dental ITIZ </span></h2>
          <p style={{ ...styles.subtitle, fontSize: isMobile ? "1rem" : "1.2rem" }}>Consulta y gestiona el estatus de tus insumos y productos adquiridos.</p>
        </header>
        
        {loading ? (
          <div style={styles.loaderContainer}><div className="spinner"></div></div>
        ) : (
          <div style={styles.grid}>
            {compras.length > 0 ? (
              compras.map(compra => {
                const fechaObj = compra.createdAt?.toDate ? compra.createdAt.toDate() : new Date();
                const dia = fechaObj.getDate();
                const mes = fechaObj.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
                const año = fechaObj.getFullYear();

                return (
                  <div key={compra.id} style={styles.card}>
                    {/* SECCIÓN IZQUIERDA/SUPERIOR: DISEÑO DE TICKET DE PAGO */}
                    <div style={{
                      ...styles.ticketSection,
                      width: isMobile ? "100%" : "auto",
                      minWidth: isMobile ? "auto" : "180px",
                      flexDirection: isMobile ? "row" : "column",
                      justifyContent: isMobile ? "space-between" : "center",
                      padding: isMobile ? "20px" : "40px",
                      gap: isMobile ? "15px" : "0px"
                    }}>
                      <div style={{
                        ...styles.bigDate,
                        flexDirection: isMobile ? "row" : "column",
                        gap: isMobile ? "6px" : "0px",
                        alignItems: "center"
                      }}>
                        <span style={{ ...styles.dateNum, fontSize: isMobile ? "1.8rem" : "3.5rem" }}>{dia}</span>
                        <span style={styles.dateMonth}>{mes}</span>
                        <span style={{ fontSize: isMobile ? "14px" : "0.9rem", opacity: 0.7 }}>{año}</span>
                      </div>
                      
                      <div style={{
                        ...styles.divider,
                        display: isMobile ? "none" : "block"
                      }}></div>
                      
                      <div style={styles.methodInfo}>
                        <span style={styles.methodName}>
                          {compra.paymentMethod === 'card' && '💳 Tarjeta'}
                          {compra.paymentMethod === 'oxxo' && '🏪 OXXO'}
                          {compra.paymentMethod === 'paypal' && '🔹 PayPal'}
                        </span>
                      </div>
                    </div>

                    {/* SECCIÓN DERECHA: INFORMACIÓN CENTRAL */}
                    <div style={{
                      ...styles.mainInfo,
                      padding: isMobile ? "20px" : "40px"
                    }}>
                      <div style={{
                        ...styles.serviceHeader,
                        flexDirection: isMobile ? "column-reverse" : "row",
                        alignItems: isMobile ? "flex-start" : "flex-start",
                        gap: isMobile ? "15px" : "0px"
                      }}>
                        <div>
                          <h3 style={{ ...styles.serviceName, fontSize: isMobile ? "1.4rem" : "1.8rem" }}>
                            Orden #{compra.id.substring(0, 8).toUpperCase()}
                          </h3>
                          <span style={{ fontSize: '11px', color: '#94a3b8', wordBreak: "break-all" }}>
                            ID: {compra.id}
                          </span>
                        </div>
                        <div style={{
                          ...styles.statusChip,
                          alignSelf: isMobile ? "flex-end" : "auto",
                          color: compra.status === 'pendiente' ? '#d97706' : '#10b981',
                          borderColor: compra.status === 'pendiente' ? '#fef3c7' : '#d1fae5',
                          backgroundColor: compra.status === 'pendiente' ? '#fef3c7' : '#d1fae5',
                        }}>
                          {compra.status || "completado"}
                        </div>
                      </div>

                      <div style={{
                        ...styles.detailsRow,
                        gap: isMobile ? "20px" : "40px"
                      }}>
                        <div style={styles.patientBox}>
                          <span style={styles.label}>TOTAL PAGADO</span>
                          <span style={styles.value}>${compra.total}.00 MXN</span>
                        </div>
                        
                        <div style={styles.sedeBox}>
                          <span style={styles.label}>PUNTO DE RECOLECCIÓN</span>
                          <span style={{
                            ...styles.sedeValue,
                            fontSize: isMobile ? "1.1rem" : "1.3rem"
                          }}>🏥 Almacén Central - ITIZ</span>
                        </div>
                      </div>

                      {/* DESPLEGABLE INTERACTIVO CON DETALLES DE COMPRA */}
                      {expandedId === compra.id && (
                        <div style={styles.expandedContent}>
                          <div style={{
                            ...styles.instructionCard,
                            padding: isMobile ? "15px" : "30px"
                          }}>
                            <h4 style={styles.instrTitle}>🛍️ Desglose de Productos Seleccionados:</h4>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                              {compra.items && compra.items.map((item, idx) => (
                                <div key={idx} style={{
                                  ...styles.productItemRow,
                                  flexDirection: isMobile ? "column" : "row",
                                  alignItems: isMobile ? "flex-start" : "center",
                                  gap: isMobile ? "4px" : "0px"
                                }}>
                                  <span>📦 <strong>{item.name}</strong> (x{item.quantity})</span>
                                  <span style={{ fontWeight: '700', alignSelf: isMobile ? 'flex-end' : 'auto' }}>
                                    ${item.price * item.quantity}.00
                                  </span>
                                </div>
                              ))}
                            </div>

                            <h4 style={styles.instrTitle}>📋 Protocolo de Entrega en Almacén:</h4>
                            <div style={styles.instrGrid}>
                              <div style={styles.instrItem}>
                                <strong>Identificación:</strong> Presentar tu credencial institucional vigente al recolectar.
                              </div>
                              <div style={styles.instrItem}>
                                <strong>Horarios:</strong> Lunes a Viernes de 9:00 AM a 6:00 PM en el edificio de laboratorios.
                              </div>
                              <div style={styles.instrItem}>
                                <strong>Estatus Pendiente:</strong> Si pagaste en OXXO, recuerda llevar tu comprobante físico impreso.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => setExpandedId(expandedId === compra.id ? null : compra.id)}
                        style={{
                          ...styles.btnExpand,
                          backgroundColor: expandedId === compra.id ? "#023e8a" : "rgba(2, 62, 138, 0.05)",
                          color: expandedId === compra.id ? "white" : "#023e8a"
                        }}
                      >
                        {expandedId === compra.id ? "Ocultar desglose" : "Ver artículos y orden de entrega"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{
                ...styles.emptyState,
                padding: isMobile ? "60px 16px" : "100px 20px",
                borderRadius: isMobile ? "30px" : "50px"
              }}>
                <div style={styles.emptyCircle}>🛍️</div>
                <h3>Aún no has realizado compras</h3>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>Visita nuestra tienda premium de insumos dentales.</p>
                <Link to="/tienda" style={styles.primaryBtn}>Ir al Catálogo</Link>
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
  pageWrapper: { minHeight: "100vh", backgroundColor: "#f8fbff", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  container: { maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" },
  header: { textAlign: "left" },
  topBadge: { color: "#00b4d8", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" },
  mainTitle: { color: "#023e8a", fontWeight: "900", margin: "10px 0", lineHeight: "1.1" },
  textBlue: { color: "#00b4d8" },
  subtitle: { color: "#64748b", maxWidth: "500px" },
  grid: { display: "flex", flexDirection: "column", gap: "30px" },
  
  card: {
    display: "flex", backgroundColor: "white", borderRadius: "40px", overflow: "hidden",
    boxShadow: "0 20px 50px rgba(2, 62, 138, 0.06)", border: "1px solid rgba(255, 255, 255, 0.8)",
    animation: "slideUp 0.6s ease forwards", boxSizing: "border-box"
  },
  
  ticketSection: {
    backgroundColor: "#0a2540", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", boxSizing: "border-box"
  },
  bigDate: { display: "flex", flexDirection: "column", lineHeight: "1.2" },
  dateNum: { fontWeight: "900", lineHeight: "1" },
  dateMonth: { fontSize: "1.2rem", fontWeight: "800", color: "#00b4d8" },
  divider: { width: "30px", height: "4px", backgroundColor: "#00b4d8", margin: "20px 0", borderRadius: "10px" },
  methodInfo: { fontWeight: "700", fontSize: "0.95rem" },

  mainInfo: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "280px", boxSizing: "border-box" },
  serviceHeader: { display: "flex", justifyContent: "space-between", marginBottom: "25px", boxSizing: "border-box" },
  serviceName: { color: "#023e8a", fontWeight: "800", margin: 0 },
  statusChip: { padding: "6px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", whiteSpace: "nowrap" },
  
  detailsRow: { display: "flex", marginBottom: "30px", flexWrap: "wrap", boxSizing: "border-box" },
  patientBox: { flex: 1, minWidth: "140px" },
  sedeBox: { flex: 2, minWidth: "200px" }, 
  label: { fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase" },
  value: { fontSize: "1.4rem", fontWeight: "900", color: "#00b4d8", display: "block", marginTop: "5px" },
  
  sedeValue: { 
    fontWeight: "800", 
    color: "#023e8a", 
    display: "block", 
    marginTop: "5px",
    borderLeft: "4px solid #00b4d8",
    paddingLeft: "15px"
  },

  expandedContent: { marginBottom: "25px", animation: "slideUp 0.3s ease", boxSizing: "border-box" },
  instructionCard: { backgroundColor: "#f8fafc", borderRadius: "30px", border: "1px solid #e2e8f0", boxSizing: "border-box" },
  instrTitle: { color: "#0a2540", margin: "0 0 15px 0", fontSize: "14px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.5px" },
  productItemRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 15px', background: '#ffffff', borderRadius: '12px', border: '1px solid #edf2f7', fontSize: '14px', color: '#2d3748', boxSizing: "border-box" },
  instrGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" },
  instrItem: { fontSize: "13px", color: "#475569", lineHeight: "1.5", backgroundColor: "white", padding: "12px", borderRadius: "15px", border: '1px solid #edf2f7', boxSizing: "border-box" },

  btnExpand: { padding: "18px", borderRadius: "20px", border: "none", fontWeight: "800", cursor: "pointer", transition: "all 0.3s" },
  
  emptyState: { textAlign: "center", backgroundColor: "white", width: "100%", boxSizing: "border-box" },
  emptyCircle: { fontSize: "4rem", marginBottom: "20px" },
  primaryBtn: { display: "inline-block", backgroundColor: "#00b4d8", color: "white", padding: "20px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: "800" },
  loaderContainer: { display: "flex", justifyContent: "center", padding: "100px" }
};

export default MyOrders;