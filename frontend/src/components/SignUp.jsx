import{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignUp(){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const { user, loading, refreshAuth } = useAuth();
    useEffect(() => {
        if (!loading && user) {
            console.log("User logged in. Redirecting...");
            navigate('/myprofile', { replace: true });
        }
    }, [user, loading]);


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
        refreshAuth()
        }catch(e){
            console.log("error creating user: ", e);
            setError("Network error. Please try again later.");
        }
    };

    return(
        <main className="login-main">
            <div className="card p-4 rounded-4 shadow" style={{ width: "28rem", backgroundColor: "white" }}>
                <form onSubmit={createUser}> 
                    <div className="mb-3 text-start">
                        <label for="InputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" style={{ borderColor: "gray", borderWidth: "2px" }} id="InputEmail" placeholder = "example@email.com" aria-describedby="emailIcon" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3 text-start">
                        <label for="InputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" style={{ borderColor: "gray", borderWidth: "2px" }} id="InputPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error? <p style={{color: "red"}}>{error}</p> : null}
                    <div className="d-grid">
                        <button type="submit" className="btn" style={{backgroundColor: "#7D5BA6", color: "white"}} disabled={!email.trim() || !password.trim()}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )

}