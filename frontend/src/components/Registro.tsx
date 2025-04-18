import React, { useState } from "react";
import "../styles/Registro.css";

const Registro = () => {
  const [area, setArea] = useState("");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes hacer una petición al backend con los datos
    console.log("Datos registrados:", { area, nombre, contacto });
    alert("Usuario registrado correctamente");
    setArea("");
    setNombre("");
    setContacto("");
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Área:</label>
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

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default Registro;
