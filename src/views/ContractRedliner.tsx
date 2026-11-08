import { ArrowLeft, ArrowRight, CheckCircle2, Gavel, RotateCcw, Scale, ShieldCheck, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { btnGhost, btnPrimary, Card, CopyButton, LevelBadge, ListSummary, PageHeader, Segmented, StatusBadge, Tag } from '../components/ui'
import { contractCases } from '../data/contractsRedline'
import { useProgress } from '../lib/progress'
import { RISK_LEVELS, scoreContract } from '../lib/scoring'
import { shuffle } from '../lib/shuffle'
import type { ContractCase, RiskLevel } from '../types'

export function ContractList() {
  const { progress } = useProgress()
  return (
    <>
      <PageHeader eyebrow="Simulateur 1" title="Contract & PAS Redliner">
        Des extraits de contrats rédigés en faveur du fournisseur. Repérez les pièges juridiques et GRC, cotez le risque, puis choisissez la contre-proposition de clause la plus protectrice et réaliste.
      </PageHeader>
      <ListSummary
        unit="dossiers revus"
        done={contractCases.filter((c) => progress.contracts[c.id] !== undefined).length}
        total={contractCases.length}
        scores={Object.values(progress.contracts)}
        next={((c) => c && { to: `/contrats/${c.id}`, label: c.title })(contractCases.find((c) => progress.contracts[c.id] === undefined))}
      />
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {contractCases.map((c, i) => (
          <li key={c.id}>
            <Link to={`/contrats/${c.id}`} className="flex h-full flex-col rounded-lg border border-line bg-card p-5 transition hover:border-accent">
              <div className="flex items-center justify-between gap-2">
                <Tag>Dossier {String(i + 1).padStart(2, '0')}</Tag>
                <StatusBadge score={progress.contracts[c.id]} />
              </div>
              <h2 className="mt-2 font-semibold text-white">{c.title}</h2>
              <p className="mt-0.5 text-xs text-accent">{c.contractType}</p>
              <p className="mt-2 text-sm text-mute">{c.context}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Clause fournisseur : après correction, les passages piégés sont barrés en rouge, comme dans une revue juridique. */
function VendorClause({ c, revealed, selected }: { c: ContractCase; revealed: boolean; selected: string[] }) {
  return (
    <p className="font-serif text-[15px] leading-relaxed text-slate-200">
      {c.excerpt.map((seg, i) => {
        if (!seg.trap || !revealed) return <span key={i}>{seg.text}</span>
        const found = selected.includes(seg.trap)
        return (
          <span key={i} className="rounded-sm bg-crimson/15 text-red-200 line-through decoration-crimson decoration-2">
            {seg.text}
            <sup className={`ml-0.5 font-sans text-[10px] font-bold no-underline ${found ? 'text-emerald' : 'text-amber'}`}>{found ? '✓' : 'manqué'}</sup>
          </span>
        )
      })}
    </p>
  )
}

export function ContractCaseView() {
  const { id } = useParams()
  const c = contractCases.find((x) => x.id === id)
  if (!c) return <Navigate to="/contrats" replace />
  return <ContractExercise key={c.id} c={c} />
}

function ContractExercise({ c }: { c: ContractCase }) {
  const { progress, saveContract } = useProgress()
  const [issues] = useState(() => shuffle(c.issues))
  const [counters, setCounters] = useState(() => shuffle(c.counters))
  const [traps, setTraps] = useState<string[]>([])
  const [level, setLevel] = useState<RiskLevel | null>(null)
  const [counter, setCounter] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const score = useMemo(() => scoreContract(c, { traps, level, counter }), [c, traps, level, counter])
  const index = contractCases.indexOf(c)
  const next = contractCases[index + 1]
  const chosen = c.counters.find((x) => x.id === counter)

  const submit = () => {
    setSubmitted(true)
    saveContract(c.id, score)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const restart = () => {
    setCounters(shuffle(c.counters))
    setTraps([])
    setLevel(null)
    setCounter(null)
    setSubmitted(false)
  }

  return (
    <>
      <Link to="/contrats" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-white">
        <ArrowLeft size={14} aria-hidden /> Tous les dossiers
      </Link>
      <PageHeader eyebrow={`Redliner · ${c.contractType}`} title={c.title}>
        <span className="text-ink">{c.vendor}.</span> {c.context}
      </PageHeader>

      {submitted && (
        <Card className="mb-5 flex flex-wrap items-center justify-between gap-4 p-4">
          <div>
            <p className="text-xs tracking-wide text-mute uppercase">Score du dossier</p>
            <p className={`text-3xl font-bold ${score >= 80 ? 'text-emerald' : score >= 50 ? 'text-amber' : 'text-crimson'}`}>{score} %</p>
            <p className="text-xs text-mute">Meilleur score : {progress.contracts[c.id] ?? score} %</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={restart} className={btnGhost}>
              <RotateCcw size={15} /> Recommencer
            </button>
            {next && (
              <Link to={`/contrats/${next.id}`} className={btnPrimary}>
                Dossier suivant <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card className="p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-red-300 uppercase">
              <Scale size={14} aria-hidden /> Clause fournisseur {submitted ? '(passages dangereux barrés)' : 'à analyser'}
            </p>
            <VendorClause c={c} revealed={submitted} selected={traps} />
          </Card>

          {submitted && (
            <>
              <Card className="border-emerald/50 p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald uppercase">
                    <ShieldCheck size={14} aria-hidden /> Clause GRC protectrice (redline)
                  </p>
                  <CopyButton text={c.protectiveClause} label="Copier la clause" />
                </div>
                <p className="rounded-sm bg-emerald/10 font-serif text-[15px] leading-relaxed text-emerald-100 underline decoration-emerald/40 underline-offset-4">{c.protectiveClause}</p>
              </Card>
              <Card className="p-5">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
                  <Gavel size={14} aria-hidden /> Justification juridique
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm marker:text-accent">
                  {c.legalBasis.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold tracking-wide text-amber uppercase">Conseil de négociation</p>
                <p className="mt-1 text-sm">{c.negotiationTip}</p>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-semibold text-white">1. Quels sont les pièges ?</h2>
            <p className="mb-3 text-xs text-mute">Cochez uniquement les stipulations dangereuses pour le client : les fausses alertes coûtent des points.</p>
            <ul className="space-y-2">
              {issues.map((i) => {
                const checked = traps.includes(i.id)
                const right = checked === i.isTrap
                return (
                  <li key={i.id}>
                    <label className={`flex cursor-pointer items-start gap-2.5 rounded-md border p-3 text-sm ${submitted ? (right ? 'border-emerald/50' : 'border-crimson/60') : checked ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'}`}>
                      <input
                        type="checkbox"
                        disabled={submitted}
                        checked={checked}
                        onChange={() => setTraps((t) => (t.includes(i.id) ? t.filter((x) => x !== i.id) : [...t, i.id]))}
                        className="mt-0.5 size-4 shrink-0 accent-blue-500"
                      />
                      <span>
                        <span className="text-white">{i.label}</span>
                        {submitted && (
                          <span className="mt-1 block text-xs text-mute">
                            <span className={i.isTrap ? 'font-semibold text-red-300' : 'font-semibold text-emerald'}>{i.isTrap ? 'Piège. ' : 'Pas un piège. '}</span>
                            {i.why}
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
            <h2 className="mb-3 font-semibold text-white">2. Niveau de risque pour le client</h2>
            <Segmented options={RISK_LEVELS} value={level} onChange={setLevel} label="Niveau de risque" disabled={submitted} render={(l) => <LevelBadge level={l} />} />
            {submitted && (
              <p className="mt-3 text-sm">
                <span className="mr-2 text-mute">Attendu :</span>
                <LevelBadge level={c.riskLevel} /> <span className="ml-1">{c.riskWhy}</span>
              </p>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-white">3. Contre-proposition (redline)</h2>
            <div role="radiogroup" aria-label="Contre-proposition" className="space-y-2">
              {counters.map((o) => {
                const selected = counter === o.id
                let cls = selected ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'
                if (submitted) cls = o.correct ? 'border-emerald bg-emerald/10' : selected ? 'border-crimson bg-crimson/10' : 'border-line opacity-60'
                return (
                  <button key={o.id} type="button" role="radio" aria-checked={selected} disabled={submitted} onClick={() => setCounter(o.id)} className={`flex w-full items-start gap-2 rounded-md border p-3 text-left text-sm ${cls}`}>
                    {submitted && o.correct && <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald" aria-label="Bonne réponse" />}
                    {submitted && selected && !o.correct && <XCircle size={16} className="mt-0.5 shrink-0 text-crimson" aria-label="Votre choix, incorrect" />}
                    <span>
                      <span className="font-medium text-white">{o.label}</span>
                      <span className="mt-0.5 block text-xs text-mute">{o.text}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            {submitted && chosen && (
              <p className="mt-3 rounded-md border border-line bg-raised p-3 text-sm">
                <span className="font-semibold text-white">{chosen.correct ? 'Bon choix. ' : 'À revoir. '}</span>
                {chosen.feedback}
              </p>
            )}
          </Card>

          {!submitted && (
            <div className="text-right">
              <button type="button" disabled={!level || !counter} onClick={submit} className={btnPrimary}>
                Soumettre ma revue
              </button>
              {(!level || !counter) && <p className="mt-1 text-xs text-mute">Choisissez un niveau de risque et une contre-proposition.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
