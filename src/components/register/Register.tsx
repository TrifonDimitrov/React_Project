import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useRegister } from "../../hooks/useAuth";

const initialValues = { userName: "", email: "", password: "", rePassword: "" };

export default function Register() {
  const register = useRegister();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const registerHandler = async ({ userName, email,  password, rePassword }) => {
    console.log('From register component: ', userName, email, password, rePassword);
    
    if (password !== rePassword) {
      setError('Password don`t match!')
      return;
    }
    try {
      console.log("Before calling register function in authApi");
      await register( userName, email, password, rePassword);
      console.log("After calling register function in authApi");
      navigate("/");
    } catch (error) {
      setError(error.message)
      
    }
  };

  const {value, changeHandler, submitHandler } = useForm(initialValues, registerHandler);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center m-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register form
          </h2>
          {error && (
          <h3 style={{fontSize: '18px', color: 'red', textAlign: 'center', paddingTop: '2em'} }>{error}</h3>
        )} 
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
          <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  autoComplete="userName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.userName}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.email}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.password}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Repeat password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-1.5"
                  value={value.rePassword}
                  onChange={changeHandler}
                />
              </div>
            </div>

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
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
