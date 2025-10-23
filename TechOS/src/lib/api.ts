const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export const api = {
  institutions: {
    list: () => http<any[]>('/institutions'),
    create: (payload: {
      name: string; type: string; address?: string; latitude?: number; longitude?: number; attendanceRadiusMeters?: number;
    }) => http<any>('/institutions', { method: 'POST', body: JSON.stringify(payload) }),
    addCampus: (institutionId: string, payload: { name: string; latitude: number; longitude: number; radiusMeters?: number }) =>
      http<any>(`/institutions/${institutionId}/campuses`, { method: 'POST', body: JSON.stringify(payload) }),
  },
  attendance: {
    checkin: (payload: { institutionId: string; userId: string; courseId: string; latitude: number; longitude: number }) =>
      http<any>('/attendance/checkin', { method: 'POST', body: JSON.stringify(payload) }),
  },
  academic: {
    listEvents: (institutionId: string, courseId?: string) => {
      const params = new URLSearchParams({ institutionId });
      if (courseId) params.append('courseId', courseId);
      return http<any[]>(`/academic/calendar?${params}`);
    },
    createEvent: (payload: any) => http<any>('/academic/calendar', { method: 'POST', body: JSON.stringify(payload) }),
    listMaterials: (courseId: string) => http<any[]>(`/academic/materials?courseId=${encodeURIComponent(courseId)}`),
    createMaterial: (payload: any) => http<any>('/academic/materials', { method: 'POST', body: JSON.stringify(payload) }),
    deleteMaterial: (materialId: string) => http<any>(`/academic/materials/${materialId}`, { method: 'DELETE' }),
    listEvaluations: (courseId: string) => http<any[]>(`/academic/evaluations?courseId=${encodeURIComponent(courseId)}`),
    createEvaluation: (payload: any) => http<any>('/academic/evaluations', { method: 'POST', body: JSON.stringify(payload) }),
    upsertGrade: (payload: any) => http<any>('/academic/grades', { method: 'POST', body: JSON.stringify(payload) }),
    getStudentGrades: (studentId: string, courseId?: string) => {
      const params = courseId ? `?courseId=${encodeURIComponent(courseId)}` : '';
      return http<any[]>(`/academic/grades/student/${studentId}${params}`);
    },
    getCourseGradebook: (courseId: string) => http<any>(`/academic/gradebook/${courseId}`),
  },
};

export default api;


