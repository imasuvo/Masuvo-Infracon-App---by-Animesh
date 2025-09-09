import React, { useEffect, useState, useRef } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRightOnRectangleIcon, UsersIcon, BriefcaseIcon, DocumentDuplicateIcon, MagnifyingGlassIcon, DocumentPlusIcon, ArrowUpTrayIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorDisplay from '../components/ErrorDisplay';
import { ClientDocument } from '../types';

type AdminRole = 'Super Admin' | 'Project Manager' | 'Content Editor' | null;
const CLIENT_DOCS_STORAGE_KEY = 'client_uploaded_documents';

// Mock data for search functionality
const mockSearchableData = [
  { type: 'Client', name: 'Animesh Maji', link: '/admin/clients' },
  { type: 'Client', name: 'A. K. Sharma', link: '/admin/clients' },
  { type: 'Client', name: 'Sunita Roy', link: '/admin/clients' },
  { type: 'Project', name: '4BHK Duplex at Bidhan Nagar', link: '/admin/projects' },
  { type: 'Project', name: '3BHK Bungalow in A-Zone', link: '/admin/projects' },
  { type: 'Document', name: 'Architectural Plan v2.pdf', link: '/admin/documents' },
  { type: 'Document', name: 'Construction Agreement.pdf', link: '/admin/documents' },
  { type: 'Document', name: 'Invoice-JUL2024.pdf', link: '/admin/documents' },
];

interface SearchResult {
    type: string;
    name: string;
    link: string;
}

const QuickActionButton: React.FC<{ icon: React.ElementType; label: string; onClick?: () => void; to?: string }> = ({ icon: Icon, label, onClick, to }) => {
    const content = (
        <div className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-all duration-300 flex flex-col items-center justify-center gap-2 aspect-square group hover:scale-105">
            <Icon className="h-8 w-8 text-golden-yellow transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-semibold text-center text-white">{label}</span>
        </div>
    );

    const commonProps = {
        className: "w-full h-full block"
    };

    if (to) {
        return <ReactRouterDOM.Link to={to} {...commonProps}>{content}</ReactRouterDOM.Link>;
    }
    return <button onClick={onClick} {...commonProps}>{content}</button>;
};


const AdminDashboardPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<AdminRole>(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [clientDocCount, setClientDocCount] = useState(0);
    const [recentUploads, setRecentUploads] = useState<ClientDocument[]>([]);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('admin_auth') === 'true';
        const userRole = localStorage.getItem('admin_role') as AdminRole;
        setIsAuthenticated(authStatus);
        setRole(userRole);

        if (!authStatus) {
            navigate('/admin');
        }

        if (location.state?.error) {
            setPermissionError(location.state.error);
            // Clear state to prevent message from persisting on refresh
            window.history.replaceState({}, document.title);
        }

        // Load client documents
        const storedDocs = localStorage.getItem(CLIENT_DOCS_STORAGE_KEY);
        if (storedDocs) {
            const docs: ClientDocument[] = JSON.parse(storedDocs);
            setClientDocCount(docs.length);
            setRecentUploads(docs.slice(-3).reverse()); // Get last 3, newest first
        }
    }, [navigate, location.state]);

    // Effect for handling search logic
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = mockSearchableData.filter(item =>
            item.name.toLowerCase().includes(lowercasedQuery)
        );
        setSearchResults(filtered);
    }, [searchQuery]);

    // Effect for handling clicks outside the search component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const requestLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_role');
        navigate('/admin');
    };

    const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; to: string }> = ({ title, value, icon: Icon, to }) => (
        <ReactRouterDOM.Link to={to} className="group block bg-zinc-800 p-4 rounded-lg flex items-center gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-golden-yellow/10">
            <div className="p-3 bg-golden-yellow/20 rounded-full transition-colors duration-300 group-hover:bg-golden-yellow/30">
                 <Icon className="h-6 w-6 text-golden-yellow" />
            </div>
            <div>
                <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">{title}</p>
                <p className="text-xl font-bold text-white">{value}</p>
            </div>
        </ReactRouterDOM.Link>
    );

    if (!isAuthenticated) return null; // Render nothing while redirecting

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Client': return <UsersIcon className="h-5 w-5 text-gray-400" />;
            case 'Project': return <BriefcaseIcon className="h-5 w-5 text-gray-400" />;
            case 'Document': return <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-white">
            <header className="bg-zinc-800 p-4 flex justify-between items-center gap-4 shadow-md sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-golden-yellow">Admin Dashboard</h1>
                    {role && <p className="text-xs text-gray-400">Role: {role}</p>}
                </div>

                {/* Search Bar */}
                <div ref={searchRef} className="relative flex-grow max-w-lg">
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search clients, projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition"
                        />
                    </div>
                     <AnimatePresence>
                        {isSearchFocused && searchQuery.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full mt-2 w-full bg-zinc-800 rounded-lg shadow-2xl overflow-hidden border border-zinc-700"
                            >
                                {searchResults.length > 0 ? (
                                    <ul className="max-h-80 overflow-y-auto">
                                        {searchResults.map((result, index) => (
                                            <li key={index}>
                                                <ReactRouterDOM.Link
                                                    to={result.link}
                                                    onClick={() => setIsSearchFocused(false)}
                                                    className="flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors"
                                                >
                                                    {getIconForType(result.type)}
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">{result.name}</p>
                                                        <p className="text-xs text-gray-400">{result.type}</p>
                                                    </div>
                                                </ReactRouterDOM.Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-sm text-gray-400">
                                        No results found.
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={requestLogout}
                    className="flex items-center gap-2 text-sm bg-zinc-700 hover:bg-coral-red px-3 py-2 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Logout"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </header>

            <main className="p-4 space-y-6">
                 {permissionError && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ErrorDisplay title="Access Denied" message={permissionError} />
                    </motion.div>
                )}
                <section>
                    <h2 className="text-lg font-semibold text-gray-300 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(role === 'Super Admin' || role === 'Project Manager') && <StatCard to="/admin/clients" title="Total Clients" value="15" icon={UsersIcon} />}
                        {(role === 'Super Admin' || role === 'Project Manager') && <StatCard to="/admin/projects" title="Ongoing Projects" value="8" icon={BriefcaseIcon} />}
                        {(role === 'Super Admin' || role === 'Project Manager') && <StatCard to="/admin/documents" title="Client Documents" value={clientDocCount.toString()} icon={DocumentDuplicateIcon} />}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-lg font-semibold text-gray-300 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {(role === 'Super Admin' || role === 'Project Manager') && (
                            <QuickActionButton to="/admin/projects" icon={DocumentPlusIcon} label="Add Project" />
                        )}
                        {(role === 'Super Admin' || role === 'Project Manager') && (
                            <QuickActionButton to="/admin/clients" icon={UsersIcon} label="Manage Clients" />
                        )}
                        {(role === 'Super Admin' || role === 'Project Manager') && (
                            <QuickActionButton to="/admin/documents" icon={ArrowUpTrayIcon} label="Upload Document" />
                        )}
                        {role === 'Super Admin' && (
                            <QuickActionButton onClick={() => alert('Reports feature coming soon!')} icon={ChartBarIcon} label="View Reports" />
                        )}
                    </div>
                </section>

                 <section>
                    <h2 className="text-lg font-semibold text-gray-300 mb-4">Recent Client Uploads</h2>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                        {recentUploads.length > 0 ? (
                            <ul className="divide-y divide-zinc-700">
                                {recentUploads.map(doc => (
                                     <li key={doc.id} className="py-2 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
                                            <span className="font-medium text-white">{doc.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                     </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-sm text-gray-500 py-4">No recent documents uploaded by clients.</p>
                        )}
                    </div>
                </section>
            </main>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {isLogoutModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsLogoutModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="bg-zinc-800 text-white w-full max-w-sm rounded-xl shadow-2xl p-6 border border-golden-yellow/20"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold text-center">Confirm Logout</h3>
                            <p className="text-gray-300 text-center my-4">Are you sure you want to log out?</p>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="flex-1 font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors duration-200 bg-zinc-700 hover:bg-zinc-600 text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 bg-gradient-to-r from-coral-red to-orange-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboardPage;