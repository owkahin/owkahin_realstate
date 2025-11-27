import React from 'react';
import { User as UserIcon, Settings, LogOut, Camera } from 'lucide-react';

interface ProfileHeaderProps {
    user: any;
    isOwnProfile: boolean;
    onEdit: () => void;
    onLogout: () => void;
}

export const ProfileHeader = ({ user, isOwnProfile, onEdit, onLogout }: ProfileHeaderProps) => {
    return (
        <div className="flex flex-col items-center pt-6 pb-4">
            <div className="relative mb-4 group">
                <div
                    className={`h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg relative ${isOwnProfile ? 'cursor-pointer' : ''}`}
                    onClick={isOwnProfile ? onEdit : undefined}
                >
                    {user.profilePic ? (
                        <img src={user.profilePic} alt={user.username} className="h-full w-full object-cover" />
                    ) : (
                        <UserIcon className="h-12 w-12 text-gray-400" />
                    )}

                    {isOwnProfile && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Camera className="h-8 w-8 text-white/80" />
                        </div>
                    )}
                </div>

                {isOwnProfile && (
                    <button
                        onClick={onEdit}
                        className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-10"
                        title="Edit Profile"
                    >
                        <Settings className="h-4 w-4" />
                    </button>
                )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
            <p className="text-gray-500">@{user.username}</p>

            {user.bio && (
                <p className="mt-2 text-center text-gray-600 max-w-xs px-4">
                    {user.bio}
                </p>
            )}

            {isOwnProfile && (
                <button
                    onClick={onLogout}
                    className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            )}
        </div>
    );
};
