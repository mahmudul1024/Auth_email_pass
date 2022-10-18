import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../Firebase/firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    setSuccess(false);
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("error", error.message);
      });
  };

  const handleBlur = (event) => {
    const email = event.target.value;
    console.log(email);
    setEmail(email);
  };

  const handleForgot = () => {
    if (!email) {
      alert("Please enter Email ");
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Password reset email has been sent");
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onBlur={handleBlur}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {success && (
        <p className="text-success text-center text-2xl bold p-3">
          Login successfully done
        </p>
      )}
      <p>
        <small>
          {" "}
          New to this Website ? Please <Link to="/register">Register</Link>{" "}
        </small>
      </p>
      <p>
        Forgot Password ?{" "}
        <button className="btn btn-link" type="button" onClick={handleForgot}>
          please reset
        </button>{" "}
      </p>
    </div>
  );
};

export default LoginBootstrap;
