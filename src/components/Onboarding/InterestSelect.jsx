import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react';
import { INTEREST_TO_BOOMING_ROLE } from '../../data/roleData';

const INTEREST_OPTIONS = [
  { 
    key: 'technology', 
    emoji: '💻', 
    title: 'Technology & Web Software', 
    boomingRole: 'Junior Software & Web Engineer',
    desc: 'Starts with logic & programming fundamentals, HTML, CSS, and JavaScript before frameworks.'
  },
  { 
    key: 'healthcare', 
    emoji: '🏥', 
    title: 'Healthcare & Clinical Informatics', 
    boomingRole: 'Junior Health Data & Informatics Specialist',
    desc: 'Starts with healthcare privacy (HIPAA), medical coding (ICD-10), and patient spreadsheet analysis.'
  },
  { 
    key: 'data', 
    emoji: '📊', 
    title: 'Data & Analytics', 
    boomingRole: 'Business Intelligence & Data Analyst',
    desc: 'Starts with data literacy, Excel formulas, and SQL database querying.'
  },
  { 
    key: 'design', 
    emoji: '🎨', 
    title: 'Design & User Experience', 
    boomingRole: 'UI/UX & Product Designer',
    desc: 'Starts with user research, design thinking, wireframing, and Figma basics.'
  },
  { 
    key: 'business', 
    emoji: '💼', 
    title: 'Business & Management', 
    boomingRole: 'Associate Product & Operations Manager',
    desc: 'Starts with customer discovery, product requirement docs (PRDs), and agile sprints.'
  },
  { 
    key: 'marketing', 
    emoji: '📣', 
    title: 'Digital Marketing & Growth', 
    boomingRole: 'Growth & Performance Marketing Specialist',
    desc: 'Starts with marketing funnels, copywriting psychology, and campaign analytics.'
  },
  { 
    key: 'finance', 
    emoji: '💰', 
    title: 'Finance & Accounting', 
    boomingRole: 'Financial & Revenue Operations Analyst',
    desc: 'Starts with financial modeling, Excel statements, and budgeting fundamentals.'
  },
  { 
    key: 'writing', 
    emoji: '✍️', 
    title: 'Writing & Technical Communication', 
    boomingRole: 'Technical Writer & Documentation Specialist',
    desc: 'Starts with developer documentation, API guides, and knowledge-base structuring.'
  }
];

export default function InterestSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [selectedKey, setSelectedKey] = useState('technology');

  const selectedOption = INTEREST_OPTIONS.find(o => o.key === selectedKey) || INTEREST_OPTIONS[0];

  const handleContinue = () => {
    const boomingRole = selectedOption.boomingRole;
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    
    completeOnboarding({
      role: boomingRole,
      interestKey: selectedKey,
      isBeginner: true,
      interests: [selectedKey],
      language: lang,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="max-w-2xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-8 h-2 bg-[#556b2f] rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={18} className="text-[#556b2f]" />
          <span className="text-[#556b2f] text-xs font-bold uppercase tracking-widest">Beginner Career Pathway</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2019] mb-2 text-center tracking-tight">
          Which field sparks your interest?
        </h1>
        <p className="text-[#636659] text-center mb-6 text-sm max-w-lg mx-auto">
          Choose a field below. We will pair you with the <strong>#1 fastest-growing entry role</strong> in that industry and guide you through beginner-friendly foundational steps first.
        </p>

        {/* Interest grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {INTEREST_OPTIONS.map((item) => {
            const isSelected = selectedKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelectedKey(item.key)}
                className={`relative flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#edf1e6] border-[#556b2f] shadow-sm'
                    : 'bg-white border-[#e2dfd4] hover:border-[#b8c2a4] hover:bg-[#faf9f5]'
                }`}
              >
                <span className="text-2xl mt-0.5">{item.emoji}</span>
                <div className="flex-1 pr-6">
                  <div className="text-[#1e2019] text-sm font-bold flex items-center gap-1.5">
                    {item.title}
                  </div>
                  <div className="text-[#556b2f] text-xs font-semibold mt-0.5 flex items-center gap-1">
                    <TrendingUp size={12} /> Booming: {item.boomingRole}
                  </div>
                  <p className="text-[#7d8270] text-xs mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-[#556b2f] rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Role Preview Box */}
        <div className="p-4 rounded-2xl bg-white border border-[#e2dfd4] mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#7d8270] uppercase tracking-wider block">Assigned Booming Pathway:</span>
            <div className="text-[#1e2019] font-bold text-base mt-0.5">
              {selectedOption.emoji} {selectedOption.boomingRole}
            </div>
            <p className="text-[#636659] text-xs mt-0.5">
              Step 1 starts with true fundamentals before moving to complex tools.
            </p>
          </div>
          <button
            onClick={handleContinue}
            className="group flex items-center gap-2 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs text-sm"
          >
            Start My Journey
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
