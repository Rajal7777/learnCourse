import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();
 console.log(open)
  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
      console.log('from modal.jsx')
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
