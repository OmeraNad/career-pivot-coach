import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Mic, ChevronRight, Sparkles } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

const SAMPLE_FEEDBACK = {
  score: 84,
  strengths: ['Great technical clarity', 'Structured step-by-step reasoning'],
  improvements: [
    'Mention potential performance bottlenecks or failure edge cases',
    'Summarize how your architectural decision benefits the business or user experience',
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

  const scoreColor = SAMPLE_FEEDBACK.score >= 80 ? 'text-[#3f5022]' : 'text-[#8a6b18]';

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('mockInterview.title')}</h1>
          <p className="text-[#636659] text-sm">{t('mockInterview.subtitle')}</p>
        </div>
        <div className="bg-white border border-[#e2dfd4] rounded-3xl p-10 text-center shadow-xs">
          <div className="w-20 h-20 bg-[#edf1e6] border border-[#d6dec8] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={36} className="text-[#556b2f]" />
          </div>
          <h2 className="text-[#1e2019] font-bold text-xl mb-3">Ready to Practice for {targetRole}?</h2>
          <p className="text-[#636659] text-sm mb-2">You will get <strong className="text-[#1e2019]">{questions.length} calibrated interview questions</strong> for {targetRole}.</p>
          <p className="text-[#636659] text-sm mb-8">Each answer is scored against a real hiring rubric with tailored AI feedback.</p>
          <div className="flex gap-3 justify-center mb-8">
            {['Technical Architecture', 'Code Logic', 'Behavioral STAR'].map((type) => (
              <span key={type} className="bg-[#f0eee6] text-[#4b4e43] text-xs px-3.5 py-1.5 rounded-full border border-[#e2dfd4] font-medium">{type}</span>
            ))}
          </div>
          <button onClick={() => setStarted(true)}
            className="bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-xs">
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
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('mockInterview.title')}</h1>
          <p className="text-[#636659] text-sm">Question {qIndex + 1} of {questions.length} • {targetRole}</p>
        </div>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div key={i} className={`w-8 h-2 rounded-full transition-all ${i < qIndex ? 'bg-[#556b2f]' : i === qIndex ? 'bg-[#708643]' : 'bg-[#e2dfd4]'}`} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="bg-[#edf1e6] text-[#455633] text-xs font-semibold px-3 py-1 rounded-full border border-[#d6dec8]">{q.type}</span>
        </div>
        <p className="text-[#1e2019] text-lg font-bold leading-relaxed">{q.question}</p>

        {/* Rubric */}
        <div className="bg-[#faf9f5] border border-[#e2dfd4] rounded-xl p-4">
          <p className="text-[#7d8270] text-xs font-bold mb-2 uppercase tracking-wider">Hiring Rubric Checkpoints:</p>
          <ul className="space-y-1.5">
            {q.rubric.map((r) => (
              <li key={r} className="text-[#4b4e43] text-sm flex items-center gap-2">
                <ChevronRight size={14} className="text-[#556b2f]" />{r}
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
          className="w-full bg-white border border-[#dcd8cb] rounded-2xl p-4 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 resize-none text-sm disabled:opacity-60 shadow-xs"
        />
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={answer.trim().length < 5}
            className="mt-3 bg-[#556b2f] hover:bg-[#445625] disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs">
            {t('mockInterview.submit')}
          </button>
        ) : !showFeedback ? (
          <button onClick={() => setShowFeedback(true)}
            className="mt-3 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs">
            {t('mockInterview.feedback')}
          </button>
        ) : null}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#1e2019] font-bold flex items-center gap-2">
                <Sparkles size={18} className="text-[#556b2f]" /> AI Rubric Evaluation
              </h3>
              <div className={`text-3xl font-bold ${scoreColor}`}>{SAMPLE_FEEDBACK.score}<span className="text-lg">/100</span></div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[#3f5022] text-sm font-bold mb-2">✅ Key Strengths</p>
                {SAMPLE_FEEDBACK.strengths.map((s) => <p key={s} className="text-[#4b4e43] text-sm mb-1">• {s}</p>)}
              </div>
              <div>
                <p className="text-[#8a6b18] text-sm font-bold mb-2">🔧 Suggested Improvements</p>
                {SAMPLE_FEEDBACK.improvements.map((s) => <p key={s} className="text-[#4b4e43] text-sm mb-1">• {s}</p>)}
              </div>
              <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-xl px-4 py-3">
                <p className="text-[#3f5022] text-sm">💡 <strong>Mentor advice:</strong> {SAMPLE_FEEDBACK.tip}</p>
              </div>
            </div>
          </div>

          {qIndex < questions.length - 1 && (
            <button onClick={handleNext}
              className="w-full bg-[#556b2f] hover:bg-[#445625] text-white font-semibold py-3.5 rounded-xl transition-all shadow-xs">
              {t('mockInterview.next')} →
            </button>
          )}
          {qIndex === questions.length - 1 && (
            <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-[#1e2019] font-bold text-lg mb-1">{targetRole} Interview Complete!</h3>
              <p className="text-[#636659] text-sm">Great practice session. Your velocity score and confidence rating have been logged.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
