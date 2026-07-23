import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Sparkles, Mail, User, MessageSquare, Tag, Loader2, AlertCircle } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

const FORMSPREE_ID = "mdawjoog";
type Status = "idle" | "sending" | "success" | "error";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack GenAI Application',
    message: ''
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 select-none"
    >
      {/* SECTION HEADER */}
      <div className="pb-3 border-b border-[#8C8577]/30 flex items-center justify-between">
        <div>
          <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-widest block">
            DISPATCH FORM · DIRECT CORRESPONDENCE
          </span>
          <h2 className="font-journal italic text-2xl sm:text-3xl font-bold text-[#20242B]">
            Send Email Inquiry
          </h2>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#EFE6D2] border border-[#BCAE8E] text-[10px] font-typewriter text-[#8C8577]">
          <Mail className="w-3.5 h-3.5 text-[#9C3B3B]" />
          <span>TO: {PROFILE_DATA.email}</span>
        </div>
      </div>

      {/* FORM PARCHMENT CONTAINER */}
      <div className="p-5 sm:p-7 rounded-xl bg-[#FBF7EE] border-2 border-[#DCCFAF] shadow-md relative overflow-hidden">
        {/* WASHI TAPE TOP RIGHT */}
        <div className="wasi-tape absolute -top-3 right-8 w-20 h-4 washi-tape rotate-[1deg] z-10" />

        {status === 'success' ? (
          /* SUBMITTED STATE */
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 sm:p-8 rounded-lg bg-[#EFE6D2] border-2 border-[#9C3B3B] text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-full wax-seal mx-auto flex items-center justify-center text-[#FBF7EE] font-handwriting font-bold text-3xl shadow-xl border-4 border-[#d27575] relative">
              <Sparkles className="w-4 h-4 text-[#FFD700] absolute top-2 right-2 animate-spin-slow" />
              PS
            </div>

            <div>
              <span className="font-typewriter text-[10px] text-[#9C3B3B] font-bold uppercase tracking-widest block">
                DISPATCH SEALED & TRANSMITTED VIA FORMSPREE
              </span>
              <h3 className="font-journal text-2xl font-bold text-[#20242B] mt-1">
                Thank you, {formData.name}!
              </h3>
              <p className="font-journal text-xs sm:text-sm text-[#4B5566] max-w-md mx-auto mt-2 leading-relaxed">
                Your message has been delivered to Prodip Sengupta's inbox. A response will be dispatched to <span className="font-typewriter font-bold text-[#9C3B3B]">{formData.email}</span> shortly.
              </p>
            </div>

            <button
              onClick={() => {
                setStatus('idle');
                setFormData({ name: '', email: '', subject: 'Full-Stack GenAI Application', message: '' });
              }}
              className="px-5 py-2.5 rounded bg-[#9C3B3B] text-[#FBF7EE] font-typewriter text-xs font-bold hover:bg-[#b84343] transition-colors shadow-md inline-flex items-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </motion.div>
        ) : (
          /* EMAIL FORM */
          <form onSubmit={handleSubmit} className="space-y-4 font-journal text-xs sm:text-sm">
            {status === 'error' && (
              <div className="p-3 rounded bg-[#FADBD8] border border-[#E74C3C] text-[#78281F] font-typewriter text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-[#E74C3C] shrink-0" />
                <span>Transmission error. Please check internet connection or retry shortly.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* NAME INPUT */}
              <div>
                <label className="flex items-center space-x-1.5 font-typewriter text-[10px] text-[#8C8577] font-bold uppercase mb-1">
                  <User className="w-3.5 h-3.5 text-[#9C3B3B]" />
                  <span>Your Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Eleanor Vance"
                  className="w-full py-2 px-2 ruled-question-input text-sm font-journal bg-[#FBF7EE]"
                />
              </div>

              {/* EMAIL INPUT */}
              <div>
                <label className="flex items-center space-x-1.5 font-typewriter text-[10px] text-[#8C8577] font-bold uppercase mb-1">
                  <Mail className="w-3.5 h-3.5 text-[#9C3B3B]" />
                  <span>Your Return Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="eleanor@example.com"
                  className="w-full py-2 px-2 ruled-question-input text-sm font-journal bg-[#FBF7EE]"
                />
              </div>
            </div>

            {/* SUBJECT SELECTOR */}
            <div>
              <label className="flex items-center space-x-1.5 font-typewriter text-[10px] text-[#8C8577] font-bold uppercase mb-1">
                <Tag className="w-3.5 h-3.5 text-[#9C3B3B]" />
                <span>Inquiry Subject / Domain</span>
              </label>
              <select
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 rounded bg-[#EFE6D2] border border-[#BCAE8E] font-typewriter text-xs text-[#20242B] focus:outline-none focus:border-[#9C3B3B]"
              >
                <option value="Full-Stack GenAI Application">Full-Stack GenAI Application</option>
                <option value="LangGraph Multi-Agent Workflows">LangGraph Multi-Agent Workflows</option>
                <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                <option value="RAG Pipeline & Vector Search">RAG Pipeline & Vector Search</option>
                <option value="General Consultation / Greeting">General Consultation / Greeting</option>
              </select>
            </div>

            {/* MESSAGE PROSE */}
            <div>
              <label className="flex items-center space-x-1.5 font-typewriter text-[10px] text-[#8C8577] font-bold uppercase mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#9C3B3B]" />
                <span>Message Prose</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your note or project scope here..."
                className="w-full p-3 rounded-lg bg-[#EFE6D2]/70 border border-[#BCAE8E] font-journal text-sm text-[#20242B] focus:outline-none focus:border-[#9C3B3B] focus:bg-[#EFE6D2] leading-relaxed resize-none"
              />
            </div>

            {/* SUBMIT BUTTON WITH WAX SEAL STAMP STYLE */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 px-4 rounded-lg bg-[#9C3B3B] text-[#FBF7EE] font-typewriter text-xs font-bold shadow-md hover:bg-[#b84343] disabled:opacity-60 transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#FBF7EE] animate-spin" />
                  <span>TRANSMITTING DISPATCH...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#FBF7EE] group-hover:translate-x-1 transition-transform" />
                  <span>AFFIX WAX SEAL & TRANSMIT DISPATCH</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center font-typewriter text-[10px] text-[#8C8577] flex items-center justify-center space-x-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6B58]" />
        <span>DIRECT FIELD LOG CHANNEL · PRODIP SENGUPTA PORTFOLIO</span>
      </div>
    </motion.div>
  );
};
