/**
 * api.js – Centralised API client for the portfolio frontend.
 * All fetch calls to the Django REST backend live here.
 */

// Use local Django backend URL
const API_BASE = "https://suraj-kumar-shah-portfolio-website.onrender.com/api/v1";

/**
 * Generic fetch wrapper – returns parsed JSON or throws on error.
 * @param {string} endpoint
 * @param {RequestInit} [options]
 */
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(`API error ${res.status}`), { data: err, status: res.status });
  }
  return res.json();
}

// ── Public endpoints ───────────────────────────────────────────────────────
export const API = {
  /** Single call that fetches everything for the home page */
  getSummary:       ()         => apiFetch('/summary/'),

  getAbout:         ()         => apiFetch('/about/'),
  getSkills:        ()         => apiFetch('/skills/'),
  getProjects:      (cat = '') => apiFetch(`/projects/${cat ? `?category=${cat}` : ''}`),
  getProjectBySlug: (slug)     => apiFetch(`/projects/${slug}/`),
  getEducation:     ()         => apiFetch('/education/'),
  getExperience:    ()         => apiFetch('/experience/'),
  getCertifications:()         => apiFetch('/certifications/'),

  /**
   * POST contact form data.
   * @param {{ name,email,subject,message }} body
   */
  sendContact: (body) =>
    apiFetch('/contact/', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
