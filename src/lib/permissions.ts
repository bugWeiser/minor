import { UserRole } from './types';

export interface UserCapabilities {
  canAccessAdminArea: boolean;
  canViewAdminDashboard: boolean;
  canManageNotices: boolean;
  canManageEvents: boolean;
  canManageAssignments: boolean;
  canPublishContent: boolean;
  canDeleteContent: boolean;
  canManageInstitution: boolean;
}

export const GUEST_CAPABILITIES: UserCapabilities = {
  canAccessAdminArea: false,
  canViewAdminDashboard: false,
  canManageNotices: false,
  canManageEvents: false,
  canManageAssignments: false,
  canPublishContent: false,
  canDeleteContent: false,
  canManageInstitution: false,
};

export function getCapabilities(
  role: UserRole | undefined, 
  userOrgId?: string, 
  activeOrgId?: string
): UserCapabilities {
  if (!role) return GUEST_CAPABILITIES;

  // CROSS-TENANT SAFETY: 
  // If the user's organization does not match the active organization, 
  // they are treated as a GUEST for administrative actions, 
  // UNLESS they are a future platform-wide super-admin (scaffolded here).
  const isTenantMatch = userOrgId === activeOrgId;

  switch (role) {
    case 'admin':
      return {
        canAccessAdminArea: isTenantMatch,
        canViewAdminDashboard: isTenantMatch,
        canManageNotices: isTenantMatch,
        canManageEvents: isTenantMatch,
        canManageAssignments: isTenantMatch,
        canPublishContent: isTenantMatch,
        canDeleteContent: isTenantMatch,
        canManageInstitution: isTenantMatch,
      };
    case 'faculty':
      return {
        canAccessAdminArea: isTenantMatch,
        canViewAdminDashboard: false,
        canManageNotices: false,
        canManageEvents: false,
        canManageAssignments: isTenantMatch,
        canPublishContent: isTenantMatch,
        canDeleteContent: false,
        canManageInstitution: false,
      };
    case 'student':
    case 'demo':
    default:
      return GUEST_CAPABILITIES;
  }
}
