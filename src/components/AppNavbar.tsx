// create navbar with tailwind
//  display user name from userdata saved in localstorage
import { UserDataType } from "../types";

const AppNavbar = ({ user }: { user?: UserDataType }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 w-full">
      <div className="text-white font-bold">Navbar</div>
      {/* display userName and dropdown to go to account page or logout  */}
      {user && Object.values(user)?.length ? (
        <div className="flex items-center">
          <div className="on-hover-display-inside-dropdown relative">
            <button className=" bg-gray-800 text-white p-2 rounded flex">
              <div className="text-white mr-4">{user.userName}</div>
              &#x25BC;
            </button>
            <div className="dropdown absolute right-0 w-40 bg-gray-800 rounded shadow-lg py-2 text-white">
              <div className="dropdown-wrapper py-2 ">
                <a
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                >
                  Account
                </a>
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
