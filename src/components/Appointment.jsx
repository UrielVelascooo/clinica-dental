import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { db } from "../firebaseConfig"; 
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useAuth } from "../context/AuthContext"; 

function Appointment() {
  const { user } = useAuth(); 
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: "", fecha: "" });
  const [viewDate, setViewDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [occupiedDates, setOccupiedDates] = useState([]);

  const servicios = [
    "Consulta y diagnóstico general", "Limpieza y profilaxis dental", "Tratamientos de restauración",
    "Ortodoncia", "Endodoncia", "Periodoncia", "Odontopediatría", "Estética dental", "Cirugía oral"
  ];

  // 1. CARGAR DISPONIBILIDAD (Visible para todos los visitantes)
  useEffect(() => {
    const fetchOccupiedDates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "citas"));
        const dates = querySnapshot.docs.map(doc => doc.data().fecha);
        setOccupiedDates(dates);
      } catch (error) {
        console.error("Error al cargar disponibilidad:", error);
      }
    };
    fetchOccupiedDates();
  }, []);

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} style={styles.emptyDay}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const currentIterDate = new Date(year, month, d);
      const dateString = currentIterDate.toISOString().split('T')[0];
      const isOccupied = occupiedDates.includes(dateString);
      const isPast = currentIterDate < new Date().setHours(0,0,0,0);
      const isSelected = selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month;

      days.push(
        <div 
          key={d} 
          onClick={() => {
            // PROTECCIÓN: Si no hay usuario, redirigir al login al intentar seleccionar
            if (!user) {
              navigate("/login");
              return;
            }
            if (!isOccupied && !isPast) {
              setSelectedDate(currentIterDate);
              setForm({...form, fecha: dateString});
            }
          }}
          style={{
            ...styles.dayCell, 
            ...(isSelected ? styles.dayCellActive : {}),
            ...(isOccupied ? styles.dayOccupied : {}),
            ...(isPast ? styles.dayPast : {})
          }}
        >
          {d}
          {isOccupied && <div style={styles.strike}></div>}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleBooking = async () => {
    // PROTECCIÓN: Redirigir si intenta agendar sin sesión
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (!selectedDate || !form.nombre || !form.servicio) {
      alert("Por favor completa todos los datos y selecciona una fecha.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "citas"), {
        userId: user.uid,
        userEmail: user.email,
        nombrePaciente: form.nombre,
        telefono: form.telefono,
        servicio: form.servicio,
        fecha: form.fecha,
        estado: "pendiente",
        createdAt: new Date().toISOString()
      });

      setLoading(false);
      setShowSuccessModal(true); 
      setTimeout(() => navigate("/mis-citas"), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agendar la cita.");
      setLoading(false);
    }
  };

  return (
    <section id="citas" style={styles.section}>
      {showSuccessModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.iconContainer}>
              <div style={styles.checkIconBig}>✓</div>
              <div style={styles.pulseEffect}></div>
            </div>
            <h3 style={styles.modalTitle}>¡Todo listo!</h3>
            <p style={styles.modalText}>Tu cita ha sido registrada con éxito en Dental Velasco.</p>
            <div style={styles.progressWrapper}><div style={styles.progressBar}></div></div>
            <span style={styles.redirectText}>Preparando tu historial...</span>
          </div>
        </div>
      )}

      <div style={styles.mainTitleContainer}>
        <h2 style={styles.mainSectionTitle}>Agendar Cita</h2>
        <div style={styles.titleUnderline}></div>
      </div>

      <div style={styles.mainWrapper}>
        <div style={styles.infoPanel}>
          <div style={styles.calendarHeader}>
            <span style={styles.topBadge}>Disponibilidad</span>
            <h2 style={styles.panelTitle}>Reserva <br/> <span style={styles.textBlue}>tu espacio dental.</span></h2>
            
            <div style={styles.monthNav}>
              <button onClick={() => changeMonth(-1)} style={styles.navBtn}>←</button>
              <span style={styles.currentMonth}>{viewDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => changeMonth(1)} style={styles.navBtn}>→</button>
            </div>

            <div style={styles.calendarBody}>
              <div style={styles.weekDays}>
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <span key={d} style={styles.weekDay}>{d}</span>)}
              </div>
              <div style={styles.daysGrid}>{renderCalendar()}</div>
            </div>

            <div style={styles.legend}>
               <div style={styles.legendItem}><div style={{...styles.dot, backgroundColor: '#00b4d8'}}></div> Libre</div>
               <div style={styles.legendItem}><div style={{...styles.dot, backgroundColor: '#ff4d4d'}}></div> Ocupado</div>
            </div>
          </div>
        </div>

        <div style={styles.formPanel}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>Datos de Reserva</h3>
            <p style={styles.formSubtitle}>
              {!user ? "Inicia sesión para elegir un día" : selectedDate ? `Día: ${selectedDate.toLocaleDateString()}` : "Selecciona una fecha en el calendario"}
            </p>
          </div>

          <div style={styles.formContent}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre Completo</label>
              <input type="text" placeholder="Nombre" onChange={(e) => setForm({...form, nombre: e.target.value})} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>WhatsApp</label>
              <input type="tel" placeholder="Tu número de contacto" onChange={(e) => setForm({...form, telefono: e.target.value})} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Tratamiento</label>
              <select onChange={(e) => setForm({...form, servicio: e.target.value})} style={styles.select}>
                <option value="">Selecciona el servicio</option>
                {servicios.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
            </div>

            <button 
              onClick={handleBooking} 
              disabled={loading}
              style={{...styles.button, backgroundColor: loading ? "#94a3b8" : "#023e8a"}}
            >
              {loading ? "Procesando..." : user ? "Confirmar Cita" : "Inicia sesión para agendar"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalPop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes progressRun { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes pulseIn { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>
    </section>
  );
}

const styles = {
  section: { padding: "100px 5%", backgroundColor: "#fdfeff", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Inter', sans-serif" },
  mainTitleContainer: { textAlign: "center", marginBottom: "50px" },
  mainSectionTitle: { fontSize: "3rem", fontWeight: "900", color: "#023e8a", margin: 0 },
  titleUnderline: { width: "60px", height: "5px", backgroundColor: "#00b4d8", margin: "10px auto 0", borderRadius: "10px" },
  mainWrapper: { width: "100%", maxWidth: "1100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", backgroundColor: "white", borderRadius: "40px", overflow: "hidden", boxShadow: "0 40px 100px rgba(2, 62, 138, 0.08)" },
  infoPanel: { backgroundColor: "#023e8a", padding: "50px", color: "white" },
  topBadge: { fontSize: "11px", fontWeight: "700", color: "#00b4d8", textTransform: "uppercase" },
  panelTitle: { fontSize: "2.4rem", fontWeight: "800", margin: "15px 0", lineHeight: "1.1" },
  textBlue: { color: "#00b4d8" },
  monthNav: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", background: "rgba(255,255,255,0.05)", padding: "10px 15px", borderRadius: "15px" },
  navBtn: { background: "none", border: "none", color: "#00b4d8", fontSize: "18px", cursor: "pointer" },
  currentMonth: { fontWeight: "700", textTransform: "capitalize" },
  calendarBody: { background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.08)" },
  weekDays: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "15px", opacity: 0.5, fontSize: "12px" },
  daysGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" },
  dayCell: { aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", fontSize: "14px", cursor: "pointer", position: "relative" },
  dayCellActive: { background: "#00b4d8", color: "white", fontWeight: "800" },
  dayOccupied: { opacity: 0.4, cursor: "not-allowed", color: "#64748b" },
  dayPast: { opacity: 0.1, cursor: "not-allowed" },
  strike: { position: "absolute", width: "70%", height: "2px", background: "#ff4d4d", transform: "rotate(-45deg)" },
  emptyDay: { aspectRatio: "1/1" },
  legend: { marginTop: "20px", display: "flex", gap: "15px" },
  legendItem: { fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%" },
  formPanel: { padding: "55px", backgroundColor: "white" },
  formTitle: { fontSize: "1.8rem", color: "#023e8a", fontWeight: "800", margin: 0 },
  formSubtitle: { color: "#64748b", fontSize: "15px", marginTop: "8px" },
  formContent: { marginTop: "35px", display: "flex", flexDirection: "column", gap: "22px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "12px", fontWeight: "700", color: "#023e8a", textTransform: "uppercase" },
  input: { padding: "16px", borderRadius: "14px", border: "1px solid #edf2f7", backgroundColor: "#f8fafc", outline: "none" },
  select: { padding: "16px", borderRadius: "14px", border: "1px solid #edf2f7", backgroundColor: "#f8fafc", outline: "none" },
  button: { marginTop: "10px", padding: "20px", color: "white", borderRadius: "18px", border: "none", fontWeight: "700", cursor: "pointer", transition: "0.3s" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(1, 22, 39, 0.6)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 },
  modalCard: { backgroundColor: "white", width: "90%", maxWidth: "450px", padding: "50px 40px", borderRadius: "40px", textAlign: "center", boxShadow: "0 30px 70px rgba(0,0,0,0.3)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" },
  iconContainer: { position: "relative", marginBottom: "25px" },
  checkIconBig: { width: "80px", height: "80px", backgroundColor: "#00b4d8", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", fontWeight: "900", position: "relative", zIndex: 2 },
  pulseEffect: { position: "absolute", top: 0, left: 0, width: "80px", height: "80px", backgroundColor: "#00b4d8", borderRadius: "50%", zIndex: 1, animation: "pulseIn 1.5s infinite" },
  modalTitle: { fontSize: "2rem", color: "#023e8a", fontWeight: "900", margin: "10px 0" },
  modalText: { color: "#64748b", fontSize: "16px", lineHeight: "1.6", margin: "10px 0 30px 0" },
  progressWrapper: { width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "10px", overflow: "hidden", marginBottom: "15px" },
  progressBar: { height: "100%", backgroundColor: "#00b4d8", animation: "progressRun 3s linear forwards" },
  redirectText: { fontSize: "12px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }
};

export default Appointment;