import React, { useState } from 'react';
import { 
  X, BookOpen, CheckCircle, 
  HelpCircle, Sparkles, Clock, Compass, Lightbulb, Search, ArrowRight
} from 'lucide-react';

export default function SkillLearningModal({ skill, onClose, onMarkComplete }) {
  const [activeTab, setActiveTab] = useState('resources');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!skill) return null;

  const handleQuizSubmit = (idx) => {
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
  };

  const handleComplete = () => {
    setCompleted(true);
    if (onMarkComplete) {
      onMarkComplete(skill.skill);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f7f6f2] border border-[#d6dec8] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#1e2019]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#e2dfd4] flex items-start justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                skill.priority === 'Critical' 
                  ? 'bg-[#faebeb] text-[#ba3c3c] border border-[#f2c8c8]'
                  : 'bg-[#fbf5e6] text-[#8a6b18] border border-[#f0e2bd]'
              }`}>
                {skill.priority || 'Skill Module'}
              </span>
              <span className="text-[#636659] text-xs flex items-center gap-1">
                <Clock size={12} /> {skill.time} estimated
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#1e2019] flex items-center gap-2">
              {skill.skill}
            </h2>
            <p className="text-[#636659] text-sm mt-1">{skill.shortDesc || "Master the core fundamentals and practice with recommended learning paths."}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-[#7d8270] hover:text-[#1e2019] hover:bg-[#f0eee6] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e2dfd4] px-6 bg-[#eeebe1]">
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3.5 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'resources'
                ? 'border-[#556b2f] text-[#556b2f] bg-white rounded-t-xl'
                : 'border-transparent text-[#636659] hover:text-[#1e2019]'
            }`}
          >
            <Compass size={16} /> Recommended Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('crashCourse')}
            className={`py-3.5 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'crashCourse'
                ? 'border-[#556b2f] text-[#556b2f] bg-white rounded-t-xl'
                : 'border-transparent text-[#636659] hover:text-[#1e2019]'
            }`}
          >
            <BookOpen size={16} /> Core Concept Guide
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3.5 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'quiz'
                ? 'border-[#556b2f] text-[#556b2f] bg-white rounded-t-xl'
                : 'border-transparent text-[#636659] hover:text-[#1e2019]'
            }`}
          >
            <HelpCircle size={16} /> Knowledge Check
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: CURATED LEARNING SUGGESTIONS (NO VIDEOS EMBEDDED) */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Suggested Video / Search Topic Note */}
              <div className="p-5 rounded-2xl bg-[#edf1e6] border border-[#d6dec8] space-y-2">
                <div className="flex items-center gap-2 text-[#3f5022] text-sm font-bold">
                  <Lightbulb size={18} className="text-[#556b2f]" /> Recommended Video & Tutorial Search
                </div>
                <p className="text-[#4b4e43] text-xs leading-relaxed">
                  Instead of watching a 40-hour general course, we suggest searching YouTube or educational platforms for:
                </p>
                <div className="p-3 bg-white border border-[#d6dec8] rounded-xl flex items-center gap-2 font-mono text-xs text-[#1e2019]">
                  <Search size={14} className="text-[#556b2f] flex-shrink-0" />
                  <span>"{skill.suggestedSearch || `${skill.skill} crash course practical tutorial`}"</span>
                </div>
                <p className="text-[#636659] text-xs italic">
                  💡 Suggestion: Focus on videos under 45 minutes that show code/project construction rather than purely conceptual slides.
                </p>
              </div>

              {/* Recommended Curriculums & Reference Sites */}
              <div>
                <h3 className="text-[#1e2019] font-bold text-base mb-1 flex items-center gap-2">
                  <BookOpen size={18} className="text-[#556b2f]" /> Recommended Practice Mediums
                </h3>
                <p className="text-[#636659] text-xs mb-3">Interactive environments and reference guides ideal for this skill:</p>
                
                <div className="grid gap-3">
                  {(skill.suggestedResources || [
                    { name: `${skill.skill} Interactive Sandbox`, type: 'Hands-on Browser Sandbox', topic: 'Practice syntax and solve real mini exercises' },
                    { name: 'Official Documentation & Standards', type: 'Reference Standard', topic: 'Best practices, method signatures, and architectural patterns' }
                  ]).map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-[#e2dfd4] flex items-start gap-3 shadow-xs"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center flex-shrink-0">
                        <Compass size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[#1e2019] text-sm font-bold flex items-center justify-between">
                          <span>{res.name}</span>
                          <span className="text-xs bg-[#f0eee6] text-[#636659] px-2 py-0.5 rounded-full font-medium">{res.type}</span>
                        </div>
                        <p className="text-[#636659] text-xs mt-1">{res.topic}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Advice Note */}
              <div className="p-4 rounded-2xl bg-white border border-[#e2dfd4]">
                <div className="flex items-center gap-2 text-[#3f5022] text-sm font-bold mb-1">
                  <Sparkles size={16} /> Mentor's Minimum Effective Dose:
                </div>
                <p className="text-[#4b4e43] text-xs leading-relaxed">
                  {skill.mentorNote || "Spend 2 hours understanding the core 20% of tools that cover 80% of real interview questions. Practice building 1 small project."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CRASH COURSE / LESSON */}
          {activeTab === 'crashCourse' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-[#1e2019] flex items-center gap-2">
                  <Sparkles size={18} className="text-[#556b2f]" />
                  What you actually need to understand:
                </h3>
                <div className="text-[#4b4e43] text-sm leading-relaxed space-y-3">
                  {skill.lessonSteps ? (
                    skill.lessonSteps.map((step, i) => (
                      <div key={i} className="p-4 bg-[#faf9f5] rounded-xl border border-[#e2dfd4]">
                        <span className="font-bold text-[#3f5022] block mb-1">Step {i + 1}: {step.title}</span>
                        <p className="text-[#636659] text-xs leading-relaxed">{step.desc}</p>
                        {step.code && (
                          <pre className="mt-2.5 bg-[#252820] text-[#e8ecd9] p-3 rounded-lg text-xs font-mono overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#e2dfd4]">
                      <span className="font-bold text-[#3f5022] block mb-1">Overview & Foundation</span>
                      <p className="text-[#636659] text-xs leading-relaxed">
                        Focus on understanding how {skill.skill} interfaces with daily production workflows. Understand the vocabulary, standard inputs/outputs, and how to verify correctness.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
                <span className="text-xs uppercase font-bold tracking-wider text-[#556b2f]">Knowledge Check</span>
                <h4 className="text-[#1e2019] font-bold text-base mt-2 mb-4">
                  {skill.quiz ? skill.quiz.question : `Which of the following is the key purpose of ${skill.skill}?`}
                </h4>

                <div className="space-y-2.5">
                  {(skill.quiz ? skill.quiz.options : [
                    "To structure, build, and deploy reliable features",
                    "To cause endless server downtime",
                    "To delete database tables by accident"
                  ]).map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = skill.quiz ? idx === skill.quiz.correctIndex : idx === 0;

                    let btnStyle = "bg-[#faf9f5] border-[#e2dfd4] text-[#1e2019] hover:bg-[#f0eee6]";
                    if (quizSubmitted) {
                      if (isCorrect) btnStyle = "bg-[#edf1e6] border-[#556b2f] text-[#3f5022] font-semibold";
                      else if (isSelected) btnStyle = "bg-[#faebeb] border-[#ba3c3c] text-[#ba3c3c]";
                    } else if (isSelected) {
                      btnStyle = "bg-[#edf1e6] border-[#556b2f] text-[#3f5022] font-semibold";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => handleQuizSubmit(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#edf1e6] border border-[#d6dec8] text-[#3f5022] text-xs font-medium">
                    {selectedQuizAnswer === (skill.quiz?.correctIndex ?? 0)
                      ? "🎉 Spot on! You understand the foundational concept."
                      : "💡 Review the Core Concept Guide tab to reinforce this key principle."}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#e2dfd4] bg-white flex items-center justify-between">
          <div className="text-xs text-[#7d8270]">
            Marking this as learned logs progress to your dashboard.
          </div>
          <button
            onClick={handleComplete}
            disabled={completed}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs ${
              completed
                ? 'bg-[#edf1e6] text-[#3f5022] border border-[#d6dec8] cursor-default'
                : 'bg-[#556b2f] hover:bg-[#445625] text-white'
            }`}
          >
            <CheckCircle size={16} />
            {completed ? 'Skill Mastered! ✅' : 'Mark as Learned (+20%)'}
          </button>
        </div>

      </div>
    </div>
  );
}
