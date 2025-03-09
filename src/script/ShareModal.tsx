import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

function ShareModal({ isOpen, onClose, onCopy }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-share" onClick={e => e.stopPropagation()}>
        <button id="copy-task" onClick={onCopy}><img src="src/assets/icons/copy.svg" alt="Copy" /></button>
        <button className="sharing-option"><img src="src/assets/icons/vk.svg" alt="VK" /></button>
        <button className="sharing-option"><img src="src/assets/icons/telegram.svg" alt="Telegram" /></button>
        <button className="sharing-option"><img src="src/assets/icons/whatsapp.svg" alt="WhatsApp" /></button>
        <button className="sharing-option"><img src="src/assets/icons/facebook.svg" alt="Facebook" /></button>
      </div>
    </div>
  );
}

export default ShareModal;