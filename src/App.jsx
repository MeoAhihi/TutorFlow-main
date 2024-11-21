import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Root, { loader as studentLoader } from "./routes/root";
import Error from "./pages/Error";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ClassDetail from "./routes/ClassDetail";
import StudentProfile from "./routes/StudentProfile";
import OverviewTabContent from "./routes/OverviewTabContent";
import ProgressTabContent from "./routes/ProgressTabContent";
import AcademicTabContent from "./routes/AcademicTabContent";
import FeedbackTabContent from "./routes/FeedbackTabContent";

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
          index: true,
          element: <Dashboard />,
        },
        {
          path: "classes/:classId",
          element: <ClassDetail />,
        },
        {
          path: "students/:studentId",
          element: <StudentProfile />,
          children: [
            {
              index: true,
              element: <OverviewTabContent />,
            },
            {
              path: "progress",
              element: <ProgressTabContent />,
            },
            {
              path: "academic",
              element: <AcademicTabContent />,
            },
            {
              path: "feedback",
              element: <FeedbackTabContent />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
