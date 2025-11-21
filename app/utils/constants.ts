export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_DASHBOARD: '/student',
  STUDENT_QUERIES: '/student/queries',
  STUDENT_EXECUTE: '/student/execute',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_INSTANCES: '/admin/instances',
  ADMIN_CREATE_INSTANCE: '/admin/instances/create',
  ADMIN_ASSIGN: '/admin/assign',
} as const;

export const ROLES = {
  STUDENT: 'Student',
  ADMIN: 'Admin',
  TEACHER: 'Teacher',
} as const;