import { decodeToken } from "react-jwt";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./components/pages/Error";
import AcademicTabContent from "./routes/AcademicTabContent";
import AssignmentTabContent from "./routes/AssignmentTabContent";
import ClassDetail from "./routes/ClassDetail";
import Dashboard from "./routes/Dashboard";
import FeedbackTabContent from "./routes/FeedbackTabContent";
import Login from "./routes/Login";
import NotificationTabContent from "./routes/NotificationTabContent";
import OverviewTabContent from "./routes/OverviewTabContent";
import ProgressTabContent from "./routes/ProgressTabContent";
import Root from "./routes/Root";
import ScheduleTabContent from "./routes/ScheduleTabContent";
import SessionTabContent from "./routes/SessionTabContent";
import Signup from "./routes/Signup";
import StudentProfile from "./routes/StudentProfile";
import StudentTabContent from "./routes/StudentTabContent";

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
      loader: async () => {
        try {
          const students = await getStudents();
          const classes = await getClasses();
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
        } catch (error) {
          console.log(error);
        }
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
          children: [
            {
              path: "overview",
              loader: async ({ params }) => {
                try {
                  const classInfo = await getClassId(params.classId);
                  return {
                    name: classInfo.data.class.name,
                    createdAt: Date(classInfo.data.class.createdAt),
                    description: classInfo.data.class.description,
                    subject: classInfo.data.class.subject,
                    type: classInfo.data.class.type,
                  };
                } catch (error) {
                  console.log(error);
                }
              },
              element: <NotificationTabContent />,
            },
            {
              path: "student",
              loader: async ({ params }) => {
                try {
                  const classInfo = await getClassId(params.classId);
                  const attendances = await getAttendances(params.classId);
                  return {
                    students: classInfo.data.students,
                    attendances: attendances.data,
                  };
                } catch (error) {
                  console.log(error);
                }
              },
              element: <StudentTabContent />,
            },
            {
              path: "schedule",
              loader: async ({ params }) => {
                try {
                  const classInfo = await getClassId(params.classId);
                  const defaultSchedules = await getSchedulesDefault(
                    params.classId
                  );
                  const offsetSchedules = await getSchedulesOffset(
                    params.classId
                  );
                  return {
                    startDate: day2Date("mon"),
                    endDate: day2Date("sun"),
                    classInfo: classInfo.data.class,
                    defaultSchedules:
                      defaultSchedules.data.DefaultSchedules.map(
                        ({ id, day, startTime, endTime }) => ({
                          id,
                          startTime,
                          endTime,
                          date: day2Date(day),
                        })
                      ),
                    offsetSchedules: offsetSchedules.data.OffsetSchedules,
                  };
                } catch (error) {
                  console.log(error);
                }
              },
              element: <ScheduleTabContent />,
            },
            {
              path: "assignment",
              loader: async ({ params }) => {
                try {
                  const assignments = await getAssignments(params.classId);
                  return { assignments: assignments.data.Assignments };
                } catch (error) {
                  console.log(error);
                }
              },
              element: <AssignmentTabContent />,
            },
            {
              path: "session",
              loader: async ({ params }) => {
                try {
                  const classInfo = await getClassId(params.classId);
                  const sessions = await getSessions(params.classId);

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
                } catch (error) {
                  console.log(error);
                }
              },
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
          path: "students/:studentId",
          loader: async ({ params }) => {
            try {
              const student = await getStudentInfo(params.studentId);

              return {
                student: student.data.student,
                profile: student.data.profile,
              };
            } catch (error) {
              console.log(error);
            }
          },
          element: <StudentProfile />,
          children: [
            {
              index: true,
              loader: async ({ params }) => {
                try {
                  const student = await getStudentInfo(params.studentId);

                  return {
                    student: student.data.student,
                    profile: student.data.profile,
                  };
                } catch (error) {
                  console.log(error);
                }
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
                try {
                  const student = await getStudentInfo(params.studentId);

                  return {
                    student: student.data.student,
                    profile: student.data.profile,
                  };
                } catch (error) {
                  console.log(error);
                }
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

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
