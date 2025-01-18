import { useState } from "react";
import Avatar from "react-avatar";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";

import { getClassId } from "../api/classes.api";
import { endSession, getSessions, patchSession } from "../api/sessions.api";
import { SessionModal } from "../components/SessionModal";
import { toTime } from "../utils/formatDate";

export async function loader({ params }) {
  try {
    const classInfo = await getClassId(params.classId);
    const sessions = await getSessions(params.classId);

    const current = new Date();
    const startThisMonth = new Date(
      current.getFullYear(),
      current.getMonth(),
      1
    );
    const startLastMonth = new Date(
      current.getFullYear(),
      current.getMonth() - 1,
      1
    );
    return {
      students: classInfo.data.students,
      sessions: sessions.data.Sessions,
      thisMonthSessions: sessions.data.Sessions.filter(
        (session) => startThisMonth < new Date(session.createdAt)
      ),
      lastMonthSessions: sessions.data.Sessions.filter(
        (session) =>
          startLastMonth < new Date(session.createdAt) &&
          new Date(session.createdAt) < startThisMonth
      ),
      earlierSessions: sessions.data.Sessions.filter(
        (session) =>
          startLastMonth < new Date(session.createdAt) &&
          new Date(session.createdAt) < startLastMonth
      ),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function action({ request }) {
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const sessionData = Object.fromEntries(formData);

    if (sessionData.endSessionId) {
      await endSession(sessionData.endSessionId);
      return null;
    }

    const Session = await patchSession(params.classId, sessionData);
    return null;
  }
}

export async function endSessionAction({ params }) {
  await endSession(params.sessionId);
  return redirect(`/classes/${params.classId}/sessions`);
}

export default function SessionTabContent() {
  const { thisMonthSessions, lastMonthSessions, earlierSessions, students } =
    useLoaderData();

  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Link to="new" className="btn btn-primary mb-4 pt-1 pb-2">
          <PlusCircle className="me-2" />
          Start Session
        </Link>

        {thisMonthSessions.length +
          lastMonthSessions.length +
          earlierSessions.length ===
        0 ? (
          <Row className="h-100 d-flex flex-column justify-content-center align-items-center display-1 text-muted">
            Uh Oh! No sessions
          </Row>
        ) : null}
        {thisMonthSessions.length ? (
          <>
            <h2>This Month</h2>
            <Row className="g-3 mb-4">
              {thisMonthSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  students={students}
                />
              ))}
            </Row>
          </>
        ) : null}
        {lastMonthSessions.length ? (
          <>
            <h2>Last Month</h2>
            <Row className="g-3 mb-4">
              {lastMonthSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  students={students}
                />
              ))}
            </Row>
          </>
        ) : null}
        {earlierSessions.length ? (
          <>
            <h2>Earlier</h2>
            <Row className="g-3 mb-4">
              {earlierSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  students={students}
                />
              ))}
            </Row>
          </>
        ) : null}
      </Col>
    </Row>
  );
}

const SessionCard = ({ session, students }) => {
  const handleViewDetail = () => {
    handleOpen();
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  return (
    <Col xl={3} md={4} sm={6} xs={12} key={session.id}>
      <Card>
        <Card.Body>
          <Card.Img src="/public/assets/education-material-icon-vector-illustration_1287271-41250.avif" />
          <Card.Title className="mb-1">{session.title}</Card.Title>
          <div className="d-flex justify-content-between">
            <Card.Text className="text-muted font-weight-lighter small">
              {new Date(session.createdAt).toLocaleString("en-VN", {
                timeZone: "UTC",
              })}
            </Card.Text>
            <Card.Text className="text-muted font-weight-lighter small">
              {session.duration ? toTime(session.duration) : "Opening"}
            </Card.Text>
          </div>
          <div className="d-flex justify-content-between">
            <Button onClick={handleViewDetail}>View Detail</Button>
            <div>
              {students.map(({ student }) => (
                <Avatar
                  key={student.id}
                  name={student.lastName}
                  src={student.avatarUrl}
                  size={35}
                  round
                  style={{
                    margin: -5,
                    boxShadow: "0px 3px 3px rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </Card.Body>

        <SessionModal
          show={showModal}
          session={session}
          handleClose={handleClose}
        />
      </Card>
    </Col>
  );
};
