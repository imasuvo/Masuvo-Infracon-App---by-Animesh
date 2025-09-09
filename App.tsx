import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ScrollToTop from './components/ScrollToTop';

// Context Providers
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ConstructionPage from './pages/ConstructionPage';
import InteriorDesignPage from './pages/InteriorDesignPage';
import BudgetPage from './pages/BudgetPage';
import SchedulerPage from './pages/SchedulerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import FloorPlansPage from './pages/FloorPlansPage';
import NotFoundPage from './pages/NotFoundPage';
import ClientPortalLoginPage from './pages/ClientPortalLoginPage';
import ClientPortalPage from './pages/ClientPortalPage';

const App: React.FC = () => {
    return (
        <ReactRouterDOM.HashRouter>
            <FavoritesProvider>
                 <AuthProvider>
                    <ProjectProvider>
                        <AppContent />
                    </ProjectProvider>
                </AuthProvider>
            </FavoritesProvider>
        </ReactRouterDOM.HashRouter>
    );
};

const AppContent: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const isPortalRoute = location.pathname.startsWith('/portal');

    return (
         <div className="max-w-lg mx-auto bg-charcoal text-gray-100 font-sans flex flex-col min-h-screen">
            <ScrollToTop />
            {!isPortalRoute && <Header />}

            <main className={`flex-grow ${!isPortalRoute && 'pb-16'}`}>
                <ReactRouterDOM.Routes>
                    <ReactRouterDOM.Route path="/" element={<HomePage />} />
                    <ReactRouterDOM.Route path="/properties" element={<PropertiesPage />} />
                    <ReactRouterDOM.Route path="/properties/:id" element={<PropertyDetailPage />} />
                    <ReactRouterDOM.Route path="/construction" element={<ConstructionPage />} />
                    <ReactRouterDOM.Route path="/interiors" element={<InteriorDesignPage />} />
                    <ReactRouterDOM.Route path="/budget-estimator" element={<BudgetPage />} />
                    <ReactRouterDOM.Route path="/schedule-visit" element={<SchedulerPage />} />
                    <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
                    <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
                    <ReactRouterDOM.Route path="/services" element={<ServicesPage />} />
                    <ReactRouterDOM.Route path="/faq" element={<FAQPage />} />
                    <ReactRouterDOM.Route path="/saved" element={<SavedPropertiesPage />} />
                    <ReactRouterDOM.Route path="/floor-plans" element={<FloorPlansPage />} />
                    
                    {/* Client Portal Routes */}
                    <ReactRouterDOM.Route path="/portal/login" element={<ClientPortalLoginPage />} />
                    <ReactRouterDOM.Route path="/portal" element={<ClientPortalPage />} />
                    
                    <ReactRouterDOM.Route path="*" element={<NotFoundPage />} />
                </ReactRouterDOM.Routes>
            </main>
            
            {!isPortalRoute && (
                <>
                    <Footer />
                    <BottomNav />
                </>
            )}
        </div>
    );
};

export default App;
