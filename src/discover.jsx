import { useEffect, useState} from "react";
import {Link} from 'react-router-dom';
 

export default function Discover(){
    const [profiles, setProfiles] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [searchedID, setSearched] = useState(null);
    const [inputID, setInputID] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
       const getAllUsers= async() => {
        setLoading(true);
        try{
            const res = await fetch('https://disc-assignment-5-users-api-iyct.onrender.com/api/users');
            const data = await res.json();
            setProfiles(data);
        }catch(e){
            console.error("error getting products", e);
        }finally{
          setLoading(false);
        }
       }
       getAllUsers();
    },[])

    useEffect(() => {
      if (!searchedID) return;
      const getUserByID = async() => {
        setLoading(true);
        try{
          const res = await fetch(`https://disc-assignment-5-users-api-iyct.onrender.com/api/users/${searchedID}`);
          const data = await res.json();
          if (!data || !data.id) {
            alert("User not found!");
            setProfiles([]); 
            return;
          }
          setProfiles([data]);
        }catch(e){
          console.log(`error getting user with id: ${searchedID}`);
        }finally{
          setLoading(false);
        }
      }
      getUserByID();
    },[searchedID])

    useEffect(() => {
    document.body.style.backgroundColor = darkMode? "#4E2A84" : "#836EAA";
    document.body.style.color = darkMode ? 'white' : 'black';
    },[darkMode]) 

    if (loading) return <div style={{textAlign: "center"}}><h1>we are loading!!!</h1></div>

    return (
    <main className="discover-main">
        <div style={{position: 'fixed', left: 0, top: "3vw", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <button style={{margin: 10, backgroundColor: darkMode ? 'grey' : 'lightgrey', color: darkMode ? 'white' : 'black'}}
          onClick={() => {setDarkMode(!darkMode)}}>Dark Mode</button>
        </div>
        <div style={{marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
          <input style={{width: "50%", height: "2rem", padding: 5, backgroundColor: "white", color: 'black', borderRadius: "5px"}} type="text" placeholder="Enter user ID" value={inputID} onChange={(e) => setInputID(e.target.value)}/>
          <button style={{margin: 10, backgroundColor: "white", color: 'black'}} onClick={() => {setSearched(inputID)}}>Search</button>
        </div>
        <div style={{width: "100%", gap: 50, display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}}>
        {profiles.map((profile) => {
          return(
          <div key= {profile.id} className = 'Profile-card'>
            <img src={profile.profilePicture} alt="picture" />
            <h3>{profile.firstName} {profile.lastName}</h3>
            <span>{profile.email}</span>
            <span>{profile.major}</span>
            <span>{profile.graduationYear}</span>
            <p>{profile.bio}</p>
            <Link to={`/discover/${profile.id}`}>details</Link>
          </div>)
        })}
        </div>
    </main> )
}