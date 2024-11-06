import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../data/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import images from '../assets/image';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User UID:", user.uid);

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Foydalanuvchi ma'lumotlari:", docSnap.data());
                    setUserData(docSnap.data());
                } else {
                    console.log('Foydalanuvchi hujjati topilmadi!');
                }
            } else {
                console.log('Foydalanuvchi tizimga kirmagan, login sahifasiga yo‘naltirilmoqda');
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='relative w-full h-screen'>
            <div className='flex items-start flex-col'>
                <div className='container'>
                    <div className='flex items-center justify-between w-full h-[60px]'>
                        <img src={images.Logo} alt="logo" className='w-[80px]' />
                        <button onClick={handleLogout}>Chiqish</button>
                    </div>
                </div>
                <div className="w-full h-[calc(100vh_-_240px)] relative pt-5 sm:pt-4">
                    <div className='container'>
                        <div className='w-full flex items-start gap-5 sm:flex-col sm:items-center'>
                            <div className='flex items-center gap-5'>
                                <div className='w-[200px] h-[200px] bg-slate-400 flex items-center justify-center sm:h-[150px] sm:w-[150px] sm:rounded-full'>No Image</div>
                            </div>
                            <div className='w-full flex flex-col items-start sm:items-center sm:text-center'>
                                <div>
                                    <span className='text-lg font-normal text-gray-500'>Xush kelibsiz,</span>
                                    <h1 className='text-4xl mb-6 font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl'>{userData?.firstName} {userData?.lastName}</h1>
                                </div>
                                <div className='w-full flex items-start gap-4'>
                                    <div className='w-full p-4 bg-gray-200 rounded'>
                                        <p><strong>O'quv sohasi:</strong> {userData?.fieldOfStudy}</p>
                                        <p><strong>Diplom raqami:</strong> {userData?.diplomaNumber}</p>
                                        <p><strong>Sertifikat raqami:</strong> {userData?.certificateNumber}</p>
                                        <p><strong>Boshlanish sanasi:</strong> {userData?.startDate}</p>
                                        <p><strong>Tugash sanasi:</strong> {userData?.endDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
