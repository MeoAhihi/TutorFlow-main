import React, { useState } from "react";

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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import FormField from "../components/FormField";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/auth/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    if (res.status === 201) {
      localStorage.setItem("jwt", res.data.accessToken);
      navigate("/");
    }
  };
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
                  label={"First Name"}
                  type={"text"}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <FormField
                  Icon={PersonFill}
                  label={"Last Name"}
                  type={"text"}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />

                <FormField
                  Icon={EnvelopeFill}
                  label={"Your Email"}
                  type={"text"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <FormField
                  Icon={LockFill}
                  label={"Password"}
                  type={"password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <FormField
                  Icon={KeyFill}
                  label={"Repeat Your Password"}
                  type={"password"}
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />

                <Form.Check type="checkbox" className="align-self-center">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I agree all statements in <a href="#!">Terms of service</a>
                  </Form.Check.Label>
                </Form.Check>

                <Button onClick={handleSubmit} variation="primary" size="lg">
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
