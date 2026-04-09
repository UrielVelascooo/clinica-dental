import { useState, useEffect } from "react";

function Gallery() {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJU0hm-HUMias7Zo77YnsGSoSNTyFtO2zQpg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsU3lGKov2TAv8ZIYbBlRy7I76d4h7GTTMA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvPi4NdICjLoGJ6M9KI0MwV3IfYSuwjVq5w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK7F0pPx0yhC04XgrS6dKsgrfs4r2ahm6YKA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA3SYpLs8V60WGY_5JZOIRorUPsLoCazbVQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBg3EjJFyXy3PAGVfcHKEXu0Jd1uqavXnWRw&s"
    
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setFade(true); 
      }, 500); 
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="galeria" style={styles.container}>
      <div style={styles.burbuja1}></div>
      
      <div style={styles.header}>
        <div style={styles.lineaAcento}></div>
        <span style={styles.subtitle}>Instalaciones</span>
        <h2 style={styles.title}>Nuestra Clínica en <span style={styles.highlight}>Imágenes</span></h2>
      </div>

      <div style={styles.sliderWrapper}>
        <div style={styles.sliderFrame}>
          <img 
            src={images[index]} 
            style={{
              ...styles.image,
              opacity: fade ? 1 : 0,
              transform: fade ? "scale(1)" : "scale(1.02)"
            }} 
            alt="Instalaciones de la clínica"
          />
          
          
          <div style={styles.pagination}>
            {images.map((_, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.dot,
                  backgroundColor: i === index ? "#00b4d8" : "rgba(255,255,255,0.5)",
                  width: i === index ? "24px" : "8px"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 5%",
    textAlign: "center",
    backgroundColor: "#fdfeff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  burbuja1: {
    position: "absolute",
    width: "450px",
    height: "450px",
    background: "rgba(144, 224, 239, 0.12)",
    borderRadius: "50%",
    bottom: "-100px",
    right: "-100px",
    filter: "blur(90px)",
    zIndex: 0
  },
  header: {
    marginBottom: "50px",
    position: "relative",
    zIndex: 1
  },
  lineaAcento: {
    width: "40px",
    height: "4px",
    background: "#00b4d8",
    borderRadius: "2px",
    margin: "0 auto 15px auto"
  },
  subtitle: {
    color: "#0077b6",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "2px"
  },
  title: {
    fontSize: "2.5rem",
    color: "#023e8a",
    fontWeight: "800",
    marginTop: "10px"
  },
  highlight: {
    color: "#00b4d8"
  },
  sliderWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "relative"
  },
  sliderFrame: {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    height: "500px",
    borderRadius: "32px",
    padding: "12px",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 30px 60px rgba(2, 62, 138, 0.08)",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "24px",
    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
  },
  pagination: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "8px 16px",
    borderRadius: "20px",
    backdropFilter: "blur(5px)"
  },
  dot: {
    height: "8px",
    borderRadius: "4px",
    transition: "all 0.4s ease"
  }
};

export default Gallery;