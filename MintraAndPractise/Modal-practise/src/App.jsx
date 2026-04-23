import { useState} from "react";

import Button from "./component/ui/Button";
import Modal from "./component/ui/modal";
import  { ThemeContextProvider } from "./store/Theme";
import ModalUse from "./ModalUse";


export default function App() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);



  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <ThemeContextProvider>
      <p>count:{count}</p>
      <Button className="btn-app" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <ModalUse />
  
      <Button onClick={openModal}>Open</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
       
      >
        <code>This is a modal render</code>
        <p>TEST BUTTON VISIBLE</p>
      </Modal>
    </ThemeContextProvider>
  );
}
