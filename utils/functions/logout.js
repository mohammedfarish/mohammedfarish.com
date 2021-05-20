import axios from "axios";

export default async function logOutUser() {
  const user = window.localStorage.getItem("user");
  if (!user) return true;

  return axios.get("/api/user/signout", {
    headers: {
      "x-auth-token": window.localStorage.getItem("user"),
    },
  })
    .then((response) => {
      if (response.data === true) {
        return true;
      }
      return false;
    })
    .catch(() => false);
}
