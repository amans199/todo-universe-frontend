import { useContext } from "react";
import "./App.css";
import TodoApp from "./pages/TodoApp";
import axios from "./utils/axios";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppNavbar from "./components/AppNavbar";
import { UserDataType } from "./types";
// import react router components

function App() {
  const token = localStorage.getItem("token");
  const userData: UserDataType = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : {};

  if (!token) return <LayoutIfNoTokenComponent userData={userData} />;

  checkForTheToken();

  return (
    <>
      <AppNavbar user={userData} />
      <div className="App">
        <TodoApp />
      </div>
    </>
  );
}

const checkForTheToken = () => {
  const tokenExp = localStorage.getItem("tokenExp")
    ? localStorage.getItem("tokenExp")
    : "";
  if (tokenExp) {
    const now = new Date();
    const exp = new Date(tokenExp);
    if (now.getTime() > exp.getTime()) {
      // token is expired
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
  }
};

const LayoutIfNoTokenComponent = ({ userData }: { userData: UserDataType }) => {
  return (
    <>
      <AppNavbar user={userData} />

      {/* create layout with two columns for login and signup */}
      <div className="flex flex-col md:flex-row  mt-[20%]">
        <div className="w-full md:w-1/2">
          <LoginPage />
        </div>
        <div className="w-full md:w-1/2">
          <RegisterPage />
        </div>
      </div>
    </>
  );
};
export default App;
