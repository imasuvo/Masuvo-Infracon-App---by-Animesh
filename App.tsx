import React from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
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
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';

const AppContent: React.FC = () => {
    // FIX: Using useLocation from the namespace import.
    const location = ReactRouterDOM.useLocation();
    const isClientPortal = location.pathname.startsWith('/portal');

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {!isClientPortal && <Header />}
            <main className="flex-grow pb-20">
                {/* FIX: Using Routes and Route from the namespace import. */}
                <ReactRouterDOM.Routes>
                    <ReactRouterDOM.Route path="/" element={<HomePage />} />
                    <ReactRouterDOM.Route path="/properties" element={<PropertiesPage />} />
                    <ReactRouterDOM.Route path="/properties/:id" element={<PropertyDetailPage />} />
                    <ReactRouterDOM.Route path="/services" element={<ServicesPage />} />
                    <ReactRouterDOM.Route path="/construction" element={<ConstructionPage />} />
                    <ReactRouterDOM.Route path="/interiors" element={<InteriorDesignPage />} />
                    <ReactRouterDOM.Route path="/budget-estimator" element={<BudgetPage />} />
                    <ReactRouterDOM.Route path="/schedule-visit" element={<SchedulerPage />} />
                    <ReactRouterDOM.Route path="/portal" element={<ClientPortalPage />} />
                    <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
                    <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
                    <ReactRouterDOM.Route path="/faq" element={<FAQPage />} />
                </ReactRouterDOM.Routes>
            </main>
            {!isClientPortal && <Footer />}
            {!isClientPortal && <BottomNav />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    // FIX: Using HashRouter from the namespace import.
    <ReactRouterDOM.HashRouter>
        <div className="bg-charcoal max-w-lg mx-auto shadow-2xl shadow-golden-yellow/10">
            <AppContent />
        </div>
    </ReactRouterDOM.HashRouter>
  );
}

export default App;