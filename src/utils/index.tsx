import { UserDataType } from "../types";

export const checkForTheToken = () => {
  const tokenExp: string | null = localStorage.getItem("tokenExp")
    ? localStorage.getItem("tokenExp")
    : "";

  const userData: UserDataType = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "")
    : {};

  if (tokenExp) {
    const now: Date = new Date();
    const exp: Date = new Date(JSON.parse(tokenExp));
    if (now.getTime() > exp.getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
  }

  // if (!userData || !userData.userName) {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("tokenExp");
  //   localStorage.removeItem("userData");
  //   window.location.href = "/";
  // }
};
