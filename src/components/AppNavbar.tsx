// create navbar with tailwind
//  display user name from userdata saved in localstorage
import { UserDataType } from "../types";
import { useNavigate } from "react-router-dom";

const AppNavbar = ({ user }: { user?: UserDataType }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 w-full">
      <button
        className="text-white font-bold text-2xl"
        onClick={() => navigate("/")}
      >
        Todo Universe App
      </button>
      {/* display userName and dropdown to go to account page or logout  */}
      {user && Object.values(user)?.length ? (
        <div className="flex items-center">
          <div className="on-hover-display-inside-dropdown relative">
            <button className=" bg-gray-800 text-white p-2 rounded flex">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="text-white mr-4">{user.userName}</div>
              &#x25BC;
            </button>
            <div className="dropdown absolute right-0 w-40 bg-gray-800 rounded shadow-lg py-2 text-white">
              <div className="dropdown-wrapper py-2 ">
                <button
                  onClick={() => navigate("/account")}
                  className="block px-4 py-2 text-sm hover:bg-gray-700 w-100"
                >
                  Account
                </button>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-700 "
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("tokenExp");
                    localStorage.removeItem("userData");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppNavbar;
