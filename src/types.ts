export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'doc'; title: string; content: string }
  | { type: 'callout'; tone: 'info' | 'warn' | 'danger' | 'tip'; title: string; text: string }
  | { type: 'links'; items: { to: string; label: string }[] }

export interface QuizQuestion {
  q: string
  /** Mise en situation d'audit : transforme la question en cas pratique. */
  case?: string
  options: string[]
  answer: number
  explain: string
}

export interface CourseSection {
  id: string
  title: string
  blocks: Block[]
}

export interface Module {
  id: string
  number: number
  pillar: string
  title: string
  summary: string
  objectives: string[]
  sections: CourseSection[]
  templates: Block[]
  quiz: QuizQuestion[]
}

export type RiskLevel = 'Critique' | 'Élevé' | 'Modéré' | 'Faible'

/** Simulateur de redlining : un extrait de contrat fournisseur. */
export interface ContractCase {
  id: string
  title: string
  contractType: string
  vendor: string
  context: string
  /** Extrait découpé en segments ; un segment piégé porte l'identifiant du piège. */
  excerpt: { text: string; trap?: string }[]
  issues: { id: string; label: string; isTrap: boolean; why: string }[]
  riskLevel: RiskLevel
  riskWhy: string
  counters: { id: string; label: string; text: string; correct: boolean; feedback: string }[]
  protectiveClause: string
  legalBasis: string[]
  negotiationTip: string
}

export type Verdict = 'Go' | 'Go avec plan de remédiation' | 'No-Go'

export interface TprmCase {
  id: string
  vendor: string
  service: string
  sector: string
  context: string
  criticality: { access: string; data: string; business: string; expected: 'Tier 1 - Critique' | 'Tier 2 - Élevé' | 'Tier 3 - Standard'; why: string }
  questionnaire: { domain: string; q: string; a: string }[]
  evidence: { name: string; kind: string; content: string }[]
  findings: { id: string; label: string; isRedFlag: boolean; why: string }[]
  verdict: Verdict
  verdictWhy: string
  remediation: string[]
}

export interface RiskScenario {
  id: string
  title: string
  businessAsset: string
  supportAssets: string
  threat: string
  vulnerability: string
  context: string
  dicp: string
  expected: { gravity: number; likelihood: number }
  keyControls: string[]
  expectedTreatment: Treatment[]
  debrief: string
}

export type Treatment = 'Réduire' | 'Accepter' | 'Transférer' | 'Éviter'

export interface RiskControl {
  id: string
  label: string
  ref: string
  /** Réduction appliquée sur la vraisemblance (V) ou la gravité (G). */
  effect: { likelihood: number; gravity: number }
}

export interface MappingRow {
  id: string
  theme: string
  category: string
  summary: string
  iso: string[]
  nist: string[]
  nis2: string[]
  dora: string[]
  rgpd: string[]
  auditTip: string
}

export interface IsoControl {
  id: string
  title: string
  theme: 'Organisationnelles' | 'Personnes' | 'Physiques' | 'Technologiques'
  isNew?: boolean
  purpose: string
  evidence: string
}
