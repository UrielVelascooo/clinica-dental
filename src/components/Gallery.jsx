import React, { useState, useEffect, useCallback } from "react";
import "./Gallery.css";

function Gallery() {
  const images = [
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJU0hm-HUMias7Zo77YnsGSoSNTyFtO2zQpg&s", title: "Consultorios Modernos" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsU3lGKov2TAv8ZIYbBlRy7I76d4h7GTTMA&s", title: "Tecnología de Punta" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvPi4NdICjLoGJ6M9KI0MwV3IfYSuwjVq5w&s", title: "Ambiente Relajante" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7F0pPx0yhC04XgrS6dKsgrfs4r2ahm6YKA&s", title: "Especialistas Certificados" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA3SYpLs8V60WGY_5JZOIRorUPsLoCazbVQ&s", title: "Diseño de Sonrisa" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBg3EjJFyXy3PAGVfcHKEXu0Jd1uqavXnWRw&s", title: "Atención Infantil" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const DURATION = 6000;


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="galeria" style={{
      ...styles.container,
      padding: isMobile ? "60px 16px" : "80px 5%"
    }}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <span style={styles.label}>Nuestras Instalaciones</span>
          <h2 style={styles.title}> Tour <span style={styles.highlight}>Virtual</span></h2>
          <div style={styles.miniDivider}></div>
        </div>

        <div style={{
          ...styles.carouselWrapper,
          height: isMobile ? "380px" : "550px"
        }}>
          {/* BOTONES DE NAVEGACIÓN */}
          <button 
            onClick={prevSlide} 
            style={{
              ...styles.navBtnLeft,
              width: isMobile ? "40px" : "50px",
              height: isMobile ? "40px" : "50px",
              left: isMobile ? "8px" : "0",
              fontSize: isMobile ? "1.2rem" : "1.5rem"
            }} 
            className="nav-control"
          >
            ‹
          </button>
          
          <button 
            onClick={nextSlide} 
            style={{
              ...styles.navBtnRight,
              width: isMobile ? "40px" : "50px",
              height: isMobile ? "40px" : "50px",
              right: isMobile ? "8px" : "0",
              fontSize: isMobile ? "1.2rem" : "1.5rem"
            }} 
            className="nav-control"
          >
            ›
          </button>

          {/* ESCENARIO DEL CARRUSEL */}
          <div style={{
            ...styles.stage,
            perspective: isMobile ? "none" : "1500px" // Desactiva la perspectiva 3D en móviles
          }}>
            {images.map((img, i) => {
              let cardState = "is-hidden";
              
              if (i === currentIndex) {
                cardState = "is-active";
              } else if (!isMobile) {
                // Las clases prev y next solo se calculan en escritorio
                if (i === (currentIndex === 0 ? images.length - 1 : currentIndex - 1)) cardState = "is-prev";
                else if (i === (currentIndex === images.length - 1 ? 0 : currentIndex + 1)) cardState = "is-next";
              }

              return (
                <div 
                  key={`slide-${i}`}
                  className={`gallery-card ${cardState} ${isMobile ? 'mobile-card' : ''}`}
                  style={{ 
                    backgroundImage: `url(${img.url})`,
                    // Forzar ocultamiento en móvil de las tarjetas inactivas para evitar desbordes
                    display: isMobile && i !== currentIndex ? "none" : "block"
                  }}
                >
                  {i === currentIndex && (
                    <div style={{
                      ...styles.overlay,
                      padding: isMobile ? "20px" : "40px"
                    }}>
                      <h4 style={{
                        ...styles.imgTitle,
                        fontSize: isMobile ? "1rem" : "1.2rem"
                      }}>
                        {img.title}
                      </h4>
                      <div style={styles.progressTrack}>
                        <div className="progress-fill" style={{ animationDuration: `${DURATION}ms` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* INDICADORES DE PUNTOS PARA MÓVIL */}
        {isMobile && (
          <div style={styles.dotsContainer}>
            {images.map((_, i) => (
              <div 
                key={`dot-${i}`} 
                style={{
                  ...styles.dot,
                  backgroundColor: i === currentIndex ? "#00b4d8" : "#cbd5e1",
                  width: i === currentIndex ? "18px" : "8px"
                }}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

const styles = {
  container: { backgroundColor: "#fcfdfe", overflow: "hidden", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  wrapper: { maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" },
  header: { textAlign: "center", marginBottom: "30px" },
  label: { color: "#023e8a", fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "2px" },
  title: { color: "#0a2540", fontWeight: "900", margin: "5px 0 0 0" },
  highlight: { color: "#00b4d8" },
  miniDivider: { width: "50px", height: "4px", background: "#00b4d8", margin: "12px auto", borderRadius: "10px" },
  carouselWrapper: { position: "relative", display: "flex", alignItems: "center", width: "100%", boxSizing: "border-box" },
  stage: { width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box" },
  navBtnLeft: { position: "absolute", top: "50%", transform: "translateY(-50%)", borderRadius: "50%", border: "none", background: "rgba(255, 255, 255, 0.9)", color: "#0a2540", cursor: "pointer", zIndex: 30, transition: "0.3s", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  navBtnRight: { position: "absolute", top: "50%", transform: "translateY(-50%)", borderRadius: "50%", border: "none", background: "rgba(255, 255, 255, 0.9)", color: "#0a2540", cursor: "pointer", zIndex: 30, transition: "0.3s", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  overlay: { width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", borderRadius: "0 0 32px 32px", boxSizing: "border-box", position: "absolute", bottom: 0, left: 0 },
  imgTitle: { color: "white", fontWeight: "700", margin: "0 0 10px 0" },
  progressTrack: { width: "100%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "10px", overflow: "hidden" },
  dotsContainer: { display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" },
  dot: { height: "8px", borderRadius: "4px", transition: "all 0.3s ease" }
};

export default Gallery;