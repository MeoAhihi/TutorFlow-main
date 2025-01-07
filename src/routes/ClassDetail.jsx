import { Row, Card, Nav, Navbar, Button } from "react-bootstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link, Outlet } from "react-router-dom";
import NavItemLink from "../components/NavItemLink";
import { PencilSquare } from "react-bootstrap-icons";

export default function ClassDetail() {
  return (
    <Card borser="light" className="shadow-sm">
      <Card.Body className="p-4">
        <Nav variant="tabs" defaultActiveKey="overview" className="mb-4">
          <NavItemLink to="overview" eventKey="overview" label="Overview" />
          <NavItemLink to="student" eventKey="student" label="Student" />
          <NavItemLink to="schedule" eventKey="schedule" label="Schedule" />
          <NavItemLink
            to="assignment"
            eventKey="assignment"
            label="Assignment"
          />
          <NavItemLink to="session" eventKey="session" label="Session" />
          <NavItemLink to="resource" eventKey="resource" label="Resource" />

          <Nav.Item className="ms-auto">
            <Link className="btn btn-light" to="edit">
              <PencilSquare />
            </Link>
          </Nav.Item>
        </Nav>
        <Outlet />
      </Card.Body>
    </Card>
  );
}
