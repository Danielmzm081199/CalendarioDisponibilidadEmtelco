import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Disponibilidad from "./pages/DisponibilidadPage";
import Registro from "./pages/RegistroPage";
import HomePage from "./pages/HomePage";

function App() {

  return (

    <><Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/disponibilidad" element={<Disponibilidad />} />
        <Route path="/registro" element={<Registro />} />
      </Routes></>

  );
}

export default App;

