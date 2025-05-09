import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";

// Directorio de usuarios
const userDirectory = [
  { name: "Daniel", contact: "3001234567" },
  { name: "Laura", contact: "3019876543" },
  { name: "Pedro", contact: "3025551212" },
];

// Lista de áreas de la empresa
const AreasEmpresa = [
  "Administración de Usuarios",
  "Aplicaciones no Core",
  "Bases de Datos",
  "BI & Reportes",
  "Centro de Computo",
  "CRM",
  "Fábrica BOTS",
  "Fábrica RPA",
  "Incidencias Masivas",
  "IVR",
  "Plataforma de Grabaciones",
  "Plataforma de Servidores",
  "Redes Bogotá",
  "Redes Medellín",
  "Seguridad de la Información",
  "Soporte de Aplicaciones",
  "Telefonia Medellín-Bogota"
];

// Función para generar colores oscuros aleatorios
const generarColorAleatorio = (): string => {
  const getDarkValue = () => Math.floor(Math.random() * 100);
  return `rgb(${getDarkValue()}, ${getDarkValue()}, ${getDarkValue()})`;
};

const Calendario = ({ area }: { area: string }) => {
  const calendarRef = useRef<any>(null);
  const selectedArea = area;

  // Estado con eventos por cada área (inicializado dinámicamente)
  const [areaEvents, setAreaEvents] = useState<{ [key: string]: EventInput[] }>(() =>
    AreasEmpresa.reduce((acc, area) => {
      acc[area] = [];
      return acc;
    }, {} as { [key: string]: EventInput[] })
  );

  const [nameColors, setNameColors] = useState<{ [key: string]: string }>({});
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  // Cuando se selecciona un rango de fechas en el calendario
  const handleSelect = (info: DateSelectArg) => {
    setSelectedRange({ start: info.startStr, end: info.endStr });
    setShowModal(true);
  };

  // Al guardar evento
  const handleSubmit = () => {
    if (selectedUserIndex === null || !selectedRange) return;

    const user = userDirectory[selectedUserIndex];
    const key = `${user.name}-${user.contact}`;
    let color = nameColors[key];

    if (!color) {
      color = generarColorAleatorio();
      setNameColors((prev) => ({ ...prev, [key]: color }));
    }

    const startDate = new Date(selectedRange.start);
    const endDate = new Date(selectedRange.end);
    const newEvents: EventInput[] = [];

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      newEvents.push({
        title: `${user.name} - ${user.contact}`,
        start: dateStr,
        end: dateStr,
        allDay: true,
        backgroundColor: color,
        borderColor: color,
      });
    }

    setAreaEvents((prev) => ({
      ...prev,
      [selectedArea]: [...(prev[selectedArea] || []), ...newEvents],
    }));

    // Limpiar selección y cerrar modal
    setShowModal(false);
    setSelectedUserIndex(null);
    setSelectedRange(null);
  };

  // Eliminar evento al hacer click
  const handleEventClick = (clickInfo: EventClickArg) => {
    const confirmDelete = window.confirm("¿Deseas eliminar este evento?");
    if (!confirmDelete) return;

    setAreaEvents((prev) => {
      const updated = { ...prev };
      updated[selectedArea] = updated[selectedArea].filter(
        (event) =>
          event.start !== clickInfo.event.startStr || event.title !== clickInfo.event.title
      );
      return updated;
    });
  };

  // Validar que un rango de fechas esté disponible
  const isDateRangeAvailable = (startStr: string, endStr: string): boolean => {
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    const allEvents = areaEvents[selectedArea] || [];

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dayStr = d.toISOString().slice(0, 10);
      const isTaken = allEvents.some((event) => {
        const eventDate = new Date(event.start as string).toISOString().slice(0, 10);
        return eventDate === dayStr;
      });
      if (isTaken) return false;
    }
    return true;
  };

  // Limpiar eventos del mes actual
  const limpiarMesActual = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    const startOfMonth = calendarApi.view.currentStart;
    const endOfMonth = calendarApi.view.currentEnd;

    setAreaEvents((prev) => {
      const eventosFiltrados = prev[selectedArea].filter((event) => {
        const eventDate = new Date(event.start as string);
        return eventDate < startOfMonth || eventDate >= endOfMonth;
      });

      return {
        ...prev,
        [selectedArea]: eventosFiltrados,
      };
    });
  };

  return (
    <div>
      {/* Modal de selección de usuario */}
      {showModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <h4>Seleccionar usuario del directorio</h4>
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
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </>
      )}

      <button onClick={limpiarMesActual} className="boton-limpiar">
        Limpiar mes actual
      </button>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={areaEvents[selectedArea]}
        selectable
        select={handleSelect}
        eventClick={handleEventClick}
        validRange={{ start: new Date() }}
        locale="es"
        height="auto"
        showNonCurrentDates={false}
        selectAllow={(selectInfo) =>
          isDateRangeAvailable(selectInfo.startStr, selectInfo.endStr)
        }
      />
    </div>
  );
};

export default Calendario;
