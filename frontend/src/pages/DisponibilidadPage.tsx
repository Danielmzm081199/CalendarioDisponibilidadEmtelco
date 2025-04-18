import "../components/Calendario";
import Calendario from "../components/Calendario";

import "../styles/global.css";
import "../styles/Calendario.css";

const DisponibilidadPage = () => {
  
  return (
    <div className="CompletePage">
      <h1 className="namemtelco">EMTELCO</h1>

      <div className="icono-superior">
        <h1 className="SubtituloCalendario">Disponibilidad</h1>
        <img src="/image1.png" alt="Logo Calendario" className="logo-icono" />
      </div>

      <div className="calendar-container">
      <h1 className="disponibilidadHead"> Calendario de Disponibilidad</h1>
        <Calendario />
      </div>
    </div>
  );
};
  export default DisponibilidadPage;
  