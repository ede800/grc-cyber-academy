import { ArrowLeft, ArrowRight, Calculator, FilePlus2, Grid3x3, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FairCalculator } from '../components/FairCalculator'
import { RiskMatrix, type MatrixMarker } from '../components/RiskMatrix'
import { btnGhost, btnPrimary, Card, CopyButton, DocBlock, inputCls, LevelBadge, ListSummary, PageHeader, ScoreBadge, Segmented, StatusBadge, Tag } from '../components/ui'
import { riskControls, riskScenarios } from '../data/riskScenarios'
import { useProgress, type CustomRisk, type RiskEntry } from '../lib/progress'
import { APPETITE, levelOf, residual, scoreRisk } from '../lib/scoring'
import type { RiskScenario, Treatment } from '../types'

const TREATMENTS: Treatment[] = ['Réduire', 'Accepter', 'Transférer', 'Éviter']
const TREATMENT_HELP: Record<Treatment, string> = {
  Réduire: 'Mesures pour diminuer vraisemblance et / ou gravité',
  Accepter: 'Décision formelle du propriétaire, durée limitée',
  Transférer: 'Assurance, contrat : on transfère l’impact financier',
  Éviter: 'Supprimer l’activité ou la source du risque',
}
const GRAVITY = ['Mineure', 'Significative', 'Grave', 'Critique', 'Catastrophique']
const LIKELIHOOD = ['Très improbable', 'Peu probable', 'Probable', 'Très probable', 'Quasi certain']

const EMPTY_ENTRY: RiskEntry = { gravity: 3, likelihood: 3, controls: [], treatment: null, owner: '' }

interface RowItem {
  id: string
  code: string
  title: string
  asset: string
  entry?: RiskEntry
  custom: boolean
}

function useRegister(): RowItem[] {
  const { progress } = useProgress()
  return [
    ...riskScenarios.map((s, i) => ({ id: s.id, code: `R${i + 1}`, title: s.title, asset: s.businessAsset, entry: progress.risks[s.id], custom: false })),
    ...progress.customRisks.map((c, i) => ({ id: c.id, code: `C${i + 1}`, title: c.title, asset: c.businessAsset, entry: c.entry, custom: true })),
  ]
}

const STUDIO_TABS = [
  { id: 'registre', label: 'Registre & matrice 5x5', icon: Grid3x3 },
  { id: 'fair', label: 'Quantification FAIR / ROSI', icon: Calculator },
] as const

export function RiskList() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'fair' ? 'fair' : 'registre'
  return (
    <>
      <PageHeader eyebrow="Simulateur 3" title="Risk Register & EBIOS Studio">
        Cotez des scénarios de risque réels (gravité × vraisemblance), sélectionnez les mesures ISO 27002 / NIST, calculez le risque résiduel, choisissez l’option de traitement et générez le mémo d’acceptation pour le COMEX. Puis chiffrez le risque en euros avec la méthode FAIR. Appétence au risque retenue : résiduel ≤ {APPETITE}.
      </PageHeader>
      <div role="tablist" className="mb-5 flex gap-1 overflow-x-auto border-b border-line">
        {STUDIO_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setParams(t.id === 'fair' ? { tab: 'fair' } : {})}
            className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition ${tab === t.id ? 'border-accent font-medium text-white' : 'border-transparent text-mute hover:text-white'}`}
          >
            <t.icon size={15} aria-hidden /> {t.label}
          </button>
        ))}
      </div>
      {tab === 'fair' ? <FairCalculator /> : <Register />}
    </>
  )
}

function Register() {
  const { progress, saveCustomRisks } = useProgress()
  const rows = useRegister()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [asset, setAsset] = useState('')

  const markers: MatrixMarker[] = rows.flatMap((r) => {
    if (!r.entry) return []
    const res = residual(r.entry.gravity, r.entry.likelihood, r.entry.controls)
    return [
      { key: `${r.id}-b`, label: r.code, gravity: r.entry.gravity, likelihood: r.entry.likelihood, kind: 'brut' as const },
      { key: `${r.id}-r`, label: r.code, gravity: res.gravity, likelihood: res.likelihood, kind: 'residuel' as const },
    ]
  })

  const add = () => {
    const id = `custom-${Date.now().toString(36)}`
    saveCustomRisks([...progress.customRisks, { id, title: title.trim(), businessAsset: asset.trim() || 'À préciser', entry: EMPTY_ENTRY }])
    navigate(`/risques/${id}`)
  }

  return (
    <>
      <ListSummary
        unit="scénarios cotés et validés"
        done={riskScenarios.filter((s) => progress.risks[s.id]?.score !== undefined).length}
        total={riskScenarios.length}
        scores={riskScenarios.flatMap((s) => (progress.risks[s.id]?.score !== undefined ? [progress.risks[s.id].score as number] : []))}
        next={((s) => s && { to: `/risques/${s.id}`, label: s.title })(riskScenarios.find((s) => progress.risks[s.id]?.score === undefined))}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-raised text-xs tracking-wide text-mute uppercase">
              <tr>
                <th className="px-3 py-2">Réf.</th>
                <th className="px-3 py-2">Scénario</th>
                <th className="px-3 py-2">Brut</th>
                <th className="px-3 py-2">Résiduel</th>
                <th className="px-3 py-2">Traitement</th>
                <th className="px-3 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const res = r.entry ? residual(r.entry.gravity, r.entry.likelihood, r.entry.controls) : null
                const inh = r.entry ? r.entry.gravity * r.entry.likelihood : null
                const resScore = res ? res.gravity * res.likelihood : null
                return (
                  <tr key={r.id} onClick={() => navigate(`/risques/${r.id}`)} className="cursor-pointer border-t border-line align-top transition hover:bg-raised/50">
                    <td className="px-3 py-2 font-mono text-xs text-mute">{r.code}</td>
                    <td className="px-3 py-2">
                      <Link to={`/risques/${r.id}`} className="font-medium text-white hover:text-accent">
                        {r.title}
                      </Link>
                      <p className="text-xs text-mute">{r.asset}</p>
                    </td>
                    <td className="px-3 py-2">{inh !== null ? <LevelBadge level={levelOf(inh)} /> : <span className="text-xs text-mute">À coter</span>}</td>
                    <td className="px-3 py-2">{resScore !== null && <LevelBadge level={levelOf(resScore)} />}</td>
                    <td className="px-3 py-2 text-xs">{r.entry?.treatment ?? '-'}</td>
                    <td className="px-3 py-2">{r.custom ? <Tag>Perso</Tag> : <StatusBadge score={r.entry?.score} />}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Grid3x3 size={15} className="text-accent" aria-hidden /> Cartographie du registre
            </p>
            {markers.length ? <RiskMatrix markers={markers} compact /> : <p className="text-sm text-mute">Cotez un premier scénario pour l’afficher ici.</p>}
            <p className="mt-2 flex gap-4 text-[11px] text-mute">
              <span className="flex items-center gap-1">
                <span className="inline-block size-3 rounded-full border-2 border-white/80" /> Brut
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block size-3 rounded-full bg-white" /> Résiduel
              </span>
            </p>
          </Card>
          <Card className="p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <FilePlus2 size={15} className="text-accent" aria-hidden /> Ajouter un risque de votre organisation
            </p>
            <label className="text-xs text-mute" htmlFor="risk-title">
              Intitulé du scénario
            </label>
            <input id="risk-title" value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputCls} mt-1 mb-2`} placeholder="Ex. compromission du tenant M365 par un prestataire" />
            <label className="text-xs text-mute" htmlFor="risk-asset">
              Valeur métier impactée
            </label>
            <input id="risk-asset" value={asset} onChange={(e) => setAsset(e.target.value)} className={`${inputCls} mt-1`} placeholder="Ex. messagerie et documents de la direction" />
            <button type="button" disabled={!title.trim()} onClick={add} className={`${btnPrimary} mt-3 w-full`}>
              Créer et coter
            </button>
          </Card>
        </div>
      </div>
    </>
  )
}

export function RiskDetail() {
  const { id } = useParams()
  const { progress } = useProgress()
  const scenario = riskScenarios.find((s) => s.id === id)
  const custom = progress.customRisks.find((c) => c.id === id)
  if (!scenario && !custom) return <Navigate to="/risques" replace />
  return <RiskEditor key={id} scenario={scenario} custom={custom} />
}

function buildMemo(title: string, asset: string, entry: RiskEntry, res: { gravity: number; likelihood: number }) {
  const inh = entry.gravity * entry.likelihood
  const resScore = res.gravity * res.likelihood
  const above = resScore > APPETITE
  const controls = riskControls.filter((c) => entry.controls.includes(c.id))
  const date = new Date().toLocaleDateString('fr-FR')
  const approver = resScore >= 15 ? 'Comité exécutif (COMEX)' : resScore >= 10 ? 'Directeur métier propriétaire + avis RSSI' : 'Propriétaire du risque'
  return `MÉMO DE DÉCISION DE TRAITEMENT DU RISQUE
Date : ${date} · Émetteur : RSSI · Destinataire : ${approver}

1. RISQUE
Scénario : ${title}
Valeur métier : ${asset}
Propriétaire du risque : ${entry.owner || '[à désigner]'}

2. ÉVALUATION
Risque brut     : Gravité ${entry.gravity} × Vraisemblance ${entry.likelihood} = ${inh} (${levelOf(inh).toUpperCase()})
Risque résiduel : Gravité ${res.gravity} × Vraisemblance ${res.likelihood} = ${resScore} (${levelOf(resScore).toUpperCase()})
Appétence au risque : résiduel ≤ ${APPETITE} → ${above ? 'DÉPASSÉE : décision de la direction requise' : 'RESPECTÉE'}

3. OPTION DE TRAITEMENT RETENUE : ${(entry.treatment ?? '[à choisir]').toUpperCase()}
Mesures :
${controls.length ? controls.map((c) => `- ${c.label} (${c.ref})`).join('\n') : '- Aucune mesure retenue'}

4. CONDITIONS
- Les mesures créditées dans le résiduel doivent être en place ou planifiées avec budget et échéance.
- Durée de validité de la décision : ${resScore >= 10 ? '6 mois' : '12 mois'}, revue ${resScore >= 10 ? 'trimestrielle' : 'semestrielle'}.
- Révocation en cas d'incident lié, d'échec d'une mesure ou de changement significatif du contexte.

5. DÉCISION
[ ] J'approuve le traitement proposé et ${entry.treatment === 'Accepter' ? "j'accepte" : "j'accepterai à l'issue du plan"} le risque résiduel décrit.
[ ] Je refuse et demande des mesures complémentaires.

Nom / fonction / date / signature :`
}

function RiskEditor({ scenario, custom }: { scenario?: RiskScenario; custom?: CustomRisk }) {
  const { progress, saveRisk, saveCustomRisks } = useProgress()
  const navigate = useNavigate()
  const id = (scenario?.id ?? custom?.id) as string
  const stored = scenario ? progress.risks[id] : custom?.entry
  const [entry, setEntry] = useState<RiskEntry>(stored ?? EMPTY_ENTRY)
  const [submitted, setSubmitted] = useState(stored?.score !== undefined)
  const res = useMemo(() => residual(entry.gravity, entry.likelihood, entry.controls), [entry])
  const inh = entry.gravity * entry.likelihood
  const resScore = res.gravity * res.likelihood
  const title = scenario?.title ?? custom?.title ?? ''
  const asset = scenario?.businessAsset ?? custom?.businessAsset ?? ''
  const score = scenario ? scoreRisk(scenario, entry) : undefined
  const idx = riskScenarios.findIndex((s) => s.id === id)
  const next = idx >= 0 ? riskScenarios[idx + 1] : undefined

  const update = (patch: Partial<RiskEntry>) => {
    const nextEntry = { ...entry, ...patch }
    setEntry(nextEntry)
    // Le registre est sauvegardé en continu ; seul le bouton de validation enregistre un score.
    if (scenario) saveRisk(id, { ...nextEntry, score: undefined })
    else if (custom) saveCustomRisks(progress.customRisks.map((c) => (c.id === id ? { ...c, entry: nextEntry } : c)))
  }

  const validate = () => {
    if (scenario && score !== undefined) saveRisk(id, { ...entry, score })
    setSubmitted(true)
  }

  return (
    <>
      <Link to="/risques" className="mb-3 inline-flex items-center gap-1 text-sm text-mute hover:text-white">
        <ArrowLeft size={14} aria-hidden /> Registre des risques
      </Link>
      <PageHeader eyebrow={scenario ? 'Scénario de risque' : 'Risque personnalisé'} title={title}>
        {scenario?.context}
      </PageHeader>

      {scenario && (
        <Card className="mb-5 grid grid-cols-1 gap-3 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[11px] tracking-wide text-accent uppercase">Valeur métier</p>
            <p>{scenario.businessAsset}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-wide text-accent uppercase">Biens supports</p>
            <p>{scenario.supportAssets}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-wide text-accent uppercase">Source de risque</p>
            <p>{scenario.threat}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-wide text-accent uppercase">Vulnérabilités</p>
            <p>{scenario.vulnerability}</p>
          </div>
          <p className="font-mono text-xs text-mute sm:col-span-2 lg:col-span-4">Impact DICP estimé : {scenario.dicp}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-semibold text-white">1. Risque brut (inhérent)</h2>
            <p className="mb-3 text-xs text-mute">Sans tenir compte des mesures à ajouter. Cliquez dans la matrice ou utilisez les échelles.</p>
            <p className="mb-1 text-xs text-mute">Gravité</p>
            <Segmented options={[1, 2, 3, 4, 5]} value={entry.gravity} onChange={(gravity) => update({ gravity })} label="Gravité" render={(v) => `${v} · ${GRAVITY[v - 1]}`} />
            <p className="mt-3 mb-1 text-xs text-mute">Vraisemblance</p>
            <Segmented options={[1, 2, 3, 4, 5]} value={entry.likelihood} onChange={(likelihood) => update({ likelihood })} label="Vraisemblance" render={(v) => `${v} · ${LIKELIHOOD[v - 1]}`} />
            <p className="mt-3 text-sm">
              Score brut : <span className="font-mono font-bold text-white">{inh}</span> <LevelBadge level={levelOf(inh)} />
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="font-semibold text-white">2. Mesures de sécurité (ISO 27002 / NIST CSF)</h2>
            <p className="mb-3 text-xs text-mute">Chaque mesure réduit la vraisemblance (V) ou la gravité (G). Ne retenez que ce qui traite réellement ce scénario.</p>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {riskControls.map((c) => {
                const on = entry.controls.includes(c.id)
                const key = submitted && scenario?.keyControls.includes(c.id)
                return (
                  <li key={c.id}>
                    <label className={`flex h-full cursor-pointer items-start gap-2.5 rounded-md border p-2.5 text-sm ${on ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'} ${key ? 'ring-1 ring-emerald' : ''}`}>
                      <input type="checkbox" checked={on} onChange={() => update({ controls: on ? entry.controls.filter((x) => x !== c.id) : [...entry.controls, c.id] })} className="mt-0.5 size-4 shrink-0 accent-blue-500" />
                      <span>
                        <span className="text-white">{c.label}</span>
                        <span className="mt-0.5 block font-mono text-[11px] text-mute">
                          {c.ref}
                          {c.effect.likelihood > 0 && ` · V −${c.effect.likelihood}`}
                          {c.effect.gravity > 0 && ` · G −${c.effect.gravity}`}
                          {key && <span className="ml-1 text-emerald">· mesure clé</span>}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-semibold text-white">3. Option de traitement</h2>
            <div role="radiogroup" aria-label="Option de traitement" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TREATMENTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={entry.treatment === t}
                  onClick={() => update({ treatment: t })}
                  className={`rounded-md border p-3 text-left text-sm ${entry.treatment === t ? 'border-accent bg-accent/10' : 'border-line hover:border-accent'}`}
                >
                  <span className="font-semibold text-white">{t}</span>
                  <span className="block text-xs text-mute">{TREATMENT_HELP[t]}</span>
                </button>
              ))}
            </div>
            <label className="mt-4 block text-xs text-mute" htmlFor="owner">
              Propriétaire du risque (métier)
            </label>
            <input id="owner" value={entry.owner} onChange={(e) => update({ owner: e.target.value })} className={`${inputCls} mt-1`} placeholder="Ex. Directeur industriel" />
          </Card>
        </div>

        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <Card className="p-4">
            <RiskMatrix
              markers={[
                { key: 'b', label: 'B', gravity: entry.gravity, likelihood: entry.likelihood, kind: 'brut' },
                { key: 'r', label: 'R', gravity: res.gravity, likelihood: res.likelihood, kind: 'residuel' },
              ]}
              onPick={(gravity, likelihood) => update({ gravity, likelihood })}
            />
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md border border-line p-2">
                <dt className="text-[11px] text-mute uppercase">Brut</dt>
                <dd className="font-mono text-lg font-bold text-white">
                  {inh} <LevelBadge level={levelOf(inh)} />
                </dd>
              </div>
              <div className="rounded-md border border-line p-2">
                <dt className="text-[11px] text-mute uppercase">Résiduel</dt>
                <dd className="font-mono text-lg font-bold text-white">
                  {resScore} <LevelBadge level={levelOf(resScore)} />
                </dd>
              </div>
            </dl>
            <p className={`mt-2 rounded-md p-2 text-xs ${resScore > APPETITE ? 'bg-crimson/10 text-red-300' : 'bg-emerald/10 text-emerald-300'}`}>
              {resScore > APPETITE ? `Au-delà de l’appétence (${APPETITE}) : traitement complémentaire ou acceptation par la direction.` : `Dans l’appétence (≤ ${APPETITE}).`}
            </p>
          </Card>

          {scenario && !submitted && (
            <button type="button" disabled={!entry.treatment} onClick={validate} className={`${btnPrimary} w-full`}>
              Valider et comparer à l’expert
            </button>
          )}

          {scenario && submitted && score !== undefined && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-wide text-mute uppercase">Comparaison avec l’expert</p>
                <ScoreBadge score={score} />
              </div>
              <p className="mt-2 text-sm">
                Cotation attendue : G{scenario.expected.gravity} × V{scenario.expected.likelihood} = {scenario.expected.gravity * scenario.expected.likelihood} · Traitement : {scenario.expectedTreatment.join(' ou ')}
              </p>
              <p className="mt-1 text-sm">Mesures clés : {riskControls.filter((c) => scenario.keyControls.includes(c.id)).map((c) => c.label.split(' (')[0]).join(' ; ')}.</p>
              <p className="mt-2 text-sm text-mute">{scenario.debrief}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={validate} className={btnGhost}>
                  Réévaluer
                </button>
                {next && (
                  <Link to={`/risques/${next.id}`} className={btnPrimary}>
                    Suivant <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </Card>
          )}

          {custom && (
            <button
              type="button"
              onClick={() => {
                saveCustomRisks(progress.customRisks.filter((c) => c.id !== id))
                navigate('/risques')
              }}
              className={`${btnGhost} w-full text-red-300`}
            >
              <Trash2 size={15} /> Supprimer ce risque
            </button>
          )}
        </div>
      </div>

      {(submitted || custom) && entry.treatment && (
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Mémo exécutif de décision</h2>
            <CopyButton text={buildMemo(title, asset, entry, res)} label="Copier le mémo" />
          </div>
          <DocBlock title="Mémo d’acceptation / de traitement du risque" content={buildMemo(title, asset, entry, res)} />
        </section>
      )}
    </>
  )
}
