import { decodeToken } from "react-jwt";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/pages/Error";
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
  loader as sessionLoader,
} from "./routes/SessionTabContent";
import Signup from "./routes/Signup";
import StudentProfile, {
  loader as studentProfileLoader,
} from "./routes/StudentProfile";
import StudentTabContent, {
  loader as studentLoader,
} from "./routes/StudentTabContent";

import {
  getAssignments,
  getAttendances,
  getClasses,
  getClassId,
  getSchedulesDefault,
  getSchedulesOffset,
  getSessions,
} from "./api/classes.api";
import { getStudentInfo, getStudents } from "./api/students.api";
import { DRIVE_EMBED_URL } from "./constants/common";
import { day2Date } from "./utils/formatDate";
import { AuthProvider } from "./context/AuthContext";
import NewClass from "./routes/NewClass";
import UpdateClass, { loader as updateClassLoader } from "./routes/UpdateClass";

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
              path: "student",
              loader: studentLoader,
              element: <StudentTabContent />,
            },
            {
              path: "schedule",
              loader: scheduleLoader,
              element: <ScheduleTabContent />,
            },
            {
              path: "assignment",
              loader: assignmentLoader,
              element: <AssignmentTabContent />,
            },
            {
              path: "session",
              loader: sessionLoader,
              element: <SessionTabContent />,
            },
            {
              path: "resource",
              element: (
                <iframe src={DRIVE_EMBED_URL} className="w-100 vh-100" />
              ),
            },
          ],
        },
        {
          path: "classes/:classId/edit",
          loader: updateClassLoader,
          element: <UpdateClass />,
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
