import React from 'react';
import { User, UserPlus, UserMinus, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface UserCardProps {
    user: any;
    isFollowing: boolean;
    onFollow: () => void;
    onUnfollow: () => void;
}

export const UserCard = ({ user, isFollowing, onFollow, onUnfollow }: UserCardProps) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user.profilePic ? (
                        <img src={user.profilePic} alt={user.username} className="h-full w-full object-cover" />
                    ) : (
                        <User className="h-6 w-6 text-gray-400" />
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{user.fullName}</h4>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Link href={`/chat`} className="p-2 text-gray-400 hover:text-black transition-colors">
                    <MessageCircle className="h-5 w-5" />
                </Link>
                <button
                    onClick={isFollowing ? onUnfollow : onFollow}
                    className={`p-2 rounded-full transition-colors ${isFollowing
                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                >
                    {isFollowing ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
};
