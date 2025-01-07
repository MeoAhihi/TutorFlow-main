import { Row, Card, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
  return (
    <Card
      border="light"
      className="shadow-sm vh-100 d-flex justify-content-center"
    >
      <Card.Body className="p-4 mt-4">
        <Row className="justify-content-center ">
          <Col xs={10}>
            <h1 className="my-4">Edit Class</h1>
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

              {/* <Form.Group as={Row} controlId="coverPhoto" className="mb-3">
                <Form.Label column sm={2}>
                  Cover Photo
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    name="coverPhoto"
                    onChange={(e) => setCoverPhoto(e.target.files[0])}
                    accept="image/*"
                  />
                </Col>
                {coverPhoto && (
                  <Row className="justify-content-center mb-3 mt-3">
                    <Col xs={10}>
                      <Image
                        src={URL.createObjectURL(coverPhoto)}
                        alt="Cover"
                        height={200}
                      />
                    </Col>
                  </Row>
                )}
              </Form.Group> */}
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Edit Class
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
