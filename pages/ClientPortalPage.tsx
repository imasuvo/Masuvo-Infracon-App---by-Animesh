import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import Spinner from '../components/Spinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { ArrowLeftOnRectangleIcon, BellIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const ClientPortalPage: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { project, loading, error } = useProject();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/portal/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null; // or a loading spinner while redirecting
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const getStageColor = (stage: string) => {
        switch(stage) {
            case 'Planning': return 'bg-blue-500';
            case 'Foundation': return 'bg-yellow-500';
            case 'Framing': return 'bg-orange-500';
            case 'Finishing': return 'bg-teal-500';
            case 'Completed': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 min-h-screen text-white"
        >
            {/* Portal Header */}
            <header className="bg-charcoal p-4 flex justify-between items-center sticky top-0 z-10 border-b border-golden-yellow/20">
                <div>
                     <h1 className="text-xl font-bold text-golden-yellow">Client Portal</h1>
                     <p className="text-xs text-gray-400">Welcome, {project?.clientName || 'Client'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-300 hover:text-white">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-white" aria-label="Logout">
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <div className="p-4 space-y-6">
                {loading && <div className="flex justify-center p-10"><Spinner size="lg" /></div>}
                {error && <ErrorDisplay title="Error" message={error} />}
                
                {project && !loading && !error && (
                    <>
                        {/* Project Overview */}
                        <section className="bg-zinc-800 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold">{project.projectName}</h2>
                            <p className={`text-sm font-semibold mt-1 ${project.status === 'Ongoing' ? 'text-green-400' : 'text-gray-400'}`}>{project.status}</p>
                            
                            <div className="mt-4">
                                <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                    <span>Project Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-golden-yellow to-golden-orange h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                        </section>

                        {/* Recent Updates */}
                        <section>
                            <h3 className="text-xl font-semibold mb-3 text-golden-yellow">Recent Updates</h3>
                            <div className="space-y-4">
                                {project.updates.slice(0, 3).map(update => (
                                    <div key={update.id} className="bg-zinc-800 p-4 rounded-xl flex items-start gap-4">
                                        <div className={`mt-1 flex-shrink-0 h-3 w-3 rounded-full ${getStageColor(update.stage)}`}></div>
                                        <div>
                                            <p className="font-semibold">{update.title}</p>
                                            <p className="text-sm text-gray-400">{update.description}</p>
                                            <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Documents */}
                        <section>
                            <h3 className="text-xl font-semibold mb-3 text-golden-yellow">Documents</h3>
                            <div className="space-y-2">
                                {project.documents.map(doc => (
                                    <a href={doc.url} key={doc.id} target="_blank" rel="noopener noreferrer" className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center hover:bg-zinc-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <DocumentTextIcon className="h-6 w-6 text-golden-yellow/70"/>
                                            <div>
                                                <p className="font-medium">{doc.name}</p>
                                                <p className="text-xs text-gray-400">{doc.type}</p>
                                            </div>
                                        </div>
                                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                    </a>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default ClientPortalPage;
