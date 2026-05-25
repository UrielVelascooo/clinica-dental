import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // 🔑 Contexto de autenticación
import { useNavigate } from "react-router-dom";

// 📌 IMPORTACIÓN DEL ARCHIVO DE CONFIGURACIÓN DE FIREBASE
import { db } from "../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth(); // 🔑 Jalamos el usuario activo
  const navigate = useNavigate();
  
  const [method, setMethod] = useState("card"); // card, oxxo, paypal
  const [loading, setLoading] = useState(false);
  const [fichaOxxo, setFichaOxxo] = useState(null); // Guarda los datos de la ficha si eligen OXXO

  // Estados locales para el formulario de tarjeta inteligente
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState(""); // visa, mastercard o vacío

  // Detector de pantalla móvil en tiempo real
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPagar = getCartTotal();

  // 🛠️ FUNCIÓN INTERNA: Estructura y guarda la orden de manera automática en la colección "orders"
  const registrarOrdenEnFirebase = async (metodoPago, estadoInicial = "completado") => {
    if (!user) return null;

    try {
      const itemsProcesados = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || item.img || "https://via.placeholder.com/150", 
        ...(item.color && { color: item.color })
      }));

      const nuevaCompra = {
        userId: user.uid,
        userEmail: user.email,
        items: itemsProcesados,
        total: totalPagar,
        paymentMethod: metodoPago,
        status: estadoInicial,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "orders"), nuevaCompra);
      return docRef.id;
    } catch (error) {
      console.error("Error crítico guardando la orden en Firestore:", error);
      throw error;
    }
  };

  // 💳 MANEJADORES INTELIGENTES PARA INPUTS DE TARJETA
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.startsWith("4")) {
      setCardType("visa");
    } else if (value.startsWith("5")) {
      setCardType("mastercard");
    } else {
      setCardType("");
    }

    if (value.length > 16) value = value.slice(0, 16);

    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(" ") : "";
    
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setCardExpiry(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCardCvv(value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Por favor, inicia sesión para continuar con tu proceso de pago.");
      return navigate("/login");
    }

    if (cart.length === 0 && !fichaOxxo) {
      alert("Tu carrito de compras está vacío.");
      return navigate("/tienda");
    }

    setLoading(true);

    if (method === "paypal") {
      try {
        await registrarOrdenEnFirebase("paypal", "completado");
        setTimeout(() => {
          setLoading(false);
          window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&amount=${totalPagar}&currency_code=MXN`, "_blank");
          clearCart();
        }, 1500);
      } catch (err) {
        setLoading(false);
        alert("Ocurrió un error al preparar tu pasarela de PayPal.");
      }
      return;
    }

    if (method === "oxxo") {
      try {
        const ordenId = await registrarOrdenEnFirebase("oxxo", "pendiente");
        setTimeout(() => {
          setLoading(false);
          const refAleatoria = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join("");
          const refFormateada = refAleatoria.replace(/(\d{4})(\d{4})(\d{4})(\d{2})/, "$1-$2-$3-$4");
          
          setFichaOxxo({
            idFirebase: ordenId,
            referencia: refFormateada,
            monto: totalPagar,
            fechaExpiracion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("es-MX")
          });
        }, 2000);
      } catch (err) {
        setLoading(false);
        alert("Ocurrió un error al generar tu orden de OXXO Pay.");
      }
      return;
    }

    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
        setLoading(false);
        return alert("Por favor, introduce los datos de tarjeta completos y válidos.");
      }

      try {
        const ordenId = await registrarOrdenEnFirebase("card", "completado");
        setTimeout(() => {
          setLoading(false);
          alert(`¡Pago con Tarjeta aprobado con éxito!\nTu orden #${ordenId} ha sido registrada. Gracias por tu compra.`);
          clearCart();
          navigate("/tienda");
        }, 2500);
      } catch (err) {
        setLoading(false);
        alert("Hubo un error al procesar tu tarjeta con la base de datos.");
      }
    }
  };

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? "80px 12px 30px 12px" : "160px 20px 80px 20px"
    }}>
      <div style={{
        ...styles.grid,
        gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
        gap: isMobile ? "16px" : "40px"
      }}>
        
        {/* COLUMNA: Resumen de Compra O Ficha Digital OXXO Pay */}
        <div style={{
          ...styles.summaryCard,
          order: isMobile && !fichaOxxo ? 2 : 1, 
          padding: isMobile ? "16px" : "30px"
        }}>
          {fichaOxxo ? (
            <div style={styles.oxxoTicket}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "900", color: "#E31B23" }}>OXXO<span style={{ color: "#000" }}>PAY</span></span>
                <span style={{...styles.badgeEfectivo, fontSize: isMobile ? "10px" : "12px", padding: isMobile ? "2px 8px" : "4px 10px"}}>Efectivo</span>
              </div>
              
              <h4 style={{ margin: "0 0 2px 0", fontSize: "10px", color: "#64748b" }}>MONTO A PAGAR TOTAL</h4>
              <p style={{ margin: "0 0 12px 0", fontSize: isMobile ? "1.4rem" : "2.2rem", fontWeight: "900", color: "#0f172a" }}>${fichaOxxo.monto}.00 MXN</p>
              
              <div style={{ background: "#fff", padding: "10px", borderRadius: "10px", border: "1px dashed #cbd5e1", marginBottom: "12px", width: "100%", boxSizing: "border-box" }}>
                <span style={{ display: "block", fontSize: "9px", fontWeight: "700", color: "#64748b", marginBottom: "2px", letterSpacing: "0.5px" }}>REFERENCIA DE PAGO DIGITAL</span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? "13px" : "18px", fontWeight: "bold", color: "#0f172a", letterSpacing: "0.5px", display: "block", width: "100%", wordBreak: "break-all" }}>{fichaOxxo.referencia}</span>
              </div>

              <div style={{...styles.barcodeContainer, padding: isMobile ? "10px" : "16px"}}>
                <div style={{...styles.barcodeLines, fontSize: isMobile ? "14px" : "28px"}}>{isMobile ? "|||| |||| |||| ||||" : "||||| | |||| || ||| |||| | |||| || ||| ||||| | |||"}</div>
                <span style={{ fontSize: "9px", color: "#94a3b8", fontFamily: "monospace", marginTop: "2px", wordBreak: "break-all" }}>{fichaOxxo.referencia.replace(/-/g, "")}</span>
              </div>

              <p style={{ fontSize: isMobile ? "11px" : "12px", color: "#64748b", lineHeight: "1.4", margin: "12px 0 0 0", textAlign: "center" }}>
                Presenta este código en caja. Tienes hasta el <strong>{fichaOxxo.fechaExpiracion}</strong> antes de que expire la orden de pago. <br />
                <span style={{fontSize: '9px', color: '#94a3b8', display: "block", marginTop: "4px", wordBreak: "break-all"}}>ID Orden: {fichaOxxo.idFirebase}</span>
              </p>
              
              <button 
                onClick={() => { setFichaOxxo(null); clearCart(); navigate("/tienda"); }} 
                style={{ width: "100%", marginTop: "12px", padding: "12px", background: "#023e8a", color: "white", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: isMobile ? "12px" : "14px" }}
              >
                Entendido, Vaciar y Regresar
              </button>
            </div>
          ) : (
            <>
              <h3 style={{...styles.sectionTitle, fontSize: isMobile ? "15px" : "20px", marginBottom: isMobile ? "10px" : "20px"}}>Resumen de Compra</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {cart.map(item => (
                  <div key={item.id} style={styles.itemRow}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                      <img 
                        src={item.image || item.img || "https://via.placeholder.com/150"} 
                        alt={item.name} 
                        style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: isMobile ? "12px" : "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#1e293b" }}>
                        {item.name} <strong style={{ color: "#64748b" }}>(x{item.quantity})</strong>
                      </span>
                    </div>
                    <span style={{fontWeight:'700', fontSize: isMobile ? "12px" : "14px", color: "#0f172a", marginLeft: "10px", flexShrink: 0 }}>
                      ${item.price * item.quantity}.00
                    </span>
                  </div>
                ))}
              </div>
              <div style={styles.totalRow}>
                <span style={{ fontSize: isMobile ? "13px" : "16px", color: "#64748b" }}>Total a pagar:</span>
                <span style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: "900", color: "#023e8a" }}>${totalPagar}.00 MXN</span>
              </div>
            </>
          )}
        </div>

        {/* COLUMNA: Pasarela de Formulario y Opciones */}
        <div style={{
          ...styles.paymentCard,
          order: isMobile ? 1 : 2,
          padding: isMobile ? "16px" : "30px"
        }}>
          <h3 style={{...styles.sectionTitle, fontSize: isMobile ? "15px" : "20px", marginBottom: isMobile ? "10px" : "20px"}}>Método de Pago</h3>
          <div style={styles.tabs}>
            {["card", "oxxo", "paypal"].map(m => (
              <button 
                key={m} 
                type="button"
                disabled={!!fichaOxxo}
                onClick={() => setMethod(m)}
                style={{
                  ...styles.tabBtn, 
                  borderColor: method === m ? "#023e8a" : "#e2e8f0", 
                  background: method === m ? "#f0fdfa" : "white",
                  color: method === m ? "#023e8a" : "#64748b",
                  opacity: fichaOxxo ? 0.5 : 1,
                  cursor: fichaOxxo ? "not-allowed" : "pointer",
                  fontSize: isMobile ? "11px" : "14px",
                  padding: isMobile ? "8px 2px" : "14px 10px",
                  borderRadius: isMobile ? "8px" : "12px"
                }}
              >
                {m === "card" && (isMobile ? "Tarjeta" : "💳 Tarjeta")}
                {m === "oxxo" && (isMobile ? "OXXO" : "🏪 OXXO")}
                {m === "paypal" && (isMobile ? "PayPal" : "🔹 PayPal")}
              </button>
            ))}
          </div>

          <form onSubmit={handlePayment} style={{marginTop: isMobile ? '16px' : '25px'}}>
            {method === "card" && (
              <div style={{...styles.formGap, gap: isMobile ? "10px" : "15px"}}>
                <span style={{fontSize: "11px", color: "#64748b", display: "block", marginBottom: "2px", wordBreak: "break-all"}}>
                  Registrando compra para: <strong style={{color: "#0f172a"}}>{user?.email}</strong>
                </span>
                
                {/* Input de Tarjeta */}
                <div style={{ position: "relative", width: "100%" }}>
                  <input 
                    type="text" 
                    placeholder={isMobile ? "Número de Tarjeta" : "Número de Tarjeta (16 dígitos)"}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required 
                    style={{...styles.input, padding: isMobile ? "10px" : "15px", fontSize: isMobile ? "12.5px" : "14px", borderRadius: isMobile ? "8px" : "12px"}}
                  />
                  {cardType && !isMobile && (
                    <span style={{
                      position: "absolute", 
                      right: "15px", 
                      top: "50%", 
                      transform: "translateY(-50%)", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      color: cardType === "visa" ? "#0057b8" : "#ff5f00",
                      backgroundColor: "#f8fafc",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1"
                    }}>
                      {cardType === "visa" ? "🟦 VISA" : "🟧 MASTERCARD"}
                    </span>
                  )}
                </div>

                <div style={{display: 'flex', gap: isMobile ? '8px' : '15px', width: "100%"}}>
                  <input 
                    type="text" 
                    placeholder="MM/AA" 
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    required 
                    style={{...styles.input, padding: isMobile ? "10px" : "15px", fontSize: isMobile ? "12.5px" : "14px", borderRadius: isMobile ? "8px" : "12px", flex: 1}}
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    value={cardCvv}
                    onChange={handleCvvChange}
                    required 
                    style={{...styles.input, padding: isMobile ? "10px" : "15px", fontSize: isMobile ? "12.5px" : "14px", borderRadius: isMobile ? "8px" : "12px", flex: 1}}
                  />
                </div>
              </div>
            )}

            {method === "oxxo" && !fichaOxxo && (
              <div style={{ padding: isMobile ? "10px" : "14px", backgroundColor: "#fef3c7", border: "1px solid #fde68a", borderRadius: isMobile ? "8px" : "12px" }}>
                <p style={{...styles.infoText, fontSize: isMobile ? "12px" : "14px"}}>Se generará una ficha digital interactiva enlazada al total exacto de <strong>${totalPagar}.00 MXN</strong>.</p>
              </div>
            )}

            {method === "paypal" && (
              <div style={{ padding: isMobile ? "10px" : "14px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: isMobile ? "8px" : "12px" }}>
                <p style={{...styles.infoText, fontSize: isMobile ? "12px" : "14px"}}>Serás redireccionado de forma real a PayPal para validar tu sesión por un monto de <strong>${totalPagar}.00 MXN</strong>.</p>
              </div>
            )}

            <button type="submit" disabled={loading || !!fichaOxxo} style={{ ...styles.payBtn, opacity: fichaOxxo ? 0.4 : 1, padding: isMobile ? "12px" : "18px", fontSize: isMobile ? "13px" : "15px", marginTop: isMobile ? "16px" : "25px", borderRadius: isMobile ? "8px" : "12px" }}>
              {loading ? "PROCESANDO TRANSACCIÓN..." : method === "oxxo" ? "GENERAR REFERENCIA OXXO" : method === "paypal" ? "PAGAR CON PAYPAL ↗" : `PAGAR $${totalPagar}.00 MXN`}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "1000px", margin: "0 auto", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", width: "100%" },
  grid: { display: "grid", alignItems: "start", boxSizing: "border-box", width: "100%" },
  summaryCard: { background: "#f8fafc", borderRadius: "24px", border: "1px solid #e2e8f0", boxSizing: "border-box", width: "100%" },
  paymentCard: { background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0", boxSizing: "border-box", width: "100%" },
  sectionTitle: { fontWeight: "900", color: "#0a2540", marginTop: 0 },
  itemRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0", boxSizing: "border-box", width: "100%" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #cbd5e1", marginTop: "15px", paddingTop: "15px", boxSizing: "border-box", width: "100%" },
  tabs: { display: "flex", gap: "6px", width: "100%", boxSizing: "border-box" },
  tabBtn: { flex: 1, border: "2px solid", fontWeight: "800", transition: "all 0.2s ease", boxSizing: "border-box", cursor: "pointer" },
  formGap: { display: "flex", flexDirection: "column", boxSizing: "border-box", width: "100%" },
  input: { width: "100%", border: "1px solid #cbd5e1", boxSizing: "border-box", outline: "none", transition: "all 0.2s ease", color: "#0f172a" },
  infoText: { color: "#475569", lineHeight: "1.5", margin: 0 },
  payBtn: { width: "100%", background: "linear-gradient(135deg, #023e8a, #0077b6)", color: "white", border: "none", fontWeight: "800", cursor: "pointer", boxShadow: "0 4px 12px rgba(2,62,138,0.15)" },
  oxxoTicket: { background: "#fff", padding: "4px", borderRadius: "12px", boxSizing: "border-box", width: "100%" },
  badgeEfectivo: { background: "#fef3c7", color: "#d97706", borderRadius: "50px", fontWeight: "800" },
  barcodeContainer: { display: "flex", flexDirection: "column", alignItems: "center", background: "#f8fafc", borderRadius: "12px", boxSizing: "border-box", width: "100%", border: "1px solid #e2e8f0" },
  barcodeLines: { fontFamily: "'Courier New', Courier, monospace", fontWeight: "100", letterSpacing: "-1px", color: "#0f172a", lineHeight: 1, margin: 0, textAlign: "center", width: "100%", overflow: "hidden" }
};