import Meals from "./component/Meals";
import Header from "./component/Header";
import { MealProvider } from "./store/MealContext";

function App() {
  return (
    <MealProvider>
      <Header title="React logo" />
 <Meals />
    </MealProvider>
  );
}

export default App;
