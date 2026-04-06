'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import FilterChips from '@/components/ui/FilterChips';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { HiOutlineChartBar, HiOutlineAcademicCap, HiOutlineTrophy, HiOutlineArrowTrendingUp, HiOutlineChevronRight } from 'react-icons/hi2';

const RESULTS_DATA = {
  student: {
    name: 'Alice Sharma',
    rollNo: 'SAGI/BBA/2022/047',
    program: 'Bachelor of Business Administration',
    batch: '2022-2026',
    cgpa: 8.2,
    currentSgpa: 8.5,
    batchRank: 12,
    totalStudents: 120,
    creditsEarned: 168,
    totalCredits: 200,
  },
  semesters: {
    'Sem 1': { sgpa: 7.8, subjects: [ { code: 'BBA101', name: 'Principles of Management', grade: 'B+', points: 8.0, credits: 4, status: 'Success' }, { code: 'BBA102', name: 'Business Mathematics', grade: 'B', points: 7.0, credits: 4, status: 'Success' }, { code: 'BBA103', name: 'Financial Accounting', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA104', name: 'Business Communication', grade: 'A-', points: 8.5, credits: 3, status: 'Success' }, { code: 'BBA105', name: 'Computer Applications', grade: 'B+', points: 8.0, credits: 3, status: 'Success' } ] },
    'Sem 2': { sgpa: 8.0, subjects: [ { code: 'BBA201', name: 'Organisational Behaviour', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA202', name: 'Business Statistics', grade: 'B+', points: 8.0, credits: 4, status: 'Success' }, { code: 'BBA203', name: 'Cost Accounting', grade: 'B', points: 7.0, credits: 4, status: 'Success' }, { code: 'BBA204', name: 'Business Law', grade: 'A-', points: 8.5, credits: 3, status: 'Success' }, { code: 'BBA205', name: 'Microeconomics', grade: 'B+', points: 8.0, credits: 3, status: 'Success' } ] },
    'Sem 3': { sgpa: 7.9, subjects: [ { code: 'BBA301', name: 'Marketing Management', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA302', name: 'Human Resource Management', grade: 'B+', points: 8.0, credits: 4, status: 'Success' }, { code: 'BBA303', name: 'Financial Management', grade: 'B', points: 7.0, credits: 4, status: 'Success' }, { code: 'BBA304', name: 'Macroeconomics', grade: 'B+', points: 8.0, credits: 3, status: 'Success' }, { code: 'BBA305', name: 'Research Methods', grade: 'A-', points: 8.5, credits: 3, status: 'Success' } ] },
    'Sem 4': { sgpa: 8.1, subjects: [ { code: 'BBA401', name: 'Operations Management', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA402', name: 'Consumer Behaviour', grade: 'A-', points: 8.5, credits: 4, status: 'Success' }, { code: 'BBA403', name: 'Corporate Finance', grade: 'B+', points: 8.0, credits: 4, status: 'Success' }, { code: 'BBA404', name: 'Business Ethics', grade: 'A', points: 9.0, credits: 3, status: 'Success' }, { code: 'BBA405', name: 'E-Commerce', grade: 'B+', points: 8.0, credits: 3, status: 'Success' } ] },
    'Sem 5': { sgpa: 8.3, subjects: [ { code: 'BBA501', name: 'Strategic Marketing', grade: 'A+', points: 10.0, credits: 4, status: 'Success' }, { code: 'BBA502', name: 'Investment Management', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA503', name: 'Supply Chain Mgmt', grade: 'A-', points: 8.5, credits: 4, status: 'Success' }, { code: 'BBA504', name: 'Taxation Law', grade: 'B+', points: 8.0, credits: 3, status: 'Success' }, { code: 'BBA505', name: 'Summer Internship', grade: 'A', points: 9.0, credits: 3, status: 'Success' } ] },
    'Sem 6': { sgpa: 8.4, subjects: [ { code: 'BBA601', name: 'Brand Management', grade: 'A+', points: 10.0, credits: 4, status: 'Success' }, { code: 'BBA602', name: 'Mergers & Acquisitions', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA603', name: 'Logistics Management', grade: 'A-', points: 8.5, credits: 4, status: 'Success' }, { code: 'BBA604', name: 'Startup Ecosystem', grade: 'A', points: 9.0, credits: 3, status: 'Success' }, { code: 'BBA605', name: 'Corporate Governance', grade: 'B+', points: 8.0, credits: 3, status: 'Success' } ] },
    'Sem 7': { sgpa: 8.5, subjects: [ { code: 'BBA701', name: 'Strategic Management', grade: 'A', points: 9.0, credits: 4, status: 'Success' }, { code: 'BBA702', name: 'International Business', grade: 'A-', points: 8.5, credits: 4, status: 'Success' }, { code: 'BBA703', name: 'Digital Marketing', grade: 'A+', points: 10.0, credits: 3, status: 'Success' }, { code: 'BBA704', name: 'Project Management', grade: 'A', points: 9.0, credits: 3, status: 'Success' }, { code: 'BBA705', name: 'Research Project', grade: 'A', points: 9.0, credits: 4, status: 'Success' } ] },
    'Sem 8': { sgpa: null, status: 'Ongoing', subjects: [ { code: 'BBA801', name: 'Strategic Management', grade: '--', points: null, credits: 4, status: 'In Review' }, { code: 'BBA802', name: 'International Business', grade: '--', points: null, credits: 4, status: 'In Review' }, { code: 'BBA803', name: 'Corporate Law', grade: '--', points: null, credits: 3, status: 'In Review' }, { code: 'BBA804', name: 'Entrepreneurship Dev.', grade: '--', points: null, credits: 3, status: 'In Review' }, { code: 'BBA805', name: 'Digital Marketing', grade: '--', points: null, credits: 3, status: 'In Review' }, { code: 'BBA806', name: 'Project Management', grade: '--', points: null, credits: 3, status: 'In Review' } ] },
  }
};

export default function ResultsPage() {
  const { loading, normalizedProfile } = useAuth();
  const [activeSem, setActiveSem] = useState<string>('Sem 8');
  
  const student = {
    ...RESULTS_DATA.student,
    name: normalizedProfile?.fullName || RESULTS_DATA.student.name,
    program: normalizedProfile?.department ? `Bachelor of ${normalizedProfile.department}` : RESULTS_DATA.student.program
  };
  const semesters = RESULTS_DATA.semesters as Record<string, any>;
  const activeSemData = semesters[activeSem];

  const MOCK_HISTORY = Object.entries(semesters)
    .filter(([_, data]) => data.sgpa !== null)
    .map(([sem, data]) => ({ sem, sgpa: data.sgpa }));

  if (loading) {
    return <div className="space-y-6 animate-fadeUp"><WidgetSkeleton /><WidgetSkeleton /></div>;
  }

  const getGradeColor = (g: string) => {
    if (g.startsWith('A')) return 'text-charcoal';
    if (g.startsWith('B')) return 'text-text-secondary';
    return 'text-text-muted';
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <SectionHeader
        title="Bugweiser Metrix Analytics"
        subtitle={`Academic progression assessment for ${student.name} · BATCH ${student.batch}`}
      />

      {/* SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CGPA HIGHLIGHT */}
        <div className="card-shell p-6 bg-soft-green border-emerald-100/50 relative overflow-hidden group">
           {/* Visual Glow */}
           <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity" />
           
           <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-charcoal shadow-sm">
                 <HiOutlineChartBar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em]">Overall Standing</span>
           </div>

           <div className="flex items-baseline gap-1 relative z-10">
              <p className="text-5xl font-black text-charcoal tracking-tighter">{student.cgpa}</p>
              <p className="text-xl font-bold text-charcoal/30">/10</p>
           </div>
           <p className="text-[13px] font-bold text-charcoal/60 mt-1 uppercase tracking-wider">Cumulative GPA</p>
           
           <div className="mt-8 h-1.5 bg-white/40 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-charcoal transition-all duration-1000 delay-300" {...({ style: { width: `${(student.cgpa/10)*100}%` } } as React.HTMLAttributes<HTMLDivElement>)} />
           </div>
        </div>

        {/* LATEST SGPA */}
        <div className="card-shell p-6 relative overflow-hidden group">
           <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-charcoal shadow-md shadow-accent/20">
                 <HiOutlineArrowTrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Semester Performance</span>
           </div>

           <div className="flex items-baseline gap-1">
              <p className="text-5xl font-black text-text-primary tracking-tighter">{student.currentSgpa}</p>
              <p className="text-xl font-bold text-text-muted">/10</p>
           </div>
           <p className="text-[13px] font-bold text-text-muted mt-1 uppercase tracking-wider">Semester 7 SGPA</p>
           
           <div className="mt-8 h-1.5 bg-bg-card-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-1000 delay-500" {...({ style: { width: `${(student.currentSgpa/10)*100}%` } } as React.HTMLAttributes<HTMLDivElement>)} />
           </div>
        </div>

        {/* BATCH RANK */}
        <div className="card-shell p-6 relative overflow-hidden group border-border-strong border-dashed">
           <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center text-white shadow-lg shadow-charcoal/20">
                 <HiOutlineTrophy className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Class Rank</span>
           </div>

           <div className="flex items-baseline gap-1">
              <p className="text-5xl font-black text-text-primary tracking-tighter">{student.batchRank}</p>
              <p className="text-xl font-bold text-text-muted">/{student.totalStudents}</p>
           </div>
           <p className="text-[13px] font-bold text-text-muted mt-1 uppercase tracking-wider">Batch Rank</p>
           
           <div className="mt-8 h-1.5 bg-bg-card-secondary rounded-full overflow-hidden">
              <div className="h-full bg-charcoal transition-all duration-1000 delay-700" {...({ style: { width: `${(1 - (student.batchRank/student.totalStudents)) * 100}%` } } as React.HTMLAttributes<HTMLDivElement>)} />
           </div>
        </div>
      </div>

      {/* SEMESTER SELECTOR CHIPS */}
      <FilterChips
        items={Object.keys(semesters).map(sem => ({ label: sem, value: sem }))}
        activeValue={activeSem}
        onChange={setActiveSem}
        activeStyle="charcoal"
        shape="rounded"
      />

      {/* MAIN CONTENT SPLIT (Table + Chart) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* GRADES TABLE CARD (2/3) */}
        <div className="xl:col-span-2 card-shell overflow-hidden">
           <header className="px-6 py-5 border-b border-border-subtle flex justify-between items-center bg-bg-card-secondary/30">
              <h2 className="text-lg font-bold text-text-primary tracking-tight">Detailed Transcript</h2>
              <div className="text-[10px] font-bold text-charcoal uppercase bg-accent px-2 py-0.5 rounded-md shadow-sm">
                 {activeSem} Credits
              </div>
           </header>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-bg-card-secondary/10">
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-muted">Course Details</th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-muted text-center">Grade</th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-muted text-center">Points</th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] text-text-muted text-right">Verification</th>
                  </tr>
                </thead>
                <tbody>
                   {activeSemData?.subjects?.length > 0 ? (
                     activeSemData.subjects.map((item: any, idx: number) => (
                      <tr key={idx} className="group border-b border-border-subtle last:border-0 hover:bg-bg-hover transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-[14px] font-bold text-text-primary group-hover:text-charcoal transition-colors">{item.name}</p>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-0.5">{item.code} · {item.credits} Units</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-xl font-black ${getGradeColor(item.grade)}`}>
                            {item.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <span className="text-[14px] font-black text-text-primary">{item.points !== null ? item.points.toFixed(1) : '--'}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge variant={item.status as any} />
                        </td>
                      </tr>
                    ))
                   ) : (
                     <tr className="border-b border-border-subtle last:border-0">
                       <td colSpan={4} className="px-6 py-12 text-center opacity-50">
                         <HiOutlineAcademicCap className="w-10 h-10 text-text-muted mb-3 mx-auto" />
                         <p className="text-sm font-bold text-text-muted">No published transcript available</p>
                         <p className="text-[11px] font-medium text-text-muted mt-1 uppercase tracking-widest">Grades in review or semester not started</p>
                       </td>
                     </tr>
                   )}
                </tbody>
              </table>
           </div>
        </div>

        {/* PROGRESSION CHART CARD (1/3) */}
        <div className="xl:col-span-1 card-shell p-6 bg-charcoal text-white relative overflow-hidden group">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" {...({ style: { backgroundImage: 'radial-gradient(var(--bg-hover) 1px, transparent 0)', backgroundSize: '24px 24px' } } as React.HTMLAttributes<HTMLDivElement>)} />
           
           <header className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-xl font-bold tracking-tight">Timeline</h2>
              <HiOutlineChartBar className="w-5 h-5 text-accent" />
           </header>

           <div className="space-y-6 relative z-10">
             {MOCK_HISTORY.map((item, i) => {
               const width = (item.sgpa / 10) * 100;
               const isCurrent = item.sem === activeSem;
               
               return (
                 <div key={item.sem} className="flex flex-col gap-2.5 transition-all duration-300">
                   <div className="flex items-center justify-between">
                     <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${isCurrent ? 'text-accent' : 'text-white/40'}`}>
                       {item.sem} Results
                     </span>
                     <span className={`text-[13px] font-black ${isCurrent ? 'text-accent' : 'text-white'}`}>
                        {item.sgpa.toFixed(1)}
                     </span>
                   </div>
                   
                   <div className="h-1.5 rounded-full bg-white/10 overflow-hidden group/bar">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${isCurrent ? 'bg-accent shadow-[0_0_12px_rgba(217,255,63,0.3)]' : 'bg-white/20 group-hover:bg-white/40'}`}
                        {...({ style: { width: `${width}%` } } as React.HTMLAttributes<HTMLDivElement>)}
                      />
                   </div>
                 </div>
               );
             })}
           </div>

           <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all cursor-default">
                 <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-charcoal shrink-0 font-black">AI</div>
                 <div className="min-w-0">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none mb-1">Projection</p>
                    <p className="text-[12px] font-medium text-white/70 italic text-pretty">Expected 8.7 SGPA for Sem 8 based on current assignment velocity.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
