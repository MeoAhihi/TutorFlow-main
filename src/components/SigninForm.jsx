import axios from "axios";
import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link, useNavigate } from "react-router-dom";

import FormField from "./FormField";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
      email: email,
      password: password,
    });
    if (res.status === 200) {
      localStorage.setItem("jwt", res.data.accessToken);
      navigate("/");
    }
  };

  return (
    <Form>
      <Stack gap={3}>
        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start gap-1">
          <p className="lead fw-normal mb-0 me-3">Sign in with</p>
          <LoginSocialGoogle
            client_id="698653411336-f2h56i7qv9d8avgl8sbc3e8cs61jc0q0.apps.googleusercontent.com"
            onResolve={(res) => {
              console.log(res);
            }}
            onReject={(err) => {
              console.log(err);
            }}
            redirect_uri="/"
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>

        <div className="divider d-flex align-items-center">
          <p className="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        {/* <!-- Email input --> */}
        <FormField
          label={"Email Address"}
          type={"email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        {/* <!-- Password input --> */}
        <FormField
          label={"Password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between align-items-center">
          {/* <!-- Checkbox --> */}
          <Form.Check type="checkbox" label="Remember me" />

          <a href="#!" className="text-body">
            Forgot password?
          </a>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="px-5"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" className="link-danger">
            Register
          </Link>
        </p>
      </Stack>
    </Form>
  );
}
