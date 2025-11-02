import { useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Discover from './discover.jsx';
import UserProfile from './userprofile.jsx';
import LogIn from './login.jsx';

function App() {
  return(
  <Router>
    <nav className='navbar'>
      <div><Link to='/'>Home</Link></div>
      <div><Link to='/discover'>Discover</Link></div>
      <div><Link to='/friends'>Friends</Link></div>
      <div><Link to='/groups'>Groups</Link></div>
      <div><Link to='/myprofile'>My profile</Link></div>
      <div><Link to='/settings'>Settings</Link></div>
      <div><Link to='/login'>Log In</Link></div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path="/discover">
        <Route index element={<Discover />} />  
        <Route path=":id" element={<UserProfile />} /> 
      </Route>
      <Route path='/friends' element={<Friends />}/>
      <Route path='/groups' element={<Groups />}/>
      <Route path='/myprofile' element={<MyProfile />}/>
      <Route path='/settings' element={<Settings />}/>
      <Route path='/login' element={<LogIn />}/>
    </Routes>
  </Router>)
}

export default App

function Home() {
  return <h1>Home Page</h1>;
}
function Friends() {
  return <h1>Friends Page</h1>;
}
function Groups() {
  return <h1>Groups Page</h1>;
}
function MyProfile() {
  return <h1>My Profile Page</h1>;
}
function Settings() {
  return <h1>Settings Page</h1>;
}