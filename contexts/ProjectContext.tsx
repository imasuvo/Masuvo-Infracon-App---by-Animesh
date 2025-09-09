import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Project } from '../types';
import { MOCK_PROJECT_DATA } from '../constants';

interface ProjectContextType {
    project: Project | null;
    loading: boolean;
    error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching project data for the logged-in user
        const fetchProjectData = () => {
            setLoading(true);
            setError(null);
            setTimeout(() => {
                try {
                    // In a real app, you would fetch this from an API based on user auth
                    setProject(MOCK_PROJECT_DATA);
                } catch (e) {
                    setError("Failed to load project data.");
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }, 1000); // Simulate network delay
        };

        fetchProjectData();
    }, []);

    return (
        <ProjectContext.Provider value={{ project, loading, error }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};
