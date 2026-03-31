'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import { HiOutlineBookOpen, HiOutlineChevronRight, HiOutlineMapPin, HiOutlineClock, HiOutlineAcademicCap } from 'react-icons/hi2';

const MOCK_COURSES = [
  { id: 'BBA801', code: 'BBA801', name: 'Strategic Management', faculty: 'Dr. Rajesh Kumar Sharma', department: 'School of Management', credits: 4, schedule: 'Mon/Wed 9-10 AM', room: 'Room 301, Block B', progress: 72, attendancePercent: 84, totalClasses: 45, attendedClasses: 38, type: 'Core' },
  { id: 'BBA802', code: 'BBA802', name: 'International Business', faculty: 'Prof. Anita Gupta', department: 'School of Management', credits: 4, schedule: 'Tue/Thu 10-11:30 AM', room: 'Room 302, Block B', progress: 68, attendancePercent: 79, totalClasses: 42, attendedClasses: 33, type: 'Core' },
  { id: 'BBA803', code: 'BBA803', name: 'Corporate Law & Governance', faculty: 'Prof. Suresh Verma', department: 'School of Law', credits: 3, schedule: 'Mon/Wed 11-12 PM', room: 'Moot Court Room', progress: 85, attendancePercent: 91, totalClasses: 38, attendedClasses: 35, type: 'Core' },
  { id: 'BBA804', code: 'BBA804', name: 'Entrepreneurship Development', faculty: 'Dr. Manish Patel', department: 'School of Management', credits: 3, schedule: 'Mon 2-4 PM', room: 'Seminar Hall 1', progress: 60, attendancePercent: 75, totalClasses: 40, attendedClasses: 30, type: 'Elective' },
  { id: 'BBA805', code: 'BBA805', name: 'Digital Marketing', faculty: 'Ms. Priya Joshi', department: 'School of Management', credits: 3, schedule: 'Tue/Fri 12-1:30 PM', room: 'Computer Lab 2', progress: 90, attendancePercent: 95, totalClasses: 36, attendedClasses: 34, type: 'Elective' },
  { id: 'BBA806', code: 'BBA806', name: 'Project Management', faculty: 'Prof. Deepak Rao', department: 'School of Management', credits: 3, schedule: 'Wed/Fri 11-12:30 PM', room: 'Computer Lab 1', progress: 55, attendancePercent: 70, totalClasses: 40, attendedClasses: 28, type: 'Core' },
];

export default function CoursesPage() {
  const { appUser } = useAuth();
  const enrolledCourses = appUser?.courses || [];
  const displayCourses = enrolledCourses.length > 0 
    ? MOCK_COURSES.filter(c => enrolledCourses.includes(c.name)) 
    : MOCK_COURSES;

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-subtle transition-all">
        <section>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Degree Curriculum</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px] mt-2 group cursor-default">
            Academic year 2026 · {displayCourses.length} active course nodes currently registered
          </p>
        </section>
      </header>

      {displayCourses.length === 0 ? (
        <EmptyState
          icon="📚"
          message="No active nodes"
          sub="You are not officially registered for any curriculum nodes this semester."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayCourses.map((course, i) => {
            const isLowAttendance = course.attendancePercent < 75;
            
            return (
              <div
                key={course.id}
                className="card-shell p-6 bg-white relative overflow-hidden flex flex-col group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Background Decor */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-bg-card-secondary rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                
                <header className="flex items-center justify-between mb-5 relative z-10">
                   <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-charcoal shadow-md shadow-accent/20 group-hover:shadow-lg transition-all">
                      <HiOutlineBookOpen className="w-5 h-5" />
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">Node Identity</span>
                      <span className="text-[13px] font-bold text-charcoal">{course.code}</span>
                   </div>
                </header>

                <div className="flex-1 relative z-10">
                   <h3 className="text-[17px] font-bold text-text-primary leading-tight group-hover:text-charcoal transition-colors">
                     {course.name}
                   </h3>
                   <p className="text-[12px] font-medium text-text-secondary mt-1 flex items-center gap-1.5">
                      <HiOutlineAcademicCap className="w-4 h-4 text-text-muted" />
                      {course.faculty}
                   </p>
                   
                   <div className="mt-6 flex items-center justify-between">
                      <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Mastery Level</p>
                      <p className="text-[13px] font-black text-charcoal">{course.progress}%</p>
                   </div>
                   
                   <div className="mt-2 h-1.5 bg-bg-card-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out delay-100"
                        style={{ width: `${course.progress}%` }} 
                      />
                   </div>
                </div>

                <footer className="mt-8 pt-5 border-t border-border-subtle border-dashed relative z-10 space-y-4">
                   <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                      <div className="flex items-center gap-1.5">
                        <HiOutlineClock className="w-3.5 h-3.5 text-text-muted" />
                        {course.schedule}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiOutlineMapPin className="w-3.5 h-3.5 text-text-muted" />
                        {course.room}
                      </div>
                   </div>

                   <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${isLowAttendance ? 'bg-soft-red/20 border-red-100' : 'bg-soft-green/20 border-emerald-100'}`}>
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-[0.1em] leading-none mb-1 ${isLowAttendance ? 'text-danger' : 'text-charcoal'}`}>
                          {isLowAttendance ? 'Critical Threshold' : 'Stability Rating'}
                        </p>
                        <p className={`text-[12px] font-bold ${isLowAttendance ? 'text-danger' : 'text-charcoal'}`}>
                          {course.attendancePercent}% Consistency
                        </p>
                      </div>
                      <Link href={`/courses/${course.id}`} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isLowAttendance ? 'bg-danger text-white' : 'bg-charcoal text-white'} hover:shadow-lg active:scale-90`}>
                         <HiOutlineChevronRight className="w-4 h-4" />
                      </Link>
                   </div>
                </footer>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
