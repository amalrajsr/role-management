/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/form.css";
import { useState } from "react";
function RegisterForm({
  header,
  redirect,
  redirectBtnName,
  handleFunction,
  loader
}) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [showPass, setShowPass] = useState(false);

  const handleUserName = (e) => {
    const name = e.target.value;
    if (!name.trim().length) {
      setError({ ...error, name: "name cannot be empty" });
      setUser({ ...user, name: "" });
    } else {
      setUser({ ...user, name });
      setError({ ...error, name: null });
    }
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setUser({ ...user, email });
    if (emailPattern.test(email)) {
      setError({ ...error, email: null });
    } else {
      setError({ ...error, email: "Invalid Email" });
    }
  };
  const handlePassWord = (e) => {
    const password = e.target.value;
    const passwordPattern = /^\S{5,}$/;
    setUser({ ...user, password });
    if (passwordPattern.test(password)) {
      setError({ ...error, password: null });
    } else {
      setError({
        ...error,
        password: "password must contain atleast 6 characters",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.email &&
      user.password &&
      !error.email &&
      !error.name &&
      !error.password
    ) {
      handleFunction(user);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <h1 className="text-2xl mb-5">{header}</h1>
          <form
            className="form_container"
            method="post"
            onSubmit={handleSubmit}
          >
            <span className={`text-green-400 text-md font-medium my-2`}>
              {location.state?.message || ""}
            </span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input my-2"
              value={user.name}
              onChange={(e) => handleUserName(e)}
            />
            <div>
              <span className="text-red-400 text-start">{error?.name}</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input my-2"
              // required
              value={user.email}
              onChange={(e) => handleEmail(e)}
            />
            <div>
              <span className="text-red-400 text-start">{error.email}</span>
            </div>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              className="input"
              value={user.password}
              onChange={(e) => handlePassWord(e)}
            />
            <div>
              <span className="text-red-400 text-start">{error.password}</span>
            </div>
            <div className="self-start ml-2">
              <input type="checkbox" onChange={() => setShowPass(!showPass)} />
              <span className="mx-1">show</span>
            </div>
            <button type="submit" disabled={loader} className=" bg-[#162031] text-white border-none outline-none py-3 px-0 rounded-3xl w-48 font-bold text-base cursor-pointer  focus:ring focus:ring-gray-300">
              {loader ? 'loading': 'Register'}
            </button>
          </form>
        </div>
        <div className="right">
          <Link to={redirect}>
            <button type="button" className=" bg-white border-none outline-none py-3 px-0 rounded-3xl w-48 font-bold text-base cursor-pointer hover:bg-gray-100 focus:ring focus:ring-gray-300">
              {redirectBtnName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
