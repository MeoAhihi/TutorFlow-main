import Avatar from "react-avatar";
import { Card, Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { getClassId, getSessions } from "../api/classes.api";

function toTime(ms) {
  const s = Math.floor(ms / 1000) - 31;
  const seconds = ("0" + (s % 60)).slice(-2);
  const m = Math.floor((s - seconds) / 60);
  const minutes = ("0" + (m % 60)).slice(-2);
  const hours = Math.floor((m - minutes) / 60);
  return (
    (hours ? hours + "h" : "") + (minutes ? minutes + "m" : "") + seconds + "s"
  );
}

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
  }
}

export default function SessionTabContent() {
  const { thisMonthSessions, lastMonthSessions, earlierSessions, students } =
    useLoaderData();
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
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
                <SessionCard session={session} students={students} />
              ))}
            </Row>
          </>
        ) : null}
        {lastMonthSessions.length ? (
          <>
            <h2>Last Month</h2>
            <Row className="g-3 mb-4">
              {lastMonthSessions.map((session) => (
                <SessionCard session={session} students={students} />
              ))}
            </Row>
          </>
        ) : null}
        {earlierSessions.length ? (
          <>
            <h2>Earlier</h2>
            <Row className="g-3 mb-4">
              {earlierSessions.map((session) => (
                <SessionCard session={session} students={students} />
              ))}
            </Row>
          </>
        ) : null}
      </Col>
    </Row>
  );
}

const SessionCard = ({ session, students }) => (
  <Col xs={3} key={session.id}>
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
            {toTime(session.duration)}
          </Card.Text>
        </div>
        <div className="d-flex justify-content-between">
          <Card.Link>View detail</Card.Link>
          <div>
            {console.log(students)}
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
    </Card>
  </Col>
);
