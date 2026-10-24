import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService, type UserRole } from '../../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

/**
 * Route protection guard for Trails Monitor Hub prototype.
 * Checks whether the user has a valid active demo session matching the required role.
 * If not authenticated, redirects to the role's login page with return state.
 * If logged in as another role, redirects to that user's own authorized dashboard.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const location = useLocation();
  const session = authService.getSession();

  // If no session exists, redirect to the role login page
  if (!session) {
    return <Navigate to={`/login/${allowedRole}`} state={{ from: location }} replace />;
  }

  // If logged in as a different role, prevent cross-role access and route to their dashboard
  if (session.role !== allowedRole) {
    const roleDashboardMap: Record<UserRole, string> = {
      doctor: '/doctor',
      staff: '/staff',
      patient: '/patient',
    };
    return <Navigate to={roleDashboardMap[session.role] || '/'} replace />;
  }

  return <>{children}</>;
};
