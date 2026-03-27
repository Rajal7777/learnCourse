import { useContext } from "react";

import cartImage from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header({ title }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);
 
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={cartImage} alt="logo" />
        <h2 id="title">{title}</h2>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </div>
  );
}
