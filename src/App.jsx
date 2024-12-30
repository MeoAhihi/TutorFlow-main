import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";
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
import axios from "axios";
import { decodeToken, isExpired } from "react-jwt";
import NotificationTabContent from "./components/NotificationTabContent";
import StudentTabContent from "./components/StudentTabContent";
import ScheduleTabContent from "./components/ScheduleTabContent";
import AssignmentTabContent from "./components/AssignmentTabContent";
import SessionTabContent from "./components/SessionTabContent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      loader: () => {
        const jwt = localStorage.getItem("jwt");
        if (isExpired(jwt)) localStorage.removeItem("jwt");
        if (jwt) return redirect("/");
        return null;
      },
      element: <Login />,
    },
    {
      path: "/signup",
      loader: () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) return redirect("/");
        return null;
      },
      element: <Signup />,
    },
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      loader: async () => {
        const jwt = localStorage.getItem("jwt");
        if (isExpired(jwt)) localStorage.removeItem("jwt");
        if (!jwt) return redirect("/login");
        const students = await axios.get(
          "http://localhost:3000/api/v1/students",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        const classes = await axios.get(
          "http://localhost:3000/api/v1/classes",
          {
            headers: {
              Authorization: "Bearer " + jwt,
            },
          }
        );

        return {
          students: students.data.student.map((student) => ({
            id: student.User.id,
            name: student.User.firstName + " " + student.User.lastName,
          })),
          classes: classes.data.classes.map((classInfo) => ({
            id: classInfo.id,
            name: classInfo.name,
          })),
        };
      },
      children: [
        {
          index: true,
          loader: () => {
            const jwt = localStorage.getItem("jwt");
            const tutorInfo = decodeToken(jwt);
            console.log(tutorInfo);
            return {
              tutorName:
                (tutorInfo.firstName ?? "") + " " + (tutorInfo.lastName ?? ""),
              avatarUrl: tutorInfo.avatarUrl ?? "",
            };
          },
          element: <Dashboard />,
        },
        {
          path: "classes/:classId",
          element: <ClassDetail />,
          children: [
            {
              path: "notification",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const classInfo = await axios.get(
                  "http://localhost:3000/api/v1/classes/" + params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );

                return {
                  name: classInfo.name,
                  createdAt: Date(classInfo.createdAt),
                  description: classInfo.description,
                  subject: classInfo.subject,
                  type: classInfo.type,
                };
              },
              element: <NotificationTabContent />,
            },
            {
              path: "student",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const classInfo = await axios.get(
                  "http://localhost:3000/api/v1/classes/" + params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );

                const attendances = await axios.get(
                  "http://localhost:3000/api/v1/sessions/attendances?classId=" +
                    params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  students: classInfo.data.students,
                  attendances: attendances.data,
                };
              },
              element: <StudentTabContent />,
            },
            {
              path: "schedule",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const classInfo = await axios.get(
                  "http://localhost:3000/api/v1/classes/" + params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                const weeklySchedule = await axios.get(
                  "http://localhost:3000/api/v1/schedules/current-week",
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  classInfo: classInfo.data.class,
                  weeklySchedule: weeklySchedule.data,
                };
              },
              element: <ScheduleTabContent />,
            },
            {
              path: "assignment",
              element: <AssignmentTabContent />,
            },
            {
              path: "session",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const classInfo = await axios.get(
                  "http://localhost:3000/api/v1/classes/" + params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                const sessions = await axios.get(
                  "http://localhost:3000/api/v1/sessions?classId=" +
                    params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  students: classInfo.data.students,
                  sessions: sessions.data.Sessions,
                };
              },
              element: <SessionTabContent />,
            },
            {
              path: "resource",
              element: (
                <iframe
                  src="https://drive.google.com/embeddedfolderview?id=1vbGvSNIdE4NMV17PnR8VDSwOBJqmKIxq#grid"
                  className="w-100 vh-100"
                />
              ),
            },
          ],
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
