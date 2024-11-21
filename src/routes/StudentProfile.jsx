import React from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import UsernameCard from "../components/UsernameCard";
import ParentInfoCard from "../components/ParentInfoCard";
import NavItemLink from "../components/NavItemLink";
import { Outlet } from "react-router-dom";

export default function StudentProfile() {
  return (
    <section className="bg-light py-3 py-md-5 py-xl-8">
      <Container>
        <Row className="gy-4 gy-lg-0">
          <Col xs={12} lg={8} xl={9}>
            <Card borser="light" className="shadow-sm">
              <Card.Body className="p-4">
                <Nav
                  variant="tabs"
                  defaultActiveKey="overview"
                  className="mb-4"
                >
                  <NavItemLink to="" eventKey="overview" label="Overview" />
                  <NavItemLink
                    to="progress"
                    eventKey="progress"
                    label="Progress"
                  />
                  <NavItemLink
                    to="academic"
                    eventKey="academic"
                    label="Academic"
                  />
                  <NavItemLink
                    to="feedback"
                    eventKey="feedback"
                    label="Feedback"
                  />
                </Nav>
                <Outlet />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xl={3} xs={12}>
            <Row className="gy-4">
              <Col xs={12}>
                <UsernameCard
                  avatarUrl="https://img.freepik.com/free-psd/flat-man-character_23-2151534209.jpg"
                  firstName="Wind"
                  lastName="Li"
                  birthday="28/04/2003"
                  gradeLevel="3rd Year University"
                  phoneNumber="(+84)35607205"
                  email="viphongly2804@gmail.com"
                  address="112 Tùng Thiện Vương, P11, Q8"
                  classes={["UniMath", "IELTS"]}
                />
              </Col>

              <Col xs={12}>
                <ParentInfoCard
                  fullName="Li Hue Hung"
                  phoneNumber="(+84)903688818"
                  email=""
                  expectation="I can see progess in my son Math skill. It would be great if he can do it faster"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
