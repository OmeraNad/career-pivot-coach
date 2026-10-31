import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Mic, ChevronRight, Sparkles, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';

function evaluateInterviewAnswer(answer, question) {
  const clean = (answer || '').trim().toLowerCase();

  // 1. Check for "I don't know" / "idk" / very short answers
  const isDontKnow = clean.includes("don't know") || 
                     clean.includes("dont know") || 
                     clean.includes("idk") || 
                     clean.includes("no idea") || 
                     clean.includes("not sure") ||
                     clean.length < 15;

  if (isDontKnow) {
    return {
      score: 18,
      status: 'needs-study',
      strengths: [
        'Honesty in acknowledging knowledge gaps is better than guessing randomly in interviews.'
      ],
      improvements: [
        'In a real interview, never stop at "I don\'t know"—always state what you know adjacent to the topic or how you would investigate.',
        'Review the key terminology listed in the rubric below.'
      ],
      tip: `Here is the model answer to study: "${question.idealAnswer || 'Focus on the core concept and explain its real-world impact.'}"`
    };
  }

  // 2. Check keyword coverage against question rubric
  const keywords = question.keywords || ['situation', 'action', 'result', 'metric'];
  const matched = keywords.filter(kw => clean.includes(kw.toLowerCase()));
  const matchRatio = matched.length / Math.max(1, keywords.length);

  let calculatedScore = Math.min(95, Math.round(45 + (matchRatio * 50)));
  if (clean.length > 150) calculatedScore = Math.min(98, calculatedScore + 5);

  const missingKeywords = keywords.filter(kw => !clean.includes(kw.toLowerCase())).slice(0, 3);

  const improvements = [];
  if (missingKeywords.length > 0) {
    improvements.push(`Make sure to specifically address: ${missingKeywords.join(', ')}.`);
  }
  if (!clean.includes('because') && !clean.includes('result') && !clean.includes('led to')) {
    improvements.push('Conclude with the measurable outcome or why this decision was made.');
  }
  if (improvements.length === 0) {
    improvements.push('Consider mentioning edge cases or trade-offs for a senior-level answer.');
  }

  return {
    score: calculatedScore,
    status: calculatedScore >= 75 ? 'passed' : 'needs-work',
    strengths: [
      `Addressed ${matched.length > 0 ? matched.join(', ') : 'the central prompt'} directly`,
      clean.length > 100 ? 'Good depth and sentence structure' : 'Clear communication'
    ],
    improvements,
    tip: `Mentor takeaway: ${question.idealAnswer || 'Structure answers clearly with context, action, and results.'}`
  };
}

export default function MockInterview() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const targetRole = user?.prefs?.role || 'Product Manager';
  const roleConfig = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.productManager;

  const [questions, setQuestions] = useState(roleConfig.mockInterview);
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const config = ROLE_DATA[getRoleKey(targetRole)] || ROLE_DATA.productManager;
    setQuestions(config.mockInterview);
    setQIndex(0);
    setAnswer('');
    setSubmitted(false);
    setFeedback(null);
  }, [targetRole]);

  const q = questions[qIndex] || questions[0];

  const handleSubmitAnswer = () => {
    const evalResult = evaluateInterviewAnswer(answer, q);
    setFeedback(evalResult);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) { 
      setQIndex(q => q + 1); 
      setAnswer(''); 
      setSubmitted(false); 
      setFeedback(null); 
    }
  };

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
          <h2 className="text-[#1e2019] font-bold text-xl mb-3">Practice Real Interview Questions for {targetRole}</h2>
          <p className="text-[#636659] text-sm mb-2">You will get <strong className="text-[#1e2019]">{questions.length} calibrated questions</strong> matched to hiring standards.</p>
          <p className="text-[#636659] text-sm mb-8">Each response is evaluated in real-time against rubric keywords, with instant score and ideal model answers.</p>
          
          <button onClick={() => setStarted(true)}
            className="bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-xs">
            {t('mockInterview.start')}
          </button>
        </div>
      </div>
    );
  }

  const scoreBadgeColor = !feedback ? '' : feedback.score >= 75 ? 'text-[#3f5022] bg-[#edf1e6]' : feedback.score >= 40 ? 'text-[#8a6b18] bg-[#fbf5e6]' : 'text-[#ba3c3c] bg-[#faebeb]';

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
          rows={5}
          placeholder="Type your response here... (Try explaining in your own words, or test what happens if you're unsure)"
          className="w-full bg-white border border-[#dcd8cb] rounded-2xl p-4 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 resize-none text-sm disabled:opacity-60 shadow-xs"
        />
        {!submitted && (
          <button 
            onClick={handleSubmitAnswer} 
            disabled={answer.trim().length === 0}
            className="mt-3 bg-[#556b2f] hover:bg-[#445625] disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs"
          >
            {t('mockInterview.submit')} & Evaluate
          </button>
        )}
      </div>

      {/* Feedback Card */}
      {submitted && feedback && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eee6]">
              <div>
                <h3 className="text-[#1e2019] font-bold flex items-center gap-2 text-base">
                  <Sparkles size={18} className="text-[#556b2f]" /> AI Rubric Evaluation
                </h3>
                <span className="text-xs text-[#7d8270]">
                  {feedback.score >= 75 ? 'Strong Answer' : feedback.score >= 40 ? 'Partial Credit' : 'Needs Practice'}
                </span>
              </div>
              <div className={`text-2xl font-bold px-3 py-1 rounded-xl border border-current ${scoreBadgeColor}`}>
                {feedback.score}<span className="text-sm font-normal">/100</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[#3f5022] text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={14} /> What was strong:
                </p>
                {feedback.strengths.map((s, idx) => (
                  <p key={idx} className="text-[#4b4e43] text-sm ml-4">• {s}</p>
                ))}
              </div>

              <div>
                <p className="text-[#8a6b18] text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertCircle size={14} /> What to improve:
                </p>
                {feedback.improvements.map((imp, idx) => (
                  <p key={idx} className="text-[#4b4e43] text-sm ml-4">• {imp}</p>
                ))}
              </div>

              {/* Ideal Answer Suggestion */}
              <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-xl p-4 mt-3">
                <span className="text-xs font-bold text-[#3f5022] flex items-center gap-1.5 mb-1.5">
                  <BookOpen size={14} /> Model Answer to Learn From:
                </span>
                <p className="text-[#2b2d27] text-xs leading-relaxed italic">
                  "{q.idealAnswer}"
                </p>
              </div>
            </div>
          </div>

          {qIndex < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="w-full bg-[#556b2f] hover:bg-[#445625] text-white font-semibold py-3.5 rounded-xl transition-all shadow-xs"
            >
              {t('mockInterview.next')} →
            </button>
          ) : (
            <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-[#1e2019] font-bold text-base mb-1">{targetRole} Interview Complete!</h3>
              <p className="text-[#636659] text-xs">Your responses have been evaluated against hiring criteria. Practice again anytime to refine your delivery.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
