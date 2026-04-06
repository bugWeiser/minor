'use client';

import { useState, useEffect } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import { 
  HiOutlineAcademicCap, 
  HiOutlineUserGroup, 
  HiOutlinePlus, 
  HiOutlineTrash,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

export default function AcademicStructurePage() {
  const [structure, setStructure] = useState<{ departments: string[], sections: string[] }>({ departments: [], sections: [] });
  const [loading, setLoading] = useState(true);
  const [newDept, setNewDept] = useState('');
  const [newSection, setNewSection] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const fetchStructure = async () => {
    setLoading(true);
    const res = await fetch('/api/institution/academic');
    const data = await res.json();
    setStructure(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStructure();
  }, []);

  const handleAction = async (action: 'add' | 'remove', type: 'department' | 'section', name: string) => {
    try {
      const res = await fetch('/api/institution/academic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, type, name }),
      });
      if (res.ok) {
        const updated = await res.json();
        setStructure(updated);
        setStatus(`${type} ${action}ed successfully`);
        setTimeout(() => setStatus(null), 2000);
        if (action === 'add') {
          if (type === 'department') setNewDept('');
          else setNewSection('');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <RoleGuard requiredCapability="canManageInstitution">
      <div className="max-w-4xl mx-auto p-6 pb-24 animate-fadeUp">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-charcoal tracking-tight">Academic Architecture</h1>
          <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">
            Departments • Sections • Structural Mapping
          </p>
        </header>

        {status && (
          <div className="mb-6 flex items-center gap-2 text-success animate-fadeUp">
            <HiOutlineCheckCircle className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">{status}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Departments Section */}
          <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent text-charcoal flex items-center justify-center">
                <HiOutlineAcademicCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal tracking-tight">Departments</h3>
                <p className="text-xs font-bold text-text-muted opacity-60">{structure.departments.length} Units Active</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {structure.departments.map(dept => (
                <div key={dept} className="flex items-center justify-between p-4 bg-bg-page border border-border-subtle rounded-2xl group hover:border-charcoal transition-all">
                  <span className="text-sm font-bold text-charcoal">{dept}</span>
                  <button 
                    onClick={() => handleAction('remove', 'department', dept)}
                    className="p-2 text-danger opacity-0 group-hover:opacity-100 hover:bg-soft-red rounded-lg transition-all"
                    title={`Remove ${dept}`}
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="New Department Name..."
                value={newDept}
                onChange={e => setNewDept(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAction('add', 'department', newDept)}
                className="w-full h-14 bg-bg-page border border-border-subtle rounded-2xl px-5 pr-14 text-sm font-bold focus:border-charcoal outline-none transition-all"
              />
              <button 
                onClick={() => handleAction('add', 'department', newDept)}
                disabled={!newDept}
                title="Add Department"
                className="absolute right-2 top-2 w-10 h-10 bg-charcoal text-white rounded-xl flex items-center justify-center disabled:opacity-30 hover:shadow-lg transition-all"
              >
                <HiOutlinePlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sections Section */}
          <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                <HiOutlineUserGroup className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal tracking-tight">Academic Sections</h3>
                <p className="text-xs font-bold text-text-muted opacity-60">{structure.sections.length} Cohorts Active</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {structure.sections.map(sec => (
                <div key={sec} className="flex items-center justify-between p-4 bg-bg-page border border-border-subtle rounded-2xl group hover:border-charcoal transition-all">
                  <span className="text-sm font-bold text-charcoal">{sec}</span>
                  <button 
                    onClick={() => handleAction('remove', 'section', sec)}
                    className="p-2 text-danger opacity-0 group-hover:opacity-100 hover:bg-soft-red rounded-lg transition-all"
                    title={`Remove ${sec}`}
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="New Section Title..."
                value={newSection}
                onChange={e => setNewSection(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAction('add', 'section', newSection)}
                className="w-full h-14 bg-bg-page border border-border-subtle rounded-2xl px-5 pr-14 text-sm font-bold focus:border-charcoal outline-none transition-all"
              />
              <button 
                onClick={() => handleAction('add', 'section', newSection)}
                disabled={!newSection}
                title="Add Section"
                className="absolute right-2 top-2 w-10 h-10 bg-charcoal text-white rounded-xl flex items-center justify-center disabled:opacity-30 hover:shadow-lg transition-all"
              >
                <HiOutlinePlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-bg-secondary border border-border-subtle border-dashed rounded-[32px] p-8 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4 opacity-40">System Architecture Note</p>
           <p className="text-sm font-bold text-text-muted max-w-lg mx-auto">
             Structural nodes defined here will be available for targeting in notices, academic schedules, and the upcoming Bulk Student Import layer.
           </p>
        </div>
      </div>
    </RoleGuard>
  );
}
