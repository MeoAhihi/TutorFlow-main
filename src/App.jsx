import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/pages/Error";
import { DRIVE_EMBED_URL } from "./constants/common";
import { AuthProvider } from "./context/AuthContext";
import AcademicTabContent, {
  loader as academicLoader,
} from "./routes/AcademicTabContent";
import AssignmentTabContent, {
  loader as assignmentLoader,
} from "./routes/AssignmentTabContent";
import ClassDetail from "./routes/ClassDetail";
import Dashboard, { loader as dashboardLoader } from "./routes/Dashboard";
import FeedbackTabContent from "./routes/FeedbackTabContent";
import Login from "./routes/Login";
import NewClass, { action as newClassAction } from "./routes/NewClass";
import NewSession, { action as newSessionAction } from "./routes/NewSession";
import NewStudent, { action as newStudentAction } from "./routes/NewStudent";
import NotificationTabContent, {
  loader as notificationLoader,
} from "./routes/NotificationTabContent";
import OverviewTabContent, {
  loader as overviewLoader,
} from "./routes/OverviewTabContent";
import ProgressTabContent from "./routes/ProgressTabContent";
import Root, { loader as rootLoader } from "./routes/Root";
import ScheduleTabContent, {
  loader as scheduleLoader,
} from "./routes/ScheduleTabContent";
import SessionTabContent, {
  action as sessionAction,
  loader as sessionLoader,
} from "./routes/SessionTabContent";
import Signup from "./routes/Signup";
import StudentProfile, {
  loader as studentProfileLoader,
} from "./routes/StudentProfile";
import StudentTabContent, {
  loader as studentLoader,
} from "./routes/StudentTabContent";
import UpdateClass, {
  action as updateClassAction,
  loader as updateClassLoader,
} from "./routes/UpdateClass";
import UpdateStudent, {
  action as updateStudentAction,
  loader as updateStudentLoader,
} from "./routes/UpdateStudent";

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
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      loader: rootLoader,
      children: [
        {
          index: true,
          loader: dashboardLoader,
          element: <Dashboard />,
        },
        {
          path: "classes/new",
          action: newClassAction,
          element: <NewClass />,
        },
        {
          path: "classes/:classId",
          element: <ClassDetail />,
          children: [
            {
              path: "overview",
              loader: notificationLoader,
              element: <NotificationTabContent />,
            },
            {
              path: "students",
              loader: studentLoader,
              element: <StudentTabContent />,
            },
            {
              path: "schedules",
              loader: scheduleLoader,
              element: <ScheduleTabContent />,
            },
            {
              path: "assignments",
              loader: assignmentLoader,
              element: <AssignmentTabContent />,
            },
            {
              path: "sessions",
              loader: sessionLoader,
              action: sessionAction,
              element: <SessionTabContent />,
            },
            {
              path: "resources",
              element: (
                <iframe src={DRIVE_EMBED_URL} className="w-100 vh-100" />
              ),
            },
          ],
        },
        {
          path: "classes/:classId/edit",
          loader: updateClassLoader,
          action: updateClassAction,
          element: <UpdateClass />,
        },
        {
          path: "students/new",
          action: newStudentAction,
          element: <NewStudent />,
        },
        {
          path: "/classes/:classId/sessions/new",
          action: newSessionAction,
          element: <NewSession />,
        },
        {
          path: "students/:studentId",
          loader: studentProfileLoader,
          element: <StudentProfile />,
          children: [
            {
              index: true,
              loader: overviewLoader,
              element: <OverviewTabContent />,
            },
            {
              path: "progress",
              element: <ProgressTabContent />,
            },
            {
              path: "academic",
              loader: academicLoader,
              element: <AcademicTabContent />,
            },
            {
              path: "feedback",
              element: <FeedbackTabContent />,
            },
          ],
        },
        {
          path: "students/:studentId/edit",
          loader: updateStudentLoader,
          action: updateStudentAction,
          element: <UpdateStudent />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
