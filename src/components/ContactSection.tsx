import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Send, Mail, MapPin, ExternalLink, Check, Copy, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { JournalAILine } from './JournalAILine';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'GenAI / Full-Stack Project',
    message: ''
  });
  const [isSealed, setIsSealed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSealed(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* SECTION HEADER */}
      <div className="pb-4 border-b border-[#8C8577]/30">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-6 h-6 text-[#9C3B3B]" />
          <h2 className="font-journal text-3xl font-bold text-[#20242B]">
            Postcard · Contact & Correspondence
          </h2>
        </div>
        <p className="font-journal text-xs text-[#4B5566] mt-1">
          Send a handwritten note or correspondence regarding full-time roles & contract builds.
        </p>
      </div>

      {/* HAND-TORN POSTCARD CONTAINER */}
      <div className="p-6 sm:p-10 rounded-lg bg-[#FBF7EE] border-2 border-[#DCCFAF] shadow-lg relative overflow-hidden transform rotate-[-0.5deg]">
        {/* Postcard Stamps & Washi Tape */}
        <div className="wasi-tape absolute -top-3 left-10 w-24 h-4 washi-tape" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Postcard Message Form */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-handwriting text-3xl text-[#9C3B3B] font-bold">
              "Write a message on this postcard…"
            </h3>

            {isSealed ? (
              <div className="p-6 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-center space-y-3">
                <div className="w-16 h-16 rounded-full wax-seal mx-auto flex items-center justify-center text-[#fbf7ee] font-handwriting font-bold text-2xl shadow-lg border-2 border-[#d27575]">
                  PS
                </div>
                <h4 className="font-journal text-2xl font-bold text-[#20242B]">
                  Postcard Stamped & Sealed!
                </h4>
                <p className="font-journal text-xs text-[#4B5566]">
                  Thank you, {formData.name}. Prodip will receive your note and reply to {formData.email} shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSealed(false);
                    setFormData({ name: '', email: '', subject: 'GenAI / Full-Stack Project', message: '' });
                  }}
                  className="px-4 py-2 rounded bg-[#9C3B3B] text-[#fbf7ee] text-xs font-typewriter shadow"
                >
                  Write Another Postcard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-journal text-xs">
                <div>
                  <label className="block font-typewriter text-[#8C8577] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Eleanor Vance"
                    className="w-full py-2 px-1 ruled-question-input text-sm"
                  />
                </div>

                <div>
                  <label className="block font-typewriter text-[#8C8577] mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full py-2 px-1 ruled-question-input text-sm"
                  />
                </div>

                <div>
                  <label className="block font-typewriter text-[#8C8577] mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] font-typewriter text-xs text-[#20242B]"
                  >
                    <option value="GenAI / Full-Stack Project">Full-Stack GenAI Application</option>
                    <option value="LangGraph Multi-Agent Workflows">LangGraph Multi-Agent Workflows</option>
                    <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                    <option value="RAG Pipeline Optimization">RAG Pipeline Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="block font-typewriter text-[#8C8577] mb-1">Message Prose</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note here..."
                    className="w-full p-2 rounded bg-[#EFE6D2] border border-[#BCAE8E] font-journal text-sm text-[#20242B] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#9C3B3B] text-[#fbf7ee] font-typewriter text-xs font-bold shadow-md hover:bg-[#b84343] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-[#fbf7ee]" />
                  <span>Affix Wax Seal & Send Postcard</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT SIDE: Address Side of Postcard */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-dashed border-[#BCAE8E] pt-6 lg:pt-0 lg:pl-8 space-y-6">
            {/* Stamp Box */}
            <div className="flex justify-end">
              <div className="w-16 h-20 bg-[#EFE6D2] border-2 border-dashed border-[#9C3B3B] p-1 flex flex-col items-center justify-between text-center shadow-sm">
                <span className="font-typewriter text-[9px] text-[#9C3B3B] uppercase">Air Mail</span>
                <div className="w-8 h-8 rounded-full wax-seal flex items-center justify-center text-[#fbf7ee] font-handwriting text-xs font-bold">
                  2026
                </div>
                <span className="font-typewriter text-[8px] text-[#8C8577]">FIELD POST</span>
              </div>
            </div>

            {/* Address Lines */}
            <div className="space-y-3 font-handwriting text-2xl text-[#20242B] leading-tight">
              <p className="border-b border-[#DCCFAF] pb-1">To: Prodip Sengupta</p>
              <p className="border-b border-[#DCCFAF] pb-1">Full-stack GenAI Engineer</p>
              <p className="border-b border-[#DCCFAF] pb-1 text-xl text-[#4B5566]">India (Remote Worldwide)</p>
              <p className="border-b border-[#DCCFAF] pb-1 text-lg font-typewriter text-[#9C3B3B]">
                {PROFILE_DATA.email}
              </p>
            </div>

            {/* Quick Copy Email Button */}
            <div className="pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full py-2 px-3 rounded bg-[#EFE6D2] border border-[#BCAE8E] font-typewriter text-xs text-[#20242B] hover:bg-[#DCCFAF] transition-colors flex items-center justify-center space-x-2"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#5C7C74]" /> : <Copy className="w-3.5 h-3.5 text-[#9C3B3B]" />}
                <span>{copiedEmail ? "Email Address Copied!" : "Copy Email Address"}</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2 border-t border-[#DCCFAF] font-typewriter text-xs text-[#4B5566]">
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-[#EFE6D2] hover:bg-[#DCCFAF]"
              >
                <span>GitHub: github.com/prodipsen27</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9C3B3B]" />
              </a>
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-[#EFE6D2] hover:bg-[#DCCFAF]"
              >
                <span>LinkedIn: linkedin.com/in/prodipsen27</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9C3B3B]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine />
    </motion.div>
  );
};
