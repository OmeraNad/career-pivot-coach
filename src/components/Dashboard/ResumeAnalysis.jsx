import { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Upload } from 'lucide-react';
import { getSkillLevels } from '../../data/skillMatch';

const emptyResume = {
  fileName: '',
  resumeText: '',
  existingSkills: '',
  education: '',
  experience: '',
  certifications: '',
  projects: '',
};

function readResume(key) {
  try {
    return { ...emptyResume, ...JSON.parse(localStorage.getItem(key) || '{}') };
  } catch {
    return emptyResume;
  }
}

export default function ResumeAnalysis({ user, targetRole, roleKey, roleConfig, updatePrefs }) {
  const storageKey = `cpc_resume_${user?.id || 'guest'}`;
  const [form, setForm] = useState(() => readResume(storageKey));
  const latestForm = useRef(form);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState('');
  const roleSkills = useMemo(() => [
    ...roleConfig.skills.critical,
    ...roleConfig.skills.important,
    ...roleConfig.skills.niceToHave,
  ], [roleConfig]);
  const assessment = useMemo(() => {
    const listedSkills = form.existingSkills.split(/[,;\n]+/).map((skill) => skill.trim()).filter(Boolean);
    const profileSkills = user?.prefs?.knownSkills || [];
    const allListedSkills = [...new Set([...profileSkills, ...listedSkills])];
    const profileText = [
      form.resumeText,
      form.education,
      form.experience,
      form.certifications,
      form.projects,
    ].filter(Boolean).join('\n');
    const levels = getSkillLevels(roleKey, [...allListedSkills, profileText], 55);
    const strengths = roleSkills.filter((skill) => levels[skill.skill] !== undefined);
    const missing = roleSkills.filter((skill) => (levels[skill.skill] || 0) < skill.required - 5);
    return {
      strengths,
      missing,
      readiness: Math.round((strengths.length / Math.max(1, roleSkills.length)) * 100),
      listedSkills: allListedSkills,
    };
  }, [form, roleKey, roleSkills, user?.prefs?.knownSkills]);

  const updateForm = (field, value) => {
    const next = { ...form, [field]: value };
    latestForm.current = next;
    setForm(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      setError('Could not save this resume information in browser storage. Try a shorter resume or fewer notes.');
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Choose a PDF file.');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('PDFs must be 10 MB or smaller.');
      event.target.value = '';
      return;
    }
    setIsReading(true);
    try {
      const [pdfjs, worker] = await Promise.all([
        import('pdfjs-dist'),
        import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
      ]);
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      const document = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
      const pageText = [];
      for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const content = await page.getTextContent();
        pageText.push(content.items.map((item) => item.str).join(' '));
      }
      const resumeText = pageText.join('\n').trim().slice(0, 100000);
      if (!resumeText) {
        setError('No selectable text was found in this PDF. It may be scanned; add your skills and experience in the fields below.');
      }
      const nextForm = { ...latestForm.current, fileName: file.name, resumeText };
      latestForm.current = nextForm;
      setForm(nextForm);
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextForm));
      } catch {
        setError('Could not save this resume information in browser storage. Try a shorter resume or fewer notes.');
      }
    } catch (readError) {
      setError(`Could not read this PDF: ${readError.message || 'the file may be damaged or protected'}. You can still enter your information below.`);
    } finally {
      setIsReading(false);
      event.target.value = '';
    }
  };

  const saveSkillsToProfile = () => {
    const detected = assessment.strengths.map((skill) => skill.skill);
    updatePrefs({
      knownSkills: [...new Set([...assessment.listedSkills, ...detected])],
      skillConfidence: 55,
    });
  };

  return (
    <section className="bg-white border border-[#D9D3C4] rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText size={18} className="text-[#68734A]" />
          <h2 className="text-[#292923] font-bold text-base">Resume and target-role review</h2>
        </div>
        <p className="text-[#626153] text-xs leading-relaxed">
          Review your information locally against the curated {targetRole} skill baseline. Your resume is not sent to a server, and this is not an employer or AI evaluation.
        </p>
      </div>

      <label className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-[#A6AA8B] bg-[#FFFDF7] cursor-pointer hover:bg-[#E9EBDD] transition-colors">
        <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#68734A]">
          {isReading ? <span className="w-4 h-4 rounded-full border-2 border-[#A6AA8B] border-t-[#68734A] animate-spin" /> : <Upload size={19} />}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[#292923] text-sm font-semibold">{isReading ? 'Reading PDF on this device…' : 'Upload a PDF resume'}</span>
          <span className="block text-[#797762] text-xs truncate">{form.fileName || 'Text extraction only; scanned PDFs can be entered manually.'}</span>
        </span>
        <input type="file" accept="application/pdf,.pdf" onChange={handleUpload} className="sr-only" disabled={isReading} />
      </label>

      {error && (
        <div role="alert" className="flex items-start gap-2 bg-[#faebeb] border border-[#f2c8c8] rounded-xl p-3 text-xs text-[#8e3030]">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />{error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        <label className="text-xs font-semibold text-[#4D4A3F]">
          Target role
          <div className="mt-1 px-3 py-2.5 rounded-lg bg-[#E9EBDD] border border-[#D6D9C6] text-[#3F4A2F]">{targetRole}</div>
        </label>
        <label className="text-xs font-semibold text-[#4D4A3F]">
          Existing skills (comma separated)
          <input
            value={form.existingSkills}
            onChange={(event) => updateForm('existingSkills', event.target.value)}
            placeholder="e.g. SQL, Excel, financial modeling"
            className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#FFFDF7] border border-[#D9D3C4] text-[#292923] font-normal focus:outline-none focus:border-[#68734A]"
          />
        </label>
        {[
          ['education', 'Education'],
          ['experience', 'Experience'],
          ['certifications', 'Certifications'],
          ['projects', 'Projects'],
        ].map(([field, label]) => (
          <label key={field} className="text-xs font-semibold text-[#4D4A3F]">
            {label}
            <textarea
              value={form[field]}
              onChange={(event) => updateForm(field, event.target.value)}
              rows={2}
              placeholder={`Add your ${label.toLowerCase()} (optional)`}
              className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#FFFDF7] border border-[#D9D3C4] text-[#292923] font-normal resize-y focus:outline-none focus:border-[#68734A]"
            />
          </label>
        ))}
      </div>

      <div className="rounded-xl border border-[#D9D3C4] bg-[#FFFDF7] p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[#292923] font-bold text-sm">Local skill-gap assessment</h3>
            <p className="text-[#797762] text-xs mt-1">Matched requirements are based only on skills found in your resume or entered information.</p>
          </div>
          <span className="text-[#68734A] font-bold text-sm whitespace-nowrap">{assessment.readiness}% skill coverage</span>
        </div>
        <div className="h-2 rounded-full bg-[#D9D3C4] overflow-hidden">
          <div className="h-full bg-[#68734A] transition-all" style={{ width: `${assessment.readiness}%` }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-[#3F4A2F] mb-2">Strengths found ({assessment.strengths.length})</p>
            {assessment.strengths.length ? assessment.strengths.map((skill) => (
              <p key={skill.skill} className="flex gap-2 text-xs text-[#4D4A3F] mb-1">
                <CheckCircle2 size={14} className="text-[#68734A] flex-shrink-0" />{skill.skill}
              </p>
            )) : <p className="text-xs text-[#797762]">No matching skills found yet. Add skills or upload a text-based PDF.</p>}
          </div>
          <div>
            <p className="text-xs font-bold text-[#866B34] mb-2">Priority skills to develop ({assessment.missing.length})</p>
            {assessment.missing.map((skill) => (
              <p key={skill.skill} className="text-xs text-[#4D4A3F] mb-1">{skill.skill} <span className="text-[#797762]">· {skill.priority}</span></p>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 pt-2 border-t border-[#D9D3C4]">
          <div>
            <p className="text-xs font-bold text-[#4D4A3F] mb-1">Experience provided</p>
            <p className="text-xs text-[#626153] whitespace-pre-wrap">{form.experience || 'No experience details provided.'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#4D4A3F] mb-1">Next improvements</p>
            <p className="text-xs text-[#626153]">
              {assessment.missing.length
                ? `Add truthful examples of ${assessment.missing.slice(0, 2).map((skill) => skill.skill).join(' and ')} where applicable, and consider a portfolio project to demonstrate them. Do not list skills you have not practiced.`
                : 'No priority skill gaps were detected against this curated baseline. Review your resume for clear, specific evidence and keep the information accurate.'}
            </p>
          </div>
        </div>
        {form.resumeText && (
          <div className="pt-2 border-t border-[#D9D3C4]">
            <p className="text-xs font-bold text-[#4D4A3F] mb-1">Text extracted from your resume</p>
            <p className="text-xs text-[#626153] whitespace-pre-wrap break-words">{form.resumeText.slice(0, 1000)}{form.resumeText.length > 1000 ? '…' : ''}</p>
          </div>
        )}
        <button
          type="button"
          onClick={saveSkillsToProfile}
          className="bg-white border border-[#D6D9C6] text-[#3F4A2F] rounded-lg px-3 py-2 text-xs font-semibold hover:bg-[#E9EBDD] transition-colors"
        >
          Use these skills in my skill map
        </button>
      </div>
    </section>
  );
}
