import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, TrendingUp, Building, X, Briefcase, ExternalLink } from 'lucide-react';
import { CAREER_ROLES } from '../../data/careerCatalog';

const STATUSES = ['Interested', 'Applied', 'Assessment', 'Interview', 'Rejected', 'Selected'];
const STATUS_COLORS = {
  Interested: 'bg-[#f0eee6] text-[#636659] border-[#e2dfd4]',
  Applied: 'bg-[#edf1e6] text-[#455633] border-[#d6dec8]',
  Assessment: 'bg-[#fbf5e6] text-[#8a6b18] border-[#f0e2bd]',
  Interview: 'bg-[#eef3f7] text-[#2c5f7d] border-[#cee0ec]',
  Rejected: 'bg-[#faebeb] text-[#ba3c3c] border-[#f2c8c8]',
  Selected: 'bg-[#ebf5ed] text-[#296a3e] border-[#c0e4c8]',
};

const initialForm = (role) => ({
  company: '',
  role: role || '',
  date: new Date().toISOString().slice(0, 10),
  link: '',
  status: 'Interested',
  interviewDate: '',
  notes: '',
  skills: '',
});

function readApplications(key) {
  try {
    const records = JSON.parse(localStorage.getItem(key) || '[]');
    return records.map((application) => ({
      ...application,
      status: application.status === 'Screening' ? 'Assessment'
        : application.status === 'Offer' ? 'Selected'
          : STATUSES.includes(application.status) ? application.status : 'Interested',
      link: application.link || '',
      interviewDate: application.interviewDate || '',
      notes: application.notes || '',
      skills: application.skills || '',
    }));
  } catch (error) {
    console.error('Could not read saved job applications.', error);
    return [];
  }
}

export default function ApplicationTracker() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const storageKey = `cpc_apps_${user?.id || 'guest'}`;
  const [apps, setApps] = useState(() => readApplications(storageKey));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(() => initialForm(user?.prefs?.role));
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(apps));
  }, [apps, storageKey]);

  const totals = useMemo(() => {
    const interviews = apps.filter((application) => ['Interview', 'Selected'].includes(application.status)).length;
    const responded = apps.filter((application) => !['Interested', 'Applied'].includes(application.status)).length;
    const selected = apps.filter((application) => application.status === 'Selected').length;
    const categoryCounts = {};
    const roleOutcomes = {};
    apps.forEach((application) => {
      const knownRole = CAREER_ROLES.find((role) => role.title.toLowerCase() === application.role.trim().toLowerCase());
      const category = knownRole?.categoryTitle || 'Other roles';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      const role = roleOutcomes[application.role] || { applications: 0, responses: 0, interviews: 0 };
      role.applications += 1;
      if (!['Interested', 'Applied'].includes(application.status)) role.responses += 1;
      if (['Interview', 'Selected'].includes(application.status)) role.interviews += 1;
      roleOutcomes[application.role] = role;
    });
    const skillCounts = {};
    apps.filter((application) => ['Interview', 'Selected'].includes(application.status))
      .flatMap((application) => application.skills.split(/[,;\n]+/))
      .map((skill) => skill.trim())
      .filter(Boolean)
      .forEach((skill) => {
        const key = skill.toLowerCase();
        skillCounts[key] = { name: skill, count: (skillCounts[key]?.count || 0) + 1 };
      });
    return {
      interviews,
      responded,
      selected,
      responseRate: apps.length ? Math.round((responded / apps.length) * 100) : 0,
      selectionRate: apps.length ? Math.round((selected / apps.length) * 100) : 0,
      categoryCounts,
      roleOutcomes,
      frequentSkills: Object.values(skillCounts).sort((a, b) => b.count - a.count).slice(0, 3),
    };
  }, [apps]);

  const addApp = () => {
    if (!form.company.trim() || !form.role.trim()) {
      setError('Enter both a company name and a job title.');
      return;
    }
    if (form.link && !/^https?:\/\//i.test(form.link)) {
      setError('Enter a complete application URL beginning with http:// or https://.');
      return;
    }
    setApps((previous) => [...previous, { ...form, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }]);
    setForm(initialForm(user?.prefs?.role));
    setError('');
    setShowForm(false);
  };

  const updateApplication = (id, changes) => {
    setApps((previous) => previous.map((application) => application.id === id
      ? { ...application, ...changes }
      : application));
  };

  const removeApp = (id) => setApps((previous) => previous.filter((application) => application.id !== id));
  const byStatus = Object.fromEntries(STATUSES.map((status) => [status, apps.filter((application) => application.status === status).length]));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('applications.title')}</h1>
          <p className="text-[#636659] text-sm">{t('applications.subtitle')} Your application records stay in this browser.</p>
        </div>
        <button onClick={() => { setShowForm(true); setError(''); }}
          className="flex items-center gap-2 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-xs whitespace-nowrap">
          <Plus size={16} /> {t('applications.add')}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-2xl border border-[#e2dfd4] bg-white p-4 text-center">
          <div className="text-2xl font-bold text-[#1e2019]">{apps.length}</div><div className="text-xs text-[#7d8270]">Total applications</div>
        </div>
        {STATUSES.map((status) => (
          <div key={status} className={`rounded-2xl border p-4 text-center ${STATUS_COLORS[status]}`}>
            <div className="text-2xl font-bold">{byStatus[status]}</div>
            <div className="text-xs mt-0.5 opacity-80">{status}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          ['Interview rate', `${apps.length ? Math.round((totals.interviews / apps.length) * 100) : 0}%`],
          ['Response rate', `${totals.responseRate}%`],
          ['Selection rate', `${totals.selectionRate}%`],
        ].map(([label, value]) => (
          <div key={label} className="bg-white border border-[#e2dfd4] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-xs text-[#636659]">{label}</span><strong className="text-[#1e2019]">{value}</strong>
          </div>
        ))}
      </div>

      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-[#556b2f] flex items-center justify-center flex-shrink-0"><TrendingUp size={20} /></div>
        <div className="min-w-0">
          <p className="text-[#1e2019] font-bold text-sm mb-1">Insights from your recorded applications</p>
          {!apps.length ? (
            <p className="text-[#4b4e43] text-sm">Log applications and update their outcomes to see descriptive patterns here. No hiring outcomes are predicted.</p>
          ) : (
            <div className="space-y-1 text-xs text-[#4b4e43]">
              <p>{totals.interviews} of {apps.length} recorded applications reached interview or selection; {totals.responded} have a response status beyond Interested or Applied.</p>
              <p>Recorded response patterns by role: {Object.entries(totals.roleOutcomes)
                .sort(([, first], [, second]) => second.responses - first.responses)
                .map(([role, outcome]) => `${role}: ${outcome.responses}/${outcome.applications} responses, ${outcome.interviews} interviews`)
                .join('; ')}.</p>
              <p>Applications by category: {Object.entries(totals.categoryCounts).map(([category, count]) => `${category} (${count})`).join(', ')}.</p>
              {totals.frequentSkills.length > 0 && (
                <p>Skills noted on applications that reached interview/selection: {totals.frequentSkills.map((skill) => `${skill.name} (${skill.count})`).join(', ')}. These are based only on the skills you entered.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1e2019] font-bold text-base">Log a job application</h3>
            <button onClick={() => setShowForm(false)} aria-label="Close form" className="text-[#8c907f] hover:text-[#1e2019]"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['company', 'Company name', 'e.g. Example Company'],
              ['role', 'Job title', 'e.g. Data Analyst'],
              ['link', 'Application link', 'https://'],
              ['date', 'Application date', ''],
              ['interviewDate', 'Interview date', ''],
              ['skills', 'Skills listed in the job description', 'e.g. SQL, reporting, communication'],
            ].map(([field, label, placeholder]) => (
              <label key={field} className="text-[#636659] text-xs font-semibold">
                {label}
                <input
                  type={field === 'date' || field === 'interviewDate' ? 'date' : field === 'link' ? 'url' : 'text'}
                  value={form[field]}
                  onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                  placeholder={placeholder}
                  className="mt-1 w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-3 py-2.5 text-[#1e2019] font-normal focus:outline-none focus:border-[#556b2f]"
                />
              </label>
            ))}
            <label className="text-[#636659] text-xs font-semibold">
              Current status
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}
                className="mt-1 w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-3 py-2.5 text-[#1e2019]">
                {STATUSES.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label className="text-[#636659] text-xs font-semibold">
              Notes and feedback
              <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })}
                rows={2} placeholder="Notes from your application or interview"
                className="mt-1 w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-3 py-2.5 text-[#1e2019] font-normal resize-y focus:outline-none focus:border-[#556b2f]" />
            </label>
          </div>
          {error && <p role="alert" className="text-xs text-[#ba3c3c]">{error}</p>}
          <button onClick={addApp} className="bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-xs">
            Save Application
          </button>
        </div>
      )}

      <div className="bg-white border border-[#e2dfd4] rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-3 border-b border-[#f0eee6] bg-[#faf9f5] text-[#7d8270] text-xs font-bold uppercase tracking-wider">
          Recorded applications
        </div>
        {apps.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase size={26} className="text-[#b8c2a4] mx-auto mb-2" />
            <p className="text-[#636659] text-sm">No applications logged yet.</p>
            <p className="text-[#7d8270] text-xs mt-1">Add a role to start tracking follow-ups, dates, and outcomes.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0eee6]">
            {apps.map((application) => (
              <article key={application.id} className="p-4 md:p-5 hover:bg-[#faf9f5] transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 bg-[#f0eee6] rounded-xl flex items-center justify-center flex-shrink-0"><Building size={15} className="text-[#556b2f]" /></div>
                    <div className="min-w-0">
                      <p className="text-[#1e2019] text-sm font-semibold truncate">{application.company} · {application.role}</p>
                      <p className="text-[#7d8270] text-xs">Applied {application.date || 'date not set'}{application.interviewDate ? ` · Interview ${application.interviewDate}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select aria-label={`Update status for ${application.company}`}
                      value={application.status}
                      onChange={(event) => updateApplication(application.id, { status: event.target.value })}
                      className={`text-xs px-3 py-1.5 rounded-full border font-semibold ${STATUS_COLORS[application.status]}`}>
                      {STATUSES.map((status) => <option key={status}>{status}</option>)}
                    </select>
                    {application.link && (
                      <a href={application.link} target="_blank" rel="noopener noreferrer" aria-label="Open application link" className="text-[#556b2f] p-1.5">
                        <ExternalLink size={15} />
                      </a>
                    )}
                    <button onClick={() => removeApp(application.id)} aria-label={`Remove ${application.company} application`} className="text-[#8c907f] hover:text-[#ba3c3c] p-1.5">
                      <X size={15} />
                    </button>
                  </div>
                </div>
                {(application.notes || application.skills) && (
                  <div className="ml-12 mt-2 text-xs text-[#636659]">
                    {application.notes && <p>{application.notes}</p>}
                    {application.skills && <p className="mt-1"><strong>Listed skills:</strong> {application.skills}</p>}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
