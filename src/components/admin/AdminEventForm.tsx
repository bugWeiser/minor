'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent, PublishState } from '@/lib/types';
import { EVENT_CATEGORIES, EVENT_CATEGORY_STYLES, EVENT_CATEGORY_Tailwind_MAP, EventCategory } from '@/lib/constants';
import TagSelector from './TagSelector';
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineMapPin, HiOutlineUserCircle, HiOutlineInformationCircle } from 'react-icons/hi2';

interface AdminEventFormProps {
  initialData?: CalendarEvent;
  onSubmit: (data: Partial<CalendarEvent>) => Promise<void>;
}

export default function AdminEventForm({ initialData, onSubmit }: AdminEventFormProps) {
  const [loading, setLoading] = useState(false);
  const [allDay, setAllDay] = useState(initialData?.time === 'All Day' || !initialData?.time);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || ['ALL']);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: (initialData?.category as EventCategory) || 'General',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    startTime: initialData?.time && initialData.time !== 'All Day' ? initialData.time.split(' - ')[0] : '',
    endTime: initialData?.time && initialData.time.includes(' - ') ? initialData.time.split(' - ')[1] : '',
    location: initialData?.location || '',
    issuer: initialData?.createdBy || 'Institutional Administration',
    publishState: initialData?.publishState || 'published' as PublishState,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let timeString = 'All Day';
      if (!allDay) {
        if (!form.startTime) {
          alert("Please specify a starting horizon for the event protocol.");
          setLoading(false);
          return;
        }
        
        if (form.startTime && form.endTime) {
          // Basic comparison for 24h format
          if (form.endTime <= form.startTime) {
            alert("The terminal horizon (End Time) must occur after the initial launch (Start Time).");
            setLoading(false);
            return;
          }
          timeString = `${form.startTime} - ${form.endTime}`;
        } else {
          timeString = form.startTime;
        }
      }

      await onSubmit({
        title: form.title,
        description: form.description,
        category: form.category,
        date: new Date(form.date),
        time: timeString,
        location: form.location,
        tags: selectedTags,
        publishState: form.publishState,
        color: EVENT_CATEGORY_STYLES[form.category as EventCategory].accent,
        updatedAt: new Date(),
        createdBy: form.issuer,
      });
    } catch (error) {
      console.error("Event Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const lbl = "block text-[11px] font-black text-charcoal/50 uppercase tracking-widest mb-2 ml-1";
  const input = "w-full px-5 py-4 bg-white border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium placeholder:text-text-muted/40";
  const select = "w-full px-5 py-4 bg-white border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-black appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header Info */}
      <div className="animate-fadeUp">
        <label htmlFor="event-title" className={lbl}>Event Title <span className="text-danger">*</span></label>
        <input 
          id="event-title"
          type="text" 
          required
          placeholder="e.g. Annual Technical Symposium 2026"
          className={input}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          title="Event Title"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeUp">
        <div>
          <label htmlFor="event-category" className={lbl}>Primary Category</label>
          <div className="relative">
            <select 
              id="event-category"
              className={select}
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value as EventCategory })}
              title="Select Event Category"
            >
              {EVENT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="event-date" className={lbl}>Event Date <span className="text-danger">*</span></label>
          <div className="relative">
            <HiOutlineCalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
            <input 
              id="event-date"
              type="date"
              required
              className={`${input} pl-12`}
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              title="Event Date"
            />
          </div>
        </div>
      </div>

      {/* Time Controls */}
      <div className="p-8 bg-bg-page border border-border-subtle rounded-[32px] space-y-6 animate-fadeUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiOutlineClock className="w-5 h-5 text-accent" />
            <span className="text-xs font-black uppercase tracking-widest text-charcoal">Timing Parameters</span>
          </div>
          {allDay ? (
            <button 
              type="button"
              onClick={() => {
                setAllDay(false);
                setForm(prev => ({ ...prev, startTime: '10:00', endTime: '11:00' }));
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all bg-accent text-white border-accent shadow-sm"
              title="Switch to Timed Event"
              aria-label="Disable All-Day Event"
              aria-pressed="true"
            >
              <span className="text-[10px] font-black uppercase tracking-tighter">All Day</span>
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => {
                setAllDay(true);
                setForm(prev => ({ ...prev, startTime: '', endTime: '' }));
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all bg-white text-text-muted border-border-subtle hover:border-charcoal"
              title="Switch to All-Day Event"
              aria-label="Enable All-Day Event"
              aria-pressed="false"
            >
              <span className="text-[10px] font-black uppercase tracking-tighter">All Day</span>
            </button>
          )}
        </div>

        {!allDay && (
          <div className="grid grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <label htmlFor="event-start-time" className={lbl}>Start Time</label>
              <input 
                id="event-start-time"
                type="time"
                className={input}
                value={form.startTime}
                onChange={e => setForm({ ...form, startTime: e.target.value })}
                title="Start Time"
              />
            </div>
            <div>
              <label htmlFor="event-end-time" className={lbl}>End Time</label>
              <input 
                id="event-end-time"
                type="time"
                className={input}
                value={form.endTime}
                onChange={e => setForm({ ...form, endTime: e.target.value })}
                title="End Time"
              />
            </div>
          </div>
        )}
      </div>

      {/* Logistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeUp">
        <div>
          <label htmlFor="event-location" className={lbl}>Location / Venue</label>
          <div className="relative">
            <HiOutlineMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 font-bold" />
            <input 
              id="event-location"
              type="text"
              placeholder="e.g. Main Auditorium, Block C"
              className={`${input} pl-12`}
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              title="Event Location"
            />
          </div>
        </div>
        <div>
          <label htmlFor="event-issuer" className={lbl}>Issuer / Host Organization</label>
          <div className="relative">
            <HiOutlineUserCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 font-bold" />
            <input 
              id="event-issuer"
              type="text"
              placeholder="e.g. Placement Cell"
              className={`${input} pl-12`}
              value={form.issuer}
              onChange={e => setForm({ ...form, issuer: e.target.value })}
              title="Event Issuer"
            />
          </div>
        </div>
      </div>

      <div className="animate-fadeUp">
        <label htmlFor="event-description" className={lbl}>Description</label>
        <textarea 
          id="event-description"
          placeholder="Brief summary of the institutional event..."
          className={`${input} min-h-[140px] resize-none leading-relaxed`}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          title="Event Description"
        />
      </div>

      {/* Targeting */}
      <div className="animate-fadeUp">
        <label className={lbl}>Target Demographic Grid</label>
        <div className="p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm">
           <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>

      {/* Publish State */}
      <div className="flex flex-col md:flex-row gap-6 animate-fadeUp">
        <div className="flex-1 p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black text-charcoal uppercase tracking-widest">Deployment State</div>
            <div className="text-xs text-text-muted font-medium mt-0.5">Control visibility across the institutional grid</div>
          </div>
          <div className="flex p-1 bg-bg-page rounded-xl border border-border-subtle">
            {form.publishState === 'draft' ? (
              <button 
                type="button"
                aria-label="Event currently in Draft mode"
                aria-pressed="true"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all bg-white shadow-sm text-charcoal border border-border-subtle"
                title="Status: Draft"
              >
                Draft
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setForm({ ...form, publishState: 'draft' })}
                aria-label="Set event status to Draft"
                aria-pressed="false"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all text-text-muted hover:text-charcoal"
                title="Set to Draft"
              >
                Draft
              </button>
            )}
            
            {form.publishState === 'published' ? (
              <button 
                type="button"
                aria-label="Event currently Live"
                aria-pressed="true"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all bg-accent text-white shadow-md shadow-accent/20"
                title="Status: Live"
              >
                Live
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setForm({ ...form, publishState: 'published' })}
                aria-label="Set event status to Live"
                aria-pressed="false"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all text-text-muted hover:text-charcoal"
                title="Set to Live"
              >
                Live
              </button>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="md:w-[240px] bg-charcoal text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-charcoal/20 active:scale-[0.98] disabled:opacity-50"
          title="Save Institutional Event"
        >
          {loading ? 'Processing...' : initialData ? 'Update Parameters' : 'Deploy to Grid'}
        </button>
      </div>
    </form>
  );
}
