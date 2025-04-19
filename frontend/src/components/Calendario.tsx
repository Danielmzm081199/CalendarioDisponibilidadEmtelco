import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";

const userDirectory = [
  { name: "Daniel", contact: "3001234567" },
  { name: "Laura", contact: "3019876543" },
  { name: "Pedro", contact: "3025551212" },
];

const generarColorAleatorio = (): string => {
  const getDarkValue = () => Math.floor(Math.random() * 100);
  return `rgb(${getDarkValue()}, ${getDarkValue()}, ${getDarkValue()})`;
};

const Calendario = () => {
  const calendarRef = useRef<DateSelectArg>(null);

  const [areas] = useState(["CRM", "Marketing", "Programación"]);
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

    setShowModal(false);
    setSelectedUserIndex(null);
    setSelectedRange(null);
  };

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

  const isDateRangeAvailable = (startStr: string, endStr: string): boolean => {
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    const allEvents = Object.values(areaEvents).flat();

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
