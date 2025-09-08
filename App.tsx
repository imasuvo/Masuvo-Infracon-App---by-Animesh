import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ConstructionPage from './pages/ConstructionPage';
import InteriorDesignPage from './pages/InteriorDesignPage';
import BudgetPage from './pages/BudgetPage';
import SchedulerPage from './pages/SchedulerPage';
import ClientPortalPage from './pages/ClientPortalPage';
import ClientPortalLoginPage from './pages/ClientPortalLoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import FloorPlansPage from './pages/FloorPlansPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <ReactRouterDOM.Navigate to="/portal/login" replace />;
    }
    return <>{children}</>;
};


const AppContent: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const isClientPortal = location.pathname === '/portal';

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {!isClientPortal && <Header />}
            <main className="flex-grow pb-20 flex flex-col">
                <AnimatePresence mode="wait">
                    <ReactRouterDOM.Routes location={location} key={location.pathname}>
                        <ReactRouterDOM.Route path="/" element={<HomePage />} />
                        <ReactRouterDOM.Route path="/properties" element={<PropertiesPage />} />
                        <ReactRouterDOM.Route path="/properties/:id" element={<PropertyDetailPage />} />
                        <ReactRouterDOM.Route path="/services" element={<ServicesPage />} />
                        <ReactRouterDOM.Route path="/floor-plans" element={<FloorPlansPage />} />
                        <ReactRouterDOM.Route path="/construction" element={<ConstructionPage />} />
                        <ReactRouterDOM.Route path="/interiors" element={<InteriorDesignPage />} />
                        <ReactRouterDOM.Route path="/budget-estimator" element={<BudgetPage />} />
                        <ReactRouterDOM.Route path="/schedule-visit" element={<SchedulerPage />} />
                        <ReactRouterDOM.Route path="/portal/login" element={<ClientPortalLoginPage />} />
                        <ReactRouterDOM.Route path="/portal" element={
                            <ProtectedRoute>
                                <ClientPortalPage />
                            </ProtectedRoute>
                        } />
                        <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
                        <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
                        <ReactRouterDOM.Route path="/faq" element={<FAQPage />} />
                        <ReactRouterDOM.Route path="/saved" element={<SavedPropertiesPage />} />
                        <ReactRouterDOM.Route path="*" element={<NotFoundPage />} />
                    </ReactRouterDOM.Routes>
                </AnimatePresence>
            </main>
            {!isClientPortal && <Footer />}
            {!isClientPortal && <BottomNav />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ReactRouterDOM.HashRouter>
        <AuthProvider>
            <FavoritesProvider>
                <div className="bg-charcoal max-w-lg mx-auto shadow-2xl shadow-golden-yellow/10">
                    <AppContent />
                </div>
            </FavoritesProvider>
        </AuthProvider>
    </ReactRouterDOM.HashRouter>
  );
}

export default App;