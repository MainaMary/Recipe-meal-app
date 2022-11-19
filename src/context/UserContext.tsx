import { createContext, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseApp";
import { useState } from "react";
interface Props {
  currentUser: User | null;
  // signUp: (auth: Auth, email: string, password: string) => Promise<any>;
}

interface Iprops {
  children: JSX.Element;
}
export const UserContext = createContext<Props>({
  currentUser: null,
});
const AuthProvider = ({ children }: Iprops) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user, "user in effect");

      return setCurrentUser(user);
    });
    //unsubscribe from the function when the component is unmounted
    console.log(currentUser, "user after unsubscribe");

    return unsubscribe;
  }, []);
  const value: Props = {
    currentUser,
  };
  console.log(currentUser, "user in provider");

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AuthProvider;
