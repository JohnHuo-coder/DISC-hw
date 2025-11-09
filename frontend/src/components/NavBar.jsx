import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <div><Link to='/'>Home</Link></div>
      <div><Link to='/discover'>Discover</Link></div>
      <div><Link to='/friends'>Friends</Link></div>
      <div><Link to='/groups'>Groups</Link></div>
      <div><Link to='/myprofile'>My profile</Link></div>
      <div><Link to='/settings'>Settings</Link></div>
      <div><Link to='/login'>Log In</Link></div>
    </nav>
  );
}
