import Registro from "../components/Registro";
import "../styles/Registro.css";
import "../styles/global.css";

const RegistroPage = () => {
  
  return (
    <div className="CompletePage">
        <div className="icono-superior">
            <h1 className="SubtituloCalendario">Disponibilidad</h1>
            <img src="/image1.png" alt="Logo Calendario" className="logo-icono" />
        </div>
      <h1 className="namemtelco">emtelco</h1>
      

      <div className="">
        <Registro/>
      </div>
    </div>
  );
};
  export default RegistroPage;