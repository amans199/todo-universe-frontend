// login page
import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/user/register", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.userData));
        localStorage.setItem("tokenExp", JSON.stringify(res.data.tokenExp));
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // create nice login form using tailwind
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-1/3"
      >
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <input
          type="text"
          placeholder="username"
          className="border-2 border-gray-300 p-2 rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <input
          type="email"
          placeholder="email"
          className="border-2 border-gray-300 p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Register</button>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
