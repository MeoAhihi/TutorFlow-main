import { Row, Card, Nav, Navbar, Button } from "react-bootstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, Outlet } from "react-router-dom";
import NavItemLink from "../components/NavItemLink";
import { PencilSquare, GearFill } from "react-bootstrap-icons";

export default function ClassDetail() {
  return (
    <Card borser="light" className="shadow-sm">
      <Card.Body className="p-4">
        <Nav variant="tabs" defaultActiveKey="overview" className="mb-4">
          <NavItemLink to="overview" eventKey="overview" label="Overview" />
          <NavItemLink to="students" eventKey="students" label="Students" />
          <NavItemLink to="schedules" eventKey="schedules" label="Schedules" />
          <NavItemLink
            to="assignments"
            eventKey="assignments"
            label="Assignments"
          />
          <NavItemLink to="sessions" eventKey="sessions" label="Sessions" />
          <NavItemLink to="resources" eventKey="resources" label="Resources" />

          <Nav.Item className="ms-auto">
            <Link className="btn btn-light pb-2" to="edit">
              <GearFill />
            </Link>
          </Nav.Item>
        </Nav>
        <Outlet />
      </Card.Body>
    </Card>
  );
}
