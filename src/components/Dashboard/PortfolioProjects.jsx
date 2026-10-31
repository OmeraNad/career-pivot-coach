import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { FolderGit2, Sparkles, CheckCircle2, ExternalLink, Code2, Layers, Clock, ArrowRight } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

export default function PortfolioProjects() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role && user.prefs.role !== 'beginner' ? user.prefs.role : 'Full Stack Developer';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;
  const projects = roleConfig.portfolioProjects || [];

  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (projId, stepIdx) => {
    const key = `${projId}-${stepIdx}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#1e2019]">{t('dashboard.tabs.projects') || 'Portfolio Project Roadmap'}</h1>
            <span className="text-xs bg-[#edf1e6] text-[#455633] border border-[#d6dec8] px-2.5 py-0.5 rounded-full font-semibold">
              Matched to {targetRole} Gaps
            </span>
          </div>
          <p className="text-[#636659] text-sm">
            Recruiters don't hire based on course certificates — they hire based on working code. These projects are crafted specifically to eliminate your identified skill gaps.
          </p>
        </div>
      </div>

      {/* Why Projects Beat Certs Banner */}
      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#556b2f] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-[#1e2019] font-bold text-sm mb-1">Mentor Rule: 2 Great Projects Beat 20 Certificates</h3>
          <p className="text-[#4b4e43] text-xs leading-relaxed">
            Each project below addresses at least 2 of your critical skill gaps simultaneously. When you link these live demo URLs and GitHub repos on your resume, you jump into the top 10% of applicants.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((proj) => {
          return (
            <div 
              key={proj.id} 
              className="bg-white border border-[#e2dfd4] rounded-3xl p-6 shadow-xs hover:border-[#b8c2a4] transition-all space-y-5"
            >
              {/* Title & Metadata */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#f0eee6] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs bg-[#fbf5e6] text-[#8a6b18] border border-[#f0e2bd] font-semibold px-2.5 py-0.5 rounded-full">
                      {proj.difficulty}
                    </span>
                    <span className="text-[#7d8270] text-xs flex items-center gap-1">
                      <Clock size={13} /> {proj.timeToBuild}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#1e2019]">{proj.title}</h2>
                  <p className="text-[#636659] text-sm mt-1">{proj.description}</p>
                </div>

                <a 
                  href={proj.githubTemplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#556b2f] hover:bg-[#445625] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex-shrink-0"
                >
                  <FolderGit2 size={16} /> Explore GitHub Starter <ExternalLink size={13} />
                </a>
              </div>

              {/* Gaps this closes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7d8270] block mb-2">
                  Skill Gaps This Project Proves:
                </span>
                <div className="flex flex-wrap gap-2">
                  {proj.coversGaps.map(gap => (
                    <span 
                      key={gap} 
                      className="text-xs bg-[#edf1e6] text-[#3f5022] border border-[#d6dec8] font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-[#556b2f]" /> {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7d8270] block mb-2">
                  Recommended Architecture & Tools:
                </span>
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs bg-[#faf9f5] text-[#1e2019] border border-[#e2dfd4] font-medium px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why Recruiters Love It */}
              <div className="bg-[#faf9f5] border border-[#e2dfd4] rounded-2xl p-4">
                <span className="text-xs font-bold text-[#556b2f] flex items-center gap-1.5 mb-1">
                  <Code2 size={15} /> Why Hiring Managers Pick Candidates With This:
                </span>
                <p className="text-[#4b4e43] text-xs leading-relaxed">{proj.whyRecruitersLoveIt}</p>
              </div>

              {/* Milestone Checklist */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7d8270] block mb-2.5">
                  Step-by-Step Build Checklist:
                </span>
                <div className="space-y-2">
                  {proj.keyFeatures.map((feat, idx) => {
                    const isDone = !!completedSteps[`${proj.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleStep(proj.id, idx)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#f0eee6] hover:border-[#b8c2a4] hover:bg-[#faf9f5] transition-all text-left group"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isDone ? 'bg-[#556b2f] text-white' : 'border border-[#cbd0be]'
                        }`}>
                          {isDone && <CheckCircle2 size={13} />}
                        </div>
                        <span className={`text-xs md:text-sm ${
                          isDone ? 'line-through text-[#8c907f]' : 'text-[#1e2019] font-medium'
                        }`}>
                          {feat}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
