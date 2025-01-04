import { decodeToken } from "react-jwt";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

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
import ProtectedRoute from "./components/ProtectedRoute";
import { DRIVE_EMBED_URL } from "./constants/common";
import { AuthProvider } from "./context/AuthContext";
import { day2Date } from "./utils/formatDate";

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
      element: <ProtectedRoute component={Root} />,
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
          element: <ProtectedRoute component={Dashboard} />,
        },
        {
          path: "classes/:classId",
          element: <ProtectedRoute component={ClassDetail} />,
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
              element: <ProtectedRoute component={NotificationTabContent} />,
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
              element: <ProtectedRoute component={StudentTabContent} />,
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
              element: <ProtectedRoute component={ScheduleTabContent} />,
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
              element: <ProtectedRoute component={AssignmentTabContent} />,
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
              element: <ProtectedRoute component={SessionTabContent} />,
            },
            {
              path: "resource",
              element: (
                <ProtectedRoute>
                  <iframe src={DRIVE_EMBED_URL} className="w-100 vh-100" />
                </ProtectedRoute>
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
          element: <ProtectedRoute component={StudentProfile} />,
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
              element: <ProtectedRoute component={OverviewTabContent} />,
            },
            {
              path: "progress",
              element: <ProtectedRoute component={ProgressTabContent} />,
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
              element: <ProtectedRoute component={AcademicTabContent} />,
            },
            {
              path: "feedback",
              element: <ProtectedRoute component={FeedbackTabContent} />,
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
