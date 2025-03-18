import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useLogin } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Background from "../../style/Background";

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { value, changeHandler, submitHandler, resetForm } = useForm(
    { email: "", password: "" },
    async ({ email, password }) => {
      try {
        await login(email, password);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Invalid email or password.");
      }
    }
  );

  return (
    <>
      <Background />
      <div className=" absolute inset-0 flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-16 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login form
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Email
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.email}
                  onChange={changeHandler}
                />
              </label>

              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Password
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.password}
                  onChange={changeHandler}
                />
              </label>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-10 text-center text-sm text-gray-500">
            <p>
              You don't have a registration yet?{" "}
              <a
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
