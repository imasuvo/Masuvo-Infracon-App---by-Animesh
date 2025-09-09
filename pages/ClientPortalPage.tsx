import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import Spinner from '../components/Spinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { ClientDocument } from '../types';
import { ArrowLeftOnRectangleIcon, BellIcon, DocumentTextIcon, SunIcon, MoonIcon, StarIcon, CheckCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';

const CLIENT_DOCS_STORAGE_KEY = 'client_uploaded_documents';

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
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // Feedback form state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackComment, setFeedbackComment] = useState('');
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    
    // Document Upload State
    const [clientDocuments, setClientDocuments] = useState<ClientDocument[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/portal/login');
        }
        // Load documents from localStorage
        const storedDocs = localStorage.getItem(CLIENT_DOCS_STORAGE_KEY);
        if (storedDocs) {
            setClientDocuments(JSON.parse(storedDocs));
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

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingFeedback(true);
        console.log({ rating, feedbackComment });
        setTimeout(() => {
            setIsSubmittingFeedback(false);
            setFeedbackSubmitted(true);
        }, 1500);
    };
    
    const resetFeedbackForm = () => {
        setFeedbackSubmitted(false);
        setRating(0);
        setFeedbackComment('');
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setUploadSuccess(false);
        }
    };

    const handleDocumentUpload = () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadSuccess(false);

        // Simulate upload
        setTimeout(() => {
            const newDocument: ClientDocument = {
                id: `doc-${Date.now()}`,
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                uploadDate: new Date().toISOString(),
            };

            const updatedDocuments = [...clientDocuments, newDocument];
            setClientDocuments(updatedDocuments);
            localStorage.setItem(CLIENT_DOCS_STORAGE_KEY, JSON.stringify(updatedDocuments));

            setIsUploading(false);
            setUploadSuccess(true);
            setSelectedFile(null);
            if(fileInputRef.current) fileInputRef.current.value = ""; // Reset file input

            setTimeout(() => setUploadSuccess(false), 3000);
        }, 1500);
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
                        onClick={toggleTheme} 
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
                             <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-800'} p-6 rounded-xl shadow-sm space-y-4`}>
                                <h4 className="font-semibold text-lg">Upload a Document</h4>
                                <div className={`border-2 border-dashed ${theme === 'light' ? 'border-gray-300' : 'border-zinc-600'} rounded-lg p-4 text-center`}>
                                     <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className={`w-full text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            ${theme === 'light' ? 'file:bg-gray-200 file:text-zinc-800 hover:file:bg-gray-300' : 'file:bg-zinc-700 file:text-golden-yellow hover:file:bg-zinc-600'}`}
                                    />
                                </div>
                                {selectedFile && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="truncate pr-2">{selectedFile.name}</span>
                                        <span className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{formatBytes(selectedFile.size)}</span>
                                    </div>
                                )}
                                {uploadSuccess && (
                                     <div className={`text-sm font-semibold flex items-center gap-2 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
                                        <CheckCircleIcon className="h-5 w-5" />
                                        <span>File uploaded successfully!</span>
                                    </div>
                                )}
                                <button
                                    onClick={handleDocumentUpload}
                                    disabled={!selectedFile || isUploading}
                                    className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2.5 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                >
                                    {isUploading ? (
                                        <>
                                            <Spinner size="sm" className="mr-2 text-charcoal"/>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                                            <span>Upload Document</span>
                                        </>
                                    )}
                                </button>
                                <div className="pt-4 border-t border-dashed_">
                                    <h4 className="font-semibold text-lg mb-2">Your Uploaded Files</h4>
                                    {clientDocuments.length > 0 ? (
                                        <ul className="space-y-2">
                                            {clientDocuments.map(doc => (
                                                <li key={doc.id} className={`flex items-center justify-between p-2 rounded-md ${theme === 'light' ? 'bg-gray-100' : 'bg-zinc-700/50'}`}>
                                                    <div className="flex items-center gap-2 truncate">
                                                        <DocumentTextIcon className={`h-5 w-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                                                        <span className="text-sm truncate">{doc.name}</span>
                                                    </div>
                                                    <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className={`text-sm text-center py-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>You have not uploaded any documents yet.</p>
                                    )}
                                </div>
                            </div>
                        </section>
                        
                        {/* Feedback Section */}
                        <section>
                            <h3 className="text-xl font-semibold mb-3 text-golden-yellow">Provide Feedback</h3>
                            <div className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-800'} p-6 rounded-xl shadow-sm`}>
                                {feedbackSubmitted ? (
                                    <div className="text-center py-8">
                                        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4"/>
                                        <h4 className="text-xl font-bold">Thank you for your feedback!</h4>
                                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 mb-4`}>We appreciate you taking the time to share your thoughts.</p>
                                        <button 
                                            onClick={resetFeedbackForm}
                                            className="text-sm font-semibold text-golden-yellow hover:underline"
                                        >
                                            Submit another feedback
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                                How would you rate the project progress?
                                            </label>
                                            <div className="flex items-center justify-center space-x-2">
                                                {[...Array(5)].map((_, index) => {
                                                    const starValue = index + 1;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={starValue}
                                                            onClick={() => setRating(starValue)}
                                                            onMouseEnter={() => setHoverRating(starValue)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            className="text-3xl transition-colors"
                                                            aria-label={`Rate ${starValue} stars`}
                                                        >
                                                            <StarIcon className={`h-8 w-8 ${starValue <= (hoverRating || rating) ? 'text-yellow-400' : theme === 'light' ? 'text-gray-300' : 'text-gray-500'}`} />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="feedback-comment" className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                                Comments
                                            </label>
                                            <textarea
                                                id="feedback-comment"
                                                rows={4}
                                                value={feedbackComment}
                                                onChange={(e) => setFeedbackComment(e.target.value)}
                                                placeholder="Share your comments or suggestions..."
                                                className={`w-full rounded-lg p-3 text-sm ${theme === 'light' ? 'bg-gray-100 border-gray-300 text-zinc-900 placeholder-gray-500 focus:ring-golden-yellow focus:border-golden-yellow' : 'bg-zinc-700 border-zinc-600 text-white placeholder-gray-400 focus:ring-golden-yellow focus:border-golden-yellow'}`}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmittingFeedback || rating === 0}
                                            className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2.5 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                        >
                                            {isSubmittingFeedback ? (
                                                <>
                                                    <Spinner size="sm" className="mr-2 text-charcoal" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <span>Submit Feedback</span>
                                            )}
                                        </button>
                                    </form>
                                )}
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