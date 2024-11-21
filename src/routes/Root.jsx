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
import { Link, Outlet, useLoaderData } from "react-router-dom";
import NavItemLink from "../components/NavItemLink";

export async function loader() {
  return { students: ["Ly Boi San", "Ly Trac Dong", "Ly Uyen My"] };
}

export default function Root() {
  const { students } = useLoaderData();
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
              <NavItemLink
                to=""
                eventKey="dashboard"
                label="Dashboard"
              />
              <hr className="my-2" />
              {["Mathematics", "Chemistry", "Physics"].map((cls) => (
                <NavItemLink
                  to={"classes/" + cls}
                  eventKey={"classes/" + cls}
                  label={cls}
                />
              ))}
              <hr className="my-2" />
              {students.map((std) => (
                <NavItemLink  
                  to={"students/" + std}
                  eventKey={"students/" + std}
                  label={std}
                />
              ))}
            </Nav>
            end of nav
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
              <ListGroup.Item action className="border-0">
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
