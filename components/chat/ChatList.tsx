import React from 'react';
import { User } from 'lucide-react';

interface ChatListProps {
    conversations: any[];
    onSelectUser: (user: any) => void;
}

export const ChatList = ({ conversations, onSelectUser }: ChatListProps) => {
    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    No conversations yet. Start chatting from the Explore page!
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {conversations.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => onSelectUser(user)}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {user.profilePic ? (
                                    <img src={user.profilePic} alt={user.username} className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-6 w-6 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 truncate">{user.fullName}</h4>
                                <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
