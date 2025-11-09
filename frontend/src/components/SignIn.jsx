import{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignIn(){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        navigate("/myprofile"); 
        return;
        }
    }, [])
    
    const verifyUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/users/signin`,{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName:userName,
                password:password,
            })});
        const data = await res.json();
        if (!res.ok){
            setError(data.error || "log in failed")
            return;
        }
        console.log("Log in successfully:", data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/myprofile");
        }catch(e){
            console.log("error logging in: ", e);
            setError("Network error. Please try again later.");
        }
    };

    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={verifyUser} className="signup-form">
                    <label>User Name: <input type="text" placeholder="Enter your user name" value={userName} onChange={(e) => setUserName(e.target.value)}/></label>
                    <label>Password: <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                    {error? <p style={{color: "red"}}>{error}</p> : null}
                    <button type="submit" style={{alignSelf: "center"}} disabled={!userName.trim() || !password.trim()}>Sign In</button>
                    <p>No account? Please<Link to="/signup">Sign up</Link></p>
                </form>
            </div>
        </main>
    )

}