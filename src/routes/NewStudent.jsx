import React, { useState } from "react";
import { Form, Button, Col, Row, Card, Image } from "react-bootstrap";
import { redirect, Form as RouterForm } from "react-router-dom";
import { postStudent } from "../api/students.api";

export async function action({ request }) {
  const formData = await request.formData();
  const newStudent = Object.fromEntries(formData);
  const student = await postStudent(newStudent);
  console.log(student);
  return redirect("/students/" + student.data.profile.id);
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
      default:
        break;
    }
  };

  return (
    <Card
      border="light"
      className="shadow-sm vh-100 d-flex justify-content-center"
    >
      <Card.Body className="p-4 mt-4">
        <Row className="justify-content-center ">
          <Col xs={10}>
            <h1 className="my-4">Add New Student</h1>
            <RouterForm method="post">
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

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Add Student
                </Button>
              </div>
            </RouterForm>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
