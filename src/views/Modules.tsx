import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, ClipboardCheck, Clock, FileText } from 'lucide-react'
import { useEffect, useState, type KeyboardEvent } from 'react'
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Quiz } from '../components/Quiz'
import { BlockView, Card, inputCls, PageHeader, ProgressBar, Rich, ScoreBadge, Tag } from '../components/ui'
import { modules } from '../data/modules'
import { useProgress } from '../lib/progress'
import type { Block, Level } from '../types'

/** Temps de lecture estimé à 150 mots par minute : texte réglementaire dense, tableaux et livrables compris. */
function readingMinutes(blocks: Block[]): number {
  const text = blocks
    .map((b) => {
      switch (b.type) {
        case 'p':
        case 'h':
          return b.text
        case 'list':
          return b.items.join(' ')
        case 'table':
          return [...b.headers, ...b.rows.flat()].join(' ')
        case 'doc':
          return b.content
        case 'callout':
          return `${b.title} ${b.text}`
        case 'links':
          return ''
      }
    })
    .join(' ')
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}

const PILLAR: Record<string, string> = { G: 'Gouvernance', R: 'Risques', C: 'Conformité' }

/** Paliers de progression : du junior au CISO. */
export const LEVELS: Record<Level, { label: string; short: string; dot: string; text: string }> = {
  F: { label: 'Fondamentaux', short: 'Junior', dot: 'bg-emerald', text: 'text-emerald' },
  O: { label: 'Opérationnel', short: 'Confirmé', dot: 'bg-amber', text: 'text-amber' },
  E: { label: 'Expertise & Stratégie', short: 'Senior / CISO', dot: 'bg-crimson', text: 'text-red-300' },
}
const LEVEL_ORDER: Level[] = ['F', 'O', 'E']

export function LevelPill({ level }: { level: Level }) {
  const l = LEVELS[level]
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${l.text}`}>
      <span className={`size-2 rounded-full ${l.dot}`} aria-hidden /> {l.label} <span className="font-normal text-mute">· {l.short}</span>
    </span>
  )
}

export function ModulesList() {
  const { progress } = useProgress()
  return (
    <>
      <PageHeader eyebrow="Cursus A à Z" title="10 piliers, du junior au CISO">
        Chaque module associe un cours approfondi (articles, clauses, méthodes, erreurs classiques), des templates et livrables réels prêts à copier, et un quiz composé de cas pratiques d’audit corrigés. Les leçons progressent en trois paliers :
      </PageHeader>
      <div className="-mt-3 mb-6 flex flex-wrap gap-x-5 gap-y-2">
        {LEVEL_ORDER.map((l) => (
          <LevelPill key={l} level={l} />
        ))}
      </div>
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {modules.map((m) => {
          const read = progress.coursesRead[m.id]?.length ?? 0
          const quiz = progress.quizBest[m.id]
          return (
            <li key={m.id}>
              <Link to={`/modules/${m.id}`} className="flex h-full flex-col rounded-lg border border-line bg-card p-5 transition hover:border-accent">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-3xl font-bold text-accent">{String(m.number).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <Tag>{PILLAR[m.pillar]}</Tag>
                    <h2 className="mt-1.5 font-semibold text-strong">{m.title}</h2>
                    <p className="mt-1 text-sm text-mute">{m.summary}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <ProgressBar value={read / m.sections.length} label={`Lecture du module ${m.number}`} />
                  <p className="mt-1.5 flex justify-between text-xs text-mute">
                    <span>
                      {read}/{m.sections.length} sections · {m.templates.length} livrables · {m.quiz.length} questions
                    </span>
                    {quiz !== undefined && <ScoreBadge score={quiz} />}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </>
  )
}

type Tab = 'cours' | 'templates' | 'quiz'

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: 'cours', label: 'Cours opérationnel', icon: BookOpen },
  { id: 'templates', label: 'Templates & livrables', icon: FileText },
  { id: 'quiz', label: 'Quiz & cas pratiques', icon: ClipboardCheck },
]

export function ModuleDetail() {
  const { id } = useParams()
  const { hash } = useLocation()
  const [params] = useSearchParams()
  const { progress, toggleSection, saveQuiz } = useProgress()
  const module = modules.find((m) => m.id === id)
  const wanted = params.get('s')
  const initialSection = module?.sections.find((s) => s.id === wanted)?.id ?? module?.sections[0].id
  const [tab, setTab] = useState<Tab>(hash === '#quiz' ? 'quiz' : 'cours')
  const [sectionId, setSectionId] = useState(initialSection)

  useEffect(() => {
    setTab(hash === '#quiz' ? 'quiz' : 'cours')
    setSectionId(initialSection)
  }, [id, hash, initialSection])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [sectionId, tab])

  if (!module) return <Navigate to="/modules" replace />

  const index = modules.indexOf(module)
  const read = progress.coursesRead[module.id] ?? []
  const section = module.sections.find((s) => s.id === sectionId) ?? module.sections[0]
  const sectionIndex = module.sections.indexOf(section)
  const nextSection = module.sections[sectionIndex + 1]
  const prevSection = module.sections[sectionIndex - 1]
  const best = progress.quizBest[module.id]
  const badge: Record<Tab, string> = {
    cours: `${read.length}/${module.sections.length}`,
    templates: String(module.templates.length),
    quiz: best !== undefined ? `${best} %` : String(module.quiz.length),
  }
  const totalMinutes = module.sections.reduce((n, s) => n + readingMinutes(s.blocks), 0)

  // Onglets ARIA : les flèches gauche/droite passent d'un onglet à l'autre.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const i = TABS.findIndex((t) => t.id === tab)
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
    setTab(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  const goNext = () => {
    if (!read.includes(section.id)) toggleSection(module.id, section.id)
    if (nextSection) setSectionId(nextSection.id)
    else setTab('templates')
  }

  return (
    <>
      <Link to="/modules" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-strong">
        <ArrowLeft size={14} aria-hidden /> Tous les modules
      </Link>
      <PageHeader eyebrow={`Module ${module.number} / ${modules.length} · ${PILLAR[module.pillar]}`} title={module.title}>
        {module.summary}
      </PageHeader>

      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mute">
        <span className="flex items-center gap-1.5">
          <Clock size={13} aria-hidden /> ≈ {totalMinutes} min de lecture
        </span>
        <span className="flex min-w-40 flex-1 items-center gap-2">
          <span className="w-full max-w-56">
            <ProgressBar value={read.length / module.sections.length} tone={read.length >= module.sections.length ? 'bg-emerald' : 'bg-accent'} label="Sections lues" />
          </span>
          <span className="shrink-0 font-mono">
            {read.length}/{module.sections.length} lues
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          Quiz : <ScoreBadge score={best} />
        </span>
      </div>

      <div role="tablist" className="mb-5 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={onTabKey}
            className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition ${tab === t.id ? 'border-accent font-medium text-strong' : 'border-transparent text-mute hover:text-strong'}`}
          >
            <t.icon size={15} aria-hidden /> {t.label}
            <span className={`rounded px-1.5 font-mono text-[10px] ${tab === t.id ? 'bg-accent/20 text-blue-200' : 'bg-raised text-mute'}`}>{badge[t.id]}</span>
          </button>
        ))}
      </div>

      {tab === 'cours' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <nav aria-label="Sections du cours" className="lg:sticky lg:top-6 lg:self-start">
            <label className="block lg:hidden">
              <span className="sr-only">Aller à la section</span>
              <select value={section.id} onChange={(e) => setSectionId(e.target.value)} className={inputCls}>
                {module.sections.map((s, i) => (
                  <option key={s.id} value={s.id}>
                    {read.includes(s.id) ? '✓ ' : ''}
                    {i + 1}. {s.title} · {LEVELS[s.level ?? 'O'].label}
                  </option>
                ))}
              </select>
            </label>
            <ul className="hidden space-y-1 lg:block">
              {module.sections.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  {(s.level ?? 'O') !== (module.sections[i - 1]?.level ?? (i === 0 ? null : 'O')) && (
                    <p className={`${i === 0 ? '' : 'mt-3 '}mb-1 flex items-center gap-1.5 px-2.5 text-[10px] font-semibold tracking-widest uppercase ${LEVELS[s.level ?? 'O'].text}`}>
                      <span className={`size-1.5 rounded-full ${LEVELS[s.level ?? 'O'].dot}`} aria-hidden /> {LEVELS[s.level ?? 'O'].label}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setSectionId(s.id)}
                    aria-current={s.id === section.id}
                    className={`flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-sm ${s.id === section.id ? 'bg-raised text-strong' : 'text-mute hover:text-strong'}`}
                  >
                    {read.includes(s.id) ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald" aria-label="Lu" /> : <Circle size={15} className="mt-0.5 shrink-0" aria-hidden />}
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="min-w-0">
            {sectionIndex === 0 && (
              <Card className="mb-5 p-4">
                <p className="mb-2 text-sm font-semibold text-strong">À la fin de ce module, vous saurez :</p>
                <ul className="list-disc space-y-1 pl-5 text-sm marker:text-accent">
                  {module.objectives.map((o) => (
                    <li key={o}>
                      <Rich text={o} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <div key={section.id} className="fade-in">
              <p className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-mute">
                <span>
                  Section {sectionIndex + 1} / {module.sections.length} · ≈ {readingMinutes(section.blocks)} min
                </span>
                <LevelPill level={section.level ?? 'O'} />
              </p>
              <h2 className="text-xl font-bold text-strong sm:text-2xl">{section.title}</h2>
              {section.blocks.map((b, i) => (
                <BlockView key={`${section.id}-${i}`} block={b} />
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-4">
              <label className="mb-4 flex w-fit cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={read.includes(section.id)} onChange={() => toggleSection(module.id, section.id)} className="size-4 accent-emerald-500" />
                J’ai terminé cette section
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {prevSection ? (
                  <button type="button" onClick={() => setSectionId(prevSection.id)} className="rounded-lg border border-line p-3 text-left transition hover:border-accent">
                    <span className="flex items-center gap-1 text-xs text-mute">
                      <ArrowLeft size={13} aria-hidden /> Précédent
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-strong">{prevSection.title}</span>
                  </button>
                ) : (
                  <span className="hidden sm:block" />
                )}
                <button type="button" onClick={goNext} className="rounded-lg border border-accent/60 bg-accent/10 p-3 text-right transition hover:bg-accent/20">
                  <span className="flex items-center justify-end gap-1 text-xs text-blue-300">
                    {nextSection ? 'Marquer comme lu et continuer' : 'Terminer le cours'} <ArrowRight size={13} aria-hidden />
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-strong">{nextSection ? nextSection.title : 'Templates & livrables'}</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {tab === 'templates' && (
        <article className="max-w-4xl">
          <h2 className="text-xl font-bold text-strong">Templates & livrables réels</h2>
          <p className="mt-1 text-sm text-mute">Modèles à adapter : remplacez les champs entre crochets et faites valider par vos fonctions juridique et conformité.</p>
          {module.templates.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
          <button type="button" onClick={() => setTab('quiz')} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-strong">
            Passer au quiz <ArrowRight size={14} aria-hidden />
          </button>
        </article>
      )}

      {/* Reste monté : consulter le cours ne fait pas perdre la question en cours. */}
      <div className="max-w-3xl" hidden={tab !== 'quiz'}>
        <Quiz key={module.id} questions={module.quiz} best={progress.quizBest[module.id]} onFinish={(score) => saveQuiz(module.id, score)} />
        {modules[index + 1] && (
          <Link to={`/modules/${modules[index + 1].id}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-strong">
            Module suivant : {modules[index + 1].title} <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </div>
    </>
  )
}
