import { useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario";

const HomePage = () => {

    const navigate = useNavigate();
    const irALogin = () => {
    navigate("/Login"); 

  };  
  return (
    <div style={{marginTop: '100px', color: 'white' }}>
      <h1>¡Bienvenido al calendario de disponibilidad!</h1>
      <p>Aqui podras registrar tu disponibilidad y ver tus disponibilidades.</p>
      <button onClick={irALogin}>Entrar</button>
      
      {/* Calendarios decorativos */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "40px" }}>
        <div>
            
          <h2>CRM</h2>
          <Calendario area="CRM" soloLectura={true} />
        </div>
        <div>
          <h2>Marketing</h2>
          <Calendario area="Marketing" soloLectura={true} />
        </div>
        <div>
          <h2>Programación</h2>
          <Calendario area="Programación" soloLectura={true} />
        </div>
      </div>
    </div>
  );
};



export default HomePage;
