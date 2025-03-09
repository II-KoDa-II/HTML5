import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { RootState } from './store';
import { createTask, deleteTask, updateTask, reorderTasks, togglePin } from './script/TasksSlice';
import CreateForm from './script/CreateForm';
import TaskList from './script/TaskList';
import Notification from './script/Notification';
import DeleteModal from './script/DeleteModal';
import EditModal from './script/EditModal';
import ShareModal from './script/ShareModal';
import './styles/main.css';
import './styles/modals.css';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [notification, setNotification] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  const handleCreateTask = (title: string, about: string) => {
    dispatch(createTask({ title, about }));
    showNotification('Task created');
  };

  const handleDeleteTask = () => {
    if (currentTaskId) {
      dispatch(deleteTask(currentTaskId));
      showNotification('Task deleted');
      setDeleteModalOpen(false);
    }
  };

  const handleUpdateTask = (title: string, about: string) => {
    if (currentTaskId) {
      dispatch(updateTask({ id: currentTaskId, title, about }));
      showNotification('Changes saved');
      setEditModalOpen(false);
    }
  };

  const copyTask = () => {
    if (!currentTaskId) return;
    const task = tasks.find(task => task.id === currentTaskId);
    if (task) {
      const textToCopy = `Title: ${task.title}\nAbout: ${task.about}`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => showNotification('Copied to clipboard'))
        .catch(() => showNotification('Failed to copy'));
    }
  };

  const handleTogglePin = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const intendedPinnedState = !task.pinned;
    if (intendedPinnedState) {
      const pinnedCount = tasks.filter(t => t.pinned).length;
      if (pinnedCount >= 3) {
        showNotification('Maximum of 3 pinned tasks reached');
        return;
      }
    }

    dispatch(togglePin(taskId));
    showNotification(intendedPinnedState ? 'Task pinned' : 'Task unpinned');
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const isPinned = source.droppableId === 'pinned';
      const filteredTasks = isPinned ? tasks.filter(t => t.pinned) : tasks.filter(t => !t.pinned);
      const reorderedTasks = Array.from(filteredTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      const updatedTasks = isPinned 
        ? [...reorderedTasks, ...tasks.filter(t => !t.pinned)]
        : [...tasks.filter(t => t.pinned), ...reorderedTasks];

      dispatch(reorderTasks(updatedTasks));
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div>
      <CreateForm onCreate={handleCreateTask} showNotification={showNotification} />
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList 
          tasks={tasks}
          onDelete={(id) => {
            setCurrentTaskId(id);
            setDeleteModalOpen(true);
          }}
          onEdit={(id) => {
            const task = tasks.find(t => t.id === id);
            if (task) {
              setTitle(task.title);
              setAbout(task.about);
              setCurrentTaskId(id);
              setEditModalOpen(true);
            }
          }}
          onShare={(id) => {
            setCurrentTaskId(id);
            setShareModalOpen(true);
          }}
          onTogglePin={handleTogglePin}
        />
      </DragDropContext>
      <Notification message={notification} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleUpdateTask}
        title={title}
        about={about}
        showNotification={showNotification}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onCopy={copyTask}
      />
    </div>
  );
}

export default App;