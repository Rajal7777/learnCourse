import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, isOpen, onClose }) {
  //create a reference to <dialog>
  const dialogRef = useRef(null);

  //sync React state to DOM behavior
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      //open modal using native API
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]); //[isOpen] --> Runs when isOpen changes

  //   handle backdrop click
  function handleClick(e) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  function handleClose() {
    onClose();
  }

  return createPortal(
    <>
      <dialog
        className="Modal"
        ref={dialogRef}
        onClose={handleClose}
        onClick={handleClick}
      >
        <h1>Modal open</h1>
        {children}
      </dialog>
    </>,
    document.getElementById("modal"),
  );
}
