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
                    console.log('Foydalanuvchi hujjati topilmadi!');
                }
            } else {
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
            <h1>Welcome, {userData?.firstName} {userData?.lastName}</h1>
            <p><strong>Field of Study:</strong> {userData?.fieldOfStudy}</p>
            <p><strong>Diploma Number:</strong> {userData?.diplomaNumber}</p>
            <p><strong>Certificate Number:</strong> {userData?.certificateNumber}</p>
            <p><strong>Start Date:</strong> {userData?.startDate}</p>
            <p><strong>End Date:</strong> {userData?.endDate}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDashboard;