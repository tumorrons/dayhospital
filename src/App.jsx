
import { useState } from "react";

const rooms = [
  "A1", "A2", "B3", "B4", "C5", "C6",
  "D7", "D8", "E9", "E10", "F11", "F12"
];

const initialPatient = {
  name: "",
  asm: "",
  doctor: "",
  checklist: {
    braccialetto: false,
    frontespizio: false,
    mod79: false,
    parte1: false,
    parte4: false,
    cadute: false,
    asm: false
  },
  salita: "",
  discesa: "",
  tp: "",
  dtxpa: ""
};

export default function App() {
  const [patients, setPatients] = useState(
    Object.fromEntries(rooms.map((r) => [r, { ...initialPatient }]))
  );

  const updateField = (room, field, value) => {
    setPatients((prev) => ({
      ...prev,
      [room]: {
        ...prev[room],
        [field]: value
      }
    }));
  };

  const toggleCheck = (room, item) => {
    setPatients((prev) => ({
      ...prev,
      [room]: {
        ...prev[room],
        checklist: {
          ...prev[room].checklist,
          [item]: !prev[room].checklist[item]
        }
      }
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Day Hospital</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {rooms.map((room) => (
          <div key={room} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8 }}>
            <h3>Stanza {room}</h3>
            <input placeholder="Nome e Cognome" value={patients[room].name}
              onChange={(e) => updateField(room, "name", e.target.value)} />
            <input placeholder="ASM" value={patients[room].asm}
              onChange={(e) => updateField(room, "asm", e.target.value)} />
            <input placeholder="Medico" value={patients[room].doctor}
              onChange={(e) => updateField(room, "doctor", e.target.value)} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, fontSize: 12 }}>
              {Object.entries(patients[room].checklist).map(([key, val]) => (
                <label key={key}>
                  <input type="checkbox" checked={val} onChange={() => toggleCheck(room, key)} />
                  {key}
                </label>
              ))}
            </div>

            <input placeholder="Salita" value={patients[room].salita}
              onChange={(e) => updateField(room, "salita", e.target.value)} />
            <input placeholder="Discesa" value={patients[room].discesa}
              onChange={(e) => updateField(room, "discesa", e.target.value)} />
            <input placeholder="TP" value={patients[room].tp}
              onChange={(e) => updateField(room, "tp", e.target.value)} />
            <input placeholder="DTX/PA" value={patients[room].dtxpa}
              onChange={(e) => updateField(room, "dtxpa", e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}
