import React, { useState } from 'react';
import { 
  X, ExternalLink, PlayCircle, BookOpen, CheckCircle, 
  HelpCircle, Sparkles, Clock, Compass, Award 
} from 'lucide-react';

export default function SkillLearningModal({ skill, onClose, onMarkComplete }) {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'crashCourse' | 'quiz'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-purple-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between bg-white/5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                skill.priority === 'Critical' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {skill.priority || 'Skill Module'}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock size={12} /> {skill.time} recommended
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {skill.skill}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{skill.shortDesc || "Master the core fundamentals and practice with curated top resources."}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'resources'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={16} /> Top Video & Courses
          </button>
          <button
            onClick={() => setActiveTab('crashCourse')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'crashCourse'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen size={16} /> Interactive Lesson
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'quiz'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle size={16} /> Quick Quiz Check
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: CURATED RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                  <PlayCircle size={18} className="text-purple-400" /> Best Videos & Tutorials
                </h3>
                <p className="text-slate-400 text-xs mb-3">Watch these hand-picked free videos to understand this skill quickly:</p>
                <div className="grid gap-3">
                  {(skill.videos || [
                    { title: `${skill.skill} in 15 Minutes - Complete Crash Course`, source: 'YouTube (freeCodeCamp / Traversy)', url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(skill.skill + ' tutorial beginner'), duration: '15-45 mins' },
                    { title: `${skill.skill} Full Practical Walkthrough`, source: 'YouTube', url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(skill.skill + ' full course'), duration: '1-2 hrs' }
                  ]).map((vid, idx) => (
                    <a
                      key={idx}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <PlayCircle size={20} />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
                            {vid.title}
                          </div>
                          <div className="text-slate-400 text-xs flex items-center gap-2 mt-0.5">
                            <span>{vid.source}</span> • <span>{vid.duration}</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold text-base mb-1 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-400" /> Best Free Courses & Practice Sites
                </h3>
                <p className="text-slate-400 text-xs mb-3">Interactive platforms where you learn by actually doing:</p>
                <div className="grid gap-3">
                  {(skill.courses || [
                    { name: 'Kaggle Learn / W3Schools Interactive', type: 'Hands-on Interactive Lab', url: 'https://www.w3schools.com', badge: '100% Free' },
                    { name: 'Coursera / edX Guided Specialization', type: 'Certificate Course', url: 'https://www.coursera.org', badge: 'Free Audit' }
                  ]).map((course, idx) => (
                    <a
                      key={idx}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                            {course.name}
                          </div>
                          <div className="text-slate-400 text-xs mt-0.5">{course.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full">
                          {course.badge}
                        </span>
                        <ExternalLink size={16} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mentor Advice Note */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold mb-1">
                  <Sparkles size={16} /> Mentor's "Minimum Effective Dose" Approach:
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {skill.mentorNote || "Don't spend 40 hours reading documentation. Spend 2 hours understanding the core 20% of tools that cover 80% of real interview questions. Practice building 1 small project."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CRASH COURSE / LESSON */}
          {activeTab === 'crashCourse' && (
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-400" />
                  What you actually need to know:
                </h3>
                <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                  {skill.lessonSteps ? (
                    skill.lessonSteps.map((step, i) => (
                      <div key={i} className="p-3.5 bg-black/30 rounded-xl border border-white/5">
                        <span className="font-semibold text-purple-300 block mb-1">Step {i + 1}: {step.title}</span>
                        <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                        {step.code && (
                          <pre className="mt-2 bg-slate-950 p-2.5 rounded-lg text-xs font-mono text-pink-300 overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">
                      Understand how {skill.skill} operates in professional settings. Start by practicing simple syntax and applying it to small everyday problems.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400">Knowledge Check</span>
                <h4 className="text-white font-semibold text-base mt-2 mb-4">
                  {skill.quiz ? skill.quiz.question : `Which of the following is the key purpose of ${skill.skill}?`}
                </h4>

                <div className="space-y-2.5">
                  {(skill.quiz ? skill.quiz.options : [
                    "To structure, analyze, and communicate findings effectively",
                    "To delete database tables randomly",
                    "To replace human communication completely"
                  ]).map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = skill.quiz ? idx === skill.quiz.correctIndex : idx === 0;

                    let btnStyle = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10";
                    if (quizSubmitted) {
                      if (isCorrect) btnStyle = "bg-green-500/20 border-green-500/50 text-green-200 font-semibold";
                      else if (isSelected) btnStyle = "bg-red-500/20 border-red-500/50 text-red-200";
                    } else if (isSelected) {
                      btnStyle = "bg-purple-600/30 border-purple-500 text-white";
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
                  <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs">
                    {selectedQuizAnswer === (skill.quiz?.correctIndex ?? 0)
                      ? "🎉 Spot on! You understand the foundational concept."
                      : "💡 Close! Check out the Interactive Lesson tab to review the core definition."}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Clicking resources opens them in a new tab so you won't lose your progress.
          </div>
          <button
            onClick={handleComplete}
            disabled={completed}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              completed
                ? 'bg-green-600/30 text-green-300 border border-green-500/40 cursor-default'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
            }`}
          >
            <CheckCircle size={16} />
            {completed ? 'Skill Mastered! ✅' : 'Mark as Learned (+10%)'}
          </button>
        </div>

      </div>
    </div>
  );
}
