import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { ChevronDown, PlusCircle } from "react-bootstrap-icons";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import NavItemLink from "../components/NavItemLink";
import { useAuth } from "../context/AuthContext";
import { getStudents } from "../api/students.api";
import { getClasses } from "../api/classes.api";

export async function loader() {
  try {
    const students = await getStudents();
    const classes = await getClasses();
    return {
      students: students.data.student.map((student) => ({
        id: student.id,
        name: student.User.firstName + " " + student.User.lastName,
      })),
      classes: classes.data.classes.map((classInfo) => ({
        id: classInfo.id,
        name: classInfo.name,
      })),
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Root() {
  const { students, classes } = useLoaderData();
  const { clearUserSession } = useAuth();

  const handleLogout = () => {
    clearUserSession();
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
                src="/public/assets/1Screenshot 2024-09-26 161431.png"
                width={40}
                className="me-2"
                rounded
              />
              TutorFlow
            </Card.Title>
            <Nav variant="pills" className="flex-column">
              <NavItemLink to="" eventKey="dashboard" label="Dashboard" />
              <hr className="my-2" />
              <Card.Text className="d-flex justify-content-between">
                Classes
                <Link to="/classes/new" className="btn btn-light btn-sm">
                  <PlusCircle />
                </Link>
              </Card.Text>
              {classes.map((cls) => (
                <NavItemLink
                  key={cls.id}
                  to={"classes/" + cls.id}
                  eventKey={"classes/" + cls.id}
                  label={cls.name}
                />
              ))}
              <hr className="my-2" />

              <Card.Text className="d-flex justify-content-between">
                Students
                <Link to="/students/new" className="btn btn-light btn-sm">
                  <PlusCircle />
                </Link>
              </Card.Text>
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
