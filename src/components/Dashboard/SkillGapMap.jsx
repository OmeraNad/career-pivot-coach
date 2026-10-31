import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Zap, AlertTriangle, Info, BookOpen, PlayCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import SkillLearningModal from './SkillLearningModal';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

function SkillCard({ item, onSelectSkill }) {
  const gap = item.required - item.yourLevel;
  return (
    <div 
      onClick={() => onSelectSkill(item)}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-purple-500/50 hover:bg-white/8 transition-all cursor-pointer group shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors flex items-center gap-2">
            {item.skill}
            <span className="opacity-0 group-hover:opacity-100 text-purple-400 text-xs transition-opacity flex items-center gap-1 font-normal">
              Learn <BookOpen size={13} />
            </span>
          </h4>
          <p className="text-slate-400 text-xs mt-1 line-clamp-1">{item.shortDesc || item.tip}</p>
        </div>
        <span className="text-slate-400 text-xs bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
          ⏱ {item.time}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Current Level: <strong className="text-white">{item.yourLevel}%</strong></span>
          <span>Target: <strong className="text-white">{item.required}%</strong></span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all" 
            style={{ width: `${item.yourLevel}%` }} 
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-orange-400 font-medium">Remaining Gap: {gap > 0 ? `${gap}%` : 'Mastered! 🎉'}</span>
          <span className="text-purple-400 font-semibold group-hover:underline flex items-center gap-1">
            Open Lesson & Videos →
          </span>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-purple-300 flex items-center gap-2">
        <Sparkles size={14} className="text-purple-400 flex-shrink-0" />
        <span className="truncate">{item.tip}</span>
      </div>
    </div>
  );
}

export default function SkillGapMap() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // Resolve role from user preferences or fallback
  const targetRole = user?.prefs?.role && user.prefs.role !== 'beginner' ? user.prefs.role : 'Full Stack Developer';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;

  const [skillsData, setSkillsData] = useState(roleConfig.skills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [analyzed, setAnalyzed] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [resume, setResume] = useState('');

  // Update skills if user's role changes
  useEffect(() => {
    const config = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;
    setSkillsData(config.skills);
  }, [targetRole]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { 
      setAnalyzing(false); 
      setAnalyzed(true); 
    }, 1200);
  };

  const handleMarkComplete = (skillName) => {
    setSkillsData((prev) => {
      const updateGroup = (arr) =>
        arr.map((s) => (s.skill === skillName ? { ...s, yourLevel: Math.min(100, s.yourLevel + 20) } : s));
      return {
        critical: updateGroup(prev.critical),
        important: updateGroup(prev.important),
        niceToHave: updateGroup(prev.niceToHave),
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Explainer */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('skillGap.title')}</h1>
          <p className="text-slate-400 text-sm">
            Curated roadmap for <strong className="text-purple-300">{targetRole}</strong>. Click on any skill card below to access lessons and best videos!
          </p>
        </div>
        <button
          onClick={() => setAnalyzed(false)}
          className="text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3.5 py-2 rounded-xl transition-all"
        >
          Re-Analyze Resume
        </button>
      </div>

      {!analyzed ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5 animate-fadeIn">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Target Role</label>
            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-300 font-semibold flex items-center gap-2">
              <Search size={16} /> {targetRole}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Paste your resume / background</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={5}
              placeholder="Paste your past experience or courses taken here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none text-sm"
            />
          </div>
          <button 
            onClick={handleAnalyze} 
            disabled={analyzing}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing job descriptions & matching videos...</>
            ) : (
              <><Zap size={18} /> Run Skill Gap & Educational Match</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Summary Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <PlayCircle size={22} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Learning Center Active for {targetRole}</div>
                <div className="text-slate-400 text-xs">Each skill includes verified free videos, sandbox playgrounds, and mini quizzes.</div>
              </div>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-full font-medium">
              Role: {targetRole}
            </span>
          </div>

          {/* Critical */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-red-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.critical')} Skills
                <span className="text-slate-400 text-xs font-normal ml-2">(High priority for {targetRole} interviews — click to start learning)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.critical.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Important */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-yellow-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.important')} Skills
                <span className="text-slate-400 text-xs font-normal ml-2">(Differentiators — gives you an edge over other applicants)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.important.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Nice to have */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-blue-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.niceToHave')}
                <span className="text-slate-400 text-xs font-normal ml-2">(Bonus knowledge — learn after job ready)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.niceToHave.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal when clicking any skill */}
      {selectedSkill && (
        <SkillLearningModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
}
