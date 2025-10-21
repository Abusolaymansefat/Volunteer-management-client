
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init"; 
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email & password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("access-token"); // JWT token remove
      setUser(null);
      Swal.fire("Success!", "Logged out successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to logout.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;

      // Send email to backend for JWT
      if (currentUser?.email) {
        const res = await axios.post(
          "http://localhost:3000/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );
        localStorage.setItem("access-token", res.data.token);
      }

      setUser(currentUser);
      Swal.fire("Success!", "Logged in with Google!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to login with Google.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If user logged in, get JWT token
      if (currentUser?.email) {
        try {
          const res = await axios.post(
            "http://localhost:3000/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );
          localStorage.setItem("access-token", res.data.token);
        } catch (error) {
          console.error("JWT fetch error:", error);
        }
      }

      setLoading(false);
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
