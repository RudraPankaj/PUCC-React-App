import React, { useEffect, useState } from 'react';

const Notification = ({ notification, onClose }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 500); // Corresponds to exit animation duration
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification.duration, onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onClose, 500);
  };

  const typeClasses = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  return (
    <div
      className={`relative rounded-lg shadow-lg p-4 mb-4 transition-all duration-500 border-l-4 ${exiting ? 'opacity-0 transform translate-x-full' : 'opacity-100 transform translate-x-0'} ${typeClasses[notification.type] || typeClasses.info}`}>
      <div className="flex items-center">
        <p className="font-semibold">{notification.message}</p>
      </div>
      <button onClick={handleClose} className="absolute top-1 right-1 text-inherit opacity-70 hover:opacity-100" aria-label="Close notification">
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  );
};

export default Notification;
