import React, { useState } from 'react';
import { JournalCover } from './components/JournalCover';
import { JournalSidebar } from './components/JournalSidebar';
import { JournalLeftPage } from './components/JournalLeftPage';
import { JournalRightPage } from './components/JournalRightPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { FEATURED_PROJECTS } from './data/portfolioData';
import { ProjectItem } from './types';

export default function App() {
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [activeProject, setActiveProject] = useState<ProjectItem>(FEATURED_PROJECTS[0]);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [agentInitialPrompt, setAgentInitialPrompt] = useState<string>('');

  const handleOpenAgentSandbox = (prompt?: string) => {
    if (prompt) {
      setAgentInitialPrompt(prompt);
    }
    setActiveTab('agent-sandbox');
  };

  const handleSelectProject = (project: ProjectItem) => {
    setActiveProject(project);
    if (activeTab !== 'projects') {
      setActiveTab('projects');
    }
  };

  const handleOpenModal = (project: ProjectItem) => {
    setModalProject(project);
  };

  // Render closed cover if user toggles book closed
  if (!isJournalOpen) {
    return <JournalCover onOpenJournal={() => setIsJournalOpen(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F5EFE4] text-[#20242B] p-2 sm:p-6 md:p-10 flex items-center justify-center relative overflow-x-hidden">
      {/* CANVAS DOT GRID PATTERN BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#C8BFB0 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* MAIN TWO-PAGE OPEN NOTEBOOK WITH SPINE SIDEBAR */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-2xl my-4">
        {/* LEFT LEATHER SPINE SIDEBAR */}
        <JournalSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewEntry={() => handleOpenAgentSandbox('Create a new field entry note for my portfolio')}
        />

        {/* TWO-PAGE SPREAD CONTAINER */}
        <main className="flex-1 journal-paper rounded-r-2xl md:rounded-l-none border-y-2 border-r-2 border-[#8C8577]/30 flex flex-col lg:flex-row relative overflow-hidden">
          {/* LEFT PAGE: Ruled Index & Project Names / Bio */}
          <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#8C8577]/25 relative bg-[#FBF7EE]">
            <JournalLeftPage
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onOpenSandbox={handleOpenAgentSandbox}
            />
          </div>

          {/* CENTRAL SPINE / GUTTER SHADOW EFFECT */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/10 via-black/5 to-transparent pointer-events-none z-10" />

          {/* RIGHT PAGE: Content Stream / Selected Project Preview */}
          <div className="lg:w-1/2 bg-[#FDFBF7] relative">
            <JournalRightPage
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeProject={activeProject}
              onSelectProject={handleOpenModal}
              onOpenAgentSandbox={handleOpenAgentSandbox}
            />
          </div>
        </main>
      </div>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onOpenAgentSandbox={handleOpenAgentSandbox}
      />
    </div>
  );
}
