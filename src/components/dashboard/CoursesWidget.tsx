'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { HiOutlineAcademicCap, HiOutlineArrowRight, HiOutlineMapPin, HiOutlineBookOpen } from 'react-icons/hi2';

const SEED_COURSES = [
  { id: 'BBA401', name: 'Financial Accounting', faculty: 'Dr. Meena Gupta', room: 'R-301', theme: 'bg-soft-blue text-charcoal border-blue-100', icon: HiOutlineBookOpen },
  { id: 'BBA402', name: 'Marketing Management', faculty: 'Prof. Anil Roy', room: 'R-205', theme: 'bg-soft-green text-charcoal border-emerald-100', icon: HiOutlineBookOpen },
  { id: 'BBA403', name: 'Entrepreneurship', faculty: 'Dr. Rajesh Singh', room: 'Hall 1', theme: 'bg-soft-yellow text-charcoal border-amber-100', icon: HiOutlineBookOpen },
];

export default function CoursesWidget() {
  const { appUser, loading } = useAuth();

  if (loading) return <WidgetSkeleton />;

  const userCourses = SEED_COURSES.filter(c =>
    appUser?.isAdmin || (appUser?.courses && appUser.courses.includes(c.name))
  ).slice(0, 3);

  return (
    <div className="card-shell p-6 bg-white flex flex-col group h-full">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent rounded-full shadow-lg shadow-accent/20" />
          <h3 className="text-xl font-black text-charcoal tracking-tight">Academic Domain</h3>
        </div>
        <Link href="/courses" className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted hover:bg-charcoal hover:text-white transition-all group/link">
          <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </header>

      <div className="space-y-3 flex-1">
        {userCourses.length === 0 ? (
          <div className="py-12 text-center opacity-30">
            <HiOutlineAcademicCap className="w-12 h-12 mx-auto mb-3" />
            <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">No Nodes Indexed</p>
          </div>
        ) : (
          userCourses.map((course) => (
            <Link
              key={course.id}
              href="/courses"
              className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5 active:scale-[0.98] ${course.theme}`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center shrink-0 border border-white/20 shadow-sm backdrop-blur-sm">
                <course.icon className="w-5 h-5 opacity-80" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-black truncate tracking-tight">{course.name}</p>
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.15em] opacity-50 mt-0.5">
                  <span>{course.id}</span>
                  <span className="flex items-center gap-1"><HiOutlineMapPin className="w-3 h-3" /> {course.room}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <footer className="mt-6 pt-4 border-t border-border-subtle border-dashed">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">Section Control: Alice-SAGI-BBA</p>
      </footer>
    </div>
  );
}
