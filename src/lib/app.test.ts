import { describe, expect, it } from 'vitest'
import { contractCases } from '../data/contractsRedline'
import { frameworkMapping } from '../data/frameworkMapping'
import { isoControls } from '../data/isoControls'
import { modules } from '../data/modules'
import { riskControls, riskScenarios } from '../data/riskScenarios'
import { tprmCases } from '../data/tprmCases'
import { sanitizeProgress } from './progress'
import { levelOf, residual, scoreContract, scoreRisk, scoreTprm } from './scoring'
import { search } from './search'

describe('Annexe A ISO 27001:2022', () => {
  it('compte 93 mesures réparties 37 / 8 / 14 / 34, dont 11 nouvelles', () => {
    expect(isoControls).toHaveLength(93)
    const by = (t: string) => isoControls.filter((c) => c.theme === t).length
    expect([by('Organisationnelles'), by('Personnes'), by('Physiques'), by('Technologiques')]).toEqual([37, 8, 14, 34])
    expect(isoControls.filter((c) => c.isNew).map((c) => c.id)).toEqual(['A.5.7', 'A.5.23', 'A.5.30', 'A.7.4', 'A.8.9', 'A.8.10', 'A.8.11', 'A.8.12', 'A.8.16', 'A.8.23', 'A.8.28'])
    expect(new Set(isoControls.map((c) => c.id)).size).toBe(93)
  })
})

describe('Intégrité du contenu', () => {
  it('8 modules complets avec quiz valides', () => {
    expect(modules).toHaveLength(8)
    for (const m of modules) {
      expect(m.sections.length).toBeGreaterThan(2)
      expect(m.templates.length).toBeGreaterThan(0)
      expect(new Set(m.sections.map((s) => s.id)).size).toBe(m.sections.length)
      for (const q of m.quiz) expect(q.answer).toBeLessThan(q.options.length)
    }
  })

  it('chaque contrat a des pièges présents dans l’extrait et une seule bonne contre-clause', () => {
    for (const c of contractCases) {
      const traps = c.issues.filter((i) => i.isTrap).map((i) => i.id)
      expect(traps.length).toBeGreaterThan(0)
      for (const t of traps) expect(c.excerpt.some((s) => s.trap === t)).toBe(true)
      for (const s of c.excerpt) if (s.trap) expect(traps).toContain(s.trap)
      expect(c.counters.filter((x) => x.correct)).toHaveLength(1)
    }
  })

  it('chaque cas TPRM et scénario de risque est cohérent', () => {
    expect(tprmCases).toHaveLength(5)
    for (const c of tprmCases) expect(c.evidence.length).toBeGreaterThan(0)
    const ids = riskControls.map((c) => c.id)
    for (const s of riskScenarios) for (const k of s.keyControls) expect(ids).toContain(k)
  })

  it('chaque thème du crosswalk renseigne les 5 référentiels', () => {
    for (const m of frameworkMapping) for (const f of [m.iso, m.nist, m.nis2, m.dora, m.rgpd]) expect(f.length).toBeGreaterThan(0)
  })
})

describe('Notation', () => {
  it('une réponse parfaite vaut 100 et cocher tous les items ne suffit pas', () => {
    const c = contractCases[0]
    const good = c.counters.find((x) => x.correct)!.id
    const traps = c.issues.filter((i) => i.isTrap).map((i) => i.id)
    expect(scoreContract(c, { traps, level: c.riskLevel, counter: good })).toBe(100)
    expect(scoreContract(c, { traps: c.issues.map((i) => i.id), level: c.riskLevel, counter: good })).toBeLessThan(100)
    const t = tprmCases[0]
    expect(scoreTprm(t, { tier: t.criticality.expected, findings: t.findings.filter((f) => f.isRedFlag).map((f) => f.id), verdict: t.verdict })).toBe(100)
  })

  it('résiduel borné à 1 et niveaux de la matrice 5x5', () => {
    expect(residual(5, 5, riskControls.map((c) => c.id))).toEqual({ gravity: 1, likelihood: 1 })
    expect([levelOf(4), levelOf(5), levelOf(10), levelOf(15)]).toEqual(['Faible', 'Modéré', 'Élevé', 'Critique'])
    const s = riskScenarios[0]
    expect(scoreRisk(s, { gravity: s.expected.gravity, likelihood: s.expected.likelihood, controls: s.keyControls, treatment: s.expectedTreatment[0] })).toBe(100)
  })

  it('une sauvegarde corrompue ne casse pas le démarrage', () => {
    expect(sanitizeProgress('nimporte quoi').quizBest).toEqual({})
    expect(sanitizeProgress({ quizBest: { a: 500, b: 80 }, risks: { x: { gravity: 9 } } })).toMatchObject({ quizBest: { b: 80 }, risks: { x: { gravity: 3 } } })
  })
})

describe('Recherche Ctrl+K', () => {
  it('trouve un thème, une mesure et ignore les accents', () => {
    expect(search('vulnerabilites')[0].kind).toBe('Crosswalk')
    expect(search('A.5.23')[0].label).toBe('A.5.23')
    expect(search('sauvegardes').some((h) => h.key === 'map-continuite')).toBe(true)
  })
})
