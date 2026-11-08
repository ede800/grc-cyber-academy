import { auditCases } from '../data/auditCases'
import { contractCases } from '../data/contractsRedline'
import { deliverables } from '../data/deliverables'
import { frameworkMapping } from '../data/frameworkMapping'
import { interviewQuestions } from '../data/interviewPrep'
import { isoControls } from '../data/isoControls'
import { modules } from '../data/modules'
import { riskScenarios } from '../data/riskScenarios'
import { tprmCases } from '../data/tprmCases'

export type HitKind = 'ISO 27002' | 'Crosswalk' | 'Cours' | 'Contrat' | 'Tiers' | 'Risque' | 'Audit' | 'Entretien' | 'Livrable'

export interface SearchHit {
  key: string
  kind: HitKind
  label: string
  title: string
  detail?: string
  refs?: { name: string; values: string[] }[]
  to: string
  haystack: string
  exact: string
}

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

function make(h: Omit<SearchHit, 'haystack' | 'exact'> & { extra?: string }): SearchHit {
  const { extra = '', ...rest } = h
  const refs = h.refs?.flatMap((r) => r.values).join(' ') ?? ''
  return { ...rest, haystack: norm([h.label, h.title, h.detail, refs, extra].filter(Boolean).join(' ')), exact: norm(h.label) }
}

/** Toutes les chaînes d'un contenu imbriqué : un cours se trouve aussi par ce qu'il contient. */
function allText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(allText).join(' ')
  if (typeof value === 'object' && value !== null) return allText(Object.values(value))
  return ''
}

export const searchIndex: SearchHit[] = [
  ...frameworkMapping.map((m) =>
    make({
      key: `map-${m.id}`,
      kind: 'Crosswalk',
      label: m.theme,
      title: m.category,
      detail: m.summary,
      refs: [
        { name: 'ISO 27001/27002', values: m.iso },
        { name: 'NIST CSF 2.0', values: m.nist },
        { name: 'NIS 2', values: m.nis2 },
        { name: 'DORA', values: m.dora },
        { name: 'RGPD', values: m.rgpd },
      ],
      to: `/referentiels?theme=${m.id}`,
    }),
  ),
  ...isoControls.map((c) =>
    make({
      key: `iso-${c.id}`,
      kind: 'ISO 27002',
      label: c.id,
      title: `${c.title}${c.isNew ? ' · nouveau 2022' : ''}`,
      detail: `${c.purpose}. Preuves : ${c.evidence}.`,
      to: `/referentiels?tab=iso&c=${encodeURIComponent(c.id)}`,
      extra: allText([c.theme, c.auditQuestions, c.expectedEvidence, c.commonPitfalls]),
    }),
  ),
  ...modules.flatMap((m) =>
    m.sections.map((s) =>
      make({
        key: `mod-${m.id}-${s.id}`,
        kind: 'Cours',
        label: `M${m.number} · ${s.title}`,
        title: m.title,
        detail: m.summary,
        to: `/modules/${m.id}?s=${s.id}`,
        extra: allText(s.blocks),
      }),
    ),
  ),
  ...contractCases.map((c) =>
    make({ key: `ct-${c.id}`, kind: 'Contrat', label: c.title, title: c.contractType, detail: c.context, to: `/contrats/${c.id}`, extra: allText([c.issues, c.legalBasis]) }),
  ),
  ...tprmCases.map((c) => make({ key: `tp-${c.id}`, kind: 'Tiers', label: c.vendor, title: c.service, detail: c.context, to: `/tprm/${c.id}`, extra: allText(c.findings) })),
  ...riskScenarios.map((r) => make({ key: `rk-${r.id}`, kind: 'Risque', label: r.title, title: r.businessAsset, detail: r.context, to: `/risques/${r.id}`, extra: `${r.threat} ${r.vulnerability}` })),
  make({ key: 'fair', kind: 'Risque', label: 'Calculateur FAIR / ROSI', title: 'Quantification financière du risque', detail: 'SLE × ARO = ALE, puis rendement (ROSI) d’une mesure de sécurité.', to: '/risques?tab=fair', extra: 'fair sle aro ale rosi quantification euros monte-carlo pert' }),
  ...auditCases.map((c) =>
    make({ key: `au-${c.id}`, kind: 'Audit', label: c.title, title: c.scope, detail: c.context, to: `/audit/${c.id}`, extra: allText([c.references, c.findingText, c.grade]) }),
  ),
  ...interviewQuestions.map((q) =>
    make({ key: `iv-${q.id}`, kind: 'Entretien', label: q.question, title: `${q.level} · ${q.context}`, detail: q.tests, to: '/livrables?tab=entretiens', extra: q.senior }),
  ),
  ...deliverables.map((d) => make({ key: `dl-${d.id}`, kind: 'Livrable', label: d.title, title: d.audience, detail: d.usage, to: `/livrables?d=${d.id}`, extra: d.id === 'dda' ? 'declaration applicabilite soa' : d.markdown })),
]

const KIND_WEIGHT: Record<HitKind, number> = { Crosswalk: 6, 'ISO 27002': 4, Cours: 2, Contrat: 1, Tiers: 1, Risque: 1, Audit: 1, Livrable: 1, Entretien: 0 }

/** Tous les termes doivent être présents ; un identifiant exact passe devant le reste, puis les titres. */
export function search(query: string, limit = 40): SearchHit[] {
  const q = norm(query.trim())
  if (!q) return []
  const terms = q.split(/\s+/)
  const scored: { hit: SearchHit; score: number }[] = []
  for (const hit of searchIndex) {
    if (!terms.every((t) => hit.haystack.includes(t))) continue
    let score = KIND_WEIGHT[hit.kind]
    if (hit.exact === q) score += 100
    else if (hit.exact.startsWith(q)) score += 50
    else if (hit.exact.includes(q)) score += 30
    if (norm(hit.title).includes(q)) score += 10
    scored.push({ hit, score })
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.hit)
}
