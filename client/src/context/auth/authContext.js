import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  user: null,
  signup: async (userData) => {},
  login: async (userData) => {},
  logout: () => { },
});

export default AuthContext;
