import React, { useContext } from 'react';
import { AuthContex } from '../contexts/AuthContexts/AuthContext';

const UseAuth = () => {
    return useContext(AuthContex);
};

export default UseAuth;