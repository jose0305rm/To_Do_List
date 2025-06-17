function Task({task, tasksList, setTasksList }) {

  const { id, title, description, status } = task;

  function handleDelete() {
    const listUpdated = tasksList.filter((task) => task.id !== id);
    setTasksList(listUpdated);
  }

  function handleComplete() {
    const listUpdated = tasksList.map((task) => { //selecciona el elemento que se va a modificar
      if (task.id === id) {
        return { ...task, status: true }; //modifica el elemento seleccionado solo en su valor status
      }
      return task; //si no es el elemento seleccionado, lo retorna sin cambios
    });
    setTasksList(listUpdated) //actualiza el estado de la lista de tareas
  }

  return (
    <>
      {!status ? (
        <div className="bg-slate-200 h-auto min-h-40 rounded-2xl flex flex-col justify-start items-start mb-5 text-center">
          <h3 className="ml-5 font-bold text-sky-900 text-2xl mt-4 mb-3 text-start pr-3">
            {title}
          </h3>
          <p className="ml-5 text-start pr-3">{description}</p>
          <div>
            <button
              className="bg-green-300 h-auto w-auto p-3 font-bold text-green-700 ml-5 mt-5 mb-5 rounded-2xl"
              onClick={handleComplete}
            >
              Completada
            </button>
            <button
              className="bg-red-300 h-auto w-auto p-3 font-bold text-red-700 ml-5 mt-5 mb-5 rounded-2xl"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-200 h-auto min-h-40 rounded-2xl flex flex-col justify-start items-start mb-5 ">
          <h3 className="ml-5 font-bold text-green-900 text-2xl mt-4 mb-3 text-start pr-3">
            {title}
          </h3>
          <p className="ml-5 text-start pr-3">{description}</p>
          <div>
            <button
              className="bg-red-300 h-auto w-auto p-3 font-bold text-red-700 ml-5 mt-5 mb-5  rounded-2xl"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
