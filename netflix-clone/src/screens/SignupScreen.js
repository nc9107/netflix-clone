import React, { useRef } from "react";
import "./SignupScreen.css";
import { auth } from "../firebase";

function SignupScreen() {
  // useState renders on each change,
  // useRef doesn't re-render
  const emailRef = useRef(null);

  const passwordRef = useRef(null);

  // Prevents refreshing of page when button sare clicked on the login page.
  const register = (e) => {
    e.preventDefault();
    // Creates a new user with the provided password and email
    auth
      .createUserWithEmailAndPassword(
        // Get the current value of the user types in email and password.
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    // Signs in if user is already signed up
    auth
      .signInWithEmailAndPassword(
        // Get the current value of the user types in email and password
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen_gray">New to Netflix? </span>
          <span className="signupScreen_link" onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
