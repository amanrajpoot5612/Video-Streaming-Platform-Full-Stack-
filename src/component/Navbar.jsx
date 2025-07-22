import React from 'react'
import ProfileDropdown from './ProfileDropdown'
import { Bell as BellIcon,
    // Egg as EggIcon,
    Bug as BugIcon,
 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    
    const { user , logout}  = useAuth();

    return (
        <nav className='w-full h-16 bg-gray-700 flex justify-between space-x-4 textured-bg bg-home'>
            <div className="left flex space-x-4 items-center">
                <div id="logo" className='p-2'><BugIcon/></div>
                <div id="name" className='text-3xl font-bold text-[#aa6d90]'>
                    <Link to={'/'}>Bugsy</Link>
                    </div>
                <div className="menu">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to={'/trending'}>Trending</Link>
                        </li>
                        <li>
                            <Link to={'/music'}>Music</Link>
                        </li>
                    </ul>
                    </div>
            </div>
            <div className=" flex center items-center">
                <input type="text" placeholder="Search..." className="w-96 h-10 px-4 rounded-2xl border-[1px] border-amber-100" />
            </div>
            <div className="right flex space-x-4 items-center">
                <div className="alerts"><BellIcon></BellIcon></div>
                {user ? <ProfileDropdown /> : 
                    // <div>
                    <>
                        <Link to={'/register'}>
                            <h2 className='cursor-pointer'>Register</h2>
                        </Link>
                        <span>/</span>
                        <Link to={'/login'}>
                            <h2 className='pr-2'>Login</h2>
                        </Link>
                        </>
                    // </div>
                }
            </div>
        </nav>
    )
}

export default Navbar