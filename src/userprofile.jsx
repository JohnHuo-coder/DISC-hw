import {useParams} from "react-router-dom";
import{useEffect, useState} from "react";

export default function UserProfile(){
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [detailedProfile, setDetailedProfile] = useState({});
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchUser = async() => {
            setLoading(true);
            try{
                const res = await fetch(`https://disc-assignment-5-users-api-iyct.onrender.com/api/users/${id}`);
                const data = await res.json();
                if (!data || !data.id) {
                    alert("User not found!");
                    return;
                }
            setDetailedProfile(data);
            }catch(e){
            console.log(`error getting user details with id: ${id}`);
            }finally{
            setLoading(false);
            }
        }
        fetchUser();
    },[])
    
    if (loading) return <div style={{textAlign: "center"}}><h1>we are loading!!!</h1></div>

    return(
        <main className = "userprofile-main">
            <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
                <img src={detailedProfile.profilePicture} alt="picture" style={{ width: "100%", maxWidth: "250px", height: "auto", borderRadius: "10px"}}/>
                <h3>{detailedProfile.firstName} {detailedProfile.lastName}</h3>
                <span>{detailedProfile.email}</span>
                <span>{detailedProfile.major}</span>
                <span>{detailedProfile.graduationYear}</span>
                <p>{detailedProfile.bio}</p>
                <button style={{backgroundColor: added? "green" : "grey"}} onClick={() => setAdded(!added)}>{added? "✔":"add"}</button>
            </div>
        </main>
    )

    }

