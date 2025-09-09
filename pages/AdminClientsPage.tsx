import React, { useEffect, useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, UserPlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const mockClients = [
  { id: 'c1', name: 'Animesh Maji', email: 'animesh@example.com', phone: '+91 98765 43210' },
  { id: 'c2', name: 'A. K. Sharma', email: 'ak.sharma@example.com', phone: '+91 98765 11111' },
  { id: 'c3', name: 'Sunita Roy', email: 'sunita.roy@example.com', phone: '+91 98765 22222' },
];

const AdminClientsPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

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

     useEffect(() => {
        const highlightName = location.state?.highlight;
        if (highlightName) {
            const clientToHighlight = mockClients.find(c => c.name === highlightName);
            if (clientToHighlight) {
                setHighlightedId(clientToHighlight.id);
                const element = document.getElementById(clientToHighlight.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                const timer = setTimeout(() => setHighlightedId(null), 3000); // Highlight for 3 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [location.state]);

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
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4">Existing Clients</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-700/50 text-gray-300 uppercase tracking-wider">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockClients.map(client => (
                                    <tr 
                                        key={client.id}
                                        id={client.id}
                                        className={`border-b border-zinc-700 last:border-0 hover:bg-zinc-700/30 transition-colors duration-300 ${highlightedId === client.id ? 'bg-golden-yellow/20' : ''}`}
                                    >
                                        <td className="p-3 font-medium">{client.name}</td>
                                        <td className="p-3">{client.email}</td>
                                        <td className="p-3">{client.phone}</td>
                                        <td className="p-3 text-center">
                                            <button 
                                                onClick={() => alert(`Actions for ${client.name}`)}
                                                className="p-1.5 text-gray-400 hover:text-coral-red hover:bg-coral-red/10 rounded-full transition-colors"
                                                aria-label={`Actions for ${client.name}`}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminClientsPage;