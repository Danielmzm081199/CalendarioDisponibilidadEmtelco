import "../components/Calendario";
import Calendario from "../components/Calendario";

import "../styles/global.css";
import "../styles/Calendario.css";

const DisponibilidadPage = () => {
  
  return (
    <div className="CompletePage">
      <h1 className="namemtelco">emtelco</h1>
      
      <div className="icono-superior">  
        <img src="/image1.png" alt="Logo Calendario" className="logo-icono" />
      </div>
      <h1 className="disponibilidadHead"> Calendario de Disponibilidad</h1>
      <div className="calendar-container">
        
        <Calendario area="CRM" />
       
      </div>
    </div>
  );
};
  export default DisponibilidadPage;
  