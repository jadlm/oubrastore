/** Contact & liens officiels (footer, topbar, WhatsApp commandes) */
export const SITE_WHATSAPP_E164 = '212609240487';
export const SITE_WHATSAPP_URL = `https://wa.me/${SITE_WHATSAPP_E164}`;
export const SITE_SERVICE_PHONE_DISPLAY = '+212 609-240487';
export const SITE_SERVICE_PHONE_TEL = '+212609240487';
export const SITE_MAP_URL =
  'https://www.google.com/maps/place/Oubra+Store+(Tirage+plans+,+fournitures+de+bureau+,+scolaires+,+informatiques+)/@33.5431674,-7.6819603,21z/data=!4m6!3m5!1s0xda62d007a8b1d7d:0x8055c42546be28fa!8m2!3d33.5432299!4d-7.681885!16s%2Fg%2F11pv3xd7nq?hl=fr&entry=ttu&g_ep=EgoyMDI2MDUxMC4wIKXMDSoASAFQAw%3D%3D';

/** Carte intégrée (iframe) — mêmes coordonnées que le lien lieu Google Maps */
export const SITE_MAP_LAT = 33.5432299;
export const SITE_MAP_LNG = -7.681885;
export const SITE_MAP_EMBED_URL = `https://www.google.com/maps?q=${SITE_MAP_LAT},${SITE_MAP_LNG}&hl=fr&z=17&output=embed`;

/** URL de base du backend (uploads / images produits) */
export function getBackendOrigin() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  return api.replace(/\/?api\/?$/i, '') || 'http://localhost:5000';
}
