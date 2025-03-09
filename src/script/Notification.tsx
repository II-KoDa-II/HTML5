import React from 'react';

interface NotificationProps {
  message: string;
}

function Notification({ message }: NotificationProps) {
  return (
    <div id="notification" className={`notification ${message ? 'show' : ''}`}>
      {message}
    </div>
  );
}

export default Notification;