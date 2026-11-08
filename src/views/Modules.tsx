import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, ClipboardCheck, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Quiz } from '../components/Quiz'
import { BlockView, Card, PageHeader, ProgressBar, Rich, ScoreBadge, Tag } from '../components/ui'
import { modules } from '../data/modules'
import { useProgress } from '../lib/progress'

const PILLAR: Record<string, string> = { G: 'Gouvernance', R: 'Risques', C: 'Conformité' }

export function ModulesList() {
  const { progress } = useProgress()
  return (
    <>
      <PageHeader eyebrow="Cursus A à Z" title="8 piliers opérationnels du GRC">
        Chaque module associe un cours approfondi (articles, clauses, méthodes, erreurs classiques), des templates et livrables réels prêts à copier, et un quiz composé de cas pratiques d’audit corrigés.
      </PageHeader>
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
                    <h2 className="mt-1.5 font-semibold text-white">{m.title}</h2>
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

  return (
    <>
      <Link to="/modules" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-white">
        <ArrowLeft size={14} aria-hidden /> Tous les modules
      </Link>
      <PageHeader eyebrow={`Module ${module.number} · ${PILLAR[module.pillar]}`} title={module.title}>
        {module.summary}
      </PageHeader>

      <div role="tablist" className="mb-5 flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm ${tab === t.id ? 'border-accent font-medium text-white' : 'border-transparent text-mute hover:text-white'}`}
          >
            <t.icon size={15} aria-hidden /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'cours' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <nav aria-label="Sections du cours" className="lg:sticky lg:top-6 lg:self-start">
            <ul className="flex gap-1 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:pb-0">
              {module.sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setSectionId(s.id)}
                    aria-current={s.id === section.id}
                    className={`flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left text-sm ${s.id === section.id ? 'bg-raised text-white' : 'text-mute hover:text-white'}`}
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
                <p className="mb-2 text-sm font-semibold text-white">À la fin de ce module, vous saurez :</p>
                <ul className="list-disc space-y-1 pl-5 text-sm marker:text-accent">
                  {module.objectives.map((o) => (
                    <li key={o}>
                      <Rich text={o} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            {section.blocks.map((b, i) => (
              <BlockView key={`${section.id}-${i}`} block={b} />
            ))}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={read.includes(section.id)} onChange={() => toggleSection(module.id, section.id)} className="size-4 accent-emerald-500" />
                J’ai terminé cette section
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white"
                onClick={() => {
                  if (!read.includes(section.id)) toggleSection(module.id, section.id)
                  if (nextSection) setSectionId(nextSection.id)
                  else setTab('templates')
                }}
              >
                {nextSection ? `Suivant : ${nextSection.title}` : 'Terminer et voir les livrables'} <ArrowRight size={14} aria-hidden />
              </button>
            </div>
          </article>
        </div>
      )}

      {tab === 'templates' && (
        <article className="max-w-4xl">
          <h2 className="text-xl font-bold text-white">Templates & livrables réels</h2>
          <p className="mt-1 text-sm text-mute">Modèles à adapter : remplacez les champs entre crochets et faites valider par vos fonctions juridique et conformité.</p>
          {module.templates.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
          <button type="button" onClick={() => setTab('quiz')} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white">
            Passer au quiz <ArrowRight size={14} aria-hidden />
          </button>
        </article>
      )}

      {/* Reste monté : consulter le cours ne fait pas perdre la question en cours. */}
      <div className="max-w-3xl" hidden={tab !== 'quiz'}>
        <Quiz key={module.id} questions={module.quiz} best={progress.quizBest[module.id]} onFinish={(score) => saveQuiz(module.id, score)} />
        {modules[index + 1] && (
          <Link to={`/modules/${modules[index + 1].id}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white">
            Module suivant : {modules[index + 1].title} <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </div>
    </>
  )
}
