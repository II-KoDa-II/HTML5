import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onShare, onTogglePin }) => {
  const pinnedTasks = tasks.filter(task => task.pinned);
  const unpinnedTasks = tasks.filter(task => !task.pinned);
  const pinnedCount = pinnedTasks.length;

  return (
    <div id="task-container">
      {tasks.length === 0 ? (
        <div id="no-tasks">
          <hr />
          <p>No tasks</p>
          <hr />
        </div>
      ) : (
        <>
          <Droppable droppableId="pinned">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {pinnedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onShare={onShare}
                        onTogglePin={onTogglePin}
                        provided={provided}
                        isPinDisabled={false}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="unpinned">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {unpinnedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onShare={onShare}
                        onTogglePin={onTogglePin}
                        provided={provided}
                        isPinDisabled={pinnedCount >= 3}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </>
      )}
    </div>
  );
};

export default TaskList;