import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

export default function SessionTabContent() {
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <h2>This month</h2>
        <Row className="g-3 mb-4">
          {Array.from({ length: 6 }).map(() => (
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Img src="\education-material-icon-vector-illustration_1287271-41250.avif" />
                  <Card.Title className="mb-1">
                    Integration on Vector Field
                  </Card.Title>
                  <Card.Text className="d-flex justify-content-between text-muted font-weight-lighter small">
                    <p>Tue Oct 22 2024 14:48:01</p>
                    <p>1h32m</p>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Card.Link>View detail</Card.Link>
                    <div>
                      {[0, 1, 2, 3, 4].map(() => (
                        <Image
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
        <h2>Last Month</h2>
        <Row className="g-3 mb-4">
          {Array.from({ length: 8 }).map(() => (
            <Col xs={3}>
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
                      {[0, 1, 2, 3, 4].map(() => (
                        <Image
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
