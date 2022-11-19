import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface Props {
  currentUser: User | null;
  signUp: (auth: any, email: string, password: string) => void;
}

export const Authcontext = createContext<Props>({
  currentUser: null,
  signUp: () => {},
});

//acess data from the provider and make it accessible at any hierarchy level of the app
// export const useAuthConsumer = () => {
//   return useContext(Authcontext);
// };

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
  // const signUp = async (email: string, password: string) => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(user);
  //     return user;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const value: Props = {
    currentUser,
    signUp,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};
export default AuthProvider;
