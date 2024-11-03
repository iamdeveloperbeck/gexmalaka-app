import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import image from '../assets/image';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            alert("Login successful!");
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col relative">
            <div className="absolute top-0 left-0 w-full z-10">
                <div className="w-full flex items-center justify-center p-[20px_0]">
                    <img src={image.Logo} className="w-[100px] object-cover" />
                </div>
            </div>
            <div className='border rounded-[15px] shadow-sm p-10 text-center'>
                <h2 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900'>Kirish</h2>
                <form onSubmit={handleLogin}>
                    <div className='text-left'>
                        <label className='block text-sm font-medium text-gray-900'>Login:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            placeholder='Loginni kiriting!'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='text-left'>
                        <label className='block text-sm font-medium text-gray-900'>Parol:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                            placeholder='Parolni kiriting!'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className='text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Kirish</button>
                </form>
            </div>
            <p className="mt-3 text-gray-500">Sizga markaz tomonidan berilgan login va parolni kiriting!</p>
        </div>
    );
};

export default Login;
