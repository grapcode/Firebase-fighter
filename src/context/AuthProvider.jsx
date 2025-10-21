import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

// ⚡ google signin
const googleProvider = new GoogleAuthProvider();

// ⚡ GitHub signin
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  💥 signUp
  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //  💥 signin
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  💥 google
  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  💥 gitHub
  const signInWithGithubFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  //  💥 signOut
  const signOutFunc = () => {
    setLoading(true);
    return signOut(auth);
  };

  //  💥 ForgetPassword
  const sendPasswordResetEmailFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // 💥 2nd step:  update Profile
  const updateProfileFunc = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // 💥 3rd step: email verification

  const sendEmailVerificationFunc = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const authInfo = {
    user,
    setUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    signOutFunc,
    sendPasswordResetEmailFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    loading,
    setLoading,
  };

  // 💥 user refrash dile jeno signout na hoy
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      // console.log(user);
      setUser(currUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
