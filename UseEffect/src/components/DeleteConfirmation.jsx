import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const Timer = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    // console.log("Timer started ");
    const Timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // Cleanup function to clear the Timer if the component unmounts before the Timer completes
    return () => {
      // console.log("cleanup Timer running");
      clearTimeout(Timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={Timer} />
    </div>
  );
}
