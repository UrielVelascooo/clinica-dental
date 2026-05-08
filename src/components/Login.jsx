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
  const { user } = useAuth();
  const navigate = useNavigate();

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

      <div style={styles.card} className="glass-morphism">
        <header style={styles.header}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIcon}>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-4 0-7 3-7 7 0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z"></path>
                <circle cx="12" cy="9" r="2.5" fill="white"></circle>
              </svg>
            </div>
          </div>
          <h2 style={styles.title}>
            {isRegistering ? "Únete a la familia" : "Bienvenido"}
          </h2>
          <p style={styles.subtitle}>
            {isRegistering ? "Crea tu perfil en Dental ITIZ" : "Tu salud bucal, en un solo lugar"}
          </p>
        </header>

        {errorMsg && (
          <div style={styles.errorBadge} className="shake-anim">
            <span style={{marginRight: '8px'}}>✕</span> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                required
                
                style={styles.input}
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
                
                style={styles.input}
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

          <button type="submit" style={styles.mainButton} className="premium-btn">
            {isRegistering ? "CREAR CUENTA" : "ENTRAR"}
          </button>
        </form>

        <div style={styles.footer}>
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

        <button onClick={() => navigate("/")} style={styles.backHome}>
          ← Volver al inicio
        </button>
      </div>

      <style>{`
        .glass-morphism {
          animation: cardAppear 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .premium-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden"
  },
  blob1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "linear-gradient(135deg, rgba(0, 180, 216, 0.2), rgba(2, 62, 138, 0.2))",
    borderRadius: "50%",
    top: "-100px",
    right: "-100px",
    filter: "blur(80px)",
    zIndex: 0
  },
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "linear-gradient(135deg, rgba(0, 119, 182, 0.15), rgba(0, 180, 216, 0.1))",
    borderRadius: "50%",
    bottom: "-50px",
    left: "-50px",
    filter: "blur(80px)",
    zIndex: 0
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(25px)",
    padding: "60px 45px",
    borderRadius: "40px",
    boxShadow: "0 50px 100px -20px rgba(2, 62, 138, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.5)",
    width: "100%",
    maxWidth: "460px",
    zIndex: 1,
    position: "relative"
  },
  header: { textAlign: "center", marginBottom: "40px" },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  logoIcon: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #023e8a, #00b4d8)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(2, 62, 138, 0.2)"
  },
  title: { color: "#0a2540", fontSize: "32px", fontWeight: "900", marginBottom: "10px", letterSpacing: "-1px" },
  subtitle: { color: "#64748b", fontSize: "16px", fontWeight: "500" },
  errorBadge: {
    background: "#fff1f2",
    color: "#e11d48",
    padding: "14px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "25px",
    border: "1px solid rgba(225, 29, 72, 0.1)",
    display: "flex",
    alignItems: "center"
  },
  form: { display: "flex", flexDirection: "column", gap: "25px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontSize: "11px", fontWeight: "800", color: "#023e8a", letterSpacing: "1.5px", paddingLeft: "4px" },
  forgotPass: { fontSize: "11px", fontWeight: "700", color: "#00b4d8", cursor: "pointer" },
  inputWrapper: { position: "relative" },
  input: {
    width: "100%",
    padding: "18px 20px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.5)",
    color: "#1e293b",
    fontWeight: "600",
    boxSizing: "border-box"
  },
  eyeButton: {
    position: "absolute",
    right: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.6
  },
  mainButton: {
    padding: "20px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg, #023e8a 0%, #0077b6 100%)",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 20px 40px -10px rgba(2, 62, 138, 0.3)",
    letterSpacing: "0.5px"
  },
  footer: { marginTop: "35px", textAlign: "center" },
  footerText: { color: "#64748b", fontSize: "14px", marginBottom: "8px" },
  switchButton: {
    background: "none",
    border: "none",
    color: "#023e8a",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "4px"
  },
  backHome: {
    marginTop: "30px",
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    display: "block",
    width: "100%",
    transition: "color 0.2s ease"
  }
};

export default Login;