import "./App.css";
import TodosPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppNavbar from "./components/AppNavbar";
import { UserDataType } from "./types";
import { checkForTheToken } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  const userData: UserDataType = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : {};

  checkForTheToken();

  return (
    <>
      <div className="App">
        <Router>
          <AppNavbar user={userData} />
          <Routes>
            <Route path="/" element={<TodosPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
