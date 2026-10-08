import React, { useState } from 'react';
import { 
  MessageSquare, Calendar, GraduationCap, Download, 
  Search, CheckCircle2, PhoneCall, Mail, Trash2, Sparkles, Filter
} from 'lucide-react';
import { Inquiry, TourBooking, RegistrationSubmission } from '../types';

interface InquiriesDashboardProps {
  inquiries: Inquiry[];
  tours: TourBooking[];
  registrations: RegistrationSubmission[];
  onDeleteInquiry: (id: string) => void;
  onDeleteTour: (id: string) => void;
  onDeleteRegistration: (id: string) => void;
}

export const InquiriesDashboard: React.FC<InquiriesDashboardProps> = ({
  inquiries,
  tours,
  registrations,
  onDeleteInquiry,
  onDeleteTour,
  onDeleteRegistration
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'tours' | 'registrations'>('inquiries');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInquiries = inquiries.filter(i => 
    i.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone.includes(searchTerm)
  );

  const filteredTours = tours.filter(t => 
    t.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.phone.includes(searchTerm)
  );

  const filteredRegistrations = registrations.filter(r => 
    r.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm)
  );

  const exportCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === 'inquiries') {
      csvContent += "ID,Parent Name,Child Name,Age,Phone,Email,Type,Message,Date\n";
      inquiries.forEach(i => {
        csvContent += `"${i.id}","${i.parentName}","${i.childName}","${i.childAge}","${i.phone}","${i.email}","${i.inquiryType}","${i.message.replace(/"/g, '""')}","${i.createdAt}"\n`;
      });
    } else if (activeTab === 'tours') {
      csvContent += "ID,Parent Name,Phone,Email,Date,Time,Attendees,Notes,Date\n";
      tours.forEach(t => {
        csvContent += `"${t.id}","${t.parentName}","${t.phone}","${t.email}","${t.preferredDate}","${t.preferredTime}","${t.numberOfAttendees}","${t.notes || ''}","${t.createdAt}"\n`;
      });
    } else {
      csvContent += "ID,Parent Name,Child Name,DOB,Program,Phone,Email,Address,Special Needs,Special Applied,Date\n";
      registrations.forEach(r => {
        csvContent += `"${r.id}","${r.parentName}","${r.childName}","${r.childDOB}","${r.program}","${r.phone}","${r.email}","${r.address}","${r.specialNeeds || ''}","${r.appliedSpecial}","${r.createdAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BMM_Montessori_${activeTab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
            Kenny's Admin Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
            Inquiries, Tours & Registrations Leads
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage incoming parent leads and admissions records for BMM-Montessori Soweto.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow transition self-start"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Export {activeTab} to CSV</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm mb-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'inquiries' ? 'bg-emerald-900 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'tours' ? 'bg-emerald-900 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              School Tours ({tours.length})
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'registrations' ? 'bg-emerald-900 text-white shadow' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Registrations ({registrations.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by parent or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

      </div>

      {/* INQUIRIES LIST */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold">No inquiries found.</p>
            </div>
          ) : (
            filteredInquiries.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full uppercase">
                      {item.inquiryType}
                    </span>
                    <span className="text-xs text-slate-400">{item.createdAt}</span>
                  </div>
                  <h3 className="font-extrabold text-emerald-950 text-base">
                    {item.parentName} <span className="text-xs font-normal text-slate-500">({item.childName}, {item.childAge})</span>
                  </h3>
                  <p className="text-xs text-slate-700 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                    "{item.message}"
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <span className="flex items-center"><PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.phone}</span>
                    <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.parentName)},%20thank%20you%20for%20inquiring%20about%20BMM-Montessori%20Soweto.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp Reply</span>
                  </a>
                  <button
                    onClick={() => onDeleteInquiry(item.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TOURS LIST */}
      {activeTab === 'tours' && (
        <div className="space-y-4">
          {filteredTours.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold">No tour bookings found.</p>
            </div>
          ) : (
            filteredTours.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-full uppercase">
                      Tour: {item.preferredDate} @ {item.preferredTime}
                    </span>
                    <span className="text-xs text-slate-400">Attendees: {item.numberOfAttendees}</span>
                  </div>
                  <h3 className="font-extrabold text-emerald-950 text-base">
                    {item.parentName}
                  </h3>
                  {item.notes && (
                    <p className="text-xs text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-100">
                      Notes: {item.notes}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <span className="flex items-center"><PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.phone}</span>
                    <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.parentName)},%20we%20have%20confirmed%20your%20school%20tour%20at%20BMM-Montessori%20Soweto%20for%20${item.preferredDate}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Confirm Tour</span>
                  </a>
                  <button
                    onClick={() => onDeleteTour(item.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                    title="Delete Tour"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* REGISTRATIONS LIST */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          {filteredRegistrations.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold">No student registrations found.</p>
            </div>
          ) : (
            filteredRegistrations.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-emerald-900 text-amber-300 text-[10px] font-bold rounded-full uppercase">
                      {item.program}
                    </span>
                    {item.appliedSpecial && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full">
                        Special Applied ✨
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-emerald-950 text-base">
                    {item.childName} <span className="text-xs font-normal text-slate-500">(Parent: {item.parentName})</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    DOB: {item.childDOB} • Address: {item.address}
                  </p>
                  {item.specialNeeds && (
                    <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      Notes: {item.specialNeeds}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <span className="flex items-center"><PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.phone}</span>
                    <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {item.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.parentName)},%20we%20have%20received%20the%20registration%20for%20${encodeURIComponent(item.childName)}%20at%20BMM-Montessori%20Soweto!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp Welcome</span>
                  </a>
                  <button
                    onClick={() => onDeleteRegistration(item.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                    title="Delete Registration"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
