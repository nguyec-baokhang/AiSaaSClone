import { useCallback, useRef } from "react";
import { RegisterFormProps } from "../../types/index";
export function LoginForm({
    onRegister
}:RegisterFormProps){
    const cardBodyRef = useRef<HTMLFormElement>(null);

    const handleSubmit = useCallback(
        (e:React.SyntheticEvent) => {
            e.preventDefault();
            const cardBody = cardBodyRef?.current;
            const userNameInput = cardBody?.querySelector<HTMLInputElement>('input[type="text"]');
            const emailInput = cardBody?.querySelector<HTMLInputElement>('input[type="email"]');
            const passwordInput = cardBody?.querySelector<HTMLInputElement>('input[type="password"]');
            if (emailInput && passwordInput && userNameInput && emailInput.value.trim().length > 0 && 
            passwordInput.value.trim().length > 0 && userNameInput.value.trim().length > 0) {
                if (onRegister) {
                  onRegister(userNameInput.value, emailInput.value,passwordInput.value);
                }
                userNameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";
            }
        },
        [onRegister]
    );

    const handleEnterKey = useCallback(
        (e: React.KeyboardEvent<HTMLFormElement>) => {
            if(e.key == "Enter" && !e.shiftKey){
                handleSubmit(e);
            }
        }, [handleSubmit]
    );


    return(
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form 
                    className="card-body" 
                    ref={cardBodyRef}
                    onKeyUp={handleEnterKey}
                >
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
