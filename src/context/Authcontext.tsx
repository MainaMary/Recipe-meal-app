import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Props {
  currentUser: User | null;
  signUp: (auth: any, email: string, password: string) => void;
}

export const Authcontext = createContext<Props>({
  currentUser: null,
  signUp: () => {},
});

interface IProps {
  children: JSX.Element;
}

const AuthProvider = ({ children }: IProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    //unsubscribe from onAuth when the component is unmounted
    return unsubscriber;
  }, []);

  const signUp = (auth: any, email: string, password: string) => {
    const register = auth.createUserWithEmailAndPassword(auth, email, password);
    return register;
  };

  const value: Props = {
    currentUser,
    signUp,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};
export default AuthProvider;
