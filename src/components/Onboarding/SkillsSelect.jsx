import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Plus, X, CheckCircle2, Target } from 'lucide-react';
import { getRoleKey } from '../../data/roleData';
import { analyzeGaps, SKILL_SUGGESTIONS } from '../../data/skillMatch';

const CONFIDENCE = [
  { label: 'Beginner', value: 35 },
  { label: 'Intermediate', value: 60 },
  { label: 'Strong', value: 85 },
];

export default function SkillsSelect() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const role = sessionStorage.getItem('onboarding_role_name') || '';
  const roleKey = getRoleKey(role);

  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');
  const [confidence, setConfidence] = useState(60);

  if (!role) return <Navigate to="/onboarding/role" replace />;

  const addSkill = (raw) => {
    const parts = raw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    setSkills((prev) => {
      const next = [...prev];
      parts.forEach((p) => {
        if (!next.some((n) => n.toLowerCase() === p.toLowerCase())) next.push(p);
      });
      return next;
    });
    setInput('');
  };

  const removeSkill = (s) => setSkills((prev) => prev.filter((x) => x !== s));

  const { known, missing, weeks } = analyzeGaps(roleKey, skills, confidence);

  const finish = (list) => {
    sessionStorage.removeItem('onboarding_role_name');
    completeOnboarding({
      role,
      isBeginner: false,
      interests: [],
      language: localStorage.getItem('preferredLanguage') || 'en',
      knownSkills: list,
      skillConfidence: confidence,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2019] mb-2 text-center tracking-tight">
          What skills have you learned?
        </h1>
        <p className="text-[#636659] text-center mb-8 text-sm md:text-base">
          Add the skills and tools you already know for <strong className="text-[#556b2f]">{role}</strong>.
          We'll skip what you've covered and plan the rest.
        </p>

        <div className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); if (input.trim()) addSkill(input); }
            }}
            placeholder="e.g. Excel, SQL, HTML, Figma... (press Enter to add)"
            className="flex-1 bg-white border border-[#dcd8cb] rounded-2xl px-4 py-3.5 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 text-sm shadow-sm"
          />
          <button
            onClick={() => input.trim() && addSkill(input)}
            className="bg-[#556b2f] hover:bg-[#445625] text-white px-4 rounded-2xl"
            aria-label="Add skill"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(SKILL_SUGGESTIONS[roleKey] || []).map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              disabled={skills.some((x) => x.toLowerCase() === s.toLowerCase())}
              className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white border-[#e4e1d6] text-[#4b4e43] hover:border-[#b8c2a4] disabled:opacity-40"
            >
              + {s}
            </button>
          ))}
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {skills.map((s) => (
              <span key={s} className="flex items-center gap-1.5 bg-[#edf1e6] text-[#3f5022] border border-[#d6dec8] text-xs font-semibold px-3 py-1.5 rounded-full">
                {s}
                <button onClick={() => removeSkill(s)}><X size={12} /></button>
              </span>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#7d8270] mb-2">How confident are you with these?</p>
            <div className="grid grid-cols-3 gap-2">
              {CONFIDENCE.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setConfidence(c.value)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    confidence === c.value
                      ? 'bg-[#556b2f] text-white border-[#556b2f]'
                      : 'bg-white text-[#4b4e43] border-[#e4e1d6] hover:border-[#b8c2a4]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 mb-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#1e2019] font-bold text-sm">
            <Target size={16} className="text-[#556b2f]" /> Your gap for {role}
            <span className="ml-auto text-xs font-semibold text-[#8a6b18] bg-[#fbf5e6] border border-[#f0e2bd] px-2.5 py-0.5 rounded-full">
              ~{weeks} weeks to cover
            </span>
          </div>

          {known.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#3f5022] mb-1.5">Already covered</p>
              <div className="flex flex-wrap gap-1.5">
                {known.map((s) => (
                  <span key={s.skill} className="flex items-center gap-1 text-xs bg-[#edf1e6] text-[#3f5022] border border-[#d6dec8] px-2.5 py-1 rounded-lg">
                    <CheckCircle2 size={12} /> {s.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-[#8a6b18] mb-1.5">Still to learn</p>
            {missing.length === 0 ? (
              <p className="text-xs text-[#636659]">Nothing major. You're ready to focus on projects and interviews.</p>
            ) : (
              <div className="space-y-1.5">
                {missing.map((s) => (
                  <div key={s.skill} className="flex items-center justify-between text-xs bg-[#faf9f5] border border-[#e2dfd4] rounded-lg px-3 py-2">
                    <span className="text-[#1e2019] font-semibold">{s.skill}</span>
                    <span className="text-[#7d8270]">{s.priority} · {s.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => finish(skills)}
          className="group w-full flex items-center justify-center gap-3 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold py-4 rounded-2xl transition-all shadow-sm"
        >
          Build My Plan
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => finish([])}
          className="w-full mt-3 text-sm text-[#636659] hover:text-[#1e2019] py-2"
        >
          I haven't learned any of these yet
        </button>
      </div>
    </div>
  );
}
