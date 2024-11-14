import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as studentLoader } from "./routes/root";
import Error from "./pages/Error";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ClassDetail from "./routes/ClassDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      loader: studentLoader,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "classes/:classId",
          element: <ClassDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
