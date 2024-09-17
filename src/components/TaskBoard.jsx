import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskList from "./TaskList";

const TaskBoard = ({ tasks, onTaskUpdate }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    onTaskUpdate({
      type: "DRAG_UPDATE",
      source,
      destination,
      taskId: parseInt(draggableId, 10),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {["created", "inProgress", "completed"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`task-column ${status}`}
              >
                <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                <TaskList tasks={tasks[status]} onTaskUpdate={onTaskUpdate} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

TaskBoard.propTypes = {
  tasks: PropTypes.shape({
    created: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    inProgress: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    completed: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default TaskBoard;
