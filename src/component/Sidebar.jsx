import React, { useState } from 'react'
import {
  Home as HomeIcon,
  History as HistoryIcon,
  ThumbsUp as ThumbsUpIcon,
  Clock as ClockIcon,
  Bell as BellIcon,
  Menu as MenuIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  HelpCircle as HelpCircleIcon,
  Hamburger as HamburgerIcon,
  Search as SearchIcon,
  Newspaper as NewspaperIcon,
  Heart as HeartIcon,
  Award as AwardIcon,
  Star as StarIcon,
  MonitorPlay as MonitorPlayIcon,
  VideoIcon,
  Handshake as HandshakeIcon,
  Info as InfoIcon
} from "lucide-react";
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const sideMenuItems = [
        { name: 'Home', link: '/', icon: <HomeIcon /> },
        { name: 'Movies', link: '/movies', icon: <MonitorPlayIcon /> },
        { name: 'News', link: '/news' ,icon : <NewspaperIcon /> },
        { name: 'Sports', link: '/sports', icon: <AwardIcon /> },
        // { name: 'Shorts and Clips', link: '/shorts', icon: <ThumbsUpIcon /> },
        { name: 'History', link: '/history', icon: <HistoryIcon /> },
        { name: 'Liked', link: '/liked' , icon: <HeartIcon /> },
        { name: 'Subscription', link: '/subscription', icon: <UserIcon /> },
        { name: 'Create', link: '/upload-video', icon: <VideoIcon /> },
        { name: 'Settings', link: '/settings' , icon: <SettingsIcon /> },
        { name: 'Connect with Me', link: '/help' , icon: <HandshakeIcon /> },   
        { name: 'Know more', link: '/showcase' , icon: <InfoIcon /> },   
    ]

    const [menuToggle, setMenuToggle] = useState(true)

    const [hoverIndex, setHoverIndex] = useState(null);
    const [hover, setHover] = useState(false);

    const [menuClick , setMenuClick] = useState('/home');

  return (
        <div className={clsx("sidebar textured-bg bg-sidebar text-white p-4 z-20 h-[calc(100vh-4rem)] transition-all duration-300 overflow-hidden scrollbar-hide hover:overflow-y-auto",
            menuToggle ? 'w-48' : 'w-16',
            // "transition-all duration-300 ease-in-out",
        )}>
            <h2 className={clsx("text-xl font-bold mb-4 flex flex-col items-end hover:cursor-pointer",
                hover? 'bg-navbar' : ''
            )}
                
                >
                <MenuIcon
                
                onClick = {() => setMenuToggle((prev) => !prev)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                ></MenuIcon>
            </h2>
            <ul>
            {sideMenuItems.map((item, index) => {
                return (
                    <li key={index} className="sidebar-item">
                        <Link to={item.link}>
                        <div className={clsx('sidebar-items flex items-center space-x-2 p-2 pt-3 pb-3 rounded-lg cursor-pointer'
                            , hoverIndex === index  ? 'bg-navbar' : ''
                        )}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            >
                            <span style={{ fontFamily: 'Raleway, sans-serif' }}>{item.icon}</span>
                            {
                                menuToggle ? <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.name}</span> : ''
                            }
                        </div>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </div>
  )
}

export default Sidebar