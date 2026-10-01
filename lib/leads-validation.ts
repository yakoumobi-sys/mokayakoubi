import { funnel, isTrack, type Answers, type Track } from '../config/funnel'
export type Lead = { requestId: string; track: Track; answers: Answers; name: string; phone: string; email: string; channel: string; details: string; date: string; consent: true; attribution: Record<string,string> }
export function validateLead(input: unknown): Lead {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Demande invalide.')
  const data = input as Record<string, unknown>
  const str = (key: string, max: number) => { const v = data[key] ?? ''; if (typeof v !== 'string' || v.length > max) throw new Error('Un champ est invalide.'); return v.trim() }
  const track = str('track', 20)
  if (!isTrack(track)) throw new Error('Choisis un projet valide.')
  const requestId = str('requestId', 36)
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) throw new Error('Recharge la page avant de réessayer.')
  if (str('website', 500)) throw new Error('Demande invalide.')
  const name = str('name', 80), phone = str('phone', 30), email = str('email', 254), channel = str('channel', 20)
  if (name.length < 2 || /[\r\n\x00-\x1f]/.test(name)) throw new Error('Indique ton prénom.')
  if (!['Téléphone', 'WhatsApp', 'E-mail'].includes(channel)) throw new Error('Choisis un canal de contact.')
  if ((phone || channel !== 'E-mail') && (!/^[+\d() .-]+$/.test(phone) || phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15)) throw new Error('Vérifie ton numéro de téléphone.')
  if ((email || channel === 'E-mail') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Vérifie ton adresse e-mail.')
  if (data.consent !== true) throw new Error('Ton accord est nécessaire pour te recontacter.')
  const raw = data.answers
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Complète ton brief.')
  const answers: Answers = {}
  for (const q of funnel[track].questions) {
    const answer = (raw as Record<string, unknown>)[q.key]
    if (typeof answer !== 'string' || !q.options.includes(answer)) throw new Error('Complète toutes les questions de ton projet.')
    answers[q.key] = answer
  }
  const date = str('date', 10)
  if (date) {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Algiers' }).format(new Date())
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date || date < today) throw new Error('Choisis une date valide, aujourd’hui ou plus tard.')
  }
  const attribution: Record<string,string> = {}
  if (data.attribution && typeof data.attribution === 'object') for (const key of ['utm_source','utm_medium','utm_campaign','utm_content']) {
    const value = (data.attribution as Record<string,unknown>)[key]
    if (typeof value === 'string') attribution[key] = value.slice(0,120)
  }
  return { requestId, track, answers, name, phone, email, channel, details: str('details',1200), date, consent: true, attribution }
}
