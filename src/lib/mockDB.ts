import { Notice, CalendarEvent, Assignment } from './types';
import { SEED_NOTICES, SEED_EVENTS, SEED_ASSIGNMENTS } from './seedData(1)';

// In-memory simulation of a database for demo purposes
// In a real app, this would be replaced by a proper database like PostgreSQL or MongoDB

class MockDatabase {
  private notices: Notice[] = [];
  private events: CalendarEvent[] = [];
  private assignments: Assignment[] = [];

  constructor() {
    this.reset();
  }

  // Reset/Initialize with seed data
  reset() {
    this.notices = SEED_NOTICES.map((n, i) => ({ ...n, id: `notice-${i + 1}`, postedAt: new Date(n.postedAt), expiryDate: new Date(n.expiryDate) }));
    this.events = SEED_EVENTS.map((e, i) => ({ ...e, id: `event-${i + 1}`, date: new Date(e.date) }));
    this.assignments = SEED_ASSIGNMENTS.map((a, i) => ({ ...a, id: `task-${i + 1}`, dueDate: new Date(a.dueDate), postedAt: new Date(a.postedAt) }));
  }

  // Notices
  getNotices() { return this.notices; }
  addNotice(data: Omit<Notice, 'id' | 'postedAt'>) {
    const newNotice: Notice = { 
      ...data, 
      id: `notice-${Date.now()}`, 
      postedAt: new Date(),
      expiryDate: new Date(data.expiryDate)
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }
  deleteNotice(id: string) {
    this.notices = this.notices.filter(n => n.id !== id);
    return true;
  }

  // Assignments
  getAssignments() { return this.assignments; }
  addAssignment(data: Omit<Assignment, 'id' | 'postedAt'>) {
    const newAssignment: Assignment = {
      ...data,
      id: `task-${Date.now()}`,
      postedAt: new Date(),
      dueDate: new Date(data.dueDate)
    };
    this.assignments.unshift(newAssignment);
    return newAssignment;
  }
  deleteAssignment(id: string) {
    this.assignments = this.assignments.filter(a => a.id !== id);
    return true;
  }

  // Events
  getEvents() { return this.events; }
  addEvent(data: Omit<CalendarEvent, 'id'>) {
    const newEvent: CalendarEvent = {
       ...data,
       id: `event-${Date.now()}`,
       date: new Date(data.date)
    };
    this.events.unshift(newEvent);
    return newEvent;
  }
}

// Global instance to persist data across API calls while the server is running
const globalForMockDB = global as unknown as { mockDB: MockDatabase };
export const db = globalForMockDB.mockDB || new MockDatabase();

if (process.env.NODE_ENV !== 'production') globalForMockDB.mockDB = db;
