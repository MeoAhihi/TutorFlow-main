import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  Image,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import { redirect, Form as RouterForm } from "react-router-dom";
import { postStudent } from "../api/students.api";
export async function loader() {
  return null;
}
export async function action({ request }) {
  const formData = await request.formData();
  const newStudent = Object.fromEntries(formData);
  const student = await postStudent(newStudent);
  return redirect("/students/" + student.data.newClass.id);
}

export default function NewStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [biography, setBiography] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [strength, setStrength] = useState("");
  const [challenges, setChallenges] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [preferedLearningMethod, setPreferedLearningMethod] = useState("");
  const [engagementStyle, setEngagementStyle] = useState("");
  const [studyHabit, setStudyHabit] = useState("");
  const [parentExpectation, setParentExpectation] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "biography":
        setBiography(value);
        break;
      case "gradeLevel":
        setGradeLevel(value);
        break;
      case "strength":
        setStrength(value);
        break;
      case "challenges":
        setChallenges(value);
        break;
      case "learningGoal":
        setLearningGoal(value);
        break;
      case "preferedLearningMethod":
        setPreferedLearningMethod(value);
        break;
      case "engagementStyle":
        setEngagementStyle(value);
        break;
      case "studyHabit":
        setStudyHabit(value);
        break;
      case "parentExpectation":
        setParentExpectation(value);
        break;
      case "parentFirstName":
        setParentFirstName(value);
        break;
      case "parentLastName":
        setParentLastName(value);
        break;
      case "parentPhoneNumber":
        setParentPhoneNumber(value);
        break;
      case "parentEmail":
        setParentEmail(value);
        break;
      default:
        break;
    }
  };

  return (
    <Card border="light" className="shadow-sm d-flex justify-content-center">
      <Card.Body className="p-4 mt-4">
        <Row className="justify-content-center ">
          <Col xs={8}>
            <h1 className="my-4"> Edit Student</h1>
            <RouterForm method="post">
              <h2>Bacis Information</h2>
              <Form.Group as={Row} controlId="firstName" className="mb-3">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </Col>
                <Col sm={5}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="birthday" className="mb-3">
                <Form.Label column sm={2}>
                  Birthday
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={birthday}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="phoneNumber" className="mb-3">
                <Form.Label column sm={2}>
                  Phone Number
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email" className="mb-3">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="address" className="mb-3">
                <Form.Label column sm={2}>
                  Address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="country" className="mb-3">
                <Form.Label column sm={2}>
                  Country
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="biography" className="mb-3">
                <Form.Label column sm={2}>
                  Biography
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    name="biography"
                    value={biography}
                    onChange={handleChange}
                    placeholder="Enter biography"
                  />
                </Col>
              </Form.Group>
              <h2>Academic</h2>
              <Form.Group as={Row} controlId="gradeLevel" className="mb-3">
                <Form.Label column sm={2}>
                  Grade Level
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="gradeLevel"
                    value={gradeLevel}
                    onChange={handleChange}
                    placeholder="Enter grade level"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="strength" className="mb-3">
                <Form.Label column sm={2}>
                  Strength
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="strength"
                    value={strength}
                    onChange={handleChange}
                    placeholder="Enter strength"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="challenges" className="mb-3">
                <Form.Label column sm={2}>
                  Challenges
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="challenges"
                    value={challenges}
                    onChange={handleChange}
                    placeholder="Enter challenges"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="learningGoal" className="mb-3">
                <Form.Label column sm={2}>
                  Learning Goal
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="learningGoal"
                    value={learningGoal}
                    onChange={handleChange}
                    placeholder="Enter learning goal"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="preferedLearningMethod"
                className="mb-3"
              >
                <Form.Label column sm={4}>
                  Preferred Learning Method
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="preferedLearningMethod"
                    value={preferedLearningMethod}
                    onChange={handleChange}
                    placeholder="Enter preferred learning method"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="engagementStyle" className="mb-3">
                <Form.Label column sm={2}>
                  Engagement Style
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="engagementStyle"
                    value={engagementStyle}
                    onChange={handleChange}
                    placeholder="Enter engagement style"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="studyHabit" className="mb-3">
                <Form.Label column sm={2}>
                  Study Habit
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="studyHabit"
                    value={studyHabit}
                    onChange={handleChange}
                    placeholder="Enter study habit"
                  />
                </Col>
              </Form.Group>
              <h2>Parent Information</h2>
              <Form.Group as={Row} controlId="parentName" className="mb-3">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="text"
                    name="parentFirstName"
                    value={parentFirstName}
                    onChange={handleChange}
                    placeholder="Enter parent first name"
                  />
                </Col>

                <Col sm={5}>
                  <Form.Control
                    type="text"
                    name="parentLastName"
                    value={parentLastName}
                    onChange={handleChange}
                    placeholder="Enter parent last name"
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="parentPhoneNumber"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  Phone Number
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="tel"
                    name="parentPhoneNumber"
                    value={parentPhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter parent phone number"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="parentEmail" className="mb-3">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="email"
                    name="parentEmail"
                    value={parentEmail}
                    onChange={handleChange}
                    placeholder="Enter parent email"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="parentExpectation"
                className="mb-3"
              >
                <Form.Label column sm={2}>
                  Expectation
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    name="parentExpectation"
                    value={parentExpectation}
                    onChange={handleChange}
                    placeholder="Enter parent expectation"
                  />
                </Col>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </RouterForm>
            <hr />
            <h2>Delete Student</h2>
            <Alert variant="danger">
              <strong>Warning:</strong> After you delete, the student profile can never be
              restored!
            </Alert>
            <RouterForm method="delete" className="d-flex justify-content-end">
              {/* <Form.Control /> */}
              <Button variant="danger" type="submit">
                Delete Student
              </Button>
            </RouterForm>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
