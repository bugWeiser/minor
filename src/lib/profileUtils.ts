import { AppUser, NormalizedUserProfile } from './types';

/**
 * Safely parses any generic user object (Firebase or Mock)
 * into a single normalized identity structure for targeting and rendering.
 */
export function normalizeAppUser(user: AppUser | any | null): NormalizedUserProfile | null {
  if (!user) return null;

  // Resolve role cautiously
  let resolvedRole: 'student' | 'admin' | 'faculty' | 'demo' = 'student';
  if (user.role && ['student', 'admin', 'faculty', 'demo'].includes(user.role)) {
    resolvedRole = user.role;
  } else if (user.isAdmin) {
    resolvedRole = 'admin';
  }

  // Gracefully fallback fields if missing
  const id = user.uid || user.id || 'unknown';
  const fullName = user.name || user.fullName || 'Anonymous User';
  const email = user.email || '';
  const department = user.department || undefined;
  const year = user.year ? Number(user.year) : undefined;
  
  // Custom groups like specific clubs or extracurriculars
  const customGroups = Array.isArray(user.customGroups) ? user.customGroups : [];
  
  // Enrolled courses
  const enrolledCourses = Array.isArray(user.courses) ? user.courses : [];

  // Compute normalized tags based on the single source of truth (the fields above)
  const tags: string[] = ['ALL'];
  if (department) tags.push(department.toUpperCase());
  if (department && year) tags.push(`${department.toUpperCase()}-${year}`);
  
  // Push custom groups to targeting tags
  customGroups.forEach((g: string) => tags.push(g));
  
  // Legacy compatibility: If `user.tags` existed from old mock data, merge them uniquely
  if (Array.isArray(user.tags)) {
    user.tags.forEach((tag: string) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  }

  return {
    id,
    fullName,
    email,
    role: resolvedRole,
    organizationId: user.organizationId,
    department,
    program: user.program, // Optional field
    year,
    semester: user.semester,
    section: user.section,
    rollNumber: user.rollNumber || user.rollId,
    enrolledCourses,
    customGroups,
    tags
  };
}
