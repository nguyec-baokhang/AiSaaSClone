import { useCallback } from "react";
import { RegisterForm } from "../components/AuthenticationUi/RegisterForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function RegisterPage(){
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (username: string,email: string, password: string) => {
        try{
            const formData = {
                username,
                email,
                password
            }
            await axios.post('http://localhost:8080/api/v1/auth/register', formData,{
                headers: {
                    'Content-Type': 'application/json',
                  }
            });
            toast.success('User register successfully');
            navigate('/login');
        }catch(err: any){
            toast.error(err.response?.data?.message);
            console.log(err.response?.data?.message);
        }
    },[])    
    
    return(
        <RegisterForm
            onRegister={handleSubmit}
        />
    );
}