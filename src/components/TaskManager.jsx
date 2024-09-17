import { useState } from "react";
import TaskBoard from "./TaskBoard";
import { MdPlaylistAddCircle } from "react-icons/md";
import { LiaUndoAltSolid } from "react-icons/lia";
import { RiCloseLargeLine } from "react-icons/ri";

const TaskManager = () => {
  const [tasks, setTasks] = useState({
    created: [],
    inProgress: [],
    completed: [],
  });
  const [newTask, setNewTask] = useState("");
  const [lastDeletedTask, setLastDeletedTask] = useState(null);

  const handleTaskUpdate = ({ type, taskId, source, destination }) => {
    switch (type) {
      case "REMOVE":
        removeTask(taskId);
        break;
      case "TOGGLE_COMPLETION":
        toggleTaskCompletion(taskId);
        break;
      case "DRAG_UPDATE":
        if (source && destination) {
          moveTask(source.droppableId, destination.droppableId, taskId);
        }
        break;
      default:
        console.log("Action non reconnue.");
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        created: [
          ...prevTasks.created,
          { id: Date.now(), text: newTask, completed: false },
        ],
      }));
      setNewTask("");
    }
  };

  const removeTask = (id) => {
    const column = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === id)
    );
    const taskToRemove = tasks[column].find((task) => task.id === id);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].filter((task) => task.id !== id),
    }));
    setLastDeletedTask(taskToRemove);
  };

  const undoDelete = () => {
    if (lastDeletedTask) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        created: [...prevTasks.created, lastDeletedTask],
      }));
      setLastDeletedTask(null);
    }
  };

  const toggleTaskCompletion = (id) => {
    const column = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === id)
    );
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const moveTask = (sourceColumn, destinationColumn, taskId) => {
    const taskToMove = tasks[sourceColumn].find((task) => task.id === taskId);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [sourceColumn]: prevTasks[sourceColumn].filter(
        (task) => task.id !== taskId
      ),
      [destinationColumn]: [...prevTasks[destinationColumn], taskToMove],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <main>
      <section className="form-section">
        <h1>Gestionnaire de tâches</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="inputTask"
            placeholder="Nouvelle tâche..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <MdPlaylistAddCircle
            className="add-task-button"
            onClick={handleSubmit}
            role="button"
            aria-label="Ajouter une tâche"
          />
        </form>
      </section>
      <section className="task-board-section">
        <TaskBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        {lastDeletedTask && (
          <div className="undo-notification">
            <span>Tâche supprimée : &quot;{lastDeletedTask.text}&quot;</span>
            <LiaUndoAltSolid className="undo-button" onClick={undoDelete} />
            <RiCloseLargeLine
              className="task-remove-button"
              onClick={() => setLastDeletedTask(null)}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default TaskManager;
