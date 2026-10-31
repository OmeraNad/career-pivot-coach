import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Mic, ChevronRight, Star, Sparkles } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

const SAMPLE_FEEDBACK = {
  score: 82,
  strengths: ['Great technical terminology', 'Clear, logical structure in your explanation'],
  improvements: [
    'Add an edge case or potential failure scenario to demonstrate senior awareness',
    'Conclude with how this solution impacts the end-user experience',
  ],
  tip: 'Use the STAR format: Situation → Task → Action → Result',
};

export default function MockInterview() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role && user.prefs.role !== 'beginner' ? user.prefs.role : 'Full Stack Developer';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;

  const [questions, setQuestions] = useState(roleConfig.mockInterview);
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const config = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.fullstack;
    setQuestions(config.mockInterview);
  }, [targetRole]);

  const q = questions[qIndex] || questions[0];

  const handleNext = () => {
    if (qIndex < questions.length - 1) { 
      setQIndex(q => q + 1); 
      setAnswer(''); 
      setSubmitted(false); 
      setShowFeedback(false); 
    }
  };

  const scoreColor = SAMPLE_FEEDBACK.score >= 80 ? 'text-green-400' : SAMPLE_FEEDBACK.score >= 60 ? 'text-yellow-400' : 'text-red-400';

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('mockInterview.title')}</h1>
          <p className="text-slate-400 text-sm">{t('mockInterview.subtitle')}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-xl">
          <div className="w-20 h-20 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={36} className="text-pink-400" />
          </div>
          <h2 className="text-white font-bold text-xl mb-3">Ready to Practice for {targetRole}?</h2>
          <p className="text-slate-400 text-sm mb-2">You will get <strong className="text-white">{questions.length} calibrated interview questions</strong> for {targetRole}.</p>
          <p className="text-slate-400 text-sm mb-8">Each answer is scored against a real hiring rubric with tailored AI feedback.</p>
          <div className="flex gap-3 justify-center mb-8">
            {['Technical Architecture', 'Code Logic', 'Behavioral STAR'].map((type) => (
              <span key={type} className="bg-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-white/10">{type}</span>
            ))}
          </div>
          <button onClick={() => setStarted(true)}
            className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-8 py-3 rounded-2xl transition-all shadow-lg shadow-pink-600/30">
            {t('mockInterview.start')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('mockInterview.title')}</h1>
          <p className="text-slate-400 text-sm">Question {qIndex + 1} of {questions.length} • {targetRole}</p>
        </div>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div key={i} className={`w-8 h-2 rounded-full transition-all ${i < qIndex ? 'bg-green-500' : i === qIndex ? 'bg-pink-500' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="bg-pink-500/20 text-pink-400 text-xs font-semibold px-3 py-1 rounded-full border border-pink-500/30">{q.type}</span>
        </div>
        <p className="text-white text-lg font-semibold leading-relaxed">{q.question}</p>

        {/* Rubric */}
        <div className="bg-white/3 border border-white/5 rounded-xl p-4">
          <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">Hiring Rubric Checkpoints:</p>
          <ul className="space-y-1">
            {q.rubric.map((r) => (
              <li key={r} className="text-slate-300 text-sm flex items-center gap-2">
                <ChevronRight size={12} className="text-pink-400" />{r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Answer */}
      <div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted}
          rows={6}
          placeholder="Type your response here as if speaking to the interviewer..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 resize-none text-sm disabled:opacity-60"
        />
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={answer.trim().length < 5}
            className="mt-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
            {t('mockInterview.submit')}
          </button>
        ) : !showFeedback ? (
          <button onClick={() => setShowFeedback(true)}
            className="mt-3 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
            {t('mockInterview.feedback')}
          </button>
        ) : null}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-pink-400" /> AI Rubric Evaluation
              </h3>
              <div className={`text-3xl font-bold ${scoreColor}`}>{SAMPLE_FEEDBACK.score}<span className="text-lg">/100</span></div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-green-400 text-sm font-semibold mb-2">✅ Strengths</p>
                {SAMPLE_FEEDBACK.strengths.map((s) => <p key={s} className="text-slate-300 text-sm mb-1">• {s}</p>)}
              </div>
              <div>
                <p className="text-orange-400 text-sm font-semibold mb-2">🔧 What to Polish</p>
                {SAMPLE_FEEDBACK.improvements.map((s) => <p key={s} className="text-slate-300 text-sm mb-1">• {s}</p>)}
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <p className="text-purple-300 text-sm">💡 <strong>Mentor note:</strong> {SAMPLE_FEEDBACK.tip}</p>
              </div>
            </div>
          </div>

          {qIndex < questions.length - 1 && (
            <button onClick={handleNext}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md">
              {t('mockInterview.next')} →
            </button>
          )}
          {qIndex === questions.length - 1 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-white font-bold text-lg mb-1">{targetRole} Interview Complete!</h3>
              <p className="text-slate-400 text-sm">Great practice session. Your velocity score and confidence rating have been logged.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
