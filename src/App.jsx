import { useState, useEffect } from 'react'
import './App.css'

const horariosDisponibles = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
]

function App() {
  const [turnos, setTurnos] = useState(() => {
    const turnosGuardados = localStorage.getItem('turnos')
    return turnosGuardados ? JSON.parse(turnosGuardados) : []
  })
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [horario, setHorario] = useState('')

  // Guardar turnos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('turnos', JSON.stringify(turnos))
  }, [turnos])

  const reservarTurno = () => {
    if (!nombre || !fecha || !horario) {
      alert('Por favor completa todos los campos')
      return
    }

    const turnoExistente = turnos.find(
      t => t.fecha === fecha && t.horario === horario
    )

    if (turnoExistente) {
      alert('Este horario ya está reservado')
      return
    }

    setTurnos([...turnos, { id: Date.now(), nombre, fecha, horario }])
    setNombre('')
    setFecha('')
    setHorario('')
    alert('¡Turno reservado con éxito!')
  }

  const cancelarTurno = (id) => {
    setTurnos(turnos.filter(t => t.id !== id))
    alert('Turno cancelado')
  }

  return (
    <div className="container">
      <h1>📅 Sistema de Turnos</h1>
      
      <div className="formulario">
        <h2>Reservar Turno</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <select
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        >
          <option value="">Seleccionar horario</option>
          {horariosDisponibles.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <button onClick={reservarTurno}>Reservar</button>
      </div>

      <div className="lista-turnos">
        <h2>Turnos Reservados</h2>
        {turnos.length === 0 ? (
          <p>No hay turnos reservados</p>
        ) : (
          <ul>
            {turnos.map(turno => (
              <li key={turno.id}>
                <strong>{turno.nombre}</strong> - {turno.fecha} a las {turno.horario}
                <button onClick={() => cancelarTurno(turno.id)}>Cancelar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
