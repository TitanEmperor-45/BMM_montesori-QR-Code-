import React, { useState } from 'react';
import { 
  GraduationCap, Calendar, MessageSquare, Heart, 
  Send, CheckCircle2, Sparkles, ExternalLink, ShieldCheck, MapPin, PhoneCall 
} from 'lucide-react';
import { Inquiry, TourBooking, RegistrationSubmission } from '../types';

interface UnifiedAdmissionsHubProps {
  onAddInquiry: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  onAddTour: (tour: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => void;
  onAddRegistration: (reg: Omit<RegistrationSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export const UnifiedAdmissionsHub: React.FC<UnifiedAdmissionsHubProps> = ({
  onAddInquiry,
  onAddTour,
  onAddRegistration
}) => {
  const [activeTab, setActiveTab] = useState<'class' | 'tour' | 'inquiry' | 'register'>('register');
  const [successMsg, setSuccessMsg] = useState('');

  // Inquiry State
  const [inqParent, setInqParent] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqMessage, setInqMessage] = useState('');

  // Tour State
  const [tourParent, setTourParent] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourDate, setTourDate] = useState('2026-10-10');
  const [tourTime, setTourTime] = useState('09:00 AM');
  const [tourAttendees, setTourAttendees] = useState(2);

  // Registration State
  const [regParent, setRegParent] = useState('');
  const [regChild, setRegChild] = useState('');
  const [regDOB, setRegDOB] = useState('2023-01-01');
  const [regProgram, setRegProgram] = useState('Primary Casa Class (3 - 6yrs)');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regSpecial, setRegSpecial] = useState(true);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqParent || !inqPhone) return;
    onAddInquiry({
      parentName: inqParent,
      childName: 'General Inquiry',
      childAge: 'N/A',
      email: inqEmail || 'No email',
      phone: inqPhone,
      inquiryType: 'general',
      message: inqMessage || 'Inquiry from BMMMontesori.netlify.app sync'
    });
    setSuccessMsg('✅ Enquiry successfully sent and synced with BMMMontesori.netlify.app!');
    setInqParent('');
    setInqPhone('');
    setInqEmail('');
    setInqMessage('');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourParent || !tourPhone) return;
    onAddTour({
      parentName: tourParent,
      phone: tourPhone,
      email: 'tour@example.com',
      preferredDate: tourDate,
      preferredTime: tourTime,
      numberOfAttendees: tourAttendees,
      notes: 'Booked via BMMMontesori.netlify.app calendar portal'
    });
    setSuccessMsg('🏫 School Tour successfully booked and synced with BMMMontesori.netlify.app!');
    setTourParent('');
    setTourPhone('');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regParent || !regChild || !regPhone) return;
    onAddRegistration({
      parentName: regParent,
      childName: regChild,
      childDOB: regDOB,
      program: regProgram,
      email: regEmail || 'registration@example.com',
      phone: regPhone,
      address: regAddress || 'Soweto',
      specialNeeds: 'None',
      appliedSpecial: regSpecial
    });
    setSuccessMsg('🎉 2027 Registration successfully submitted and synced with BMMMontesori.netlify.app!');
    setRegParent('');
    setRegChild('');
    setRegPhone('');
    setRegEmail('');
    setRegAddress('');
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-800 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <span className="px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-bold rounded-full mb-3 inline-block">
            BMMMontesori.netlify.app Portal Sync
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-100 mb-2">
            Unified Admissions & Registration Hub
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-6 font-light">
            All submissions update live data synchronized directly with our official website <strong>BMMMontesori.netlify.app</strong>.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://BMMmontesori.netlify.app/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow hover:bg-amber-300 transition"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center space-x-3 shadow-md animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span className="font-bold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Navigation Options requested by user */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button
          onClick={() => setActiveTab('register')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'register' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <GraduationCap className={`w-5 h-5 mb-2 ${activeTab === 'register' ? 'text-amber-300' : 'text-emerald-700'}`} />
          <span className="font-bold text-sm">Registration Form</span>
        </button>

        <button
          onClick={() => setActiveTab('tour')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'tour' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <Calendar className={`w-5 h-5 mb-2 ${activeTab === 'tour' ? 'text-amber-300' : 'text-emerald-700'}`} />
          <span className="font-bold text-sm">Book a School Tour</span>
        </button>

        <button
          onClick={() => setActiveTab('class')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'class' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <Heart className={`w-5 h-5 mb-2 ${activeTab === 'class' ? 'text-amber-300' : 'text-emerald-700'}`} />
          <span className="font-bold text-sm">Be Part of Our Class</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiry')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'inquiry' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <MessageSquare className={`w-5 h-5 mb-2 ${activeTab === 'inquiry' ? 'text-amber-300' : 'text-emerald-700'}`} />
          <span className="font-bold text-sm">Enquiry Form</span>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
        
        {activeTab === 'register' && (
          <form onSubmit={handleRegSubmit} className="space-y-4 animate-fade-in">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                2027 Admissions
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                Official Student Registration Form (BMMMontesori.netlify.app)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={regParent}
                  onChange={(e) => setRegParent(e.target.value)}
                  placeholder="e.g. Palesa Mokoena"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Child's Full Name *</label>
                <input
                  type="text"
                  required
                  value={regChild}
                  onChange={(e) => setRegChild(e.target.value)}
                  placeholder="e.g. Kopano Mokoena"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Child's Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={regDOB}
                  onChange={(e) => setRegDOB(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Select Program *</label>
                <select
                  value={regProgram}
                  onChange={(e) => setRegProgram(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Toddler Community (18m - 3yrs)">Toddler Community (18m - 3yrs)</option>
                  <option value="Primary Casa Class (3 - 6yrs)">Primary Casa Class (3 - 6yrs)</option>
                  <option value="Aftercare Program">Aftercare Program</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+27 76 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Address in Soweto</label>
              <input
                type="text"
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                placeholder="Diepkloof Zone 6, Soweto"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="regSpecial"
                checked={regSpecial}
                onChange={(e) => setRegSpecial(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300"
              />
              <label htmlFor="regSpecial" className="text-xs text-slate-800 font-medium">
                Apply for 2027 Registration Special & Fee Discount
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Registration to BMMMontesori.netlify.app</span>
            </button>
          </form>
        )}

        {activeTab === 'tour' && (
          <form onSubmit={handleTourSubmit} className="space-y-4 animate-fade-in">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                Calendar Booking
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                Book a School Tour / Open Day (October 2026 Weekends)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Parent Full Name *</label>
                <input
                  type="text"
                  required
                  value={tourParent}
                  onChange={(e) => setTourParent(e.target.value)}
                  placeholder="e.g. Zanele Dlamini"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={tourPhone}
                  onChange={(e) => setTourPhone(e.target.value)}
                  placeholder="+27 81 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Select Date</label>
                <select
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="2026-10-10">Sat, Oct 10 (Open Day)</option>
                  <option value="2026-10-11">Sun, Oct 11 (Open Day)</option>
                  <option value="2026-10-17">Sat, Oct 17 (Open Day)</option>
                  <option value="2026-10-18">Sun, Oct 18 (Open Day)</option>
                  <option value="2026-10-24">Sat, Oct 24 (Open Day)</option>
                  <option value="2026-10-25">Sun, Oct 25 (Open Day)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Time Slot</label>
                <select
                  value={tourTime}
                  onChange={(e) => setTourTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Attendees</label>
                <select
                  value={tourAttendees}
                  onChange={(e) => setTourAttendees(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3+ Family</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow transition flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Confirm Calendar Tour Booking (BMMMontesori.netlify.app)</span>
            </button>
          </form>
        )}

        {activeTab === 'class' && (
          <div className="space-y-4 animate-fade-in">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                Montessori Curriculum
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                Be Part of Our Class at BMM-Montessori Soweto
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The FIRST Inclusive Montessori School in the Township! We offer individualised, child-centred learning with small classes, Practical Life, Sensorial, Language, Mathematics, and Cultural Studies.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900">
              <p className="font-bold mb-1">Location:</p>
              <p>Funda Community College, 8642 Diepkloof Zone 6, Soweto</p>
            </div>
            <button
              onClick={() => setActiveTab('register')}
              className="w-full py-3 bg-emerald-900 text-white font-bold rounded-xl text-xs"
            >
              Proceed to Registration Form
            </button>
          </div>
        )}

        {activeTab === 'inquiry' && (
          <form onSubmit={handleInquirySubmit} className="space-y-4 animate-fade-in">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                Enquiry Desk
              </span>
              <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                Send an Enquiry to BMMMontesori.netlify.app
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={inqParent}
                  onChange={(e) => setInqParent(e.target.value)}
                  placeholder="e.g. Thabo Khumalo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={inqPhone}
                  onChange={(e) => setInqPhone(e.target.value)}
                  placeholder="+27 82 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address</label>
              <input
                type="email"
                value={inqEmail}
                onChange={(e) => setInqEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Enquiry Message</label>
              <textarea
                rows={3}
                value={inqMessage}
                onChange={(e) => setInqMessage(e.target.value)}
                placeholder="Ask about fees, age groups or 2027 specials..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Enquiry (BMMMontesori.netlify.app)</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
