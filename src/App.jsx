// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"; 
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import { CartProvider, useCart } from "./context/CartContext"; 
import { useEffect, useState } from "react";

// Componentes del Layout General y Secciones básicas
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Nosotros from "./components/Dentists";
import Gallery from "./components/Gallery";
import Appointment from "./components/Appointment"; 
import Contact from "./components/Contact";
import Login from "./components/Login";
import Whatsapp from "./components/Whatsapp";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import MyAppointments from "./pages/MyAppointments";
import MyOrders from "./pages/MyOrders"; 
import AdminDashboard from "./pages/AdminDashboard"; 

// Componentes de la Tienda y Checkout Independiente
import Tienda from "./components/Tienda";
import Checkout from "./components/Checkout"; 

/**
 * Componente Auxiliar: Control de Scroll al cambiar de ruta
 * Asegura que la pantalla siempre suba al inicio al navegar entre componentes independientes.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Componente Vista de Desglose del Carrito (Adaptativo y Limpio)
 */
function VistaCarrito() {
  // Consumimos directamente las acciones limpias y corregidas del CartContext
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();
  const { user } = useAuth(); 
  const navigate = useNavigate(); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (cart.length === 0) {
    return (
      <div style={{ padding: isMobile ? "120px 20px 80px" : "160px 40px 100px", maxWidth: "800px", margin: "0 auto", textAlign: 'center', boxSizing: "border-box" }}>
        <h1 style={{ color: "#023e8a", fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: "900" }}>Tu Carrito está vacío</h1>
        <p style={{ color: "#666", marginTop: "15px", marginBottom: "30px" }}>Parece que aún no has agregado productos del catálogo.</p>
        <Link to="/tienda" style={{ backgroundColor: "#00b4d8", color: "white", padding: "12px 30px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", display: "inline-block" }}>
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  const handleProcederAlPago = () => {
    if (!user) {
      alert("Para proceder con tu compra de forma segura, por favor inicia sesión o crea una cuenta.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div style={{ padding: isMobile ? "100px 16px 60px" : "140px 20px 80px", maxWidth: "1000px", margin: "0 auto", boxSizing: "border-box" }}>
      <h1 style={{ color: "#023e8a", fontSize: isMobile ? "1.8rem" : "2.3rem", fontWeight: "900", marginBottom: isMobile ? "25px" : "40px" }}> Tu Carrito de Compras </h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map((item) => (
          <div key={item.id} style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center", 
            justifyContent: "space-between", 
            backgroundColor: "white", 
            padding: isMobile ? "16px" : "20px", 
            borderRadius: "20px", 
            border: "1px solid #e2e8f0", 
            boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
            gap: isMobile ? "15px" : "0px",
            boxSizing: "border-box"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img 
                src={item.image || item.img || "https://via.placeholder.com/150"} 
                alt={item.name} 
                style={{ width: isMobile ? "60px" : "70px", height: isMobile ? "60px" : "70px", borderRadius: "12px", objectFit: "cover" }} 
              />
              <div>
                <h3 style={{ color: "#023e8a", fontSize: "1.1rem", margin: "0 0 5px 0", fontWeight: "800" }}>{item.name}</h3>
                <p style={{ color: "#00b4d8", fontWeight: "700", margin: 0 }}>${item.price}.00 c/u</p>
              </div>
            </div>

            {/* Controles de Cantidad */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: isMobile ? "space-between" : "center",
              gap: "15px", 
              backgroundColor: "#f8fafc", 
              padding: "8px 16px", 
              borderRadius: "50px", 
              border: "1px solid #e2e8f0" 
            }}>
              {/* Botón menos (-): Ejecuta la resta en el contexto */}
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: item.quantity > 1 ? "#64748b" : "#cbd5e1", 
                  fontWeight: "bold", 
                  cursor: item.quantity > 1 ? "pointer" : "not-allowed", 
                  fontSize: "1.2rem", 
                  padding: "0 10px" 
                }}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              
              <span style={{ fontWeight: "800", color: "#023e8a", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
              
              {/* Botón más (+): Suma 1 usando el comportamiento nativo */}
              <button onClick={() => addToCart(item)} style={{ background: "none", border: "none", color: "#64748b", fontWeight: "bold", cursor: "pointer", fontSize: "1.2rem", padding: "0 10px" }}>+</button>
            </div>

            {/* Subtotal del artículo y Eliminación Total */}
            <div style={{ textAlign: isMobile ? "left" : "right", display: "flex", flexDirection: isMobile ? "row-reverse" : "column", justifyContent: isMobile ? "space-between" : "center", alignItems: isMobile ? "center" : "flex-end" }}>
              <p style={{ fontSize: "1.2rem", fontWeight: "900", color: "#023e8a", margin: "0" }}>${item.price * item.quantity}.00</p>
              {/* Botón Eliminar: Pasa el flag 'true' para ignorar la cantidad y remover todo */}
              <button onClick={() => removeFromCart(item.id, true)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Eliminar</button>
            </div>
          </div>
        ))}

        {/* Resumen Final de Compra */}
        <div style={{ 
          marginTop: "20px", 
          padding: isMobile ? "20px" : "30px", 
          backgroundColor: "#f8fafc", 
          borderRadius: "24px", 
          border: "1px solid #e2e8f0", 
          display: "flex", 
          flexDirection: isMobile ? "column-reverse" : "row",
          justifyContent: "space-between", 
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? "25px" : "0px",
          boxSizing: "border-box"
        }}>
          <button onClick={clearCart} style={{ backgroundColor: "transparent", color: "#64748b", border: "1px solid #cbd5e1", padding: "12px 20px", borderRadius: "50px", fontWeight: "700", cursor: "pointer" }}>
            Vaciar Carrito
          </button>
          
          <div style={{ textAlign: isMobile ? "center" : "right" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#64748b", fontSize: "1.1rem" }}>Total Estimado:</h3>
            <span style={{ fontSize: "2.2rem", fontWeight: "900", color: "#023e8a", display: "block", marginBottom: "15px" }}>${getCartTotal()}.00</span>
            
            <button 
              onClick={handleProcederAlPago} 
              style={{ backgroundColor: "#023e8a", color: "white", border: "none", display: "block", width: isMobile ? "100%" : "auto", padding: "14px 40px", borderRadius: "50px", fontWeight: "800", fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(2, 62, 138, 0.3)", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#00b4d8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#023e8a"}
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const layoutStyle = {
  width: "92%",
  maxWidth: "1300px",
  margin: "0 auto",
};

/**
 * Componente Home
 */
function Home() {
  return (
    <>
      <section id="inicio">
        <Hero />
      </section>
      
      <div style={layoutStyle}>
        <section id="Nosotros" style={{ padding: "80px 0" }}>
          <Nosotros />
        </section> 
        
        <section id="servicios" style={{ padding: "80px 0" }}>
          <Services />
        </section>
        
        <section id="galeria" style={{ padding: "80px 0" }}>
          <Gallery />
        </section>
        
        <section id="citas" style={{ padding: "80px 0" }}>
          <Appointment />
        </section>
        
        <section id="contacto" style={{ padding: "100px 0" }}>
          <Contact />
        </section>
      </div>
      
      <div style={{ height: "10vh" }}></div>
    </>
  );
}

/**
 * Enrutador Principal del Sistema
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios/:id" element={<ServiceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mis-citas" element={<MyAppointments />} />
            <Route path="/mis-compras" element={<MyOrders />} />
            
            {/* Ruta del Panel de Administración Avanzado */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Rutas comerciales perfectamente integradas */}
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<VistaCarrito />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          
          <Whatsapp />
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;