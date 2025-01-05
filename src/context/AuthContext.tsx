import { createContext, PropsWithChildren, useContext, useState } from "react";

// Definir los posibles estados de la autenticación.
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

export const AuthProvides = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<statesOfLogin>(statesOfLogin.checking);

  const loginEmailWithPassword = (email: string, password: string) => {
    // Verificar las credenciales. Esto puede ser reemplazado con una API real.
    const fakeUser = {
      email: "admin",
      password: "admin",
    };

    if (email === fakeUser.email && password === fakeUser.password) {
      setState(statesOfLogin.login); // Si las credenciales son correctas, cambia el estado a login.
    } else {
      alert("Invalid credentials");
      setState(statesOfLogin.checking); // Si no son correctas, se queda en 'checking' o 'closed'.
    }
  };

  const logoutOfAccount = () => {
    setState(statesOfLogin.closed); // Cambia el estado a cerrado cuando el usuario cierre sesión.
  };

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
