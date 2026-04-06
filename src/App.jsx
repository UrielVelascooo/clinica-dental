import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Dentists from "./components/Dentists";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Whatsapp from "./components/Whatsapp";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";

// Página principal: Definimos los ID exactos para el scroll
function Home() {
  return (
    <>
      <section id="inicio"><Hero /></section>
      <section id="servicios"><Services /></section>
      
      {/* SECCIÓN DENTISTAS: Asegúrate de que el id sea "dentistas" */}
      <section id="dentistas"><Dentists /></section> 
      
      <section id="galeria"><Gallery /></section>
      <section id="contacto"><Contact /></section>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios/:id" element={<ServiceDetail />} />
      </Routes>
      <Whatsapp />
      <Footer />
    </Router>
  );
}

export default App;