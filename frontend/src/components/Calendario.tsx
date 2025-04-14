import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventInput } from "@fullcalendar/core";
import { useState } from "react";

// Simulando un directorio de usuarios
const userDirectory = [
  { name: "Daniel", contact: "3001234567" },
  { name: "Laura", contact: "3019876543" },
  { name: "Pedro", contact: "3025551212" },
];

const Calendar = () => {
  const [areas, setAreas] = useState<string[]>(["CRM", "Marketing", "Programación"]);
  const [selectedArea, setSelectedArea] = useState("CRM");

  const [areaEvents, setAreaEvents] = useState<{ [key: string]: EventInput[] }>({
    CRM: [],
    Marketing: [],
    Programación: [],
  });

  const [nameColors, setNameColors] = useState<{ [key: string]: string }>({});
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [newArea, setNewArea] = useState("");

  const generarColorAleatorio = () => {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSelect = (info: DateSelectArg) => {
    setSelectedRange({ start: info.startStr, end: info.endStr });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (selectedUserIndex === null || !selectedRange) return;

    const user = userDirectory[selectedUserIndex];
    const key = `${user.name}-${user.contact}`;

    let color = nameColors[key];
    if (!color) {
      color = generarColorAleatorio();
      setNameColors((prev) => ({ ...prev, [key]: color }));
    }

    const newEvent = {
      title: `${user.name} - ${user.contact}`,
      start: selectedRange.start,
      end: selectedRange.end,
      allDay: true,
      backgroundColor: color,
      borderColor: color,
    };

    setAreaEvents((prev) => ({
      ...prev,
      [selectedArea]: [...(prev[selectedArea] || []), newEvent],
    }));

    setShowModal(false);
    setSelectedUserIndex(null);
  };

  const handleAddArea = () => {
    const areaName = newArea.trim();
    if (areaName && !areas.includes(areaName)) {
      setAreas([...areas, areaName]);
      setAreaEvents((prev) => ({ ...prev, [areaName]: [] }));
      setSelectedArea(areaName);
      setNewArea("");
    }
  };

  return (
    <div className="p-4">
      {/* Selector de área */}
      <div className="mb-4">
        <label className="mr-2">Selecciona el área:</label>
        <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Crear nueva área */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nueva área"
          value={newArea}
          onChange={(e) => setNewArea(e.target.value)}
        />
        <button onClick={handleAddArea}>Agregar área</button>
      </div>

      {/* Modal para seleccionar usuario */}
      {showModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <h3>Seleccionar usuario del directorio</h3>
            <select
              value={selectedUserIndex ?? ""}
              onChange={(e) => setSelectedUserIndex(parseInt(e.target.value))}
            >
              <option value="">Seleccionar...</option>
              {userDirectory.map((user, idx) => (
                <option key={idx} value={idx}>
                  {user.name} - {user.contact}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit}>Guardar</button>
          </div>
        </>
      )}

      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={areaEvents[selectedArea]}
        selectable={true}
        select={handleSelect}
        validRange={{ start: new Date() }}
        locale="es"
        height="auto"
      />
    </div>
  );
};

export default Calendar;