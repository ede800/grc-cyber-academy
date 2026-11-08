import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { auditCases } from '../data/auditCases'
import { contractCases } from '../data/contractsRedline'
import { modules } from '../data/modules'
import { riskScenarios } from '../data/riskScenarios'
import { tprmCases } from '../data/tprmCases'
import type { Treatment } from '../types'

const KEY = 'grc-academy.progress.v1'

/** Évaluation d'un risque dans le registre : saisie de l'utilisateur, conservée pour le mémo. */
export interface RiskEntry {
  gravity: number
  likelihood: number
  controls: string[]
  treatment: Treatment | null
  owner: string
  score?: number
}

export interface CustomRisk {
  id: string
  title: string
  businessAsset: string
  entry: RiskEntry
}

export interface SoaEntry {
  applicable: boolean
  status: 'Mise en œuvre' | 'Partielle' | 'Planifiée' | 'Exclue'
  justification: string
}

export interface Progress {
  coursesRead: Record<string, string[]>
  quizBest: Record<string, number>
  contracts: Record<string, number>
  tprm: Record<string, number>
  risks: Record<string, RiskEntry>
  customRisks: CustomRisk[]
  soa: Record<string, SoaEntry>
  /** Meilleur score par cas du simulateur d'audit ISO 19011. */
  audits: Record<string, number>
  /** Auto-évaluation des questions d'entretien. */
  interviews: Record<string, InterviewMark>
}

export type InterviewMark = 'maitrise' | 'a-revoir'

const EMPTY: Progress = { coursesRead: {}, quizBest: {}, contracts: {}, tprm: {}, risks: {}, customRisks: [], soa: {}, audits: {}, interviews: {} }

export const XP_RULES = { course: 50, quiz: 100, contract: 120, tprm: 150, risk: 100, audit: 130 }

/** Seuils fixés à environ 27 %, 55 % et 83 % de l'XP totale. */
export const RANKS = [
  { name: 'Analyste GRC Junior', min: 0 },
  { name: 'Consultant GRC Senior', min: 1400 },
  { name: 'Risk & Compliance Manager', min: 2900 },
  { name: 'RSSI / CISO', min: 4300 },
]

export const MAX_XP =
  modules.length * (XP_RULES.course + XP_RULES.quiz) +
  contractCases.length * XP_RULES.contract +
  tprmCases.length * XP_RULES.tprm +
  riskScenarios.length * XP_RULES.risk +
  auditCases.length * XP_RULES.audit

/** L'XP est dérivée de l'état : refaire un exercice n'augmente que le meilleur score. */
export function computeXp(p: Progress): number {
  let xp = 0
  for (const m of modules) {
    if ((p.coursesRead[m.id]?.length ?? 0) >= m.sections.length) xp += XP_RULES.course
  }
  for (const s of Object.values(p.quizBest)) xp += Math.round((s / 100) * XP_RULES.quiz)
  for (const s of Object.values(p.contracts)) xp += Math.round((s / 100) * XP_RULES.contract)
  for (const s of Object.values(p.tprm)) xp += Math.round((s / 100) * XP_RULES.tprm)
  for (const e of Object.values(p.risks)) if (e.score !== undefined) xp += Math.round((e.score / 100) * XP_RULES.risk)
  for (const s of Object.values(p.audits)) xp += Math.round((s / 100) * XP_RULES.audit)
  return xp
}

export function rankFor(xp: number) {
  let index = 0
  RANKS.forEach((r, i) => {
    if (xp >= r.min) index = i
  })
  const next = RANKS[index + 1]
  const ratio = next ? (xp - RANKS[index].min) / (next.min - RANKS[index].min) : 1
  return { rank: RANKS[index], index, next, ratio: Math.min(1, ratio) }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const num = (v: unknown, min: number, max: number, fallback: number) => (typeof v === 'number' && v >= min && v <= max ? v : fallback)
const str = (v: unknown) => (typeof v === 'string' ? v : '')
const strList = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [])
const TREATMENTS: Treatment[] = ['Réduire', 'Accepter', 'Transférer', 'Éviter']
const STATUSES: SoaEntry['status'][] = ['Mise en œuvre', 'Partielle', 'Planifiée', 'Exclue']

function scoreMap(v: unknown): Record<string, number> {
  if (!isRecord(v)) return {}
  return Object.fromEntries(Object.entries(v).filter((e): e is [string, number] => typeof e[1] === 'number' && e[1] >= 0 && e[1] <= 100))
}

function riskEntry(v: unknown): RiskEntry {
  const o = isRecord(v) ? v : {}
  const t = TREATMENTS.find((x) => x === o.treatment) ?? null
  const score = typeof o.score === 'number' && o.score >= 0 && o.score <= 100 ? o.score : undefined
  return { gravity: num(o.gravity, 1, 5, 3), likelihood: num(o.likelihood, 1, 5, 3), controls: strList(o.controls), treatment: t, owner: str(o.owner), ...(score !== undefined ? { score } : {}) }
}

/** Une sauvegarde abîmée ou modifiée à la main ne doit jamais empêcher le site de démarrer. */
export function sanitizeProgress(raw: unknown): Progress {
  const o = isRecord(raw) ? raw : {}
  const coursesRead = isRecord(o.coursesRead) ? Object.fromEntries(Object.entries(o.coursesRead).map(([k, l]) => [k, strList(l)])) : {}
  const risks = isRecord(o.risks) ? Object.fromEntries(Object.entries(o.risks).map(([k, e]) => [k, riskEntry(e)])) : {}
  const customRisks = Array.isArray(o.customRisks)
    ? o.customRisks.filter(isRecord).map((c) => ({ id: str(c.id) || `custom-${Math.random().toString(36).slice(2)}`, title: str(c.title), businessAsset: str(c.businessAsset), entry: riskEntry(c.entry) }))
    : []
  const soa = isRecord(o.soa)
    ? Object.fromEntries(
        Object.entries(o.soa)
          .filter((e): e is [string, Record<string, unknown>] => isRecord(e[1]))
          .map(([k, e]) => [k, { applicable: e.applicable !== false, status: STATUSES.find((s) => s === e.status) ?? 'Mise en œuvre', justification: str(e.justification) }]),
      )
    : {}
  const interviews = isRecord(o.interviews)
    ? Object.fromEntries(Object.entries(o.interviews).filter((e): e is [string, InterviewMark] => e[1] === 'maitrise' || e[1] === 'a-revoir'))
    : {}
  return { coursesRead, quizBest: scoreMap(o.quizBest), contracts: scoreMap(o.contracts), tprm: scoreMap(o.tprm), risks, customRisks, soa, audits: scoreMap(o.audits), interviews }
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? sanitizeProgress(JSON.parse(raw)) : EMPTY
  } catch {
    return EMPTY
  }
}

interface Ctx {
  progress: Progress
  toggleSection: (moduleId: string, sectionId: string) => void
  saveQuiz: (moduleId: string, score: number) => void
  saveContract: (id: string, score: number) => void
  saveTprm: (id: string, score: number) => void
  saveRisk: (id: string, entry: RiskEntry) => void
  saveCustomRisks: (list: CustomRisk[]) => void
  saveSoa: (controlId: string, entry: SoaEntry | null) => void
  saveAudit: (id: string, score: number) => void
  markInterview: (id: string, mark: InterviewMark | null) => void
  reset: () => void
}

const ProgressContext = createContext<Ctx | null>(null)

function toggle(list: string[] | undefined, value: string) {
  const l = list ?? []
  return l.includes(value) ? l.filter((v) => v !== value) : [...l, value]
}

const best = (map: Record<string, number>, id: string, score: number) => ({ ...map, [id]: Math.max(score, map[id] ?? 0) })

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress))
    } catch {
      // Stockage indisponible (navigation privée) : la progression reste en mémoire.
    }
  }, [progress])

  // Sans cela, deux onglets ouverts s'écrasent mutuellement leur progression.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === null) setProgress(load())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleSection = useCallback((m: string, s: string) => setProgress((p) => ({ ...p, coursesRead: { ...p.coursesRead, [m]: toggle(p.coursesRead[m], s) } })), [])
  const saveQuiz = useCallback((m: string, score: number) => setProgress((p) => ({ ...p, quizBest: best(p.quizBest, m, score) })), [])
  const saveContract = useCallback((id: string, score: number) => setProgress((p) => ({ ...p, contracts: best(p.contracts, id, score) })), [])
  const saveTprm = useCallback((id: string, score: number) => setProgress((p) => ({ ...p, tprm: best(p.tprm, id, score) })), [])
  const saveRisk = useCallback(
    (id: string, entry: RiskEntry) =>
      setProgress((p) => {
        const prev = p.risks[id]?.score
        const score = entry.score === undefined ? prev : Math.max(entry.score, prev ?? 0)
        return { ...p, risks: { ...p.risks, [id]: { ...entry, ...(score !== undefined ? { score } : {}) } } }
      }),
    [],
  )
  const saveCustomRisks = useCallback((list: CustomRisk[]) => setProgress((p) => ({ ...p, customRisks: list })), [])
  const saveSoa = useCallback(
    (id: string, entry: SoaEntry | null) =>
      setProgress((p) => {
        const soa = { ...p.soa }
        if (entry) soa[id] = entry
        else delete soa[id]
        return { ...p, soa }
      }),
    [],
  )
  const saveAudit = useCallback((id: string, score: number) => setProgress((p) => ({ ...p, audits: best(p.audits, id, score) })), [])
  const markInterview = useCallback(
    (id: string, mark: InterviewMark | null) =>
      setProgress((p) => {
        const interviews = { ...p.interviews }
        if (mark) interviews[id] = mark
        else delete interviews[id]
        return { ...p, interviews }
      }),
    [],
  )
  const reset = useCallback(() => setProgress(EMPTY), [])

  const value = useMemo(
    () => ({ progress, toggleSection, saveQuiz, saveContract, saveTprm, saveRisk, saveCustomRisks, saveSoa, saveAudit, markInterview, reset }),
    [progress, toggleSection, saveQuiz, saveContract, saveTprm, saveRisk, saveCustomRisks, saveSoa, saveAudit, markInterview, reset],
  )
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress doit être utilisé dans ProgressProvider')
  return ctx
}
