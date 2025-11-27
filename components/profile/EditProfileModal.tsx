import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EditProfileModalProps {
    user: any;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
}

export const EditProfileModal = ({ user, isOpen, onClose, onSave }: EditProfileModalProps) => {
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        bio: user.bio || '',
        profilePic: user.profilePic || '',
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    if (!isOpen) return null;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please upload an image file' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setMessage({ type: 'error', text: 'File size should be less than 5MB' });
            return;
        }

        setUploading(true);
        setMessage(null);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const json = await res.json();
            if (res.ok && json.url) {
                setFormData(prev => ({ ...prev, profilePic: json.url }));
                setMessage({ type: 'success', text: 'Image uploaded successfully' });
            } else {
                throw new Error(json.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setMessage({ type: 'error', text: 'Failed to upload image. Please try again.' });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold">Edit Profile</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {message && (
                        <div className={`p-3 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none h-24"
                            maxLength={160}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                {formData.profilePic ? (
                                    <img
                                        src={formData.profilePic}
                                        alt="Preview"
                                        className="h-16 w-16 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <span className="text-xs">No Img</span>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full transition-colors">
                                        <span>{uploading ? 'Uploading...' : 'Choose Image'}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG, GIF.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : (loading ? 'Saving...' : 'Save Changes')}
                    </button>
                </form>
            </div>
        </div>
    );
};
