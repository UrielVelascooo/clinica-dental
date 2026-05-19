// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig"; 
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

const PRODUCTOS_MIGRACION = [
  { name: "Ligas para Brackets", price: 120, category: "Ortodoncia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76r7W_SsJiZMa1gdHw2PhCShc0qdlvsPlSw&s", description: "Paquete de ligas de alta elasticidad y memoria de forma. Selecciona tu color favorito.", hasColors: true, stock: 50 },
  { name: "GUM Cera ortodóntica (paquete de 6)", price: 293, category: "Ortodoncia", image: "https://m.media-amazon.com/images/I/71byoFCtSCL._SX522_.jpg", description: "Para aparatos ortopédicos y dispositivos dentales.", stock: 30 },
  { name: "Yakiter Guarda Dental Bruxismo", price: 186, category: "Ortodoncia", image: "https://m.media-amazon.com/images/I/71vcGBM4trL._AC_SY300_SX300_QL70_ML2_.jpg", description: "Para evitar los ronquidos, 8PCS Protectores dentales en 2 tamaños.", stock: 25 },
  { name: "Espuma Limpiadora para Alineadores (60 ml)", price: 298, category: "Ortodoncia", image: "https://m.media-amazon.com/images/I/51VpeXYRO5L._AC_SY300_SX300_QL70_ML2_.jpg", description: "Limpieza Profunda, Elimina Olores y Bacterias.", stock: 40 },
  { name: "Cepillo Dental Ortodóntico Pro V-Trim", price: 85, category: "Higiene", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=500&q=80", description: "Cerdas externas e internas cortadas en V.", stock: 100 },
  { name: "Hilo Dental Interdental Expandible", price: 95, category: "Higiene", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=500&q=80", description: "Filamentos de microfibra que se expanden.", stock: 80 },
  { name: "Limpiador de Lengua Ergonómico PureBreath", price: 75, category: "Higiene", image: "https://images.unsplash.com/photo-1559600844-c7245aa41c5b?auto=format&fit=crop&w=500&q=80", description: "Raspador de doble acción.", stock: 60 },
  { name: "PHILIPS - Cepillo de dientes eléctrico Sonicare 4100", price: 1450, category: "Higiene", image: "https://m.media-amazon.com/images/I/71Nuz9Sjl1L._AC_SY300_SX300_QL70_ML2_.jpg", description: "40,000 vibraciones por minuto.", stock: 15 },
  { name: "Irrigador Bucal Portátil WaterJet", price: 1120, category: "Higiene", image: "https://images.unsplash.com/photo-1442601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80", description: "Chorro de agua a presión ajustable.", stock: 20 },
  { name: "Kit Blanqueamiento Home Professional", price: 1250, category: "Estética", image: "https://images.unsplash.com/photo-1473286835901-04adb1afab02?auto=format&fit=crop&w=500&q=80", description: "Jeringas de peróxido de carbamida al 16%.", stock: 12 },
  { name: "Pasta Dental Whitening Max Carbon", price: 165, category: "Estética", image: "https://images.unsplash.com/photo-1559599242-749e7b282ca8?auto=format&fit=crop&w=500&q=80", description: "Fórmula de carbón activado.", stock: 45 },
  { name: "Pluma Blanqueadora de Retoque Express", price: 290, category: "Estética", image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&w=500&q=80", description: "Pincel aplicador de secado rápido.", stock: 35 },
  { name: "Gel Bioadhesivo Clorhexidina 0.20%", price: 195, category: "Clínico", image: "https://images.unsplash.com/photo-1628193494693-d67af1246b50?auto=format&fit=crop&w=500&q=80", description: "Tratamiento localizado para encías inflamadas.", stock: 25 },
  { name: "Pasta Dental Desensibilizante Relief", price: 140, category: "Clínico", image: "https://images.unsplash.com/photo-1559600844-c7245aa41c5b?auto=format&fit=crop&w=500&q=80", description: "Bloquea los túbulos dentinarios expuestos.", stock: 40 },
  { name: "Enjuague Bucal Remineralizante con Calcio", price: 210, category: "Clínico", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80", description: "Fortalece el esmalte dental debilitado.", stock: 30 }
];

function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const adminEmail = "uro.ve90@gmail.com"; 

  const [citas, setCitas] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loadingDatos, setLoadingDatos] = useState(true);
  const [activeTab, setActiveTab] = useState("resumen");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [nuevoProd, setNuevoProd] = useState({ name: "", price: "", category: "", image: "", stock: "", description: "" });
  const [editandoProdId, setEditandoProdId] = useState(null); 
  const [subiendoProd, setSubiendoProd] = useState(false);

  const [citaReprogramandoId, setCitaReprogramandoId] = useState(null);
  const [nuevaFechaCita, setNuevaFechaCita] = useState("");
  const [nuevaHoraCita, setNuevaHoraCita] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== adminEmail) {
        alert("Acceso denegado.");
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      setLoadingDatos(true);
      const citasSnapshot = await getDocs(collection(db, "citas"));
      setCitas(citasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const ventasSnapshot = await getDocs(collection(db, "orders"));
      setVentas(ventasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const prodSnapshot = await getDocs(collection(db, "productos"));
      setProductos(prodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error al sincronizar:", error);
    } finally {
      setLoadingDatos(false);
    }
  };

  const ejecutarMigracion = async () => {
    if (productos.length > 0) {
      alert("Ya tienes productos en la base de datos, no es necesario inicializar.");
      return;
    }
    try {
      setLoadingDatos(true);
      for (const prod of PRODUCTOS_MIGRACION) {
        await addDoc(collection(db, "productos"), prod);
      }
      alert("¡Éxito! Los 15 productos se subieron correctamente a Firestore.");
      fetchData();
    } catch (e) {
      console.error("Error en migración:", e);
    } finally {
      setLoadingDatos(false);
    }
  };

  const handleAgregarOEditarProducto = async (e) => {
    e.preventDefault();
    if (!nuevoProd.name || !nuevoProd.price) return;
    try {
      setSubiendoProd(true);
      const dataProducto = {
        name: nuevoProd.name,
        price: Number(nuevoProd.price),
        category: nuevoProd.category || "General",
        image: nuevoProd.image || "https://via.placeholder.com/150",
        description: nuevoProd.description || "",
        stock: Number(nuevoProd.stock) || 10,
        hasColors: false
      };

      if (editandoProdId) {
        const prodRef = doc(db, "productos", editandoProdId);
        await updateDoc(prodRef, dataProducto);
        alert("¡Producto actualizado correctamente!");
      } else {
        await addDoc(collection(db, "productos"), dataProducto);
        alert("¡Producto añadido con éxito!");
      }

      setNuevoProd({ name: "", price: "", category: "", image: "", stock: "", description: "" });
      setEditandoProdId(null);
      fetchData();
    } catch (error) {
      console.error("Error procesando producto:", error);
    } finally {
      setSubiendoProd(false);
    }
  };

  const handleCargarEdicion = (prod) => {
    setEditandoProdId(prod.id);
    setNuevoProd({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      image: prod.image,
      stock: prod.stock,
      description: prod.description || ""
    });
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm("¿Estás completamente seguro de eliminar este producto del inventario?")) {
      try {
        await deleteDoc(doc(db, "productos", id));
        alert("Producto eliminado de Firestore.");
        fetchData();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleCancelarCita = async (id) => {
    if (window.confirm("¿Deseas cancelar definitivamente esta cita médica?")) {
      try {
        const citaRef = doc(db, "citas", id);
        await updateDoc(citaRef, { 
          status: "cancelada",
          estado: "cancelada" 
        });
        alert("La cita ha sido marcada como cancelada.");
        fetchData();
      } catch (error) {
        console.error("Error al cancelar cita:", error);
      }
    }
  };

  const handleReprogramarCita = async (id) => {
    if (!nuevaFechaCita || !nuevaHoraCita) {
      return alert("Por favor selecciona una nueva fecha y hora válidas.");
    }
    try {
      const citaRef = doc(db, "citas", id);
      await updateDoc(citaRef, {
        date: nuevaFechaCita,
        fecha: nuevaFechaCita, 
        time: nuevaHoraCita,
        hora: nuevaHoraCita,
        status: "reprogramada",
        estado: "reprogramada"
      });
      alert("Cita reprogramada con éxito.");
      setCitaReprogramandoId(null);
      setNuevaFechaCita("");
      setNuevaHoraCita("");
      fetchData();
    } catch (error) {
      console.error("Error al reprogramar:", error);
    }
  };

  if (authLoading || loadingDatos) {
    return <div style={styles.loaderContainer}><div style={styles.spinner}></div></div>;
  }

  const ingresosTotales = ventas.reduce((total, orden) => total + (Number(orden.total) || 0), 0);
  const totalProductosVendidos = ventas.reduce((total, orden) => {
    return total + (orden.items ? orden.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0);
  }, 0);

  return (
    <div style={{ 
      padding: isMobile ? "100px 16px 60px 16px" : "140px 20px 80px 20px", 
      maxWidth: "1350px", 
      margin: "0 auto", 
      fontFamily: "'Inter', sans-serif",
      boxSizing: "border-box"
    }}>
      
      <div style={{ 
        ...styles.header, 
        flexDirection: isMobile ? "column" : "row", 
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "20px" : "0px"
      }}>
        <div>
          <h1 style={{ color: "#0a2540", fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight: "900", margin: 0 }}>Panel Clínico & Comercial</h1>
          <p style={{ color: "#64748b", margin: "6px 0 0 0" }}>Administración global de Dental Velasco</p>
        </div>
        <div style={{ display: "flex", gap: "10px", width: isMobile ? "100%" : "auto" }}>
          {productos.length === 0 && (
            <button onClick={ejecutarMigracion} style={{ ...styles.refreshBtn, backgroundColor: "#e11d48", flex: isMobile ? 1 : "none" }}>
              📦 {isMobile ? "Base" : "Cargar 15 Productos Base"}
            </button>
          )}
          <button onClick={fetchData} style={{ ...styles.refreshBtn, flex: isMobile ? 1 : "none" }}>
            {isMobile ? "🔄 Sincronizar" : "🔄 Actualizar Todo"}
          </button>
        </div>
      </div>

      <div style={{ ...styles.tabContainer, maxWidth: isMobile ? "100%" : "550px" }}>
        {["resumen", "citas", "productos", "ventas"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tabButton, backgroundColor: activeTab === tab ? "#023e8a" : "transparent", color: activeTab === tab ? "white" : "#64748b" }}>{tab}</button>
        ))}
      </div>

      {activeTab === "resumen" && (
        <div style={styles.grid}>
          <div style={styles.kpiCard}><span>📅</span><div><h3 style={styles.kpiTitle}>Citas Médicas</h3><p style={styles.kpiValue}>{citas.length}</p></div></div>
          <div style={{ ...styles.kpiCard, borderLeft: "6px solid #00b4d8" }}><span>🪥</span><div><h3 style={styles.kpiTitle}>Catálogo Productos</h3><p style={styles.kpiValue}>{productos.length} items</p></div></div>
          <div style={styles.kpiCard}><span>📦</span><div><h3 style={styles.kpiTitle}>Unidades Vendidas</h3><p style={styles.kpiValue}>{totalProductosVendidos} u.</p></div></div>
          <div style={{ ...styles.kpiCard, borderLeft: "6px solid #10b981" }}><span>💰</span><div><h3 style={styles.kpiTitle}>Ingresos Totales</h3><p style={{ ...styles.kpiValue, color: "#10b981" }}>${ingresosTotales}.00</p></div></div>
        </div>
      )}

      {activeTab === "citas" && (
        <div style={{ ...styles.tableCard, padding: isMobile ? "20px" : "35px" }}>
          <h2 style={styles.tableHeading}>Monitoreo de Citas Médicas</h2>
          {citas.length === 0 ? <p style={styles.noData}>No hay citas registradas.</p> : (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={styles.th}>Paciente</th>
                    <th style={styles.th}>Servicio</th>
                    <th style={styles.th}>Fecha</th>
                    <th style={styles.th}>Hora</th>
                    <th style={styles.th}>Estatus</th>
                    <th style={styles.th}>Notas</th>
                    <th style={styles.th}>Acciones de Control</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => {
                    const estatusActual = cita.estado || cita.status || "pendiente";
                    return (
                      <tr key={cita.id} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: "700", color: "#023e8a" }}>{cita.userEmail || cita.email || cita.nombrePaciente || "Paciente"}</td>
                        <td style={styles.td}><span style={styles.serviceBadge}>{cita.servicio || cita.service || "General"}</span></td>
                        <td style={styles.td}>{cita.fecha || cita.date || "No asignada"}</td>
                        <td style={styles.td}>{cita.hora || cita.time || "No asignada"}</td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.serviceBadge,
                            backgroundColor: estatusActual === "cancelada" ? "#fee2e2" : estatusActual === "reprogramada" ? "#ffedd5" : "#e0f2fe",
                            color: estatusActual === "cancelada" ? "#ef4444" : estatusActual === "reprogramada" ? "#ea580c" : "#0369a1"
                          }}>
                            {estatusActual}
                          </span>
                        </td>
                        <td style={{ ...styles.td, color: "#64748b", fontStyle: "italic" }}>{cita.notes || cita.notas || "Sin notas"}</td>
                        <td style={styles.td}>
                          {citaReprogramandoId === cita.id ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", minWidth: "160px" }}>
                              <input type="date" value={nuevaFechaCita} onChange={e => setNuevaFechaCita(e.target.value)} style={styles.miniInput} />
                              <input type="time" value={nuevaHoraCita} onChange={e => setNuevaHoraCita(e.target.value)} style={styles.miniInput} />
                              <div style={{ display: "flex", gap: "5px" }}>
                                <button onClick={() => handleReprogramarCita(cita.id)} style={styles.saveMiniBtn}>Confirmar</button>
                                <button onClick={() => setCitaReprogramandoId(null)} style={styles.cancelMiniBtn}>X</button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button disabled={estatusActual === "cancelada"} onClick={() => setCitaReprogramandoId(cita.id)} style={{ ...styles.actionBtn, backgroundColor: "#023e8a" }}>📅 Reprogramar</button>
                              <button disabled={estatusActual === "cancelada"} onClick={() => handleCancelarCita(cita.id)} style={{ ...styles.actionBtn, backgroundColor: "#ef4444" }}>❌ Cancelar</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "productos" && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", 
          gap: "30px", 
          alignItems: "start" 
        }}>
          <div style={{ ...styles.formCard, padding: isMobile ? "20px" : "30px" }}>
            <h3 style={{ ...styles.tableHeading, fontSize: "1.2rem", marginBottom: "20px" }}>
              {editandoProdId ? "📝 Editar Producto Seleccionado" : "✨ Añadir Producto Nuevo"}
            </h3>
            <form onSubmit={handleAgregarOEditarProducto} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input type="text" placeholder="Nombre" required value={nuevoProd.name} onChange={e => setNuevoProd({...nuevoProd, name: e.target.value})} style={styles.formInput} />
              <input type="number" placeholder="Precio ($)" required value={nuevoProd.price} onChange={e => setNuevoProd({...nuevoProd, price: e.target.value})} style={styles.formInput} />
              <input type="text" placeholder="Categoría" value={nuevoProd.category} onChange={e => setNuevoProd({...nuevoProd, category: e.target.value})} style={styles.formInput} />
              <input type="number" placeholder="Stock" value={nuevoProd.stock} onChange={e => setNuevoProd({...nuevoProd, stock: e.target.value})} style={styles.formInput} />
              <input type="text" placeholder="Descripción" value={nuevoProd.description} onChange={e => setNuevoProd({...nuevoProd, description: e.target.value})} style={styles.formInput} />
              <input type="text" placeholder="URL Imagen" value={nuevoProd.image} onChange={e => setNuevoProd({...nuevoProd, image: e.target.value})} style={styles.formInput} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={subiendoProd} style={{ ...styles.submitBtn, flex: 2 }}>
                  {subiendoProd ? "Guardando..." : editandoProdId ? "💾 Guardar Cambios" : "🚀 Publicar"}
                </button>
                {editandoProdId && (
                  <button type="button" onClick={() => { setEditandoProdId(null); setNuevoProd({ name: "", price: "", category: "", image: "", stock: "", description: "" }); }} style={{ ...styles.submitBtn, backgroundColor: "#64748b", background: "none", color: "#64748b", border: "1px solid #cbd5e1", flex: 1 }}>Cancelar</button>
                )}
              </div>
            </form>
          </div>

          <div style={{ ...styles.tableCard, padding: isMobile ? "20px" : "35px" }}>
            <h2 style={styles.tableHeading}>Inventario Actual de la Tienda</h2>
            {productos.length === 0 ? <p style={styles.noData}>Tu catálogo está vacío.</p> : (
              <div style={{ overflowX: "auto", width: "100%" }}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      <th style={styles.th}>Imagen</th><th style={styles.th}>Producto</th><th style={styles.th}>Categoría</th><th style={styles.th}>Stock</th><th style={styles.th}>Precio</th><th style={styles.th}>Controles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod) => (
                      <tr key={prod.id} style={styles.tr}>
                        <td style={styles.td}><img src={prod.image} alt={prod.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} /></td>
                        <td style={{ ...styles.td, fontWeight: "700", minWidth: "140px" }}>{prod.name}</td>
                        <td style={styles.td}><span style={{ ...styles.serviceBadge, backgroundColor: "#f1f5f9", color: "#475569" }}>{prod.category}</span></td>
                        <td style={styles.td}><strong>{prod.stock} u.</strong></td>
                        <td style={{ ...styles.td, fontWeight: "800", color: "#023e8a" }}>${prod.price}.00</td>
                        <td style={styles.td}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => handleCargarEdicion(prod)} style={{ ...styles.controlBtn, color: "#023e8a", backgroundColor: "#eff6ff" }}>✏️ Editar</button>
                            <button onClick={() => handleEliminarProducto(prod.id)} style={{ ...styles.controlBtn, color: "#ef4444", backgroundColor: "#fee2e2" }}>🗑️ Quitar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "ventas" && (
        <div style={{ ...styles.tableCard, padding: isMobile ? "20px" : "35px" }}>
          <h2 style={styles.tableHeading}>Registro de Ventas Históricas</h2>
          {ventas.length === 0 ? <p style={styles.noData}>No se registran ventas todavía.</p> : (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={styles.th}>Ticket ID</th><th style={styles.th}>Comprador</th><th style={styles.th}>Artículos</th><th style={styles.th}>Fecha</th><th style={styles.th}>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta) => (
                    <tr key={venta.id} style={styles.tr}>
                      <td style={{ ...styles.td, fontFamily: "monospace" }}>#{venta.id.substring(0, 8).toUpperCase()}</td>
                      <td style={{ ...styles.td, fontWeight: "700" }}>{venta.userEmail || venta.email || "Cliente"}</td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
                          {venta.items ? venta.items.map((item, i) => (
                            <span key={i} style={{ fontSize: "0.85rem" }}>• {item.name || item.title} <strong>(x{item.quantity || 1})</strong></span>
                          )) : "Detalle ausente"}
                        </div>
                      </td>
                      <td style={styles.td}>{venta.createdAt ? new Date(venta.createdAt.seconds * 1000).toLocaleDateString() : (venta.date || "Reciente")}</td>
                      <td style={{ ...styles.td, fontWeight: "900", color: "#10b981" }}>${venta.total}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  loaderContainer: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f4f8" },
  spinner: { border: "4px solid #e2e8f0", borderTop: "4px solid #00b4d8", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "2px solid #e2e8f0", paddingBottom: "20px", boxSizing: "border-box" },
  refreshBtn: { backgroundColor: "#00b4d8", color: "white", border: "none", padding: "12px 24px", borderRadius: "50px", fontWeight: "800", cursor: "pointer", fontSize: "0.9rem" },
  tabContainer: { display: "flex", gap: "8px", marginBottom: "35px", backgroundColor: "rgba(148, 163, 184, 0.12)", padding: "6px", borderRadius: "50px", width: "100%", boxSizing: "border-box" },
  tabButton: { flex: 1, padding: "10px 14px", borderRadius: "50px", border: "none", fontWeight: "800", textTransform: "uppercase", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.3s ease", whiteSpace: "nowrap" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px", width: "100%" },
  kpiCard: { backgroundColor: "white", padding: "26px", borderRadius: "24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", borderLeft: "6px solid #023e8a", boxSizing: "border-box" },
  kpiTitle: { margin: 0, color: "#64748b", fontSize: "0.9rem", fontWeight: "800", textTransform: "uppercase" },
  kpiValue: { margin: "4px 0 0 0", color: "#0a2540", fontSize: "1.9rem", fontWeight: "900" },
  tableCard: { backgroundColor: "white", borderRadius: "30px", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
  formCard: { backgroundColor: "white", borderRadius: "30px", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
  tableHeading: { color: "#0a2540", margin: "0 0 25px 0", fontSize: "1.4rem", fontWeight: "900" },
  formInput: { width: "100%", padding: "14px 18px", borderRadius: "14px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  submitBtn: { padding: "15px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #023e8a, #0077b6)", color: "white", fontWeight: "800", cursor: "pointer", display: "block", width: "100%" },
  noData: { color: "#64748b", textAlign: "center", padding: "50px 0", fontWeight: "600" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "16px 20px", color: "#023e8a", fontWeight: "800", fontSize: "0.85rem", borderBottom: "2px solid #e2e8f0", textAlign: "left", whiteSpace: "nowrap" },
  td: { padding: "18px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "0.95rem", color: "#1e293b", verticalAlign: "middle", whiteSpace: "nowrap" },
  serviceBadge: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "5px 14px", borderRadius: "50px", fontWeight: "800", fontSize: "0.75rem", textTransform: "capitalize", display: "inline-block" },
  actionBtn: { border: "none", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer", opacity: 0.9, whiteSpace: "nowrap" },
  controlBtn: { border: "none", padding: "6px 12px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer" },
  miniInput: { padding: "6px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px", width: "100%", boxSizing: "border-box" },
  saveMiniBtn: { border: "none", background: "#10b981", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" },
  cancelMiniBtn: { border: "none", background: "#ef4444", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }
};

export default AdminDashboard;