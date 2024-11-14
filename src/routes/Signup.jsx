import React from "react";

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  KeyFill,
} from "react-bootstrap-icons";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <section className="d-flex flex-column vh-100">
      <Container fluid className="flex-grow-1">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col md={8} lg={12} xl={{ span: 4, offset: 1 }} className="pb-5">
            <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Sign up
            </h1>

            <Form>
              <Stack gap={3} bsPrefix="vstack">
                <FormField
                  Icon={PersonFill}
                  label={"Your Name"}
                  type={"text"}
                />

                <FormField
                  Icon={EnvelopeFill}
                  label={"Your Email"}
                  type={"text"}
                />

                <FormField
                  Icon={LockFill}
                  label={"Password"}
                  type={"password"}
                />

                <FormField
                  Icon={KeyFill}
                  label={"Repeat Your Password"}
                  type={"password"}
                />

                <Form.Check type="checkbox" className="align-self-center">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I agree all statements in <a href="#!">Terms of service</a>
                  </Form.Check.Label>
                </Form.Check>

                <Button variation="primary" size="lg">
                  Register
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already had an account?{" "}
                  <Link to="/login" className="link-danger">
                    Login
                  </Link>
                </p>
              </Stack>
            </Form>
          </Col>
          <Col md={9} lg={6} xl={5}>
            <Image
              fluid
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="Sample image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
