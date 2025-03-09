import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-delete" onClick={e => e.stopPropagation()}>
        <p>Delete this task?</p>
        <div className="horizontal-flex">
          <button className="text-button" onClick={onConfirm}>Yes</button>
          <button className="cancel text-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;