import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Copyright from "../components/Copyright";
import SigninForm from "../components/SigninForm";
import { useActionData } from "react-router-dom";

async function action({request}) {
  let formData = await request.formData()
  console.log(formData)

}

export default function Login() {
  const res = useActionData()
  return (
    <section className="d-flex flex-column vh-100">
      <Container fluid className="flex-grow-1">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col md={9} lg={6} xl={5}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </Col>
          <Col md={8} lg={6} xl={{ span: 4, offset: 1 }}>
            <SigninForm />
          </Col>
        </Row>
      </Container>
      <Copyright />
    </section>
  );
}
