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
  { name: "Gris Silver", hex: "#94a3b8" }
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
          fontSize: isMobile ? "28px" : "42px"
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
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto" }}>⚡ Autenticidad Garantizada</div>
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto" }}>🛡️ Material de Grado Clínico</div>
          <div style={{ ...styles.statItem, width: isMobile ? "100%" : "auto" }}>📦 Entrega Directa en Clínica</div>
        </div>
      </div>
      
      {/* Contenedor de Filtros con Scroll Horizontal Táctil */}
      <div style={{
        ...styles.filterWrapper,
        marginBottom: isMobile ? "30px" : "50px",
        padding: isMobile ? "0 4px" : "0"
      }}>
        <div style={{
          ...styles.filterRow,
          width: "100%",
          justifyContent: isMobile ? "flex-start" : "center",
          overflowX: isMobile ? "auto" : "visible",
          whiteSpace: isMobile ? "nowrap" : "normal",
          padding: isMobile ? "8px" : "8px",
          borderRadius: isMobile ? "16px" : "50px",
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
                  boxShadow: isSelected ? "0 10px 20px rgba(2, 62, 138, 0.15)" : "none",
                  padding: isMobile ? "10px 20px" : "10px 26px",
                  fontSize: isMobile ? "14px" : "14px",
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

      {/* Grid de Productos Adaptativo */}
      <div style={{
        ...styles.grid,
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? "24px" : "40px"
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
        borderRadius: isMobile ? "24px" : "28px"
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
      <div style={{
        ...styles.imgContainer,
        height: isMobile ? "220px" : "230px"
      }}>
        <img src={product.image || product.img} alt={product.name} style={styles.image} />
        <span style={styles.tag}>{product.category}</span>
      </div>

      <div style={{
        ...styles.infoContainer,
        padding: isMobile ? "20px" : "26px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{
            ...styles.prodName,
            fontSize: isMobile ? "18px" : "19px"
          }}>
            {product.hasColors ? `${product.name} (${selectedColor.name})` : product.name}
          </h3>
          <p style={{
            ...styles.prodDesc,
            fontSize: isMobile ? "13.5px" : "14px"
          }}>{product.description}</p>
          
          {product.hasColors && (
            <div style={styles.colorSection}>
              <span style={styles.colorLabel}>Elige el color de la liga:</span>
              <div style={styles.colorRow}>
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
                        transform: isCurrent ? "scale(1.15)" : "scale(1)",
                        border: isCurrent ? "3px solid #0f172a" : "1px solid #cbd5e1",
                        boxShadow: isCurrent ? "0 4px 8px rgba(0,0,0,0.15)" : "none",
                        width: "24px",
                        height: "24px"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Fila inferior de Precio y Botón (Flex vertical en celular) */}
        <div style={{
          ...styles.footerRow,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? "14px" : "0px"
        }}>
          <div style={{
            ...styles.priceCol,
            textAlign: isMobile ? "center" : "left",
            backgroundColor: isMobile ? "#f8fafc" : "transparent",
            padding: isMobile ? "8px" : "0",
            borderRadius: isMobile ? "12px" : "0"
          }}>
            <span style={styles.priceLabel}>Inversión</span>
            <span style={{
              ...styles.price,
              fontSize: isMobile ? "20px" : "19px"
            }}>${product.price}.00 <span style={styles.currency}>MXN</span></span>
          </div>
          <button 
            onClick={handleAdd} 
            style={{
              ...styles.addBtn,
              padding: isMobile ? "14px" : "12px 26px",
              fontSize: isMobile ? "14px" : "14px",
              borderRadius: isMobile ? "14px" : "16px",
              width: isMobile ? "100%" : "auto"
            }}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1300px", margin: "0 auto", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: "#fafafa", boxSizing: "border-box" },
  heroSection: { textAlign: "center", marginBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" },
  badge: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "6px 16px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px", display: "inline-block" },
  title: { color: "#023e8a", fontWeight: "900", margin: "0 0 12px 0", letterSpacing: "-1px", lineHeight: "1.15" },
  subtitle: { color: "#64748b", maxWidth: "650px", lineHeight: "1.6", margin: "0 0 24px 0" },
  statsRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", color: "#475569", fontSize: "12px", fontWeight: "600", boxSizing: "border-box" },
  statItem: { backgroundColor: "#fff", padding: "10px 16px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.01)", border: "1px solid #f1f5f9", textAlign: "center", boxSizing: "border-box" },
  filterWrapper: { display: "flex", justifyContent: "center", boxSizing: "border-box" },
  filterRow: { display: "flex", gap: "8px", backgroundColor: "#fff", boxShadow: "0 10px 30px rgba(2, 62, 138, 0.03)", border: "1px solid #f1f5f9", boxSizing: "border-box" },
  filterBtn: { border: "1px solid", fontWeight: "700", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", borderRadius: "50px" },
  grid: { display: "grid", boxSizing: "border-box" },
  card: { background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", boxSizing: "border-box" },
  imgContainer: { position: "relative", overflow: "hidden", backgroundColor: "#f8fafc", width: "100%" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", top: "16px", left: "16px", backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)", color: "#0f172a", padding: "6px 14px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  infoContainer: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", boxSizing: "border-box" },
  prodName: { fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0", lineHeight: "1.3" },
  prodDesc: { color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.5" },
  colorSection: { marginBottom: "20px" },
  colorLabel: { display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "8px" },
  colorRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  colorCircle: { cursor: "pointer", padding: 0, transition: "all 0.2s ease" },
  footerRow: { display: "flex", justifyContent: "space-between", marginTop: "auto", boxSizing: "border-box" },
  priceCol: { display: "flex", flexDirection: "column" },
  priceLabel: { fontSize: "10px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "2px" },
  price: { fontWeight: "900", color: "#00b4d8" },
  currency: { fontSize: "11px", fontWeight: "600", color: "#94a3b8" },
  addBtn: { background: "#023e8a", color: "white", border: "none", fontWeight: "800", cursor: "pointer", transition: "all 0.25s ease", boxShadow: "0 4px 12px rgba(2, 62, 138, 0.15)" }
};