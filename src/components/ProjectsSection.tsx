import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { 
  ExternalLink, 
  Tag, 
  Zap, 
  ArrowUpRight,
  Bookmark,
  Calendar
} from 'lucide-react';
import { JournalAILine } from './JournalAILine';

interface ProjectsSectionProps {
  searchQuery: string;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAgentSandbox?: (prompt?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  searchQuery, 
  onSelectProject,
  onOpenAgentSandbox 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Agents', 'Full-Stack + AI', 'GenAI', 'Creative Dev', 'Vibe-Code', 'Frontend'];

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.tech.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Title & Category Washi Tape Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#8C8577]/30">
        <div>
          <h2 className="font-journal text-3xl font-bold text-[#20242B] flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-[#9C3B3B]" />
            <span>Project Field Entries ({filteredProjects.length})</span>
          </h2>
          <p className="font-journal text-xs text-[#4B5566] mt-1">
            Dated entries of deployed applications, agent networks, and full-stack systems.
          </p>
        </div>

        {/* Category Washi Tape Filters */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-lg bg-[#EFE6D2] border border-[#BCAE8E]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-typewriter transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9C3B3B] text-[#fbf7ee] font-bold shadow'
                  : 'text-[#20242B] hover:bg-[#DCCFAF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Taped Polaroids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => {
          const rotationClass = index % 3 === 0 ? 'rotate-[-1.5deg]' : index % 3 === 1 ? 'rotate-[1.5deg]' : 'rotate-[-0.5deg]';
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => onSelectProject(project)}
              className={`polaroid-card p-5 rounded-lg cursor-pointer transition-all duration-300 relative flex flex-col justify-between group ${rotationClass}`}
            >
              {/* Corner Washi Tape Accent */}
              <div className="wasi-tape absolute -top-3 left-6 w-16 h-4 washi-tape" />

              <div>
                {/* Header Entry Info */}
                <div className="flex items-center justify-between text-xs font-typewriter text-[#8C8577] mb-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-[#9C3B3B]" />
                    <span>{project.date}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#5C7C74]/20 text-[#2C4A42] font-bold text-[10px]">
                    #{project.category.toLowerCase().replace(/\s+/g, '')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-journal text-xl font-bold text-[#20242B] group-hover:text-[#9C3B3B] transition-colors leading-snug mb-2 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#9C3B3B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                {/* Tagline */}
                <p className="font-journal text-xs sm:text-sm text-[#4B5566] leading-relaxed line-clamp-3 mb-4">
                  {project.tagline}
                </p>
              </div>

              {/* Bottom Tech Pills & Handwritten Caption */}
              <div className="pt-3 border-t border-[#DCCFAF] space-y-2">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#EFE6D2] text-[#20242B] border border-[#BCAE8E] font-typewriter"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.metrics && (
                  <p className="font-handwriting text-sm text-[#20242B] pt-1 italic">
                    Note: {project.metrics}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-lg bg-[#EFE6D2] border border-[#BCAE8E]">
          <p className="font-journal text-lg text-[#20242B]">No field log entries matched your search.</p>
          <button 
            onClick={() => setSelectedCategory('All')} 
            className="mt-4 px-4 py-2 rounded bg-[#9C3B3B] text-[#fbf7ee] text-xs font-typewriter"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* BOTTOM AI QUESTION LINE */}
      <JournalAILine onOpenSandbox={onOpenAgentSandbox} />
    </motion.div>
  );
};
