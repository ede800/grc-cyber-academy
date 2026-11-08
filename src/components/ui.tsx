import { ArrowRight, Check, Copy, FileText, Info, Lightbulb, OctagonAlert, TriangleAlert } from 'lucide-react'
import { Fragment, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Block, RiskLevel } from '../types'

/** Rend `code` et **gras** dans les textes de cours. Passe par React : aucun HTML injecté. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
          return (
            <code key={i} className="rounded border border-line bg-bg px-1 py-px font-mono text-[0.86em] break-words text-blue-300">
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
          return (
            <strong key={i} className="font-semibold text-strong">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function CopyButton({ text, label = 'Copier' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'ko'>('idle')
  return (
    <button
      type="button"
      onClick={async () => {
        setState((await copyText(text)) ? 'ok' : 'ko')
        setTimeout(() => setState('idle'), 1600)
      }}
      className="no-print inline-flex shrink-0 items-center gap-1.5 rounded border border-line px-2 py-1 font-sans text-xs text-mute transition hover:border-accent hover:text-strong"
    >
      {state === 'ok' ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
      {state === 'ok' ? 'Copié' : state === 'ko' ? 'Échec' : label}
    </button>
  )
}

/** Livrable type (politique, clause, mémo) : texte brut copiable, lisible comme un document. */
export function DocBlock({ title, content }: { title: string; content: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-md border border-line bg-code">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-3 py-1.5">
        <span className="flex min-w-0 items-center gap-2 truncate text-xs text-mute">
          <FileText size={13} className="shrink-0 text-accent" aria-hidden /> {title}
        </span>
        <CopyButton text={content} />
      </figcaption>
      <pre tabIndex={0} className="overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-ink">
        {content}
      </pre>
    </figure>
  )
}

const CALLOUTS = {
  info: { icon: Info, cls: 'border-accent/50 bg-accent/5', ic: 'text-accent' },
  tip: { icon: Lightbulb, cls: 'border-emerald/50 bg-emerald/5', ic: 'text-emerald' },
  warn: { icon: TriangleAlert, cls: 'border-amber/50 bg-amber/5', ic: 'text-amber' },
  danger: { icon: OctagonAlert, cls: 'border-crimson/50 bg-crimson/5', ic: 'text-crimson' },
}

export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-raised text-xs tracking-wide text-mute uppercase">
          <tr>
            {headers.map((head) => (
              <th key={head} scope="col" className="px-3 py-2 font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line align-top">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-medium text-strong' : ''}`}>
                  <Rich text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="my-3">
          <Rich text={block.text} />
        </p>
      )
    case 'h':
      return <h4 className="mt-6 mb-2 font-semibold text-strong">{block.text}</h4>
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag className={`my-3 space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-accent`}>
          {block.items.map((item, i) => (
            <li key={i}>
              <Rich text={item} />
            </li>
          ))}
        </Tag>
      )
    }
    case 'table':
      return <DataTable headers={block.headers} rows={block.rows} />
    case 'doc':
      return <DocBlock title={block.title} content={block.content} />
    case 'links':
      return (
        <ul className="my-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {block.items.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="flex h-full items-center justify-between gap-2 rounded-md border border-line bg-card p-3 text-sm font-medium text-strong transition hover:border-accent">
                {item.label} <ArrowRight size={14} className="shrink-0 text-accent" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )
    case 'callout': {
      const c = CALLOUTS[block.tone]
      return (
        <aside className={`my-4 flex gap-3 rounded-md border-y border-r border-l-4 p-3 ${c.cls}`}>
          <c.icon size={18} className={`mt-0.5 shrink-0 ${c.ic}`} aria-hidden />
          <div>
            <p className="font-semibold text-strong">
              <Rich text={block.title} />
            </p>
            <p className="mt-1 text-sm">
              <Rich text={block.text} />
            </p>
          </div>
        </aside>
      )
    }
  }
}

const LEVEL: Record<RiskLevel, string> = {
  Critique: 'border-crimson/60 bg-crimson/15 text-red-300',
  Élevé: 'border-amber/60 bg-amber/15 text-amber-300',
  Modéré: 'border-accent/60 bg-accent/15 text-blue-300',
  Faible: 'border-emerald/60 bg-emerald/15 text-emerald-300',
}

export function LevelBadge({ level }: { level: RiskLevel }) {
  return <span className={`inline-block rounded border px-1.5 py-0.5 text-xs font-semibold ${LEVEL[level]}`}>{level}</span>
}

export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-block rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-xs text-mute ${className}`}>{children}</span>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-card ${className}`}>{children}</div>
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-6">
      {eyebrow && <p className="mb-1 font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>}
      <h1 className="text-2xl font-bold text-strong sm:text-3xl">{title}</h1>
      {children && <div className="mt-2 max-w-3xl text-mute">{children}</div>}
    </header>
  )
}

export function ProgressBar({ value, tone = 'bg-accent', label }: { value: number; tone?: string; label: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="h-1.5 overflow-hidden rounded-full bg-line">
      <div className={`h-full rounded-full ${tone} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ScoreBadge({ score }: { score?: number }) {
  if (score === undefined) return <span className="text-xs text-mute">Non traité</span>
  const cls = score >= 80 ? 'text-emerald' : score >= 50 ? 'text-amber' : 'text-crimson'
  return <span className={`font-mono text-sm font-bold ${cls}`}>{score} %</span>
}

/** Choix exclusif sous forme de boutons : plus lisible qu'un menu déroulant pour 2 à 5 options. */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
  disabled,
  render,
}: {
  options: readonly T[]
  value: T | null
  onChange: (v: T) => void
  label: string
  disabled?: boolean
  render?: (v: T) => ReactNode
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={String(o)}
          type="button"
          role="radio"
          aria-checked={value === o}
          disabled={disabled}
          onClick={() => onChange(o)}
          className={`rounded-md border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed ${
            value === o ? 'border-accent bg-accent/15 font-medium text-strong' : 'border-line text-mute hover:border-accent hover:text-strong'
          }`}
        >
          {render ? render(o) : o}
        </button>
      ))}
    </div>
  )
}

export const inputCls =
  'w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-slate-500 focus:border-accent focus:outline-none'
export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50'
export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-ink transition hover:border-accent hover:text-strong'

/** Bandeau d'avancement d'un simulateur : où j'en suis et quel dossier ouvrir ensuite. */
export function ListSummary({ done, total, scores, next, unit }: { done: number; total: number; scores: number[]; next?: { to: string; label: string }; unit: string }) {
  const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : undefined
  return (
    <Card className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3 p-4">
      <div className="min-w-48 flex-1">
        <p className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span className="text-strong">
            <span className="font-mono font-bold">
              {done}/{total}
            </span>{' '}
            {unit}
          </span>
          {average !== undefined && (
            <span className="text-xs text-mute">
              Moyenne <ScoreBadge score={average} />
            </span>
          )}
        </p>
        <ProgressBar value={done / total} tone={done >= total ? 'bg-emerald' : 'bg-accent'} label={`Avancement : ${done} sur ${total}`} />
      </div>
      {next ? (
        <Link to={next.to} className={btnPrimary}>
          {done ? 'Continuer' : 'Commencer'} : {next.label} <ArrowRight size={15} aria-hidden />
        </Link>
      ) : (
        <p className="text-sm text-emerald">Tout est traité. Rejouez un dossier pour améliorer votre score.</p>
      )}
    </Card>
  )
}

/** Statut d'un dossier dans une liste : score obtenu ou pastille « À faire ». */
export function StatusBadge({ score }: { score?: number }) {
  if (score === undefined) return <span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-mute">À faire</span>
  return <ScoreBadge score={score} />
}
