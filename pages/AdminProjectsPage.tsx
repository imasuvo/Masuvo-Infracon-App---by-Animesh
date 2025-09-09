import React, { useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, DocumentPlusIcon } from '@heroicons/react/24/solid';

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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('This is a placeholder form. No project will be created.');
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
                <h1 className="text-xl font-bold text-golden-yellow">Manage Projects</h1>
            </header>
            <main className="p-4 space-y-6">
                 {/* Create New Project Form */}
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4 flex items-center gap-2">
                        <DocumentPlusIcon className="h-5 w-5" />
                        Create New Project
                    </h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                                <input type="text" id="projectName" name="projectName" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., 4BHK Duplex at Bidhan Nagar" required />
                            </div>
                            <div>
                                <label htmlFor="client" className="block text-sm font-medium text-gray-300 mb-1">Assign to Client</label>
                                <select id="client" name="client" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required>
                                    <option value="">-- Select a Client --</option>
                                    <option value="client1">Animesh Maji</option>
                                    <option value="client2">A. K. Sharma</option>
                                </select>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                <input type="date" id="startDate" name="startDate" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required />
                            </div>
                             <div>
                                <label htmlFor="progress" className="block text-sm font-medium text-gray-300 mb-1">Initial Progress (%)</label>
                                <input type="number" id="progress" name="progress" min="0" max="100" defaultValue="0" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required />
                            </div>
                        </div>
                        <div className="text-right pt-2">
                             <button type="submit" className="bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                                Save Project
                            </button>
                        </div>
                    </form>
                </section>

                {/* Existing Projects List */}
                <section className="bg-zinc-800 p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold">Existing Projects</h2>
                    <p className="text-gray-400 mt-2">This is where you will add new projects, update progress, and manage project timelines.</p>
                    <p className="text-gray-500 mt-4 text-sm">Feature coming soon.</p>
                </section>
            </main>
        </div>
    );
};

export default AdminProjectsPage;