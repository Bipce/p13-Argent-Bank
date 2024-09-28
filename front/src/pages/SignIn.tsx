import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../app/store.ts";
import { setAccessToken } from "../features/userSlice.ts";
import { useLoginMutation } from "../features/apiSlice.ts";

type FormData = {
  email: string,
  password: string
}

const SignIn = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z.object({
    email: z.string().email({ message: "Invalid address email" }),
    password: z.string().min(4, { message: "The password has to be 4 characters minimum." }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    try {
      const loginData = await login({ email: data.email, password: data.password }).unwrap();
      const { token } = loginData.body;

      localStorage.setItem("token", token);
      dispatch(setAccessToken(token));

      navigate("/user");
      setIsError(false);
    } catch (err: any) {
      if (err.data.message) {
        setIsError(true);
      }
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon className="sign-in-icon" icon={faUserCircle} />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit(submitData)}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input type="text" {...register("email")} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {errors.password && <span className="error">{errors.password.message}</span>}
              {isError && <span className="error-not-found">User not found</span>}
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