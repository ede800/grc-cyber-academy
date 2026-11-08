import { BriefcaseBusiness, CheckCircle2, Download, Eye, EyeOff, FileText, RotateCcw, Shuffle, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { btnGhost, Card, CopyButton, PageHeader, ProgressBar, Segmented, Tag } from '../components/ui'
import { deliverables } from '../data/deliverables'
import { interviewQuestions } from '../data/interviewPrep'
import { useProgress } from '../lib/progress'
import type { InterviewQuestion } from '../types'

type Tab = 'livrables' | 'entretiens'

function downloadMarkdown(name: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.md`
  a.click()
  URL.revokeObjectURL(url)
}

export function CareerAndTemplates() {
  const [params, setParams] = useSearchParams()
  const tab: Tab = params.get('tab') === 'entretiens' ? 'entretiens' : 'livrables'
  return (
    <>
      <PageHeader eyebrow="Hub carrière" title="Livrables & entretiens senior">
        Les livrables qu’un consultant ou un RSSI produit réellement, prêts à copier ou à exporter en Markdown, et 25 questions d’entretien posées en cabinet et en grand groupe, avec la réponse scolaire à éviter et la réponse structurée d’un senior.
      </PageHeader>
      <div role="tablist" className="mb-5 flex gap-1 border-b border-line">
        {(
          [
            ['livrables', 'Bibliothèque de livrables', FileText],
            ['entretiens', 'Simulateur d’entretiens', BriefcaseBusiness],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setParams(id === 'livrables' ? {} : { tab: id })}
            className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition ${tab === id ? 'border-accent font-medium text-white' : 'border-transparent text-mute hover:text-white'}`}
          >
            <Icon size={15} aria-hidden /> {label}
          </button>
        ))}
      </div>
      {tab === 'livrables' ? <Library /> : <Interviews />}
    </>
  )
}

function Library() {
  const [params, setParams] = useSearchParams()
  const current = deliverables.find((d) => d.id === params.get('d')) ?? deliverables[0]
  const lines = current.markdown.split('\n').length
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <ul className="space-y-1.5">
        {deliverables.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => setParams({ d: d.id })}
              aria-current={d.id === current.id}
              className={`w-full rounded-md border px-3 py-2.5 text-left text-sm transition ${d.id === current.id ? 'border-accent bg-raised text-white' : 'border-line text-mute hover:border-accent hover:text-white'}`}
            >
              <span className="flex items-start gap-2 font-medium">
                <FileText size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden /> {d.title}
              </span>
              <span className="mt-1 block pl-6 text-[11px] text-mute">{d.audience}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="min-w-0">
        <Card className="mb-3 p-4">
          <h2 className="font-semibold text-white">{current.title}</h2>
          <p className="mt-1 text-sm text-mute">{current.usage}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <CopyButton text={current.markdown} label="Copier le Markdown" />
            <button type="button" onClick={() => downloadMarkdown(current.id, current.markdown)} className="inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 text-xs text-mute transition hover:border-accent hover:text-white">
              <Download size={13} aria-hidden /> Exporter (.md)
            </button>
            <span className="text-xs text-mute">{lines} lignes</span>
          </div>
        </Card>
        <pre tabIndex={0} className="max-h-[70vh] overflow-auto rounded-md border border-line bg-[#0b111d] p-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-slate-200">
          {current.markdown}
        </pre>
      </div>
    </div>
  )
}

const LEVELS = ['Tous', 'Junior', 'Confirmé', 'Senior'] as const

function Interviews() {
  const { progress, markInterview } = useProgress()
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('Tous')
  const [onlyReview, setOnlyReview] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const list = useMemo(
    () => interviewQuestions.filter((q) => (level === 'Tous' || q.level === level) && (!onlyReview || progress.interviews[q.id] !== 'maitrise')),
    [level, onlyReview, progress.interviews],
  )
  const mastered = interviewQuestions.filter((q) => progress.interviews[q.id] === 'maitrise').length

  const random = () => {
    const pool = list.length ? list : interviewQuestions
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setFocus(pick.id)
    requestAnimationFrame(() => document.getElementById(`q-${pick.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <Card className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 p-4">
        <div className="min-w-48 flex-1">
          <p className="mb-1.5 text-sm text-white">
            <span className="font-mono font-bold">
              {mastered}/{interviewQuestions.length}
            </span>{' '}
            questions maîtrisées
          </p>
          <ProgressBar value={mastered / interviewQuestions.length} tone="bg-emerald" label="Questions maîtrisées" />
        </div>
        <button type="button" onClick={random} className={btnGhost}>
          <Shuffle size={15} aria-hidden /> Question au hasard
        </button>
      </Card>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <Segmented options={LEVELS} value={level} onChange={setLevel} label="Niveau" />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input type="checkbox" checked={onlyReview} onChange={(e) => setOnlyReview(e.target.checked)} className="size-4 accent-blue-500" /> Masquer les questions maîtrisées
        </label>
      </div>

      <p className="mb-2 text-xs text-mute">{list.length} question(s) · Préparez votre réponse à voix haute avant de révéler la correction.</p>
      <ul className="space-y-3">
        {list.map((q) => (
          <li key={q.id} id={`q-${q.id}`}>
            <QuestionCard q={q} highlight={focus === q.id} mark={progress.interviews[q.id]} onMark={(m) => markInterview(q.id, m)} />
          </li>
        ))}
        {!list.length && <li className="text-sm text-mute">Toutes les questions de ce niveau sont maîtrisées.</li>}
      </ul>
    </>
  )
}

const LEVEL_CLS: Record<InterviewQuestion['level'], string> = {
  Junior: 'border-emerald/50 text-emerald',
  Confirmé: 'border-amber/50 text-amber',
  Senior: 'border-crimson/50 text-red-300',
}

function QuestionCard({ q, highlight, mark, onMark }: { q: InterviewQuestion; highlight: boolean; mark?: 'maitrise' | 'a-revoir'; onMark: (m: 'maitrise' | 'a-revoir' | null) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className={`p-5 transition ${highlight ? 'border-accent ring-1 ring-accent' : ''}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded border px-1.5 py-0.5 text-[11px] font-semibold ${LEVEL_CLS[q.level]}`}>{q.level}</span>
        <Tag>{q.context}</Tag>
        {mark === 'maitrise' && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald">
            <CheckCircle2 size={13} aria-hidden /> Maîtrisée
          </span>
        )}
        {mark === 'a-revoir' && <span className="text-xs text-amber">À retravailler</span>}
      </div>
      <h3 className="mt-2 font-semibold text-white">{q.question}</h3>

      <button type="button" onClick={() => setOpen((o) => !o)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white" aria-expanded={open}>
        {open ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {open ? 'Masquer la correction' : 'Révéler la correction'}
      </button>

      {open && (
        <div className="fade-in mt-3 space-y-3">
          <p className="rounded-md border border-line bg-bg p-3 text-sm">
            <span className="block text-xs font-semibold tracking-wide text-accent uppercase">Ce que le recruteur teste</span>
            {q.tests}
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-md border border-crimson/40 bg-crimson/5 p-3 text-sm">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-red-300 uppercase">
                <XCircle size={13} aria-hidden /> Réponse scolaire d’un débutant
              </p>
              <p className="text-mute italic">« {q.junior} »</p>
            </div>
            <div className="rounded-md border border-emerald/40 bg-emerald/5 p-3 text-sm">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-emerald uppercase">
                <CheckCircle2 size={13} aria-hidden /> Réponse structurée d’un senior
              </p>
              <p>{q.senior}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <span className="text-xs text-mute">Votre réponse était-elle à ce niveau ?</span>
            <button type="button" onClick={() => onMark('maitrise')} className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-xs ${mark === 'maitrise' ? 'border-emerald bg-emerald/15 text-white' : 'border-line text-mute hover:text-white'}`}>
              <ThumbsUp size={12} aria-hidden /> Je maîtrise
            </button>
            <button type="button" onClick={() => onMark('a-revoir')} className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-xs ${mark === 'a-revoir' ? 'border-amber bg-amber/15 text-white' : 'border-line text-mute hover:text-white'}`}>
              <ThumbsDown size={12} aria-hidden /> À retravailler
            </button>
            {mark && (
              <button type="button" onClick={() => onMark(null)} className="inline-flex items-center gap-1 text-xs text-mute hover:text-white">
                <RotateCcw size={12} aria-hidden /> Effacer
              </button>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
