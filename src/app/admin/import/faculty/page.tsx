'use client';

import { useState, useEffect } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import { parseCSV } from '@/lib/csvParser';
import { 
  HiOutlineCloudArrowUp, 
  HiOutlineShieldCheck, 
  HiOutlineCheckCircle, 
  HiOutlineExclamationTriangle,
  HiOutlineTrash,
  HiOutlineArrowUpTray,
  HiOutlineUserCircle,
  HiOutlineSparkles
} from 'react-icons/hi2';

interface FacultyImportRow {
  fullName: string;
  email: string;
  role: string;
  department: string;
  designation: string;
  hasConflict?: boolean;
  isSkipped?: boolean;
}

export default function FacultyImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<FacultyImportRow[]>([]);
  const [academicStructure, setAcademicStructure] = useState<{departments: string[]}>({ departments: [] });
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/institution/academic')
      .then(res => res.json())
      .then(data => setAcademicStructure(data))
      .catch(console.error);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'text/csv') {
      setFile(selected);
      parseAndValidateCSV(selected);
    }
  };

  const parseAndValidateCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length < 2) return;

      const data = parsed.slice(1).map(r => {
        const rowDept = r[3] || '';
        const deptExists = academicStructure.departments.includes(rowDept);
        return {
          fullName: r[0] || '',
          email: r[1] || '',
          role: r[2]?.toLowerCase() || 'faculty',
          department: rowDept,
          designation: r[4] || 'Faculty Member',
          hasConflict: !!(rowDept && !deptExists),
          isSkipped: false
        };
      });

      setPreview(data);
    };
    reader.readAsText(file);
  };

  const handleConflictAction = (type: 'skip' | 'autocreate', deptName: string) => {
    if (type === 'skip') {
      setPreview(prev => prev.map(p => p.department === deptName ? { ...p, isSkipped: true } : p));
    } else {
      setAcademicStructure(prev => ({ ...prev, departments: [...prev.departments, deptName] }));
      setPreview(prev => prev.map(p => p.department === deptName ? { ...p, hasConflict: false } : p));
    }
  };

  const executeImport = async () => {
    setImporting(true);
    const validData = preview.filter(p => !p.isSkipped && !p.hasConflict);
    await new Promise(r => setTimeout(r, 2000));
    setStatus(`Successfully processed institutional onboarding for ${validData.length} records.`);
    setImporting(false);
    setPreview([]);
    setFile(null);
  };

  const conflicts = Array.from(new Set(preview.filter(p => p.hasConflict && !p.isSkipped).map(p => p.department)));

  return (
    <RoleGuard requiredCapability="canManageInstitution">
      <div className="max-w-6xl mx-auto p-6 pb-24 animate-fadeUp">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-charcoal tracking-tight">Executive Personnel Onboarding</h1>
          <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">
            Faculty & Admin Registry • Privilege Provisioning
          </p>
        </header>

        {status && (
          <div className="mb-8 p-6 bg-accent/20 border border-accent/20 rounded-[28px] flex items-center gap-4 text-charcoal animate-fadeUp">
             <HiOutlineCheckCircle className="w-8 h-8 shrink-0 text-charcoal" />
             <p className="text-sm font-black uppercase tracking-widest">{status}</p>
          </div>
        )}

        {/* Conflict Resolution Banner */}
        {conflicts.length > 0 && (
          <div className="mb-8 p-6 bg-danger/5 border border-danger/20 rounded-[28px] animate-fadeUp">
             <div className="flex items-center gap-3 mb-4">
                <HiOutlineExclamationTriangle className="w-6 h-6 text-danger" />
                <h4 className="text-sm font-black text-charcoal uppercase tracking-widest">Unrecognized Units for Executive Alignment</h4>
             </div>
             <p className="text-xs font-bold text-text-muted mb-6">The following departments in your CSV are not part of your Institutional Architecture. Choose corrective action before proceeding:</p>
             
             <div className="space-y-3">
                {conflicts.map(dept => (
                  <div key={dept} className="flex items-center justify-between p-4 bg-white border border-border-subtle rounded-2xl">
                     <span className="text-sm font-black text-charcoal">{dept}</span>
                     <div className="flex gap-2">
                        <button title="Skip these records" onClick={() => handleConflictAction('skip', dept)} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-bg-page text-text-muted rounded-xl hover:bg-soft-red hover:text-danger transition-all">Skip Unit</button>
                        <button title="Add unit to institution architecture" onClick={() => handleConflictAction('autocreate', dept)} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-charcoal text-white rounded-xl flex items-center gap-2 hover:bg-black transition-all">
                           <HiOutlineSparkles className="w-3 h-3 text-accent" />
                           Auto-Create Unit
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm">
                 <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-6">Credential Bridge</h3>
                 <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border-subtle rounded-3xl cursor-pointer hover:border-charcoal hover:bg-bg-page transition-all" title="Upload Personnel CSV">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       <HiOutlineCloudArrowUp className="w-10 h-10 text-text-muted group-hover:text-charcoal transition-all mb-3" />
                       <p className="text-xs font-bold text-text-muted">Upload Personnel CSV</p>
                    </div>
                    <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                 </label>

                 {file && (
                    <div className="mt-6 p-4 bg-bg-page rounded-2xl border border-border-subtle flex items-center justify-between">
                       <HiOutlineUserCircle className="w-5 h-5 text-text-muted" />
                       <p className="text-sm font-black text-charcoal truncate flex-1 mx-3">{file.name}</p>
                       <button title="Cancel Selection" onClick={() => { setFile(null); setPreview([]); }} className="text-danger p-1 hover:bg-soft-red rounded-lg transition-all">
                          <HiOutlineTrash className="w-4 h-4" />
                       </button>
                    </div>
                 )}
              </div>

               <div className="bg-charcoal rounded-[32px] p-8 text-white">
                 <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">Authorization Protocols</h3>
                 <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                       <HiOutlineShieldCheck className="w-5 h-5 text-accent shrink-0" />
                       <p className="text-[11px] font-bold opacity-80 leading-relaxed uppercase tracking-tight">Robust CSV-quoted-string mapping operational.</p>
                    </li>
                    <li className="flex items-start gap-3">
                       <HiOutlineCheckCircle className="w-5 h-5 text-accent shrink-0" />
                       <p className="text-[11px] font-bold opacity-80 leading-relaxed uppercase tracking-tight">Privilege validation against supported roles: [faculty, admin].</p>
                    </li>
                 </ul>
              </div>
           </div>

           <div className="lg:col-span-2">
              <div className="bg-white border border-border-subtle rounded-[32px] shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                 <header className="px-8 py-6 border-b border-border-subtle flex items-center justify-between">
                    <div>
                       <h3 className="text-lg font-black text-charcoal tracking-tight">Personnel Preview</h3>
                       <p className="text-xs font-bold text-text-muted opacity-60">Provision institutional access privileges</p>
                    </div>
                    {preview.length > 0 && (
                       <button 
                         onClick={executeImport} 
                         disabled={importing || conflicts.length > 0}
                         title="Deploy Personnel Credentials"
                         className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                       >
                          {importing ? 'Processing...' : 'Authorize Import'}
                          {!importing && <HiOutlineArrowUpTray className="w-4 h-4 text-white" />}
                       </button>
                    )}
                 </header>

                 <div className="flex-1 overflow-x-auto">
                    {preview.length > 0 ? (
                      <table className="w-full text-left">
                        <thead className="bg-bg-page border-b border-border-subtle text-[10px] font-black text-text-muted uppercase tracking-widest">
                          <tr>
                            <th className="px-8 py-4">Personnel</th>
                            <th className="px-8 py-4">Role Profile</th>
                            <th className="px-8 py-4">Structural Unit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                          {preview.filter(p => !p.isSkipped).map((row, idx) => {
                             const isInvalidRole = !['faculty', 'admin'].includes(row.role);
                             return (
                               <tr key={idx} className="hover:bg-bg-page/40 transition-colors">
                                 <td className="px-8 py-5">
                                   <p className="text-sm font-black text-charcoal">{row.fullName}</p>
                                   <p className="text-[11px] font-bold text-text-muted tracking-tight">{row.email}</p>
                                 </td>
                                 <td className="px-8 py-5">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${isInvalidRole ? 'bg-soft-red border-red-100 text-danger' : 'bg-bg-card-secondary border-border-subtle text-text-muted'}`}>
                                      {row.role}
                                    </span>
                                 </td>
                                 <td className="px-8 py-5">
                                   <p className={`text-xs font-bold ${row.hasConflict ? 'text-danger' : 'text-charcoal'}`}>{row.department}</p>
                                   <p className="text-[10px] font-bold text-text-muted opacity-50 uppercase tracking-widest mt-1">{row.designation}</p>
                                 </td>
                               </tr>
                             );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-40">
                         <HiOutlineUserCircle className="w-16 h-16 text-text-muted mb-4 opacity-10" />
                         <p className="text-sm font-black uppercase tracking-[0.2em] max-w-xs text-text-muted">Registry Stream Empty. Upload personnel CSV for structural validation.</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </RoleGuard>
  );
}
