import { ArrowLeft, ArrowRight, Building2, CheckCircle2, FileSearch, RotateCcw, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { btnGhost, btnPrimary, Card, PageHeader, Rich, ScoreBadge, Segmented, Tag } from '../components/ui'
import { tprmCases } from '../data/tprmCases'
import { useProgress } from '../lib/progress'
import { scoreTprm, TIERS, VERDICTS, type TprmAnswer } from '../lib/scoring'
import { shuffle } from '../lib/shuffle'
import type { TprmCase, Verdict } from '../types'

const VERDICT_CLS: Record<Verdict, string> = {
  Go: 'text-emerald',
  'Go avec plan de remédiation': 'text-amber',
  'No-Go': 'text-crimson',
}

export function TprmList() {
  const { progress } = useProgress()
  return (
    <>
      <PageHeader eyebrow="Simulateur 2" title="Vendor Risk Assessor">
        Cinq fournisseurs à évaluer avant contractualisation. Qualifiez leur criticité, inspectez leurs réponses et leurs preuves, relevez les signaux d’alerte, puis rendez votre verdict.
      </PageHeader>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {tprmCases.map((c) => (
          <li key={c.id}>
            <Link to={`/tprm/${c.id}`} className="flex h-full flex-col rounded-lg border border-line bg-card p-5 transition hover:border-accent">
              <div className="flex items-center justify-between gap-2">
                <Tag>{c.sector}</Tag>
                <ScoreBadge score={progress.tprm[c.id]} />
              </div>
              <h2 className="mt-2 flex items-center gap-2 font-semibold text-white">
                <Building2 size={16} className="text-accent" aria-hidden /> {c.vendor}
              </h2>
              <p className="mt-0.5 text-xs text-accent">{c.service}</p>
              <p className="mt-2 text-sm text-mute">{c.context}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export function TprmCaseView() {
  const { id } = useParams()
  const c = tprmCases.find((x) => x.id === id)
  if (!c) return <Navigate to="/tprm" replace />
  return <TprmExercise key={c.id} c={c} />
}

function TprmExercise({ c }: { c: TprmCase }) {
  const { progress, saveTprm } = useProgress()
  const [findings] = useState(() => shuffle(c.findings))
  const [answer, setAnswer] = useState<TprmAnswer>({ tier: null, findings: [], verdict: null })
  const [submitted, setSubmitted] = useState(false)
  const [doc, setDoc] = useState(0)
  const score = useMemo(() => scoreTprm(c, answer), [c, answer])
  const next = tprmCases[tprmCases.indexOf(c) + 1]

  const submit = () => {
    setSubmitted(true)
    saveTprm(c.id, score)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Link to="/tprm" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-white">
        <ArrowLeft size={14} aria-hidden /> Tous les fournisseurs
      </Link>
      <PageHeader eyebrow={`Due diligence · ${c.sector}`} title={c.vendor}>
        <span className="text-ink">{c.service}.</span> {c.context}
      </PageHeader>

      {submitted && (
        <Card className="mb-5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-wide text-mute uppercase">Score de l’évaluation</p>
              <p className={`text-3xl font-bold ${score >= 80 ? 'text-emerald' : score >= 50 ? 'text-amber' : 'text-crimson'}`}>{score} %</p>
              <p className="text-xs text-mute">Meilleur score : {progress.tprm[c.id] ?? score} %</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setAnswer({ tier: null, findings: [], verdict: null })
                  setSubmitted(false)
                }}
                className={btnGhost}
              >
                <RotateCcw size={15} /> Recommencer
              </button>
              {next && (
                <Link to={`/tprm/${next.id}`} className={btnPrimary}>
                  Fournisseur suivant <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-sm">
              <span className="text-mute">Verdict attendu : </span>
              <span className={`font-bold ${VERDICT_CLS[c.verdict]}`}>{c.verdict}</span>
              {answer.verdict && answer.verdict !== c.verdict && <span className="text-mute"> (vous : {answer.verdict})</span>}
            </p>
            <p className="mt-1 text-sm">{c.verdictWhy}</p>
            <p className="mt-4 text-xs font-semibold tracking-wide text-accent uppercase">Plan de remédiation / conditions</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm marker:text-accent">
              {c.remediation.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <p className="border-b border-line px-4 py-2 text-xs font-semibold tracking-wide text-mute uppercase">Réponses au questionnaire de sécurité</p>
            <dl className="divide-y divide-line">
              {c.questionnaire.map((q) => (
                <div key={q.q} className="grid grid-cols-1 gap-1 px-4 py-3 text-sm sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <dt className="text-xs font-semibold text-accent">{q.domain}</dt>
                  <dd>
                    <p className="text-mute">{q.q}</p>
                    <p className="mt-0.5 text-white">« {q.a} »</p>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="overflow-hidden">
            <p className="flex items-center gap-2 border-b border-line px-4 py-2 text-xs font-semibold tracking-wide text-mute uppercase">
              <FileSearch size={14} aria-hidden /> Preuves fournies ({c.evidence.length})
            </p>
            <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-line px-2">
              {c.evidence.map((e, i) => (
                <button
                  key={e.name}
                  type="button"
                  role="tab"
                  aria-selected={doc === i}
                  onClick={() => setDoc(i)}
                  className={`-mb-px shrink-0 border-b-2 px-2.5 py-2 font-mono text-xs ${doc === i ? 'border-accent text-white' : 'border-transparent text-mute hover:text-white'}`}
                >
                  {e.name}
                </button>
              ))}
            </div>
            <div className="p-4" role="tabpanel">
              <Tag>{c.evidence[doc].kind}</Tag>
              <p className="mt-2 rounded-md border border-line bg-bg p-3 font-mono text-[12.5px] leading-relaxed text-slate-200">
                <Rich text={c.evidence[doc].content} />
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-semibold text-white">1. Criticité du tiers</h2>
            <dl className="my-3 space-y-1.5 text-sm">
              <div>
                <dt className="inline text-mute">Accès au SI : </dt>
                <dd className="inline">{c.criticality.access}</dd>
              </div>
              <div>
                <dt className="inline text-mute">Données : </dt>
                <dd className="inline">{c.criticality.data}</dd>
              </div>
              <div>
                <dt className="inline text-mute">Criticité métier : </dt>
                <dd className="inline">{c.criticality.business}</dd>
              </div>
            </dl>
            <Segmented options={TIERS} value={answer.tier} onChange={(tier) => setAnswer((a) => ({ ...a, tier }))} label="Niveau de criticité" disabled={submitted} />
            {submitted && (
              <p className="mt-3 text-sm">
                {answer.tier === c.criticality.expected ? <CheckCircle2 size={15} className="mr-1 inline text-emerald" aria-label="Correct" /> : <XCircle size={15} className="mr-1 inline text-crimson" aria-label="Incorrect" />}
                <span className="font-semibold text-white">{c.criticality.expected}. </span>
                {c.criticality.why}
              </p>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="font-semibold text-white">2. Signaux d’alerte (red flags)</h2>
            <p className="mb-3 text-xs text-mute">Croisez réponses et preuves. Cochez les constats qui constituent un risque ; les points rassurants cochés à tort coûtent des points.</p>
            <ul className="space-y-2">
              {findings.map((f) => {
                const checked = answer.findings.includes(f.id)
                const right = checked === f.isRedFlag
                return (
                  <li key={f.id}>
                    <label className={`flex cursor-pointer items-start gap-2.5 rounded-md border p-3 text-sm ${submitted ? (right ? 'border-emerald/50' : 'border-crimson/60') : checked ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'}`}>
                      <input
                        type="checkbox"
                        disabled={submitted}
                        checked={checked}
                        onChange={() => setAnswer((a) => ({ ...a, findings: a.findings.includes(f.id) ? a.findings.filter((x) => x !== f.id) : [...a.findings, f.id] }))}
                        className="mt-0.5 size-4 shrink-0 accent-blue-500"
                      />
                      <span>
                        <span className="text-white">{f.label}</span>
                        {submitted && (
                          <span className="mt-1 block text-xs text-mute">
                            <span className={f.isRedFlag ? 'font-semibold text-red-300' : 'font-semibold text-emerald'}>{f.isRedFlag ? 'Red flag. ' : 'Point non bloquant. '}</span>
                            {f.why}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-white">3. Verdict</h2>
            <Segmented
              options={VERDICTS}
              value={answer.verdict}
              onChange={(verdict) => setAnswer((a) => ({ ...a, verdict }))}
              label="Verdict"
              disabled={submitted}
              render={(v) => <span className={VERDICT_CLS[v]}>{v}</span>}
            />
          </Card>

          {!submitted && (
            <div className="text-right">
              <button type="button" disabled={!answer.tier || !answer.verdict} onClick={submit} className={btnPrimary}>
                Rendre l’avis sécurité
              </button>
              {(!answer.tier || !answer.verdict) && <p className="mt-1 text-xs text-mute">Choisissez une criticité et un verdict.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
