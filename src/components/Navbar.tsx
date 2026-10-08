import React from 'react';
import { QrCode, Users, FileText, Layout, MessageSquare, Sparkles, PhoneCall, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  inquiryCount: number;
  tourCount: number;
  onOpenAi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  inquiryCount,
  tourCount,
  onOpenAi
}) => {
  const tabs = [
    { id: 'hub', label: 'Parent Link Hub', icon: Layout },
    { id: 'generator', label: 'QR Code Studio & Edit', icon: QrCode },
    { id: 'calendar', label: 'Tours & Calendar', icon: Calendar, badge: tourCount > 0 ? tourCount : null },
    { id: 'admissions', label: 'Admissions & 2027', icon: Users },
    { id: 'inquiries', label: 'Dashboard (Enquiries)', icon: MessageSquare, badge: inquiryCount > 0 ? inquiryCount : null },
    { id: 'flyers', label: 'Digital Flyers (4)', icon: FileText }
  ];

  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hub')}>
            <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center shadow-md border-2 border-emerald-800">
              <span className="text-emerald-950 font-black text-xl tracking-tighter">BMM</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-amber-200">
                  BMM-Montessori Soweto
                </h1>
                <span className="hidden md:inline-block px-2 py-0.5 text-xs bg-emerald-800 text-emerald-200 rounded-full font-medium border border-emerald-700">
                  ais-pre Live Portal
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-light">
                First Inclusive Montessori School in the Township
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a
              href="https://wa.me/27814977181?text=Hello%20BMM-Montessori%20Soweto,%20I%20would%20like%20to%20inquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-emerald-100 rounded-xl text-xs font-medium transition shadow-sm border border-emerald-600"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onOpenAi}
              className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold rounded-xl text-xs shadow transition transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span className="hidden sm:inline">Kenny's AI Assistant</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-emerald-800/60 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-800/70 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-300'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && tab.badge !== undefined && (
                  <span className={`ml-1.5 px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
