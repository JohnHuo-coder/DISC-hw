import{useEffect, useState} from "react";

export default function LogIn(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [major, setMajor] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [profilePicture, setImage] = useState("");

    
    const createUser= async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch("https://disc-assignment-5-users-api-iyct.onrender.com/api/users/signup",{
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                bio: bio,
                major: major,
                graduationYear: graduationYear,
                profilePicture: profilePicture,
            })});
        const createdUser = await res.json();
        console.log(createdUser);
    }catch(e){
        console.log("error creating user")
    }
    };

    return(
        <main className="login-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <form onSubmit={createUser} className="signup-form">
                    <label>First Name: <input type="text" placeholder="Enter your First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/></label>
                    <label>Last Name: <input type="text" placeholder="Enter your Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/></label>
                    <label>Email: <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                    <label>Bio: <input type="text" placeholder="Say something about yourself" value={bio} onChange={(e) => setBio(e.target.value)}/></label>
                    <label>Major: <input type="text" placeholder="Enter your major" value={major} onChange={(e) => setMajor(e.target.value)}/></label>
                    <label>Graduation Year: <input type="number" placeholder="Enter your graduation year" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)}/></label>
                    <label>Image URL: <input type="text" placeholder="Enter your image URL" value={profilePicture} onChange={(e) => setImage(e.target.value)}/></label>
                    <button type="submit" style={{alignSelf: "center"}}>Sign Up</button>
                </form>
            </div>
        </main>
    )

}