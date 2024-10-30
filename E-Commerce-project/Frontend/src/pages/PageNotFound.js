
import React from 'react';
import { Footer, Navbar } from "../components";

const ForgotPassword = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Forgot Password</h1>
        <hr />
        <p>Please enter your email to reset your password.</p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
          </div>
          <button type="submit" className="btn btn-primary">Send Reset Link</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
