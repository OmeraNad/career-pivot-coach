import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Zap, AlertTriangle, Info } from 'lucide-react';

const SAMPLE_GAPS = {
  critical: [
    { skill: 'SQL & Data Querying', yourLevel: 20, required: 80, time: '3 weeks', tip: 'Start with MODE SQL Tutorial — free and beginner-friendly' },
    { skill: 'Python for Data Analysis', yourLevel: 0, required: 75, time: '6 weeks', tip: 'Use Kaggle Learn — free bite-sized lessons with notebooks' },
    { skill: 'Data Visualization (Tableau/Power BI)', yourLevel: 10, required: 70, time: '4 weeks', tip: 'Tableau Public is free; start with their official beginner tutorials' },
  ],
  important: [
    { skill: 'Statistical Analysis', yourLevel: 30, required: 65, time: '5 weeks', tip: 'Khan Academy Statistics is excellent for building intuition' },
    { skill: 'Excel / Google Sheets (Advanced)', yourLevel: 50, required: 70, time: '2 weeks', tip: 'You\'re close! Focus on pivot tables and VLOOKUP' },
    { skill: 'Business Communication', yourLevel: 60, required: 75, time: '1 week', tip: 'Read "The Pyramid Principle" for structured thinking' },
  ],
  niceToHave: [
    { skill: 'Machine Learning Basics', yourLevel: 5, required: 40, time: '8 weeks', tip: 'Andrew Ng\'s ML course on Coursera is the gold standard' },
    { skill: 'A/B Testing', yourLevel: 15, required: 45, time: '2 weeks', tip: 'Google\'s free "Data Analytics" certificate covers this well' },
  ],
};

function SkillBar({ skill, yourLevel, required, time, tip }) {
  const gap = required - yourLevel;
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between">
        <h4 className="text-white font-semibold text-sm">{skill}</h4>
        <span className="text-slate-400 text-xs bg-white/10 px-2 py-1 rounded-full">⏱ {time}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Your level: {yourLevel}%</span>
          <span>Required: {required}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all" style={{ width: `${yourLevel}%` }} />
        </div>
        <div className="text-xs text-orange-400 font-medium">Gap: {gap}%</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 text-xs text-blue-300">
        💡 {tip}
      </div>
    </div>
  );
}

export default function SkillGapMap() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [resume, setResume] = useState('');
  const role = user?.prefs?.role || 'Data Analyst';

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 1800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">{t('skillGap.title')}</h1>
        <p className="text-slate-400 text-sm">{t('skillGap.subtitle')}</p>
      </div>

      {!analyzed ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Target Role</label>
            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-300 font-semibold flex items-center gap-2">
              <Search size={16} /> {role}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Paste your resume / current skills</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={6}
              placeholder="Paste your resume text, or list your current skills here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none text-sm"
            />
          </div>
          <button onClick={handleAnalyze} disabled={analyzing}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            {analyzing ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing job descriptions...</>
            ) : (
              <><Zap size={18} /> {t('skillGap.analyze')}</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t('skillGap.critical'), count: SAMPLE_GAPS.critical.length, color: 'red' },
              { label: t('skillGap.important'), count: SAMPLE_GAPS.important.length, color: 'yellow' },
              { label: t('skillGap.niceToHave'), count: SAMPLE_GAPS.niceToHave.length, color: 'blue' },
            ].map(({ label, count, color }) => (
              <div key={label} className={`bg-${color}-500/10 border border-${color}-500/20 rounded-2xl p-4 text-center`}>
                <div className={`text-3xl font-bold text-${color}-400`}>{count}</div>
                <div className="text-slate-400 text-xs mt-1">{label} gaps</div>
              </div>
            ))}
          </div>

          {/* Critical */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-red-400" />
              <h3 className="text-white font-bold">{t('skillGap.critical')} Gaps <span className="text-slate-500 text-sm font-normal">(must learn before applying)</span></h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SAMPLE_GAPS.critical.map((g) => <SkillBar key={g.skill} {...g} />)}
            </div>
          </div>

          {/* Important */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-yellow-400" />
              <h3 className="text-white font-bold">{t('skillGap.important')} Gaps <span className="text-slate-500 text-sm font-normal">(strong differentiators)</span></h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SAMPLE_GAPS.important.map((g) => <SkillBar key={g.skill} {...g} />)}
            </div>
          </div>

          {/* Nice to have */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-blue-400" />
              <h3 className="text-white font-bold">{t('skillGap.niceToHave')} <span className="text-slate-500 text-sm font-normal">(bonus points)</span></h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {SAMPLE_GAPS.niceToHave.map((g) => <SkillBar key={g.skill} {...g} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
