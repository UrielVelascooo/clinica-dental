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
  const [usuarios, setUsuarios] = useState([]); // CRUD de Usuarios
  const [loadingDatos, setLoadingDatos] = useState(true);
  const [activeTab, setActiveTab] = useState("resumen");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Estados Formulario Productos
  const [nuevoProd, setNuevoProd] = useState({ name: "", price: "", category: "", image: "", stock: "", description: "" });
  const [editandoProdId, setEditandoProdId] = useState(null); 
  const [subiendoProd, setSubiendoProd] = useState(false);

  // Estados Formulario Usuarios
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", email: "", telefono: "", rol: "paciente", NotasClinicas: "" });
  const [editandoUsuarioId, setEditandoUsuarioId] = useState(null);
  const [procesandoUsuario, setProcesandoUsuario] = useState(false);
  const [busquedaUsuario, setBusquedaUsuario] = useState("");

  // Estados Reprogramación de Citas
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

      // Traer Usuarios de la Base de Datos (ajusta el nombre de tu colección "users" o "usuarios")
      const usuariosSnapshot = await getDocs(collection(db, "users"));
      setUsuarios(usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

  // ACCIONES: PRODUCTOS
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

  // ACCIONES: USUARIOS (CRUD)
  const handleAgregarOEditarUsuario = async (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) return alert("Nombre y correo son obligatorios.");
    try {
      setProcesandoUsuario(true);
      const dataUsuario = {
        nombre: nuevoUsuario.nombre,
        displayName: nuevoUsuario.nombre, // Compatibilidad con auth
        email: nuevoUsuario.email,
        telefono: nuevoUsuario.telefono || "",
        rol: nuevoUsuario.rol || "paciente",
        NotasClinicas: nuevoUsuario.NotasClinicas || "",
        updatedAt: new Date()
      };

      if (editandoUsuarioId) {
        const userRef = doc(db, "users", editandoUsuarioId);
        await updateDoc(userRef, dataUsuario);
        alert("¡Usuario modificado con éxito!");
      } else {
        dataUsuario.createdAt = new Date();
        await addDoc(collection(db, "users"), dataUsuario);
        alert("¡Usuario registrado en Firestore correctamente!");
      }

      setNuevoUsuario({ nombre: "", email: "", telefono: "", rol: "paciente", NotasClinicas: "" });
      setEditandoUsuarioId(null);
      fetchData();
    } catch (error) {
      console.error("Error al procesar usuario:", error);
    } finally {
      setProcesandoUsuario(false);
    }
  };

  const handleCargarEdicionUsuario = (usr) => {
    setEditandoUsuarioId(usr.id);
    setNuevoUsuario({
      nombre: usr.nombre || usr.displayName || "",
      email: usr.email || "",
      telefono: usr.telefono || "",
      rol: usr.rol || "paciente",
      NotasClinicas: usr.NotasClinicas || ""
    });
  };

  const handleEliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar la ficha de este usuario? Esta acción no borrará sus credenciales de autenticación, pero sí sus datos del panel clínico.")) {
      try {
        await deleteDoc(doc(db, "users", id));
        alert("Usuario removido de la base de datos.");
        fetchData();
      } catch (error) {
        console.error("Error al borrar usuario:", error);
      }
    }
  };

  // ACCIONES: CITAS
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

  // Filtrar la lista de usuarios según la barra de búsqueda
  const usuariosFiltrados = usuarios.filter(u => {
    const term = busquedaUsuario.toLowerCase();
    const nombreVal = (u.nombre || u.displayName || "").toLowerCase();
    const emailVal = (u.email || "").toLowerCase();
    return nombreVal.includes(term) || emailVal.includes(term);
  });

  return (
    <div style={{ 
      padding: isMobile ? "90px 12px 40px 12px" : "140px 20px 80px 20px", 
      maxWidth: "1350px", 
      margin: "0 auto", 
      fontFamily: "'Inter', sans-serif",
      boxSizing: "border-box",
      width: "100%"
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ 
        ...styles.header, 
        flexDirection: isMobile ? "column" : "row", 
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "16px" : "0px",
        marginBottom: isMobile ? "25px" : "40px"
      }}>
        <div>
          <h1 style={{ color: "#0a2540", fontSize: isMobile ? "1.6rem" : "2.5rem", fontWeight: "900", margin: 0 }}>Panel Clínico & Comercial</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: isMobile ? "13px" : "16px" }}>Administración global de Dental Velasco</p>
        </div>
        <div style={{ display: "flex", gap: "10px", width: isMobile ? "100%" : "auto", boxSizing: "border-box" }}>
          {productos.length === 0 && (
            <button onClick={ejecutarMigracion} style={{ ...styles.refreshBtn, backgroundColor: "#e11d48", flex: isMobile ? 1 : "none", padding: isMobile ? "10px 14px" : "12px 24px", fontSize: isMobile ? "12px" : "0.9rem" }}>
              📦 {isMobile ? "Migrar" : "Cargar 15 Productos Base"}
            </button>
          )}
          <button onClick={fetchData} style={{ ...styles.refreshBtn, flex: isMobile ? 1 : "none", padding: isMobile ? "10px 14px" : "12px 24px", fontSize: isMobile ? "12px" : "0.9rem" }}>
            {isMobile ? "🔄 Sincronizar" : "🔄 Actualizar Todo"}
          </button>
        </div>
      </div>

      {/* TABS CON SCROLL HORIZONTAL RESPONSIVO EN MÓVIL */}
      <div style={{ 
        ...styles.tabContainer, 
        maxWidth: isMobile ? "100%" : "680px",
        overflowX: isMobile ? "auto" : "visible",
        padding: isMobile ? "4px" : "6px",
        marginBottom: isMobile ? "20px" : "35px"
      }}>
        {["resumen", "citas", "productos", "ventas", "usuarios"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            style={{ 
              ...styles.tabButton, 
              backgroundColor: activeTab === tab ? "#023e8a" : "transparent", 
              color: activeTab === tab ? "white" : "#64748b",
              padding: isMobile ? "8px 12px" : "10px 14px",
              fontSize: isMobile ? "11px" : "0.75rem"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB: RESUMEN (KPI CARDS) */}
      {activeTab === "resumen" && (
        <div style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
          gap: isMobile ? "12px" : "25px"
        }}>
          <div style={{...styles.kpiCard, padding: isMobile ? "16px" : "26px"}}><span>📅</span><div><h3 style={styles.kpiTitle}>Citas Médicas</h3><p style={{...styles.kpiValue, fontSize: isMobile ? "1.5rem" : "1.9rem"}}>{citas.length}</p></div></div>
          <div style={{ ...styles.kpiCard, borderLeft: "6px solid #00b4d8", padding: isMobile ? "16px" : "26px" }}><span>🪥</span><div><h3 style={styles.kpiTitle}>Catálogo</h3><p style={{...styles.kpiValue, fontSize: isMobile ? "1.5rem" : "1.9rem"}}>{productos.length} items</p></div></div>
          <div style={{ ...styles.kpiCard, borderLeft: "6px solid #a855f7", padding: isMobile ? "16px" : "26px" }}><span>👥</span><div><h3 style={styles.kpiTitle}>Pacientes</h3><p style={{...styles.kpiValue, fontSize: isMobile ? "1.5rem" : "1.9rem"}}>{usuarios.length} cuentas</p></div></div>
          <div style={{ ...styles.kpiCard, borderLeft: "6px solid #10b981", padding: isMobile ? "16px" : "26px" }}><span>💰</span><div><h3 style={styles.kpiTitle}>Ingresos</h3><p style={{ ...styles.kpiValue, color: "#10b981", fontSize: isMobile ? "1.5rem" : "1.9rem" }}>${ingresosTotales}.00</p></div></div>
        </div>
      )}

      {/* TAB: CITAS */}
      {activeTab === "citas" && (
        <div style={{ ...styles.tableCard, padding: isMobile ? "12px" : "35px" }}>
          <h2 style={{...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.4rem", marginBottom: isMobile ? "15px" : "25px"}}>Monitoreo de Citas Médicas</h2>
          {citas.length === 0 ? <p style={styles.noData}>No hay citas registradas.</p> : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={styles.th}>Paciente</th>
                    <th style={styles.th}>Servicio</th>
                    <th style={styles.th}>Fecha</th>
                    <th style={styles.th}>Hora</th>
                    <th style={styles.th}>Estatus</th>
                    <th style={styles.th}>Notes</th>
                    <th style={styles.th}>Acciones de Control</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => {
                    const estatusActual = cita.estado || cita.status || "pendiente";
                    return (
                      <tr key={cita.id} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: "700", color: "#023e8a", padding: isMobile ? "12px 10px" : "18px 20px" }}>{cita.userEmail || cita.email || cita.nombrePaciente || "Paciente"}</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}><span style={styles.serviceBadge}>{cita.servicio || cita.service || "General"}</span></td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>{cita.fecha || cita.date || "No asignada"}</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>{cita.hora || cita.time || "No asignada"}</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                          <span style={{
                            ...styles.serviceBadge,
                            backgroundColor: estatusActual === "cancelada" ? "#fee2e2" : estatusActual === "reprogramada" ? "#ffedd5" : "#e0f2fe",
                            color: estatusActual === "cancelada" ? "#ef4444" : estatusActual === "reprogramada" ? "#ea580c" : "#0369a1"
                          }}>
                            {estatusActual}
                          </span>
                        </td>
                        <td style={{ ...styles.td, color: "#64748b", fontStyle: "italic", padding: isMobile ? "12px 10px" : "18px 20px" }}>{cita.notes || cita.notas || "Sin notas"}</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                          {citaReprogramandoId === cita.id ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", minWidth: "160px", boxSizing: "border-box" }}>
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

      {/* TAB: PRODUCTOS */}
      {activeTab === "productos" && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", 
          gap: isMobile ? "20px" : "30px", 
          alignItems: "start",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{ ...styles.formCard, padding: isMobile ? "16px" : "30px" }}>
            <h3 style={{ ...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.2rem", marginBottom: "15px" }}>
              {editandoProdId ? "📝 Editar Producto" : "✨ Añadir Producto"}
            </h3>
            <form onSubmit={handleAgregarOEditarProducto} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Nombre" required value={nuevoProd.name} onChange={e => setNuevoProd({...nuevoProd, name: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="number" placeholder="Precio ($)" required value={nuevoProd.price} onChange={e => setNuevoProd({...nuevoProd, price: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="text" placeholder="Categoría" value={nuevoProd.category} onChange={e => setNuevoProd({...nuevoProd, category: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="number" placeholder="Stock" value={nuevoProd.stock} onChange={e => setNuevoProd({...nuevoProd, stock: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="text" placeholder="Descripción" value={nuevoProd.description} onChange={e => setNuevoProd({...nuevoProd, description: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="text" placeholder="URL Imagen" value={nuevoProd.image} onChange={e => setNuevoProd({...nuevoProd, image: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={subiendoProd} style={{ ...styles.submitBtn, flex: 2, padding: isMobile ? "12px" : "15px" }}>
                  {subiendoProd ? "Guardando..." : editandoProdId ? "💾 Guardar" : "🚀 Publicar"}
                </button>
                {editandoProdId && (
                  <button type="button" onClick={() => { setEditandoProdId(null); setNuevoProd({ name: "", price: "", category: "", image: "", stock: "", description: "" }); }} style={{ ...styles.submitBtn, backgroundColor: "#64748b", background: "none", color: "#64748b", border: "1px solid #cbd5e1", flex: 1, padding: isMobile ? "12px" : "15px" }}>X</button>
                )}
              </div>
            </form>
          </div>

          <div style={{ ...styles.tableCard, padding: isMobile ? "12px" : "35px", maxWidth: "100%", overflowX: "hidden" }}>
            <h2 style={{...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.4rem", marginBottom: isMobile ? "15px" : "25px"}}>Inventario de la Tienda</h2>
            {productos.length === 0 ? <p style={styles.noData}>Tu catálogo está vacío.</p> : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Imagen</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Producto</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Categoría</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Stock</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Precio</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Controles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod) => (
                      <tr key={prod.id} style={styles.tr}>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}><img src={prod.image} alt={prod.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} /></td>
                        <td style={{ ...styles.td, fontWeight: "700", minWidth: "140px", padding: isMobile ? "12px 10px" : "18px 20px" }}>{prod.name}</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}><span style={{ ...styles.serviceBadge, backgroundColor: "#f1f5f9", color: "#475569" }}>{prod.category}</span></td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}><strong>{prod.stock} u.</strong></td>
                        <td style={{ ...styles.td, fontWeight: "800", color: "#023e8a", padding: isMobile ? "12px 10px" : "18px 20px" }}>${prod.price}.00</td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
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

      {/* TAB: VENTAS */}
      {activeTab === "ventas" && (
        <div style={{ ...styles.tableCard, padding: isMobile ? "12px" : "35px" }}>
          <h2 style={{...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.4rem", marginBottom: isMobile ? "15px" : "25px"}}>Registro de Ventas Históricas</h2>
          {ventas.length === 0 ? <p style={styles.noData}>No se registran ventas todavía.</p> : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th style={styles.th}>Ticket ID</th><th style={styles.th}>Comprador</th><th style={styles.th}>Artículos</th><th style={styles.th}>Fecha</th><th style={styles.th}>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta) => (
                    <tr key={venta.id} style={styles.tr}>
                      <td style={{ ...styles.td, fontFamily: "monospace", padding: isMobile ? "12px 10px" : "18px 20px" }}>#{venta.id.substring(0, 8).toUpperCase()}</td>
                      <td style={{ ...styles.td, fontWeight: "700", padding: isMobile ? "12px 10px" : "18px 20px" }}>{venta.userEmail || venta.email || "Cliente"}</td>
                      <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
                          {venta.items ? venta.items.map((item, i) => (
                            <span key={i} style={{ fontSize: "0.85rem" }}>• {item.name || item.title} <strong>(x{item.quantity || 1})</strong></span>
                          )) : "Detalle ausente"}
                        </div>
                      </td>
                      <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>{venta.createdAt ? new Date(venta.createdAt.seconds * 1000).toLocaleDateString() : (venta.date || "Reciente")}</td>
                      <td style={{ ...styles.td, fontWeight: "900", color: "#10b981", padding: isMobile ? "12px 10px" : "18px 20px" }}>${venta.total}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* NUEVA TAB: GESTIÓN DE USUARIOS / PACIENTES */}
      {activeTab === "usuarios" && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", 
          gap: isMobile ? "20px" : "30px", 
          alignItems: "start",
          width: "100%",
          boxSizing: "border-box"
        }}>
          {/* FORMULARIO DE ALTA / EDICIÓN */}
          <div style={{ ...styles.formCard, padding: isMobile ? "16px" : "30px" }}>
            <h3 style={{ ...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.2rem", marginBottom: "15px" }}>
              {editandoUsuarioId ? "📝 Ficha del Usuario" : "👤 Registrar Paciente"}
            </h3>
            <form onSubmit={handleAgregarOEditarUsuario} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Nombre completo" required value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="email" placeholder="Correo Electrónico" required value={nuevoUsuario.email} onChange={e => setNuevoUsuario({...nuevoUsuario, email: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              <input type="tel" placeholder="Teléfono" value={nuevoUsuario.telefono} onChange={e => setNuevoUsuario({...nuevoUsuario, telefono: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px"}} />
              
              <select value={nuevoUsuario.rol} onChange={e => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px", backgroundColor: "white"}}>
                <option value="paciente">Paciente</option>
                <option value="admin">Administrador</option>
              </select>

              <textarea placeholder="Historial Clínico / Notas del Administrador" rows="3" value={nuevoUsuario.NotasClinicas} onChange={e => setNuevoUsuario({...nuevoUsuario, NotasClinicas: e.target.value})} style={{...styles.formInput, padding: isMobile ? "12px" : "14px", borderRadius: "12px", resize: "vertical"}} />
              
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={procesandoUsuario} style={{ ...styles.submitBtn, flex: 2, padding: isMobile ? "12px" : "15px" }}>
                  {procesandoUsuario ? "Guardando..." : editandoUsuarioId ? "💾 Actualizar Ficha" : "🚀 Crear Cuenta"}
                </button>
                {editandoUsuarioId && (
                  <button type="button" onClick={() => { setEditandoUsuarioId(null); setNuevoUsuario({ nombre: "", email: "", telefono: "", rol: "paciente", NotasClinicas: "" }); }} style={{ ...styles.submitBtn, backgroundColor: "#64748b", background: "none", color: "#64748b", border: "1px solid #cbd5e1", flex: 1, padding: isMobile ? "12px" : "15px" }}>X</button>
                )}
              </div>
            </form>
          </div>

          {/* TABLA CON BUSCADOR DE USUARIOS */}
          <div style={{ ...styles.tableCard, padding: isMobile ? "12px" : "35px", maxWidth: "100%", overflowX: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
              <h2 style={{...styles.tableHeading, fontSize: isMobile ? "1.1rem" : "1.4rem"}}>Base de Datos de Usuarios</h2>
              <input 
                type="text" 
                placeholder="🔍 Buscar por nombre o email..." 
                value={busquedaUsuario} 
                onChange={e => setBusquedaUsuario(e.target.value)} 
                style={{ ...styles.formInput, padding: "8px 14px", width: isMobile ? "100%" : "250px" }}
              />
            </div>

            {usuariosFiltrados.length === 0 ? <p style={styles.noData}>No se encontraron usuarios registrados.</p> : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc" }}>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Nombre / Cuenta</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Contacto</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Rol</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Historial Clínico / Notas</th>
                      <th style={{ ...styles.th, padding: isMobile ? "12px 10px" : "16px 20px" }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.map((usr) => (
                      <tr key={usr.id} style={styles.tr}>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                          <div style={{ fontWeight: "700", color: "#023e8a" }}>{usr.nombre || usr.displayName || "Sin Nombre"}</div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{usr.email}</div>
                        </td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px", fontSize: "0.9rem" }}>
                          {usr.telefono || "—"}
                        </td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                          <span style={{ 
                            ...styles.serviceBadge, 
                            backgroundColor: usr.rol === "admin" ? "#fef3c7" : "#e0f2fe", 
                            color: usr.rol === "admin" ? "#d97706" : "#0369a1" 
                          }}>
                            {usr.rol || "paciente"}
                          </span>
                        </td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px", fontSize: "0.85rem", color: "#475569", maxWidth: "200px", whiteSpace: "normal", wordBreak: "break-word" }}>
                          {usr.NotasClinicas ? usr.NotasClinicas : <span style={{color: "#cbd5e1", fontStyle: "italic"}}>Sin expediente clínico</span>}
                        </td>
                        <td style={{ ...styles.td, padding: isMobile ? "12px 10px" : "18px 20px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => handleCargarEdicionUsuario(usr)} style={{ ...styles.controlBtn, color: "#023e8a", backgroundColor: "#eff6ff" }}>✏️ Editar</button>
                            <button onClick={() => handleEliminarUsuario(usr.id)} style={{ ...styles.controlBtn, color: "#ef4444", backgroundColor: "#fee2e2" }}>🗑️ Borrar</button>
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
    </div>
  );
}

const styles = {
  loaderContainer: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f4f8" },
  spinner: { border: "4px solid #e2e8f0", borderTop: "4px solid #00b4d8", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" },
  header: { display: "flex", justifyContent: "space-between", borderBottom: "2px solid #e2e8f0", paddingBottom: "20px", boxSizing: "border-box", width: "100%" },
  refreshBtn: { backgroundColor: "#00b4d8", color: "white", border: "none", borderRadius: "50px", fontWeight: "800", cursor: "pointer" },
  tabContainer: { display: "flex", gap: "8px", backgroundColor: "rgba(148, 163, 184, 0.12)", borderRadius: "50px", width: "100%", boxSizing: "border-box", scrollbarWidth: "none" },
  tabButton: { flex: "none", borderRadius: "50px", border: "none", fontWeight: "800", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", whiteSpace: "nowrap" },
  grid: { display: "grid", width: "100%", boxSizing: "border-box" },
  kpiCard: { backgroundColor: "white", borderRadius: "24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "20px", borderLeft: "6px solid #023e8a", boxSizing: "border-box", width: "100%" },
  kpiTitle: { margin: 0, color: "#64748b", fontSize: "0.9rem", fontWeight: "800", textTransform: "uppercase" },
  kpiValue: { margin: "4px 0 0 0", color: "#0a2540", fontWeight: "900" },
  tableCard: { backgroundColor: "white", borderRadius: "30px", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
  formCard: { backgroundColor: "white", borderRadius: "30px", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
  tableHeading: { color: "#0a2540", margin: 0, fontWeight: "900" },
  formInput: { width: "100%", borderRadius: "14px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  submitBtn: { borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #023e8a, #0077b6)", color: "white", fontWeight: "800", cursor: "pointer", display: "block", width: "100%" },
  noData: { color: "#64748b", textAlign: "center", padding: "50px 0", fontWeight: "600" },
  tableWrapper: { overflowX: "auto", width: "100%", boxSizing: "border-box", WebkitOverflowScrolling: "touch" },
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