import React from 'react';

interface ProfileStatsProps {
    followers: number;
    following: number;
    posts?: number;
}

export const ProfileStats = ({ followers, following, posts = 0 }: ProfileStatsProps) => {
    return (
        <div className="flex justify-center gap-8 py-4 border-y border-gray-100 my-4 md:gap-4 md:justify-around">
            <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{posts}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Posts</div>
            </div>
            <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{followers}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Followers</div>
            </div>
            <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{following}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Following</div>
            </div>
        </div>
    );
};
