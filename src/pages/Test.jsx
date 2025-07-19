import { useState } from "react";
import Notification from "../component/Notification";

const Test = () => {
  const [notif, setNotif] = useState(null);

  const showSuccess = () => {
    setNotif({
      message: "Video uploaded successfully!",
      color: "green",
      duration: 3000
    });
  };

  const showError = () => {
    setNotif({
      message: "Failed to upload. Try again.",
      color: "red",
      duration: 4000
    });
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>

      {notif && (
        <Notification
          message={notif.message}
          color={notif.color}
          duration={notif.duration}
          onClose={() => setNotif(null)}
        />
      )}
    </div>
  );
}

export default Test;
