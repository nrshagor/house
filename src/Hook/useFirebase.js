import { useState, useEffect } from "react";
import initializeFirebase from "../Page/LoginAndRegistration/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
initializeFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoding] = useState(true);
    const [authError, setAuthError] = useState('');
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const registerUser = (email, password, name, history) => {
        setIsLoding(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const newUser = { email, displayName: name };
                setUser(newUser);
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                history('/');
                setAuthError('');
                // ...
            })
            .catch((error) => {

                setAuthError(error.message);
                // ..
            }).finally(() => setIsLoding(false));
    }
    // Login User

    const loginUser = (email, password, location, history) => {
        setIsLoding(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoding(false));
    }
    //Google Sign In
    const signInWithGogle = () => {
        setIsLoding(true);

        signInWithPopup(auth, googleProvider)
            .then((result) => {

                //save user to database

                setAuthError('');
                // ...
            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoding(false));
    }
    // observer user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoding(false);
        });
        return () => unsubscribe;
    }, [])

    const logOut = () => {
        setIsLoding(true);
        signOut(auth).then(() => {

        }).catch((error) => {

        }).finally(() => setIsLoding(false));
    }
    return {
        isLoading,
        user,
        authError,
        signInWithGogle,
        registerUser,
        loginUser,
        logOut,
    }
}
export default useFirebase;