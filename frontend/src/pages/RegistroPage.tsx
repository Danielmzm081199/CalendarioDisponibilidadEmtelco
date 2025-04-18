import Registro from "../components/Registro";
import "../styles/Registro.css";
import "../styles/global.css";

const RegistroPage = () => {
  
  return (
    <div className="CompletePage">
      <h1 className="namemtelco">EMTELCO</h1>

      <div className="">
        <Registro/>
      </div>
    </div>
  );
};
  export default RegistroPage;