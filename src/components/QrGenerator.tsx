import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, Download, Copy, Check, Sparkles, 
  Instagram, Globe, PhoneCall, FileText, ExternalLink, Plus, Edit3, Trash2
} from 'lucide-react';
import { QrItem } from '../types';

interface QrGeneratorProps {
  qrItems: QrItem[];
  onAddQrItem: (item: Omit<QrItem, 'id' | 'scanCount'>) => void;
  onUpdateQrItem?: (item: QrItem) => void;
  onDeleteQrItem?: (id: string) => void;
}

export const QrGenerator: React.FC<QrGeneratorProps> = ({ 
  qrItems, 
  onAddQrItem,
  onUpdateQrItem,
  onDeleteQrItem
}) => {
  const [selectedUrl, setSelectedUrl] = useState(qrItems[0]?.url || 'https://BMMmontesori.netlify.app/');
  const [selectedTitle, setSelectedTitle] = useState(qrItems[0]?.title || 'Main School Website');
  const [frameText, setFrameText] = useState(qrItems[0]?.frameText || 'Scan to Visit Website');
  const [qrColor, setQrColor] = useState(qrItems[0]?.qrColor || '#1e3a8a');
  const [bgColor, setBgColor] = useState(qrItems[0]?.bgColor || '#ffffff');
  const [copied, setCopied] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customFrame, setCustomFrame] = useState('Scan Here');
  const [customCategory, setCustomCategory] = useState<'social' | 'admissions' | 'tour' | 'flyer' | 'whatsapp' | 'website'>('admissions');

  const qrRef = useRef<HTMLDivElement>(null);

  const presets = [
    {
      title: 'School Website',
      url: 'https://BMMmontesori.netlify.app/',
      frame: 'Scan to Visit Website',
      color: '#1e3a8a',
      category: 'website'
    },
    {
      title: '2027 Registration Portal',
      url: 'https://BMMmontesori.netlify.app/registration',
      frame: 'Scan for Registration',
      color: '#047857',
      category: 'admissions'
    },
    {
      title: 'Instagram Community',
      url: 'https://www.instagram.com/bmmmontessori/?hl=en',
      frame: 'Follow @bmmmontessori',
      color: '#be185d',
      category: 'social'
    },
    {
      title: 'Direct WhatsApp Chat',
      url: 'https://wa.me/27814977181?text=Hello%20BMM-Montessori%20Soweto,%20I%20would%20like%20to%20inquire%20about%20admissions.',
      frame: 'Chat on WhatsApp',
      color: '#15803d',
      category: 'whatsapp'
    },
    {
      title: 'Weekend Tours & Open Days',
      url: 'https://BMMmontesori.netlify.app/#tour',
      frame: 'Scan for School Tours',
      color: '#b45309',
      category: 'tour'
    }
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedUrl(p.url);
    setSelectedTitle(p.title);
    setFrameText(p.frame);
    setQrColor(p.color);
    setEditingId(null);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(selectedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPng = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 1200;
      canvas.height = 1400;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw frame background box
        ctx.fillStyle = '#ffffff';
        ctx.roundRect(100, 100, 1000, 1200, 40);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw header text
        ctx.fillStyle = '#064e3b';
        ctx.font = 'bold 40px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('BMM-MONTESSORI SOWETO', canvas.width / 2, 180);

        ctx.fillStyle = '#64748b';
        ctx.font = '22px sans-serif';
        ctx.fillText(selectedTitle, canvas.width / 2, 230);

        // Draw QR image
        ctx.drawImage(img, 200, 280, 800, 800);

        // Draw footer badge text
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(frameText, canvas.width / 2, 1160);

        ctx.fillStyle = '#059669';
        ctx.font = '18px sans-serif';
        ctx.fillText('Funda Community College, Diepkloof Zone 6, Soweto', canvas.width / 2, 1210);
      }

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `BMM_Montessori_${selectedTitle.replace(/\s+/g, '_')}_QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle && !selectedTitle) return;

    if (editingId && onUpdateQrItem) {
      onUpdateQrItem({
        id: editingId,
        title: customTitle || selectedTitle,
        url: customUrl || selectedUrl,
        category: customCategory,
        description: 'Updated QR code',
        qrColor,
        bgColor,
        frameText: customFrame || frameText,
        scanCount: 150
      });
      setEditingId(null);
    } else {
      onAddQrItem({
        title: customTitle || selectedTitle,
        url: customUrl || selectedUrl,
        category: customCategory,
        description: 'Custom generated QR code',
        qrColor,
        bgColor,
        frameText: customFrame || frameText
      });
    }

    setCustomTitle('');
    setCustomUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-8">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
          QR Code Studio & Edit View
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
          Generate, Edit & Customize QR Codes for BMM-Montessori
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Create print-ready QR codes for 2027 admissions, weekend tours, WhatsApp, and social media with live editing tools.
        </p>
      </div>

      {/* Preset Quick Links Bar */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Quick Select School Links
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSelectPreset(p)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center space-x-2 ${
                selectedUrl === p.url
                  ? 'bg-emerald-900 text-amber-300 shadow-md'
                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-200'
              }`}
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: QR Code Preview & Download Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl text-center sticky top-24">
          
          <div className="mb-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              BMM-MONTESSORI SOWETO
            </span>
            <h3 className="text-xl font-extrabold text-emerald-950 mt-1">{selectedTitle}</h3>
            <p className="text-xs text-slate-500 truncate px-4 mt-1 font-mono">{selectedUrl}</p>
          </div>

          {/* QR Render Area */}
          <div 
            ref={qrRef}
            className="p-6 bg-slate-50 rounded-3xl border-2 border-emerald-100 shadow-inner inline-block my-4 relative group"
          >
            <div className="absolute top-2 left-2 text-[10px] font-bold text-emerald-800 bg-amber-300 px-2 py-0.5 rounded-md">
              BMM Soweto
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <QRCodeSVG
                value={selectedUrl}
                size={240}
                level="H"
                fgColor={qrColor}
                bgColor={bgColor}
                includeMargin={false}
              />
            </div>
            <div className="mt-3 font-bold text-emerald-950 text-sm tracking-wide">
              {frameText}
            </div>
          </div>

          {/* Download & Copy Actions */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleDownloadPng}
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Print-Ready PNG QR</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyUrl}
                className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-semibold text-xs transition flex items-center justify-center space-x-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied URL!' : 'Copy Link'}</span>
              </button>

              <a
                href={selectedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-1.5"
              >
                <span>Test Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Customization & QR Edit View */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customization Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-950 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
              {editingId ? 'Edit Selected QR Code' : 'Customize QR Code Style & Frame'}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">QR Code Title</label>
                  <input
                    type="text"
                    value={selectedTitle}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Frame Banner Text</label>
                  <input
                    type="text"
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Target URL / Link</label>
                <input
                  type="url"
                  value={selectedUrl}
                  onChange={(e) => setSelectedUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">QR Dot Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 p-0.5"
                    />
                    <span className="text-xs font-mono text-slate-600">{qrColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">Background Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 p-0.5"
                    />
                    <span className="text-xs font-mono text-slate-600">{bgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved QR Code Library & Edit View */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-emerald-950">
                QR Code Library & Edit View ({qrItems.length})
              </h3>
              <span className="text-xs text-slate-500">Click edit to modify any QR code</span>
            </div>
            <div className="space-y-3">
              {qrItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                    selectedUrl === item.url
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div 
                    onClick={() => {
                      setSelectedUrl(item.url);
                      setSelectedTitle(item.title);
                      setFrameText(item.frameText);
                      setQrColor(item.qrColor);
                    }}
                    className="flex items-center space-x-3 cursor-pointer flex-grow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      QR
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-mono truncate max-w-xs">{item.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
                      {item.scanCount} scans
                    </span>
                    <button
                      onClick={() => {
                        setSelectedUrl(item.url);
                        setSelectedTitle(item.title);
                        setFrameText(item.frameText);
                        setQrColor(item.qrColor);
                        setEditingId(item.id);
                      }}
                      className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl transition"
                      title="Edit QR Code"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {onDeleteQrItem && (
                      <button
                        onClick={() => onDeleteQrItem(item.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition"
                        title="Delete QR Code"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
