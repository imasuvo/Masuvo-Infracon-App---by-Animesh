import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import Spinner from '../components/Spinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { ArrowLeftOnRectangleIcon, BellIcon, DocumentTextIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const demoNotifications = [
  { id: 1, title: 'New Document Uploaded', body: 'The "Final Architectural Plan" has been added.', time: '2h ago' },
  { id: 2, title: 'Payment Received', body: 'We have received your payment for the foundation stage.', time: '1d ago' },
  { id: 3, title: 'Next Stage: Framing', body: 'The framing stage is scheduled to begin next week.', time: '3d ago' },
];

const projectStages = ['Planning', 'Foundation', 'Framing', 'Finishing', 'Completed'];
const stageGradients: { [key: string]: string } = {
    'Planning': 'from-blue-500 to-blue-400',
    'Foundation': 'from-yellow-500 to-yellow-400',
    'Framing': 'from-orange-500 to-orange-400',
    'Finishing': 'from-teal-500 to-teal-400',
    'Completed': 'from-green-500 to-green-400',
};

const GraphProgressBar: React.FC<{ progress: number; currentStage: string; theme: 'light' | 'dark' }> = ({ progress, currentStage, theme }) => {
    const stageWidth = 100 / projectStages.length;

    return (
        <div className="w-full pt-4">
             <div className="text-center mb-6">
                 <span className={`text-4xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{progress}%</span>
                 <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Overall Progress</p>
            </div>
            <div className={`flex rounded-full ${theme === 'light' ? 'bg-gray-200 border-gray-300' : 'bg-zinc-700 border-zinc-900'} h-5 overflow-hidden border-2 shadow-inner`}>
                {projectStages.map((stage, index) => {
                    const segmentStartProgress = index * stageWidth;
                    const segmentEndProgress = (index + 1) * stageWidth;
                    
                    let filledPercentage = 0;
                    if (progress >= segmentEndProgress) {
                        filledPercentage = 100;
                    } else if (progress > segmentStartProgress && progress < segmentEndProgress) {
                        const progressInSegment = progress - segmentStartProgress;
                        filledPercentage = (progressInSegment / stageWidth) * 100;
                    }
                    
                    const gradientClass = stageGradients[stage as keyof typeof stageGradients];

                    return (
                        <div key={stage} className="h-full" style={{ width: `${stageWidth}%` }}>
                            <motion.div 
                                className={`h-full bg-gradient-to-r ${gradientClass}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${filledPercentage}%` }}
                                transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeInOut' }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between text-xs mt-2">
                {projectStages.map((stage, index) => {
                     const currentStageIndex = projectStages.indexOf(currentStage);
                     const isActive = index <= currentStageIndex;
                     const textColor = theme === 'light' 
                        ? (isActive ? 'font-semibold text-zinc-800' : 'text-gray-400')
                        : (isActive ? 'font-semibold text-white' : 'text-zinc-500');

                     return (
                        <span key={stage} style={{ width: `${stageWidth}%`}} className={`text-center transition-colors duration-500 ${textColor}`}>{stage}</span>
                     )
                })}
            </div>
        </div>
    );
};


const ClientPortalPage: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { project, loading, error } = useProject();
    const navigate = useNavigate();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('portalTheme');
        return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    });

    useEffect(() => {
        localStorage.setItem('portalTheme', theme);
    }, [theme]);

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/portal/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isAuthenticated) {
        return null; // or a loading spinner while redirecting
    }

    const handleLogoutRequest = () => {
        setIsLogoutModalOpen(true);
    };
    
    const confirmLogout = () => {
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
            className={`${theme === 'light' ? 'bg-gray-100 text-zinc-900' : 'bg-zinc-900 text-white'} min-h-screen`}
        >
            {/* Portal Header */}
            <header className={`${theme === 'light' ? 'bg-white border-gray-200' : 'bg-charcoal border-golden-yellow/20'} p-4 flex justify-between items-center sticky top-0 z-20 border-b`}>
                <div>
                     <h1 className="text-xl font-bold text-golden-yellow">Client Portal</h1>
                     <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Welcome, {project?.clientName || 'Client'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                        className={`p-2 rounded-full ${theme === 'light' ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-zinc-700'} transition-colors`} 
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                    </button>
                    <div ref={notificationsRef} className="relative">
                        <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`relative p-2 rounded-full ${theme === 'light' ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-zinc-700'} transition-colors`} aria-label="Toggle notifications">
                            <BellIcon className="h-6 w-6" />
                            <span className={`absolute top-2 right-2 block h-2 w-2 rounded-full bg-coral-red ring-2 ${theme === 'light' ? 'ring-white' : 'ring-charcoal'}`} aria-hidden="true"></span>
                        </button>
                         <AnimatePresence>
                            {isNotificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl z-30 ${theme === 'light' ? 'bg-white border border-gray-200 text-zinc-900' : 'bg-zinc-800 border border-golden-yellow/20 text-white'}`}
                                >
                                    <div className={`p-3 border-b ${theme === 'light' ? 'border-gray-200' : 'border-zinc-700'}`}>
                                        <h4 className="font-semibold">Notifications</h4>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {demoNotifications.map(notif => (
                                            <div key={notif.id} className={`p-3 border-b ${theme === 'light' ? 'border-gray-200 hover:bg-gray-50' : 'border-zinc-700 hover:bg-zinc-700/50'} last:border-b-0`}>
                                                <p className={`font-semibold text-sm ${theme === 'light' ? 'text-zinc-800' : 'text-gray-200'}`}>{notif.title}</p>
                                                <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{notif.body}</p>
                                                <p className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} text-right mt-1`}>{notif.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`p-2 text-center ${theme === 'light' ? 'bg-gray-50' : 'bg-zinc-800/50'}`}>
                                        <button className="text-xs text-golden-yellow hover:underline">Mark all as read</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button onClick={handleLogoutRequest} className={`p-2 rounded-full ${theme === 'light' ? 'text-gray-600 hover:bg-gray-200' : 'text-gray-300 hover:bg-zinc-700'} transition-colors`} aria-label="Logout">
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
                        <section className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-800'} p-6 rounded-xl flex flex-col items-center shadow-sm`}>
                            <h2 className="text-2xl font-bold text-center">{project.projectName}</h2>
                            <p className={`text-sm font-semibold mt-1 mb-4 ${project.status === 'Ongoing' ? 'text-green-500' : theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{project.status}</p>
                            
                            <GraphProgressBar progress={project.progress} currentStage={project.updates[0]?.stage || 'Planning'} theme={theme} />
                        </section>

                        {/* Recent Updates */}
                        <section>
                            <h3 className="text-xl font-semibold mb-3 text-golden-yellow">Recent Updates</h3>
                            <div className="space-y-4">
                                {project.updates.slice(0, 3).map(update => (
                                     <div key={update.id} className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-800'} p-4 rounded-xl flex gap-4 items-start shadow-sm`}>
                                        {update.imageUrl && (
                                            <img 
                                                src={update.imageUrl} 
                                                alt={update.title}
                                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`h-2.5 w-2.5 rounded-full ${getStageColor(update.stage)} flex-shrink-0`}></div>
                                                <p className={`font-semibold ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>{update.title}</p>
                                            </div>
                                            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{update.description}</p>
                                            <p className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{update.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Documents */}
                        <section>
                            <h3 className="text-xl font-semibold mb-3 text-golden-yellow">Documents</h3>
                             <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-800'} p-6 rounded-xl text-center shadow-sm`}>
                                <DocumentTextIcon className={`h-12 w-12 mx-auto mb-3 ${theme === 'light' ? 'text-gray-300' : 'text-zinc-600'}`} />
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Documents will appear here once uploaded by the project manager.</p>
                            </div>
                        </section>
                    </>
                )}
            </div>

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
                            className={`${theme === 'light' ? 'bg-white text-zinc-900 border-gray-200' : 'bg-zinc-800 text-white border-golden-yellow/20'} w-full max-w-sm rounded-xl shadow-2xl p-6 border`}
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold text-center">Confirm Logout</h3>
                            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-center my-4`}>Are you sure you want to log out?</p>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className={`flex-1 font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors duration-200 ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-zinc-800' : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
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
        </motion.div>
    );
};

export default ClientPortalPage;
