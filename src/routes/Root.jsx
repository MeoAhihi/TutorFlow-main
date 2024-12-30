import React from "react";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Tab,
  Button,
  Nav,
} from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import NavItemLink from "../components/NavItemLink";

export default function Root() {
  const { students, classes } = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <Tab.Container>
      <Row className="g-1 m-1">
        <Col xs={2} className="p-2 ">
          <div className="vh-100 overflow-y-scroll ">
            <Card.Title
              className="text-center mb-2"
              style={{ fontSize: "2rem" }}
            >
              <Image
                src="\src\assets\1Screenshot 2024-09-26 161431.png"
                width={40}
                className="me-2"
                rounded
              />
              TutorFlow
            </Card.Title>
            <Nav variant="pills" className="flex-column">
              <NavItemLink to="" eventKey="dashboard" label="Dashboard" />
              <hr className="my-2" />
              <Card.Text>Classes</Card.Text>
              {classes.map((cls) => (
                <NavItemLink
                  key={cls.id}
                  to={"classes/" + cls.id}
                  eventKey={"classes/" + cls.id}
                  label={cls.name}
                />
              ))}
              <hr className="my-2" />

              <Card.Text>Students</Card.Text>
              {students.map(({ id, name }) => (
                <NavItemLink
                  key={id}
                  to={"students/" + id}
                  eventKey={"students/" + id}
                  label={name}
                />
              ))}
            </Nav>
            <ListGroup>
              <ListGroup.Item action className="border-0">
                Schedule
              </ListGroup.Item>
              <hr className="my-2" />

              <Button variant="none" className="">
                See more <ChevronDown />
              </Button>
            </ListGroup>
            <ListGroup className="mt-auto">
              <ListGroup.Item action className="border-0">
                Setting
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="border-0"
                onClick={handleLogout}
              >
                Log out
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col xs={10}>
          <Outlet />
        </Col>
      </Row>
    </Tab.Container>
  );
}
