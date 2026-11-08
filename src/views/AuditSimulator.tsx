import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileSearch, MessagesSquare, RotateCcw, Search, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { btnGhost, btnPrimary, Card, CopyButton, ListSummary, PageHeader, Segmented, StatusBadge, Tag } from '../components/ui'
import { auditCases } from '../data/auditCases'
import { useProgress } from '../lib/progress'
import { GRADES, scoreAudit } from '../lib/scoring'
import { shuffle } from '../lib/shuffle'
import type { AuditCase, FindingGrade } from '../types'

const GRADE_CLS: Record<FindingGrade, string> = {
  Conforme: 'border-emerald/60 bg-emerald/15 text-emerald-300',
  Observation: 'border-accent/60 bg-accent/15 text-blue-300',
  'NC mineure': 'border-amber/60 bg-amber/15 text-amber-300',
  'NC majeure': 'border-crimson/60 bg-crimson/15 text-red-300',
}

function GradeBadge({ grade }: { grade: FindingGrade }) {
  return <span className={`inline-block rounded border px-1.5 py-0.5 text-xs font-semibold ${GRADE_CLS[grade]}`}>{grade}</span>
}

export function AuditList() {
  const { progress } = useProgress()
  const done = auditCases.filter((c) => progress.audits[c.id] !== undefined)
  const next = auditCases.find((c) => progress.audits[c.id] === undefined)
  return (
    <>
      <PageHeader eyebrow="Simulateur 5 · ISO 19011" title="Simulateur d’audit">
        Huit situations de terrain : entretiens et preuves remises par l’audité. Identifiez l’exigence en cause, qualifiez le constat (conforme, observation, NC mineure ou majeure), trouvez la cause racine avec les 5 Pourquoi et choisissez le plan d’actions correctives (CAPA).
      </PageHeader>
      <ListSummary unit="situations auditées" done={done.length} total={auditCases.length} scores={done.map((c) => progress.audits[c.id])} next={next && { to: `/audit/${next.id}`, label: next.title }} />
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {auditCases.map((c, i) => (
          <li key={c.id}>
            <Link to={`/audit/${c.id}`} className="flex h-full flex-col rounded-lg border border-line bg-card p-5 transition hover:border-accent">
              <div className="flex items-center justify-between gap-2">
                <Tag>Situation {String(i + 1).padStart(2, '0')}</Tag>
                <StatusBadge score={progress.audits[c.id]} />
              </div>
              <h2 className="mt-2 font-semibold text-strong">{c.title}</h2>
              <p className="mt-0.5 text-xs text-accent">{c.scope}</p>
              <p className="mt-2 text-sm text-mute">{c.auditee}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export function AuditCaseView() {
  const { id } = useParams()
  const c = auditCases.find((x) => x.id === id)
  if (!c) return <Navigate to="/audit" replace />
  return <AuditExercise key={c.id} c={c} />
}

/** Choix unique sous forme de cartes, avec correction après soumission. */
function Choices<T extends { id: string; label: string; correct: boolean }>({
  items,
  value,
  onChange,
  submitted,
  label,
  detail,
}: {
  items: T[]
  value: string | null
  onChange: (id: string) => void
  submitted: boolean
  label: string
  detail: (item: T) => string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="space-y-2">
      {items.map((o) => {
        const selected = value === o.id
        let cls = selected ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'
        if (submitted) cls = o.correct ? 'border-emerald bg-emerald/10' : selected ? 'border-crimson bg-crimson/10' : 'border-line opacity-60'
        return (
          <button key={o.id} type="button" role="radio" aria-checked={selected} disabled={submitted} onClick={() => onChange(o.id)} className={`flex w-full items-start gap-2 rounded-md border p-3 text-left text-sm ${cls}`}>
            {submitted && o.correct && <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald" aria-label="Bonne réponse" />}
            {submitted && selected && !o.correct && <XCircle size={16} className="mt-0.5 shrink-0 text-crimson" aria-label="Votre choix, incorrect" />}
            <span>
              <span className="text-strong">{o.label}</span>
              {submitted && (selected || o.correct) && <span className="mt-1 block text-xs text-mute">{detail(o)}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function AuditExercise({ c }: { c: AuditCase }) {
  const { progress, saveAudit } = useProgress()
  const [refsOrder] = useState(() => shuffle(c.references))
  const [rootOrder, setRootOrder] = useState(() => shuffle(c.rootCauses))
  const [capaOrder, setCapaOrder] = useState(() => shuffle(c.capas))
  const [refs, setRefs] = useState<string[]>([])
  const [grade, setGrade] = useState<FindingGrade | null>(null)
  const [rootCause, setRootCause] = useState<string | null>(null)
  const [capa, setCapa] = useState<string | null>(null)
  const [doc, setDoc] = useState(0)
  const [showWhys, setShowWhys] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const score = useMemo(() => scoreAudit(c, { refs, grade, rootCause, capa }), [c, refs, grade, rootCause, capa])
  const next = auditCases[auditCases.indexOf(c) + 1]
  const ready = refs.length > 0 && grade && rootCause && capa

  const submit = () => {
    setSubmitted(true)
    saveAudit(c.id, score)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const restart = () => {
    setRootOrder(shuffle(c.rootCauses))
    setCapaOrder(shuffle(c.capas))
    setRefs([])
    setGrade(null)
    setRootCause(null)
    setCapa(null)
    setShowWhys(false)
    setSubmitted(false)
  }

  return (
    <>
      <Link to="/audit" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-strong">
        <ArrowLeft size={14} aria-hidden /> Toutes les situations
      </Link>
      <PageHeader eyebrow={`Audit · ${c.scope}`} title={c.title}>
        <span className="text-ink">{c.auditee}.</span> {c.context}
      </PageHeader>

      {submitted && (
        <Card className="mb-5 flex flex-wrap items-center justify-between gap-4 p-4">
          <div>
            <p className="text-xs tracking-wide text-mute uppercase">Score de l’audit</p>
            <p className={`text-3xl font-bold ${score >= 80 ? 'text-emerald' : score >= 50 ? 'text-amber' : 'text-crimson'}`}>{score} %</p>
            <p className="text-xs text-mute">Meilleur score : {progress.audits[c.id] ?? score} %</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={restart} className={btnGhost}>
              <RotateCcw size={15} /> Recommencer
            </button>
            {next && (
              <Link to={`/audit/${next.id}`} className={btnPrimary}>
                Situation suivante <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card className="p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
              <MessagesSquare size={14} aria-hidden /> Entretiens
            </p>
            <ul className="space-y-3">
              {c.interview.map((line, i) => (
                <li key={i} className={`rounded-md border p-3 text-sm ${line.who.startsWith('Auditeur') ? 'border-accent/40 bg-accent/5' : 'border-line bg-bg'}`}>
                  <span className="mb-1 block text-xs font-semibold text-mute">{line.who}</span>« {line.text} »
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-amber uppercase">
              <FileSearch size={14} aria-hidden /> Preuves remises
            </p>
            <div role="tablist" className="mb-3 flex flex-wrap gap-1.5">
              {c.evidence.map((e, i) => (
                <button key={e.name} type="button" role="tab" aria-selected={doc === i} onClick={() => setDoc(i)} className={`rounded-md border px-2.5 py-1 text-xs ${doc === i ? 'border-amber bg-amber/10 text-strong' : 'border-line text-mute hover:text-strong'}`}>
                  {e.name}
                </button>
              ))}
            </div>
            <p className="mb-1 text-[11px] tracking-wide text-mute uppercase">{c.evidence[doc].kind}</p>
            <pre tabIndex={0} className="overflow-x-auto rounded-md border border-line bg-code p-3 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-ink">
              {c.evidence[doc].content}
            </pre>
          </Card>

          {submitted && (
            <Card className="border-emerald/50 p-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald uppercase">
                  <ClipboardList size={14} aria-hidden /> Constat rédigé par un Lead Auditor
                </p>
                <CopyButton text={c.findingText} label="Copier" />
              </div>
              <p className="text-sm">{c.findingText}</p>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-semibold text-strong">1. Exigence(s) en cause</h2>
            <p className="mb-3 text-xs text-mute">Cochez la ou les références pertinentes : les mauvaises références coûtent des points.</p>
            <ul className="space-y-2">
              {refsOrder.map((r) => {
                const checked = refs.includes(r.id)
                const right = checked === r.correct
                return (
                  <li key={r.id}>
                    <label className={`flex cursor-pointer items-start gap-2.5 rounded-md border p-3 text-sm ${submitted ? (right ? 'border-emerald/50' : 'border-crimson/60') : checked ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'}`}>
                      <input type="checkbox" disabled={submitted} checked={checked} onChange={() => setRefs((l) => (l.includes(r.id) ? l.filter((x) => x !== r.id) : [...l, r.id]))} className="mt-0.5 size-4 shrink-0 accent-blue-500" />
                      <span>
                        <span className="text-strong">{r.label}</span>
                        {submitted && (
                          <span className="mt-1 block text-xs text-mute">
                            <span className={r.correct ? 'font-semibold text-emerald' : 'font-semibold text-red-300'}>{r.correct ? 'Pertinent. ' : 'Non pertinent. '}</span>
                            {r.why}
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
            <h2 className="mb-3 font-semibold text-strong">2. Qualification du constat</h2>
            <Segmented options={GRADES} value={grade} onChange={setGrade} label="Qualification" disabled={submitted} render={(g) => <GradeBadge grade={g} />} />
            {submitted && (
              <p className="mt-3 text-sm">
                <span className="mr-2 text-mute">Attendu :</span>
                <GradeBadge grade={c.grade} /> <span className="ml-1">{c.gradeWhy}</span>
              </p>
            )}
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-strong">3. Cause racine (5 Pourquoi)</h2>
              <button type="button" onClick={() => setShowWhys((s) => !s)} className="inline-flex items-center gap-1 text-xs text-accent hover:text-strong">
                <Search size={12} aria-hidden /> {showWhys ? 'Masquer' : 'Dérouler'} les 5 Pourquoi
              </button>
            </div>
            {(showWhys || submitted) && (
              <ol className="mb-3 list-decimal space-y-1 rounded-md border border-line bg-bg p-3 pl-8 text-xs text-mute">
                {c.whys.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ol>
            )}
            <Choices items={rootOrder} value={rootCause} onChange={setRootCause} submitted={submitted} label="Cause racine" detail={(r) => r.why} />
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-strong">4. Plan d’actions correctives (CAPA)</h2>
            <Choices items={capaOrder} value={capa} onChange={setCapa} submitted={submitted} label="Plan d’actions" detail={(x) => x.feedback} />
          </Card>

          {!submitted && (
            <div className="text-right">
              <button type="button" disabled={!ready} onClick={submit} className={btnPrimary}>
                Rendre mon constat
              </button>
              {!ready && <p className="mt-1 text-xs text-mute">Sélectionnez au moins une référence, une qualification, une cause racine et un plan d’actions.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
