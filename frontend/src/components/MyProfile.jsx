import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login"); 
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setCurrentUser(parsedUser);

    const fetchUser = async() => {
      setLoading(true);
      try{
        const res = await fetch(`${API_URL}/api/users/${parsedUser.id}`)
        const data = await res.json();
        setCurrentUser(data);
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
        <img src={currentUser.profilePicture} alt="picture" style={{ width: "100%", maxWidth: "250px", height: "auto", borderRadius: "10px"}}/>
        <h3>{currentUser.firstName} {currentUser.lastName}</h3>
        <span>{currentUser.email}</span>
        <span>{currentUser.major}</span>
        <span>{currentUser.graduationYear}</span>
        <p>{currentUser.bio}</p>
      </div>
    </main>
  )
}