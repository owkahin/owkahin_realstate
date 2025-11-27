import Link from 'next/link';
import { Home, Search, MessageSquare, User, PlusCircle } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo.png" alt="Owkahin Real Estate" className="h-10 w-10 object-contain" />
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-gray-900">Owkahin</h1>
                                <p className="text-xs text-gray-500">Real Estate</p>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <Home className="w-5 h-5 mr-2" />
                            <span className="font-medium">Home</span>
                        </Link>
                        <Link href="/explore" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <Search className="w-5 h-5 mr-2" />
                            <span className="font-medium">Explore</span>
                        </Link>
                        <Link href="/messages" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            <span className="font-medium">Messages</span>
                        </Link>
                        <Link href="/profile" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <User className="w-5 h-5 mr-2" />
                            <span className="font-medium">Profile</span>
                        </Link>
                        <Link href="/add-property" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                            <PlusCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Add Property</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
