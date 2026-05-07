import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

console.log("modal.jsx")
export default function Modal({ children, isOpen}) {
  //create a reference to <dialog>
  const dialogRef = useRef(null);

  //sync React state to DOM behavior
  useEffect(() => {
    const modal = dialogRef.current;


    if (isOpen) {
      //open modal using native API
      modal.showModal();
      console.log("from modal jsx")
    } 

   return () => modal.close();
  }, [isOpen]); //[isOpen] --> Runs when isOpen changes

  // // handle backdrop click
  // function handleClick(e) {
  //   if (e.target === dialogRef.current) {
  //     onClose();
  //   }
  // }

  return createPortal(
    <>
      <dialog
      className="Modal"
        ref={dialogRef}
        
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal"),
  );
}
