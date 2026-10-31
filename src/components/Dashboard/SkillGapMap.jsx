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
      className="bg-white border border-[#e2dfd4] rounded-2xl p-5 space-y-3 hover:border-[#556b2f] hover:shadow-md transition-all cursor-pointer group shadow-xs"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[#1e2019] font-bold text-sm group-hover:text-[#556b2f] transition-colors flex items-center gap-2">
            {item.skill}
            <span className="opacity-0 group-hover:opacity-100 text-[#556b2f] text-xs transition-opacity flex items-center gap-1 font-normal">
              Learn <BookOpen size={13} />
            </span>
          </h4>
          <p className="text-[#636659] text-xs mt-1 line-clamp-1">{item.shortDesc || item.tip}</p>
        </div>
        <span className="text-[#636659] text-xs bg-[#f0eee6] px-2.5 py-1 rounded-full font-medium flex-shrink-0">
          ⏱ {item.time}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#636659]">
          <span>Current Level: <strong className="text-[#1e2019]">{item.yourLevel}%</strong></span>
          <span>Target: <strong className="text-[#1e2019]">{item.required}%</strong></span>
        </div>
        <div className="w-full bg-[#f0eee6] rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#708643] to-[#556b2f] rounded-full transition-all" 
            style={{ width: `${item.yourLevel}%` }} 
          />
        </div>
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#8a6b18] font-semibold">Remaining Gap: {gap > 0 ? `${gap}%` : 'Mastered! 🎉'}</span>
          <span className="text-[#556b2f] font-semibold group-hover:underline flex items-center gap-1">
            Open Lesson & Videos →
          </span>
        </div>
      </div>

      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-xl px-3 py-2 text-xs text-[#3f5022] flex items-center gap-2">
        <Sparkles size={14} className="text-[#556b2f] flex-shrink-0" />
        <span className="truncate">{item.tip}</span>
      </div>
    </div>
  );
}

export default function SkillGapMap() {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const targetRole = user?.prefs?.role && user.prefs.role !== 'beginner' ? user.prefs.role : 'Full Stack Developer';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;

  const [skillsData, setSkillsData] = useState(roleConfig.skills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [analyzed, setAnalyzed] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [resume, setResume] = useState('');

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
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('skillGap.title')}</h1>
          <p className="text-[#636659] text-sm">
            Curated roadmap for <strong className="text-[#556b2f]">{targetRole}</strong>. Click on any skill card below to access lessons and best videos!
          </p>
        </div>
        <button
          onClick={() => setAnalyzed(false)}
          className="text-xs bg-white border border-[#e2dfd4] hover:bg-[#faf9f5] text-[#1e2019] px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          Re-Analyze Resume
        </button>
      </div>

      {!analyzed ? (
        <div className="bg-white border border-[#e2dfd4] rounded-3xl p-8 space-y-5 shadow-xs">
          <div>
            <label className="text-sm font-semibold text-[#1e2019] mb-2 block">Target Role</label>
            <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-xl px-4 py-3 text-[#3f5022] font-semibold flex items-center gap-2">
              <Search size={16} /> {targetRole}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1e2019] mb-2 block">Paste your resume / background</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={5}
              placeholder="Paste your past experience or courses taken here..."
              className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl p-4 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 resize-none text-sm"
            />
          </div>
          <button 
            onClick={handleAnalyze} 
            disabled={analyzing}
            className="w-full bg-[#556b2f] hover:bg-[#445625] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            {analyzing ? (
              <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Analyzing job descriptions & matching videos...</>
            ) : (
              <><Zap size={18} /> Run Skill Gap & Educational Match</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Quick Summary Banner */}
          <div className="p-5 rounded-2xl bg-[#edf1e6] border border-[#d6dec8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#556b2f] text-white flex items-center justify-center shadow-xs">
                <PlayCircle size={22} />
              </div>
              <div>
                <div className="text-[#1e2019] font-bold text-sm">Learning Center Active for {targetRole}</div>
                <div className="text-[#636659] text-xs">Each skill includes verified free videos, sandbox playgrounds, and mini quizzes.</div>
              </div>
            </div>
            <span className="text-xs bg-white text-[#455633] border border-[#d6dec8] px-3 py-1.5 rounded-full font-semibold shadow-xs">
              Role: {targetRole}
            </span>
          </div>

          {/* Critical */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-[#ba3c3c]" />
              <h3 className="text-[#1e2019] font-bold text-base">
                {t('skillGap.critical')} Skills
                <span className="text-[#7d8270] text-xs font-normal ml-2">(High priority for {targetRole} interviews — click to start learning)</span>
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
              <Zap size={18} className="text-[#8a6b18]" />
              <h3 className="text-[#1e2019] font-bold text-base">
                {t('skillGap.important')} Skills
                <span className="text-[#7d8270] text-xs font-normal ml-2">(Differentiators — gives you an edge over other applicants)</span>
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
              <Info size={18} className="text-[#455633]" />
              <h3 className="text-[#1e2019] font-bold text-base">
                {t('skillGap.niceToHave')}
                <span className="text-[#7d8270] text-xs font-normal ml-2">(Bonus knowledge — learn after job ready)</span>
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
