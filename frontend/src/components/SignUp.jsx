import{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/src/supabase-client";


export default function SignUp(){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;


    const createUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/auth/signup`,{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })});
        const createdUser = await res.json();
        if (!res.ok){
            setError(createdUser.error || "Sign up failed");
            return;
        }
        console.log("Sign up successfully", createdUser);
        navigate("/myprofile");
        }catch(e){
            console.log("error creating user: ", e);
            setError("Network error. Please try again later.");
        }
    };

    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={createUser} className="signup-form">
                    <label>Email: <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>password: <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <button disabled={!email.trim() || !password.trim()} type="submit" style={{alignSelf: "center"}}>Sign Up</button>
                </form>
            </div>
        </main>
    )

}