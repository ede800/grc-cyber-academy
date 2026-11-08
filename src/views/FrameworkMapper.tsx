import { Download, Lightbulb, Search, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { btnGhost, Card, inputCls, PageHeader, Segmented, Tag } from '../components/ui'
import { frameworkMapping } from '../data/frameworkMapping'
import { isoControls } from '../data/isoControls'
import { useProgress, type SoaEntry } from '../lib/progress'
import { norm } from '../lib/search'
import type { IsoControl, MappingRow } from '../types'

const FRAMEWORKS: { key: keyof Pick<MappingRow, 'iso' | 'nist' | 'nis2' | 'dora' | 'rgpd'>; label: string; cls: string }[] = [
  { key: 'iso', label: 'ISO 27001:2022 / 27002', cls: 'text-emerald' },
  { key: 'nist', label: 'NIST CSF 2.0', cls: 'text-sky-300' },
  { key: 'nis2', label: 'NIS 2', cls: 'text-accent' },
  { key: 'dora', label: 'DORA', cls: 'text-amber' },
  { key: 'rgpd', label: 'RGPD', cls: 'text-violet-300' },
]

export function FrameworkMapper() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'iso' ? 'iso' : 'map'
  return (
    <>
      <PageHeader eyebrow="Outil 4" title="Cross-Framework Mapper">
        Un thème, cinq référentiels : retrouvez immédiatement la mesure ISO 27002, la sous-catégorie NIST CSF 2.0 et l’article NIS 2, DORA ou RGPD correspondants. Explorez ensuite les 93 mesures de l’Annexe A et construisez votre Déclaration d’Applicabilité.
      </PageHeader>
      <div role="tablist" className="mb-5 flex gap-1 border-b border-line">
        {[
          { id: 'map', label: 'Crosswalk 5 référentiels' },
          { id: 'iso', label: 'ISO 27002 : 93 mesures & DdA' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setParams(t.id === 'iso' ? { tab: 'iso' } : {})}
            className={`-mb-px border-b-2 px-3 py-2 text-sm ${tab === t.id ? 'border-accent font-medium text-white' : 'border-transparent text-mute hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'map' ? <Crosswalk /> : <IsoExplorer />}
    </>
  )
}

function Crosswalk() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const selectedId = params.get('theme') ?? frameworkMapping[0].id
  const selected = frameworkMapping.find((m) => m.id === selectedId) ?? frameworkMapping[0]
  const rows = useMemo(() => {
    const q = norm(query.trim())
    if (!q) return frameworkMapping
    return frameworkMapping.filter((m) => norm([m.theme, m.summary, ...m.iso, ...m.nist, ...m.nis2, ...m.dora, ...m.rgpd].join(' ')).includes(q))
  }, [query])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div>
        <div className="relative mb-2">
          <Search size={15} className="absolute top-2.5 left-3 text-mute" aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filtrer : sauvegarde, A.8.8, Art. 21…" className={`${inputCls} pl-9`} aria-label="Filtrer les thèmes" />
        </div>
        <ul className="space-y-1">
          {rows.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setParams({ theme: m.id })}
                aria-current={m.id === selected.id}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm ${m.id === selected.id ? 'border-accent bg-raised text-white' : 'border-transparent text-mute hover:border-line hover:text-white'}`}
              >
                <span className="block font-medium">{m.theme}</span>
                <span className="text-[11px] text-mute">{m.category}</span>
              </button>
            </li>
          ))}
          {!rows.length && <li className="p-2 text-sm text-mute">Aucun thème ne correspond.</li>}
        </ul>
      </div>

      <div className="min-w-0 space-y-4">
        <Card className="p-5">
          <Tag>{selected.category}</Tag>
          <h2 className="mt-2 text-xl font-bold text-white">{selected.theme}</h2>
          <p className="mt-1 text-mute">{selected.summary}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {FRAMEWORKS.map((f) => (
              <div key={f.key} className="rounded-md border border-line bg-bg p-3">
                <p className={`text-xs font-semibold tracking-wide uppercase ${f.cls}`}>{f.label}</p>
                <ul className="mt-2 space-y-1">
                  {selected[f.key].map((ref) => (
                    <li key={ref} className="font-mono text-[12.5px] leading-snug text-slate-200">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-md border border-amber/40 bg-amber/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber uppercase">
                <Lightbulb size={13} aria-hidden /> Astuce d’auditeur
              </p>
              <p className="mt-2 text-sm">{selected.auditTip}</p>
            </div>
          </div>
        </Card>

        <Card className="overflow-x-auto">
          <table className="w-full min-w-[60rem] text-left text-xs">
            <thead className="bg-raised tracking-wide text-mute uppercase">
              <tr>
                <th className="px-3 py-2">Thème</th>
                {FRAMEWORKS.map((f) => (
                  <th key={f.key} className={`px-3 py-2 ${f.cls}`}>
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} onClick={() => setParams({ theme: m.id })} className={`cursor-pointer border-t border-line align-top hover:bg-raised/50 ${m.id === selected.id ? 'bg-accent/10' : ''}`}>
                  <td className="px-3 py-2 text-sm font-medium text-white">{m.theme}</td>
                  {FRAMEWORKS.map((f) => (
                    <td key={f.key} className="px-3 py-2 font-mono text-slate-300">
                      {m[f.key].map((ref) => ref.split(' ').slice(0, 2).join(' ')).join(', ')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="text-xs text-mute">Les correspondances sont indicatives : la granularité diffère d’un texte à l’autre, une correspondance ne vaut jamais équivalence stricte de conformité.</p>
      </div>
    </div>
  )
}

const THEMES: (IsoControl['theme'] | 'Toutes')[] = ['Toutes', 'Organisationnelles', 'Personnes', 'Physiques', 'Technologiques']
const STATUSES: SoaEntry['status'][] = ['Mise en œuvre', 'Partielle', 'Planifiée', 'Exclue']

function csvCell(v: string) {
  return `"${v.replace(/"/g, '""')}"`
}

function IsoExplorer() {
  const [params] = useSearchParams()
  const { progress, saveSoa } = useProgress()
  const [theme, setTheme] = useState<(typeof THEMES)[number]>('Toutes')
  const [onlyNew, setOnlyNew] = useState(false)
  const [query, setQuery] = useState(params.get('c') ?? '')
  const list = useMemo(() => {
    const q = norm(query.trim())
    return isoControls.filter(
      (c) => (theme === 'Toutes' || c.theme === theme) && (!onlyNew || c.isNew) && (!q || norm(`${c.id} ${c.title} ${c.purpose} ${c.evidence}`).includes(q)),
    )
  }, [theme, onlyNew, query])
  const filled = Object.keys(progress.soa).length
  const excluded = Object.values(progress.soa).filter((e) => !e.applicable).length

  const exportCsv = () => {
    const lines = [['Mesure', 'Intitulé', 'Thème', 'Applicable', 'Statut', 'Justification'].map(csvCell).join(';')]
    for (const c of isoControls) {
      const e = progress.soa[c.id]
      lines.push([c.id, c.title, c.theme, e ? (e.applicable ? 'Oui' : 'Non') : 'À statuer', e?.status ?? '', e?.justification ?? ''].map(csvCell).join(';'))
    }
    // BOM : Excel ouvre ainsi correctement les accents.
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'declaration-applicabilite.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Card className="mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="text-sm">
          <p className="font-semibold text-white">Ma Déclaration d’Applicabilité</p>
          <p className="text-mute">
            {filled}/93 mesures statuées · {excluded} exclusion{excluded > 1 ? 's' : ''} · une exclusion sans justification est un constat d’audit.
          </p>
        </div>
        <button type="button" onClick={exportCsv} className={btnGhost}>
          <Download size={15} /> Exporter la DdA (CSV)
        </button>
      </Card>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search size={15} className="absolute top-2.5 left-3 text-mute" aria-hidden />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="A.8.8, sauvegarde, cloud…" className={`${inputCls} pl-9`} aria-label="Rechercher une mesure" />
        </div>
        <Segmented options={THEMES} value={theme} onChange={setTheme} label="Thème" />
        <label className="flex items-center gap-2 text-sm text-mute">
          <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} className="size-4 accent-blue-500" /> 11 nouveautés 2022
        </label>
      </div>

      <p className="mb-2 text-xs text-mute">{list.length} mesure(s)</p>
      <ul className="space-y-2">
        {list.map((c) => {
          const e = progress.soa[c.id]
          return (
            <li key={c.id}>
              <Card className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-accent">{c.id}</span>
                      <span className="font-semibold text-white">{c.title}</span>
                      {c.isNew && (
                        <span className="inline-flex items-center gap-1 rounded border border-emerald/50 bg-emerald/10 px-1.5 text-[10px] font-semibold text-emerald">
                          <Sparkles size={10} aria-hidden /> Nouveau 2022
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm">{c.purpose}.</p>
                    <p className="mt-0.5 text-xs text-mute">
                      <span className="text-amber">Preuves attendues :</span> {c.evidence}.
                    </p>
                  </div>
                  <Tag>{c.theme}</Tag>
                </div>
                <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 md:flex-row md:items-center">
                  <select
                    aria-label={`Statut DdA de ${c.id}`}
                    value={e ? e.status : ''}
                    onChange={(ev) => {
                      const v = ev.target.value as SoaEntry['status'] | ''
                      if (!v) saveSoa(c.id, null)
                      else saveSoa(c.id, { applicable: v !== 'Exclue', status: v, justification: e?.justification ?? '' })
                    }}
                    className={`${inputCls} md:w-44`}
                  >
                    <option value="">DdA : à statuer</option>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s === 'Exclue' ? 'Non applicable (exclue)' : `Applicable · ${s}`}
                      </option>
                    ))}
                  </select>
                  {e && (
                    <input
                      value={e.justification}
                      onChange={(ev) => saveSoa(c.id, { ...e, justification: ev.target.value })}
                      placeholder={e.applicable ? 'Justification d’inclusion (risque, exigence légale ou contractuelle)' : 'Justification d’exclusion (absence d’activité ou de risque démontrée)'}
                      className={`${inputCls} ${!e.justification.trim() ? 'border-amber/60' : ''}`}
                      aria-label={`Justification DdA de ${c.id}`}
                    />
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ul>
    </>
  )
}
