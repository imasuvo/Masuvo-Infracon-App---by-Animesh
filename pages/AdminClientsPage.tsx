import React, { useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, UserPlusIcon } from '@heroicons/react/24/solid';

const AdminClientsPage: React.FC = () => {
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
                state: { error: "You do not have permission to access the Client Management page." } 
            });
        }
    }, [navigate]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('This is a placeholder form. No client will be created.');
    }

    return (
        <div className="min-h-screen bg-charcoal text-white">
            <header className="bg-zinc-800 p-4 flex items-center shadow-md sticky top-0 z-10">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2 text-sm bg-zinc-700 hover:bg-zinc-600 px-3 py-2 rounded-lg transition-colors mr-4"
                    aria-label="Back to Dashboard"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold text-golden-yellow">Manage Clients</h1>
            </header>
            <main className="p-4 space-y-6">
                {/* Create New Client Form */}
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4 flex items-center gap-2">
                        <UserPlusIcon className="h-5 w-5" />
                        Create New Client
                    </h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="clientName" className="block text-sm font-medium text-gray-300 mb-1">Client Name</label>
                            <input type="text" id="clientName" name="clientName" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., Animesh Maji" required />
                        </div>
                        <div>
                            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input type="email" id="clientEmail" name="clientEmail" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., client@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                            <input type="tel" id="clientPhone" name="clientPhone" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., +91 98765 43210" required />
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                                Save Client
                            </button>
                        </div>
                    </form>
                </section>

                {/* Existing Clients List */}
                <section className="bg-zinc-800 p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold">Existing Clients</h2>
                    <p className="text-gray-400 mt-2">A list of all clients will appear here.</p>
                    <p className="text-gray-500 mt-4 text-sm">Feature coming soon.</p>
                </section>
            </main>
        </div>
    );
};

export default AdminClientsPage;