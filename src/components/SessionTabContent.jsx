import React from "react";
import Avatar from "react-avatar";
import { Card, Row, Col, Image } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
function toTime(ms) {
  var date = new Date(null);
  date.setMilliseconds(ms);
  return date.toISOString().substr(11, 8);
}
export default function SessionTabContent() {
  const { sessions, students } = useLoaderData();
  console.log(students);
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <h2>This month</h2>
        <Row className="g-3 mb-4">
          {sessions.map((session) => {
            return (
              <Col xs={3} key={session.id}>
                <Card>
                  <Card.Body>
                    <Card.Img src="\education-material-icon-vector-illustration_1287271-41250.avif" />
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
                        {students.map((student) => (
                          <Avatar
                            round
                            key={student.id}
                            name={student.lastName}
                            src={student.avatarUrl}
                            size={35}
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
          })}
        </Row>
        <h2>Last Month</h2>
        <Row className="g-3 mb-4">
          {Array.from({ length: 8 }).map((i) => (
            <Col xs={3} key={Math.random()}>
              <Card>
                <Card.Body>
                  <Card.Img src="\education-material-icon-vector-illustration_1287271-41250.avif" />
                  <Card.Title className="mb-0">
                    Integration on Vector Field
                  </Card.Title>
                  <Card.Text className="text-muted font-weight-lighter small">
                    Tue Oct 22 2024 14:48:01
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Card.Link>View detail</Card.Link>
                    <div>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Image
                          key={i}
                          src="https://img.freepik.com/free-psd/flat-man-character_23-2151534209.jpg"
                          roundedCircle
                          style={{
                            width: 30,
                            objectFit: "cover",
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
          ))}
        </Row>
      </Col>
    </Row>
  );
}
