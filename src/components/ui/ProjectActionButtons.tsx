import React from 'react';
import { motion } from 'motion/react';
import { Eye, Github, ExternalLink, Code2 } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { ProjectItem } from '../../types';

interface ProjectActionButtonsProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onOpenAgentSandbox?: (prompt?: string) => void;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 350, damping: 22 } }
};

export const ProjectActionButtons: React.FC<ProjectActionButtonsProps> = ({
  project,
  onSelectProject,
  onOpenAgentSandbox,
  className = ''
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`flex flex-wrap items-center gap-3 pt-2 ${className}`}
    >
      {/* 1. View / Examine Logic Modal (Primary Red CTA) */}
      <motion.div variants={itemVariants}>
        <AnimatedButton
          variant="primary"
          icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
          onClick={() => onSelectProject(project)}
        >
          View Project
        </AnimatedButton>
      </motion.div>

      {/* 2. Test in AI Sandbox (Parchment Paper Variant) */}
      {onOpenAgentSandbox && (
        <motion.div variants={itemVariants}>
          <AnimatedButton
            variant="paper"
            icon={<Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#9C3B3B]" />}
            onClick={() =>
              onOpenAgentSandbox(
                `Analyze architecture and build a custom component inspired by ${project.title}`
              )
            }
          >
            AI Sandbox
          </AnimatedButton>
        </motion.div>
      )}

      {/* 3. Live Demo (Emerald Green Variant with Pulse & Glow) */}
      {project.demoUrl && (
        <motion.div variants={itemVariants}>
          <AnimatedButton
            variant="success"
            icon={<ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
            href={project.demoUrl}
          >
            Live Demo
          </AnimatedButton>
        </motion.div>
      )}

      {/* 4. GitHub Source (Expanding Card Variant) */}
      {project.githubUrl && (
        <motion.div variants={itemVariants}>
          <AnimatedButton
            variant="github"
            icon={<Github className="w-5 h-5 text-gray-800 dark:text-white" />}
            href={project.githubUrl}
            expandGithubText="View Source"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectActionButtons;
