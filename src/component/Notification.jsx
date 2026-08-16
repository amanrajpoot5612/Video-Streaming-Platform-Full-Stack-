import { useEffect } from "react";

export default function Notification({ message, color = "green", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const tone = color === "green" ? "bugsy-notification--success" : "bugsy-notification--error";
  return <div className={`bugsy-notification ${tone}`} role="status">{message || "Something went wrong. Please try again."}</div>;
}
