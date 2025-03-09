import React, { useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onTogglePin: (id: string) => void;
  provided: DraggableProvided;
  isPinDisabled: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  onShare,
  onTogglePin,
  provided,
  isPinDisabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={task.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="whole-task">
        <div className="individual-task">
          <div className="vertical-flex">
            <p className="title-container">{task.title}</p>
            <p className="about-container">{task.about}</p>
          </div>
          <div className="individual-button">
            {task.pinned ? (
              <img src="src/assets/icons/pin.svg" className="pinned-button" />
            ) : (
              <button className="task-buttons delete-button" onClick={() => onDelete(task.id)}>
                <img src="src/assets/icons/delete.svg" alt="Delete" />
              </button>
            )}
          </div>
        </div>
        <div
          className="button-container task-buttons"
          style={{ display: isHovered ? 'flex' : 'none' }}
        >
          <button
            className="task-buttons pin-button"
            onClick={() => onTogglePin(task.id)}
            disabled={!task.pinned && isPinDisabled}
          >
            <img
              src={task.pinned ? "src/assets/icons/unpin.svg" : "src/assets/icons/pin.svg"}
              alt={task.pinned ? "Unpin" : "Pin"}
            />
          </button>
          <button className="task-buttons share-button" onClick={() => onShare(task.id)}>
            <img src="src/assets/icons/share.svg" alt="Share" />
          </button>
          <button className="task-buttons info-button">
            <img src="src/assets/icons/info.svg" alt="Info" />
          </button>
          <button className="task-buttons edit-button" onClick={() => onEdit(task.id)}>
            <img src="src/assets/icons/edit.svg" alt="Edit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;