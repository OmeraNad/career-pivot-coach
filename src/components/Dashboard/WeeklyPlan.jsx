import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { AlertOctagon, CheckCircle2, Circle, RefreshCw } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';
import { getSkillLevels, allSkillsFor } from '../../data/skillMatch';
import { createWeeklyPlan } from '../../data/careerCatalog';

function reconcilePlan(savedPlan, generatedPlan) {
  if (!Array.isArray(savedPlan)) return generatedPlan;
  return generatedPlan.map((week) => {
    const previousDays = savedPlan.find((savedWeek) => savedWeek.week === week.week)?.days || [];
    const currentDays = week.days.map((day) => {
      const previous = previousDays.find((savedDay) => savedDay.task === day.task);
      return previous ? { ...day, done: previous.done, completedAt: previous.completedAt } : day;
    });
    const currentTasks = new Set(currentDays.map((day) => day.task));
    const retainedDays = previousDays.filter((day) =>
      (day.done && !currentTasks.has(day.task)) || day.day?.startsWith('Extra practice'),
    );
    return { ...week, days: [...retainedDays, ...currentDays] };
  });
}

export default function WeeklyPlan() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role || 'Product Manager';
  const roleKey = getRoleKey(targetRole);
  const roleConfig = ROLE_DATA[roleKey] || ROLE_DATA.productManager;

  const storageKey = `cpc_plan_${user?.id || 'guest'}_${roleKey}`;

  // Which plan steps the user already knows, based on the skills they entered
  const levels = getSkillLevels(roleKey, user?.prefs?.knownSkills, user?.prefs?.skillConfidence);
  const coveredSteps = new Set(
    allSkillsFor(roleKey)
      .filter((s) => (levels[s.skill] || 0) >= s.required - 5)
      .map((s) => s.stepNumber)
  );
  const stepOf = (w) => Number(/Step (\d+)/.exec(w.title)?.[1]);

  const defaultPlan = roleConfig.categoryId
    ? createWeeklyPlan(roleKey, user?.prefs?.knownSkills)
    : roleConfig.weeklyPlan;
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const savedPlan = JSON.parse(saved);
        return roleConfig.categoryId ? reconcilePlan(savedPlan, defaultPlan) : savedPlan;
      } catch (error) {
        console.error('Could not read the saved learning plan.', error);
      }
    }
    return defaultPlan;
  });

  const [expanded, setExpanded] = useState(() => {
    const i = plan.findIndex((w) => !coveredSteps.has(stepOf(w)));
    return i === -1 ? 0 : i;
  });
  const [replanned, setReplanned] = useState(false);

  const toggleTask = (wi, di) => {
    setPlan((prev) => {
      const updated = prev.map((w, wIdx) => wIdx !== wi ? w : {
        ...w,
        days: w.days.map((d, dIdx) => dIdx !== di ? d : {
          ...d,
          done: !d.done,
          completedAt: !d.done ? new Date().toISOString() : '',
        }),
      });
      const allTasks = updated.flatMap(w => w.days);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem(`cpc_plan_${user?.id}`, JSON.stringify(allTasks));
      return updated;
    });
  };

  const handleReplan = () => {
    const allComplete = plan.every((week) => week.days.every((day) => day.done));
    const firstIncomplete = plan.findIndex((week) => week.days.some((day) => !day.done));
    const weekIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
    const focusSkill = allSkillsFor(roleKey).find((skill) => !coveredSteps.has(skill.stepNumber))
      || allSkillsFor(roleKey)[0];
    const activity = allComplete
      ? `Advanced practice: extend your ${targetRole} portfolio with a more complex ${focusSkill?.skill || 'role-specific'} challenge`
      : `Extra guided practice: revisit ${focusSkill?.skill || targetRole} with a smaller, step-by-step exercise`;
    setPlan((previous) => {
      const updated = previous.map((week, index) => index === weekIndex
        ? { ...week, days: [...week.days, { day: `Extra practice ${week.days.length + 1}`, task: activity, resource: focusSkill?.suggestedResources?.[0], done: false }] }
        : week);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem(`cpc_plan_${user?.id}`, JSON.stringify(updated.flatMap((week) => week.days)));
      return updated;
    });
    setReplanned(true);
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
        <button onClick={handleReplan}
          className="flex items-center gap-2 bg-white border border-[#e2dfd4] hover:border-[#8a6b18] text-[#8a6b18] font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-xs">
          <AlertOctagon size={15} />
          {t('weeklyPlan.stuck')}
        </button>
      </div>

      {replanned && (
        <div className="bg-[#fbf5e6] border border-[#f0e2bd] rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
          <RefreshCw size={18} className="text-[#8a6b18] flex-shrink-0" />
          <div>
            <div className="text-[#8a6b18] font-bold text-sm">Adaptive Plan Adjusted for {targetRole}!</div>
            <div className="text-[#636659] text-xs">An extra {targetRole}-specific practice task was added to the earliest active week. Finish it alongside the roadmap tasks.</div>
          </div>
        </div>
      )}

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
                  <div className="text-[#1e2019] font-bold text-sm">
                    {t('weeklyPlan.week')} {week.week}: {week.title}
                    {coveredSteps.has(stepOf(week)) && (
                      <span className="ml-2 text-xs bg-[#edf1e6] text-[#3f5022] border border-[#d6dec8] px-2 py-0.5 rounded-full font-semibold">
                        ✅ Already covered, quick review
                      </span>
                    )}
                  </div>
                  <div className="text-[#636659] text-xs">{week.objective || week.title} · {weekDone}/{week.days.length} tasks · {week.estimatedTime || 'about 3 hours'}</div>
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
                    <button
                      onClick={() => toggleTask(wi, di)}
                      aria-label={`${day.done ? 'Mark incomplete' : 'Mark complete'}: ${day.task}`}
                      className="flex-shrink-0"
                    >
                      {day.done
                        ? <CheckCircle2 size={20} className="text-[#556b2f]" />
                        : <Circle size={20} className="text-[#cbd0be]" />}
                    </button>
                    <div className="flex-1">
                      <span className="text-[#556b2f] text-xs font-bold mr-2">{day.day}</span>
                      <span className={`text-sm ${day.done ? 'text-[#8c907f] line-through' : 'text-[#1e2019]'}`}>{day.task}</span>
                      {day.resource?.url && (
                        <a href={day.resource.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-[#556b2f] hover:underline mt-1">
                          Resource: {day.resource.name}
                        </a>
                      )}
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
