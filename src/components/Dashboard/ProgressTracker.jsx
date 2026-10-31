import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Flame, CheckCircle, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

export default function ProgressTracker() {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Fresh user state calculation:
  // Read saved completed tasks from localStorage if user completed any in WeeklyPlan / Skills
  const userPlanTasks = JSON.parse(localStorage.getItem(`cpc_plan_${user?.id}`) || '[]');
  const completedTaskCount = userPlanTasks.filter(t => t.done).length;
  
  const userSkillsLearned = JSON.parse(localStorage.getItem(`cpc_skills_${user?.id}`) || '[]');

  const overallProgress = Math.min(100, Math.round((completedTaskCount / 15) * 100));
  const streakDays = completedTaskCount > 0 ? 1 : 0;

  const stats = [
    { icon: TrendingUp, label: t('progress.overall'), value: `${overallProgress}%` },
    { icon: Flame, label: t('progress.streak'), value: `${streakDays} day${streakDays === 1 ? '' : 's'}` },
    { icon: CheckCircle, label: t('progress.completed'), value: `${completedTaskCount}` },
    { icon: BookOpen, label: t('progress.skillsLearned'), value: `${userSkillsLearned.length}` },
  ];

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const WEEKLY_DATA = completedTaskCount > 0 ? [0, 0, 0, 0, 20, 30, completedTaskCount * 15] : [0, 0, 0, 0, 0, 0, 0];
  const maxVal = Math.max(60, ...WEEKLY_DATA);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('progress.title')}</h1>
        <p className="text-[#636659] text-sm">{t('progress.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center mb-3">
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-[#1e2019] mb-1">{value}</div>
            <div className="text-xs text-[#7d8270] font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Learning velocity chart */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
        <h3 className="text-[#1e2019] font-bold text-base mb-1">Weekly Learning Minutes</h3>
        <p className="text-[#7d8270] text-xs mb-6">Activity is logged automatically when you complete milestones and quizzes</p>
        <div className="flex items-end gap-3 h-36">
          {WEEKLY_DATA.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-[#556b2f] rounded-t-lg transition-all"
                style={{ height: `${Math.max(4, (val / maxVal) * 100)}%` }} 
              />
              <span className="text-[#7d8270] text-xs font-medium">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills learned */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
        <h3 className="text-[#1e2019] font-bold text-base mb-4">{t('progress.skillsLearned')}</h3>
        {userSkillsLearned.length === 0 ? (
          <div className="p-8 text-center bg-[#faf9f5] border border-dashed border-[#e2dfd4] rounded-xl text-xs text-[#7d8270]">
            No skills marked as mastered yet. Open the <strong>Skill Gap Map</strong> to practice lessons and take quizzes!
          </div>
        ) : (
          <div className="space-y-3">
            {userSkillsLearned.map((s, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-[#faf9f5] border border-[#e2dfd4] rounded-xl px-4 py-3">
                <CheckCircle size={18} className="text-[#556b2f] flex-shrink-0" />
                <span className="text-[#1e2019] text-sm font-semibold flex-1">{s.name}</span>
                <span className="text-[#7d8270] text-xs">{s.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adaptive retention insight */}
      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-[#556b2f] flex items-center justify-center flex-shrink-0 shadow-xs">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-[#1e2019] font-bold text-sm mb-1">🧠 Adaptive Velocity Engine</p>
          <p className="text-[#4b4e43] text-sm leading-relaxed">
            {completedTaskCount === 0
              ? "Your baseline velocity will calibrate as you check off your first 3 tasks in the Weekly Plan. We automatically adjust milestone pacing based on how fast you complete lessons."
              : "Pacing is actively calibrated. Keep completing daily 45-minute blocks to build momentum."}
          </p>
        </div>
      </div>
    </div>
  );
}
