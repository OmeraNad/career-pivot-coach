import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { AlertOctagon, CheckCircle2, Circle, RefreshCw } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

export default function WeeklyPlan() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role && user.prefs.role !== 'beginner' ? user.prefs.role : 'Full Stack Developer';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;

  const storageKey = `cpc_plan_${user?.id || 'guest'}`;

  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return roleConfig.weeklyPlan;
  });

  const [expanded, setExpanded] = useState(0);
  const [replanning, setReplanning] = useState(false);
  const [replanned, setReplanned] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      const config = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;
      setPlan(config.weeklyPlan);
    }
  }, [targetRole, storageKey]);

  const toggleTask = (wi, di) => {
    setPlan((prev) => {
      const updated = prev.map((w, wIdx) => wIdx !== wi ? w : {
        ...w, days: w.days.map((d, dIdx) => dIdx !== di ? d : { ...d, done: !d.done })
      });
      // Save flat list to localStorage for ProgressTracker
      const allTasks = updated.flatMap(w => w.days);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem(`cpc_plan_${user?.id}`, JSON.stringify(allTasks));
      return updated;
    });
  };

  const handleReplan = () => {
    setReplanning(true);
    setTimeout(() => { 
      setReplanning(false); 
      setReplanned(true); 
    }, 1500);
  };

  const totalDays = plan.flatMap((w) => w.days).length;
  const doneDays = plan.flatMap((w) => w.days).filter((d) => d.done).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-[#1e2019]">{t('weeklyPlan.title')}</h1>
            <span className="text-xs bg-[#edf1e6] text-[#455633] border border-[#d6dec8] px-2.5 py-0.5 rounded-full font-semibold">
              {targetRole}
            </span>
          </div>
          <p className="text-[#636659] text-sm">{t('weeklyPlan.subtitle')}</p>
        </div>
        <button onClick={handleReplan} disabled={replanning}
          className="flex items-center gap-2 bg-white border border-[#e2dfd4] hover:border-[#8a6b18] text-[#8a6b18] font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs">
          {replanning ? <span className="w-3 h-3 border-2 border-[#8a6b18]/40 border-t-[#8a6b18] rounded-full animate-spin" /> : <AlertOctagon size={15} />}
          {t('weeklyPlan.stuck')}
        </button>
      </div>

      {replanned && (
        <div className="bg-[#fbf5e6] border border-[#f0e2bd] rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
          <RefreshCw size={18} className="text-[#8a6b18] flex-shrink-0" />
          <div>
            <div className="text-[#8a6b18] font-bold text-sm">Adaptive Plan Adjusted for {targetRole}!</div>
            <div className="text-[#636659] text-xs">We noticed you needed an easier on-ramp. Complex blocks have been broken into bite-sized 45-minute daily modules with extra guided practice checkpoints.</div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#636659] font-medium">Weekly Milestone Progress</span>
          <span className="text-[#1e2019] font-bold">{doneDays}/{totalDays} tasks completed ({Math.round((doneDays / Math.max(1, totalDays)) * 100)}%)</span>
        </div>
        <div className="w-full bg-[#f0eee6] rounded-full h-2.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#708643] to-[#556b2f] rounded-full transition-all"
            style={{ width: `${(doneDays / Math.max(1, totalDays)) * 100}%` }} />
        </div>
      </div>

      {/* Weeks */}
      {plan.map((week, wi) => {
        const weekDone = week.days.filter((d) => d.done).length;
        const isExpanded = expanded === wi;
        return (
          <div key={week.week} className="bg-white border border-[#e2dfd4] rounded-2xl overflow-hidden shadow-xs">
            <button onClick={() => setExpanded(isExpanded ? -1 : wi)}
              className="w-full flex items-center justify-between p-5 hover:bg-[#faf9f5] transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  weekDone === week.days.length 
                    ? 'bg-[#edf1e6] text-[#455633] border border-[#d6dec8]' 
                    : 'bg-[#f0eee6] text-[#636659]'
                }`}>W{week.week}</div>
                <div className="text-left">
                  <div className="text-[#1e2019] font-bold text-sm">{t('weeklyPlan.week')} {week.week}: {week.title}</div>
                  <div className="text-[#636659] text-xs">{weekDone}/{week.days.length} days complete</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-[#f0eee6] rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-[#556b2f] rounded-full" style={{ width: `${(weekDone / week.days.length) * 100}%` }} />
                </div>
                <span className="text-[#8c907f] text-xs">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-[#f0eee6] divide-y divide-[#f0eee6] bg-[#faf9f5]">
                {week.days.map((day, di) => (
                  <div key={di} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white transition-all">
                    <button onClick={() => toggleTask(wi, di)} className="flex-shrink-0">
                      {day.done
                        ? <CheckCircle2 size={20} className="text-[#556b2f]" />
                        : <Circle size={20} className="text-[#cbd0be]" />}
                    </button>
                    <div className="flex-1">
                      <span className="text-[#556b2f] text-xs font-bold mr-2">{day.day}</span>
                      <span className={`text-sm ${day.done ? 'text-[#8c907f] line-through' : 'text-[#1e2019]'}`}>{day.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
