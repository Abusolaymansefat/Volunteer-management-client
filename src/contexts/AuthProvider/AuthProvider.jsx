import React, { useState } from 'react';
import { AuthContex } from '../AuthContexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [loading,setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading (true)
        return createUserWithEmailAndPassword(auth,email, password)
    }
    const authIno ={
        loading,
        createUser
    }
    return (
        <div>
            <AuthContex value={authIno}>
                {children}
            </AuthContex>
        </div>
    );
};

export default AuthProvider;