import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Profile({src, name, school, major, bio, added, handleAdd}) {
  const bgColor = added? 'green':'grey';
  return(
    <div className = 'Profile-card'>
      <img src={src} className="people" alt="picture" />
      <h3>{name}</h3>
      <span>{school}</span>
      <span>{major}</span>
      <p>{bio}</p>
      <button style={{backgroundColor: bgColor}} onClick={handleAdd}>add</button>
    </div>
  )
}

const PROFILES = [
  {
    src: 'https://media.istockphoto.com/id/1438185814/photo/college-student-asian-man-and-studying-on-laptop-at-campus-research-and-education-test-exam.jpg?s=612x612&w=0&k=20&c=YmnXshbaBxyRc4Nj43_hLdLD5FLPTbP0p_3-uC7sjik=',
    name: 'John',
    school: "Weinberg",
    major: 'DS',
    bio: "Hi, I'm John. Nice to meet you. Feel free to reach out!",
    added: false
  },
  {
    src: 'https://www.shutterstock.com/image-photo/european-man-college-student-holding-600nw-2330237273.jpg',
    name: 'Justin',
    school: "SESP",
    major: 'political Science',
    bio: "Hi, I'm Justin. Nice to meet you. Feel free to reach out!",
    added: false
  },
  {
    src:'https://www.shutterstock.com/image-photo/young-adolescent-university-student-boy-600nw-2473697481.jpg',
    name: 'Anthony',
    school: "McCormick",
    major: 'Industrial Engineering',
    bio: "Hi, I'm Anthony. Nice to meet you. Feel free to reach out!",
    added: false

  },
  {
    src:'https://as2.ftcdn.net/jpg/05/76/75/39/1000_F_576753965_UPYWF1GHjZuQfQo0Qupv776ubn5uWaiJ.jpg',
    name: 'Richy',
    school: "Communication",
    major: 'Media',
    bio: "Hi, I'm Richy. Nice to meet you. Feel free to reach out!",
    added: false
  }
]

function App() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [darkMode, setDarkMode] = useState(false);

  const handleAdd = (index) => {
    const newProfiles=[...profiles];
    newProfiles[index].added = !newProfiles[index].added
    setProfiles(newProfiles)
  }

  useEffect(() => {
    document.body.style.backgroundColor = darkMode? "#4E2A84" : "#836EAA";
    document.body.style.color = darkMode ? 'white' : 'black';
  },[darkMode])

  return (
    <body style={{backgroundColor:"#836EAA", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <nav className='navbar'>
        <div>discover</div>
        <div>chat</div>
        <div>friends</div>
        <div>groups</div>
        <div>my profile</div>
        <div>settings</div>
      </nav>
      <div style={{position: 'fixed', left: 0, top: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
        <button 
        style={{margin: 10, backgroundColor: darkMode ? 'grey' : 'lightgrey', color: darkMode ? 'white' : 'black'}}
        onClick={() => {setDarkMode(!darkMode)}}
        >
          Dark Mode
        </button>
      </div>
      <div style={{width: "100%", gap: 20, display: "flex", flexDirection: "row"}}>
        {profiles.map((profile,index) => {
          return(
          <Profile src={profile.src}
          name={profile.name} 
          school={profile.school} 
          major={profile.major} 
          bio={profile.bio} 
          added={profile.added} 
          handleAdd={()=>{handleAdd(index)}}/>)
        })}
      </div>
    </body>
  )
}

export default App
