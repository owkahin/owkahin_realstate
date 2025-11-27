import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthForm = ({ onLogin }: { onLogin: (user: any) => void }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        fullName: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (isLogin) {
                onLogin(data.user);
            } else {
                // Auto login after register or switch to login
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Owkahin Real Estate" className="h-16 w-16 object-contain" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Owkahin</h1>
                        <p className="text-sm text-gray-500">Real Estate</p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

            {error && (
                <div className={`p-3 rounded-xl mb-4 text-sm ${error.includes('successful') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                                required
                            />
                        </div>
                    </>
                )}

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
            </form>

            <p className="mt-6 text-center text-gray-500 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-black font-medium hover:underline"
                >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
            </p>
        </div>
    );
};
