import {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const verifyUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/auth/signin`,{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:email,
                password:password,
            }),
            credentials: 'include'});
            const data = await res.json();
            if (!res.ok){
                setError(data.error || "log in failed")
                return;
            }
            console.log("Sign-in successful. Refreshing Auth State via /api/auth/me...");
            refreshAuth();
        }catch(e){
            setError("Network error. Please try again later.");
        }
    };
    
    if (loading) {
        return <main className="login-main"><p>loading...</p></main>;
    }

    return(
        <main className="login-main">
            <div className="card p-4 rounded-4 shadow" style={{ width: "28rem", backgroundColor: "white" }}>
                <form onSubmit={verifyUser}> 
                    <div className="mb-3 text-start">
                        <label for="InputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" style={{ borderColor: "gray", borderWidth: "2px" }} id="InputEmail" placeholder = "example@email.com" aria-describedby="emailIcon" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3 text-start">
                        <label for="InputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" style={{ borderColor: "gray", borderWidth: "2px" }} id="InputPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error? <p style={{color: "red"}}>{error}</p> : null}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="remember"/>
                        <label class="form-check-label" for="remember">
                            remember me
                        </label>
                        </div>
                        <Link to="">Forget Password?</Link>
                    </div>
                    <p>No account? Please <Link to="/signup">Sign up</Link></p>
                    <div className="d-grid">
                        <button type="submit" className="btn" style={{backgroundColor: "#7D5BA6", color: "white"}} disabled={!email.trim() || !password.trim()}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )

}