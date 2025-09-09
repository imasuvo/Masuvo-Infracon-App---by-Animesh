import React, { useEffect, useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpTrayIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { ClientDocument } from '../types';

const CLIENT_DOCS_STORAGE_KEY = 'client_uploaded_documents';

const AdminDocumentsPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const [clientDocuments, setClientDocuments] = useState<ClientDocument[]>([]);

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
                state: { error: "You do not have permission to access the Document Management page." } 
            });
        }
        
        // Load client documents from localStorage
        const storedDocs = localStorage.getItem(CLIENT_DOCS_STORAGE_KEY);
        if (storedDocs) {
            setClientDocuments(JSON.parse(storedDocs));
        }
    }, [navigate]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('This is a placeholder form. No document will be uploaded.');
    }
    
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };


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
                <h1 className="text-xl font-bold text-golden-yellow">Manage Documents</h1>
            </header>
            <main className="p-4 space-y-6">
                 {/* Upload New Document Form (Admin) */}
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4 flex items-center gap-2">
                        <ArrowUpTrayIcon className="h-5 w-5" />
                        Upload New Document (For Admins)
                    </h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                                <label htmlFor="docName" className="block text-sm font-medium text-gray-300 mb-1">Document Name</label>
                                <input type="text" id="docName" name="docName" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., Architectural Plan v3" required />
                            </div>
                           <div>
                                <label htmlFor="docProject" className="block text-sm font-medium text-gray-300 mb-1">Assign to Project</label>
                                <select id="docProject" name="docProject" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required>
                                    <option value="">-- Select Project --</option>
                                    <option value="proj1">4BHK Duplex at Bidhan Nagar</option>
                                    <option value="proj2">3BHK Bungalow in A-Zone</option>
                                </select>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="docType" className="block text-sm font-medium text-gray-300 mb-1">Document Type</label>
                                <select id="docType" name="docType" className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required>
                                    <option value="Plan">Plan</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Invoice">Invoice</option>
                                </select>
                            </div>
                           <div>
                                <label htmlFor="docFile" className="block text-sm font-medium text-gray-300 mb-1">Select File</label>
                                <input type="file" id="docFile" name="docFile" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-600 file:text-golden-yellow hover:file:bg-zinc-500" required />
                            </div>
                        </div>
                        <div className="text-right pt-2">
                             <button type="submit" className="bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                                Upload Document
                            </button>
                        </div>
                    </form>
                </section>

                {/* Client Uploaded Documents List */}
                 <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4 flex items-center gap-2">
                        <DocumentDuplicateIcon className="h-5 w-5" />
                        Client Uploaded Documents
                    </h2>
                     {clientDocuments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-700/50 text-gray-300 uppercase tracking-wider">
                                    <tr>
                                        <th className="p-3">File Name</th>
                                        <th className="p-3">File Size</th>
                                        <th className="p-3">Uploaded On</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientDocuments.map(doc => (
                                        <tr key={doc.id} className="border-b border-zinc-700 last:border-0 hover:bg-zinc-700/30">
                                            <td className="p-3 font-medium">{doc.name}</td>
                                            <td className="p-3">{formatBytes(doc.size)}</td>
                                            <td className="p-3">{new Date(doc.uploadDate).toLocaleString()}</td>
                                            <td className="p-3 text-center">
                                                <button 
                                                    onClick={() => alert('Placeholder for viewing/downloading the file.')}
                                                    className="text-xs font-semibold text-golden-yellow hover:underline"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No documents have been uploaded by the client yet.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminDocumentsPage;