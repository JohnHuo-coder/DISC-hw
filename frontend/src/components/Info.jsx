import{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/src/supabase-client";


export default function Info(){

    const [currentUser, setCurrentUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [major, setMajor] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [profilePicture, setImage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkLogin = async() => {
        const {data, error} = await supabase.auth.getUser();
        if (!data){
            navigate("/login")
        }
        setCurrentUser(data.user);
        }
        checkLogin();
    },[])


    const updateProfile= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`${API_URL}/api/myprofile/edit/${currentUser.id}`,{
            method: "PUT", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                major: major,
                graduationYear: graduationYear,
                profilePicture: profilePicture,
            })});
        const updatedProfile = await res.json();
        if (!res.ok){
            setError(updatedProfile.error || "update profile failed");
            return;
        }
        console.log("update successfully", updatedProfile);
        navigate("/myprofile");
    }catch(e){
        setError("Network error. Please try again later.");
    }
    };

    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={updateProfile} className="signup-form">
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <label>First Name: <input type="text" placeholder="Enter your First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></label>
                    <label>Last Name: <input type="text" placeholder="Enter your Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/></label>
                    <label>Bio: <input type="text" placeholder="Say something about yourself" value={bio} onChange={(e) => setBio(e.target.value)}/></label>
                    <label>Major: <input type="text" placeholder="Enter your major" value={major} onChange={(e) => setMajor(e.target.value)}/></label>
                    <label>Graduation Year: <input type="number" placeholder="Enter your graduation year" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)}/></label>
                    <label>Image URL: <input type="text" placeholder="Enter your image URL" value={profilePicture} onChange={(e) => setImage(e.target.value)}/></label>
                    <button type="submit" style={{alignSelf: "center"}}>confirm</button>
                </form>
            </div>
        </main>
    )
}