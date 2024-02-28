"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


import LandingPage from "./components/LandingPage";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication logic (replace with actual authentication code)
    if (email === "hello@example.com" && password === "password123") {
      setLoggedIn(true);
      // alert("Login successful!");
      toast.success("Login successful!");
      router.push("/landing", { email });
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  // If user is logged in, redirect to LandingPage component
  // if (isLoggedIn) {
  //   router.push("/landing", { email });
  //   return null;
  // }
  console.log("email", email);
  return (
    <>
      <div className="m-8 flex flex-col h-full justify-center items-center content-center">
        <div className="">
          <div className="">
            {/* {isLoggedIn ? (
              <LandingPage email={email} />
            ) : (
              <> */}
            <div className="userLogin">
              <a className="userLink" href="/">
                USER LOGIN
              </a>
              <i className="loginLogo fa fa-arrow-right"></i>
            </div>
            <div className="loginSection">
              <div className="title">
                Hello<span style={{ color: "blue" }}>Blogs</span>
              </div>
            </div>
            <div className="loginForm">
              <div className="login-p">Login to blog portal</div>
              <form className="form" onSubmit={handleLogin}>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link href="/" className="forgot-pass">
                  Forgot Password?
                </Link>
                <button className="login-btn" type="submit">
                  Login
                </button>
              </form>
              <div className="sso">
                <p>SSO</p>
              </div>

              <p className="login-content">
                Difficulty logging in? Contact our team.
              </p>
            </div>

            <div className="login-footer">
              <p>© 2023, HelloBlogs. All Rights Reserved.</p>
              <p style={{ color: "black" }}>Terms & Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
