import React from 'react';
import { ProjectItem } from '../types';
import { X, Sparkles, Github, ExternalLink, Cpu, CheckCircle2, Terminal } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenAgentSandbox: (initialPrompt?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenAgentSandbox
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0c0a]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto leather-card rounded-2xl p-6 sm:p-8 border-2 border-[#8c714a] shadow-2xl text-[#e8ded1] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Right Ribbon Accent */}
        <div className="absolute top-0 right-14 w-8 h-12 gold-ribbon flex items-center justify-center rounded-b-xs shadow-lg">
          <Sparkles className="w-4 h-4 text-[#1a1512]" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1b1613] hover:bg-[#2e241c] border border-[#524336] text-[#c4b5a3] hover:text-[#f7ead9] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-12 space-y-2">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#d4af37]">
            <span className="px-2.5 py-0.5 rounded bg-[#1f1914] border border-[#4d3d2e]">
              {project.category}
            </span>
            <span>•</span>
            <span>{project.date}</span>
          </div>

          <h2 className="font-serif-classic text-3xl sm:text-4xl font-bold text-[#f7ead9] leading-tight">
            {project.title}
          </h2>

          <p className="text-base text-[#c7b7a3] font-sans">
            {project.tagline}
          </p>
        </div>

        {/* Project Description */}
        <div className="space-y-3 pt-2 border-t border-[#3e3227]">
          <h3 className="font-serif-classic text-xl font-bold text-[#f3e5d0] flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-[#d4af37]" />
            <span>System Overview & Architecture</span>
          </h3>
          <p className="text-sm text-[#bda995] leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Architecture Highlights */}
        {project.architectureDetails && (
          <div className="space-y-3 bg-[#1e1814] p-4 rounded-xl border border-[#3e3227]">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2 text-xs text-[#d6c5b3] font-sans">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#a89073]">
            Technologies & Tools Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#181310] text-[#f0e2d1] border border-[#4a3c2f] text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics impact */}
        {project.metrics && (
          <div className="p-3.5 rounded-xl bg-[#231b15] border border-[#524336] text-xs text-[#e8dccb] flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div>
              <span className="font-bold text-[#d4af37]">System Impact: </span>
              <span>{project.metrics}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-[#3e3227]">
          <button
            onClick={() => {
              onClose();
              onOpenAgentSandbox(`Explain how ${project.title} works in detail.`);
            }}
            className="embossed-button px-5 py-2.5 rounded-xl text-xs font-serif-classic font-bold flex items-center space-x-2"
          >
            <Terminal className="w-4 h-4 text-[#d4af37]" />
            <span>Ask Agent About This Project</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#221b15] hover:bg-[#2d221a] border border-[#483b2f] text-xs font-serif-classic font-semibold text-[#d4c2ad] flex items-center space-x-2 transition-colors"
          >
            <Github className="w-4 h-4 text-[#d4af37]" />
            <span>GitHub Repository</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#c89d58] hover:bg-[#b08443] border border-[#d4af37] text-xs font-serif-classic font-bold text-[#1a1512] flex items-center space-x-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#1a1512]" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
