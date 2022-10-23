import { useState, useEffect } from "react";
import axios from "../utils/axios";

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
const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

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
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);

  const fetchUserData = async () => {
    const response = await axios.post(
      "/user/account",
      user.userName,
      axiosHeaders
    );
    console.log(response.data);
    setUser(response.data);
    localStorage.setItem("userData", JSON.stringify(response.data));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const setAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
      getBase64(e.target.files[0], (result: string) => {
        setAvatarBase64(result);
      });
    }
  };

  //  from avatar object url to base64
  const getBase64 = (file: any, callback: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const saveUserDataHandler = async () => {
    const data = {
      id: user.id,
      userName: userName,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      role: user.role,
    };

    const formData = new FormData();
    formData.append("id", data.id.toString());
    formData.append("userName", data.userName);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("role", data.role);
    formData.append("avatar", avatarBase64 || "");

    try {
      formData.getAll("avatar");
      const response = await axios.put("/user/update", formData, axiosHeaders);
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

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
            value={userName || ""}
            onChange={(e) => setUserName(e.target.value)}
            disabled={!editMode}
          />
        </div>
        {/* avatar  */}
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="text-lg font-bold">
            Avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="border-2 border-gray-300 p-2 rounded mt-2"
            value={""}
            onChange={(e) => setAvatarHandler(e)}
            disabled={!editMode}
          />
          {/* preview  avatar*/}
          {user.avatar && (
            <div className="flex items-center justify-center mt-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-full"
              />
            </div>
          )}
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
            value={email || ""}
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
            value={firstName || ""}
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
            value={lastName || ""}
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
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!editMode}
          />
        </div>
        {editMode ? (
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={() => saveUserDataHandler()}
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
