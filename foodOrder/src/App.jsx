import Meals from "./component/Meals";
import Header from "./component/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header title="React logo" />
        <Meals />
        <Cart/>
      <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
