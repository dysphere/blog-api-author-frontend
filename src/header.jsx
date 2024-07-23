import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, Navigate } from "react-router-dom";
import { Container } from '@mantine/core';

const links = [
    {link: '/blog', label: 'Posts'},
    {link: '/signup', label: 'Sign Up'},
    {link: '/login', label: 'Log In'}
];

export const Header = () => {
    const {user, removeToken} = useContext(UserContext);

    const items = links.map((link) => (
        <div key={link.label} >
        <Link
          to={link.link}>
            <button className="px-2 md:px-10 py-1 rounded-full bg-blue-800">
          {link.label}
          </button>
        </Link>
        </div>
      ));

    function userLogout() {
        removeToken();
        <Navigate to="/blog" replace={true}/>
    }

    return (<header>
        <Container fluid className="flex flex-row justify-between py-4 bg-blue-200 text-white pb-3">
            <div className="text-blue-800 font-bold text-2xl">
                <Link to="/blog">Home</Link>
            </div>
            {user ? <div className="flex flex-row justify-evenly gap-x-4 md:gap-x-10 md:pr-10">
                <Link to="/blog">
                <button className="px-4 md:px-10 py-1 rounded-full bg-blue-800">Posts</button></Link>
                <Link to="/new"><button className="px-4 md:px-10 py-1 rounded-full bg-blue-800">New Post</button></Link>
                <button type="button" className="px-4 md:px-10 py-1 rounded-full bg-blue-800" onClick={userLogout}>Log Out</button>
                </div>  :        
                <div className="flex flex-row justify-evenly gap-x-4 md:gap-x-10 md:pr-10 pb-1">{items}</div>}
        </Container>
    </header>);
}