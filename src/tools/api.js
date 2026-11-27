import { clearAuth, getAuth } from "../utils/auth";

export const API_URL = "https://blogify-oquvchi.vercel.app/api";

export const CATEGORIES = ["Technology", "Productivity", "Design"];
export const STATUSES = ["Published", "Draft"];

/**
 * Small fetch wrapper for the Blogify API.
 * - `auth: true` attaches the Bearer token from localStorage.
 * - A 401 on an authenticated request clears the session and sends the user to /login.
 */
export async function apiRequest(path, { method = "GET", body, auth = false, signal } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAuth()?.token;
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    signal,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // empty or non-JSON body
  }

  if (auth && response.status === 401) {
    clearAuth();
    window.location.assign("/login");
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Request failed (${response.status})`);
  }

  return data;
}

export function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  const str = query.toString();
  return str ? `?${str}` : "";
}

export function formatCompact(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value) || 0);
}
