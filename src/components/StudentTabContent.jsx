import React from "react";
import { Col, Image, Row, Stack, Table } from "react-bootstrap";
import { CheckSquare } from "react-bootstrap-icons";
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
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <h2>Attendance</h2>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>Student</th>
              <th>22/6</th>
              <th>29/6</th>
              <th>6/7</th>
              <th>13/7</th>
              <th>20/7</th>
              <th>27/7</th>
              <th>3/8</th>
              <th>10/8</th>
              <th>17/8</th>
              <th>24/8</th>
              <th>31/8</th>
              <th>7/9</th>
              <th>14/9</th>
              <th>21/9</th>
              <th>28/9</th>
              <th>5/10</th>
              <th>12/10</th>
              <th>19/10</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="d-flex align-items-center">
                <Image
                  roundedCircle
                  src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg"
                  width={30}
                  className="mx-2"
                />
                <p className="m-0">Student 1</p>
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>2</td>
              <td className="d-flex align-items-center">
                <Image
                  roundedCircle
                  src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg"
                  width={30}
                  className="mx-2"
                />
                <p className="m-0">Student 2</p>
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>3</td>
              <td className="d-flex align-items-center">
                <Image
                  roundedCircle
                  src="https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg"
                  width={30}
                  className="mx-2"
                />
                <p className="m-0">Student 3</p>
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>
                <CheckSquare />
              </td>
              <td>3</td>
            </tr>
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
