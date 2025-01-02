import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import { decodeToken, isExpired } from "react-jwt";

import Root from "./routes/Root";
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
import NotificationTabContent from "./components/NotificationTabContent";
import StudentTabContent from "./components/StudentTabContent";
import ScheduleTabContent from "./components/ScheduleTabContent";
import AssignmentTabContent from "./components/AssignmentTabContent";
import SessionTabContent from "./components/SessionTabContent";

import "bootstrap/dist/css/bootstrap.min.css";

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
        console.log(students);
        return {
          students: students.data.student.map((student) => ({
            id: student.id,
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
          // loader: ({ params }) => {
          //   return redirect("/classes/" + params.classId + "/overview");
          // },
          children: [
            {
              path: "overview",
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
                  name: classInfo.data.class.name,
                  createdAt: Date(classInfo.data.class.createdAt),
                  description: classInfo.data.class.description,
                  subject: classInfo.data.class.subject,
                  type: classInfo.data.class.type,
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

                const day2Date = (day) => {
                  const day2Index = {
                    mon: 1,
                    tue: 2,
                    wed: 3,
                    thu: 4,
                    fri: 5,
                    sat: 6,
                    sun: 7,
                  };
                  const d = new Date(),
                    today = d.getDay(),
                    year = d.getFullYear(),
                    monthIndex = d.getMonth(),
                    date = d.getDate();

                  return new Date(
                    year,
                    monthIndex,
                    date - today + day2Index[day]
                  );
                };

                const classInfo = await axios.get(
                  "http://localhost:3000/api/v1/classes/" + params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                const defaultSchedules = await axios.get(
                  "http://localhost:3000/api/v1/schedules/default?classId=" +
                    params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                const offsetSchedule = await axios.get(
                  "http://localhost:3000/api/v1/schedules/offset?classId=" +
                    params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  startDate: day2Date("mon"),
                  endDate: day2Date("sun"),
                  classInfo: classInfo.data.class,
                  defaultSchedules: defaultSchedules.data.DefaultSchedules.map(
                    ({ id, day, startTime, endTime }) => ({
                      id,
                      startTime,
                      endTime,
                      date: day2Date(day),
                    })
                  ),
                  offsetSchedules: offsetSchedule.data.OffsetSchedules,
                };
              },
              element: <ScheduleTabContent />,
            },
            {
              path: "assignment",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const assignments = await axios.get(
                  "http://localhost:3000/api/v1/assignments?classId=" +
                    params.classId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return { assignments: assignments.data.Assignments };
              },
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
                const current = new Date();
                const startThisMonth = new Date(
                  current.getFullYear(),
                  current.getMonth(),
                  1
                );
                const startLastMonth = new Date(
                  current.getFullYear(),
                  current.getMonth() - 1,
                  1
                );
                return {
                  students: classInfo.data.students,
                  sessions: sessions.data.Sessions,
                  thisMonthSessions: sessions.data.Sessions.filter(
                    (session) => startThisMonth < new Date(session.createdAt)
                  ),
                  lastMonthSessions: sessions.data.Sessions.filter(
                    (session) =>
                      startLastMonth < new Date(session.createdAt) &&
                      new Date(session.createdAt) < startThisMonth
                  ),
                  earlierSessions: sessions.data.Sessions.filter(
                    (session) =>
                      startLastMonth < new Date(session.createdAt) &&
                      new Date(session.createdAt) < startLastMonth
                  ),
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
          loader: async ({ params }) => {
            const jwt = localStorage.getItem("jwt");
            const student = await axios.get(
              "http://localhost:3000/api/v1/students/" + params.studentId,
              {
                headers: {
                  Authorization: "Bearer " + jwt,
                },
              }
            );
            return {
              student: student.data.student,
              profile: student.data.profile,
            };
          },
          element: <StudentProfile />,
          children: [
            {
              index: true,
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const student = await axios.get(
                  "http://localhost:3000/api/v1/students/" + params.studentId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  student: student.data.student,
                  profile: student.data.profile,
                };
              },
              element: <OverviewTabContent />,
            },
            {
              path: "progress",
              element: <ProgressTabContent />,
            },
            {
              path: "academic",
              loader: async ({ params }) => {
                const jwt = localStorage.getItem("jwt");
                const student = await axios.get(
                  "http://localhost:3000/api/v1/students/" + params.studentId,
                  {
                    headers: {
                      Authorization: "Bearer " + jwt,
                    },
                  }
                );
                return {
                  student: student.data.student,
                  profile: student.data.profile,
                };
              },
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
