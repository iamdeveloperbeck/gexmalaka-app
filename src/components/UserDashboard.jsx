import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../data/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    alert('Foydalanuvchi hujjati topilmadi!');
                }
            } else {
                alert('Foydalanuvchi tizimga kirmagan, login sahifasiga yo‘naltirilmoqda');
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
        <div className="user-dashboard">
            <h1>Xush kelibsiz, {userData?.firstName} {userData?.lastName}</h1>
            <p><strong>O'quv sohasi:</strong> {userData?.fieldOfStudy}</p>
            <p><strong>Diplom raqami:</strong> {userData?.diplomaNumber}</p>
            <p><strong>Sertifikat raqami:</strong> {userData?.certificateNumber}</p>
            <p><strong>Boshlanish sanasi:</strong> {userData?.startDate}</p>
            <p><strong>Tugash sanasi:</strong> {userData?.endDate}</p>
            <button onClick={handleLogout}>Chiqish</button>
        </div>
    );
};

export default UserDashboard;
