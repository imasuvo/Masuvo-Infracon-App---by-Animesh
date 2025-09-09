import React, { useState, useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import Spinner from '../components/Spinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { KeyIcon, UserIcon } from '@heroicons/react/24/solid';

const AdminPanelPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
        // If already logged in, redirect to dashboard
        if (localStorage.getItem('admin_auth') === 'true') {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Simulate API call with role-based credentials
        setTimeout(() => {
            let role: string | null = null;
            if (username.toLowerCase() === 'superadmin' && password === 'password') {
                role = 'Super Admin';
            } else if (username.toLowerCase() === 'manager' && password === 'password') {
                role = 'Project Manager';
            } else if (username.toLowerCase() === 'editor' && password === 'password') {
                role = 'Content Editor';
            }

            if (role) {
                localStorage.setItem('admin_auth', 'true');
                localStorage.setItem('admin_role', role);
                navigate('/admin/dashboard');
            } else {
                setError('Invalid username or password. Please try again.');
                setIsSubmitting(false);
            }
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-charcoal p-4"
        >
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                     <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Masuvo Infracon Logo" className="w-24 h-24 mx-auto mb-4 rounded-full" />
                    <h1 className="text-3xl font-bold text-golden-yellow">Admin Panel</h1>
                    <p className="text-gray-400">Please sign in to continue</p>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-zinc-800 p-8 rounded-2xl shadow-2xl shadow-golden-yellow/10"
                >
                    {error && (
                        <div className="mb-4">
                            <ErrorDisplay title="Login Failed" message={error} />
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username-input" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <div className="relative">
                                <UserIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                                <input
                                    id="username-input"
                                    type="text"
                                    placeholder="e.g., superadmin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                             <div className="relative">
                                <KeyIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"/>
                                <input
                                    id="password-input"
                                    type="password"
                                    placeholder="e.g., password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3 pl-10 focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition"
                                    required
                                    autoComplete="current-password"
                                />
                             </div>
                        </div>
                        <p className="text-xs text-zinc-500 text-center !-mt-2">
                            Use: <code className="bg-zinc-900 px-1 rounded">superadmin</code>, <code className="bg-zinc-900 px-1 rounded">manager</code>, or <code className="bg-zinc-900 px-1 rounded">editor</code><br/>
                            Password is <code className="bg-zinc-900 px-1 rounded">password</code> for all accounts.
                        </p>
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner size="sm" className="mr-2 text-charcoal" />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </form>
                </motion.div>

                <div className="text-center mt-6">
                    <ReactRouterDOM.Link to="/" className="text-sm text-gray-400 hover:text-golden-yellow hover:underline transition-colors">
                        ← Back to Home
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminPanelPage;