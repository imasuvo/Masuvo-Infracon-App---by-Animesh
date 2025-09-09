import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import ErrorDisplay from '../components/ErrorDisplay';

const ClientPortalLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Simulate API call delay
        setTimeout(() => {
            if (username === 'name' && password === 'password') {
                login();
                navigate('/portal');
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
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
        >
            <div className="p-4 flex-grow flex flex-col justify-center">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-golden-yellow">Client Portal Login</h2>
                    <p className="text-gray-300">Access your project dashboard.</p>
                </div>

                {error && <div className="mb-4"><ErrorDisplay title="Login Failed" message={error} /></div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username-input" className="sr-only">Username</label>
                        <input
                            id="username-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password-input" className="sr-only">Password</label>
                        <input
                            id="password-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner size="sm" className="mr-2 text-charcoal" />
                                <span>Logging In...</span>
                            </>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>
                </form>
                 <div className="text-center mt-6">
                    <ReactRouterDOM.Link to="/" className="text-sm text-gray-400 hover:text-golden-yellow hover:underline transition-colors">
                        ← Back to Home
                    </ReactRouterDOM.Link>
                </div>
                <div className="text-center mt-8 pt-4 border-t border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                        Are you an administrator?{' '}
                        <ReactRouterDOM.Link to="/admin" className="font-semibold text-zinc-400 hover:text-golden-yellow hover:underline transition-colors">
                            Sign in here.
                        </ReactRouterDOM.Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ClientPortalLoginPage;