import { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';
import usePublicAxios from '../hooks/usePublicAxios';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = usePublicAxios();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, url) => {
        return updateProfile(auth.currentUser, {displayName:name,photoURL:url});
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return () => unSubscribe();
    }, [axiosPublic]);

    const authInfo = {user, loading, createUser, signIn, logOut, updateUserProfile, googleSignIn};


    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
