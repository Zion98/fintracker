import axios from "axios";

export function dateConv(CurrentDate: string) {
  let date = new Date(CurrentDate);
  let year = date.getFullYear();
  let hh = date.getHours();
  let sec = date.getSeconds();
  let min = date.getMinutes();
  let m = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month: string = m[date.getMonth() + 1];
  let dt: string | number = date.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  return `${month} 
    ${dt}, 
    ${year} 
    ${hh}:${min}:${sec}`;
}

const apiUrl = `http://localhost:3000`;
const access = document.cookie;
export const accessToken = access.split("=")[1];

export const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const User = (names: string) => {
  const joinName = names.split(" ");
  return joinName.map((name) => name[0].toUpperCase()).join("");
};
