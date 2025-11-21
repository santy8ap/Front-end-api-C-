// Helper para obtener el nombre del rol basado en roleId
export const getRoleName = (roleId: number): string => {
  const roles: Record<number, string> = {
    1: 'Admin',
    2: 'Teacher',
    3: 'Student',
  };
  return roles[roleId] || 'Unknown';
};

// Helper para verificar si es admin o teacher
export const isAdminOrTeacher = (roleId: number): boolean => {
  return roleId === 1 || roleId === 2;
};

// Helper para verificar si es estudiante
export const isStudent = (roleId: number): boolean => {
  return roleId === 3;
};