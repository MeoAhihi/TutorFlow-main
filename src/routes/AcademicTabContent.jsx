import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AcademicTabContent() {
  const { student, profile } = useLoaderData();
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <h2>School Performance</h2>
      <div className="mb-3">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { name: "Mid Term 1", "Average Score": 9.5 },
              { name: "End Term 1", "Average Score": 9.6 },
              { name: "Mid Term 2", "Average Score": 8.5 },
              { name: "End Term 2", "Average Score": 9.8 },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="Average Score" stroke="#8884d8" />
            <CartesianGrid />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-2 d-flex justify-content-between">
        <h2>Background Info</h2>
        {/* <Button
          variant="primary"
          className="pt-0 pb-1"
          onClick={() => setModalShow(true)}
        >
          <PencilSquare />
        </Button>
        <EditAcademicBgModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}
      </div>
      <Table responsive striped hover>
        <tbody>
          <EditableRow title="Strength" initValue={profile.strength} />
          <EditableRow title="Challanges" initValue={profile.challanges} />
          <EditableRow title="Learning Goal" initValue={profile.learningGoal} />
          <EditableRow
            title="Prefered Learning Method"
            initValue={profile.preferedLearningMethod}
          />
          <EditableRow
            title="Engagement Style"
            initValue={profile.engagementStyle}
          />
          <EditableRow
            title="Study Habit"
            initValue={profile.studyHabit}
          />
        </tbody>
      </Table>
    </>
  );
}

// function EditAcademicBgModal({ show, onHide }) {
//   return (
//     <Modal
//       show={show}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton onHide={onHide}>
//         <Modal.Title
//           id="contained-modal-title-vcenter"
//           className="text-truncate"
//         >
//           Edit Student Basic Info
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row className="gy-3 gy-xxl-4">
//             <Col xs={12}>
//               <Form.Label for="learning-strength">Learning Strength</Form.Label>
//               <Form.Control type="text" placeholder="Strength" />
//             </Col>
//             <Col xs={12}>
//               <Form.Label for="learning-challenge">
//                 Learning Challenge
//               </Form.Label>
//               <Form.Control type="text" placeholder="Challenge" />
//             </Col>
//             <Col xs={12}>
//               <Form.Label for="learning-goal">Learning Goal</Form.Label>
//               <Form.Control type="text" placeholder="Goal" />
//             </Col>
//             <Col xs={12}>
//               <Form.Label for="prefered-learning-method">
//                 Prefered Learning Method
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Prefered Learning Method"
//               />
//             </Col>
//             <Col xs={12}>
//               <Form.Label for="engagement-style">Engagement Style</Form.Label>
//               <Form.Control type="text" placeholder="Engagement Style" />
//             </Col>
//             <Col xs={12}>
//               <Form.Label for="study-habit">Study Habit</Form.Label>
//               <Form.Control type="text" placeholder="Study Habit" />
//             </Col>
//             <Col xs={12}>
//               <Button type="submit">Submit</Button>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

function EditableRow({ title, initValue }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(initValue);
  return (
    <tr onDoubleClick={() => setEdit(true)}>
      <th>{title}</th>
      <td>
        {!edit ? (
          value
        ) : (
          <Form.Control
            size="sm"
            autoFocus
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEdit(false);
              if (e.key === "Escape") {
                setValue(initValue);
                setEdit(false);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </td>
    </tr>
  );
}
