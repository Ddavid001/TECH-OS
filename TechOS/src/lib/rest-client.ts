const BASE_URL = import.meta.env.VITE_REST_API_URL as string | undefined;

export function isRestEnabled(): boolean {
  return typeof BASE_URL === 'string' && BASE_URL.length > 0;
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE_URL) throw new Error('REST API no configurada');
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`REST ${res.status}: ${text}`);
  }
  // Some POSTs may return empty body; guard JSON parse
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return undefined as unknown as T;
}

export async function restFetchJobOffers(): Promise<any[]> {
  // embed institution name if FK exists
  const select = encodeURIComponent('*,institutions(name)');
  return http<any[]>(`/job_offers?select=${select}&order=created_at.desc`);
}

export async function restFetchJobOffersByInstitutionId(institutionId: string): Promise<any[]> {
  const select = encodeURIComponent('*,institutions(name)');
  return http<any[]>(`/job_offers?select=${select}&institution_id=eq.${encodeURIComponent(institutionId)}&order=created_at.desc`);
}

export async function restFetchInstitutions(): Promise<any[]> {
  return http<any[]>(`/institutions?select=*&is_active=eq.true&order=name.asc`);
}

export async function restFetchUserApplications(userId: string): Promise<any[]> {
  const select = encodeURIComponent([
    'id',
    'user_id',
    'job_offer_id',
    'status',
    'submitted_at',
    'reviewed_at',
    'cover_letter',
    'resume_url',
    'phone',
    'email',
    'rejection_reason',
    'job_offers(position_title,institution_name,branch,tentative_salary,requirements)'
  ].join(','));
  return http<any[]>(`/job_applications?select=${select}&user_id=eq.${encodeURIComponent(userId)}&order=submitted_at.desc`);
}

export async function restCreateJobApplication(payload: Record<string, unknown>): Promise<void> {
  await http('/job_applications', {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
}


