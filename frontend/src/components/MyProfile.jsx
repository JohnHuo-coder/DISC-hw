import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function MyProfile() {
  const [pageLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const { user, loading } = useAuth();
  useEffect(() => {
      if (!loading && !user) {
          navigate('/login', { replace: true });
      }
  }, [user, loading]);

  useEffect(() => {
    const fetchUser = async() => {
      setLoading(true);
      try{
        const res = await fetch(`${API_URL}/api/myprofile/`, {credentials: "include"})
        const data = await res.json();
         if (!res.ok){
          console.log("error fetching user profile, may due to internet error or not authenticated", data.error)
          throw new Error(data.error || 'fail fetching user');
        }
        setUserProfile(data);
      }catch(e){
        console.log("Error fetching user:", e);
      }finally{
      setLoading(false);
      }
    }
    fetchUser();
  }, [user])

  if (pageLoading) return (<div style={{textAlign: "center"}}><h1>we are loading!!!</h1></div>)


  return(
    <main className="userprofile-main d-flex justify-content-center align-items-center pt-5">
      <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
        <img src={userProfile.profile_picture} alt="picture" style={{ width: "100%", maxWidth: "250px", height: "auto", padding: "15px", borderRadius: "25px"}}/>
        <h3>{userProfile.first_name || "no first name provided"} {userProfile.last_name || "no last name provided"}</h3>
        <span>{userProfile.email}</span>
        <span>{userProfile.major || "no major provided"}</span>
        <span>{userProfile.graduation_year || "no graduation year provided"}</span>
        <p>{userProfile.bio || "say something about yourself!"}</p>
        <Link to="/myprofile/edit" className="btn btn-primary mt-3 px-5">Edit my profile</Link>
      </div>
    </main>
  )
}