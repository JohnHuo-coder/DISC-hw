import{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp(){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [major, setMajor] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [profilePicture, setImage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;


    
    const createUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/users/signup`,{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio,
                major: major,
                graduationYear: graduationYear,
                profilePicture: profilePicture,
            })});
        const createdUser = await res.json();
        if (!res.ok){
            setError(createdUser.error || "Sign up failed");
            return;
        }
        console.log("Sign up successfully", createdUser);
        localStorage.setItem("user", JSON.stringify(createdUser));
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
                    <label>User Name: <input type="text" placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)}/></label>
                    <label>password: <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <p>Personal Information (required): </p>
                    <label>First Name: <input type="text" placeholder="Enter your First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></label>
                    <label>Last Name: <input type="text" placeholder="Enter your Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/></label>
                    <label>Email: <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>Bio: <input type="text" placeholder="Say something about yourself" value={bio} onChange={(e) => setBio(e.target.value)}/></label>
                    <label>Major: <input type="text" placeholder="Enter your major" value={major} onChange={(e) => setMajor(e.target.value)}/></label>
                    <label>Graduation Year: <input type="number" placeholder="Enter your graduation year" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)}/></label>
                    <label>Image URL: <input type="text" placeholder="Enter your image URL" value={profilePicture} onChange={(e) => setImage(e.target.value)}/></label>
                    <button disabled={!userName.trim() || !password.trim()} type="submit" style={{alignSelf: "center"}}>Sign Up</button>
                </form>
            </div>
        </main>
    )

}