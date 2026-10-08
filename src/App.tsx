import React, { useState, useEffect } from 'react';
import { 
  INITIAL_FLYERS, INITIAL_QR_ITEMS, INITIAL_INQUIRIES, 
  INITIAL_TOURS, INITIAL_REGISTRATIONS 
} from './data/initialData';
import { FlyerItem, Inquiry, QrItem, TourBooking, RegistrationSubmission } from './types';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { HubPreview } from './components/HubPreview';
import { QrGenerator } from './components/QrGenerator';
import { CalendarView } from './components/CalendarView';
import { UnifiedAdmissionsHub } from './components/UnifiedAdmissionsHub';
import { InquiriesDashboard } from './components/InquiriesDashboard';
import { FlyersStudio } from './components/FlyersStudio';
import { AiAssistantModal } from './components/AiAssistantModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('hub');
  const [isAiOpen, setIsAiOpen] = useState(false);

  // State with production localStorage real live data saving
  const [flyers] = useState<FlyerItem[]>(INITIAL_FLYERS);
  
  const [qrItems, setQrItems] = useState<QrItem[]>(() => {
    const saved = localStorage.getItem('bmm_qr_items_v3');
    return saved ? JSON.parse(saved) : [
      {
        id: 'master-hub-qr',
        title: 'Master Hub (All Flyers, Tours & Links in One)',
        category: 'website',
        url: 'https://BMMmontesori.netlify.app/',
        description: 'Single Master QR Code containing all 4 flyers, social links, calendar & registration',
        qrColor: '#047857',
        bgColor: '#ffffff',
        frameText: 'Scan for BMM-Montessori Master Hub',
        scanCount: 3410
      },
      ...INITIAL_QR_ITEMS
    ];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('bmm_inquiries_v3');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [tours, setTours] = useState<TourBooking[]>(() => {
    const saved = localStorage.getItem('bmm_tours_v3');
    return saved ? JSON.parse(saved) : INITIAL_TOURS;
  });

  const [registrations, setRegistrations] = useState<RegistrationSubmission[]>(() => {
    const saved = localStorage.getItem('bmm_registrations_v3');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  useEffect(() => {
    localStorage.setItem('bmm_qr_items_v3', JSON.stringify(qrItems));
  }, [qrItems]);

  useEffect(() => {
    localStorage.setItem('bmm_inquiries_v3', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bmm_tours_v3', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('bmm_registrations_v3', JSON.stringify(registrations));
  }, [registrations]);

  const handleAddInquiry = (newInq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const item: Inquiry = {
      ...newInq,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new'
    };
    setInquiries([item, ...inquiries]);
  };

  const handleAddTour = (newTour: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => {
    const item: TourBooking = {
      ...newTour,
      id: `tour-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'confirmed'
    };
    setTours([item, ...tours]);
  };

  const handleAddRegistration = (newReg: Omit<RegistrationSubmission, 'id' | 'createdAt' | 'status'>) => {
    const item: RegistrationSubmission = {
      ...newReg,
      id: `reg-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending_review'
    };
    setRegistrations([item, ...registrations]);
  };

  const handleAddQrItem = (newItem: Omit<QrItem, 'id' | 'scanCount'>) => {
    const item: QrItem = {
      ...newItem,
      id: `qr-${Date.now()}`,
      scanCount: 1
    };
    setQrItems([item, ...qrItems]);
  };

  const handleUpdateQrItem = (updated: QrItem) => {
    setQrItems(qrItems.map(q => q.id === updated.id ? updated : q));
  };

  const handleDeleteQrItem = (id: string) => {
    setQrItems(qrItems.filter(q => q.id !== id));
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries(inquiries.filter(i => i.id !== id));
  };

  const handleDeleteTour = (id: string) => {
    setTours(tours.filter(t => t.id !== id));
  };

  const handleDeleteRegistration = (id: string) => {
    setRegistrations(registrations.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      
      {showLoginModal && (
        <LoginModal
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowLoginModal(false);
          }}
          onContinueAsVisitor={() => {
            setShowLoginModal(false);
          }}
        />
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inquiryCount={inquiries.filter(i => i.status === 'new').length}
        tourCount={tours.length}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow pb-16">
        {activeTab === 'hub' && (
          <HubPreview
            flyers={flyers}
            onAddInquiry={handleAddInquiry}
            onAddTour={handleAddTour}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'generator' && (
          <QrGenerator
            qrItems={qrItems}
            onAddQrItem={handleAddQrItem}
            onUpdateQrItem={handleUpdateQrItem}
            onDeleteQrItem={handleDeleteQrItem}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            tours={tours}
            onAddTour={handleAddTour}
          />
        )}

        {activeTab === 'admissions' && (
          <UnifiedAdmissionsHub
            onAddInquiry={handleAddInquiry}
            onAddTour={handleAddTour}
            onAddRegistration={handleAddRegistration}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesDashboard
            inquiries={inquiries}
            tours={tours}
            registrations={registrations}
            onDeleteInquiry={handleDeleteInquiry}
            onDeleteTour={handleDeleteTour}
            onDeleteRegistration={handleDeleteRegistration}
          />
        )}

        {activeTab === 'flyers' && (
          <FlyersStudio
            flyers={flyers}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-10 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-xs">BMM</span>
            <span className="font-semibold text-amber-300 text-sm">BMM-Montessori Soweto • Funda Community College</span>
          </div>
          <p className="text-emerald-300">
            Website Sync: <a href="https://BMMmontesori.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-mono">BMMMontesori.netlify.app</a> | Admin Status: {isAuthenticated ? <strong className="text-emerald-400">Logged in as Administrator</strong> : <button onClick={() => setShowLoginModal(true)} className="underline text-amber-300">Admin Login</button>}
          </p>
          <p className="text-emerald-100 font-medium pt-2 max-w-2xl mx-auto leading-relaxed">
            Built with ❤️ for BMM-Montessori Soweto community. Created and Designed by Digitilize Africa Founder Kenneth Mathunywa, Publishing by Wisphering Winds Founder Nyasha Micheals, By GOD With Love
          </p>
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

    </div>
  );
}
