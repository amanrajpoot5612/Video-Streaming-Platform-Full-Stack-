import { useEffect } from "react";

export default function Notification({ message, color = "green", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg bg-${color}-500 text-white animate-slide-in`}>
      {message}
    </div>
  );
}
