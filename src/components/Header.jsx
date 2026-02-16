import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../pages/services/supabase'
import { useNavigate } from 'react-router-dom';

const Header = ({ session }) => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        if (confirm("Are you sure you want to logout?")) {
            await supabase.auth.signOut();
            navigate('/login');            
        }
    }
    return (
        <>
            <nav className="flex justify-between mb-6 bg-white p-4 rounded-xl shadow items-center">
                <Link className="text-xl font-bold cursor-pointer" to={"/"}>Home</Link>
                <div className="space-x-4">
                    {!session && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    {session && (
                        <>
                            <Link to="/create-article">Create Article</Link>
                            <button className='text-red-600 cursor-pointer' onClick={logoutHandler}>Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Header