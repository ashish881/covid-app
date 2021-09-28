import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userLogin, verifyUser } from "../action/userAction";
import Message from "../component/Message";
import Loader from "../component/Loader";
import FormContainer from "../component/FormContainer";

function LoginScreen(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const _verifyUser = useSelector((state) => state.userLogin.verifyUser);
  const { userInfo, error, loading } = user;

  console.log(error, "--------------err", userInfo);

  useEffect(() => {
    if (userInfo) {
      dispatch(verifyUser())
    }
    if (_verifyUser) {
      props.history.push("/");
    }
    // if (userInfo?._id == _verifyUser?.token?._id) {
    //   props.history.push("/");
    // }
  }, [props.history, userInfo, _verifyUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          {/* In Login or Register page has query ex:-shipping then redirect shiping page after user registerd or login */}
          New Customer ? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
