import React, { useEffect, useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, DocumentPlusIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import Spinner from '../components/Spinner';
import { AdminProject } from '../types';

const ADMIN_PROJECTS_STORAGE_KEY = 'admin_projects';

const AdminProjectsPage: React.FC = () => {
    const navigate = ReactRouterDOM.useNavigate();
    const location = ReactRouterDOM.useLocation();

    // Form state
    const [projectName, setProjectName] = useState('');
    const [client, setClient] = useState('');
    const [startDate, setStartDate] = useState('');
    const [progress, setProgress] = useState('0');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    // Projects list state
    const [projects, setProjects] = useState<AdminProject[]>([]);
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
                state: { error: "You do not have permission to access the Project Management page." } 
            });
        }

        // Load projects from localStorage on component mount
        const storedProjects = localStorage.getItem(ADMIN_PROJECTS_STORAGE_KEY);
        if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
        }
    }, [navigate]);
    
    useEffect(() => {
        const highlightName = location.state?.highlight;
        if (highlightName && projects.length > 0) {
            const projectToHighlight = projects.find(p => p.projectName === highlightName);
            if (projectToHighlight) {
                setHighlightedId(projectToHighlight.id);
                const element = document.getElementById(projectToHighlight.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                const timer = setTimeout(() => setHighlightedId(null), 3000); // Highlight for 3 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [location.state, projects]);


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionSuccess(false);

        // Simulate API call
        setTimeout(() => {
            const newProject: AdminProject = {
                id: `proj-${Date.now()}`,
                projectName,
                client,
                startDate,
                progress,
            };

            const updatedProjects = [...projects, newProject];
            setProjects(updatedProjects);
            localStorage.setItem(ADMIN_PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
            
            setIsSubmitting(false);
            setSubmissionSuccess(true);
            
            // Reset form
            setProjectName('');
            setClient('');
            setStartDate('');
            setProgress('0');

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSubmissionSuccess(false);
            }, 3000);
        }, 1000);
    };
    
    const handleDeleteProject = (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            const updatedProjects = projects.filter(p => p.id !== projectId);
            setProjects(updatedProjects);
            localStorage.setItem(ADMIN_PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
        }
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
                <h1 className="text-xl font-bold text-golden-yellow">Manage Projects</h1>
            </header>
            <main className="p-4 space-y-6">
                 {/* Create New Project Form */}
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4 flex items-center gap-2">
                        <DocumentPlusIcon className="h-5 w-5" />
                        Create New Project
                    </h2>

                    {submissionSuccess && (
                        <div className="bg-green-500/10 border-l-4 border-green-500 text-green-300 p-4 rounded-md mb-4 flex items-center gap-3" role="alert">
                            <CheckCircleIcon className="h-6 w-6" />
                            <div>
                                <p className="font-bold">Success!</p>
                                <p className="text-sm">Project has been created and saved locally.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                                <input type="text" id="projectName" name="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" placeholder="e.g., 4BHK Duplex at Bidhan Nagar" required />
                            </div>
                            <div>
                                <label htmlFor="client" className="block text-sm font-medium text-gray-300 mb-1">Assign to Client</label>
                                <select id="client" name="client" value={client} onChange={e => setClient(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required>
                                    <option value="">-- Select a Client --</option>
                                    <option value="Animesh Maji">Animesh Maji</option>
                                    <option value="A. K. Sharma">A. K. Sharma</option>
                                    <option value="Sunita Roy">Sunita Roy</option>
                                </select>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                <input type="date" id="startDate" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required />
                            </div>
                             <div>
                                <label htmlFor="progress" className="block text-sm font-medium text-gray-300 mb-1">Initial Progress (%)</label>
                                <input type="number" id="progress" name="progress" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2.5" required />
                            </div>
                        </div>
                        <div className="text-right pt-2">
                             <button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center justify-center min-w-[130px] disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? <Spinner size="sm" className="text-charcoal" /> : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Existing Projects List */}
                <section className="bg-zinc-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-golden-yellow mb-4">Existing Projects</h2>
                    {projects.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-700/50 text-gray-300 uppercase tracking-wider">
                                    <tr>
                                        <th className="p-3">Project Name</th>
                                        <th className="p-3">Client</th>
                                        <th className="p-3">Start Date</th>
                                        <th className="p-3">Progress</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(p => (
                                        <tr 
                                            key={p.id}
                                            id={p.id}
                                            className={`border-b border-zinc-700 last:border-0 hover:bg-zinc-700/30 transition-colors duration-300 ${highlightedId === p.id ? 'bg-golden-yellow/20' : ''}`}
                                        >
                                            <td className="p-3 font-medium">{p.projectName}</td>
                                            <td className="p-3">{p.client}</td>
                                            <td className="p-3">{p.startDate}</td>
                                            <td className="p-3">
                                                <div className="w-full bg-zinc-600 rounded-full h-2.5">
                                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                                </div>
                                                <span className="text-xs text-gray-400">{p.progress}%</span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button 
                                                    onClick={() => handleDeleteProject(p.id)}
                                                    className="p-1.5 text-gray-400 hover:text-coral-red hover:bg-coral-red/10 rounded-full transition-colors"
                                                    aria-label={`Delete project ${p.projectName}`}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No projects found.</p>
                            <p className="text-gray-500 mt-2 text-sm">Create a new project using the form above to see it here.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminProjectsPage;