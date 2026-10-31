import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, TrendingUp, Building, X } from 'lucide-react';

const STATUS_COLORS = {
  Applied: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Screening: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Interview: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Offer: 'bg-green-500/20 text-green-300 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const INITIAL_APPS = [
  { id: 1, company: 'Spotify', role: 'Data Analyst', date: '2026-10-28', status: 'Screening' },
  { id: 2, company: 'Razorpay', role: 'Business Analyst', date: '2026-10-25', status: 'Applied' },
  { id: 3, company: 'Swiggy', role: 'Data Analyst', date: '2026-10-20', status: 'Rejected' },
  { id: 4, company: 'Zomato', role: 'Growth Analyst', date: '2026-10-15', status: 'Interview' },
];

export default function ApplicationTracker() {
  const { t } = useTranslation();
  const [apps, setApps] = useState(INITIAL_APPS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', date: '', status: 'Applied' });

  const addApp = () => {
    if (!form.company || !form.role) return;
    setApps((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm({ company: '', role: '', date: '', status: 'Applied' });
    setShowForm(false);
  };

  const removeApp = (id) => setApps((prev) => prev.filter((a) => a.id !== id));

  const responseRate = Math.round((apps.filter((a) => a.status !== 'Applied').length / apps.length) * 100);
  const byStatus = Object.fromEntries(
    ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((s) => [s, apps.filter((a) => a.status === s).length])
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('applications.title')}</h1>
          <p className="text-slate-400 text-sm">{t('applications.subtitle')}</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
          <Plus size={16} /> {t('applications.add')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(byStatus).map(([status, count]) => (
          <div key={status} className={`rounded-2xl border p-4 text-center ${STATUS_COLORS[status]}`}>
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-xs mt-0.5 opacity-80">{t(`applications.status.${status.toLowerCase()}`)}</div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-5 flex items-start gap-4">
        <TrendingUp size={20} className="text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">🧠 AI Insight</p>
          <p className="text-slate-400 text-sm">
            Your response rate is <strong className="text-white">{responseRate}%</strong>. 
            You're getting traction at <strong className="text-white">consumer tech startups</strong> (Swiggy, Zomato). 
            Consider applying more to similar companies. FAANG applications haven't moved — your profile may need 1-2 more portfolio projects first.
          </p>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">New Application</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Company</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="Google" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
                placeholder="Data Analyst" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Date Applied</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500">
                {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={addApp}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
            Save Application
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-white/5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <span>Company</span><span>Role</span><span>Date</span><span>Status</span>
        </div>
        <div className="divide-y divide-white/5">
          {apps.map((app) => (
            <div key={app.id} className="grid grid-cols-4 gap-4 px-5 py-4 items-center hover:bg-white/3 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                  <Building size={14} className="text-slate-400" />
                </div>
                <span className="text-white text-sm font-medium">{app.company}</span>
              </div>
              <span className="text-slate-300 text-sm">{app.role}</span>
              <span className="text-slate-400 text-sm">{app.date}</span>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                <button onClick={() => removeApp(app.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
