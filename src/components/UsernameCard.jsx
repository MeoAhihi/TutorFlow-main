import { useState } from "react";
import {
  Card,
  Stack,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

export default function UsernameCard({
  avatarUrl,
  firstName,
  lastName,
  birthday,
  gradeLevel,
  phoneNumber,
  email,
  address,
  classes,
}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="text-bg-primary">
        Welcome, {firstName} {lastName}
      </Card.Header>
      <Card.Body>
        <Stack>
          <Card.Img
            src={avatarUrl}
            className="img-fluid rounded-circle"
            alt={`${firstName} ${lastName}`}
          />
          <p className="text-center mb-1">
            {firstName} {lastName}
          </p>
          <p className="text-center text-secondary mb-4">
            {birthday} - {gradeLevel}
          </p>
          <ListGroup variant="flush">
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <p className="fw-bold m-0">Phone Number</p>
              <span>{phoneNumber}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <p className="fw-bold m-0">Email</p>
              <span>{email}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <p className="fw-bold m-0">Address</p>
              <span>{address}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <p className="fw-bold m-0">Class(es)</p>
              <span>
                {classes.map((c) => (
                  <Badge key={c} className="m-1">
                    {c}
                  </Badge>
                ))}
              </span>
            </ListGroupItem>
          </ListGroup>
          <Button onClick={() => setModalShow(true)}>
            Edit <PencilSquare />
          </Button>
          <EditUsernameModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditUsernameModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEscapeKeyDown={onHide}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-truncate"
        >
          Edit Student Basic Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="gy-3 px-3">
            <FormField label="First Name" />
            <FormField label="Last Name" />
            <FormField label="Birthday" type="date" />
            <Col xs={12} md={6}>
              <Form.Label>Birthday</Form.Label>
              <Form.Select aria-label="Grade 1">
                <option value="grade-1">Grade 1</option>
                <option value="grade-2">Grade 2</option>
                <option value="grade-3">Grade 3</option>
                <option value="grade-4">Grade 4</option>
                <option value="grade-5">Grade 5</option>
                <option value="grade-6">Grade 6</option>
                <option value="grade-7">Grade 8</option>
                <option value="grade-8">Grade 7</option>
                <option value="grade-9">Grade 9</option>
                <option value="grade-10">Grade 10</option>
                <option value="grade-11">Grade 11</option>
                <option value="grade-12">Grade 12</option>
                <option value="uni-1">1st Year University</option>
                <option value="uni-2">2nd Year University</option>
                <option value="uni-3">3rd Year University</option>
                <option value="uni-4">4th Year University</option>
              </Form.Select>
            </Col>
            <FormField label="Phone Number" />
            <FormField label="Email" type="email" />
            <Col xs={12}>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" />
            </Col>
            <Col xs={12}>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function FormField({ label, type = "text" }) {
  return (
    <Col md="6" sm="12">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={label} />
    </Col>
  );
}
