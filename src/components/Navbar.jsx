import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const serviciosMenu = [
  { name: "Diagnóstico General", path: "diagnostico" },
  { name: "Limpieza Dental", path: "limpieza" },
  { name: "Restauración", path: "restauracion" },
  { name: "Ortodoncia", path: "ortodoncia" },
  { name: "Endodoncia", path: "endodoncia" },
  { name: "Periodoncia", path: "periodoncia" },
  { name: "Odontopediatría", path: "odontopediatria" },
  { name: "Estética Dental", path: "estetica" },
  { name: "Cirugía e Implantes", path: "cirugia" },
];

const HashLink = ({ to, children, className, style, smooth = true }) => {
  const handleClick = (e) => {
    const hash = to.split('#')[1];
    if (hash && document.getElementById(hash)) {
      e.preventDefault();
      document.getElementById(hash).scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };
  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

const DentalLogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="url(#gradAero)" fillOpacity="0.9" />
    <defs>
      <linearGradient id="gradAero" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#00b4d8", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#0077b6", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M32 14C26 14 20 18 20 28c0 6 2 10 5 14-2 3-4 6-4 10 0 2 1.5 3 3 3 2.5 0 4-2 5-5 .5-.5 1-.5 1.5 0 1 3 2.5 5 5 5 1.5 0 3-1 3-3 0-4-2-7-4-10 3-4 5-8 5-14 0-10-6-14-12-14z" fill="white" />
  </svg>
);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth() || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "#FFFFFF" : "#023e8a";

  return (
    <nav style={styles.navWrapper}>
      <div style={{ 
        ...styles.navContainer, 
        ...(scrolled ? styles.navScrolled : styles.navDefault)
      }}>
        
        <HashLink to="/#inicio" style={styles.logoContainer}>
          <DentalLogoIcon />
          <div style={styles.textStack}>
            <span style={{...styles.logoMain, color: textColor}}>DENTAL</span>
            <span style={styles.logoSub}>ITIZ</span>
          </div>
        </HashLink>

        <ul style={styles.menuList}>
          <li>
            <HashLink to="/#inicio" style={{...styles.link, color: textColor}} className="nav-aero-link">
              Inicio
            </HashLink>
          </li>
          
         
          <li 
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <HashLink 
              to="/#servicios" 
              style={{...styles.link, color: textColor, display: 'flex', alignItems: 'center', gap: '5px'}} 
              className="nav-aero-link"
            >
              Servicios <span style={{ fontSize: '0.7rem', transition: '0.3s', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
            </HashLink>

            {showDropdown && (
              <div style={styles.dropdownContainer}>
                <ul style={styles.dropdownMenu}>
                  {serviciosMenu.map((servicio, index) => (
                    <li key={index}>
                      <Link 
                        to={`/servicios/${servicio.path}`} 
                        style={styles.dropdownItem}
                        className="dropdown-hover-effect"
                        onClick={() => setShowDropdown(false)}
                      >
                        {servicio.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li>
            <HashLink to="/#dentistas" style={{...styles.link, color: textColor}} className="nav-aero-link">
              Dentistas
            </HashLink>
          </li>
          
          <li>
            <HashLink to="/#galeria" style={{...styles.link, color: textColor}} className="nav-aero-link">
              Galería
            </HashLink>
          </li>

          <li>
            <HashLink to="/#citas" style={{...styles.link, color: textColor}} className="nav-aero-link">
              Citas
            </HashLink>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/mis-citas" className="nav-aero-link" style={{...styles.link, color: "#00b4d8"}}>
                  MIS CITAS
                </Link>
              </li>
              <li style={{...styles.userLabel, color: scrolled ? "#00b4d8" : "#0077b6"}}>
                {user.email?.split('@')[0].toUpperCase()}
              </li>
              <li>
                <button onClick={logout} className="nav-aero-link" style={{...styles.logoutBtn, color: textColor}}>
                  SALIR
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-aero-link" style={{...styles.link, color: textColor}}>
                MI CUENTA
              </Link>
            </li>
          )}
          
          <li>
            <HashLink 
              smooth 
              to="/#contacto" 
              className="btn-energy-pulse"
              style={{ textDecoration: 'none' }}
            >
              CONTACTO
            </HashLink>
          </li>
        </ul>
      </div>

      <style>{`
        .nav-aero-link {
          text-decoration: none;
          padding: 10px 15px;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }
        .nav-aero-link:hover {
          background-color: rgba(0, 180, 216, 0.1);
          color: #00b4d8 !important;
        }
        .dropdown-hover-effect {
          display: block;
          padding: 12px 20px;
          text-decoration: none;
          color: #023e8a;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border-radius: 10px;
        }
        .dropdown-hover-effect:hover {
          background-color: #f0f9ff;
          color: #00b4d8;
          padding-left: 25px;
        }
        .btn-energy-pulse {
          background: linear-gradient(135deg, #00b4d8, #0077b6);
          color: white !important;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 900;
          transition: all 0.3s ease;
          display: inline-block;
          margin-left: 10px;
          box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

const styles = {
  navWrapper: {
    position: "fixed",
    top: "0",
    left: 0,
    right: 0,
    zIndex: 5000,
    display: "flex",
    justifyContent: "center",
    padding: "20px 0",
    pointerEvents: "none"
  },
  navContainer: {
    pointerEvents: "auto",
    width: "92%",
    maxWidth: "1350px", 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "100px",
    padding: "12px 35px",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  navDefault: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  },
  navScrolled: {
    backgroundColor: "rgba(1, 22, 39, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-5px) scale(0.98)",
  },
  logoContainer: { display: "flex", alignItems: "center", gap: "15px", textDecoration: "none" },
  textStack: { display: "flex", flexDirection: "column", lineHeight: "1" },
  logoMain: { fontSize: "1.5rem", fontWeight: "900", letterSpacing: "0.5px" },
  logoSub: { fontSize: "0.85rem", fontWeight: "700", color: "#00b4d8", letterSpacing: "2px" },
  menuList: { listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "5px" },
  link: { fontWeight: "800", fontSize: "1rem" },
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: "0",
    paddingTop: "15px",
    animation: "slideIn 0.3s ease forwards"
  },
  dropdownMenu: {
    backgroundColor: "white",
    minWidth: "240px",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    padding: "15px",
    listStyle: "none",
    margin: 0,
    border: "1px solid #f1f5f9"
  },
  userLabel: {
    fontWeight: "900",
    fontSize: "0.85rem",
    padding: "0 10px",
    letterSpacing: "1px",
    borderRight: "1px solid rgba(0, 180, 216, 0.3)"
  },
  logoutBtn: {
    fontWeight: "800",
    fontSize: "0.9rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit"
  }
};

export default Navbar;