import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, TrendingUp, Building, X, Briefcase } from 'lucide-react';

const STATUS_COLORS = {
  Applied: 'bg-[#edf1e6] text-[#455633] border-[#d6dec8]',
  Screening: 'bg-[#fbf5e6] text-[#8a6b18] border-[#f0e2bd]',
  Interview: 'bg-[#eef3f7] text-[#2c5f7d] border-[#cee0ec]',
  Offer: 'bg-[#ebf5ed] text-[#296a3e] border-[#c0e4c8]',
  Rejected: 'bg-[#faebeb] text-[#ba3c3c] border-[#f2c8c8]',
};

export default function ApplicationTracker() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const storageKey = `cpc_apps_${user?.id || 'guest'}`;

  const [apps, setApps] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ 
    company: '', 
    role: user?.prefs?.role || '', 
    date: new Date().toISOString().split('T')[0], 
    status: 'Applied' 
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(apps));
  }, [apps, storageKey]);

  const addApp = () => {
    if (!form.company || !form.role) return;
    setApps((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm({ 
      company: '', 
      role: user?.prefs?.role || '', 
      date: new Date().toISOString().split('T')[0], 
      status: 'Applied' 
    });
    setShowForm(false);
  };

  const removeApp = (id) => setApps((prev) => prev.filter((a) => a.id !== id));

  const responseCount = apps.filter((a) => a.status !== 'Applied').length;
  const responseRate = apps.length > 0 ? Math.round((responseCount / apps.length) * 100) : 0;
  
  const byStatus = Object.fromEntries(
    ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((s) => [s, apps.filter((a) => a.status === s).length])
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('applications.title')}</h1>
          <p className="text-[#636659] text-sm">{t('applications.subtitle')}</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-xs">
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
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-5 flex items-start gap-4 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center flex-shrink-0">
          <TrendingUp size={20} />
        </div>
        <div>
          <p className="text-[#1e2019] font-bold text-sm mb-1">🌿 Application Intelligence</p>
          <p className="text-[#636659] text-sm leading-relaxed">
            {apps.length === 0
              ? `You haven't logged any applications yet. As you start sending resumes for ${user?.prefs?.role || 'your target role'}, log them here to discover which company stages and roles give you the highest callback rate.`
              : `Overall response rate: ${responseRate}%. Keep tracking your submissions to calibrate which job descriptions yield interview screenings.`}
          </p>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#1e2019] font-bold text-base">Log a Job Application</h3>
            <button onClick={() => setShowForm(false)} className="text-[#8c907f] hover:text-[#1e2019]"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#636659] text-xs font-semibold mb-1 block">Company Name</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-4 py-2.5 text-[#1e2019] text-sm focus:outline-none focus:border-[#556b2f]"
                placeholder="e.g. Google, Hospital System, Startup..." />
            </div>
            <div>
              <label className="text-[#636659] text-xs font-semibold mb-1 block">Role Title</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-4 py-2.5 text-[#1e2019] text-sm focus:outline-none focus:border-[#556b2f]"
                placeholder="e.g. Data Analyst" />
            </div>
            <div>
              <label className="text-[#636659] text-xs font-semibold mb-1 block">Date Applied</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-4 py-2.5 text-[#1e2019] text-sm focus:outline-none focus:border-[#556b2f]" />
            </div>
            <div>
              <label className="text-[#636659] text-xs font-semibold mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl px-4 py-2.5 text-[#1e2019] text-sm focus:outline-none focus:border-[#556b2f]">
                {['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={addApp}
            className="bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-xs">
            Save Application
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-4 gap-4 px-6 py-3.5 border-b border-[#f0eee6] bg-[#faf9f5] text-[#7d8270] text-xs font-bold uppercase tracking-wider">
          <span>Company</span><span>Role</span><span>Date</span><span>Status</span>
        </div>
        {apps.length === 0 ? (
          <div className="p-8 text-center text-[#7d8270] text-xs">
            No applications logged yet. Click <strong>"Add Application"</strong> above to record your first role!
          </div>
        ) : (
          <div className="divide-y divide-[#f0eee6]">
            {apps.map((app) => (
              <div key={app.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-[#faf9f5] transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f0eee6] rounded-xl flex items-center justify-center">
                    <Building size={14} className="text-[#556b2f]" />
                  </div>
                  <span className="text-[#1e2019] text-sm font-semibold">{app.company}</span>
                </div>
                <span className="text-[#4b4e43] text-sm">{app.role}</span>
                <span className="text-[#7d8270] text-sm">{app.date}</span>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                  <button onClick={() => removeApp(app.id)} className="opacity-0 group-hover:opacity-100 text-[#8c907f] hover:text-[#ba3c3c] transition-all">
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
