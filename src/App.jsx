import Task from "./components/Task";
import { useEffect, useMemo, useState } from "react";

function App() {
  // HOOKS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasksList, setTasksList] = useState(initialList);

  const isEmpty = useMemo(() => tasksList.length === 0, [tasksList]);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  // FUNCIONES
  // Cargar datos de la tarea
  function cargarDatos() {
    if (title === "" || description === "") {
      console.log("Por favor, complete todos los campos.");
      return;
    }
    const newTask = {
      id: generateId(),
      title,
      description,
      status: false
    };

    setTasksList([...tasksList, newTask]);
    setTitle(""); // Limpiar el campo de título
    setDescription(""); // Limpiar el campo de descripción
  }

  // Generar un ID único para cada tarea
  function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  // Guardar en Local Storage por persistencia de datos
  function initialList(){
    const localStorageTask = localStorage.getItem("tasksList");
    return localStorageTask ? JSON.parse(localStorageTask) : [];
  };

  return (
    <>
      <div className="bg-gradient-to-b from-sky-900 to-sky-400 h-auto min-h-screen w-full mx-auto flex flex-col xl:flex-row items-center justify-center">
        <form className="bg-slate-200 h-auto w-10/12 xl:w-4/12 m-10 rounded-2xl flex flex-col justify-center">
          <h1 className="text-center text-4xl text-sky-300 m-10">TO DO LIST</h1>
          <div className="flex flex-col m-3">
            <label
              className="font-bold text-2xl ml-4 text-sky-900"
              htmlFor="name"
            >
              Titulo de la tarea
            </label>
            <input
              className="w-auto m-4 h-10 p-3 rounded-md"
              id="name"
              type="text"
              name="name"
              placeholder="digite titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col m-3">
            <label
              className="font-bold text-2xl ml-4 text-sky-900"
              htmlFor="name"
            >
              Descripcion
            </label>
            <textarea
              className="w-auto m-4 h-52 p-3 rounded-md"
              id="name"
              type="text"
              name="name"
              placeholder="digite descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-sky-900 w-auto mx-7 mb-5 h-14 text-sky-50 rounded-md transition-colors duration-300 ease-in-out
             hover:bg-sky-100 hover:text-sky-900"
            type="submit"
            disabled={false}
            onClick={(e) => {
              e.preventDefault();
              cargarDatos();
            }}
          >
            Agregar Tarea
          </button>
        </form>
        <div className="h-auto max-h-[620px] w-10/12 xl:w-4/12 m-10 text-center overflow-y-auto">
        {isEmpty ? (
          <p className="text-sky-200 text-2xl font-bold"> No hay tareas pendientes </p>
        ) : (
          tasksList.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                tasksList={tasksList}
                setTasksList={setTasksList}
              />
            );
          })
        )}
        </div>
      </div>
    </>
  );
}

export default App;
