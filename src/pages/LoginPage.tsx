// login page
import React, { useState } from "react";
import axios from "../utils/axios";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/Login/Authorize", {
        username,
        password,
      })
      .then((res) => {
        console.log("🚀 ~ file: LoginPage.tsx ~ line 17 ~ .then ~ res", res);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // create nice login form using tailwind
  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-1/3"
      >
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="username"
          className="border-2 border-gray-300 p-2 rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-300 p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
