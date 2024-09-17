import PropTypes from "prop-types";

const Task = ({ task, onRemove, onToggleCompletion }) => {
  return (
    <div className="task">
      <span
        style={{ color: task.completed ? "green" : "" }}
        className={`task-text ${task.completed ? "completed" : ""}`}
        onClick={onToggleCompletion}
      >
        {task.text}
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          readOnly
          onChange={onToggleCompletion}
        />
      </span>
      <button className="task-remove-button" onClick={onRemove}>
        x
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
};

export default Task;
