import { useState } from "react";

function LoginForm({
  handleFunction,
  loader,
  heading
}) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const [showPass, setShowPass] = useState(false);

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
    if (user.email && user.password && !error.email && !error.password) {
      handleFunction(user);
    }
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <h1 className="text-2xl mb-5">{heading}</h1>
          <form
            className="form_container"
            method="post"
            onSubmit={handleSubmit}
          >
            <span className={`text-green-400 text-md font-medium my-2`}>
              {location.state?.message || ""}
            </span>
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
              <span className="text-red-400">{error.email}</span>
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
              <span className="text-red-400">{error.password}</span>
            </div>
            <div className="self-start ml-2">
              <input type="checkbox" onChange={() => setShowPass(!showPass)} />
              <span className="mx-1">show</span>
            </div>
            <button type="submit" disabled={loader} className=" bg-[#162031] text-white border-none outline-none py-3 px-0 rounded-3xl w-48 font-bold text-base cursor-pointer focus:ring focus:ring-gray-300">
              {loader ? "loading" : "Login"}
            </button>
          </form>
        </div>
        <div className="right">
        
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
