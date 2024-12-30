import React from "react";
import { Col, Image, Row, Stack, Table } from "react-bootstrap";
import { CheckSquare } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
export default function StudentTabContent() {
  const { students, attendances } = useLoaderData();
  const attendedStudents = students.map((student) => {
    const attendedSessionIds = attendances.map((session) =>
      session.StudentProfiles.map((profile) => profile.id).includes(
        student.profile.id
      )
    );
    const attendanceCount = attendedSessionIds.reduce(
      (accumulator, attendance) => accumulator + attendance,
      0
    );
    const totalSessions = attendedSessionIds.length;
    return {
      id: student.profile.id,
      name: student.student.firstName + " " + student.student.lastName,
      attendedSessionIds,
      attendanceCount,
      totalSessions,
      percentage: (totalSessions === 0
        ? 0
        : (attendanceCount * 100) / totalSessions
      ).toFixed(0),
    };
  });

  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <h2>Attendance</h2>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>Student</th>
              {attendances.map((session) => {
                const datetime = new Date(session.createdAt);
                const date = datetime.getDate();
                const month = datetime.getMonth() + 1;
                return (
                  <th key={session.id}>
                    {date}/{month}
                  </th>
                );
              })}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {attendedStudents.map((student, i) => {
              return (
                <tr key={student.id}>
                  <td>{i + 1}</td>
                  <td className="d-flex align-items-center">
                    <Image
                      roundedCircle
                      src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg"
                      width={30}
                      className="mx-2"
                    />
                    <p className="m-0">{student.name}</p>
                  </td>
                  {student.attendedSessionIds.map((isAttended, i) =>
                    isAttended ? (
                      <td key={i}>
                        <CheckSquare />
                      </td>
                    ) : (
                      <td key={i}></td>
                    )
                  )}
                  <td>
                    {student.attendanceCount}/{student.totalSessions} (
                    {student.percentage}%)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="mb-4" />
        <h2>Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              {
                name: "test 1",
                "Student 1": 7.11,
                "Student 2": 5.46,
                "Student 3": 6.99,
              },
              {
                name: "test 2",
                "Student 1": 5.44,
                "Student 2": 7.54,
                "Student 3": 5.74,
              },
              {
                name: "test 3",
                "Student 1": 8.57,
                "Student 2": 7.05,
                "Student 3": 6.55,
              },
              {
                name: "test 4",
                "Student 1": 6.8,
                "Student 2": 8.88,
                "Student 3": 5.57,
              },
            ]}
          >
            <XAxis dataKey="name" padding={{ left: 50, right: 50 }} />
            <YAxis ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
            <Line type="monotone" dataKey="Student 1" stroke="#8884d8" />
            <Line type="monotone" dataKey="Student 2" stroke="#84d888" />
            <Line type="monotone" dataKey="Student 3" stroke="#d88884" />
            <CartesianGrid />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
}
