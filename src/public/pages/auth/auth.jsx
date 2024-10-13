import Button from 'react-bootstrap/Button';
import { auth, provider } from '../../../config/firebase-config'
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();
    
    const SignInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userId: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expenseTracker");
        } catch (error) {
            console.error(error);
        }
    };

    if (isAuth){
        return <Navigate to="/expenseTracker" />
    }

    return (
        <div className="loginPage">
            <p>Sign in to Google to continue</p>
            <Button onClick={SignInWithGoogle}>
                Sign In With Google
            </Button>
        </div>
    )
}