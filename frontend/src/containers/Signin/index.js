import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./style.css";
import logo from "../../img/logo.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin(props) {
  //initial state of email
  const [email, setEmail] = useState("");
  //initial state of password
  const [password, setPassword] = useState("");

  //geting user's authenticate status (from auth.reducers.js) and storing in the auth variable
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = { email, password };

    console.log(user);
    dispatch(login(user));
  };

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    return <Navigate to={`/`} />;
  }

  return (
    <div>
      <ToastContainer />
      <Layout>
        <Row style={{ height: "100vh" }}>
          <Col className="main col-4"></Col>
          <Col className="col-8">
            <Row
              style={{ marginTop: "50px", padding: "20px" }}
              className="text-center"
            >
              <Col md={{ span: 6, offset: 3 }}>
                <img width="100px" src={logo} alt="logo" />

                <h2 className="text-center">Sign In</h2>
                <br></br>
                <h3 className="text-center">CLEANTECH Admin Dashboard</h3>
                <br></br>
                <Form onSubmit={userLogin}>
                  <Input
                    lable="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error="We'll never share your email with anyone else."
                  ></Input>

                  <Input
                    lable="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                  <Form.Group>
                    <Form.Check
                      className="text-center"
                      type="checkbox"
                      label="Remember Me"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%", marginBottom: "50px" }}
                  >
                    Sign In
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default Signin;


