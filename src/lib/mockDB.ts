import { Notice, CalendarEvent, Assignment, NormalizedUserProfile } from './types';
import { SEED_NOTICES, SEED_EVENTS, SEED_ASSIGNMENTS } from './seedData';

// In-memory simulation of a database for demo purposes
// In a real app, this would be replaced by a proper database like PostgreSQL or MongoDB

class MockDatabase {
  private notices: Notice[] = [];
  private events: CalendarEvent[] = [];
  private assignments: Assignment[] = [];
  private users: NormalizedUserProfile[] = [];
  
  private institutions: any[] = [
    {
      id: 'org-1',
      name: 'Bugweiser University',
      slug: 'bugweiser-u',
      logoUrl: '',
      accentColor: '#D9FF3F',
      contactEmail: 'admin@bugweiser.edu',
      address: '123 Pixel Avenue, Tech City',
      academicYear: '2026 Season',
      footerDisclaimer: 'Official Institutional Asset. Unauthorized access or redistribution is strictly prohibited.'
    },
    {
      id: 'org-demo',
      name: 'Bugweiser Sandbox',
      slug: 'demo',
      logoUrl: '',
      accentColor: '#D9FF3F', // Neon Green (User preferred)
      contactEmail: 'sandbox@bugweiser.edu',
      address: 'Cloud Instance #01',
      academicYear: 'Demo Period',
      footerDisclaimer: 'DEMO ENVIRONMENT: Data in this sandbox is for simulation and training purposes ONLY.'
    }
  ];

  private departments: Record<string, string[]> = {
    'org-1': ['Computer Science', 'Business Administration', 'Electrical Engineering', 'Mechanical Engineering'],
    'org-demo': ['SaaS Engineering', 'Cloud Growth', 'Demo Product']
  };
  
  private sections: Record<string, string[]> = {
    'org-1': ['Section A', 'Section B', 'Section C'],
    'org-demo': ['Sandbox-01', 'Sandbox-02']
  };

  constructor() {
    this.reset();
  }

  // Reset/Initialize with seed data
  reset() {
    // 1. Seed Org-1 (Primary)
    this.notices = SEED_NOTICES.map((n, i) => ({ 
      ...n, 
      id: `notice-${i + 1}`, 
      postedAt: new Date(n.postedAt), 
      expiryDate: new Date(n.expiryDate),
      publishState: 'published',
      createdAt: new Date(n.postedAt),
      updatedAt: new Date(n.postedAt),
      createdBy: 'System Seed',
      organizationId: 'org-1'
    } as Notice));
    
    this.events = SEED_EVENTS.map((e, i) => ({ 
      ...e, 
      id: `event-${i + 1}`, 
      date: new Date(e.date),
      publishState: 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'System Seed',
      organizationId: 'org-1'
    } as CalendarEvent));
    
    this.assignments = SEED_ASSIGNMENTS.map((a, i) => ({ 
      ...a, 
      id: `task-${i + 1}`, 
      dueDate: new Date(a.dueDate), 
      postedAt: new Date(a.postedAt),
      publishState: 'published',
      createdAt: new Date(a.postedAt),
      updatedAt: new Date(a.postedAt),
      createdBy: 'System Seed',
      organizationId: 'org-1'
    } as Assignment));

    // 2. Seed Org-Demo (Sandbox)
    this.addNotice({
      title: "Welcome to Bugweiser Sandbox",
      body: "This is your isolated demo environment. Data created here is strictly separate from Bugweiser University.",
      category: "General",
      tags: ["ALL"],
      urgency: "Normal",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      isPinned: true,
      attachmentUrl: null,
      attachmentName: null,
      publishState: "published",
      createdBy: "System Demo",
      organizationId: "org-demo"
    } as any);

    this.addEvent({
      title: "Organization Onboarding",
      description: "Setup your institution parameters and landing page.",
      category: "Workshop",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      tags: ["ALL"],
      color: "#6366F1",
      publishState: "published",
      createdBy: "System Demo",
      organizationId: "org-demo"
    } as any);

    this.addAssignment({
      title: "Configure Tenant Branding",
      course: "SaaS Ops 101",
      description: "Experiment with the Adaptive Tenant values in InstitutionContext.",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      tags: ["ALL"],
      postedBy: "System",
      publishState: "published",
      createdBy: "System Demo",
      organizationId: "org-demo"
    } as any);
  }

  // Notices
  getNotices(orgId?: string) { 
    if (!orgId) return this.notices;
    return this.notices.filter(n => n.organizationId === orgId); 
  }
  addNotice(data: Omit<Notice, 'id' | 'postedAt' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const newNotice: Notice = { 
      ...data, 
      id: `notice-${now.getTime()}`, 
      postedAt: now,
      expiryDate: new Date(data.expiryDate),
      publishState: data.publishState || 'published',
      createdAt: now,
      updatedAt: now,
      createdBy: data.createdBy || 'Unknown Admin',
      organizationId: data.organizationId || 'org-1'
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }
  updateNotice(id: string, updates: Partial<Notice>) {
    this.notices = this.notices.map(n => n.id === id ? { 
      ...n, 
      ...updates, 
      updatedAt: new Date(),
      updatedBy: updates.updatedBy || n.updatedBy 
    } : n);
    return this.notices.find(n => n.id === id);
  }
  deleteNotice(id: string) {
    this.notices = this.notices.filter(n => n.id !== id);
    return true;
  }

  // Assignments
  getAssignments(orgId?: string) { 
    if (!orgId) return this.assignments;
    return this.assignments.filter(a => a.organizationId === orgId);
  }
  addAssignment(data: Omit<Assignment, 'id' | 'postedAt' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const newAssignment: Assignment = {
      ...data,
      id: `task-${now.getTime()}`,
      postedAt: now,
      dueDate: new Date(data.dueDate),
      publishState: data.publishState || 'published',
      createdAt: now,
      updatedAt: now,
      createdBy: data.createdBy || 'Unknown Admin',
      organizationId: data.organizationId || 'org-1'
    };
    this.assignments.unshift(newAssignment);
    return newAssignment;
  }
  updateAssignment(id: string, updates: Partial<Assignment>) {
    this.assignments = this.assignments.map(a => a.id === id ? { 
      ...a, 
      ...updates, 
      updatedAt: new Date(),
      updatedBy: updates.updatedBy || a.updatedBy
    } : a);
    return this.assignments.find(a => a.id === id);
  }
  deleteAssignment(id: string) {
    this.assignments = this.assignments.filter(a => a.id !== id);
    return true;
  }

  // Events
  getEvents(orgId?: string) { 
    if (!orgId) return this.events;
    return this.events.filter(e => e.organizationId === orgId); 
  }
  addEvent(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const newEvent: CalendarEvent = {
       ...data,
       id: `event-${now.getTime()}`,
       date: new Date(data.date),
       publishState: data.publishState || 'published',
       createdAt: now,
       updatedAt: now,
       createdBy: data.createdBy || 'Unknown Admin',
       organizationId: data.organizationId || 'org-1'
    };
    this.events.unshift(newEvent);
    return newEvent;
  }
  updateEvent(id: string, updates: Partial<CalendarEvent>) {
    this.events = this.events.map(e => e.id === id ? { 
      ...e, 
      ...updates, 
      updatedAt: new Date(),
      updatedBy: updates.updatedBy || e.updatedBy
    } : e);
    return this.events.find(e => e.id === id);
  }
  deleteEvent(id: string) {
    this.events = this.events.filter(e => e.id !== id);
    return true;
  }

  // Institution Config
  getInstitutionConfig(orgIdOrSlug: string = 'org-1') {
    return this.institutions.find(i => i.id === orgIdOrSlug || i.slug === orgIdOrSlug) || this.institutions[0];
  }
  updateInstitutionConfig(orgId: string, updates: Partial<any>) {
    const index = this.institutions.findIndex(i => i.id === orgId);
    if (index !== -1) {
      this.institutions[index] = { ...this.institutions[index], ...updates };
      return this.institutions[index];
    }
    return null;
  }

  // Academic Structure
  getAcademicStructure(orgId: string = 'org-1') {
    return {
      departments: this.departments[orgId] || [],
      sections: this.sections[orgId] || []
    };
  }
  addDepartment(orgId: string, name: string) {
    if (!this.departments[orgId]) this.departments[orgId] = [];
    if (!this.departments[orgId].includes(name)) this.departments[orgId].push(name);
    return this.departments[orgId];
  }
  removeDepartment(orgId: string, name: string) {
    if (this.departments[orgId]) {
      this.departments[orgId] = this.departments[orgId].filter(d => d !== name);
    }
    return this.departments[orgId] || [];
  }
  addSection(orgId: string, name: string) {
    if (!this.sections[orgId]) this.sections[orgId] = [];
    if (!this.sections[orgId].includes(name)) this.sections[orgId].push(name);
    return this.sections[orgId];
  }
  removeSection(orgId: string, name: string) {
    if (this.sections[orgId]) {
      this.sections[orgId] = this.sections[orgId].filter(s => s !== name);
    }
    return this.sections[orgId] || [];
  }

  // Users Management
  getUsers() { return this.users; }
  addUsers(newUsers: NormalizedUserProfile[]) {
    // Basic duplicate detection (by email or rollNumber)
    const existingEmails = new Set(this.users.map(u => u.email));
    const toAdd = newUsers.filter(u => !existingEmails.has(u.email));
    this.users = [...this.users, ...toAdd];
    return this.users;
  }
}

// Global instance to persist data across API calls while the server is running
const globalForMockDB = global as unknown as { mockDB: MockDatabase };
export const db = globalForMockDB.mockDB || new MockDatabase();

if (process.env.NODE_ENV !== 'production') globalForMockDB.mockDB = db;
