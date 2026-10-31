import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, CheckCircle, FileCheck2, FolderGit2, Mic, Sparkles, TrendingUp } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';
import { getSkillLevels } from '../../data/skillMatch';

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Could not read saved progress for ${key}.`, error);
    return [];
  }
}

function readRecord(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch (error) {
    console.error(`Could not read saved progress for ${key}.`, error);
    return {};
  }
}

export default function ProgressTracker() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const role = user?.prefs?.role || 'Product Manager';
  const roleKey = getRoleKey(role);
  const roleConfig = ROLE_DATA[roleKey] || ROLE_DATA.productManager;
  const skills = [...roleConfig.skills.critical, ...roleConfig.skills.important, ...roleConfig.skills.niceToHave];
  const storedPlan = readList(roleConfig.categoryId ? `cpc_plan_${userId}_${roleKey}` : `cpc_plan_${userId}`);
  const planTasks = storedPlan.flatMap((item) => Array.isArray(item.days) ? item.days : [item]);
  const completedTasks = planTasks.filter((task) => task.done);
  const learnedSkills = readList(`cpc_skills_${userId}`);
  const skillLevels = getSkillLevels(roleKey, user?.prefs?.knownSkills, user?.prefs?.skillConfidence);
  const masteredNames = new Set(learnedSkills.map((skill) => skill.name));
  const completedSkillNames = new Set((user?.prefs?.completedSkills || []).map((skill) => skill.toLowerCase()));
  const skillProgress = skills.map((skill) => {
    const level = masteredNames.has(skill.skill) || completedSkillNames.has(skill.skill.toLowerCase())
      ? skill.required
      : skillLevels[skill.skill] || 0;
    return { ...skill, level };
  });
  const completedSkillCount = skillProgress.filter((skill) => skill.level >= skill.required).length;
  const skillCoverage = Math.round(skillProgress.reduce((sum, skill) => sum + Math.min(skill.level / skill.required, 1), 0)
    / Math.max(skills.length, 1) * 100);
  const planCoverage = Math.round((completedTasks.length / Math.max(planTasks.length, 1)) * 100);
  const projectProgress = readRecord(`cpc_project_steps_${userId}_${roleKey}`);
  const projects = roleConfig.portfolioProjects || [];
  const completedProjects = projects.filter((project) =>
    project.keyFeatures.every((_, index) => projectProgress[`${project.id}-${index}`]),
  ).length;
  const projectCoverage = Math.round((completedProjects / Math.max(projects.length, 1)) * 100);
  const readiness = Math.round((skillCoverage * 0.6) + (planCoverage * 0.2) + (projectCoverage * 0.2));
  const interviewScores = readList(`cpc_interviews_${userId}`)
    .filter((entry) => entry.role === role && Number.isFinite(entry.score));
  const interviewAverage = interviewScores.length
    ? Math.round(interviewScores.reduce((sum, entry) => sum + entry.score, 0) / interviewScores.length)
    : null;
  const resume = readRecord(`cpc_resume_${userId}`);
  const resumeAdded = Boolean(
    resume.fileName || resume.resumeText || resume.existingSkills
    || resume.education || resume.experience || resume.certifications || resume.projects,
  );
  const applications = readList(`cpc_apps_${userId}`);

  const [today] = useState(() => new Date());
  const weeklyMinutes = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - (6 - index));
    const dayKey = day.toDateString();
    return completedTasks
      .filter((task) => task.completedAt && new Date(task.completedAt).toDateString() === dayKey)
      .length * 45;
  });
  const maxMinutes = Math.max(45, ...weeklyMinutes);
  const labels = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(day.getDate() - (6 - index));
    return day.toLocaleDateString(undefined, { weekday: 'short' });
  });

  const stats = [
    { icon: TrendingUp, label: t('progress.overall'), value: `${readiness}%` },
    { icon: CheckCircle, label: 'Role skills covered', value: `${completedSkillCount}/${skills.length}` },
    { icon: BookOpen, label: 'Roadmap tasks', value: `${completedTasks.length}/${planTasks.length}` },
    { icon: FolderGit2, label: 'Portfolio projects complete', value: `${completedProjects}/${projects.length}` },
    { icon: Mic, label: 'Practice interview average', value: interviewAverage === null ? '—' : `${interviewAverage}%` },
    { icon: FileCheck2, label: 'Resume review', value: resumeAdded ? 'Added' : 'Not started' },
  ];

  const nextSkill = skillProgress.find((skill) => skill.level < skill.required);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('progress.title')}</h1>
        <p className="text-[#636659] text-sm">Progress is calculated from your saved activity for <strong>{role}</strong>; no sample percentages are used.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center mb-3"><Icon size={20} /></div>
            <div className="text-xl md:text-2xl font-bold text-[#1e2019] mb-1">{value}</div>
            <div className="text-xs text-[#7d8270] font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-[#1e2019] font-bold text-base">Weekly learning activity</h3>
            <p className="text-[#7d8270] text-xs mt-1">Estimated minutes from completed roadmap tasks (45 minutes per task).</p>
          </div>
          <span className="text-sm text-[#556b2f] font-bold">{(completedTasks.length * 0.75).toFixed(1)} estimated hours total</span>
        </div>
        <div className="flex items-end gap-3 h-36">
          {weeklyMinutes.map((minutes, index) => (
            <div key={`${labels[index]}-${index}`} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[#7d8270] text-[10px]">{minutes || ''}</span>
              <div className="w-full bg-[#f0eee6] rounded-t-lg h-24 flex items-end overflow-hidden">
                <div className="w-full bg-[#556b2f] transition-all" style={{ height: `${(minutes / maxMinutes) * 100}%` }} />
              </div>
              <span className="text-[#7d8270] text-xs font-medium">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
          <h3 className="text-[#1e2019] font-bold text-sm mb-3">Skills you have marked as learned</h3>
          {learnedSkills.length ? (
            <div className="space-y-2">
              {learnedSkills.map((skill, index) => (
                <div key={`${skill.name}-${index}`} className="flex items-center gap-3 bg-[#faf9f5] border border-[#e2dfd4] rounded-xl px-3 py-2.5">
                  <CheckCircle size={16} className="text-[#556b2f] flex-shrink-0" />
                  <span className="text-[#1e2019] text-xs font-semibold flex-1">{skill.name}</span>
                  <span className="text-[#7d8270] text-xs">{skill.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-5 text-center bg-[#faf9f5] border border-dashed border-[#e2dfd4] rounded-xl text-xs text-[#7d8270]">
              No skills completed yet. Use the role-specific Skill Gap Map to learn and mark skills.
            </p>
          )}
        </div>
        <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
          <h3 className="text-[#1e2019] font-bold text-sm mb-3">Career preparation activity</h3>
          <div className="space-y-3 text-xs text-[#636659]">
            <p className="flex justify-between gap-3"><span>Interview answers evaluated</span><strong className="text-[#1e2019]">{interviewScores.length}</strong></p>
            <p className="flex justify-between gap-3"><span>Applications recorded</span><strong className="text-[#1e2019]">{applications.length}</strong></p>
            <p className="flex justify-between gap-3"><span>Resume details</span><strong className="text-[#1e2019]">{resumeAdded ? 'Saved locally' : 'Not added'}</strong></p>
            <p className="flex justify-between gap-3"><span>Portfolio projects completed</span><strong className="text-[#1e2019]">{completedProjects} of {projects.length}</strong></p>
          </div>
        </div>
      </div>

      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-[#556b2f] flex items-center justify-center flex-shrink-0 shadow-xs"><Sparkles size={20} /></div>
        <div>
          <p className="text-[#1e2019] font-bold text-sm mb-1">Your next step</p>
          <p className="text-[#4b4e43] text-sm leading-relaxed">
            {nextSkill
              ? `Continue with ${nextSkill.skill} for ${role}. Your readiness score will move as you record skill, roadmap, and portfolio progress.`
              : applications.length
                ? `All listed ${role} skills are covered in your current profile. Keep building portfolio evidence and reviewing your recorded applications.`
                : `All listed ${role} skills are covered in your current profile. Add a portfolio project or begin tracking applications when ready.`}
          </p>
          {applications.length > 0 && <p className="text-[#636659] text-xs mt-2">Application outcomes are descriptive records only; Career Compass does not predict hiring decisions.</p>}
        </div>
      </div>
    </div>
  );
}
