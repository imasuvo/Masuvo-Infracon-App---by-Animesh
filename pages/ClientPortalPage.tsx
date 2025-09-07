import React, { useState } from 'react';
import { ArrowRightOnRectangleIcon, ChatBubbleLeftRightIcon, PhotoIcon, CurrencyDollarIcon, BellIcon } from '@heroicons/react/24/solid';
import { PROJECT_NOTIFICATIONS } from '../constants';
import type { Notification, ChatMessage } from '../types';

const formatTimeAgo = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};


const ProjectMilestone: React.FC<{ title: string, status: 'completed' | 'inprogress' | 'pending', children: React.ReactNode }> = ({ title, status, children }) => {
    const statusClasses = {
        completed: 'border-green-500 text-green-500',
        inprogress: 'border-blue-500 text-blue-500',
        pending: 'border-gray-500 text-gray-500',
    };
    return (
        <div className={`relative pl-8 border-l-2 ${statusClasses[status]}`}>
            <div className={`absolute -left-3 top-0 w-5 h-5 rounded-full ${status === 'completed' ? 'bg-green-500' : 'bg-blue-500'} ${status === 'pending' && 'bg-gray-500'}`}></div>
            <h4 className="font-bold">{title}</h4>
            <div className="text-sm text-gray-400 mt-1">{children}</div>
        </div>
    )
};


const ProjectTracker: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [notifications, setNotifications] = useState<Notification[]>(PROJECT_NOTIFICATIONS);
    const [showNotifications, setShowNotifications] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            sender: 'PM',
            text: 'Hi there! The exterior paint job has started today. Will share photos by EOD.',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const projectDetails = {
        property: "4BHK Duplex, Christianpally",
        area: "2400 sq. ft.",
        buildType: "Duplex",
        estCompletion: "December 2024",
        projectManager: "Animesh Maji",
        startDate: "March 2024",
        completionPercentage: 75,
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleToggleNotifications = () => {
        setShowNotifications(prev => !prev);
        if (!showNotifications) { // Only mark as read when opening
            setNotifications(currentNotifications =>
                currentNotifications.map(n => ({ ...n, read: true }))
            );
        }
    };
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const userMessage: ChatMessage = {
            sender: 'You',
            text: newMessage,
            timestamp: new Date().toISOString(),
        };
        setMessages([...messages, userMessage]);
        setNewMessage('');
    };

    const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    );

    return (
        <div className="p-4 min-h-screen bg-charcoal">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-golden-yellow">Project Dashboard</h2>
                    <p className="text-sm text-gray-300">{projectDetails.property}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button onClick={handleToggleNotifications} className="text-gray-400 hover:text-white transition-colors">
                            <BellIcon className="h-6 w-6" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-coral-red"></span>
                                </span>
                            )}
                        </button>
                    </div>
                    <button 
                        onClick={onLogout} 
                        className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 hover:text-white font-semibold text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Notifications Panel */}
            {showNotifications && (
                <div className="absolute top-20 right-4 w-80 max-w-[calc(100%-2rem)] bg-zinc-800 rounded-lg shadow-xl z-50 border border-golden-yellow/20">
                    <div className="p-3 border-b border-zinc-700 flex justify-between items-center">
                        <h4 className="font-semibold text-white">Notifications</h4>
                        <button onClick={() => setShowNotifications(false)} className="text-xs text-gray-400 hover:text-white">Close</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            [...notifications].reverse().map(notification => (
                                <div key={notification.id} className="p-3 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-700/50">
                                    <p className="text-sm text-gray-300">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.timestamp)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-gray-400 text-center">No notifications yet.</p>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {/* Project Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-golden-yellow">Project Details</h3>
                    <div className="bg-zinc-800 p-4 rounded-xl space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Property" value={projectDetails.property} />
                            <DetailItem label="Total Area" value={projectDetails.area} />
                            <DetailItem label="Build Type" value={projectDetails.buildType} />
                            <DetailItem label="Project Manager" value={projectDetails.projectManager} />
                            <DetailItem label="Start Date" value={projectDetails.startDate} />
                            <DetailItem label="Est. Completion" value={projectDetails.estCompletion} />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-xs text-gray-400">Overall Progress</p>
                                <p className="text-sm font-semibold text-golden-yellow">{projectDetails.completionPercentage}%</p>
                            </div>
                            <div className="w-full bg-zinc-700 rounded-full h-2.5">
                                <div 
                                    className="bg-gradient-to-r from-golden-yellow to-golden-orange h-2.5 rounded-full" 
                                    style={{ width: `${projectDetails.completionPercentage}%` }}
                                    aria-valuenow={projectDetails.completionPercentage}
                                    // FIX: Changed `aria-valuemin` and `aria-valuemax` from string to number to fix type error.
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    role="progressbar"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Milestones */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-golden-yellow">Project Milestones</h3>
                    <div className="space-y-6">
                        <ProjectMilestone title="Handover" status="pending">
                            Final checks and key handover ceremony. Est. 2 weeks.
                        </ProjectMilestone>
                        <ProjectMilestone title="Finishing" status="inprogress">
                            Painting, electrical, and plumbing fixtures are being installed.
                        </ProjectMilestone>
                        <ProjectMilestone title="Structure" status="completed">
                            RCC structure, brickwork, and plastering completed.
                        </ProjectMilestone>
                        <ProjectMilestone title="Foundation" status="completed">
                            Foundation work and plinth beam completed successfully.
                        </ProjectMilestone>
                    </div>
                </div>

                {/* Updates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-xl text-center">
                        <PhotoIcon className="h-8 w-8 mx-auto text-golden-yellow mb-2" />
                        <h4 className="font-semibold">Photo Updates</h4>
                        <p className="text-xs text-gray-400">View latest site photos</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl text-center">
                        <CurrencyDollarIcon className="h-8 w-8 mx-auto text-golden-yellow mb-2" />
                        <h4 className="font-semibold">Payments</h4>
                        <p className="text-xs text-gray-400">3/5 milestones paid</p>
                    </div>
                </div>

                {/* Chat */}
                <div className="bg-zinc-800 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-golden-yellow" />
                        <h4 className="font-semibold">Chat with Project Manager</h4>
                    </div>
                    
                    <div className="space-y-4 h-48 overflow-y-auto mb-4 pr-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.sender === 'You' ? 'bg-golden-yellow text-charcoal' : 'bg-zinc-700 text-gray-300'}`}>
                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                                    <p className={`text-xs mt-1 opacity-70 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                                        {formatTimeAgo(msg.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-grow bg-zinc-700 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-golden-yellow" 
                        />
                        <button type="submit" className="bg-golden-yellow text-charcoal font-bold px-4 rounded-lg hover:bg-golden-orange transition-colors">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ClientPortalPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    if (isLoggedIn) {
        return <ProjectTracker onLogout={() => setIsLoggedIn(false)} />;
    }

    return (
        <div className="p-4 min-h-screen flex flex-col justify-center">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-golden-yellow">Client Portal</h2>
                <p className="text-gray-300">Track your project's progress.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="Client ID / Email"
                    defaultValue="client@example.com"
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    defaultValue="password"
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3"
                />
                <button type="submit" className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                    Login
                </button>
            </form>
        </div>
    );
};

export default ClientPortalPage;