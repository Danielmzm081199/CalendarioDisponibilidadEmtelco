import { useState } from 'react';
import './../styles/Login.css';
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const irARegistro = () => {
    navigate("/Registro"); 
  };
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;

    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username === 'usuario' && password === 'contrasena') {
        alert('Inicio de sesión exitoso!');

         window.location.href = '/disponibilidad';
         
      } else {
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="icono-superior">
          <h1 className="SubtituloCalendario">Disponibilidad</h1>
          <img src="/image1.png" alt="Logo Calendario" className="logo-icono" />
      </div>
      <h1 className="namemtelco">emtelco</h1>
      <img src="/person.png" alt="Logo Person" className="logo-person" />
      <h2>Bienvenido al Calendario de Disponibilidad</h2>
      <label htmlFor="username">Usuario de red:</label>
      <input type="text" id="username" />
      <label htmlFor="password">Contrasena:</label>
      <input type="password" id="password" />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <div className="error-message">{errorMessage}</div>
      <button onClick={irARegistro}>Registrarse</button>

    </div>
  );
};

export default LoginPage;
