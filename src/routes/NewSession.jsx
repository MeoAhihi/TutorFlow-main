import React, { useState } from "react";
import { Form, Button, Col, Row, Card, Image } from "react-bootstrap";
import { redirect, Form as RouterForm } from "react-router-dom";

import { postSession } from "../api/sessions.api";

export async function action({ params, request }) {
  const formData = await request.formData();
  const newSession = Object.fromEntries(formData);
  const Session = await postSession(params.classId, newSession);
  return redirect("/classes/" + params.classId + "/sessions");
}

export default function NewSession() {
  const [title, setTitle] = useState("");
  const [topicCovered, setTopicCovered] = useState("");
  const [note, setNote] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "topic":
        setTopicCovered(value);
        break;
      case "note":
        setNote(value);
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
          <Col xs={8}>
            <h1 className="my-4">Start New Session</h1>
            <RouterForm method="post">
              <Form.Group as={Row} controlId="title" className="mb-3">
                <Form.Label column sm={2}>
                  Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter session title"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="topic" className="mb-3">
                <Form.Label column sm={2}>
                  Topic Covered
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="topic"
                    value={topicCovered}
                    onChange={handleChange}
                    placeholder="Enter topic covered"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="note" className="mb-3">
                <Form.Label column sm={2}>
                  Note
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    name="note"
                    value={note}
                    onChange={handleChange}
                    placeholder="Enter note"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="thumbnail" className="mb-3">
                <Form.Label column sm={2}>
                  Thumbnail
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    name="thumbnail"
                    onChange={(e) => setCoverPhoto(e.target.files[0])}
                    accept="image/*"
                  />
                </Col>
                {coverPhoto && (
                  <Row className="justify-content-center mb-3 mt-3">
                    <Col xs={10}>
                      <Image
                        src={URL.createObjectURL(coverPhoto)}
                        alt="Thumbnail"
                        height={200}
                      />
                    </Col>
                  </Row>
                )}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Start Session
                </Button>
              </div>
            </RouterForm>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
