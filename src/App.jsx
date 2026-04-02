import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Whatsapp from "./components/Whatsapp";
import Footer from "./components/Footer";
import Dentists from "./components/Dentists";
function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Dentists />
      <Contact />
      <Whatsapp />
      <Footer />
      
    </div>
  );
}

export default App;