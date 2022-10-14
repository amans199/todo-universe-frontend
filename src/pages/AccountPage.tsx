import { useState, useEffect } from "react";

type UserDataType = {
  id: number;
  userName: string;
  password: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};
// create account page using tailwind and typescript
// display data from UserDataType and display button to edit it

const AccountPage = () => {
  const userData: UserDataType = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : {};
  const [user, setUser] = useState<UserDataType>(userData);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState(user.password);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-1/2">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Account</div>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="userName" className="text-lg font-bold">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="text-lg font-bold">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="firstName" className="text-lg font-bold">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="lastName" className="text-lg font-bold">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!editMode}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="text-lg font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!editMode}
          />
        </div>
        {editMode ? (
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={() => {
              const data = {
                id: user.id,
                userName: userName,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                avatar: user.avatar,
                role: user.role,
              };
              localStorage.setItem("userData", JSON.stringify(data));
              setUser(data);
              setEditMode(false);
            }}
          >
            Save
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
