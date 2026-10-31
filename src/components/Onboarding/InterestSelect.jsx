import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Briefcase, Check, Coins, Megaphone, Palette, PenLine, Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { CAREER_CATEGORIES } from '../../data/careerCatalog';

const CATEGORY_ICONS = {
  data: BarChart3,
  business: Briefcase,
  finance: Coins,
  design: Palette,
  marketing: Megaphone,
  writing: PenLine,
};

export default function InterestSelect() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const selectedCategories = CAREER_CATEGORIES.filter((category) => selectedInterests.includes(category.id));

  const toggleInterest = (interestId) => {
    const next = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];
    const availableRoles = CAREER_CATEGORIES
      .filter((category) => next.includes(category.id))
      .flatMap((category) => category.roles);
    setSelectedInterests(next);
    if (!availableRoles.some((role) => role.title === selectedRole)) {
      setSelectedRole(availableRoles[0]?.title || '');
    }
  };

  const handleContinue = () => {
    if (!selectedInterests.length || !selectedRole) return;
    completeOnboarding({
      role: selectedRole,
      interestKey: selectedInterests[0],
      isBeginner: true,
      interests: selectedInterests,
      language: localStorage.getItem('preferredLanguage') || 'en',
      knownSkills: [],
      skillConfidence: 35,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F6F3EB] flex items-center justify-center p-4 selection:bg-[#68734A]/20">
      <div className="max-w-4xl w-full py-8">
        <div className="flex items-center justify-center gap-2 mb-7" aria-label="Onboarding step 4 of 4">
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-8 h-2 bg-[#68734A] rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={18} className="text-[#68734A]" />
          <span className="text-[#68734A] text-xs font-bold uppercase tracking-widest">Beginner career pathway</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#292923] mb-2 text-center tracking-tight">
          Which fields spark your interest?
        </h1>
        <p className="text-[#626153] text-center mb-7 text-sm max-w-xl mx-auto">
          Choose one or more areas. We will only recommend roles from the fields you select.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-7">
          {CAREER_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isSelected = selectedInterests.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleInterest(category.id)}
                className={`relative flex min-h-36 items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#E9EBDD] border-[#68734A] shadow-sm'
                    : 'bg-white border-[#D9D3C4] hover:border-[#A6AA8B] hover:bg-[#FFFDF7]'
                }`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-[#68734A] text-white' : 'bg-[#EEEADF] text-[#68734A]'
                }`}>
                  <Icon size={20} />
                </span>
                <span className="pr-5">
                  <span className="block text-[#292923] text-sm font-bold">{category.title}</span>
                  <span className="block text-[#626153] text-xs mt-1 leading-relaxed">{category.description}</span>
                </span>
                <span className={`absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'bg-[#68734A] border-[#68734A] text-white' : 'bg-white border-[#D9D3C4] text-transparent'
                }`}>
                  <Check size={12} />
                </span>
              </button>
            );
          })}
        </div>

        {selectedCategories.length > 0 && (
          <section className="bg-white border border-[#D9D3C4] rounded-2xl p-5 md:p-6 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="text-[#292923] font-bold text-base">Choose a starting role</h2>
                <p className="text-[#626153] text-xs mt-1">Recommendations are limited to your selected interests.</p>
              </div>
              <span className="text-xs text-[#797762]">{selectedInterests.length} field{selectedInterests.length === 1 ? '' : 's'} selected</span>
            </div>
            <div className="space-y-4">
              {selectedCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#797762] mb-2">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.roles.map((role) => {
                      const isSelected = selectedRole === role.title;
                      return (
                        <button
                          key={role.key}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedRole(role.title)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'bg-[#68734A] border-[#68734A] text-white'
                              : 'bg-[#FFFDF7] border-[#D9D3C4] text-[#4D4A3F] hover:border-[#A6AA8B]'
                          }`}
                        >
                          {role.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#D9D3C4]">
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#797762] uppercase tracking-wider block">Your starting role</span>
            <div className="text-[#292923] font-bold text-base mt-0.5">
              {selectedRole || 'Select an interest and role to continue'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className="group flex items-center justify-center gap-2 bg-[#68734A] hover:bg-[#515D3A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs text-sm"
          >
            Start My Journey
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
