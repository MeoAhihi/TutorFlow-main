import { useState } from "react";
import {
  Card,
  ListGroup,
  Modal,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  PersonFill,
  TelephoneFill,
  EnvelopeFill,
  ChatFill,
  PencilSquare,
} from "react-bootstrap-icons";

export default function ParentInfoCard({
  fullName,
  phoneNumber,
  email,
  expectation,
}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="text-bg-primary">Parent Infomation</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className="mb-0">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h6 className="mb-1">
              <PersonFill />
              Full name
            </h6>
            <span>{fullName}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h6 className="mb-1">
              <TelephoneFill /> Phone
            </h6>
            <span>{phoneNumber}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <h6 className="mb-1">
              <EnvelopeFill /> Email
            </h6>
            <span>{email}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6 className="mb-1">
              <ChatFill /> Expectation
            </h6>
            <span>{expectation}</span>
          </ListGroup.Item>
        </ListGroup>
        <Button onClick={() => setModalShow(true)} className="w-100">
          Edit <PencilSquare />
        </Button>
        <EditUsernameModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
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
            <FormField label="Full name" />
            <FormField label="Phone" />
            <FormField label="Email" type="email" />
            <Col sm="12">
              <Form.Label>Expectation</Form.Label>
              <Form.Control as="textarea" placeholder="Expectation" />
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
    <Col sm="12">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={label} />
    </Col>
  );
}
