import React from 'react';
// FIX: Changed react-router-dom import to named imports to resolve export errors.
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import FloorPlansPage from './pages/FloorPlansPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
    // FIX: Using useLocation from the named import.
    const location = useLocation();
    const isClientPortal = location.pathname.startsWith('/portal');

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {!isClientPortal && <Header />}
            <main className="flex-grow pb-20">
                <AnimatePresence mode="wait">
                    {/* FIX: Using Routes and Route from the named imports. */}
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/properties" element={<PropertiesPage />} />
                        <Route path="/properties/:id" element={<PropertyDetailPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/floor-plans" element={<FloorPlansPage />} />
                        <Route path="/construction" element={<ConstructionPage />} />
                        <Route path="/interiors" element={<InteriorDesignPage />} />
                        <Route path="/budget-estimator" element={<BudgetPage />} />
                        <Route path="/schedule-visit" element={<SchedulerPage />} />
                        <Route path="/portal" element={<ClientPortalPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/saved" element={<SavedPropertiesPage />} />
                    </Routes>
                </AnimatePresence>
            </main>
            {!isClientPortal && <Footer />}
            {!isClientPortal && <BottomNav />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    // FIX: Using HashRouter from the named import.
    <HashRouter>
        <FavoritesProvider>
            <div className="bg-charcoal max-w-lg mx-auto shadow-2xl shadow-golden-yellow/10">
                <AppContent />
            </div>
        </FavoritesProvider>
    </HashRouter>
  );
}

export default App;