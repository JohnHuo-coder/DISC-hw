import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../backend/src/supabase-client";

export default function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
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


    const fetchUser = async() => {
      setLoading(true);
      try{
        const res = await fetch(`${API_URL}/api/myprofile/${currentUser.id}`)
        const data = await res.json();
        setUserProfile(data);
      }catch(e){
        console.log("Error fetching user:", e);
      }finally{
      setLoading(false);
      }
    }
    fetchUser();
  }, [])

  if (loading) return <div style={{textAlign: "center"}}><h1>we are loading!!!</h1></div>


  return(
    <main className = "userprofile-main">
      <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
        <img src={userProfile.profilePicture} alt="picture" style={{ width: "100%", maxWidth: "250px", height: "auto", borderRadius: "10px"}}/>
        <h3>{userProfile.firstName || "no first name provided"} {userProfile.lastName || "no last name provided"}</h3>
        <span>{userProfile.email}</span>
        <span>{userProfile.major || "no major provided"}</span>
        <span>{userProfile.graduationYear || "no graduation year provided"}</span>
        <p>{userProfile.bio || "say something about yourself!"}</p>
        <Link to={`/discover/edit`}>Edit my profile</Link>
      </div>
    </main>
  )
}