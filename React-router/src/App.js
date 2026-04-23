import { createBrowserRouter, RouterProvider } from "react-router-dom";

//alternate
// import  { createRoutesFromElements, Route} from 'react-router-dom';

import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";

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
//incase of error react-router provides a errorElement where we can display the Error handeling UI,
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
