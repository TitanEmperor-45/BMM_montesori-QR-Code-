import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, PhoneCall, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { TourBooking } from '../types';

interface CalendarViewProps {
  tours: TourBooking[];
  onAddTour: (tour: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tours, onAddTour }) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-10');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendees, setAttendees] = useState(2);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  // Open Day dates from flyer: Oct 10-11, 17-18, 24-25, 2026 (Saturdays & Sundays)
  const openDayDates = [
    { date: '2026-10-10', label: 'Saturday, Oct 10 (Open Day)' },
    { date: '2026-10-11', label: 'Sunday, Oct 11 (Open Day)' },
    { date: '2026-10-17', label: 'Saturday, Oct 17 (Open Day)' },
    { date: '2026-10-18', label: 'Sunday, Oct 18 (Open Day)' },
    { date: '2026-10-24', label: 'Saturday, Oct 24 (Open Day)' },
    { date: '2026-10-25', label: 'Sunday, Oct 25 (Open Day)' },
    { date: '2026-10-13', label: 'Tuesday, Oct 13 (Weekday Tour)' },
    { date: '2026-10-15', label: 'Thursday, Oct 15 (Weekday Tour)' },
    { date: '2026-10-20', label: 'Tuesday, Oct 20 (Weekday Tour)' },
    { date: '2026-10-22', label: 'Thursday, Oct 22 (Weekday Tour)' },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;
    onAddTour({
      parentName,
      phone,
      email: email || 'No email provided',
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      numberOfAttendees: attendees,
      notes
    });
    setSuccess(true);
    setParentName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-8">
        <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
          Open Days & Tour Calendar 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
          BMM-Montessori Soweto Viewing Schedule
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Weekends: 09:00 AM – 11:00 AM (Oct 10-11, 17-18, 24-25) | Weekdays: Tue & Thu by appointment at Funda Community College, Diepkloof Zone 6, Soweto.
        </p>
      </div>

      {success && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center space-x-3 shadow-md">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span className="font-bold text-sm">School Tour successfully booked! We look forward to welcoming you to our campus.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Calendar Date Selection & Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-950 mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 text-emerald-600 mr-2" />
              Select Viewing Date & Time Slot
            </h3>

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-slate-700">Available Open Day & Tour Dates</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {openDayDates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3 rounded-2xl border text-left transition text-xs font-medium flex items-center justify-between ${
                      selectedDate === d.date
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow'
                        : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{d.label}</span>
                    <CalendarIcon className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {['09:00 AM', '10:00 AM', '11:00 AM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                      selectedTime === time
                        ? 'bg-amber-400 text-slate-950 border-amber-500 shadow'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center space-x-2 font-bold">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Location: Funda Community College, 8642 Diepkloof Zone 6, Soweto</span>
              </div>
              <p className="text-emerald-800">
                Contacts: Mapule Chuene (082 228 5300) | Zani Jacobs WhatsApp (081 497 7181)
              </p>
            </div>
          </div>

          {/* Already Booked Tours list */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-emerald-950 text-sm mb-3 flex items-center">
              <Users className="w-4 h-4 text-amber-600 mr-2" />
              Confirmed Tour Bookings on Calendar ({tours.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tours.map(t => (
                <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-950">{t.parentName}</span>
                    <span className="text-slate-500 block">Date: {t.preferredDate} @ {t.preferredTime}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-full font-bold text-[10px]">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
              Instant Booking
            </span>
            <h3 className="text-xl font-extrabold text-emerald-950 mt-2">
              Book Tour for {selectedDate} @ {selectedTime}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Fill in your contact info to confirm your slot for the open day or school tour.
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Parent / Guardian Full Name *</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Lerato Molefe"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Number of Visitors</label>
                <select
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-emerald-600"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Additional Notes (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Child's age, specific questions..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-lg transition flex items-center justify-center space-x-2"
            >
              <CalendarIcon className="w-4 h-4 text-amber-300" />
              <span>Confirm Calendar Tour Booking</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
