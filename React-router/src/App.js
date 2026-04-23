import { createBrowserRouter, RouterProvider } from "react-router-dom";

//alternate
// import  { createRoutesFromElements, Route} from 'react-router-dom';


import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";


//Alternate Method
/*
const routeDefinations = createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
    </Route>
)
const router = createBrowserRouter(routeDefinations);

*/



//Create the router configuration
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: '/product', element: <ProductPage />}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
