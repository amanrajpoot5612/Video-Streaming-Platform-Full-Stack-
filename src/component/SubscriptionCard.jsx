    import React, { useState } from 'react'
    import { MoreVertical as MoreVerticalIcon } from "lucide-react";
    // import subscriptions from '../../context/SubscriptionData';


    const SubscriptionCard = ({ avatar, channelName, onUnsubscribe }) => {

    const [showMenu, setShowMenu] = useState(false);
        // const { avatar, channelName, onUnsubscribe } = subscription;

    return (
        <div className="flex items-center justify-between w-full max-w-2xl px-4 py-3 bg-white textured-bg bg-navbar border rounded-lg shadow-sm hover:shadow-md transition">
        
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
            <img
            src={avatar}
            alt={channelName}
            className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-md font-medium text-gray-800 dark:text-white">
            {channelName}
            </span>
        </div>

        {/* 3-dots Menu */}
        <div className="relative">
            <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-4 bg-sidebar rounded-full hover:bg-neutral-900  transition cursor-pointer"
            >
                Unsubscribe
            </button>
        
        </div>
        </div>
    );
    }

    export default SubscriptionCard