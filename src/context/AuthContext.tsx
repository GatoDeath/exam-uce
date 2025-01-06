import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export enum statesOfLogin {
  checking = "checking",
  login = "login",
  closed = "closed",
}

interface modelAuth {
  state: statesOfLogin;
  loginEmailWithPassword: (email: string, password: string) => void;
  logoutOfAccount: () => void;
}

export const AuthContext = createContext({} as modelAuth);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvides = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<statesOfLogin>(statesOfLogin.checking);

  // Verificar el estado inicial solo una vez
  useEffect(() => {
    const savedState = localStorage.getItem("authState");
    setState(
      savedState === "login" ? statesOfLogin.login : statesOfLogin.closed
    );
  }, []);

  const loginEmailWithPassword = useCallback(
    (email: string, password: string) => {
      const fakeUser = { email: "admin@uce", password: "admin" };

      if (email === fakeUser.email && password === fakeUser.password) {
        localStorage.setItem("authState", "login");
        setState(statesOfLogin.login);
      } else {
        alert("Invalid credentials");
        localStorage.removeItem("authState");
        setState(statesOfLogin.closed);
      }
    },
    []
  );

  const logoutOfAccount = useCallback(() => {
    localStorage.removeItem("authState");
    setState(statesOfLogin.closed);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        loginEmailWithPassword,
        logoutOfAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
