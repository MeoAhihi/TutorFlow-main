import React from "react";
import { Row, Col, Card, Image, ListGroup, Tab, Button } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";

export default function Root() {
  return (
    <Tab.Container>
      <Row className="g-1 m-1">
        <Col xs={2}>
          <div style={{ height: "100vh", overflowY: "scroll" }}>
            {/* <Card style={{ height: "95vh", fontSize: "0.75rem" }}>
            <Card.Body className="shadow d-flex flex-column"> */}
            <Card.Title className="text-center" style={{ fontSize: "2rem" }}>
              <Image
                src="\src\assets\1Screenshot 2024-09-26 161431.png"
                width={40}
                className="me-2"
                rounded
              />
              TutorFlow
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item action className="border-0" href="/dashboard#">
                Dashboard
              </ListGroup.Item>
              <ListGroup.Item action className="border-0" href="/dashboard#">
                Schedule
              </ListGroup.Item>
              <hr className="my-2" />
              {["Mathematics", "Chemistry", "Physics"].map((cls) => (
                <ListGroup.Item
                  action
                  className="border-0"
                  href={"/class/detail#" + cls}
                >
                  {cls}
                </ListGroup.Item>
              ))}
              <Button variant="none" className="">
                See more <ChevronDown />
              </Button>
              <hr className="my-2" />
              {["Boi San", "Trac Dong", "Uyen My"].map((cls) => (
                <ListGroup.Item
                  action
                  className="border-0"
                  href={"/student/info/#" + cls}
                >
                  {cls}
                </ListGroup.Item>
              ))}
              <Button variant="none" className="">
                See more <ChevronDown />
              </Button>
            </ListGroup>
            <ListGroup className="mt-auto">
              <ListGroup.Item action className="border-0">
                Setting
              </ListGroup.Item>
              <ListGroup.Item action className="border-0">
                Log out
              </ListGroup.Item>
            </ListGroup>
            {/* </Card.Body>
          </Card> */}
          </div>
        </Col>
        {/* <Col xs={10}>
          <Card className="shadow">
            <Card.Body>
              <Stack direction="horizontal">
                <Card.Text className="display-6 fw-bold m-0">
                  Welcome back, Vi Phong
                </Card.Text>
                <Button variant="none" className="ms-auto">
                  feature 1
                </Button>
                <Button variant="none">feature 2</Button>
                <Button>P</Button>
              </Stack>
            </Card.Body>
          </Card>

          <Card className="shadow mt-2">
            <Card.Body>
              <HomeTabContent />
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Tab.Container>
  );
}
