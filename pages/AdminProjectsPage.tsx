import React, { useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const AdminProjectsPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
        if (!isAuthenticated) {
            navigate('/admin');
            return;
        }

        const role = localStorage.getItem('admin_role');
        const allowedRoles = ['Super Admin', 'Project Manager'];
        if (!role || !allowedRoles.includes(role)) {
            navigate('/admin/dashboard', { 
                state: { error: "You do not have permission to access the Project Management page." } 
            });
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-charcoal text-white">
            <header className="bg-zinc-800 p-4 flex items-center shadow-md">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2 text-sm bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-lg transition-colors mr-4"
                    aria-label="Back to Dashboard"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold text-golden-yellow">Manage Projects</h1>
            </header>
            <main className="p-4">
                <div className="bg-zinc-800 p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold">Project Management</h2>
                    <p className="text-gray-400 mt-2">This is where you will add new projects, update progress, and manage project timelines.</p>
                    <p className="text-gray-500 mt-4 text-sm">Feature coming soon.</p>
                </div>
            </main>
        </div>
    );
};

export default AdminProjectsPage;