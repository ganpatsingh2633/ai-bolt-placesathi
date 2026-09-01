import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SupportScreen: React.FC = () => {
  const { showToast } = useApp();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Placement Drive Eligibility');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    showToast('Support Ticket Raised', 'Placement Training Cell has received your query. Ticket #TPO-8492 created.', 'success');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Placement Cell Support &amp; Helpdesk
        </h1>
        <p className="text-sm md:text-base text-zinc-500 dark:text-[#a1a1aa] mt-1">
          Reach out to training coordinators, verify academic credentials, or resolve technical issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {/* FAQs and Officers */}
        <div className="col-span-1 md:col-span-7 space-y-4 md:space-y-5">
          <div className="bento-card">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              <details className="group border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] p-3 open:bg-zinc-50 dark:open:bg-[#161616] transition-colors">
                <summary className="font-semibold text-xs md:text-sm text-zinc-900 dark:text-gray-200 cursor-pointer flex justify-between items-center">
                  What is the minimum CGPA cutoff for Day 1 product companies?
                  <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform text-[#7c3aed]">expand_more</span>
                </summary>
                <p className="text-xs text-zinc-600 dark:text-[#a1a1aa] mt-2 pt-2 border-t border-[#e4e4e7] dark:border-[#222222]">
                  Most Tier 1 product companies require a minimum of 7.50 to 8.00 CGPA with no active backlogs. Your current 8.70 CGPA qualifies you for 100% of open campus drives.
                </p>
              </details>

              <details className="group border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] p-3 open:bg-zinc-50 dark:open:bg-[#161616] transition-colors">
                <summary className="font-semibold text-xs md:text-sm text-zinc-900 dark:text-gray-200 cursor-pointer flex justify-between items-center">
                  How are Aptitude Accuracy scores calculated?
                  <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform text-[#7c3aed]">expand_more</span>
                </summary>
                <p className="text-xs text-zinc-600 dark:text-[#a1a1aa] mt-2 pt-2 border-t border-[#e4e4e7] dark:border-[#222222]">
                  Accuracy is computed as the rolling average of your last 10 completed sets across Quantitative, Logical, and Verbal Ability tests.
                </p>
              </details>

              <details className="group border border-[#e4e4e7] dark:border-[#222222] rounded-[12px] p-3 open:bg-zinc-50 dark:open:bg-[#161616] transition-colors">
                <summary className="font-semibold text-xs md:text-sm text-zinc-900 dark:text-gray-200 cursor-pointer flex justify-between items-center">
                  How can I update my official College ID or Branch?
                  <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform text-[#7c3aed]">expand_more</span>
                </summary>
                <p className="text-xs text-zinc-600 dark:text-[#a1a1aa] mt-2 pt-2 border-t border-[#e4e4e7] dark:border-[#222222]">
                  Official institutional IDs and academic branch identifiers are locked to prevent inadvertent discrepancies during employer background verification. Submit a ticket to the registrar below to request modification.
                </p>
              </details>
            </div>
          </div>

          <div className="bento-card">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
              Training &amp; Placement Officers (TPO)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-zinc-50 dark:bg-[#161616] rounded-[12px] border border-[#e4e4e7] dark:border-[#222222]">
                <p className="font-bold text-xs text-zinc-900 dark:text-white">Dr. R. Sharma</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">Head of Corporate Relations</p>
                <p className="text-xs text-[#7c3aed] dark:text-[#a78bfa] mt-1 font-mono">tpo.office@university.edu</p>
              </div>
              <div className="p-3.5 bg-zinc-50 dark:bg-[#161616] rounded-[12px] border border-[#e4e4e7] dark:border-[#222222]">
                <p className="font-bold text-xs text-zinc-900 dark:text-white">Prof. Priya Sen</p>
                <p className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">Technical Assessment Coordinator</p>
                <p className="text-xs text-[#7c3aed] dark:text-[#a78bfa] mt-1 font-mono">dsa.aptitude@university.edu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="col-span-1 md:col-span-5">
          <div className="bento-card">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#7c3aed] dark:text-[#a78bfa]">send</span>
              Submit Query / Grievance
            </h3>
            <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mb-4">
              Average response time: &lt; 4 hours during drive season.
            </p>

            <form onSubmit={handleSubmitTicket} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Discrepancy in Google OA Shortlist"
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] px-3.5 py-2 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                >
                  <option value="Placement Drive Eligibility" className="bg-white dark:bg-[#18181b]">Placement Drive Eligibility</option>
                  <option value="OA Link / Proctoring Issue" className="bg-white dark:bg-[#18181b]">OA Link / Proctoring Issue</option>
                  <option value="Resume Verification" className="bg-white dark:bg-[#18181b]">Resume Verification</option>
                  <option value="Offer Letter Guidance" className="bg-white dark:bg-[#18181b]">Offer Letter Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Message Description</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your issue with company name, roll number, and specific details..."
                  className="w-full border border-[#e4e4e7] dark:border-[#222222] rounded-[10px] p-3 text-xs md:text-sm bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-gray-200 outline-none focus:border-[#7c3aed]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs md:text-sm py-2.5 rounded-[10px] active:scale-95 transition-all shadow-[0_0_15px_#7c3aed40] cursor-pointer"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
