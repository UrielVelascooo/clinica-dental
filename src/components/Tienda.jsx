// src/components/Tienda.jsx
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
// 🔑 Conectamos tu tienda a la base de datos real
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const LIGAS_COLORS = [
  { name: "Azul", hex: "#0077b6" },
  { name: "Rojo", hex: "#ef4444" },
  { name: "Verde", hex: "#10b981" },
  { name: "Rosa", hex: "#ec4899" },
  { name: "Morado", hex: "#8b5cf6" },
  { name: "Gris", hex: "#94a3b8" }
];

export default function Tienda() {
  const [category, setCategory] = useState("Todos");
  const [productosFirestore, setProductosFirestore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { addToCart } = useCart();

  // Escuchar cambios de tamaño de pantalla para la responsividad
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar el catálogo real desde Firestore
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductosFirestore(lista);
      } catch (error) {
        console.error("Error al cargar la tienda desde Firestore:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  const filtered = category === "Todos" 
    ? productosFirestore 
    : productosFirestore.filter(p => p.category === category);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontFamily: "'Inter', sans-serif" }}>
        <p style={{ color: "#023e8a", fontWeight: "700" }}>Cargando catálogo Dental...</p>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? "90px 16px 60px 16px" : "160px 20px 100px 20px"
    }}>
      <div style={styles.heroSection}>
        <span style={styles.badge}>Dental Store Premium</span>
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? "26px" : "42px"
        }}>Optimiza tu Salud Bucal</h1>
        <p style={{
          ...styles.subtitle,
          fontSize: isMobile ? "14px" : "16px",
          marginBottom: isMobile ? "20px" : "30px"
        }}>
          Una selección exclusiva de aditamentos de grado médico recomendados directamente por nuestros especialistas para complementar tu tratamiento.
        </p>
        <div style={{
          ...styles.statsRow,
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          gap: isMobile ? "10px" : "24px"
        }}>
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto", fontSize: isMobile ? "12px" : "12px" }}>⚡ Autenticidad Garantizada</div>
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto", fontSize: isMobile ? "12px" : "12px" }}>🛡️ Material de Grado Clínico</div>
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto", fontSize: isMobile ? "12px" : "12px" }}>📦 Entrega Directa en Clínica</div>
        </div>
      </div>
      
      {/* Contenedor de Filtros con Scroll Horizontal Táctil */}
      <div style={{
        ...styles.filterWrapper,
        marginBottom: isMobile ? "24px" : "50px",
        padding: isMobile ? "0 4px" : "0"
      }}>
        <div style={{
          ...styles.filterRow,
          width: "100%",
          justifyContent: isMobile ? "flex-start" : "center",
          overflowX: isMobile ? "auto" : "visible",
          whiteSpace: isMobile ? "nowrap" : "normal",
          padding: isMobile ? "6px" : "8px",
          borderRadius: isMobile ? "12px" : "50px",
          WebkitOverflowScrolling: "touch"
        }} className="scroll-hidden">
          {["Todos", "Ortodoncia", "Higiene", "Estética", "Clínico"].map(cat => {
            const isSelected = category === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn, 
                  background: isSelected ? "linear-gradient(135deg, #023e8a 0%, #0077b6 100%)" : "#fff", 
                  color: isSelected ? "white" : "#475569",
                  borderColor: isSelected ? "transparent" : "#e2e8f0",
                  boxShadow: isSelected ? "0 6px 12px rgba(2, 62, 138, 0.1)" : "none",
                  padding: isMobile ? "8px 18px" : "10px 26px",
                  fontSize: isMobile ? "13.5px" : "14px",
                  display: "inline-block",
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Adaptativo: Lista limpia en celular, tarjetas en Escritorio */}
      <div style={{
        ...styles.grid,
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? "16px" : "40px"
      }}>
        {filtered.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
            isMobile={isMobile}
          />
        ))}
      </div>

      <style>{`
        .scroll-hidden::-webkit-scrollbar {
          display: none;
        }
        .scroll-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product, onAddToCart, isMobile }) {
  const [selectedColor, setSelectedColor] = useState(LIGAS_COLORS[0]);

  const handleAdd = () => {
    if (product.hasColors) {
      const variantProduct = {
        ...product,
        id: `${product.id}-${selectedColor.name.toLowerCase()}`,
        name: `${product.name} (${selectedColor.name})`,
        color: selectedColor.name
      };
      onAddToCart(variantProduct);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div 
      style={{
        ...styles.card,
        flexDirection: isMobile ? "row" : "column", // ⚡ Clave: Formato horizontal tipo app en celular
        borderRadius: isMobile ? "20px" : "28px"
      }} 
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 30px 50px rgba(2, 62, 138, 0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)";
        }
      }}
    >
      {/* Contenedor de Imagen adaptativo */}
      <div style={{
        ...styles.imgContainer,
        width: isMobile ? "135px" : "100%",
        height: isMobile ? "100%" : "230px",
        minHeight: isMobile ? "160px" : "auto",
        flexShrink: 0
      }}>
        <img src={product.image || product.img} alt={product.name} style={styles.image} />
        <span style={{
          ...styles.tag,
          fontSize: isMobile ? "9px" : "11px",
          padding: isMobile ? "4px 8px" : "6px 14px",
          top: isMobile ? "10px" : "16px",
          left: isMobile ? "10px" : "16px"
        }}>{product.category}</span>
      </div>

      {/* Contenedor de Información */}
      <div style={{
        ...styles.infoContainer,
        padding: isMobile ? "16px 14px" : "26px",
        width: "100%"
      }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{
            ...styles.prodName,
            fontSize: isMobile ? "15px" : "19px",
            marginBottom: isMobile ? "4px" : "6px"
          }}>
            {product.hasColors ? `${product.name} (${selectedColor.name})` : product.name}
          </h3>
          
          <p style={{
            ...styles.prodDesc,
            fontSize: isMobile ? "12.5px" : "14px",
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 2 : "unset",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: isMobile ? "12px" : "16px"
          }}>{product.description}</p>
          
          {product.hasColors && (
            <div style={{ ...styles.colorSection, marginBottom: isMobile ? "12px" : "20px" }}>
              <span style={styles.colorLabel}>Variante de liga:</span>
              <div style={{ ...styles.colorRow, gap: isMobile ? "5px" : "8px" }}>
                {LIGAS_COLORS.map(color => {
                  const isCurrent = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.colorCircle,
                        backgroundColor: color.hex,
                        transform: isCurrent ? "scale(1.1)" : "scale(1)",
                        border: isCurrent ? "2px solid #0f172a" : "1px solid #cbd5e1",
                        boxShadow: isCurrent ? "0 2px 4px rgba(0,0,0,0.12)" : "none",
                        width: isMobile ? "18px" : "24px",
                        height: isMobile ? "18px" : "24px"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Fila inferior de Inversión y Botón */}
        <div style={{
          ...styles.footerRow,
          flexDirection: isMobile ? "row" : "row", // Se mantiene horizontal compartiendo espacio de forma eficiente
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          gap: isMobile ? "8px" : "0"
        }}>
          <div style={styles.priceCol}>
            <span style={styles.priceLabel}>Inversión</span>
            <span style={{
              ...styles.price,
              fontSize: isMobile ? "16px" : "19px"
            }}>${product.price} <span style={styles.currency}>MXN</span></span>
          </div>
          <button 
            onClick={handleAdd} 
            style={{
              ...styles.addBtn,
              padding: isMobile ? "10px 16px" : "12px 26px",
              fontSize: isMobile ? "12.5px" : "14px",
              borderRadius: isMobile ? "10px" : "16px",
              width: "auto"
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1300px", margin: "0 auto", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: "#fafafa", boxSizing: "border-box" },
  heroSection: { textAlign: "center", marginBottom: "30px", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" },
  badge: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "6px 16px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "inline-block" },
  title: { color: "#023e8a", fontWeight: "900", margin: "0 0 12px 0", letterSpacing: "-1px", lineHeight: "1.15" },
  subtitle: { color: "#64748b", maxWidth: "650px", lineHeight: "1.6", margin: "0 0 24px 0" },
  statsRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", color: "#475569", boxSizing: "border-box" },
  statItem: { backgroundColor: "#fff", padding: "10px 16px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.01)", border: "1px solid #f1f5f9", textAlign: "center", boxSizing: "border-box", fontWeight: "600" },
  filterWrapper: { display: "flex", justifyContent: "center", boxSizing: "border-box" },
  filterRow: { display: "flex", gap: "8px", backgroundColor: "#fff", boxShadow: "0 10px 30px rgba(2, 62, 138, 0.03)", border: "1px solid #f1f5f9", boxSizing: "border-box" },
  filterBtn: { border: "1px solid", fontWeight: "700", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", borderRadius: "50px" },
  grid: { display: "grid", boxSizing: "border-box" },
  card: { background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.01)", border: "1px solid #f1f5f9", display: "flex", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", boxSizing: "border-box" },
  imgContainer: { position: "relative", overflow: "hidden", backgroundColor: "#f8fafc" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)", color: "#0f172a", borderRadius: "50px", fontWeight: "700", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  infoContainer: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", boxSizing: "border-box" },
  prodName: { fontWeight: "800", color: "#0f172a", margin: "0", lineHeight: "1.2" },
  prodDesc: { color: "#64748b", margin: "0", lineHeight: "1.4" },
  colorSection: { marginBottom: "20px" },
  colorLabel: { display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "4px" },
  colorRow: { display: "flex", flexWrap: "wrap" },
  colorCircle: { cursor: "pointer", padding: 0, transition: "all 0.2s ease" },
  footerRow: { display: "flex", boxSizing: "border-box" },
  priceCol: { display: "flex", flexDirection: "column" },
  priceLabel: { fontSize: "9px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "1px" },
  price: { fontWeight: "900", color: "#00b4d8" },
  currency: { fontSize: "10px", fontWeight: "600", color: "#94a3b8" },
  addBtn: { background: "#023e8a", color: "white", border: "none", fontWeight: "800", cursor: "pointer", transition: "all 0.25s ease", boxShadow: "0 4px 12px rgba(2, 62, 138, 0.15)" }
};