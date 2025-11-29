import { useEffect, useState} from "react";
import {Link} from 'react-router-dom';
 

export default function Discover(){
    const [profiles, setProfiles] = useState([]);
    const [searchedID, setSearched] = useState(null);
    const [inputID, setInputID] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;



    useEffect(() => {
       const getAllUsers= async() => {
        setLoading(true);
        try{
            const res = await fetch(`${API_URL}/api/users`);
            const data = await res.json();
            if (!res.ok){
              console.error("fail loading users",data.error);
              throw new Error(data.error || 'fail loading users');
            }
            setProfiles(data);
        }catch(e){
            console.error("error getting users", e);
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
          const res = await fetch(`${API_URL}/api/users/${searchedID}`);
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

    if (loading) return <div style={{textAlign: "center"}}><h1>we are loading!!!</h1></div>

    return (
    <main className="discover-main">
        {/* <div style={{marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
          <input style={{width: "50%", height: "2rem", padding: 5, backgroundColor: "white", color: 'black', borderRadius: "5px"}} type="text" placeholder="Enter user ID" value={inputID} onChange={(e) => setInputID(e.target.value)}/>
          <button style={{margin: 10, backgroundColor: "white", color: 'black'}} onClick={() => {setSearched(inputID)}}>Search</button>
        </div> */}
        <div className="d-flex justify-content-center mb-5" style={{ width: "100%" }}>
          <form className="d-flex" role="search" style={{ width: "100%", maxWidth: "700px" }} onSubmit={(e) => {e.preventDefault(); setSearched(inputID)}}>
            <input className="form-control me-2" type="search" aria-label="Search" placeholder="Enter user ID" value={inputID} onChange={(e) => setInputID(e.target.value)}/>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
        <div className = "d-flex flex-wrap justify-content-center gap-5">
          {/* style={{width: "100%", gap: 50, display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center'}} */}
        {profiles.map((profile) => {
          return(
          // <div key= {profile.id} className = 'Profile-card'>
          //   <img src={profile.profile_picture} alt="no picture provided" />
          //   <h3>{profile.first_name || "no first name provided"} {profile.last_name || "no last name provided"}</h3>
          //   <span>{profile.email}</span>
          //   <span>{profile.major || "not available"}</span>
          //   <span>{profile.graduation_year || "not available"}</span>
          //   <p>{profile.bio || "The user hasn't say anything"}</p>
          //   <Link to={`/discover/${profile.id}`}>details</Link>
          // </div>
          <div className="card rounded-4" style={{width: "18rem"}} key= {profile.id}>
            <img src={profile.profile_picture} className="card-img-top rounded-top-4" alt="no picture provided" />
            <div className="card-body p-2">
              <h5 className="card-title">{profile.first_name || "no first name provided"} {profile.last_name || "no last name provided"}</h5>
              <p className="card-text">{profile.email}</p>
              <p className="card-text">{profile.major || "not available"}</p>
              <p className="card-text">{profile.graduation_year || "not available"}</p>
              <p className="card-text">{profile.bio || "The user hasn't say anything"}</p>
              <Link className="btn btn-primary" to={`/discover/${profile.id}`}>details</Link>
            </div>
          </div>
          )
        })}
        </div>
    </main> )
}