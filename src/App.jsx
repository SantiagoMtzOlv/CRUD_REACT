import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacío");
      setError('Escriba una Tarea...');
      return;
    }
    console.log(tarea);
    setTareas([...tareas, { id: shortid.generate(), NombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };
  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    setTareas(arrayFiltrado);
  }
  const editar = (item) => {
    console.log(item)
    setEdicion(true);
    setTarea(item.NombreTarea);
    setId(item.id);
  }
  const editarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento Vacío");
      setError('Escriba una Tarea...');
      return;
    }
    const arrayEditado = tareas.map(item => item.id === id ? {id, NombreTarea:tarea} : item);
    setTareas(arrayEditado);
    setEdicion(false);
    setTarea('');
    setId('');
    setError(null);
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            tareas.length === 0 ? (
                <center><span className="text-secondary">No hay Tareas</span></center>
            ):(
              <ul className="list-group">
               {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.NombreTarea}</span>
                <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => eliminarTarea(item.id)}>
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-right" onClick={() => editar(item)}>
                  Editar
                </button>
              </li>
            ))}
             </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              edicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={edicion ? editarTarea : agregarTarea}>
            {
              error ? <small className="text-danger">{error}</small> : null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              edicion ? (
                <button className="btn btn-warning btn-block" type="submit">
                Editar
                </button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">
                Agregar
                </button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
