import React, { useState } from "react";
import "../styles/Registro.css";

const Registro = () => {
  const [area, setArea] = useState("");
  const [nombre, setNombre] = useState("") 
  const [contacto, setContacto] = useState("");
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí peticion con el backend
    console.log("Datos registrados:", { area, nombre, username, contacto });
    alert("Usuario registrado correctamente");
    setArea("");
    setNombre("");
    setContacto("");
    setUsername("");
    setContrasena("")
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Area:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Contacto:</label>
        <input
          type="text"
          value={contacto}
          onChange={(e) => {
            const value = e.target.value;
            // Solo permite números y máximo 10 caracteres
            if (/^\d{0,10}$/.test(value)) {
              setContacto(value);
            }
          }}
          required
          maxLength={10}
        />

       <label>Usuario de Red:</label>
        <input
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

       <label>Contrasena:</label>
        <input
          type="text"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default Registro;
