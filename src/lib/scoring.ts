import { riskControls } from '../data/riskScenarios'
import type { AuditCase, ContractCase, FindingGrade, RiskLevel, RiskScenario, TprmCase, Treatment, Verdict } from '../types'

export const RISK_LEVELS: RiskLevel[] = ['Faible', 'Modéré', 'Élevé', 'Critique']

/** Grille de la matrice 5x5 utilisée dans tout le site (cf. Module 3). */
export function levelOf(score: number): RiskLevel {
  if (score >= 15) return 'Critique'
  if (score >= 10) return 'Élevé'
  if (score >= 5) return 'Modéré'
  return 'Faible'
}

/** Appétence par défaut : un risque résiduel au-delà de 9 exige une décision de la direction. */
export const APPETITE = 9

/**
 * Sélection multiple : un point par bonne détection, une pénalité par fausse alerte,
 * pour qu'il ne suffise pas de tout cocher.
 */
export function selectionScore(selected: string[], items: { id: string; positive: boolean }[]): number {
  const positives = items.filter((i) => i.positive)
  if (!positives.length) return selected.length === 0 ? 1 : Math.max(0, 1 - selected.length * 0.34)
  const hits = selected.filter((id) => positives.some((p) => p.id === id)).length
  const false_ = selected.filter((id) => items.some((i) => i.id === id && !i.positive)).length
  return Math.max(0, (hits - false_ * 0.5) / positives.length)
}

export interface ContractAnswer {
  traps: string[]
  level: RiskLevel | null
  counter: string | null
}

/** Pièges 50 %, niveau de risque 20 % (moitié si à un cran), contre-clause 30 %. */
export function scoreContract(c: ContractCase, a: ContractAnswer): number {
  const traps = selectionScore(a.traps, c.issues.map((i) => ({ id: i.id, positive: i.isTrap })))
  const gap = a.level ? Math.abs(RISK_LEVELS.indexOf(a.level) - RISK_LEVELS.indexOf(c.riskLevel)) : 99
  const level = gap === 0 ? 1 : gap === 1 ? 0.5 : 0
  const counter = c.counters.find((x) => x.id === a.counter)?.correct ? 1 : 0
  return Math.round(traps * 50 + level * 20 + counter * 30)
}

export const TIERS = ['Tier 1 - Critique', 'Tier 2 - Élevé', 'Tier 3 - Standard'] as const
export const VERDICTS: Verdict[] = ['Go', 'Go avec plan de remédiation', 'No-Go']

export interface TprmAnswer {
  tier: (typeof TIERS)[number] | null
  findings: string[]
  verdict: Verdict | null
}

/** Criticité 20 %, constats 50 %, verdict 30 %. */
export function scoreTprm(c: TprmCase, a: TprmAnswer): number {
  const tier = a.tier === c.criticality.expected ? 1 : 0
  const findings = selectionScore(a.findings, c.findings.map((f) => ({ id: f.id, positive: f.isRedFlag })))
  const verdict = a.verdict === c.verdict ? 1 : 0
  return Math.round(tier * 20 + findings * 50 + verdict * 30)
}

const clamp = (v: number) => Math.max(1, Math.min(5, v))

/** Résiduel : chaque mesure retire son effet ; les effets d'un même axe se cumulent, plancher à 1. */
export function residual(gravity: number, likelihood: number, controls: string[]) {
  let g = gravity
  let l = likelihood
  for (const id of controls) {
    const c = riskControls.find((x) => x.id === id)
    if (!c) continue
    g -= c.effect.gravity
    l -= c.effect.likelihood
  }
  return { gravity: clamp(g), likelihood: clamp(l) }
}

export interface RiskAnswer {
  gravity: number
  likelihood: number
  controls: string[]
  treatment: Treatment | null
}

/** Cotation brute 30 % (tolérance d'un cran), mesures clés 40 %, traitement 30 %. */
export function scoreRisk(s: RiskScenario, a: RiskAnswer): number {
  const axis = (v: number, e: number) => (v === e ? 1 : Math.abs(v - e) === 1 ? 0.6 : 0)
  const rating = (axis(a.gravity, s.expected.gravity) + axis(a.likelihood, s.expected.likelihood)) / 2
  const key = s.keyControls.filter((k) => a.controls.includes(k)).length / s.keyControls.length
  const treatment = a.treatment && s.expectedTreatment.includes(a.treatment) ? 1 : 0
  return Math.round(rating * 30 + key * 40 + treatment * 30)
}

export const GRADES: FindingGrade[] = ['Conforme', 'Observation', 'NC mineure', 'NC majeure']

export interface AuditAnswer {
  refs: string[]
  grade: FindingGrade | null
  rootCause: string | null
  capa: string | null
}

/** Référentiel violé 30 %, qualification 25 % (moitié si à un cran), cause racine 20 %, CAPA 25 %. */
export function scoreAudit(c: AuditCase, a: AuditAnswer): number {
  const refs = selectionScore(a.refs, c.references.map((r) => ({ id: r.id, positive: r.correct })))
  const gap = a.grade ? Math.abs(GRADES.indexOf(a.grade) - GRADES.indexOf(c.grade)) : 99
  const grade = gap === 0 ? 1 : gap === 1 ? 0.5 : 0
  const root = c.rootCauses.find((r) => r.id === a.rootCause)?.correct ? 1 : 0
  const capa = c.capas.find((x) => x.id === a.capa)?.correct ? 1 : 0
  return Math.round(refs * 30 + grade * 25 + root * 20 + capa * 25)
}
