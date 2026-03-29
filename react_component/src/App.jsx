import { useState } from "react";

import Button from "./component/ui/Button";
import Modal from "./component/ui/modal";


export default function App() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(){
    setIsModalOpen(true)
  }

  function closeModal(){
    setIsModalOpen(false)
  }

  return (
    <>
      <p>count:{count}</p>
      <Button className="btn-app" onClick={() =>setCount(count + 1)}>Click me</Button>
      <Button onClick={openModal}>Open</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <code>This is a modal render</code>
        <p>+reUseable</p>
      </Modal>
    </>
  );
}
