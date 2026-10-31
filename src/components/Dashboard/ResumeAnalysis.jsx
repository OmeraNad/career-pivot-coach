import { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Upload } from 'lucide-react';
import { assessResumeSkills } from '../../data/skillMatch';

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

function assessForm(form, knownSkills, roleSkills) {
  const listedSkills = form.existingSkills.split(/[,;\n]+/).map((skill) => skill.trim()).filter(Boolean);
  const allListedSkills = [...new Set([...(knownSkills || []), ...listedSkills])];
  const sources = [
    { type: 'resume', value: form.resumeText },
    { type: 'education', value: form.education },
    { type: 'experience', value: form.experience },
    { type: 'certifications', value: form.certifications },
    { type: 'projects', value: form.projects },
    { type: 'listed', value: allListedSkills.join('\n') },
  ];
  return {
    ...assessResumeSkills(roleSkills, sources),
    listedSkills: allListedSkills,
  };
}

function getSkillLevelsFromAssessment(assessment) {
  return Object.values(assessment.categories).flat().reduce((levels, skill) => {
    levels[skill.skill] = Math.round(skill.required * skill.proficiencyScore);
    return levels;
  }, {});
}

function getPdfParsingStatus(form, isReading, error) {
  if (isReading) return 'Parsing PDF…';
  if (!form.fileName) return error ? 'Parsing failed' : 'No PDF uploaded';
  if (!form.resumeText) return 'No selectable text found';
  return 'Parsed successfully';
}

function extractPageLines(items) {
  const lines = [];
  items.forEach((item) => {
    const text = item.str?.trim();
    if (!text) return;
    const y = item.transform?.[5];
    const previous = lines[lines.length - 1];
    if (previous && Number.isFinite(y) && Math.abs(previous.y - y) < 3) {
      previous.text += ` ${text}`;
    } else {
      lines.push({ y, text });
    }
  });
  return lines.map(({ text }) => text).join('\n');
}

export default function ResumeAnalysis({ user, targetRole, roleKey, roleConfig, updatePrefs }) {
  const storageKey = `cpc_resume_${user?.id || 'guest'}`;
  const [form, setForm] = useState(() => readResume(storageKey));
  const latestForm = useRef(form);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState('');
  const [syncMessage, setSyncMessage] = useState('');
  const roleSkills = useMemo(() => [
    ...roleConfig.skills.critical,
    ...roleConfig.skills.important,
    ...roleConfig.skills.niceToHave,
  ], [roleConfig]);
  const assessment = useMemo(() => {
    return assessForm(form, user?.prefs?.knownSkills, roleSkills);
  }, [form, roleSkills, user?.prefs?.knownSkills]);

  const updateSkillMap = (result) => {
    const resumeSkillLevels = {
      ...(user?.prefs?.resumeSkillLevels || {}),
      [roleKey]: getSkillLevelsFromAssessment(result),
    };
    updatePrefs({ resumeSkillLevels });
    setSyncMessage('Your resume assessment has been applied to the skill map.');
  };

  const updateForm = (field, value) => {
    const next = { ...form, [field]: value };
    latestForm.current = next;
    setForm(next);
    setSyncMessage('');
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
        pageText.push(extractPageLines(content.items));
      }
      const resumeText = pageText.join('\n').trim().slice(0, 100000);
      if (!resumeText) {
        setError('No selectable text was found in this PDF. It may be scanned; add your skills and experience in the fields below.');
      }
      const nextForm = { ...latestForm.current, fileName: file.name, resumeText };
      latestForm.current = nextForm;
      setForm(nextForm);
      setSyncMessage('');
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextForm));
        if (resumeText) {
          updateSkillMap(assessForm(nextForm, user?.prefs?.knownSkills, roleSkills));
        }
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

  const parseStatus = getPdfParsingStatus(form, isReading, error);
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
            <p className="text-[#797762] text-xs mt-1">Matched requirements are based only on skills found in your resume or entered information. Uploading a readable PDF applies its evidence to the skill map.</p>
          </div>
          <span className="text-[#68734A] font-bold text-sm whitespace-nowrap">{assessment.coverage}% skill coverage</span>
        </div>
        <div
          role="progressbar"
          aria-label="Calculated role skill coverage"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={assessment.coverage}
          className="h-2 rounded-full bg-[#D9D3C4] overflow-hidden"
        >
          <div className="h-full bg-[#68734A] transition-all" style={{ width: `${assessment.coverage}%` }} />
        </div>
        <p className="text-xs text-[#626153]">
          Coverage is weighted by each role skill’s requirement level: basic evidence counts 25%, intermediate evidence 65%, advanced evidence 90%, and missing or unassessed skills count zero.
        </p>
        <p className="text-xs text-[#626153]">
          Education and certifications can show familiarity; practical proficiency requires evidence of applying a skill in work or a project.
        </p>
        <div className="rounded-lg border border-[#D9D3C4] bg-white p-3">
          <h4 className="text-xs font-bold text-[#292923] mb-2">Resume assessment diagnostics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <p><span className="text-[#797762]">PDF parsing:</span> <strong>{parseStatus}</strong></p>
            <p><span className="text-[#797762]">Skills extracted:</span> <strong>{assessment.diagnostics.extractedSkills.length}</strong></p>
            <p><span className="text-[#797762]">Skills matched:</span> <strong>{assessment.diagnostics.matchedSkills.length}</strong></p>
            <p><span className="text-[#797762]">Partially matched:</span> <strong>{assessment.diagnostics.partialSkills.length}</strong></p>
            <p><span className="text-[#797762]">Missing skills:</span> <strong>{assessment.diagnostics.missingSkills.length}</strong></p>
            <p><span className="text-[#797762]">Not assessed:</span> <strong>{assessment.diagnostics.notAssessedSkills.length}</strong></p>
            <p><span className="text-[#797762]">Calculated coverage:</span> <strong>{assessment.coverage}%</strong></p>
          </div>
          <p className="text-xs text-[#797762] mt-2">
            Extracted role skills: {assessment.diagnostics.extractedSkills.length
              ? assessment.diagnostics.extractedSkills.map((skill) => `${skill.skill} (${skill.proficiency})`).join(', ')
              : 'No role skills matched from the uploaded PDF yet.'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['strengths', 'Demonstrated strengths', 'text-[#3F4A2F]'],
            ['partial', 'Partially demonstrated', 'text-[#866B34]'],
            ['improvement', 'Skills requiring improvement', 'text-[#866B34]'],
            ['missing', 'Missing from supplied evidence', 'text-[#8e3030]'],
            ['notAssessed', 'Not assessed', 'text-[#626153]'],
          ].map(([category, label, color]) => (
            <div key={category}>
              <p className={`text-xs font-bold ${color} mb-2`}>{label} ({assessment.categories[category].length})</p>
              {assessment.categories[category].length ? assessment.categories[category].map((skill) => (
                <div key={skill.skill} className="text-xs text-[#4D4A3F] mb-3">
                  <p className="flex gap-2 font-semibold">
                    {category === 'strengths' && <CheckCircle2 size={14} className="text-[#68734A] flex-shrink-0" />}
                    {skill.skill} <span className="text-[#797762] font-normal">· {skill.proficiency} · {skill.priority}</span>
                  </p>
                  <p className="mt-1 text-[#626153]">{skill.explanation}</p>
                  {skill.evidence.length > 0 && (
                    <p className="mt-1 text-[#797762] italic">Evidence: “{skill.evidence.slice(0, 2).join('” · “')}”</p>
                  )}
                </div>
              )) : <p className="text-xs text-[#797762]">No skills in this category.</p>}
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-3 pt-2 border-t border-[#D9D3C4]">
          <div>
            <p className="text-xs font-bold text-[#4D4A3F] mb-1">Experience provided</p>
            <p className="text-xs text-[#626153] whitespace-pre-wrap">{form.experience || 'No experience details provided.'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#4D4A3F] mb-1">Next improvements</p>
            <p className="text-xs text-[#626153]">
              {assessment.categories.missing.length || assessment.categories.improvement.length
                ? `Add truthful examples for ${[...assessment.categories.missing, ...assessment.categories.improvement].slice(0, 2).map((skill) => skill.skill).join(' and ')} where applicable, and consider a portfolio project to build practical evidence. Do not list skills you have not practiced.`
                : assessment.categories.notAssessed.length
                  ? 'Add more detail about your work, projects, or education so these skills can be assessed without assumptions.'
                  : 'No missing or developing skills were identified in the supplied evidence. Keep examples specific and accurate.'}
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
          onClick={() => updateSkillMap(assessment)}
          className="bg-white border border-[#D6D9C6] text-[#3F4A2F] rounded-lg px-3 py-2 text-xs font-semibold hover:bg-[#E9EBDD] transition-colors"
        >
          Update skill map from assessment
        </button>
        {syncMessage && <p role="status" className="text-xs text-[#3F4A2F]">{syncMessage}</p>}
      </div>
    </section>
  );
}
