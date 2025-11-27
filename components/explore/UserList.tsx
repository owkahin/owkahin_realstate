import React from 'react';
import { UserCard } from './UserCard';

interface UserListProps {
    users: any[];
    currentUser: any;
    onFollow: (userId: string) => void;
    onUnfollow: (userId: string) => void;
}

export const UserList = ({ users, currentUser, onFollow, onUnfollow }: UserListProps) => {
    return (
        <div className="space-y-3">
            {users.map((user) => {
                const isFollowing = currentUser?.following?.includes(user._id);
                return (
                    <UserCard
                        key={user._id}
                        user={user}
                        isFollowing={isFollowing}
                        onFollow={() => onFollow(user._id)}
                        onUnfollow={() => onUnfollow(user._id)}
                    />
                );
            })}
        </div>
    );
};
