/**
 * RP8 Fitness — shared lead-capture endpoint for all three forms (contact
 * page, "Claim My Spot" popup, WhatsApp widget). Backed by a Google Apps
 * Script web app that appends each submission to its own tab in a sheet.
 *
 * URLSearchParams is used deliberately for the request body: it sends as
 * `application/x-www-form-urlencoded`, which keeps the request a "simple"
 * CORS request (no preflight) — Apps Script's web app endpoint has no way
 * to answer an OPTIONS preflight, so a JSON body would fail outright.
 */

// Country code, no + or spaces (wa.me requires this exact format).
export const RP8_WHATSAPP_NUMBER = "919205138707";

const RP8_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwripEwZALkMedWQb8N1h-Xz3UohL0kaNAL3lDxV0cznQpt_Uyb3HZaIn0e9pAhI9QG/exec";

export type RP8FormKey = "contact" | "popup" | "whatsapp";

export async function sendToSheet(formKey: RP8FormKey, data: Record<string, string>) {
  const body = new URLSearchParams({ form: formKey, page: window.location.href });
  Object.entries(data).forEach(([key, value]) => body.append(key, value ?? ""));

  const res = await fetch(RP8_ENDPOINT, { method: "POST", body });
  const out = await res.json();
  if (!out.ok) throw new Error(out.error || "Save failed");
  return out;
}
