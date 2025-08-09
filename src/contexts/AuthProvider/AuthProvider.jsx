import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { AuthContex } from "../AuthContexts/AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if(currentUser?.email){
        const userData = {email: currentUser.email}
        axios.post('https://volunteer-server-ten.vercel.app/jwt', userData, {
          withCredentials: true, 
          
        })
        .then(res => {
          console.log( res.data)
          // const token = res.data.token
          // localStorage.setItem('token', token)
        })
        .catch(error => console.log(error))
      }
      // console.log('user in the auth state chang', currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContex.Provider value={authInfo}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
