import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Mic, ChevronRight, Sparkles, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { ROLE_DATA, getRoleKey } from '../../data/roleData';
import { getSkillLevels } from '../../data/skillMatch';

function evaluateInterviewAnswer(answer, question) {
  const clean = (answer || '').trim().toLowerCase();
  const words = clean.split(/\s+/).filter(Boolean);
  const keywords = question.keywords || ['situation', 'action', 'result', 'metric'];

  const isDontKnow = clean.includes("don't know") || 
                     clean.includes("dont know") || 
                     clean.includes("idk") || 
                     clean.includes("no idea") || 
                     clean.includes("not sure") ||
                     clean.length < 15;

  if (isDontKnow) {
    return {
      score: 18,
      scoreBreakdown: {
        Relevance: 18,
        'Technical accuracy': 18,
        Clarity: 18,
        Communication: 18,
        'Problem-solving': 18,
      },
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

  const matched = keywords.filter(kw => clean.includes(kw.toLowerCase()));
  const matchRatio = matched.length / Math.max(1, keywords.length);
  const sentenceCount = (clean.match(/[.!?]/g) || []).length;
  const relevance = Math.round(30 + (matchRatio * 70));
  const technicalAccuracy = Math.round(30 + (matchRatio * 70));
  const clarity = Math.min(100, 35 + (words.length >= 30 ? 30 : words.length >= 15 ? 15 : 0) + (sentenceCount >= 2 ? 20 : 5));
  const communication = Math.min(100, 40 + (words.length >= 25 ? 25 : words.length >= 12 ? 15 : 0) + (sentenceCount >= 2 ? 15 : 0));
  const problemSignals = ['approach', 'clarify', 'check', 'result', 'because', 'test', 'verify', 'measure', 'trade-off', 'example'];
  const problemSolving = Math.min(100, 25 + problemSignals.filter((signal) => clean.includes(signal)).length * 15);
  const scoreBreakdown = {
    Relevance: relevance,
    'Technical accuracy': technicalAccuracy,
    Clarity: clarity,
    Communication: communication,
    'Problem-solving': problemSolving,
  };
  const calculatedScore = Math.round(Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0) / 5);

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
    scoreBreakdown,
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
  const roleKey = getRoleKey(targetRole);
  const roleConfig = ROLE_DATA[roleKey] || ROLE_DATA.productManager;
  const roleSkills = [...roleConfig.skills.critical, ...roleConfig.skills.important, ...roleConfig.skills.niceToHave];
  const knownSkillLevels = getSkillLevels(roleKey, user?.prefs?.knownSkills, user?.prefs?.skillConfidence);
  const questionFocus = roleSkills.find((skill) => !knownSkillLevels[skill.skill])
    || roleSkills[0];
  const questionsForRole = (roleConfig.mockInterview || []).map((question) => question.type === 'Technical' && questionFocus
    ? {
      ...question,
      question: `Describe how you would use ${questionFocus.skill} in a ${targetRole} project.`,
      keywords: [questionFocus.skill.toLowerCase(), 'example', 'result'],
      idealAnswer: `A strong answer explains how ${questionFocus.skill} applies to ${targetRole}, gives a truthful example, and describes how to verify the result.`,
    }
    : question);

  const [questions] = useState(questionsForRole);
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sessionScores, setSessionScores] = useState([]);
  const [storageError, setStorageError] = useState('');

  const q = questions[qIndex] || questions[0];

  const handleSubmitAnswer = () => {
    const evalResult = evaluateInterviewAnswer(answer, q);
    setFeedback(evalResult);
    setSubmitted(true);
    setSessionScores((previous) => [...previous, evalResult]);
    try {
      const key = `cpc_interviews_${user?.id || 'guest'}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([
        ...saved,
        { role: targetRole, score: evalResult.score, scoreBreakdown: evalResult.scoreBreakdown, type: q.type, recordedAt: new Date().toISOString() },
      ]));
    } catch (error) {
      console.error('Could not save mock interview feedback.', error);
      setStorageError('Feedback could not be saved in browser storage.');
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) { 
      setQIndex(q => q + 1); 
      setAnswer(''); 
      setSubmitted(false); 
      setFeedback(null); 
    }
  };

  const restartInterview = () => {
    setStarted(false);
    setQIndex(0);
    setAnswer('');
    setSubmitted(false);
    setFeedback(null);
    setSessionScores([]);
    setStorageError('');
  };

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#292923] mb-1">{t('mockInterview.title')}</h1>
          <p className="text-[#626153] text-sm">{t('mockInterview.subtitle')}</p>
        </div>
        <div className="bg-white border border-[#D9D3C4] rounded-3xl p-10 text-center shadow-xs">
          <div className="w-20 h-20 bg-[#E9EBDD] border border-[#D6D9C6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={36} className="text-[#68734A]" />
          </div>
          <h2 className="text-[#292923] font-bold text-xl mb-3">Practice interview questions for {targetRole}</h2>
          <p className="text-[#626153] text-sm mb-2">Practice {questions.length} role-specific questions, including a skill selected from your current profile gaps.</p>
          <p className="text-[#626153] text-sm mb-8">Feedback uses an on-device keyword and writing-structure rubric. It is not AI, an employer evaluation, or a measure of hiring likelihood.</p>
          
          <button onClick={() => setStarted(true)}
            className="bg-[#68734A] hover:bg-[#515D3A] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-xs">
            {t('mockInterview.start')}
          </button>
        </div>
      </div>
    );
  }

  const scoreBadgeColor = !feedback ? '' : feedback.score >= 75 ? 'text-[#3F4A2F] bg-[#E9EBDD]' : feedback.score >= 40 ? 'text-[#866B34] bg-[#F4EDDB]' : 'text-[#ba3c3c] bg-[#faebeb]';
  const sessionAverage = Math.round(sessionScores.reduce((sum, result) => sum + result.score, 0) / Math.max(sessionScores.length, 1));
  const focusAreas = sessionScores.length
    ? Object.keys(sessionScores[0].scoreBreakdown).map((dimension) => ({
      dimension,
      average: Math.round(sessionScores.reduce((sum, result) => sum + result.scoreBreakdown[dimension], 0) / sessionScores.length),
    })).filter((item) => item.average < 70)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#292923] mb-1">{t('mockInterview.title')}</h1>
          <p className="text-[#626153] text-sm">Question {qIndex + 1} of {questions.length} • {targetRole}</p>
        </div>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div key={i} className={`w-8 h-2 rounded-full transition-all ${i < qIndex ? 'bg-[#68734A]' : i === qIndex ? 'bg-[#87906A]' : 'bg-[#D9D3C4]'}`} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-[#D9D3C4] rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="bg-[#E9EBDD] text-[#4F5B3D] text-xs font-semibold px-3 py-1 rounded-full border border-[#D6D9C6]">{q.type}</span>
        </div>
        <p className="text-[#292923] text-lg font-bold leading-relaxed">{q.question}</p>

        {/* Rubric */}
        <div className="bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl p-4">
          <p className="text-[#797762] text-xs font-bold mb-2 uppercase tracking-wider">Practice rubric checkpoints:</p>
          <ul className="space-y-1.5">
            {q.rubric.map((r) => (
              <li key={r} className="text-[#4D4A3F] text-sm flex items-center gap-2">
                <ChevronRight size={14} className="text-[#68734A]" />{r}
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
          className="w-full bg-white border border-[#D9D3C4] rounded-2xl p-4 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 resize-none text-sm disabled:opacity-60 shadow-xs"
        />
        {!submitted && (
          <button 
            onClick={handleSubmitAnswer} 
            disabled={answer.trim().length === 0}
            className="mt-3 bg-[#68734A] hover:bg-[#515D3A] disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs"
          >
            {t('mockInterview.submit')} & Evaluate
          </button>
        )}
      </div>

      {/* Feedback Card */}
      {submitted && feedback && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white border border-[#D9D3C4] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEADF]">
              <div>
                <h3 className="text-[#292923] font-bold flex items-center gap-2 text-base">
                  <Sparkles size={18} className="text-[#68734A]" /> Practice rubric feedback
                </h3>
                <span className="text-xs text-[#797762]">
                  {feedback.score >= 75 ? 'Strong Answer' : feedback.score >= 40 ? 'Partial Credit' : 'Needs Practice'}
                </span>
              </div>
              <div className={`text-2xl font-bold px-3 py-1 rounded-xl border border-current ${scoreBadgeColor}`}>
                {feedback.score}<span className="text-sm font-normal">/100</span>
              </div>
            </div>

            <p className="text-xs text-[#797762]">Automated practice feedback based on text signals only; it cannot verify factual or technical correctness.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(feedback.scoreBreakdown).map(([label, score]) => (
                <div key={label} className="bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl p-3">
                  <div className="text-[#292923] font-bold text-sm">{score}%</div>
                  <div className="text-[#797762] text-[10px] mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[#3F4A2F] text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={14} /> What was strong:
                </p>
                {feedback.strengths.map((s, idx) => (
                  <p key={idx} className="text-[#4D4A3F] text-sm ml-4">• {s}</p>
                ))}
              </div>

              <div>
                <p className="text-[#866B34] text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertCircle size={14} /> What to improve:
                </p>
                {feedback.improvements.map((imp, idx) => (
                  <p key={idx} className="text-[#4D4A3F] text-sm ml-4">• {imp}</p>
                ))}
              </div>

              {/* Ideal Answer Suggestion */}
              <div className="bg-[#E9EBDD] border border-[#D6D9C6] rounded-xl p-4 mt-3">
                <span className="text-xs font-bold text-[#3F4A2F] flex items-center gap-1.5 mb-1.5">
                  <BookOpen size={14} /> Model Answer to Learn From:
                </span>
                <p className="text-[#292923] text-xs leading-relaxed italic">
                  "{q.idealAnswer}"
                </p>
              </div>
            </div>
            {storageError && <p role="alert" className="text-xs text-[#ba3c3c]">{storageError}</p>}
          </div>

          {qIndex < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="w-full bg-[#68734A] hover:bg-[#515D3A] text-white font-semibold py-3.5 rounded-xl transition-all shadow-xs"
            >
              {t('mockInterview.next')} →
            </button>
          ) : (
            <div className="bg-[#E9EBDD] border border-[#D6D9C6] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-[#292923] font-bold text-base mb-1">{targetRole} Interview Complete!</h3>
              <p className="text-[#626153] text-xs">Practice average: {sessionAverage}% across {sessionScores.length} answers.</p>
              <p className="text-[#626153] text-xs mt-2">
                {focusAreas.length
                  ? `Suggested practice focus: ${focusAreas.map((item) => `${item.dimension} (${item.average}%)`).join(', ')}.`
                  : 'No rubric dimension fell below 70%. Keep practicing with specific examples and role-relevant detail.'}
              </p>
              <button onClick={restartInterview} className="mt-4 bg-white border border-[#D6D9C6] text-[#3F4A2F] font-semibold px-4 py-2 rounded-xl text-xs hover:bg-[#FFFDF7]">
                Practice again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
