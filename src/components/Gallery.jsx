import { useState, useEffect, useCallback } from "react";
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
  const DURATION = 6000;

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
    <section id="galeria" style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <span style={styles.label}>Nuestras Instalaciones</span>
          {/* Título actualizado */}
          <h2 style={styles.title}> Tour <span style={styles.highlight}>Virtual</span></h2>
          <div style={styles.miniDivider}></div>
        </div>

        <div style={styles.carouselWrapper}>
          <button onClick={prevSlide} style={styles.navBtnLeft} className="nav-control">‹</button>
          <button onClick={nextSlide} style={styles.navBtnRight} className="nav-control">›</button>

          <div style={styles.stage}>
            {images.map((img, i) => {
              // Lógica de clases para evitar el error de DOM props
              let cardState = "is-hidden";
              if (i === currentIndex) cardState = "is-active";
              else if (i === (currentIndex === 0 ? images.length - 1 : currentIndex - 1)) cardState = "is-prev";
              else if (i === (currentIndex === images.length - 1 ? 0 : currentIndex + 1)) cardState = "is-next";

              return (
                <div 
                  key={`slide-${i}`}
                  className={`gallery-card ${cardState}`}
                  style={{ backgroundImage: `url(${img.url})` }}
                >
                  {i === currentIndex && (
                    <div style={styles.overlay}>
                      <h4 style={styles.imgTitle}>{img.title}</h4>
                      <div style={styles.progressTrack}>
                        <div className="progress-fill"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: { padding: "80px 5%", backgroundColor: "#fcfdfe", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
  wrapper: { maxWidth: "1200px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "40px" },
  label: { color: "#023e8a", fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "2px" },
  title: { fontSize: "clamp(2rem, 5vw, 3rem)", color: "#0a2540", fontWeight: "900" },
  highlight: { color: "#00b4d8" },
  miniDivider: { width: "50px", height: "4px", background: "#00b4d8", margin: "15px auto", borderRadius: "10px" },
  carouselWrapper: { position: "relative", height: "550px", display: "flex", alignItems: "center" },
  stage: { width: "100%", height: "100%", position: "relative", perspective: "1500px", display: "flex", justifyContent: "center", alignItems: "center" },
  navBtnLeft: { position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%", border: "none", background: "rgba(10,37,64,0.1)", color: "#0a2540", fontSize: "1.5rem", cursor: "pointer", zIndex: 30, transition: "0.3s" },
  navBtnRight: { position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "50px", height: "50px", borderRadius: "50%", border: "none", background: "rgba(10, 37, 64, 0.1)", color: "#0a2540", fontSize: "1.5rem", cursor: "pointer", zIndex: 30, transition: "0.3s" },
  overlay: { padding: "40px", width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", borderRadius: "0 0 40px 40px", boxSizing: "border-box" },
  imgTitle: { color: "white", fontSize: "1.2rem", fontWeight: "700", margin: "0 0 15px 0" },
  progressTrack: { width: "100%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "10px", overflow: "hidden" },
  thumbGrid: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px" }
};

export default Gallery;