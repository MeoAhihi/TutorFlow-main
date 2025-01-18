import { Button, Modal, Table } from "react-bootstrap";
import { Form } from "react-router-dom";

import { toTime } from "../utils/formatDate";
import { useState } from "react";

export function SessionModal({ show, session, handleClose }) {
  const [id, setid] = useState(session?.id);
  const [title, settitle] = useState(session?.title);
  const [thumbnailUrl, setthumbnailUrl] = useState(session?.thumbnailUrl);
  const [duration, setduration] = useState(session?.duration);
  const [topicCovered, settopicCovered] = useState(session?.topicCovered);
  const [subjectPerformance, setsubjectPerformance] = useState(
    session?.subjectPerformance
  );
  const [behavioralObservation, setbehavioralObservation] = useState(
    session?.behavioralObservation
  );
  const [emotionalFactor, setemotionalFactor] = useState(
    session?.emotionalFactor
  );
  const [motivationTrigger, setmotivationTrigger] = useState(
    session?.motivationTrigger
  );
  const [note, setnote] = useState(session?.note);
  const [AssignmentId, setAssignmentId] = useState(session?.AssignmentId);
  const [createdAt, setcreatedAt] = useState(session?.createdAt);
const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case "title":
            settitle(value);
            break;
        case "thumbnailUrl":
            setthumbnailUrl(value);
            break;
        case "duration":
            setduration(value);
            break;
        case "topicCovered":
            settopicCovered(value);
            break;
        case "subjectPerformance":
            setsubjectPerformance(value);
            break;
        case "behavioralObservation":
            setbehavioralObservation(value);
            break;
        case "emotionalFactor":
            setemotionalFactor(value);
            break;
        case "motivationTrigger":
            setmotivationTrigger(value);
            break;
        case "note":
            setnote(value);
            break;
        case "AssignmentId":
            setAssignmentId(value);
            break;
        case "createdAt":
            setcreatedAt(value);
            break;
        default:
            break;
    }
};
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table>
          <tbody>
            <tr>
              <td>Start time: </td>
              <td>{createdAt}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>{duration ? toTime(duration) : "Opening"}</td>
            </tr>
            <tr>
              <td>Topic Covered</td>
              <td>{topicCovered}</td>
            </tr>
            <tr>
              <td>Subject Performance</td>
              <td>{subjectPerformance}</td>
            </tr>
            <tr>
              <td>Behavioral Observation</td>
              <td>{behavioralObservation}</td>
            </tr>
            <tr>
              <td>Emotional Factor</td>
              <td>{emotionalFactor}</td>
            </tr>
            <tr>
              <td>Motivation Trigger</td>
              <td>{motivationTrigger}</td>
            </tr>
            <tr>
              <td>Note</td>
              <td>{note}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Form method="patch" onSubmit={handleClose}>
          <input type="hidden" name="endSessionId" value={id} />
          <Button variant="danger" type="submit">
            End Session
          </Button>
        </Form>
        <Form method="patch">
          <Button variant="primary" type="submit">
            Save Session
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}
