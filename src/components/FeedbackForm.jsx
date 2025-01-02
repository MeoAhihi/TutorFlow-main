import { Form, Col, Row, Button } from "react-bootstrap";

export default function FeedbackForm() {
  return (
    <Form action="#!">
      <Row className="gy-3 gy-xxl-4">
        <Col xs={12}>
          <Form.Label for="feedback-source">Feedback from</Form.Label>
          <Form.Select aria-label="Parent" id="feedback-source">
            <option value="parent-feedback">Parent Feedback</option>
            <option value="request-upgrade">Request for Upgrade</option>
            <option value="student-communication">Student Communication</option>
          </Form.Select>
        </Col>
        <Col xs={12}>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <Form.Control as="textarea" placeholder="Add Feedback" />
        </Col>
        <Col xs={12}>
          <Button variant="primary" type="submit">
            Store Feedback
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
