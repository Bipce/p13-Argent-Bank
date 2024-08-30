import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
          <h1>Sign In</h1>

          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* <!-- PLACEHOLDER DUE TO STATIC SITE -->*/}
            <Link to="/" className="sign-in-button">Sign In</Link>
            {/*
            <!-- SHOULD BE THE BUTTON BELOW -->
            <!-- <button class="sign-in-button">Sign In</button> -->
            <!--  -->
            */}
          </form>
        </section>
      </main>
    </>
  );
};

export default SignIn;