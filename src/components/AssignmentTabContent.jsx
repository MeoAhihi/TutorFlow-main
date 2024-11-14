import React from "react";
import { Col, Row, Button, Card, Image } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

export default function AssignmentTabContent() {
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Button>
          <PlusCircle /> Create
        </Button>
        {[1, 2, 3].map(() => (
          <Card className="my-3">
            <Card.Header className="d-flex justify-content-between">
              <Card.Title>Title</Card.Title>
              <Card.Text>Due on 31/10/2024</Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text
                style={{ fontSize: "smaller", color: "#555", margin: 0 }}
              >
                Posted on 25/10/2024
              </Card.Text>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequatur nam reprehenderit amet quis error temporibus debitis
                quae delectus corrupti ullam? Soluta explicabo totam fuga eos
                quam, iure ab asperiores alias.
              </Card.Text>
              <Row>
                {[1, 2].map(() => (
                  <Col xs={3}>
                    <Card className="p-0 mb-2 d-flex flex-row">
                      <Image
                        src="\1Screenshot 2024-09-26 161431.png"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Text>File name</Card.Text>
                        <Card.Text>file type</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
}
