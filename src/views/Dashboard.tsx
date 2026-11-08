import { ArrowRight, BookOpen, BriefcaseBusiness, Building2, ClipboardCheck, Clock, GitCompareArrows, Grid3x3, RotateCcw, Scale, SearchCheck, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, PageHeader, ProgressBar, ScoreBadge } from '../components/ui'
import { auditCases } from '../data/auditCases'
import { contractCases } from '../data/contractsRedline'
import { interviewQuestions } from '../data/interviewPrep'
import { modules } from '../data/modules'
import { riskScenarios } from '../data/riskScenarios'
import { tprmCases } from '../data/tprmCases'
import { computeXp, MAX_XP, RANKS, rankFor, useProgress } from '../lib/progress'

const avg = (values: number[]) => (values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : undefined)

const CLOCKS = [
  { reg: 'DORA', what: 'Incident TIC majeur : notification initiale', delay: '4 h', note: 'après classification (≤ 24 h après connaissance), puis 72 h et 1 mois', cls: 'text-amber' },
  { reg: 'NIS 2', what: 'Incident important : alerte précoce', delay: '24 h', note: 'puis notification 72 h, rapport final 1 mois (Art. 23)', cls: 'text-accent' },
  { reg: 'RGPD', what: 'Violation de données : notification CNIL', delay: '72 h', note: 'Art. 33 ; personnes concernées sans délai si risque élevé (Art. 34)', cls: 'text-violet-300' },
  { reg: 'LOPMI', what: 'Plainte pour indemnisation assurance', delay: '72 h', note: 'art. L12-10-1 du Code des assurances', cls: 'text-emerald' },
]

export function Dashboard() {
  const { progress, reset } = useProgress()
  const xp = computeXp(progress)
  const { rank, index, next } = rankFor(xp)
  const modulesDone = modules.filter((m) => (progress.coursesRead[m.id]?.length ?? 0) >= m.sections.length).length
  const quizAvg = avg(Object.values(progress.quizBest))
  const risksScored = riskScenarios.filter((s) => progress.risks[s.id]?.score !== undefined)
  const nextModule = modules.find((m) => (progress.coursesRead[m.id]?.length ?? 0) < m.sections.length || progress.quizBest[m.id] === undefined)

  const sims = [
    { to: '/contrats', icon: Scale, title: 'Contract & PAS Redliner', desc: 'Repérer les pièges et rédiger la contre-clause', done: Object.keys(progress.contracts).length, total: contractCases.length, score: avg(Object.values(progress.contracts)) },
    { to: '/tprm', icon: Building2, title: 'Vendor Risk Assessor', desc: 'Due diligence et verdict Go / No-Go', done: Object.keys(progress.tprm).length, total: tprmCases.length, score: avg(Object.values(progress.tprm)) },
    { to: '/risques', icon: Grid3x3, title: 'Risk Register & EBIOS Studio', desc: 'Matrice 5x5, résiduel et mémo COMEX', done: risksScored.length, total: riskScenarios.length, score: avg(risksScored.map((s) => progress.risks[s.id].score as number)) },
    { to: '/referentiels', icon: GitCompareArrows, title: 'Cross-Framework Mapper', desc: 'ISO ↔ NIST ↔ NIS 2 ↔ DORA ↔ RGPD, guide d’audit et DdA', done: Object.keys(progress.soa).length, total: 93, score: undefined },
    { to: '/audit', icon: SearchCheck, title: 'Simulateur d’audit ISO 19011', desc: 'Qualifier un constat, cause racine et CAPA', done: Object.keys(progress.audits).length, total: auditCases.length, score: avg(Object.values(progress.audits)) },
    { to: '/livrables?tab=entretiens', icon: BriefcaseBusiness, title: 'Livrables & entretiens senior', desc: '5 livrables exportables, 25 questions d’entretien', done: Object.values(progress.interviews).filter((m) => m === 'maitrise').length, total: interviewQuestions.length, score: undefined },
  ]

  return (
    <>
      <PageHeader eyebrow="Executive Dashboard" title="GRC & Cyber Compliance Academy">
        De l’analyste GRC junior au RSSI : gouvernance, ISO 27001, risques et quantification FAIR, NIS 2, DORA, RGPD, AI Act, gestion des tiers, SOC 2, SecNumCloud, PCI DSS, continuité, audit, contrats IT et sécurité des projets. Dix modules en trois paliers, cinq simulateurs et un hub carrière.
      </PageHeader>

      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy size={28} className="text-amber" aria-hidden />
            <div>
              <p className="text-xs tracking-wide text-mute uppercase">Rang actuel</p>
              <p className="text-xl font-bold text-strong">{rank.name}</p>
              <p className="font-mono text-xs text-mute">
                {xp} / {MAX_XP} XP{next ? ` · ${next.min - xp} XP avant ${next.name}` : ''}
              </p>
            </div>
          </div>
          {nextModule && (
            <Link to={`/modules/${nextModule.id}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400">
              Continuer : Module {nextModule.number} <ArrowRight size={15} />
            </Link>
          )}
        </div>
        <ol className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Parcours de carrière">
          {RANKS.map((r, i) => (
            <li key={r.name} className={`rounded-md border p-3 ${i === index ? 'border-accent bg-accent/10' : i < index ? 'border-emerald/50' : 'border-line opacity-70'}`}>
              <p className="font-mono text-[10px] text-mute">{r.min} XP</p>
              <p className={`text-sm font-semibold ${i <= index ? 'text-strong' : 'text-mute'}`}>{r.name}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {[
          { label: 'Modules lus', icon: BookOpen, value: `${modulesDone}/${modules.length}` },
          { label: 'Moyenne des quiz', icon: SearchCheck, value: quizAvg !== undefined ? `${quizAvg} %` : '-' },
          { label: 'Contrats revus', icon: Scale, value: `${Object.keys(progress.contracts).length}/${contractCases.length}` },
          { label: 'Tiers évalués', icon: Building2, value: `${Object.keys(progress.tprm).length}/${tprmCases.length}` },
          { label: 'Audits réalisés', icon: ClipboardCheck, value: `${Object.keys(progress.audits).length}/${auditCases.length}` },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-mute">
              <s.icon size={13} className="text-accent" aria-hidden /> {s.label}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-strong">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section>
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-strong">
            <BookOpen size={16} className="text-accent" aria-hidden /> Cursus
          </h2>
          <Card className="divide-y divide-line">
            {modules.map((m) => {
              const read = progress.coursesRead[m.id]?.length ?? 0
              return (
                <Link key={m.id} to={`/modules/${m.id}`} className="flex items-center gap-3 p-3 hover:bg-raised/50">
                  <span className="w-7 font-mono text-sm font-bold text-accent">{String(m.number).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 block text-sm leading-snug text-strong">{m.title}</span>
                    <span className="mt-1.5 block max-w-xs">
                      <ProgressBar value={read / m.sections.length} label={`Lecture du module ${m.number}`} />
                    </span>
                  </span>
                  <ScoreBadge score={progress.quizBest[m.id]} />
                </Link>
              )
            })}
          </Card>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="mb-3 font-semibold text-strong">Simulateurs</h2>
            <div className="space-y-2">
              {sims.map((s) => (
                <Link key={s.to} to={s.to} className="flex items-center gap-3 rounded-lg border border-line bg-card p-3 transition hover:border-accent">
                  <s.icon size={20} className="shrink-0 text-accent" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-strong">{s.title}</span>
                    <span className="block text-xs text-mute">{s.desc}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-mono text-xs text-mute">
                      {s.done}/{s.total}
                    </span>
                    {s.score !== undefined && <ScoreBadge score={s.score} />}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-strong">
              <Clock size={16} className="text-amber" aria-hidden /> Horloges réglementaires
            </h2>
            <Card className="divide-y divide-line">
              {CLOCKS.map((c) => (
                <div key={c.reg + c.what} className="flex items-center gap-3 p-3">
                  <span className={`w-16 shrink-0 font-mono text-xl font-bold ${c.cls}`}>{c.delay}</span>
                  <span className="min-w-0 text-sm">
                    <span className="font-semibold text-strong">{c.reg}</span> · {c.what}
                    <span className="block text-xs text-mute">{c.note}</span>
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </section>
      </div>

      <div className="mt-8 border-t border-line pt-4 text-right">
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Effacer toute la progression, le registre des risques et la DdA enregistrés dans ce navigateur ?')) reset()
          }}
          className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-red-300"
        >
          <RotateCcw size={13} aria-hidden /> Réinitialiser ma progression
        </button>
      </div>
    </>
  )
}
