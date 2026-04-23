import { createBrowserRouter, RouterProvider } from "react-router-dom";



import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ProductDetailPage from "./pages/ProductDetail";



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
      { path: '/products/:productId', element: <ProductDetailPage /> },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
