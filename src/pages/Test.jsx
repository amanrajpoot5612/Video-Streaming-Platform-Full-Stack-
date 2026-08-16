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
    <div className="standalone-page" style={{ display: "grid", placeItems: "center" }}>
      <div className="settings-card" style={{ display: "flex", gap: 12 }}>
        <button className="bugsy-btn bugsy-btn--primary" onClick={showSuccess}>Show success</button>
        <button className="bugsy-btn bugsy-btn--ghost" onClick={showError}>Show error</button>
      </div>

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
