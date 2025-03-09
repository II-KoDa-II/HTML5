import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, about: string) => void;
  title: string;
  about: string;
  showNotification: (message: string) => void;
}

function EditModal({ isOpen, onClose, onSave, title: initialTitle, about: initialAbout, showNotification }: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [about, setAbout] = useState(initialAbout);

  useEffect(() => {
    setTitle(initialTitle);
    setAbout(initialAbout);
  }, [initialTitle, initialAbout]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-edit">
        <div className="edit-form">
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Task"
          />
          <textarea
            value={about}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
            placeholder="About..."
          />
        </div>
        <div className="horizontal-flex">
          <button type="button" className="text-button" onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              if (!title.trim() || !about.trim()) {
                showNotification('Failed to create a task:\nTitle and About fields must be filled in');
                return;
              }
              onSave(title, about);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;