'use client';

import { useAuth } from '@/context/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { SEO } from '@/components/SEO';
import Link from 'next/link';
import { format, isToday, isFuture, differenceInDays } from 'date-fns';
import { 
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineExclamationCircle,
  HiOutlineBell,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowRight,
  HiOutlineMegaphone,
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineAcademicCap
} from 'react-icons/hi2';

const CATEGORY_ICONS: Record<string, typeof HiOutlineBell> = {
  Academic: HiOutlineBookOpen,
  Placement: HiOutlineBriefcase,
  Events: HiOutlineCalendarDays,
  Urgent: HiOutlineExclamationCircle,
  Reminder: HiOutlineClock,
};

const CATEGORY_CHIP_THEMES: Record<string, string> = {
  Academic: 'bg-soft-blue text-charcoal border-blue-100',
  Placement: 'bg-soft-green text-charcoal border-emerald-100',
  Events: 'bg-soft-yellow text-charcoal border-amber-100',
  Urgent: 'bg-soft-red text-charcoal border-red-100',
  General: 'bg-bg-card-secondary text-text-muted border-border-subtle',
};

const COURSE_DECOR_COLORS = [
  '#6366F1', '#10B981', '#F59E0B', '#8B5CF6', '#F43F5E'
];

export default function DashboardPage() {
  const { appUser } = useAuth();
  const { notices, events, assignments, loading } = useDashboardData();
  
  if (loading) {
    return (
      <div className="space-y-6 animate-fadeUp">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4"><WidgetSkeleton /><WidgetSkeleton /><WidgetSkeleton /><WidgetSkeleton /></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2"><WidgetSkeleton /></div><div><WidgetSkeleton /></div></div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const activeNotices = notices.filter(n => !n.expiryDate || n.expiryDate > new Date());
  const todayEvents = events.filter(e => isToday(e.date));
  const pendingAssignments = assignments.filter(a => !a.isCompleted && (isFuture(a.dueDate) || isToday(a.dueDate)));
  const unreadCount = activeNotices.filter(n => !appUser?.readNotices?.includes(n.id)).length;

  const MOCK_HOURS = [
    { day: 'Sun', hours: 2, active: false },
    { day: 'Mon', hours: 5, active: false },
    { day: 'Tue', hours: 7, active: false },
    { day: 'Wed', hours: 4, active: false },
    { day: 'Thu', hours: 6, active: false },
    { day: 'Fri', hours: 8, active: true }, // Current bar
    { day: 'Sat', hours: 3, active: false },
  ];

  const WEEKLY_SCHEDULE: Record<string, any[]> = {
    Monday: [
      { time: '09:00 AM', subject: 'Strategic Management', type: 'Lecture', room: 'Room 301', faculty: 'Dr. R.K. Sharma', color: '#6366F1' },
      { time: '11:00 AM', subject: 'Corporate Law', type: 'Lecture', room: 'Room 205', faculty: 'Prof. S. Verma', color: '#8B5CF6' },
      { time: '02:00 PM', subject: 'Entrepreneurship Dev.', type: 'Workshop', room: 'Seminar Hall 1', faculty: 'Dr. M. Patel', color: '#F59E0B' },
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'International Business', type: 'Lecture', room: 'Room 302', faculty: 'Prof. A. Gupta', color: '#10B981' },
      { time: '12:00 PM', subject: 'Digital Marketing', type: 'Lab', room: 'Computer Lab 2', faculty: 'Ms. P. Joshi', color: '#F43F5E' },
      { time: '03:00 PM', subject: 'Business Ethics', type: 'Lecture', room: 'Room 101', faculty: 'Dr. K. Singh', color: '#64748B' },
    ],
    Friday: [
      { time: '09:00 AM', subject: 'Digital Marketing', type: 'Lecture', room: 'Room 201', faculty: 'Ms. P. Joshi', color: '#F43F5E' },
      { time: '11:00 AM', subject: 'Project Management', type: 'Lab', room: 'Computer Lab 1', color: '#3B82F6' },
      { time: '03:00 PM', subject: 'Business Ethics', type: 'Discussion', room: 'Room 101', color: '#64748B' },
    ],
  };

  const currentDayName = format(new Date(), 'EEEE');
  const todaySchedule = WEEKLY_SCHEDULE[currentDayName] || [];

  return (
    <div className="space-y-6 animate-fadeUp">
      <SEO title="Student Dashboard" description="Your personalized academic overview, notices, and assignment tracking." />
      
      {/* A. GREETING HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <section>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            {getGreeting()}, {appUser?.name?.split(' ')[0] || 'Academic'}!
          </h1>
          <p className="text-text-secondary font-medium mt-1.5 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent soft-pulse" />
            Active Program: {appUser?.department || 'BBA LLB'} · Semester {appUser?.year ? appUser.year * 2 : '8'} · Roll: SAGI/BBA/2022/047
          </p>
        </section>
        
        <div className="flex items-center gap-3 bg-white border border-border-subtle px-4 py-2.5 rounded-2xl shadow-sm self-start md:self-auto transition-all hover:border-border-strong hover:shadow-md cursor-default group">
          <HiOutlineCalendarDays className="w-[18px] h-[18px] text-text-muted group-hover:text-charcoal transition-colors" />
          <p className="text-[14px] font-bold text-text-primary">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
      </div>
        
      {/* B. KPI CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'College Notices', val: activeNotices.length, icon: HiOutlineMegaphone, trend: 'Updated hourly' },
          { label: 'Events Today', val: todayEvents.length, icon: HiOutlineCalendarDays, trend: '4 confirmed' },
          { label: 'Pending Tasks', val: pendingAssignments.length, icon: HiOutlineClipboardDocumentList, trend: '2 due today' },
          { label: 'Unread Alerts', val: unreadCount, icon: HiOutlineBell, trend: 'Check updates' }
        ].map((card, i) => (
          <div key={i} className="card-shell p-5 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-charcoal group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all">
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.12em]">
                {card.label}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-3xl font-bold text-text-primary">{card.val}</p>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide group-hover:text-text-secondary transition-colors">
                {card.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* C. MAIN ANALYTICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hours Activity (2/3) */}
        <div className="lg:col-span-2 card-shell p-6 flex flex-col h-[320px]">
          <div className="flex items-start justify-between mb-6">
            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight">Hours Activity</h2>
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-text-secondary mt-1 group cursor-default">
                <HiOutlineArrowTrendingUp className="w-4 h-4 text-charcoal" />
                <span>+12% higher study activity than previous week</span>
              </div>
            </section>
            <button className="h-10 px-4 bg-bg-card-secondary border border-border-subtle rounded-xl text-xs font-bold text-text-primary hover:border-border-strong hover:bg-bg-hover transition-all flex items-center gap-2">
              Current Week <HiOutlineChevronRight className="w-3 h-3 text-text-muted" />
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-3 px-2 mt-2">
            {MOCK_HOURS.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                <div
                  className={`w-full rounded-xl transition-all duration-300 ease-out cursor-pointer shadow-sm study-bar ${
                    item.active 
                      ? 'bg-accent shadow-md shadow-accent/20' 
                      : 'bg-border-subtle hover:bg-border-strong'
                  }`}
                  data-h={item.active ? '100' : Math.round(item.hours) * 10}
                />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  item.active 
                    ? 'text-charcoal' 
                    : 'text-text-muted group-hover:text-text-secondary'
                }`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule (1/3) */}
        <div className="lg:col-span-1 card-shell p-6 flex flex-col h-[320px]">
          <header className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Today's Schedule</h2>
            <div className="text-[11px] font-bold text-charcoal uppercase bg-accent/20 px-2 py-0.5 rounded-md">
               {currentDayName}
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-3">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-bg-card-secondary border border-border-subtle hover:border-border-strong hover:bg-white hover:shadow-sm transition-all group">
                  <div className="text-[11px] font-bold text-text-secondary w-14 shrink-0">
                    {item.time}
                  </div>
                  <div className="w-1.5 h-10 rounded-full shrink-0 subject-strip" data-subject-color={item.color} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-text-primary truncate">{item.subject}</p>
                    <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-0.5 truncate uppercase">
                      {item.type} · {item.room}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <HiOutlineAcademicCap className="w-10 h-10 text-text-muted mb-3" />
                <p className="text-sm font-bold text-text-muted">No sessions today</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* D. SECONDARY ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Latest Notices (2/3) */}
        <div className="lg:col-span-2 card-shell p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Institutional Announcements</h2>
            <Link href="/notices" className="text-[13px] font-bold text-charcoal flex items-center gap-1.5 hover:underline decoration-accent decoration-2 underline-offset-4 bg-bg-card-secondary px-3 py-1.5 rounded-xl border border-border-subtle">
              Access Full Board <HiOutlineArrowRight className="w-4 h-4 text-text-muted" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {activeNotices.slice(0, 4).map(notice => {
              const themeClass = CATEGORY_CHIP_THEMES[notice.category] || CATEGORY_CHIP_THEMES.General;
              const Icon = CATEGORY_ICONS[notice.category] || HiOutlineMegaphone;
              
              return (
                <Link 
                  key={notice.id} 
                  href={`/notices/${notice.id}`}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-bg-hover group transition-all"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all group-hover:shadow-md ${themeClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${themeClass}`}>
                        {notice.category}
                      </span>
                      {notice.tags && !notice.tags.includes('ALL') && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-charcoal text-white">
                          Targeted
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-text-muted">· {format(notice.postedAt, 'MMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-text-primary truncate">
                      {notice.title}
                    </h3>
                  </div>
                  <HiOutlineChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all mr-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Due Soon (1/3) */}
        <div className="lg:col-span-1 card-shell p-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Upcoming Deadlines</h2>
            <span className="text-[10px] bg-soft-red text-charcoal px-2 py-1 rounded-md font-bold uppercase border border-red-100 uppercase tracking-widest leading-none">
              Urgent
            </span>
          </header>
          
          <div className="space-y-4">
            {pendingAssignments.slice(0, 4).length > 0 ? (
              pendingAssignments.slice(0, 4).map(task => {
                const daysLeft = differenceInDays(task.dueDate, new Date());
                return (
                  <div key={task.id} className="flex items-center gap-4 p-3 rounded-2xl bg-bg-card-secondary border border-border-subtle group hover:border-border-strong hover:bg-white transition-all">
                    <div className="w-5 h-5 rounded-md border-2 border-text-muted/20 flex items-center justify-center bg-white group-hover:border-accent transition-colors">
                      {task.isCompleted && <HiOutlineCheckCircle className="w-3.5 h-3.5 text-charcoal" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold text-text-primary truncate group-hover:text-charcoal">{task.title}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${daysLeft <= 2 ? 'text-danger' : 'text-text-muted'}`}>
                         Due {daysLeft <= 0 ? 'Today' : `in ${daysLeft} Days`}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 flex flex-col items-center justify-center opacity-30">
                <HiOutlineClipboardDocumentList className="w-12 h-12 text-text-muted mb-2" />
                <p className="text-sm font-bold text-text-muted">No pending tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
