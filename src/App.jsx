import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 

// Componentes
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Dentists from "./components/Dentists";
import Gallery from "./components/Gallery";
import Appointment from "./components/Appointment"; // Reintegrado
import Contact from "./components/Contact";
import Login from "./components/Login";
import Whatsapp from "./components/Whatsapp";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import MyAppointments from "./pages/MyAppointments";

const layoutStyle = {
  width: "92%",
  maxWidth: "1300px",
  margin: "0 auto",
};

/**
 * Componente Home: 
 * Contiene todas las secciones de la página principal indexadas por ID
 * para que el scroll suave del Navbar funcione correctamente.
 */
function Home() {
  return (
    <>
      <section id="inicio">
        <Hero />
      </section>
      
      <div style={layoutStyle}>
        <section id="dentistas" style={{ padding: "80px 0" }}>
          <Dentists />
        </section> 
        
        <section id="servicios" style={{ padding: "80px 0" }}>
          <Services />
        </section>
        
        <section id="galeria" style={{ padding: "80px 0" }}>
          <Gallery />
        </section>
        
        {/* SECCIÓN DE CITAS CON CALENDARIO */}
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
        <Routes>
          {/* Ruta principal que carga todas las secciones */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas independientes */}
          <Route path="/servicios/:id" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mis-citas" element={<MyAppointments />} />
        </Routes>
        
        <Whatsapp />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;