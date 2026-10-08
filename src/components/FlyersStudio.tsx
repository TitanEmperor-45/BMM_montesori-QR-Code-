import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FileText, Download, ExternalLink, Sparkles, PhoneCall } from 'lucide-react';
import { FlyerItem } from '../types';

interface FlyersStudioProps {
  flyers: FlyerItem[];
}

export const FlyersStudio: React.FC<FlyersStudioProps> = ({ flyers }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-8">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
          Digital Marketing Assets
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
          4 Promotional Flyers for BMM-Montessori Soweto
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          High-resolution promotional flyers with embedded QR codes ready for printing, WhatsApp sharing, and social media posting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {flyers.map((flyer, idx) => (
          <div key={flyer.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={flyer.imageUrl} 
                  alt={flyer.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-900/90 backdrop-blur text-amber-300 text-xs font-extrabold rounded-full shadow">
                  Flyer #{idx + 1} • {flyer.tag}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-extrabold text-amber-200">{flyer.title}</h3>
                  <p className="text-xs text-emerald-100 font-medium">{flyer.subtitle}</p>
                </div>
              </div>

              {/* Content & QR Code Section */}
              <div className="p-6">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                  {flyer.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-bold text-emerald-950 block mb-1">Embedded QR Link</span>
                    <span className="text-[11px] font-mono text-emerald-700 truncate block max-w-xs">{flyer.targetUrl}</span>
                    <span className="text-[10px] text-slate-500 mt-1 block">Scan to open directly on parent's phone</span>
                  </div>

                  <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex-shrink-0">
                    <QRCodeSVG
                      value={flyer.targetUrl}
                      size={96}
                      level="M"
                      fgColor="#064e3b"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <a
                href={flyer.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center"
              >
                <span>Test Target URL</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <button
                onClick={() => alert(`Downloading Flyer #${idx + 1} for BMM-Montessori Soweto...`)}
                className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download Flyer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
