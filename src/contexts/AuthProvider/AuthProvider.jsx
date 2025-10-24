import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user with Email & Password
  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;

        // Update Firebase profile
        await updateProfile(user, {
          displayName: name,
          photoURL,
        });

        // Insert to MongoDB users collection
        await axiosInstance.post("/users", {
          name,
          email,
          photoURL,
          role: "user",
        });

        setUser(user);
        return user;
      })
      .finally(() => setLoading(false));
  };

  // Login with Email & Password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        return result.user;
      })
      .finally(() => setLoading(false));
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("access-token");
      setUser(null);
      Swal.fire("Success!", "Logged out successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to logout.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;

      if (currentUser?.email) {
        // JWT token
        const res = await axiosInstance.post(
          "/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );
        localStorage.setItem("access-token", res.data.token);

        // MongoDB insert
        await axiosInstance.post("/users", {
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          role: "user",
        });
      }

      setUser(currentUser);
      Swal.fire("Success!", "Logged in with Google!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Google login failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          // JWT token
          const res = await axiosInstance.post(
            "/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );
          localStorage.setItem("access-token", res.data.token);

          // MongoDB insert (idempotent, won't duplicate if user exists)
          await axiosInstance.post("/users", {
            name: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: "user",
          });
        } catch (err) {
          console.error("MongoDB insert error:", err);
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

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
