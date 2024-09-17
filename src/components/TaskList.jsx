import PropTypes from "prop-types";
import { Draggable } from "@hello-pangea/dnd";
import Task from "./Task";

const TaskList = ({ tasks, onTaskUpdate }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="task-item"
            >
              <Task
                task={task}
                onRemove={() =>
                  onTaskUpdate({ type: "REMOVE", taskId: task.id })
                }
                onToggleCompletion={() =>
                  onTaskUpdate({
                    type: "TOGGLE_COMPLETION",
                    taskId: task.id,
                  })
                }
              />
            </div>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default TaskList;
