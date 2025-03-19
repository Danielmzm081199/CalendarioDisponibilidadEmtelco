"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { saveAs } from "file-saver";

class Persona {
  constructor(public name: string, public contact: string, public area: string) {}
}

const AREAS = ["CRM", "Programación y Control", "Recursos Humanos", "Ventas"];

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  color: string;
  area: string;
  contact: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [users, setUsers] = useState<Persona[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserContact, setNewUserContact] = useState("");
  const [newUserArea, setNewUserArea] = useState("");

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("users", JSON.stringify(users));
  }, [events, users]);

  const getRandomColor = () => {
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDateSelect = (selectInfo: any) => {
    if (!selectedUser || !selectedArea) {
      alert("Seleccione un usuario antes de agregar disponibilidad.");
      return;
    }
    let newEvent: Event = {
      id: Date.now(),
      title: `${selectedUser} - ${selectedContact}`,
      start: selectInfo.startStr,
      end: selectInfo.endStr || selectInfo.startStr,
      allDay: true,
      color: getRandomColor(),
      area: selectedArea,
      contact: selectedContact,
    };
    setEvents([...events, newEvent]);
    alert("Disponibilidad agregada!");
  };

  const handleEventClick = (info: any) => {
    alert(`Usuario: ${info.event.title}\nContacto: ${info.event.extendedProps.contact}`);
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Área,Nombre,Contacto,Inicio,Fin\n" +
      events.map(e => `${e.area},${e.title},${e.contact},${e.start},${e.end}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "disponibilidades.csv");
  };

  const addUser = () => {
    if (!newUserName || !newUserContact || !newUserArea) {
      alert("Ingrese nombre, teléfono y seleccione un área.");
      return;
    }
    setUsers([...users, new Persona(newUserName, newUserContact, newUserArea)]);
    setNewUserName("");
    setNewUserContact("");
    setNewUserArea("");
    alert("Usuario agregado!");
  };

  const deleteAllEvents = () => {
    setEvents([]);
    alert("Todos los eventos han sido eliminados.");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendario de Disponibilidad</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Agregar Usuario</h2>
        <select className="border p-2 w-full" value={newUserArea} onChange={(e) => setNewUserArea(e.target.value)}>
          <option value="">Seleccione un área</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <input className="border p-2 w-full mt-2" placeholder="Nombre" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
        <input className="border p-2 w-full mt-2" placeholder="Teléfono" value={newUserContact} onChange={(e) => setNewUserContact(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={addUser}>Agregar Usuario</button>
      </div>
      <select className="border p-2 mb-2 w-full" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
        <option value="">Seleccione un área</option>
        {AREAS.map((area) => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
      {selectedArea && (
        <select className="border p-2 mb-2 w-full" value={selectedUser} onChange={(e) => {
          const selected = users.find(user => user.name === e.target.value);
          setSelectedUser(selected?.name || "");
          setSelectedContact(selected?.contact || "");
        }}>
          <option value="">Seleccione un usuario</option>
          {users.filter(user => user.area === selectedArea).map(user => (
            <option key={user.name} value={user.name}>{user.name} - {user.contact}</option>
          ))}
        </select>
      )}
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={exportToCSV}>Exportar a CSV</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-4 ml-2" onClick={deleteAllEvents}>Eliminar Todos</button>
      {selectedArea && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateSelect}
            events={events.filter(e => e.area === selectedArea)}
            eventClick={handleEventClick}
          />
        </div>
      )}
    </div>
  );
}