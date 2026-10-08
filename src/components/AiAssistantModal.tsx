import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, X, Send, Copy, Check, Bot } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('Write a warm WhatsApp broadcast message for parents about the 2026 registration special at BMM-Montessori Soweto.');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const ai = new GoogleGenAI();
      const model = 'gemini-2.5-flash';
      const result = await ai.models.generateContent({
        model: model,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an expert AI assistant for BMM-Montessori Soweto, a premier Montessori school in Soweto providing toddler and primary education. Kenny is the school administrator. Help Kenny with the following request: ${prompt}`
              }
            ]
          }
        ]
      });

      setResponse(result.text || 'No response generated.');
    } catch (err: any) {
      console.error(err);
      setResponse('Error generating AI response. Please ensure GEMINI_API_KEY is configured in your environment secrets.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-200">Kenny's AI Assistant</h3>
              <p className="text-xs text-emerald-200">Powered by Gemini AI for BMM-Montessori Soweto</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">What would you like AI to write or help with?</label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Write a welcome message for parent tour bookings or WhatsApp broadcast..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2"
            >
              <Bot className="w-4 h-4 text-amber-300 animate-spin" />
              <span>{loading ? 'Generating with Gemini...' : 'Generate AI Message / Broadcast'}</span>
            </button>
          </form>

          {response && (
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Generated Result:</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200 max-h-60 overflow-y-auto">
                {response}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
