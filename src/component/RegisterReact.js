import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "./Firebase/firebase.init";

const auth = getAuth(app);

const RegisterReact = () => {
  const [passwordError, setpasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    setSuccess(false);
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.password.value;

    console.log(name, email, pass);
    if (!/(?=.*[A-Z].*[A-Z])/.test(pass)) {
      setpasswordError("Please enter atleast two Upper case characters");
      return;
    }

    if (pass.length < 6) {
      setpasswordError("please set 6 character");
      return;
    }

    if (!/(?=.*[!@#$%&*?])/.test(pass)) {
      setpasswordError("you must add a special character");
      return;
    }

    setpasswordError("");

    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        event.target.reset();
        varifyEmail();
        updateName(name);
      })
      .catch((error) => {
        console.error("error :", error);
        setpasswordError(error.message);
      });
  };

  const updateName = (name) => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        alert("name is updated now");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email varification link sent ");
      alert("Email varification link sent");
    });
  };

  return (
    <div>
      <h2 className="text-primary py-5">Please Register!!!</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">User created succesfully</p>}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>
        <small>
          {" "}
          Already have an Account ? Please <Link to="/login">Login</Link>{" "}
        </small>
      </p>
    </div>
  );
};

export default RegisterReact;
