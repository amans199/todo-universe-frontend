import { useContext } from "react";
import "./App.css";
import TodoApp from "./pages/TodoApp";
import axios from "./utils/axios";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  // if there are token in the local storage then the user is logged in if not redirect to login page
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <>
        <div className="mb-5">
          <LoginPage />
        </div>
        <RegisterPage />
      </>
    );
  }

  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
