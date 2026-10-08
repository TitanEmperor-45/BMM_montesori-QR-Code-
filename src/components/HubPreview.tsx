import React, { useState } from 'react';
import { 
  Instagram, Globe, PhoneCall, Calendar, Sparkles, 
  FileText, ExternalLink, Send, CheckCircle2, Heart, 
  MapPin, Clock, ArrowRight, ShieldCheck, Download
} from 'lucide-react';
import { FlyerItem, Inquiry, TourBooking } from '../types';

interface HubPreviewProps {
  flyers: FlyerItem[];
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  onAddTour: (tour: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => void;
  onNavigateTab: (tab: string) => void;
}

export const HubPreview: React.FC<HubPreviewProps> = ({
  flyers,
  onAddInquiry,
  onAddTour,
  onNavigateTab
}) => {
  const [activeSubView, setActiveSubView] = useState<'hub' | 'inquiry' | 'tour'>('hub');
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Inquiry form state
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'general' | 'fees' | 'tour' | 'registration' | 'special'>('general');
  const [message, setMessage] = useState('');

  // Tour booking state
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('10:00 AM');
  const [attendees, setAttendees] = useState(2);
  const [tourNotes, setTourNotes] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;
    onAddInquiry({
      parentName,
      childName: childName || 'Not specified',
      childAge: childAge || 'Not specified',
      email: email || 'No email provided',
      phone,
      inquiryType,
      message: message || 'General inquiry from hub'
    });
    setSubmittedMessage('Thank you! Your inquiry has been received by BMM-Montessori Soweto. We will contact you shortly.');
    setParentName('');
    setChildName('');
    setChildAge('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmittedMessage(''), 6000);
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone || !tourDate) return;
    onAddTour({
      parentName,
      phone,
      email: email || 'No email provided',
      preferredDate: tourDate,
      preferredTime: tourTime,
      numberOfAttendees: attendees,
      notes: tourNotes
    });
    setSubmittedMessage('School tour successfully requested! We look forward to welcoming you to our campus in Soweto.');
    setParentName('');
    setPhone('');
    setEmail('');
    setTourDate('');
    setTourNotes('');
    setTimeout(() => setSubmittedMessage(''), 6000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Top Banner for Kenny / Admin & Visitors */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-800 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-400 text-emerald-950 rounded-full text-xs font-bold mb-4 shadow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Message from Kenny & Team</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-100 mb-3">
            BMM-Montessori Soweto Community Hub
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-light">
            Thank you so much for everything you are doing for us! It's really appreciated. Access our admissions, book school tours, view our 4 digital flyers, connect via WhatsApp, and explore our registration specials below.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/27821234567?text=Hello%20BMM-Montessori%20Soweto,%20I%20would%20like%20to%20inquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-semibold text-sm shadow-lg transition transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <a
              href="https://BMMmontesori.netlify.app/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-sm shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>Online Registration Link</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => onNavigateTab('generator')}
              className="flex items-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium text-sm backdrop-blur transition border border-white/20"
            >
              <span>Generate QR Codes</span>
            </button>
          </div>
        </div>
      </div>

      {submittedMessage && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center space-x-3 shadow-md animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">{submittedMessage}</span>
        </div>
      )}

      {/* Main Grid: Interactive Mobile Hub Preview vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Phone Mockup Hub (What parents see when scanning QR) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-slate-900 rounded-[40px] p-4 shadow-2xl border-4 border-slate-700 relative">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-full"></div>

            {/* Phone Screen Container */}
            <div className="bg-slate-50 rounded-[32px] pt-8 pb-6 px-4 min-h-[640px] overflow-y-auto text-slate-900 flex flex-col justify-between">
              
              <div>
                {/* School Header inside Phone */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-800 text-amber-300 font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-amber-400">
                    BMM
                  </div>
                  <h3 className="font-bold text-lg text-emerald-950">BMM-Montessori Soweto</h3>
                  <p className="text-xs text-slate-600 flex items-center justify-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-emerald-700" /> Soweto Campus & Admissions
                  </p>
                </div>

                {/* Quick Link Buttons requested by user */}
                <div className="space-y-2.5 mb-6">
                  
                  {/* Registration Link */}
                  <a 
                    href="https://BMMmontesori.netlify.app/registration" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl shadow transition transform active:scale-98 text-xs font-semibold group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-emerald-600 flex items-center justify-center text-amber-300">
                        🎓
                      </span>
                      <span>Registration (New Students)</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition" />
                  </a>

                  {/* Be Part of Our Class */}
                  <button 
                    onClick={() => setActiveSubView('inquiry')}
                    className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-emerald-50 text-emerald-950 rounded-2xl shadow-sm border border-emerald-100 transition text-xs font-medium"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                        🌱
                      </span>
                      <span>Be Part of Our Class</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  {/* Book a School Tour */}
                  <button 
                    onClick={() => setActiveSubView('tour')}
                    className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-amber-50 text-emerald-950 rounded-2xl shadow-sm border border-amber-200 transition text-xs font-medium"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                        🏫
                      </span>
                      <span>Book a School Tour</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-700" />
                  </button>

                  {/* Registration Special */}
                  <button 
                    onClick={() => setActiveSubView('inquiry')}
                    className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl shadow transition text-xs font-bold"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950">
                        ⭐
                      </span>
                      <span>Registration Special & Offers</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </button>

                  {/* Website Link */}
                  <a 
                    href="https://BMMmontesori.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl transition text-xs font-medium"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Globe className="w-4 h-4 text-slate-600 ml-1.5" />
                      <span>BMMmontesori.netlify.app</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>

                  {/* Instagram Link */}
                  <a 
                    href="https://www.instagram.com/bmmmontessori/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow transition text-xs font-medium"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Instagram className="w-4 h-4 ml-1.5" />
                      <span>Instagram @bmmmontessori</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-pink-200" />
                  </a>

                  {/* Direct WhatsApp Link */}
                  <a 
                    href="https://wa.me/27821234567?text=Hello%20BMM-Montessori%20Soweto,%20I%20would%20like%20to%20inquire%20about%20admissions." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow transition text-xs font-medium"
                  >
                    <div className="flex items-center space-x-2.5">
                      <PhoneCall className="w-4 h-4 ml-1.5 text-emerald-200" />
                      <span>Direct WhatsApp Chat</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                  </a>

                </div>

              </div>

              {/* Phone Footer */}
              <div className="text-center pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                <p>BMM-Montessori Soweto • Empowering Young Minds</p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Interactive Forms & Digital Flyers Section */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Subview Selector Tabs */}
          <div className="flex bg-emerald-50 p-1.5 rounded-2xl border border-emerald-200">
            <button
              onClick={() => setActiveSubView('hub')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeSubView === 'hub' ? 'bg-emerald-900 text-white shadow' : 'text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              Hub Overview & 4 Flyers
            </button>
            <button
              onClick={() => setActiveSubView('inquiry')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeSubView === 'inquiry' ? 'bg-emerald-900 text-white shadow' : 'text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              Enquiries Form
            </button>
            <button
              onClick={() => setActiveSubView('tour')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeSubView === 'tour' ? 'bg-emerald-900 text-white shadow' : 'text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              Book School Tour
            </button>
          </div>

          {activeSubView === 'hub' && (
            <div className="space-y-6">
              
              {/* Quick Summary Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-emerald-950 mb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
                  Official Links Included in QR Hub
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">📸 Instagram</span>
                    <a href="https://www.instagram.com/bmmmontessori/?hl=en" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline truncate block">
                      instagram.com/bmmmontessori/?hl=en
                    </a>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">🌐 School Website</span>
                    <a href="https://BMMmontesori.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline truncate block">
                      BMMmontesori.netlify.app
                    </a>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">🎓 Registration Portal</span>
                    <a href="https://BMMmontesori.netlify.app/registration" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline truncate block">
                      BMMmontesori.netlify.app/registration
                    </a>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-900 block mb-1">💬 Direct WhatsApp</span>
                    <span className="text-emerald-700 block">Active chat link with pre-filled message</span>
                  </div>
                </div>
              </div>

              {/* 4 Flyers Showcase */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-emerald-950 flex items-center">
                    <FileText className="w-5 h-5 text-amber-600 mr-2" />
                    4 Digital Promotional Flyers
                  </h3>
                  <button 
                    onClick={() => onNavigateTab('flyers')}
                    className="text-xs font-semibold text-emerald-800 hover:underline flex items-center"
                  >
                    <span>View All & QR Codes</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {flyers.map((flyer, index) => (
                    <div key={flyer.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                      <div>
                        <div className="relative h-36 overflow-hidden bg-slate-100">
                          <img 
                            src={flyer.imageUrl} 
                            alt={flyer.title} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-900/80 backdrop-blur text-amber-300 text-[10px] font-bold rounded-md">
                            Flyer {index + 1} • {flyer.tag}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-emerald-950 text-sm mb-1">{flyer.title}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{flyer.description}</p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                        <span className="text-[11px] text-emerald-800 font-medium">Ready to share</span>
                        <button
                          onClick={() => onNavigateTab('flyers')}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold transition"
                        >
                          View Flyer & QR
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeSubView === 'inquiry' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                  Inquiries & Admissions Desk
                </span>
                <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                  Send an Inquiry to BMM-Montessori Soweto
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Ask about Be Part of Our Class, Registration Specials, age groups, or fee structures.
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Thabo Khumalo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27 82 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Child's Name</label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Lesedi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Child's Age</label>
                    <input
                      type="text"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g. 3 years"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Inquiry Topic</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="fees">Fee Structure & Info</option>
                      <option value="special">Registration Special</option>
                      <option value="tour">School Tour Request</option>
                      <option value="registration">New Student Registration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Your Message / Questions</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about class availability, times, or registration specials..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Inquiry to BMM-Montessori Soweto</span>
                </button>
              </form>
            </div>
          )}

          {activeSubView === 'tour' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                  Campus Visits
                </span>
                <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
                  Book a School Tour in Soweto
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Experience our prepared environment firsthand. Meet our AMI Directresses and see children in action.
                </p>
              </div>

              <form onSubmit={handleTourSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Zanele Dlamini"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+27 73 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Preferred Time</label>
                    <select
                      value={tourTime}
                      onChange={(e) => setTourTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs bg-white"
                    >
                      <option value="09:00 AM">09:00 AM (Morning Circle)</option>
                      <option value="10:30 AM">10:30 AM (Work Cycle)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon Session)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">Number of Visitors</label>
                    <select
                      value={attendees}
                      onChange={(e) => setAttendees(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs bg-white"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 People (Parents)</option>
                      <option value={3}>3+ Family Members</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={tourNotes}
                    onChange={(e) => setTourNotes(e.target.value)}
                    placeholder="Child's age or special questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Confirm School Tour Booking</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
