import React, { useState } from 'react';
import { 
  GraduationCap, Calendar, Sparkles, Send, CheckCircle2, 
  Heart, BookOpen, Award, Users, ShieldCheck, Check
} from 'lucide-react';
import { RegistrationSubmission, TourBooking } from '../types';

interface AdmissionsPortalProps {
  onAddRegistration: (reg: Omit<RegistrationSubmission, 'id' | 'createdAt' | 'status'>) => void;
  onAddTour: (tour: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => void;
}

export const AdmissionsPortal: React.FC<AdmissionsPortalProps> = ({
  onAddRegistration,
  onAddTour
}) => {
  const [activeSection, setActiveSection] = useState<'class' | 'tour' | 'special' | 'register'>('class');
  const [successMsg, setSuccessMsg] = useState('');

  // Registration Form State
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childDOB, setChildDOB] = useState('');
  const [program, setProgram] = useState('Toddler Community (18m - 3yrs)');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [appliedSpecial, setAppliedSpecial] = useState(true);

  // Tour Booking State
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('10:00 AM');
  const [attendees, setAttendees] = useState(2);
  const [tourNotes, setTourNotes] = useState('');

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !childName || !phone) return;
    onAddRegistration({
      parentName,
      childName,
      childDOB: childDOB || '2023-01-01',
      program,
      email: email || 'No email provided',
      phone,
      address: address || 'Soweto',
      specialNeeds,
      appliedSpecial
    });
    setSuccessMsg('🎉 Registration successfully submitted for BMM-Montessori Soweto! Our admissions team will contact you within 24 hours.');
    setParentName('');
    setChildName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setSpecialNeeds('');
    setTimeout(() => setSuccessMsg(''), 7000);
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
    setSuccessMsg('🏫 School tour successfully requested! We look forward to hosting you on campus.');
    setParentName('');
    setPhone('');
    setEmail('');
    setTourDate('');
    setTourNotes('');
    setTimeout(() => setSuccessMsg(''), 7000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
          BMM-Montessori Soweto Admissions
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
          Admissions, Tours & Registration Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Everything parents need to join our wonderful Montessori family in Soweto.
        </p>
      </div>

      {successMsg && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center space-x-3 shadow-md animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Section Switcher Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button
          onClick={() => setActiveSection('class')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeSection === 'class'
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
              : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Heart className={`w-5 h-5 ${activeSection === 'class' ? 'text-amber-300' : 'text-emerald-700'}`} />
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Section 1</span>
          </div>
          <span className="font-bold text-sm sm:text-base">Be Part of Our Class</span>
        </button>

        <button
          onClick={() => setActiveSection('tour')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeSection === 'tour'
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
              : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className={`w-5 h-5 ${activeSection === 'tour' ? 'text-amber-300' : 'text-emerald-700'}`} />
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Section 2</span>
          </div>
          <span className="font-bold text-sm sm:text-base">Book a School Tour</span>
        </button>

        <button
          onClick={() => setActiveSection('special')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeSection === 'special'
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
              : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className={`w-5 h-5 ${activeSection === 'special' ? 'text-amber-300' : 'text-emerald-700'}`} />
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Section 3</span>
          </div>
          <span className="font-bold text-sm sm:text-base">Registration Special</span>
        </button>

        <button
          onClick={() => setActiveSection('register')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeSection === 'register'
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
              : 'bg-white text-emerald-950 border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <GraduationCap className={`w-5 h-5 ${activeSection === 'register' ? 'text-amber-300' : 'text-emerald-700'}`} />
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Section 4</span>
          </div>
          <span className="font-bold text-sm sm:text-base">Registration Form</span>
        </button>
      </div>

      {/* SECTION 1: BE PART OF OUR CLASS */}
      {activeSection === 'class' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-3xl p-8 shadow-lg">
            <div className="max-w-3xl">
              <span className="px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-bold rounded-full mb-3 inline-block">
                Montessori Philosophy & Programs
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100 mb-4">
                Be Part of Our Class at BMM-Montessori Soweto
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-light">
                We provide a deeply nurturing prepared environment where children discover independence, respect, concentration, and joy in learning. Our AMI-certified approach empowers young minds to build strong foundations for life.
              </p>
              <button
                onClick={() => setActiveSection('register')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-sm transition shadow"
              >
                Enroll Your Child Today
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                🌱
              </div>
              <h4 className="font-bold text-emerald-950 text-base mb-2">Toddler Community (18m - 3yrs)</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Focuses on language development, motor coordination, grace and courtesy, and independence in self-care.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Toilet independence guidance</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Sensory exploration materials</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-4">
                🏫
              </div>
              <h4 className="font-bold text-emerald-950 text-base mb-2">Primary Casa Class (3 - 6yrs)</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Mixed-age classrooms where older children mentor younger peers. Covers practical life, mathematics, sensorial, culture, and language.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Self-directed work cycles</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Early reading & arithmetic</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                ✨
              </div>
              <h4 className="font-bold text-emerald-950 text-base mb-2">Aftercare & Enrichment</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Safe, stimulating afternoon care with storytelling, outdoor play, arts and crafts, and creative movement.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Extended hours available</li>
                <li className="flex items-center"><Check className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Nutritious snack options</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: BOOK A SCHOOL TOUR */}
      {activeSection === 'tour' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
              Schedule a Visit
            </span>
            <h3 className="text-2xl font-extrabold text-emerald-950 mt-2">Book Your Personal School Tour</h3>
            <p className="text-xs text-slate-600 mt-1">
              Come see our vibrant classrooms in Soweto. Tours last approximately 45 minutes.
            </p>
          </div>

          <form onSubmit={handleTourSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Lerato Molefe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 81 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Preferred Time</label>
                <select
                  value={tourTime}
                  onChange={(e) => setTourTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Attendees</label>
                <select
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults (Both Parents)</option>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Notes or Child's Age</label>
              <textarea
                rows={2}
                value={tourNotes}
                onChange={(e) => setTourNotes(e.target.value)}
                placeholder="Tell us a little about your child..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Confirm School Tour Booking</span>
            </button>
          </form>
        </div>
      )}

      {/* SECTION 3: REGISTRATION SPECIAL */}
      {activeSection === 'special' && (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-800 text-slate-950 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 text-7xl opacity-20">🎁</div>
            <span className="px-3 py-1 bg-slate-950 text-amber-300 text-xs font-bold rounded-full mb-4 inline-block">
              Limited Time Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-3">
              2026 Registration Special & Fee Discount
            </h3>
            <p className="text-slate-900 text-sm sm:text-base leading-relaxed mb-6 font-medium max-w-2xl">
              Enroll your child for the 2026 academic year before the end of the month and receive a special discounted registration rate plus waiver of enrollment assessment fees!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setAppliedSpecial(true);
                  setActiveSection('register');
                }}
                className="px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-2xl font-bold text-sm shadow transition"
              >
                Claim Registration Special Now
              </button>
              <a
                href="https://wa.me/27821234567?text=Hello%20Kenny,%20I%20would%20like%20to%20claim%20the%20Registration%20Special%20for%20BMM-Montessori%20Soweto."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/90 hover:bg-white text-slate-950 rounded-2xl font-bold text-sm shadow transition flex items-center space-x-2"
              >
                <span>Inquire via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-emerald-950 text-base mb-3 flex items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
                What's Included in the Special
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduced registration fee for early applicants</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complimentary Montessori starter pack for new students</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Priority placement in Toddler or Primary Casa classes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-emerald-950 text-base mb-3 flex items-center">
                <Award className="w-5 h-5 text-amber-600 mr-2" />
                How to Qualify
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Simply complete the online registration form through our hub, scan the QR code from our flyers, or mention the promo code <strong className="text-emerald-900">BMM2026SPECIAL</strong> when contacting Kenny on WhatsApp.
              </p>
              <button
                onClick={() => setActiveSection('register')}
                className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl font-bold text-xs transition"
              >
                Proceed to Registration Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: REGISTRATION FORM */}
      {activeSection === 'register' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
              New Student Admissions
            </span>
            <h3 className="text-2xl font-extrabold text-emerald-950 mt-2">Online Registration Form</h3>
            <p className="text-xs text-slate-600 mt-1">
              BMM-Montessori Soweto • Secure your child's placement for 2026.
            </p>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Parent / Guardian Full Name *</label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Palesa Mokoena"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Child's Full Name *</label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
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
                  value={childDOB}
                  onChange={(e) => setChildDOB(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Select Program *</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
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
                <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 76 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Home Address / Location in Soweto *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Orlando West, Soweto"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Medical, Dietary or Special Needs Notes</label>
              <textarea
                rows={2}
                value={specialNeeds}
                onChange={(e) => setSpecialNeeds(e.target.value)}
                placeholder="Any allergies or specific requirements we should know..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="specialCheck"
                checked={appliedSpecial}
                onChange={(e) => setAppliedSpecial(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <label htmlFor="specialCheck" className="text-xs text-slate-800 font-medium cursor-pointer">
                Apply for the <strong className="text-emerald-900">2026 Registration Special & Fee Discount</strong>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Registration to BMM-Montessori Soweto</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
