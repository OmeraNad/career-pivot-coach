import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { AlertTriangle, Info, BookOpen, PlayCircle, Sparkles } from 'lucide-react';
import SkillLearningModal from './SkillLearningModal';
import ResumeAnalysis from './ResumeAnalysis';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';
import { getSkillLevels } from '../../data/skillMatch';

function SkillCard({ item, onSelectSkill }) {
  const gap = item.required - item.yourLevel;
  const status = item.yourLevel >= item.required ? 'Learned' : item.yourLevel > 0 ? 'In progress' : 'Not started';
  return (
    <button
      type="button"
      onClick={() => onSelectSkill(item)}
      className="w-full bg-white border border-[#e2dfd4] rounded-2xl p-5 space-y-3 hover:border-[#556b2f] hover:shadow-md transition-all cursor-pointer group shadow-xs text-left"
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
        <div className="flex flex-col items-end gap-1">
          <span className="text-[#636659] text-xs bg-[#f0eee6] px-2.5 py-1 rounded-full font-medium flex-shrink-0">⏱ {item.time}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
            status === 'Learned' ? 'bg-[#edf1e6] text-[#3f5022]' : status === 'In progress' ? 'bg-[#fbf5e6] text-[#8a6b18]' : 'bg-[#f0eee6] text-[#636659]'
          }`}>{status} · {item.priority}</span>
        </div>
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
            Open Concept Guide & Resources →
          </span>
        </div>
      </div>

      {item.tip && (
        <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-xl px-3 py-2 text-xs text-[#3f5022] flex items-center gap-2">
          <Sparkles size={14} className="text-[#556b2f] flex-shrink-0" />
          <span className="truncate">{item.tip}</span>
        </div>
      )}
    </button>
  );
}

export default function SkillGapMap() {
  const { t } = useTranslation();
  const { user, updatePrefs } = useAuth();

  const targetRole = user?.prefs?.role || 'Product Manager';
  const roleKey = getRoleKey(targetRole);
  const roleConfig = ROLE_DATA[roleKey] || ROLE_DATA.productManager;

  // Start each skill at the level inferred from the skills the user entered
  const withLevels = (skills) => {
    const levels = getSkillLevels(roleKey, user?.prefs?.knownSkills, user?.prefs?.skillConfidence);
    const completed = new Set((user?.prefs?.completedSkills || []).map((skill) => skill.toLowerCase()));
    const map = (arr) => arr.map((s) => ({
      ...s,
      yourLevel: completed.has(s.skill.toLowerCase()) ? s.required : levels[s.skill] ?? s.yourLevel,
    }));
    return { critical: map(skills.critical), important: map(skills.important), niceToHave: map(skills.niceToHave) };
  };

  const [selectedSkill, setSelectedSkill] = useState(null);
  const skillsData = withLevels(roleConfig.skills);

  const handleMarkComplete = (skillName) => {
    const storageKey = `cpc_skills_${user?.id || 'guest'}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!existing.some(s => s.name === skillName)) {
      const updatedList = [...existing, { name: skillName, date: 'Today' }];
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
    }
    updatePrefs({
      knownSkills: [...new Set([...(user?.prefs?.knownSkills || []), skillName])],
      completedSkills: [...new Set([...(user?.prefs?.completedSkills || []), skillName])],
    });

  };

  const selectSkill = (skill) => setSelectedSkill({ roleKey, skill });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('skillGap.title')}</h1>
          <p className="text-[#636659] text-sm">
            Role-specific skill gaps for <strong className="text-[#556b2f]">{targetRole}</strong>. Select a skill to open its learning guide.
          </p>
        </div>
      </div>

      <ResumeAnalysis
        key={user?.id}
        user={user}
        targetRole={targetRole}
        roleKey={roleKey}
        roleConfig={roleConfig}
        updatePrefs={updatePrefs}
      />

      <div className="space-y-8">
          <div className="p-5 rounded-2xl bg-[#edf1e6] border border-[#d6dec8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#556b2f] text-white flex items-center justify-center shadow-xs">
                <PlayCircle size={22} />
              </div>
              <div>
                <div className="text-[#1e2019] font-bold text-sm">Learning Center Active for {targetRole}</div>
                <div className="text-[#636659] text-xs">{roleConfig.jobRequirementsNote || 'Curated role-specific learning paths; not live job postings.'}</div>
              </div>
            </div>
            <span className="text-xs bg-white text-[#455633] border border-[#d6dec8] px-3 py-1.5 rounded-full font-semibold shadow-xs">
              Role: {targetRole}
            </span>
          </div>

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
                <SkillCard key={g.skill} item={g} onSelectSkill={selectSkill} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-[#8a6b18]" />
              <h3 className="text-[#1e2019] font-bold text-base">
                {t('skillGap.important')} Skills
                <span className="text-[#7d8270] text-xs font-normal ml-2">(Differentiators — gives you an edge over other applicants)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.important.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={selectSkill} />
              ))}
            </div>
          </div>

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
                <SkillCard key={g.skill} item={g} onSelectSkill={selectSkill} />
              ))}
            </div>
          </div>
      </div>

      {selectedSkill?.roleKey === roleKey && (
        <SkillLearningModal
          skill={selectedSkill.skill}
          onClose={() => setSelectedSkill(null)}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
}
