import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Estado para controlar la responsividad dinámica en línea
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      let mensaje = "Ocurrió un error inesperado";
      if (error.code === 'auth/weak-password') mensaje = "La contraseña es muy corta.";
      if (error.code === 'auth/email-already-in-use') mensaje = "Este correo ya está registrado.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') mensaje = "Credenciales incorrectas.";
      setErrorMsg(mensaje);
    }
  };

  return (
    <div style={styles.container}>
      {/* Elementos decorativos de fondo para UX Innovador */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div 
        style={{
          ...styles.card,
          padding: isMobile ? "40px 24px" : "60px 45px",
          borderRadius: isMobile ? "30px" : "40px"
        }} 
        className="glass-morphism"
      >
        <header style={{
          ...styles.header,
          marginBottom: isMobile ? "30px" : "40px"
        }}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIcon}>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-4 0-7 3-7 7 0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z"></path>
                <circle cx="12" cy="9" r="2.5" fill="white"></circle>
              </svg>
            </div>
          </div>
          <h2 style={{
            ...styles.title,
            fontSize: isMobile ? "26px" : "32px"
          }}>
            {isRegistering ? "Únete a la familia" : "Bienvenido"}
          </h2>
          <p style={{
            ...styles.subtitle,
            fontSize: isMobile ? "14px" : "16px"
          }}>
            {isRegistering ? "Crea tu perfil en Dental ITIZ" : "Tu salud bucal, en un solo lugar"}
          </p>
        </header>

        {errorMsg && (
          <div style={styles.errorBadge} className="shake-anim">
            <span style={{marginRight: '8px', shrink: 0}}>✕</span> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                required
                style={{
                  ...styles.input,
                  padding: isMobile ? "16px 18px" : "18px 20px"
                }}
                className="premium-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <label style={styles.label}>CONTRASEÑA</label>
            </div>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                required
                style={{
                  ...styles.input,
                  padding: isMobile ? "16px 45px 16px 18px" : "18px 50px 18px 20px"
                }}
                className="premium-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.mainButton,
              padding: isMobile ? "16px" : "20px"
            }} 
            className="premium-btn"
          >
            {isRegistering ? "CREAR CUENTA" : "ENTRAR"}
          </button>
        </form>

        <div style={{
          ...styles.footer,
          marginTop: isMobile ? "25px" : "35px"
        }}>
          <p style={styles.footerText}>
            {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes una cuenta todavía?"}
          </p>
          <button
            onClick={() => { setIsRegistering(!isRegistering); setErrorMsg(""); }}
            style={styles.switchButton}
          >
            {isRegistering ? "Inicia Sesión" : "Regístrate ahora"}
          </button>
        </div>

        <button onClick={() => navigate("/")} style={styles.backHome} className="back-home-btn">
          ← Volver al inicio
        </button>
      </div>

      <style>{`
        .glass-morphism {
          animation: cardAppear 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: scale(0.97) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .premium-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-appearance: none; /* Elimina estilos por defecto de iOS */
        }
        .premium-input:focus {
          background: #ffffff !important;
          border-color: #00b4d8 !important;
          box-shadow: 0 10px 20px -10px rgba(0, 180, 216, 0.3);
          transform: translateY(-2px);
        }
        .premium-btn {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .premium-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(2, 62, 138, 0.3);
          filter: brightness(1.1);
        }
        .premium-btn:active {
          transform: translateY(-1px);
        }
        .back-home-btn:hover {
          color: #023e8a !important;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .shake-anim { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f4f8",
    padding: "16px",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  blob1: {
    position: "absolute",
    width: "40vw",
    height: "40vw",
    minWidth: "280px",
    background: "linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(2, 62, 138, 0.2))",
    borderRadius: "50%",
    top: "-10%",
    right: "-10%",
    filter: "blur(80px)",
    zIndex: 0
  },
  blob2: {
    position: "absolute",
    width: "35vw",
    height: "35vw",
    minWidth: "250px",
    background: "linear-gradient(135deg, rgba(0, 119, 182, 0.15), rgba(0, 180, 216, 0.1))",
    borderRadius: "50%",
    bottom: "-8%",
    left: "-8%",
    filter: "blur(80px)",
    zIndex: 0
  },
  card: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)", /* Soporte nativo Safari móvil */
    boxShadow: "0 40px 80px -15px rgba(2, 62, 138, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6)",
    width: "100%",
    maxWidth: "450px",
    zIndex: 1,
    position: "relative",
    boxSizing: "border-box"
  },
  header: { textAlign: "center" },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px"
  },
  logoIcon: {
    width: "55px",
    height: "55px",
    background: "linear-gradient(135deg, #023e8a, #00b4d8)",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(2, 62, 138, 0.15)"
  },
  title: { color: "#0a2540", fontWeight: "900", marginBottom: "8px", letterSpacing: "-1px" },
  subtitle: { color: "#64748b", fontWeight: "500" },
  errorBadge: {
    background: "#fff1f2",
    color: "#e11d48",
    padding: "12px 14px",
    borderRadius: "14px",
    fontSize: "13.5px",
    fontWeight: "600",
    marginBottom: "20px",
    border: "1px solid rgba(225, 29, 72, 0.1)",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", fontWeight: "800", color: "#023e8a", letterSpacing: "1.5px", paddingLeft: "4px" },
  inputWrapper: { position: "relative" },
  input: {
    width: "100%",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.6)",
    color: "#1e293b",
    fontWeight: "600",
    boxSizing: "border-box"
  },
  eyeButton: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.6,
    padding: "4px"
  },
  mainButton: {
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #023e8a 0%, #0077b6 100%)",
    color: "white",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 15px 30px -8px rgba(2, 62, 138, 0.25)",
    letterSpacing: "0.5px"
  },
  footer: { textAlign: "center" },
  footerText: { color: "#64748b", fontSize: "13.5px", marginBottom: "6px" },
  switchButton: {
    background: "none",
    border: "none",
    color: "#023e8a",
    fontSize: "14.5px",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "4px"
  },
  backHome: {
    marginTop: "25px",
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    display: "block",
    width: "100%",
    transition: "color 0.2s ease",
    padding: "4px"
  }
};

export default Login;