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

  // Escuchar cambios de tamaño de pantalla para adaptar layouts en tiempo real
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar catálogo desde Firestore
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
        error.currentTarget // Evita variables sin usar
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
      padding: isMobile ? "80px 10px 40px 10px" : "160px 20px 100px 20px"
    }}>
      {/* Sección Encabezado Adaptada */}
      <div style={styles.heroSection}>
        <span style={styles.badge}>Dental Store Premium</span>
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? "22px" : "42px",
          marginBottom: isMobile ? "6px" : "12px"
        }}>Optimiza tu Salud Bucal</h1>
        <p style={{
          ...styles.subtitle,
          fontSize: isMobile ? "12.5px" : "16px",
          marginBottom: isMobile ? "12px" : "30px",
          padding: isMobile ? "0 10px" : "0"
        }}>
          Material de grado médico recomendado por nuestros especialistas para tu tratamiento.
        </p>
      </div>
      
      {/* 🌟 Barra de Categorías con Deslizamiento Horizontal Fluido e Invisible en Celular */}
      <div style={{
        ...styles.filterWrapper,
        marginBottom: isMobile ? "20px" : "50px"
      }}>
        <div style={{
          ...styles.filterRow,
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          gap: isMobile ? "6px" : "8px",
          width: "100%",
          padding: isMobile ? "4px" : "8px",
          borderRadius: isMobile ? "10px" : "50px",
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
                  padding: isMobile ? "8px 14px" : "10px 26px",
                  fontSize: isMobile ? "12.5px" : "14px",
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ⚡ Rejilla Premium de 2 Columnas Estrictas en Celular */}
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

      {/* Inyección de CSS Nativo para ocultar barras de scroll horribles en celular */}
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
        borderRadius: isMobile ? "12px" : "28px"
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
      {/* Contenedor de Imagen de Proporciones Controladas */}
      <div style={{
        ...styles.imgContainer,
        height: isMobile ? "115px" : "230px"
      }}>
        <img src={product.image || product.img} alt={product.name} style={styles.image} />
        <span style={{
          ...styles.tag,
          fontSize: isMobile ? "8.5px" : "11px",
          padding: isMobile ? "3px 8px" : "6px 14px",
          top: isMobile ? "8px" : "16px",
          left: isMobile ? "8px" : "16px"
        }}>{product.category}</span>
      </div>

      {/* Cuerpo de Información Inteligente */}
      <div style={{
        ...styles.infoContainer,
        padding: isMobile ? "10px" : "26px"
      }}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Título truncado a 2 líneas para que no rompa el diseño */}
          <h3 style={{
            ...styles.prodName,
            fontSize: isMobile ? "13.5px" : "19px",
            height: isMobile ? "34px" : "auto", 
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical"
          }}>
            {product.hasColors ? `${product.name} (${selectedColor.name})` : product.name}
          </h3>

          {/* Descripción optimizada para celular */}
          <p style={{
            ...styles.prodDesc,
            fontSize: isMobile ? "11.5px" : "14px",
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 1 : "unset", // 1 línea en móvil para dar espacio a botones
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: isMobile ? "16px" : "auto",
            margin: isMobile ? "4px 0 8px 0" : "8px 0 16px 0"
          }}>{product.description}</p>
          
          {/* Selector de variantes ultra-adaptable */}
          {product.hasColors && (
            <div style={{ ...styles.colorSection, marginBottom: isMobile ? "10px" : "20px" }}>
              <span style={{...styles.colorLabel, fontSize: isMobile ? "10px" : "11px"}}>Ligas:</span>
              <div style={{ ...styles.colorRow, gap: isMobile ? "4px" : "8px" }}>
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
                        boxShadow: isCurrent ? "0 2px 4px rgba(0,0,0,0.15)" : "none",
                        width: isMobile ? "14px" : "24px",
                        height: isMobile ? "14px" : "24px"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Bloque inferior: Inversión arriba, Botón abajo para máxima comodidad de click */}
        <div style={{
          ...styles.footerRow,
          flexDirection: "column",
          alignItems: "stretch",
          gap: isMobile ? "6px" : "12px",
          marginTop: "auto"
        }}>
          <div style={{
            ...styles.priceCol,
            textAlign: isMobile ? "left" : "left"
          }}>
            <span style={styles.priceLabel}>Inversión</span>
            <span style={{
              ...styles.price,
              fontSize: isMobile ? "14.5px" : "19px"
            }}>${product.price}.00 <span style={styles.currency}>MXN</span></span>
          </div>
          <button 
            onClick={handleAdd} 
            style={{
              ...styles.addBtn,
              padding: isMobile ? "9px" : "12px 26px",
              fontSize: isMobile ? "11.5px" : "14px",
              borderRadius: isMobile ? "8px" : "16px",
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
  heroSection: { textAlign: "center", marginBottom: "15px", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" },
  badge: { backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 12px", borderRadius: "50px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "inline-block" },
  title: { color: "#023e8a", fontWeight: "900", margin: "0", letterSpacing: "-0.5px", lineHeight: "1.2" },
  subtitle: { color: "#64748b", maxWidth: "550px", lineHeight: "1.5", margin: "0" },
  filterWrapper: { display: "flex", justifyContent: "center", boxSizing: "border-box", width: "100%" },
  filterRow: { display: "flex", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(2, 62, 138, 0.02)", border: "1px solid #f1f5f9", boxSizing: "border-box" },
  filterBtn: { border: "1px solid", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease", borderRadius: "50px" },
  grid: { display: "grid", boxSizing: "border-box", width: "100%" },
  card: { background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.01)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.3s ease", boxSizing: "border-box" },
  imgContainer: { position: "relative", overflow: "hidden", backgroundColor: "#f8fafc", width: "100%" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(4px)", color: "#0f172a", borderRadius: "50px", fontWeight: "700", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  infoContainer: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", boxSizing: "border-box" },
  prodName: { fontWeight: "800", color: "#0f172a", margin: "0", lineHeight: "1.25" },
  prodDesc: { color: "#64748b", lineHeight: "1.3" },
  colorSection: { boxSizing: "border-box" },
  colorLabel: { display: "block", fontWeight: "700", color: "#475569", marginBottom: "4px" },
  colorRow: { display: "flex", flexWrap: "wrap" },
  colorCircle: { cursor: "pointer", padding: 0, borderRadius: "50%", transition: "all 0.2s ease" },
  footerRow: { display: "flex", boxSizing: "border-box" },
  priceCol: { display: "flex", flexDirection: "column" },
  priceLabel: { fontSize: "9px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.5px", marginBottom: "1px" },
  price: { fontWeight: "900", color: "#00b4d8", lineHeight: "1" },
  currency: { fontSize: "9px", fontWeight: "600", color: "#94a3b8" },
  addBtn: { background: "#023e8a", color: "white", border: "none", fontWeight: "800", cursor: "pointer", transition: "background 0.2s ease", boxShadow: "0 4px 12px rgba(2, 62, 138, 0.1)" }
};