import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../app/store.ts";
import { setAccessToken } from "../features/userSlice.ts";
import { useLoginMutation } from "../features/apiSlice.ts";

interface ILogin {
  email: string;
  password: string;
}

const SignIn = () => {
  const [user, setUser] = useState<ILogin>({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await login({ email: user.email, password: user.password }).unwrap();
      const { token } = data.body;

      localStorage.setItem("token", token);
      dispatch(setAccessToken(token));

      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="email" name="email" value={user.email} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignIn;