import{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/src/supabase-client";

export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const [session, setSession] = useState(null)
    
    useEffect(() => {
    const checkLogin = async () => {
        const { data: { user }, error} = await supabase.auth.getUser();
        if (user) {
        navigate('/myprofile');
        }
    };
    checkLogin();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (_event === 'SIGNED_IN') {
        navigate('/myprofile');
        }
    });

    return () => {
        data.subscription.unsubscribe();
    };
    }, []);

    
    const verifyUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/auth/signin`,{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:email,
                password:password,
            })});
        const data = await res.json();
        if (!res.ok){
            setError(data.error || "log in failed")
            return;
        }
        }catch(e){
            setError("Network error. Please try again later.");
        }
    };

    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={verifyUser} className="signup-form">
                    <label>Email: <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>Password: <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                    {error? <p style={{color: "red"}}>{error}</p> : null}
                    <button type="submit" style={{alignSelf: "center"}} disabled={!email.trim() || !password.trim()}>Sign In</button>
                    <p>No account? Please<Link to="/signup">Sign up</Link></p>
                </form>
            </div>
        </main>
    )

}