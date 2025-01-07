import {
  Row,
  Card,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Form } from "react-router-dom";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function UpdateClass() {
  return (
    <Card borser="light" className="shadow-sm">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card.Body className="p-4">
            <h1>Edit Class</h1>
            <hr />
            <Form>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" name="name" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Subject</FormLabel>
                <FormControl type="text" name="subject" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Descrition</FormLabel>
                <FormControl as="textarea" name="description" />
              </FormGroup>
              <FormGroup>
                <FormLabel>type</FormLabel>
                <FormControl type="text" name="type" />
              </FormGroup>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
