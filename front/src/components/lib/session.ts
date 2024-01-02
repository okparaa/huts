export type Session = {
  id: string;
  auth: string;
  ver: string;
  iat: number;
  exp: number;
};

const parseJwt = (token: string): Session => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const useSession = () => {
  const token = localStorage.getItem("token") || null;
  let decoded = null;
  if (token) {
    decoded = parseJwt(token);
  }
  return decoded;
};
