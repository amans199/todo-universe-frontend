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

// check color hex if it is dark or not
export const isColorDark = (color: string) => {
  const c = color.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 40;
};

export const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const formatDate = (date: Date) => {
  const dateConstructed = new Date(date);
  const year = dateConstructed.getFullYear();
  const month = dateConstructed.getMonth() + 1;
  const day = dateConstructed.getDate();
  const hours = dateConstructed.getHours();
  const minutes = dateConstructed.getMinutes();
  const seconds = dateConstructed.getSeconds();
  // display in a human readable way
  return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
};
