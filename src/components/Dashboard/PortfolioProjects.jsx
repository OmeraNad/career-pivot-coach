import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FolderGit2, Sparkles, CheckCircle2, ExternalLink, Code2, 
  Clock, AlertTriangle, CheckCircle, ArrowRight, BookOpen 
} from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

export default function PortfolioProjects() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role || 'Product Manager';
  const roleKey = getRoleKey(targetRole);
  const roleConfig = ROLE_DATA[roleKey] || ROLE_DATA.productManager;
  const projects = roleConfig.portfolioProjects || [];
  const storageKey = `cpc_project_steps_${user?.id || 'guest'}_${roleKey}`;

  // Read mastered skills from user storage
  const userMasteredSkills = JSON.parse(localStorage.getItem(`cpc_skills_${user?.id}`) || '[]').map(s => s.name);

  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (error) {
      console.error('Could not read saved portfolio progress.', error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completedSteps));
  }, [completedSteps, storageKey]);

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
            <h1 className="text-2xl font-bold text-[#292923]">{t('dashboard.tabs.projects') || 'Portfolio Project Roadmap'}</h1>
            <span className="text-xs bg-[#E9EBDD] text-[#4F5B3D] border border-[#D6D9C6] px-2.5 py-0.5 rounded-full font-semibold">
              {targetRole}
            </span>
          </div>
          <p className="text-[#626153] text-sm">
            Projects progress from beginner step-by-step milestones to advanced showcases. Prerequisite checks verify if you have learned the required foundational skills before starting.
          </p>
        </div>
      </div>

      {/* Guide Note */}
      <div className="bg-[#E9EBDD] border border-[#D6D9C6] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#68734A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-[#292923] font-bold text-sm mb-1">Step-by-Step Learning Principle</h3>
          <p className="text-[#4D4A3F] text-xs leading-relaxed">
            Never attempt a complex full-stack project until you complete Level 1 basics. Each project below flags exactly which skills you must learn first so you never get overwhelmed or stuck.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projects.map((proj) => {
          // Check which prerequisites are met
          const reqSkills = proj.requiredSkills || [];
          const missingSkills = reqSkills.filter(s => !userMasteredSkills.includes(s));
          const isReadyToBuild = missingSkills.length === 0;

          return (
            <div 
              key={proj.id} 
              className={`bg-white border rounded-3xl p-6 shadow-xs transition-all space-y-5 ${
                isReadyToBuild ? 'border-[#68734A]/40 shadow-sm' : 'border-[#D9D3C4]'
              }`}
            >
              {/* Title & Metadata */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#EEEADF] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs bg-[#F4EDDB] text-[#866B34] border border-[#E2D6B6] font-semibold px-2.5 py-0.5 rounded-full">
                      {proj.difficulty}
                    </span>
                    <span className="text-[#797762] text-xs flex items-center gap-1">
                      <Clock size={13} /> {proj.timeToBuild}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#292923]">{proj.title}</h2>
                  <p className="text-[#626153] text-sm mt-1">{proj.description}</p>
                </div>

                <a 
                  href={proj.githubTemplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#68734A] hover:bg-[#515D3A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex-shrink-0"
                >
                  <FolderGit2 size={16} /> Explore Project Starter <ExternalLink size={13} />
                </a>
              </div>

              {/* Prerequisite Readiness Indicator (User Request) */}
              {isReadyToBuild ? (
                <div className="p-3.5 rounded-2xl bg-[#E9EBDD] border border-[#D6D9C6] flex items-center gap-2.5 text-xs text-[#3F4A2F] font-semibold">
                  <CheckCircle size={16} className="text-[#68734A] flex-shrink-0" />
                  <span>✅ You have learned all prerequisites! You are fully equipped to build this project right now.</span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F4EDDB] border border-[#E2D6B6] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#866B34] text-xs font-bold">
                    <AlertTriangle size={15} />
                    <span>⚠️ Prerequisite Knowledge Check: You must learn this before you can build this project:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-6 pt-1">
                    {missingSkills.map((ms) => (
                      <span key={ms} className="text-xs bg-white text-[#866B34] border border-[#E2D6B6] px-2.5 py-0.5 rounded-md font-semibold">
                        Must learn: {ms}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#797762] text-xs pl-6 pt-1">
                    👉 Go to the <strong>Skill Gap Map</strong> tab to complete the foundational lesson and quiz for these skills first!
                  </p>
                </div>
              )}

              {/* Skills required list */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#797762] block mb-2">
                  Skills Exercised in this Project:
                </span>
                <div className="flex flex-wrap gap-2">
                  {reqSkills.map(skill => {
                    const hasLearned = userMasteredSkills.includes(skill);
                    return (
                      <span 
                        key={skill} 
                        className={`text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5 border ${
                          hasLearned 
                            ? 'bg-[#E9EBDD] text-[#3F4A2F] border-[#D6D9C6]'
                            : 'bg-[#FFFDF7] text-[#626153] border-[#D9D3C4]'
                        }`}
                      >
                        {hasLearned ? <CheckCircle2 size={13} className="text-[#68734A]" /> : <BookOpen size={13} className="text-[#85836F]" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#797762] block mb-2">
                  Tools & Architecture:
                </span>
                <div className="flex flex-wrap gap-2">
                  {proj.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs bg-[#FFFDF7] text-[#292923] border border-[#D9D3C4] font-medium px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why Recruiters Love It */}
              <div className="bg-[#FFFDF7] border border-[#D9D3C4] rounded-2xl p-4">
                <span className="text-xs font-bold text-[#68734A] flex items-center gap-1.5 mb-1">
                  <Code2 size={15} /> Why Hiring Managers Care:
                </span>
                <p className="text-[#4D4A3F] text-xs leading-relaxed">{proj.whyRecruitersLoveIt}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-[#E9EBDD] border border-[#D6D9C6] p-3">
                  <strong className="block text-[#3F4A2F] mb-1">Expected outcome</strong>
                  <span className="text-[#4D4A3F]">{proj.expectedOutcome || 'A shareable, role-relevant work sample.'}</span>
                </div>
                <div className="rounded-xl bg-[#FFFDF7] border border-[#D9D3C4] p-3">
                  <strong className="block text-[#4D4A3F] mb-1">Portfolio presentation</strong>
                  <span className="text-[#626153]">{proj.presentationGuidance || 'Explain the brief, your process, and what you learned.'}</span>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#797762] block mb-2.5">
                  Step-by-Step Implementation Checklist:
                </span>
                <div className="space-y-2">
                  {proj.keyFeatures.map((feat, idx) => {
                    const isDone = !!completedSteps[`${proj.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleStep(proj.id, idx)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#EEEADF] hover:border-[#A6AA8B] hover:bg-[#FFFDF7] transition-all text-left group"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isDone ? 'bg-[#68734A] text-white' : 'border border-[#A6AA8B]'
                        }`}>
                          {isDone && <CheckCircle2 size={13} />}
                        </div>
                        <span className={`text-xs md:text-sm ${
                          isDone ? 'line-through text-[#85836F]' : 'text-[#292923] font-medium'
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
