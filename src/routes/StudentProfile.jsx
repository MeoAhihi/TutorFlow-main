import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Outlet, useLoaderData } from "react-router-dom";

import UsernameCard from "../components/UsernameCard";
import ParentInfoCard from "../components/ParentInfoCard";
import NavItemLink from "../components/NavItemLink";

export default function StudentProfile() {
  const { student, profile } = useLoaderData();
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
                <Outlet student={student} profile={profile} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xl={3} xs={12}>
            <Row className="gy-4">
              <Col xs={12}>
                <UsernameCard
                  avatarUrl={student.avatarUrl}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  birthday={student.birthday}
                  gradeLevel={profile.gradeLevel}
                  phoneNumber={student.phoneNumber}
                  email={student.email}
                  address={student.address}
                  classes={["UniMath", "IELTS"]}
                />
              </Col>

              <Col xs={12}>
                <ParentInfoCard
                  fullName={
                    profile.parentFirstName + " " + profile.parentLastName
                  }
                  phoneNumber={profile.parentPhoneNumber}
                  email={profile.parentEmail}
                  expectation={profile.parentExpectation}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
