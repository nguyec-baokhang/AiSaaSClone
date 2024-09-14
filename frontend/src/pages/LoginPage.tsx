import { useCallback,useEffect,useState } from "react";
import { LoginForm } from "../components/AuthenticationUi/LoginForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginPage(){
    const navigate = useNavigate();
    const [token,] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if(token){
            navigate('/');
        }
    });

    const handleSubmit = useCallback(async (username: string,email: string, password: string) => {
        try{
            const formData = {
                username,
                email,
                password
            }
            const responseData = await axios.post('http://localhost:8080/api/v1/auth/login', formData,{
                headers: {
                    'Content-Type': 'application/json',
                  }
            });
            console.log(responseData.data.user);
            localStorage.setItem('token',responseData.data.token);
            toast.success('User register successfully');
            navigate('/');
        }catch(err: any){
            toast.error(err.response?.data?.message);
            console.log(err.response?.data?.message);
        }
    },[])    
    
    return(
        <LoginForm
            onRegister={handleSubmit}
        />
    );
}