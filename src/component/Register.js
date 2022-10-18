import React from "react";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.password.value;
    console.log(email, pass);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          onBlur={handleEmailChange}
          type="email"
          name="email"
          id=""
          placeholder="your email"
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="your password"
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
