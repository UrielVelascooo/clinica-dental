import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

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

const HashLink = ({ to, children, className, style, smooth = true, onClick }) => {
  const handleClick = (e) => {
    if (onClick) onClick();
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
  <svg width="36" height="36" viewBox="0 0 64 64" fill="none" style={{ shrink: 0 }}>
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

const CartIcon = ({ size = 22, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s ease" }}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const { user, logout } = useAuth() || {};
  const { cart } = useCart() || { cart: [] };

  const isAdmin = user && user.email === "uro.ve90@gmail.com";
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const textColor = scrolled ? "#FFFFFF" : "#023e8a";

  return (
    <nav style={{
      ...styles.navWrapper,
      padding: isMobile ? "10px 0" : "20px 0"
    }}>
      <div style={{ 
        ...styles.navContainer, 
        ...(scrolled ? styles.navScrolled : styles.navDefault),
        width: isMobile ? "94%" : "92%",
        padding: isMobile ? "10px 20px" : "12px 35px",
      }}>
        
        {/* LOGO */}
        <HashLink to="/#inicio" style={styles.logoContainer} onClick={() => setMobileMenuOpen(false)}>
          <DentalLogoIcon />
          <div style={styles.textStack}>
            <span style={{...styles.logoMain, color: textColor, fontSize: isMobile ? "1.2rem" : "1.5rem"}}>DENTAL</span>
            <span style={styles.logoSub}>ITIZ</span>
          </div>
        </HashLink>

        {/* CONTENEDOR DERECHO EN MÓVIL (CARRITO + HAMBURGUESA) */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto' }}>
            <Link to="/carrito" style={styles.cartContainer} className="nav-cart-btn">
              <CartIcon color={textColor} size={20} />
              {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              style={{ ...styles.burgerBtn, color: textColor }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        )}

        {/* MENÚ DE NAVEGACIÓN (ESCRITORIO / MÓVIL DESPLEGABLE) */}
        <ul style={{
          ...styles.menuList,
          ...(isMobile ? (mobileMenuOpen ? styles.menuMobileOpen : styles.menuMobileClosed) : {})
        }}>
          <li>
            <HashLink to="/#inicio" style={{...styles.link, color: isMobile ? "#023e8a" : textColor}} className="nav-aero-link" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </HashLink>
          </li>
          
          {/* DESPLEGABLE DE SERVICIOS */}
          <li 
            style={{ position: 'relative' }}
            onMouseEnter={() => !isMobile && setShowDropdown(true)}
            onMouseLeave={() => !isMobile && setShowDropdown(false)}
            onClick={() => isMobile && setShowDropdown(!showDropdown)}
          >
            <span 
              style={{...styles.link, color: isMobile ? "#023e8a" : textColor, display: 'flex', alignItems: 'center', gap: '5px'}} 
              className="nav-aero-link"
            >
              Servicios <span style={{ fontSize: '0.7rem', transition: '0.3s', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
            </span>

            {showDropdown && (
              <div style={{...styles.dropdownContainer, position: isMobile ? 'static' : 'absolute'}}>
                <ul style={{...styles.dropdownMenu, maxHeight: isMobile ? "250px" : "none", overflowY: isMobile ? "auto" : "visible"}}>
                  {serviciosMenu.map((servicio, index) => (
                    <li key={index}>
                      <Link 
                        to={`/servicios/${servicio.path}`} 
                        style={styles.dropdownItem}
                        className="dropdown-hover-effect"
                        onClick={() => { setShowDropdown(false); setMobileMenuOpen(false); }}
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
            <HashLink to="/#Nosotros" style={{...styles.link, color: isMobile ? "#023e8a" : textColor}} className="nav-aero-link" onClick={() => setMobileMenuOpen(false)}>
              Nosotros
            </HashLink>
          </li>
          
          <li>
            <HashLink to="/#galeria" style={{...styles.link, color: isMobile ? "#023e8a" : textColor}} className="nav-aero-link" onClick={() => setMobileMenuOpen(false)}>
              Galería
            </HashLink>
          </li>

          <li>
            <Link to="/tienda" style={{...styles.link, color: isMobile ? "#023e8a" : textColor, display: 'flex', alignItems: 'center', gap: '6px'}} className="nav-aero-link" onClick={() => setMobileMenuOpen(false)}>
              <span style={{ fontSize: '1.1rem' }}>🛍️</span> Tienda
            </Link>
          </li>

          <li>
            <HashLink to="/#citas" style={{...styles.link, color: isMobile ? "#023e8a" : textColor}} className="nav-aero-link" onClick={() => setMobileMenuOpen(false)}>
              Citas
            </HashLink>
          </li>

          {user ? (
            <>
              <li 
                style={{ position: 'relative' }}
                onMouseEnter={() => !isMobile && setShowUserDropdown(true)}
                onMouseLeave={() => !isMobile && setShowUserDropdown(false)}
                onClick={() => isMobile && setShowUserDropdown(!showUserDropdown)}
              >
                <button className="nav-aero-link" style={{...styles.link, color: isAdmin ? "#10b981" : "#00b4d8", background: "none", border: "none", fontFamily: "inherit", display: 'flex', alignItems: 'center', gap: '5px', padding: "10px 15px", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start"}}>
                  {isAdmin ? "PANEL" : "MIS UNIDADES"} <span style={{ fontSize: '0.7rem', transition: '0.3s', transform: showUserDropdown ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                </button>

                {showUserDropdown && (
                  <div style={{...styles.dropdownContainer, position: isMobile ? 'static' : 'absolute'}}>
                    <ul style={styles.dropdownMenu}>
                      {/* 👑 SI ES ADMIN: Renderiza únicamente la opción del panel administrativo */}
                      {isAdmin ? (
                        <li>
                          <Link to="/admin" style={{...styles.dropdownItem, color: "#10b981"}} className="dropdown-hover-effect" onClick={() => { setShowUserDropdown(false); setMobileMenuOpen(false); }}>
                            ⚙️ Panel de Control
                          </Link>
                        </li>
                      ) : (
                        /* 👥 SI ES CLIENTE: Muestra las pestañas de compras y citas */
                        <>
                          <li><Link to="/mis-citas" style={styles.dropdownItem} className="dropdown-hover-effect" onClick={() => { setShowUserDropdown(false); setMobileMenuOpen(false); }}>📅 Mis Citas</Link></li>
                          <li><Link to="/mis-compras" style={styles.dropdownItem} className="dropdown-hover-effect" onClick={() => { setShowUserDropdown(false); setMobileMenuOpen(false); }}>🛍️ Mis Compras</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </li>

              <li style={{...styles.userLabel, color: "#0077b6", borderRight: isMobile ? "none" : "1px solid rgba(0, 180, 216, 0.3)", padding: isMobile ? "10px 0" : "0 10px"}}>
                {user.email?.split('@')[0].toUpperCase()}
              </li>
              <li>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="nav-aero-link" style={{...styles.logoutBtn, color: isMobile ? "#e11d48" : textColor, width: isMobile ? "100%" : "auto"}}>
                  SALIR
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-aero-link" style={{...styles.link, color: isMobile ? "#023e8a" : textColor}} onClick={() => setMobileMenuOpen(false)}>
                MI CUENTA
              </Link>
            </li>
          )}
          
          {/* Carrito en menú de escritorio solamente */}
          {!isMobile && (
            <li>
              <Link to="/carrito" style={styles.cartContainer} className="nav-cart-btn">
                <CartIcon color={textColor} />
                {totalItems > 0 && <span style={styles.cartBadge} className="badge-pop">{totalItems}</span>}
              </Link>
            </li>
          )}

          <li style={{ width: isMobile ? "100%" : "auto", textAlign: "center" }}>
            <HashLink smooth to="/#contacto" className="btn-energy-pulse" style={{ textDecoration: 'none', width: isMobile ? "80%" : "auto" }} onClick={() => setMobileMenuOpen(false)}>
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
        @media (min-width: 1025px) {
          .nav-aero-link:hover { background-color: rgba(0, 180, 216, 0.1); color: #00b4d8 !important; }
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
        .dropdown-hover-effect:hover { background-color: #f0f9ff; color: #00b4d8; padding-left: 25px; }
        .nav-cart-btn { display: flex; align-items: center; justify-content: center; padding: 10px; border-radius: 50%; transition: all 0.3s ease; position: relative; }
        .btn-energy-pulse {
          background: linear-gradient(135deg, #00b4d8, #0077b6);
          color: white !important;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 900;
          transition: all 0.3s ease;
          display: inline-block;
          box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
        }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </nav>
  );
}

const styles = {
  navWrapper: { position: "fixed", top: "0", left: 0, right: 0, zIndex: 5000, display: "flex", justifyContent: "center", pointerEvents: "none", boxSizing: "border-box" },
  navContainer: { pointerEvents: "auto", maxWidth: "1350px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "100px", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", boxSizing: "border-box" },
  navDefault: { backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.5)", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" },
  navScrolled: { backgroundColor: "rgba(1, 22, 39, 0.95)", backdropFilter: "blur(20px)", boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)", transform: "translateY(-5px) scale(0.98)" },
  logoContainer: { display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" },
  textStack: { display: "flex", flexDirection: "column", lineHeight: "1" },
  logoMain: { fontWeight: "900", letterSpacing: "0.5px" },
  logoSub: { fontSize: "0.85rem", fontWeight: "700", color: "#00b4d8", letterSpacing: "2px" },
  
  // NAVEGACIÓN COMPORTAMIENTO MÓVIL VS ESCRITORIO
  menuList: { listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "5px" },
  menuMobileClosed: { position: "fixed", top: "80px", right: "-100%", width: "280px", height: "calc(100vh - 100px)", backgroundColor: "white", flexDirection: "column", padding: "30px 20px", gap: "15px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: "all 0.5s ease", overflowY: "auto", pointerEvents: "none" },
  menuMobileOpen: { position: "fixed", top: "80px", right: "4%", width: "280px", height: "calc(100vh - 100px)", backgroundColor: "white", flexDirection: "column", padding: "30px 20px", gap: "15px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(1, 22, 39, 0.15)", transition: "all 0.5s ease", overflowY: "auto", pointerEvents: "auto" },
  
  burgerBtn: { background: "none", border: "none", fontSize: "1.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", transition: "0.3s" },
  link: { fontWeight: "800", fontSize: "1rem" },
  dropdownContainer: { top: "100%", left: "0", paddingTop: "10px", zIndex: 10, animation: "slideIn 0.3s ease forwards", width: "100%" },
  dropdownMenu: { backgroundColor: "white", minWidth: "220px", borderRadius: "20px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)", padding: "10px", listStyle: "none", margin: 0, border: "1px solid #f1f5f9" },
  dropdownItem: { display: "block", padding: "10px 15px", textDecoration: "none", color: "#023e8a", fontWeight: "700", fontSize: "0.9rem", borderRadius: "10px" },
  userLabel: { fontWeight: "900", fontSize: "0.85rem", letterSpacing: "1px" },
  logoutBtn: { fontWeight: "800", fontSize: "0.9rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" },
  
  cartContainer: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" },
  cartBadge: { position: "absolute", top: "-5px", right: "-5px", background: "#00b4d8", color: "white", fontSize: "10px", fontWeight: "900", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }
};

export default Navbar;