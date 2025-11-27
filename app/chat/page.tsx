'use client';

import React, { useState, useEffect } from 'react';
import { BottomNav } from '@/components/ui/BottomNav';
import { ChatList } from '@/components/chat/ChatList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { AuthForm } from '@/components/auth/AuthForm';

import { ContactRequestList } from '@/components/chat/ContactRequestList';

export default function ChatPage() {
    const [user, setUser] = useState<any>(null);
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (user) {
            fetchConversations();
        }
    }, [user]);

    const checkAuth = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    };

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/messages/conversations');
            if (res.ok) {
                const data = await res.json();
                setConversations(data);
            }
        } catch (error) {
            console.error('Failed to fetch conversations', error);
        }
    };

    const handleLogin = (userData: any) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-white pb-20 relative max-w-md mx-auto shadow-2xl overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Messages</h1>
                    <p className="text-gray-500 mb-8">Login to chat with agents and owners.</p>
                    <AuthForm onLogin={handleLogin} />
                </div>
                <BottomNav />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pb-20 relative max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 pb-2 border-b border-gray-100 bg-white z-10">
                <h1 className="text-2xl font-bold mb-4">Messages</h1>
                <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                        onClick={() => setActiveTab('chats')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'chats' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
                            }`}
                    >
                        Chats
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'requests' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
                            }`}
                    >
                        Requests
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === 'chats' ? (
                    <ChatList
                        conversations={conversations}
                        onSelectUser={setSelectedUser}
                    />
                ) : (
                    <div className="p-4">
                        <ContactRequestList
                            currentUser={user}
                            onRequestProcessed={fetchConversations}
                        />
                    </div>
                )}
            </div>

            {selectedUser && (
                <ChatWindow
                    currentUser={user}
                    recipient={selectedUser}
                    onBack={() => {
                        setSelectedUser(null);
                        fetchConversations(); // Refresh list on back
                    }}
                />
            )}

            <BottomNav />
        </main>
    );
}
