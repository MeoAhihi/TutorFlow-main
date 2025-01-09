import { Row, Card, Col, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getClassId } from "../api/classes.api";

export async function loader({ params }) {
  try {
    const classInfo = await getClassId(params.classId);

    return {
      name: classInfo.data.class.name,
      subject: classInfo.data.class.subject,
      type: classInfo.data.class.type,
      description: classInfo.data.class.description,
    };
  } catch (error) {
    console.log(error);
  }
}

export default function UpdateClass() {
  const loaderData = useLoaderData();
  const [name, setName] = useState(loaderData.name);
  const [subject, setSubject] = useState(loaderData.subject);
  const [description, setDescription] = useState(loaderData.description);
  const [type, setType] = useState(loaderData.type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "coverPhoto":
        setCoverPhoto(value);
        break;
      case "name":
        setName(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "type":
        setType(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      subject,
      description,
      type,
    };
    // Handle form submission logic here
    console.log(formData);
  };

  const handleDeleteClass = () => console.log("Delete class");

  return (
    <Card
      border="light"
      className="shadow-sm vh-100 d-flex justify-content-center"
    >
      <Card.Body className="p-4 mt-4">
        <Row className="justify-content-center ">
          <Col xs={10}>
            <h1>Setting</h1>
            <h2 className="my-4">Edit Class</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} controlId="name" className="mb-3">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter class name"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="subject" className="mb-3">
                <Form.Label column sm={2}>
                  Subject
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="type" className="mb-3">
                <Form.Label column sm={2}>
                  Type
                </Form.Label>
                <Col sm={10} className="d-flex align-items-center">
                  <Form.Check
                    type="radio"
                    label="Online"
                    name="type"
                    value="Online"
                    onChange={handleChange}
                    checked={type === "Online"}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Offline"
                    name="type"
                    value="Offline"
                    onChange={handleChange}
                    checked={type === "Offline"}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="description" className="mb-3">
                <Form.Label column sm={2}>
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                </Col>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Edit Class
                </Button>
              </div>
            </Form>
            <hr />
            <h2>Delete Class</h2>
            <Alert variant="danger">
              <strong>Warning:</strong> After you delete, the class can never be
              restored!
            </Alert>
            <div className="d-flex justify-content-end">
              {/* <Form.Control /> */}
              <Button variant="danger" onClick={handleDeleteClass}>
                Delete Class
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
