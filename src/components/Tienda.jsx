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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        console.error("Error al cargar la tienda:", error);
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
      padding: isMobile ? "75px 8px 30px 8px" : "160px 20px 100px 20px"
    }}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <span style={{...styles.badge, fontSize: isMobile ? "9px" : "10px"}}>Dental Store Premium</span>
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? "20px" : "42px"
        }}>Optimiza tu Salud Bucal</h1>
      </div>
      
      {/* 🌟 Solución al Menú Cortado: Grid/Flex de dos líneas envueltas en Celular */}
      <div style={{
        ...styles.filterWrapper,
        marginBottom: isMobile ? "16px" : "50px"
      }}>
        <div style={{
          ...styles.filterRow,
          flexWrap: isMobile ? "wrap" : "nowrap",
          justifyContent: "center",
          gap: isMobile ? "6px" : "8px",
          padding: isMobile ? "2px" : "8px",
          background: "transparent",
          border: "none",
          boxShadow: "none"
        }}>
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
                  padding: isMobile ? "6px 12px" : "10px 26px",
                  fontSize: isMobile ? "12px" : "14px",
                  // En celular toman un tamaño equilibrado para forzar que quepan ordenados
                  flexGrow: isMobile ? 1 : 0,
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ Rejilla ultra-compacta de 2 columnas para aprovechar el ancho del celular */}
      <div style={{
        ...styles.grid,
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? "8px" : "40px"
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
        borderRadius: isMobile ? "10px" : "28px"
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
      {/* Contenedor de Imagen ligeramente más pequeño en móvil */}
      <div style={{
        ...styles.imgContainer,
        height: isMobile ? "100px" : "230px"
      }}>
        <img src={product.image || product.img} alt={product.name} style={styles.image} />
        {!isMobile && <span style={styles.tag}>{product.category}</span>}
      </div>

      {/* Cuerpo de Información Compacto */}
      <div style={{
        ...styles.infoContainer,
        padding: isMobile ? "8px" : "26px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{
            ...styles.prodName,
            fontSize: isMobile ? "12.5px" : "19px",
            height: isMobile ? "32px" : "auto", 
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical"
          }}>
            {product.hasColors ? `${product.name} (${selectedColor.name})` : product.name}
          </h3>

          {/* Ocultamos descripción larga en celular para priorizar espacio y botones visibles */}
          {!isMobile && (
            <p style={styles.prodDesc}>{product.description}</p>
          )}
          
          {/* Selector de Ligas minificado */}
          {product.hasColors && (
            <div style={{ ...styles.colorSection, marginBottom: isMobile ? "6px" : "20px", marginTop: isMobile ? "4px" : "0" }}>
              <span style={{...styles.colorLabel, fontSize: isMobile ? "10px" : "11px"}}>Ligas:</span>
              <div style={{ ...styles.colorRow, gap: isMobile ? "3px" : "8px" }}>
                {LIGAS_COLORS.map(color => {
                  const isCurrent = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.colorCircle,
                        backgroundColor: color.hex,
                        transform: isCurrent ? "scale(1.1)" : "scale(1)",
                        border: isCurrent ? "1.5px solid #0f172a" : "1px solid #cbd5e1",
                        width: isMobile ? "12px" : "24px",
                        height: isMobile ? "12px" : "24px"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Sección inferior compacta */}
        <div style={{
          ...styles.footerRow,
          flexDirection: "column",
          alignItems: "stretch",
          gap: isMobile ? "4px" : "12px",
          marginTop: isMobile ? "6px" : "auto"
        }}>
          <div style={styles.priceCol}>
            <span style={{
              ...styles.price,
              fontSize: isMobile ? "13.5px" : "19px"
            }}>${product.price}.00 <span style={{...styles.currency, fontSize: isMobile ? "8px" : "10px"}}>MXN</span></span>
          </div>
          <button 
            onClick={handleAdd} 
            style={{
              ...styles.addBtn,
              padding: isMobile ? "7px" : "12px 26px",
              fontSize: isMobile ? "11px" : "14px",
              borderRadius: isMobile ? "6px" : "16px",
              width: "100%"
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1300px", margin: "0 auto", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: "#fafafa", boxSizing: "border-box" },
  heroSection: { textAlign: "center", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center" },
  badge: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 12px", borderRadius: "50px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px", display: "inline-block" },
  title: { color: "#023e8a", fontWeight: "900", margin: "0", letterSpacing: "-0.5px", lineHeight: "1.2" },
  filterWrapper: { display: "flex", justifyContent: "center", width: "100%", boxSizing: "border-box" },
  filterRow: { display: "flex", width: "100%", boxSizing: "border-box" },
  filterBtn: { border: "1px solid", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease", borderRadius: "50px" },
  grid: { display: "grid", boxSizing: "border-box", width: "100%" },
  card: { background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.01)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.3s ease", boxSizing: "border-box" },
  imgContainer: { position: "relative", overflow: "hidden", backgroundColor: "#f8fafc", width: "100%" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)", color: "#0f172a", borderRadius: "50px", fontWeight: "700", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  infoContainer: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", boxSizing: "border-box" },
  prodName: { fontWeight: "800", color: "#0f172a", margin: "0", lineHeight: "1.25" },
  prodDesc: { color: "#64748b", margin: "0", lineHeight: "1.4" },
  colorSection: { boxSizing: "border-box" },
  colorLabel: { display: "block", fontWeight: "700", color: "#475569", marginBottom: "2px" },
  colorRow: { display: "flex", flexWrap: "wrap" },
  colorCircle: { cursor: "pointer", padding: 0, borderRadius: "50%", transition: "all 0.2s ease" },
  footerRow: { display: "flex", boxSizing: "border-box" },
  priceCol: { display: "flex", flexDirection: "column" },
  price: { fontWeight: "900", color: "#00b4d8", lineHeight: "1" },
  currency: { fontWeight: "600", color: "#94a3b8" },
  addBtn: { background: "#023e8a", color: "white", border: "none", fontWeight: "800", cursor: "pointer", transition: "background 0.2s ease", boxShadow: "0 2px 8px rgba(2, 62, 138, 0.1)" }
};